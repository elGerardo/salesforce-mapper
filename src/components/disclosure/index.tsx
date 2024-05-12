import {
  Disclosure as CustomDisclosure,
  DisclosureButton,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function Disclosure({
  isOpen,
  onChangeIsOpen,
  title,
  children,
}: {
  children?: React.ReactNode;
  title: string;
  isOpen: boolean;
  onChangeIsOpen: (value: boolean) => void;
}) {
  return (
    <div className="w-full px-4 !text-black">
      <div className="w-full divide-y divide-white/5 rounded-xl bg-white/5">
        <CustomDisclosure as="div" className="p-6" defaultOpen={true}>
          <DisclosureButton
            className="group flex w-full items-center justify-between"
            onClick={() => onChangeIsOpen(!isOpen)}
          >
            <span className="text-sm/6 font-medium">{title}</span>
            <ChevronDownIcon
              className={`size-5 ${isOpen === true && "rotate-180"}`}
            />
          </DisclosureButton>
          {isOpen && children}
        </CustomDisclosure>
      </div>
    </div>
  );
}
