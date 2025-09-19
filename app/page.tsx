"use client";
import CardSaveComponent from "@/components/sections/cardSavedComponent";
import MoreInfoSection from "@/components/sections/moreInfoSection";
import ParseCardSection from "@/components/sections/parseCardSection";
import StepperComponent from "@/components/stepperComponent";
import { useState } from "react";

export default function Home() {
  // Parse Card Section
  const [currentStep, setCurrentStep] = useState(1);
  const [files, setFiles] = useState<File[] | undefined>();
  const [filePreview, setFilePreview] = useState<string | undefined>();
  const [isImageParsed, setIsImageParsed] = useState(false);
  // Parse Card Section End

  const handleNextClick = () => {
    if (isImageParsed) {
      console.log("Next button clicked");
      setCurrentStep((prev) => prev + 1);
      console.log("Moving to step:", currentStep + 1);
      // Scroll to the top
      window.scrollTo({ top: 0 });
    }
  };

  const handleImageDrop = (droppedFiles: File[]) => {
    console.log(droppedFiles);
    setFiles(droppedFiles);
    setIsImageParsed(false);

    if (droppedFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          setFilePreview(e.target?.result);
        }
      };
      reader.readAsDataURL(droppedFiles[0]);
    }
  };

  const handleUploadAndParse = () => {
    if (files && files.length > 0) {
      // gotta need the API call here
      console.log("Uploading and parsing image...");

      setIsImageParsed(true);
    }
  };

  return (
    <>
      <StepperComponent currentStep={currentStep} />

      <ParseCardSection
        currentStep={currentStep}
        handleNextClick={handleNextClick}
        files={files}
        filePreview={filePreview}
        isImageParsed={isImageParsed}
        onDrop={handleImageDrop}
        onUploadAndParse={handleUploadAndParse}
      />

      <MoreInfoSection
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        handleNextClick={handleNextClick}
      />

      <CardSaveComponent currentStep={currentStep} />
    </>
  );
}
