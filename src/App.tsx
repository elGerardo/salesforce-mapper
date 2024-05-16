import { JsonViewer } from "@textea/json-viewer";
import Input from "./components/input";
import { useState } from "react";
import Find from "./components/crud/find";
import Login from "./components/login";
import SalesforceMapperService from "./services/SalesforceMapperService";
import FieldList from "./components/fieldList";
import Button from "./components/button";
import Disclosure from "./components/disclosure";
import { Loader } from "./components/loader";
import Textarea from "./components/textarea";

const RADIOS: Array<{
  label: string;
  id: string;
  value: "get_option" | "find_option" | "query_option";
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
  {
    label: "Query",
    id: "query_radio",
    value: "query_option",
  },
];

function App() {
  const [crudOption, setCrudOption] = useState<
    "get_option" | "find_option" | "query_option"
  >("get_option");
  const [sobject, setSobject] = useState("");
  const [instanceURL, setInstanceURL] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [fields, setFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState<Array<string>>([]);
  const [jsonObject, setJsonObject] = useState({});
  const [limit, setLimit] = useState("25");
  const [offset, setOffset] = useState("0");
  const [whereField, setWhereField] = useState("Id");
  const [whereValue, setWhereValue] = useState("");
  const [loginError, setLoginError] = useState("");
  const [query, setQuery] = useState("");
  const [loginIsOpen, setLoginIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [sobjectError, setSobjectError] = useState("");
  const [goError, setGoError] = useState("");
  const [whereConditional, setWhereConditional] = useState<
    "=" | "!=" | "like" | "between" | "" | "is_false" | "is_true"
  >("=");

  const handleOnLogin = async (data: object) => {
    setIsLoading(true);
    const { response, status } = await SalesforceMapperService.login(data);

    if (status === 201) {
      setLoginError("");
      setInstanceURL(response.instance_url);
      setAccessToken(response.access_token);
      setLoginIsOpen(false);
    } else {
      setLoginError(
        "Login failed, please check your credentials or your org connected app"
      );
    }
    setIsLoading(false);
  };

  const handleLoadSobject = async () => {
    setIsLoading(true);
    const { response, status } = await SalesforceMapperService.describe(
      sobject,
      instanceURL,
      accessToken
    );

    if (status === 200) {
      setSobjectError("");
      setSelectedFields([]);
      setWhereValue("");
      setFields(response);
    } else {
      setSobjectError(`Sobject in ${instanceURL} does not exist`);
    }
    setIsLoading(false);
  };

  const handleOnChangeSobject = async (value: any) => {
    setSobject(value);
  };

  const OnClickItem = (value: string) => {
    if (!selectedFields.includes(value)) {
      setSelectedFields([...selectedFields, value]);
    } else {
      setSelectedFields(selectedFields.filter((item) => item !== value));
    }
  };

  const handleOnGo = async () => {
    setIsLoading(true);
    let response;
    let status = 200;
    if (crudOption === "get_option") {
      response = await SalesforceMapperService.get(
        sobject,
        instanceURL,
        accessToken,
        { fields: selectedFields, limit, offset }
      );
      status = response.status;
    }

    if (crudOption === "find_option") {
      let conditional = whereConditional;
      if (conditional === "is_false") conditional = "=";
      if (conditional === "is_true") conditional = "=";

      response = await SalesforceMapperService.find(
        sobject,
        instanceURL,
        accessToken,
        {
          fields: selectedFields,
          limit,
          offset,
          where_conditional: conditional,
          where_field: whereField,
          where_value: whereValue,
        }
      );
      status = response.status;
    }

    if (crudOption === "query_option") {

      response = await SalesforceMapperService.query(
        instanceURL,
        accessToken,
        query
      );
      status = response.status;
    }

    if (status === 200) {
      setGoError("");
      setJsonObject(response?.response);
    } else {
      setGoError("Server Error");
    }
    setIsLoading(false);
  };

  return (
    <main className="w-9/12 m-auto ">
      <h1 className="mt-2 text-xl font-bold">Salesforce Mapper</h1>
      {isLoading && <Loader />}
      <Disclosure
        isOpen={loginIsOpen}
        onChangeIsOpen={(value: boolean) => setLoginIsOpen(value)}
        title="Login to Salesforce"
      >
        <Login onSubmit={(data: object) => handleOnLogin(data)} />
      </Disclosure>
      <p className="text-red-600">{loginError}</p>
      {instanceURL !== "" && (
        <p>
          Logged in with <b>{instanceURL}</b>
        </p>
      )}
      <div className="flex mt-5">
        {instanceURL !== "" &&
          accessToken !== "" &&
          RADIOS.map((item) => {
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
      {instanceURL !== "" &&
        accessToken !== "" &&
        crudOption !== "query_option" && (
          <div>
            <div className="flex">
              <Input
                label="Sobject"
                id="sobject"
                containerClassName="w-full my-4"
                className="w-full p-1"
                placeholder="Salesforce Sobject"
                onChange={(value) => handleOnChangeSobject(value)}
                disabled={instanceURL === "" || accessToken === ""}
              />
              <div className="w-36 my-4 pt-6">
                <Button
                  className="block w-full h-9"
                  disabled={sobject === "" ? true : false}
                  onClick={() => handleLoadSobject()}
                >
                  Load Sobject
                </Button>
              </div>
            </div>
            <p className="text-red-600">{sobjectError}</p>
            {crudOption === "find_option" && fields.length > 0 && (
              <Find
                fields={selectedFields}
                conditional={whereConditional}
                value={whereValue}
                onChangeConditional={(e: any) => setWhereConditional(e)}
                onChangeField={(e) => setWhereField(e)}
                onChangeValue={(e) => setWhereValue(e)}
              />
            )}
            {sobject !== "" && fields.length > 0 && (
              <FieldList
                fields={fields}
                selectedFields={selectedFields}
                onClick={(value: string) => OnClickItem(value)}
                onChangeLimit={(value: string) => setLimit(value)}
                onChangeOffset={(value: string) => setOffset(value)}
              />
            )}
          </div>
        )}
      {crudOption === "query_option" && (
        <Textarea
          className="w-full"
          placeholder="SELECT Id, Name FROM Account"
          value={query}
          onChange={(value) => setQuery(value)}
        />
      )}
      {instanceURL !== "" &&
        accessToken !== "" &&
        (crudOption === "get_option" ? (
          <Button
            className="py-1 px-8"
            onClick={() => handleOnGo()}
            disabled={sobject === "" || fields.length === 0 ? true : false}
          >
            Go!
          </Button>
        ) : crudOption === "find_option" ? (
          <Button
            className="py-1 px-8"
            onClick={() => handleOnGo()}
            disabled={
              sobject === "" ||
              whereConditional === "" ||
              whereField === "" ||
              whereValue === ""
                ? true
                : false
            }
          >
            Go!
          </Button>
        ) : (
          crudOption === "query_option" && (
            <Button
              className="py-1 px-8"
              onClick={() => handleOnGo()}
              disabled={query === "" ? true : false}
            >
              Go!
            </Button>
          )
        ))}

      <p className="text-red-600">{goError}</p>
      {instanceURL !== "" && accessToken !== "" && (
        <JsonViewer
          className="text-base my-8"
          rootName={false}
          displayDataTypes={false}
          displaySize={false}
          value={jsonObject}
        />
      )}
    </main>
  );
}

export default App;
