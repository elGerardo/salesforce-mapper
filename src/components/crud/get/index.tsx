import Input from "../../input";

export default function Get({
  checkedOption,
  checkedHandler,
}: {
  checkedOption: string;
  checkedHandler?: (value: string) => void;
}) {
  const onCheckedHandler = (value: string) => {
    if (checkedHandler) checkedHandler(value);
  };

  return (
    <>
      <div className="flex">
        <Input
          type="radio"
          label={"Use Fields"}
          containerClassName="flex mr-5"
          className="ml-1"
          id={"use_fields"}
          name="crud_option"
          value={"use_fields"}
          checked={checkedOption === "use_fields"}
          onChange={() => onCheckedHandler("use_fields")}
        />
      </div>
    </>
  );
}
