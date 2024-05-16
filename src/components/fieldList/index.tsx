import { useState } from "react";
import Input from "../input";
import Button from "../button";

export default function FieldList({
  fields = [],
  selectedFields,
  onClick,
  onChangeLimit,
  onChangeOffset,
}: {
  fields: Array<{ label: string; name: string }>;
  selectedFields: Array<string>;
  onClick: (value: string) => void;
  onChangeLimit: (value: string) => void;
  onChangeOffset: (value: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState("25");
  const [offset, setOffset] = useState("0");
  const [limitShowing, setLimigShowing] = useState(25);

  return (
    <>
      <div className="flex flex-wrap">
        <Input
          type="text"
          defaultValue={search}
          onChange={(e: string) => setSearch(e)}
          placeholder="Search in retrieved fields..."
          className="px-2 py-1 w-full"
          containerClassName="w-1/3"
          label="Search"
        />
        <Input
          type="number"
          defaultValue={limit}
          onChange={(e: string) => {
            setLimit(e);
            if (onChangeLimit) onChangeLimit(e);
          }}
          placeholder="Limit..."
          className="px-2 py-1 w-full"
          containerClassName="w-1/3"
          label="Limit"
        />
        <Input
          type="number"
          defaultValue={offset}
          onChange={(e: string) => {
            setOffset(e);
            if (onChangeOffset) onChangeOffset(e);
          }}
          placeholder="Offset..."
          className="px-2 py-1 w-full"
          containerClassName="w-1/3"
          label="Offset"
        />
      </div>
      <p className="my-4">Retrived Fields</p>
      <div className="flex flex-wrap">
        {fields.map(({ label, name }, index) => {
          if (label.includes(search) && name !== "Id")
            if (index < limitShowing || search !== "")
              return (
                <Input
                  key={name}
                  type="checkbox"
                  value={name}
                  label={label}
                  id={name}
                  containerClassName="flex items-center mr-4 mb-4 break-normal"
                  className="ml-2 break-normal"
                  onClick={() => onClick(name)}
                  checked={selectedFields.includes(name)}
                />
              );
        })}
      </div>
      <div className="flex justify-end">
        {limitShowing > 25 && search === "" && (
          <Button
            onClick={() => setLimigShowing(limitShowing - 25)}
            kind="secondary"
            className="ml-4 px-4 py-1"
          >
            Show Less (-25)
          </Button>
        )}
        {fields.length > limitShowing && search === "" && (
          <Button
            onClick={() => setLimigShowing(limitShowing + 25)}
            kind="secondary"
            className="px-4 py-1"
          >
            Show More (+25)
          </Button>
        )}
      </div>
    </>
  );
}
