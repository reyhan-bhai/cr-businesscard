"use client";
import Button from "@/components/button";
import CustomDropdown from "@/components/CustomDropdown";
import FormField from "@/components/formField";
import MoreInfoSection from "@/components/sections/moreInfoSection";
import ParseCardSection from "@/components/sections/parseCardSection";
import StepperComponent from "@/components/stepperComponent";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  // Parse Card Section
  const [currentStep, setCurrentStep] = useState(1);
  const [files, setFiles] = useState<File[] | undefined>();
  const [filePreview, setFilePreview] = useState<string | undefined>();
  const [isImageParsed, setIsImageParsed] = useState(false);
  // Parse Card Section End

  // More Info Section
  // const [fullName, setFullName] = useState("eg. John Doe");
  // const [meetInput, setMeetInput] = useState("e.g., ATM 2025, Dubai");
  // const [remark, setRemark] = useState(
  //   "Follow-up items, halal travel interest, etc,"
  // );
  // const [yourMessage, setYourMessage] = useState(
  //   "Follow-up items, halal travel interest, etc,"
  // );
  // const [selectedFollowUp, setSelectedFollowUp] = useState("yes");
  // const [selectedFollowUpType, setSelectedFollowUpType] = useState("");

  // const followUpOptions = ["CR Rating Information", "Others"];
  // More Info Section End

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


      <section
        className={`card-saved-component more-info-page w-full ${
          currentStep === 3 ? "" : "hidden"
        } mt-[24px]`}
      >
        <div className="p-8 flex flex-col justify-center items-center bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-stone-300">
          <Image
            className=""
            src="/images/laptop-minimal-check.png"
            alt="Description of image"
            width={100}
            height={100}
          />
          <p className="text-black font-['DM_Sans'] mb-4 text-justify">
            Congratulations! Your card has been successfully saved. Click the
            button below to access it.{" "}
          </p>

          <div className="flex flex-col w-full gap-y-[12px]">
            <Button
              title="CRHT Contact Sheets"
              color="bg-[#007D49]"
              className="w-full  text-white"
              onClick={handleNextClick}
            />
            <Button
              title="Upload Another Card"
              color="bg-white-500"
              className="w-full text-black border border-gray-500"
              onClick={() => setCurrentStep(1)}
            />
          </div>
        </div>
      </section>
    </>
  );
}
