"use client";
import CardSavedComponent from "@/components/sections/cardSavedComponent";
import MoreInfoSection from "@/components/sections/moreInfoSection";
import ParseCardSection from "@/components/sections/parseCardSection";
import StepperComponent from "@/components/stepperComponent";
import { useState, useEffect } from "react";

export const dynamic = 'force-dynamic';


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
  const [mounted, setMounted] = useState(false);
  
  // Parse Card Section
  const [currentStep, setCurrentStep] = useState(1);
  const [files, setFiles] = useState<File[] | undefined>();
  const [filePreview, setFilePreview] = useState<string | undefined>();
  const [isImageParsed, setIsImageParsed] = useState(false);
  const [extractedData, setExtractedData] = useState<
    BusinessCardData | undefined
  >();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  // Parse Card Section End

  // More Info Section
  const [whoMet, setWhoMet] = useState("");
  const [whereMet, setWhereMet] = useState("");
  const [remarks, setRemarks] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [selectedFollowUp, setSelectedFollowUp] = useState("yes");
  const [selectedFollowUpType, setSelectedFollowUpType] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [isAppending, setIsAppending] = useState(false);
  // More Info Section End

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSaveCard = async () => {
    if (!files || files.length === 0 || !extractedData) {
      alert("Please parse a business card first.");
      return;
    }

    const emailSubjectToUse = selectedFollowUpType === "Others" ? emailSubject : selectedFollowUpType;

    const allData = {
      ...extractedData,
      whoMet,
      whereMet,
      remarks,
      emailMessage,
      emailSubject: emailSubjectToUse,
    };

    const formData = new FormData();
    formData.append("image", files[0]);
    formData.append("data", JSON.stringify(allData));

    try {
      setIsAppending(true);
      const response = await fetch("/api/save-card", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to save card data");
      }

      const result = await response.json();
      console.log(result.message);
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0 });
    } catch (error) {
      console.error("Error saving card:", error);
      alert("Failed to save card. Please try again.");
    } finally {
      setIsAppending(false);
    }
  };

  const handleNextClick = () => {
    if (isImageParsed) {
      console.log("Next button clicked");
      if (currentStep === 2) {
        handleSaveCard();
      } else {
        setCurrentStep((prev) => prev + 1);
        console.log("Moving to step:", currentStep + 1);
        window.scrollTo({ top: 0 });
      }
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

  if (!mounted) {
    return null;
  }

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
        setExtractedData={setExtractedData}
        onDrop={handleImageDrop}
        onUploadAndParse={handleUploadAndParse}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />

      <MoreInfoSection
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        handleNextClick={handleNextClick}
        whoMet={whoMet}
        setWhoMet={setWhoMet}
        whereMet={whereMet}
        setWhereMet={setWhereMet}
        remarks={remarks}
        setRemarks={setRemarks}
        yourMessage={emailMessage}
        setYourMessage={setEmailMessage}
        selectedFollowUp={selectedFollowUp}
        setSelectedFollowUp={setSelectedFollowUp}
        selectedFollowUpType={selectedFollowUpType}
        setSelectedFollowUpType={setSelectedFollowUpType}
        isAppending={isAppending}
        extractedData={extractedData}
        emailSubject={emailSubject}
        setEmailSubject={setEmailSubject}
      />

      <CardSavedComponent currentStep={currentStep} />
    </>
  );
}