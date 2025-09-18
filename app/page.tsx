"use client";
import Button from "@/components/button";
import CRForm from "@/components/form";
import ImageUploader from "@/components/imageUploader";
import StepperComponent from "@/components/stepperComponent";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [files, setFiles] = useState<File[] | undefined>();
  const [filePreview, setFilePreview] = useState<string | undefined>();
  const [isImageParsed, setIsImageParsed] = useState(true);

  useEffect(() => {
    console.log("Current Step:", currentStep);
  }, [currentStep]);

  const handleNextClick = () => {
    if (isImageParsed) {
      console.log("Next button clicked");
      setCurrentStep((prev) => prev + 1);
      console.log("Moving to step:", currentStep + 1);
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
      // Here you would typically make an API call to parse the image
      console.log("Uploading and parsing image...");

      // For now, I will just simulate the parsing process
      // gotta need the API call here
      setIsImageParsed(true);

      // You could also update the stepper here to extract the text
      // setCurrentStep(2);
    }
  };

  return (
    <>
      <div className={`w-full ${currentStep === 3 ? "hidden" : ""}`}>
        <StepperComponent currentStep={currentStep} />
      </div>

      <div
        className={`${
          currentStep === 1 ? "" : "hidden"
        } parse-card-page w-full`}
      >
        <ImageUploader
          files={files}
          filePreview={filePreview}
          onDrop={handleImageDrop}
          onUploadAndParse={handleUploadAndParse}
          hasFiles={files && files.length > 0}
        />

        {/* Form shown only after image is parsed */}
        {isImageParsed && <CRForm />}

        {/* Next button - only enabled when image is parsed */}
        <Button
          title="Next"
          color={!isImageParsed ? "bg-zinc-500/50" : "bg-green-600"}
          className={`w-full mt-5 mb-12 text-white  ${
            !isImageParsed ? "cursor-not-allowed " : ""
          }`}
          disabled={!isImageParsed}
          onClick={handleNextClick}
        />
      </div>

      <div
        className={`more-info-page w-full ${currentStep === 2 ? "" : "hidden"}`}
      >
        <div className="p-8 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-stone-300">
          <h2 className="text-xl font-bold text-black font-['DM_Sans'] mb-6">
            Additional Information
          </h2>
          <p className="text-black font-['DM_Sans'] mb-4">
            This is the more info page content for step 2.
          </p>

          <div className="flex flex-row w-full gap-x-3">
            <Button
              title="Back"
              className="w-full mt-5 mb-12 bg-gray-500"
              onClick={() => setCurrentStep(1)}
            />
            <Button
              title="Next"
              color="bg-green-600"
              className="w-full mt-5 mb-12 text-white"
              onClick={handleNextClick}
            />
          </div>
        </div>
      </div>

      <div
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
      </div>

      {/* If image uploaded bg-green (about to be implemented below) */}
      {/* <Button title="Next" className="w-full mt-[16px] bg-green-600"></Button> */}
    </>
  );
}
