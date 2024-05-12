import Combobox from "../../combobox";
import DropDown from "../../dropdown";
import Input from "../../input";

export default function Find({
  fields = [],
  value,
  onChangeField,
  onChangeConditional,
  onChangeValue,
  conditional
}: {
  field: string;
  fields: Array<string>;
  conditional: string;
  value: string;
  onChangeField: (value: string) => void;
  onChangeConditional: (value: string) => void;
  onChangeValue: (value: string) => void;
}) {

  return (
    <div className="flex my-4">
      <Combobox
        data={fields}
        className="w-1/3"
        label="Choose the field"
        onChange={(value: string) => onChangeField(value)}
      />
      <DropDown
        data={[
          { label: "=", value: "=" },
          { label: "!=", value: "!=" },
          { label: "LIKE", value: "LIKE" },
          { label: "Is True", value: "is_true" },
          { label: "Is False", value: "is_false" },
        ]}
        className="w-1/3 rounded"
        label="Choose the conditional"
        onChange={(e) => {
          onChangeConditional(e.value)
          if(e.value === "is_false") onChangeValue("false")
          if(e.value === "is_true") onChangeValue("true")
        }}
      />
      <Input
        label="Value"
        placeholder="John Doe"
        containerClassName="w-1/3"
        className="p-1 w-full"
        defaultValue={value}
        onChange={(e: string) => onChangeValue(e)}
        disabled={ conditional === "is_false" || conditional === "is_true" ? true : false }
      />
    </div>
  );
}
