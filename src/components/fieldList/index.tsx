import { useState } from "react";
import Input from "../input";

export default function FieldList({
  fields,
  selectedFields,
  onClick,
  onChangeLimit,
  onChangeOffset
}: {
  fields: Array<{ label: string; name: string }>;
  selectedFields: Array<string>;
  onClick: (value: string) => void;
  onChangeLimit: (value: string) => void;
  onChangeOffset: (value: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState("25");
  const [offset, setOffset] = useState("1");

  return (
    <>
    <div className="flex flex-wrap">
      <Input
        type="text"
        defaultValue={search}
        onChange={(e: string) => setSearch(e)}
        placeholder="Search..."
        className="px-2 py-1"
        label="Search"
      />
      <Input
        type="number"
        defaultValue={limit}
        onChange={(e: string) => {
          setLimit(e)
          if(onChangeLimit) onChangeLimit(e)
        }}
        placeholder="Limit..."
        className="px-2 py-1"
        label="Limit"
      />
      <Input
        type="number"
        defaultValue={offset}
        onChange={(e: string) => {
          setOffset(e)
          if(onChangeOffset) onChangeOffset(e)
        }}
        placeholder="Offset..."
        className="px-2 py-1"
        label="Offset"
      />
      </div>
      <div className="flex flex-wrap">
        {fields.map(({ label, name }) => {
          if (label.includes(search))
            return (
              <Input
                key={name}
                type="checkbox"
                value={name}
                label={label}
                id={name}
                containerClassName="flex items-center mr-4 w-2/12 mb-4"
                className="ml-2"
                onClick={() => onClick(name)}
                checked={selectedFields.includes(name)}
              />
            );
        })}
      </div>
    </>
  );
}
