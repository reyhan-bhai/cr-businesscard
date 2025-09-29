import CRForm from "@/components/form";
import ImageUploader from "@/components/imageUploader";
import Button from "../button";

interface BusinessCardData {
  full_name: string;
  job_title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  address: string;
}

interface ParseCardSectionProps {
  currentStep: number;
  handleNextClick: () => void;
  files: File[] | undefined;
  filePreview: string | undefined;
  isImageParsed: boolean;
  isProcessing?: boolean;
  extractedData?: BusinessCardData;
  setExtractedData: (data: BusinessCardData) => void;
  onDrop: (droppedFiles: File[]) => void;
  onUploadAndParse: () => void;
}

const ParseCardSection = ({
  currentStep,
  handleNextClick,
  files,
  filePreview,
  isImageParsed,
  isProcessing,
  extractedData,
  setExtractedData,
  onDrop,
  onUploadAndParse,
}: ParseCardSectionProps) => {
  return (
    <section
      className={`${currentStep === 1 ? "" : "hidden"} parse-card-page w-full`}
    >
      <ImageUploader
        files={files}
        filePreview={filePreview}
        onDrop={onDrop}
        onUploadAndParse={onUploadAndParse}
        hasFiles={files && files.length > 0}
        isProcessing={isProcessing}
      />
      {isImageParsed && (
        <CRForm
          extractedData={extractedData}
          setExtractedData={setExtractedData}
        />
      )}
      <Button
        title="Next"
        color={!isImageParsed ? "bg-zinc-500/50" : "bg-[#007D49]"}
        className={`w-full mt-5 mb-12 text-white ${
          !isImageParsed ? "cursor-not-allowed " : ""
        }`}
        disabled={!isImageParsed}
        onClick={handleNextClick}
      />
    </section>
  );
};

export default ParseCardSection;
