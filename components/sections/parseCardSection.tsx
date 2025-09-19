import CRForm from "@/components/form";
import ImageUploader from "@/components/imageUploader";
import Button from "../button";

interface ParseCardSectionProps {
  currentStep: number;
  handleNextClick: () => void;
  files: File[] | undefined;
  filePreview: string | undefined;
  isImageParsed: boolean;
  onDrop: (droppedFiles: File[]) => void;
  onUploadAndParse: () => void;
}

const ParseCardSection = ({
  currentStep,
  handleNextClick,
  files,
  filePreview,
  isImageParsed,
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
      />
      {isImageParsed && <CRForm />}
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