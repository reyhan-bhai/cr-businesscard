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
  filePreviews: (string | undefined)[];
  isImageParsed: boolean;
  isProcessing?: boolean;
  extractedData?: BusinessCardData;
  setExtractedData: (data: BusinessCardData) => void;
  onDrop: (droppedFiles: File[]) => void;
  onUploadAndParse: () => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

const ParseCardSection = ({
  currentStep,
  handleNextClick,
  files,
  filePreviews,
  isImageParsed,
  isProcessing,
  extractedData,
  setExtractedData,
  onDrop,
  onUploadAndParse,
  isEditing,
  setIsEditing,
}: ParseCardSectionProps) => {
  const handleNext = () => {
    if (isEditing) {
      alert("Please save your changes first.");
    } else {
      handleNextClick();
    }
  };
  return (
    <section
      className={`${currentStep === 1 ? "" : "hidden"} parse-card-page w-full`}
    >
      <ImageUploader
        frontFiles={files && files[0] ? [files[0]] : []}
        backFiles={files && files[1] ? [files[1]] : []}
        frontPreview={filePreviews[0]}
        backPreview={filePreviews[1]}
        onFrontDrop={(droppedFiles) => {
          const newFiles = files ? [...files] : [];
          newFiles[0] = droppedFiles[0];
          onDrop(newFiles);
        }}
        onBackDrop={(droppedFiles) => {
          const newFiles = files ? [...files] : [];
          newFiles[1] = droppedFiles[0];
          onDrop(newFiles);
        }}
        onUploadAndParse={onUploadAndParse}
        isProcessing={isProcessing}
      />
      {isImageParsed && (
        <CRForm
          extractedData={extractedData}
          setExtractedData={setExtractedData}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}
      <Button
        title="Next"
        color={!isImageParsed || isEditing ? "bg-zinc-500/50" : "bg-[#007D49]"}
        className={`w-full mt-5 mb-12 text-white ${
          !isImageParsed || isEditing ? "cursor-not-allowed " : ""
        }`}
        disabled={!isImageParsed || isEditing}
        onClick={handleNext}
      />
    </section>
  );
};

export default ParseCardSection;
