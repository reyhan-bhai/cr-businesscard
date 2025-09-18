import Image from "next/image";
import { useState } from "react";
import Button from "./button";

const FormField = ({
  label,
  value,
  onChange,
  fullWidth = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  fullWidth?: boolean;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`${
        fullWidth ? "w-full flex flex-col" : "flex-1 flex flex-col"
      } justify-start items-start gap-1.5`}
    >
      <div className="justify-start text-black text-sm md:text-base font-medium font-['DM_Sans']">
        {label}
      </div>
      <div
        className={`w-full px-3 py-3 md:py-3.5 ${
          isFocused ? "bg-white" : "bg-zinc-500/5"
        } rounded-xl outline outline-[0.50px] outline-offset-[-0.50px] outline-zinc-500/50 flex justify-start items-center gap-2.5 overflow-hidden`}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 bg-transparent border-none outline-none text-zinc-600 text-sm md:text-base font-medium font-['DM_Sans'] min-w-0"
        />
      </div>
    </div>
  );
};

const FormRow = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full flex flex-col md:flex-row justify-start items-start gap-4 md:gap-6">
    {children}
  </div>
);

const CRForm = () => {
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div className="w-full p-4 md:p-6 mt-4 rounded-xl outline outline-2 outline-offset-[-1px] outline-indigo-50 flex flex-col justify-start items-start gap-4 md:gap-6">
      <div className="w-full flex flex-row sm:flex-row justify-between items-start sm:items-end gap-2">
        <div className="justify-start text-black text-base md:text-xl font-bold font-['DM_Sans']">
          Parsed Business Card Result
        </div>
        <Button
          title="Edit"
          color="text-violet-950 "
          className="outline outline-1 outline-offset-[-1px] outline-violet-950 px-3 py-1 rounded-xl bg-white text-sm md:text-base font-bold font-['DM_Sans'] self-start sm:self-auto"
        >
          <div className="w-5 h-5 md:w-6 md:h-6 relative overflow-hidden hidden md:block">
            <Image
              src="/images/square-pen.png"
              alt="Edit Icon"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </Button>
      </div>
      <FormRow>
        <FormField
          label="Full Name"
          value={fullName}
          onChange={setFullName}
          fullWidth
        />
        <FormField
          label="Job Title"
          value={jobTitle}
          onChange={setJobTitle}
          fullWidth
        />
      </FormRow>
      <FormField
        label="Company"
        value={company}
        onChange={setCompany}
        fullWidth
      />
      <FormRow>
        <FormField label="Email" value={email} onChange={setEmail} fullWidth />
        <FormField label="Phone" value={phone} onChange={setPhone} fullWidth />
      </FormRow>
      <FormRow>
        <FormField
          label="Website"
          value={website}
          onChange={setWebsite}
          fullWidth
        />
        <FormField
          label="Address"
          value={address}
          onChange={setAddress}
          fullWidth
        />
      </FormRow>
    </div>
  );
};

export default CRForm;
