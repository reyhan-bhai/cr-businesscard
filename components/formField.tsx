"use client";
import { useState } from "react";
const FormField = ({
  isDisabled = false,
  label,
  textArea = false,
  value,
  placeholder,
  onChange,
  onFocus,
  className = "",
  fullWidth = false,
}: {
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
  onFocus?: () => void;
  className?: string;
  textArea?: boolean;
  value?: string;
  onChange: (value: string) => void;
  fullWidth?: boolean;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  {
    if (textArea === null || textArea === undefined || textArea === false) {
      return (
        <div
          className={`${
            fullWidth && className === ""
              ? "w-full flex flex-col"
              : ` ${className} flex-1 flex flex-col`
          } justify-start items-start gap-1.5`}
        >
          <div className="justify-start text-black text-sm md:text-base font-medium font-['DM_Sans']">
            {label}
          </div>
          <div
            className={`w-full px-3 py-3 md:py-2 ${
              isDisabled
                ? "bg-zinc-200"
                : isFocused
                ? "bg-white border-2 border-blue-500 outline-none"
                : "bg-white"
            } rounded-xl ${
              !isDisabled && !isFocused
                ? "outline outline-[0.50px] outline-offset-[-0.50px] outline-zinc-500/50"
                : ""
            } border flex justify-start items-center gap-2.5 overflow-hidden`}
          >
            <input
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => {
                setIsFocused(true);
                if (onFocus) onFocus();
              }}
              onBlur={() => setIsFocused(false)}
              disabled={isDisabled}
              className="flex-1 bg-transparent border-none outline-none text-zinc-600 text-sm md:text-base font-medium font-['DM_Sans'] min-w-0"
            />
          </div>
        </div>
      );
    } else if (textArea === true) {
      return (
        <>
          <textarea
            name=""
            placeholder={placeholder}
            id=""
            rows={4}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              if (onFocus) onFocus();
            }}
            onBlur={() => setIsFocused(false)}
            className={`${isFocused ? "border-2 border-blue-500" : "border"} w-full self-stretch h-32 relative bg-white rounded-xl outline outline-[0.50px] outline-offset-[-0.50px] outline-zinc-500/50 overflow-hidden pl-2.5 pt-2.5`}
          >
          </textarea>
        </>
      );
    }
  }
};

export default FormField;
