"use client";
import { JsonViewer } from "@textea/json-viewer";
import Input from "./components/input";
import { useEffect, useState } from "react";
import Get from "./components/crud/get";
import Find from "./components/crud/find";
import Login from "./components/login";
import SalesforceMapperService from "./services/SalesforceMapperService";
import FieldList from "./components/fieldList";
import Button from "./components/button";

const RADIOS: Array<{
  label: string;
  id: string;
  value:
    | "get_option"
    | "find_option"
    | "create_option"
    | "update_option"
    | "delete_option";
}> = [
  {
    label: "Get",
    id: "get_radio",
    value: "get_option",
  },
  {
    label: "Find",
    id: "find_radio",
    value: "find_option",
  },
  /*
  {
    label: "Create",
    id: "create_radio",
    value: "create_option",
  },
  {
    label: "Update",
    id: "update_radio",
    value: "update_option",
  },
  {
    label: "Delete",
    id: "delete_radio",
    value: "delete_option",
  },
  */
];

function App() {
  const [crudOption, setCrudOption] = useState<
    | "get_option"
    | "find_option"
    | "create_option"
    | "update_option"
    | "delete_option"
  >("get_option");
  const [useOption, setUseOption] = useState("use_query");
  const [sobject, setSobject] = useState("use_query");
  const [instanceURL, setInstanceURL] = useState();
  const [accessToken, setAccessToken] = useState();
  const [fields, setFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState<Array<string>>([]);
  const [jsonObject, setJsonObject] = useState({})
  const [limit, setLimit] = useState("25")
  const [offset, setOffset] = useState("1")

  const handleOnLogin = async (data: object) => {
    const { response } = await SalesforceMapperService.login(data);
    setInstanceURL(response.instance_url);
    setAccessToken(response.access_token);
  };

  const handleOnChangeSobject = async (value: any) => {
    const { response } = await SalesforceMapperService.describe(
      value,
      instanceURL,
      accessToken
    );
    setFields(response);
    setSobject(value)
  };

  const OnClickItem = (value: string) => {
    if (!selectedFields.includes(value)) {
      setSelectedFields([...selectedFields, value]);
    } else {
      setSelectedFields(selectedFields.filter(item => item !== value));
    }
  };

  const handleOnGo = async () => {
   const { response } =  await SalesforceMapperService.get(sobject, instanceURL, accessToken, { fields: selectedFields, limit, offset})
    setJsonObject(response)
  }

  useEffect(() => {}, [selectedFields])

  return (
    <main className="w-9/12 m-auto ">
      <Login onSubmit={(data: object) => handleOnLogin(data)} />
      <div className="flex mt-5">
        {RADIOS.map((item) => {
          return (
            <Input
              type="radio"
              label={item.label}
              containerClassName="flex mr-5"
              className="ml-1"
              id={item.id}
              name="crud_option"
              value={item.value}
              checked={crudOption === item.value}
              onChange={() => setCrudOption(item.value)}
            />
          );
        })}
      </div>
      <div>
        <Input
          label="Sobject"
          id="sobject"
          containerClassName="w-full"
          className="w-full p-1"
          placeholder="Salesforce Sobject"
          onChange={(value) => handleOnChangeSobject(value)}
          onChangeDelay={2000}
        />
        {crudOption === "get_option" && (
          <Get
            checkedOption={useOption}
            checkedHandler={(value: string) => setUseOption(value)}
          />
        )}
        {crudOption === "find_option" && <Find />}
        <FieldList
          fields={fields}
          selectedFields={selectedFields}
          onClick={(value: string) => OnClickItem(value)}
          onChangeLimit={(value: string) => setLimit(value)}
          onChangeOffset={(value: string) => setOffset(value)}
        />
      </div>
        <Button onClick={() => handleOnGo()} disabled={selectedFields.length === 0 ? true : false}>Go!</Button>
      <JsonViewer
        className="text-base"
        rootName={false}
        displayDataTypes={false}
        displaySize={false}
        value={jsonObject}
      />
    </main>
  );
}

export default App;
