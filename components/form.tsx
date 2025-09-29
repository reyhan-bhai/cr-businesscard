import Image from "next/image";
import { useState } from "react";
import Button from "./button";
import FormField from "./formField";

interface BusinessCardData {
  full_name: string;
  job_title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  address: string;
}

const FormRow = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full flex flex-col md:flex-row justify-start items-start gap-4 md:gap-6">
    {children}
  </div>
);

interface CRFormProps {
  extractedData?: BusinessCardData;
  setExtractedData: (data: BusinessCardData) => void;
}

const CRForm = ({ extractedData, setExtractedData }: CRFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleFieldChange = (field: keyof BusinessCardData, value: string) => {
    if (setExtractedData && extractedData) {
      setExtractedData({ ...extractedData, [field]: value });
    }
  };
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="w-full p-4 md:p-6 mt-4 rounded-xl outline outline-2 outline-offset-[-1px] outline-indigo-50 flex flex-col justify-start items-start gap-4 md:gap-6">
      <div className="w-full flex flex-row sm:flex-row justify-between items-start sm:items-end gap-2">
        <div className="justify-start text-black text-base md:text-xl font-bold font-['DM_Sans']">
          Parsed Business Card Result
        </div>

        <Button
          title="Save"
          className={isEditing ? "" : "hidden"}
          onClick={handleSave}
        >
          <div className="w-5 h-5 md:w-6 md:h-6 relative overflow-hidden hidden md:block">
            <Image
              src="/images/save.png"
              alt="Save Icon"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </Button>
        <Button
          title="Edit"
          color="text-violet-950 "
          className={` ${
            isEditing ? "hidden" : ""
          } outline outline-1 outline-offset-[-1px] outline-violet-950 px-3 py-1 rounded-xl bg-white text-sm md:text-base font-bold font-['DM_Sans'] self-start sm:self-auto`}
          onClick={handleEdit}
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
          value={extractedData?.full_name || ""}
          onChange={(value) => handleFieldChange("full_name", value)}
          fullWidth
          isDisabled={!isEditing}
        />
        <FormField
          label="Job Title"
          value={extractedData?.job_title || ""}
          onChange={(value) => handleFieldChange("job_title", value)}
          fullWidth
          isDisabled={!isEditing}
        />
      </FormRow>
      <FormField
        label="Company"
        value={extractedData?.company || ""}
        onChange={(value) => handleFieldChange("company", value)}
        fullWidth
        isDisabled={!isEditing}
      />
      <FormRow>
        <FormField
          label="Email"
          value={extractedData?.email || ""}
          onChange={(value) => handleFieldChange("email", value)}
          fullWidth
          isDisabled={!isEditing}
        />
        <FormField
          label="Phone"
          value={extractedData?.phone || ""}
          onChange={(value) => handleFieldChange("phone", value)}
          fullWidth
          isDisabled={!isEditing}
        />
      </FormRow>
      <FormRow>
        <FormField
          label="Website"
          value={extractedData?.website || ""}
          onChange={(value) => handleFieldChange("website", value)}
          fullWidth
          isDisabled={!isEditing}
        />
        <FormField
          label="Address"
          value={extractedData?.address || ""}
          onChange={(value) => handleFieldChange("address", value)}
          fullWidth
          isDisabled={!isEditing}
        />
      </FormRow>
    </div>
  );
};

export default CRForm;
