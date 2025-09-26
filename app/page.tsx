"use client";
import CardSavedComponent from "@/components/sections/cardSavedComponent";
import MoreInfoSection from "@/components/sections/moreInfoSection";
import ParseCardSection from "@/components/sections/parseCardSection";
import StepperComponent from "@/components/stepperComponent";
import { useState } from "react";

interface BusinessCardData {
  full_name: string;
  job_title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  address: string;
}

export default function Home() {
  // Parse Card Section
  const [currentStep, setCurrentStep] = useState(1);
  const [files, setFiles] = useState<File[] | undefined>();
  const [filePreview, setFilePreview] = useState<string | undefined>();
  const [isImageParsed, setIsImageParsed] = useState(false);
  const [extractedData, setExtractedData] = useState<
    BusinessCardData | undefined
  >();
  const [isProcessing, setIsProcessing] = useState(false);
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

  const handleUploadAndParse = async () => {
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    setIsImageParsed(false);

    try {
      console.log("Starting OCR and AI processing...");

      const formData = new FormData();
      formData.append("image", files[0]);

      const ocrResponse = await fetch("/api/ocr", {
        method: "POST",
        body: formData,
      });

      if (!ocrResponse.ok) {
        throw new Error("Failed to extract text from image");
      }

      const ocrResult = await ocrResponse.json();
      const extractedText = ocrResult.data.fullText;

      console.log("OCR extraction completed:", extractedText);

      const aiResponse = await fetch("/api/ai/extract-businesscard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ extractedText }),
      });

      if (!aiResponse.ok) {
        throw new Error("Failed to process text with AI");
      }

      const aiResult = await aiResponse.json();
      const businessCardData = aiResult.data;

      console.log("AI processing completed:", businessCardData);

      setExtractedData(businessCardData);
      setIsImageParsed(true);
    } catch (error) {
      console.error("Error processing business card:", error);
      alert("Failed to process business card. Please try again.");
    } finally {
      setIsProcessing(false);
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
        isProcessing={isProcessing}
        extractedData={extractedData}
        onDrop={handleImageDrop}
        onUploadAndParse={handleUploadAndParse}
      />

      <MoreInfoSection
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        handleNextClick={handleNextClick}
      />

      <CardSavedComponent currentStep={currentStep} />
    </>
  );
}
