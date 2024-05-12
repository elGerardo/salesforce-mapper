import {
  Combobox as CustomCombobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";

export default function Combobox({
  data = [""],
  className,
  label,
  onChange,
}: {
  data?: Array<string>;
  className?: string;
  label?: string;
  onChange?: (value: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(data[0]);

  const filteredData =
    query === ""
      ? data
      : data.filter((data) => {
          return data.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className={` ${className}`}>
      <label>{label}</label>
      <CustomCombobox
        value={selected}
        onChange={(value: any) => {
          if (onChange) onChange(value);
          setSelected(value);
        }}
      >
        <div className="relative">
          <ComboboxInput
            className={clsx(
              "w-full border-2 border-secondary bg-white px-2 py-1 rounded ",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25"
            )}
            displayValue={(selected: string) => selected}
            onChange={(event) => {
              if (onChange) onChange(event.target.value);
              setQuery(event.target.value);
            }}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 group-data-[hover]:fill-black" />
          </ComboboxButton>
        </div>
        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <ComboboxOptions
            anchor="bottom"
            className="w-[var(--input-width)] rounded border-2 border-secondary bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:hidden"
          >
            {filteredData.map((selected) => (
              <ComboboxOption
                key={selected}
                value={selected}
                className="group flex cursor-default items-center gap-2 rounded py-1.5 px-3 select-none data-[focus]:bg-black/5"
              >
                <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
                <div className="text-sm/6 text-black">{selected}</div>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Transition>
      </CustomCombobox>
    </div>
  );
}
