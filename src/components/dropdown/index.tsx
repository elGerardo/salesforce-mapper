"use client";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

export default function DropDown({
  data = [{ label: "Options", value: null, id: "" }],
  onChange,
  className,
  itemsClassName,
  itemClassName,
  label,
  defaultValue,
}: {
  data?: Array<{ value: string | null; label: string; id: string }>;
  onChange?: (event: any) => void;
  className?: string;
  itemsClassName?: string;
  itemClassName?: string;
  label?: string;
  defaultValue?: string;
}) {
  let defaultIndex = 0;
  if (defaultValue != null) {
    defaultIndex = data.findIndex((row) => row.id === defaultValue);
  }

  const [selected, setSelected] = useState(data[defaultIndex]);
  const handleOnChangeSelected = (data: any) => {
    setSelected(data);
    if (onChange) onChange(data);
  };

  return (
    <div className={className}>
      {label != null && <label>{label}</label>}
      <Listbox
        value={selected}
        onChange={(data: any) => handleOnChangeSelected(data)}
      >
        <div className="relative">
          <Listbox.Button
            className={`relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border-2 !border-c-gray-200`}
          >
            <span
              className={`block truncate px-2 py-1 rounded-md ${itemClassName}`}
            >
              {selected.label}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50">
              {data.map((item, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 z-50 ${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        <span
                          className={`block truncate px-2 py-1 rounded-md  ${itemsClassName}`}
                        >
                          {item.label}
                        </span>
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
