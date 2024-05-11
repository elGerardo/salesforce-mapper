import { debounce } from "lodash";

export default function Input({
  id,
  disabled = false,
  required = false,
  className = "",
  containerClassName = "",
  defaultValue = "",
  value,
  inputRef,
  placeholder = "",
  type = "text",
  label,
  onChange,
  onClick,
  checked,
  onChangeDelay = 0,
}: {
  id?: string;
  name?: string;
  type?: "text" | "number" | "password" | "radio" | "checkbox";
  disabled?: boolean;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  className?: string;
  containerClassName?: string;
  inputRef?: any;
  placeholder?: string;
  label?: string;
  onChange?: (e: string) => void;
  onClick?: () => void;
  checked?: boolean;
  onChangeDelay?: number;
}) {
  const onDebounceChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    if (onChange) onChange(e.target.value);
  };

  const debouncedOnChange: any = debounce(onDebounceChange, onChangeDelay);

  return (
    <div className={containerClassName}>
      {label != null && (
        <label className="block" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        {...(id !== undefined && { id })}
        {...(value !== undefined && { value })}
        {...(inputRef !== undefined && { ref: inputRef })}
        placeholder={placeholder}
        className={`${className}`}
        {...(defaultValue !== undefined &&
          value == undefined && { defaultValue })}
        type={type}
        disabled={disabled}
        required={required}
        onChange={debouncedOnChange}
        onClick={() => {
          if (onClick) onClick();
        }}
        checked={checked}
      />
    </div>
  );
}
