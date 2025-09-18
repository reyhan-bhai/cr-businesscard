"use client";
import Button from "@/components/button";
import CustomDropdown from "@/components/CustomDropdown";
import CRForm from "@/components/form";
import FormField from "@/components/formField";
import ImageUploader from "@/components/imageUploader";
import StepperComponent from "@/components/stepperComponent";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [files, setFiles] = useState<File[] | undefined>();
  const [filePreview, setFilePreview] = useState<string | undefined>();
  const [isImageParsed, setIsImageParsed] = useState(true);

  const [fullName, setFullName] = useState("eg. John Doe");
  const [meetInput, setMeetInput] = useState("e.g., ATM 2025, Dubai");
  const [remark, setRemark] = useState(
    "Follow-up items, halal travel interest, etc,"
  );
  const [yourMessage, setYourMessage] = useState(
    "Follow-up items, halal travel interest, etc,"
  );
  const [selectedFollowUp, setSelectedFollowUp] = useState("yes");
  const [selectedFollowUpType, setSelectedFollowUpType] = useState("");

  const followUpOptions = ["CR Rating Information", "Others"];

  //
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
          color={!isImageParsed ? "bg-zinc-500/50" : "bg-[#007D49]"}
          className={`w-full mt-5 mb-12 text-white  ${
            !isImageParsed ? "cursor-not-allowed " : ""
          }`}
          disabled={!isImageParsed}
          onClick={handleNextClick}
        />
      </div>

      <div
        className={`more-info-page w-full mb-5 ${
          currentStep === 2 ? "" : "hidden"
        }`}
      >
        <div className="w-full p-6 bg-white rounded-xl shadow-[0px_2px_10px_6px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-stone-300 inline-flex flex-col justify-start items-center gap-6 overflow-hidden">
          <div className="self-stretch flex flex-col justify-start items-start gap-1">
            <div className="justify-start text-black  text-base font-bold font-['DM_Sans']">
              Who met this person
            </div>
            <FormField
              className="w-full "
              onChange={setFullName}
              placeholder={fullName}
            />
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-1">
            <div className="justify-start font-bold text-black text-base font-['DM_Sans']">
              Where did you meet
            </div>
            <FormField
              className="w-full "
              onChange={setMeetInput}
              placeholder={meetInput}
            />
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-3">
            <div className="justify-start text-black text-base font-medium font-['DM_Sans']">
              Remarks/Notes
            </div>
            <FormField
              onChange={setRemark}
              className="w-full "
              textArea={true}
              placeholder={remark}
              // value={remarksInput}
              // onChange={setRemarksInput}
              // onFocus={() => {
              //   if (remarksInput === "e.g., Follow-up on halal travel options") {
              //     setRemarksInput("");
              //   }
              // }}
            />
          </div>
        </div>

        <div className="w-full mt-4 p-6 bg-white rounded-xl shadow-[0px_2px_10px_6px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-stone-300 inline-flex flex-col justify-start items-center gap-6 overflow-visible">
          <div className="self-stretch flex flex-col justify-start items-start gap-3">
            <div className="justify-start text-black text-base font-medium font-['DM_Sans']">
              Do you want to follow up to this person?
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="followUp"
                  value="yes"
                  checked={selectedFollowUp === "yes"}
                  onChange={(e) => setSelectedFollowUp(e.target.value)}
                  className="w-4 h-4"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="followUp"
                  value="no"
                  checked={selectedFollowUp === "no"}
                  onChange={(e) => setSelectedFollowUp(e.target.value)}
                  className="w-4 h-4"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          <div
            className={`follow-up-page w-full flex flex-col gap-y-4 ${
              selectedFollowUp === "yes" ? "" : "hidden"
            }`}
          >
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <div className="justify-start text-black text-base font-medium font-['DM_Sans']">
                What is the follow-up regarding?
              </div>
              <div className="w-full relative">
                <CustomDropdown
                  options={followUpOptions}
                  placeholder="Select follow-up type"
                  onSelect={setSelectedFollowUpType}
                />
              </div>
              {/* <div className="self-stretch px-6 py-3 bg-white rounded-xl outline outline-[0.50px] outline-offset-[-0.50px] outline-zinc-500/50 inline-flex justify-between items-center overflow-hidden">
              <div className="justify-start text-black text-base font-medium font-['DM_Sans']">
                CR Rating Information
              </div>
              <div
                data-style="Outlined"
                className="w-6 h-6 relative overflow-hidden"
              >
                <div className="w-3 h-5 left-[22.71px] top-[6.29px] absolute origin-top-left rotate-90 bg-black" />
              </div>
            </div> */}
            </div>
            <div
              className={`self-stretch flex flex-col justify-start items-start gap-3 ${
                selectedFollowUpType === "Others" ? "" : "hidden"
              }`}
            >
              <div className="justify-start text-black text-base font-medium font-['DM_Sans']">
                Your Topic{" "}
              </div>
              <FormField
                className="w-full"
                placeholder="Type your topic here"
              />
            </div>
            <div
              className={`self-stretch flex flex-col justify-start items-start gap-3 ${
                selectedFollowUpType ? "" : "hidden"
              }`}
            >
              <div className="justify-start text-black text-base font-medium font-['DM_Sans']">
                Your Message{" "}
              </div>
              <div className="self-stretch h-32 relative bg-white rounded-xl outline outline-[0.50px] outline-offset-[-0.50px] outline-zinc-500/50 overflow-hidden">
                <FormField textArea={true} placeholder={yourMessage} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col w-full gap-x-3 gap-y-3 mt-5">
          <Button
            title="Back"
            color="bg-white-500"
            className="w-full  text-[#585858] border-black border"
            onClick={() => setCurrentStep(1)}
          />
          <Button
            title="Next"
            color="bg-[#007D49]"
            className="w-full  text-white"
            onClick={handleNextClick}
          />
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
