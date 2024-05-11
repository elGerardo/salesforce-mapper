import Input from "../../input";

export default function Find() {
  return (
    <div className="flex">
      <Input label="Field" placeholder="Id" containerClassName="w-1/3" className="p-1 w-full"/>
      <Input label="Conditional" placeholder="=" containerClassName="w-1/3" className="p-1 w-full"/>
      <Input label="Value" placeholder="1" containerClassName="w-1/3" className="p-1 w-full"/>
    </div>
  );
}
