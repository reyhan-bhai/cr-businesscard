"use client";
import Button from "@/components/button";
import CRForm from "@/components/form";
import ImageUploader from "@/components/imageUploader";
import StepperComponent from "@/components/stepperComponent";
import { useState } from "react";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextClick = () => {
    console.log("Next button clicked");
    setCurrentStep((prev) => prev + 1);
    console.log(currentStep);
  };

  return (
    <>
      <StepperComponent currentStep={currentStep} />
      <ImageUploader />
      {/* Form after image uploaded */}
      <CRForm />
      {/* If image not uploaded bg-zinc-500/50 */}
      <Button
        title="Next"
        className="w-full mt-5 mb-12  bg-zinc-500/50"
        onClick={handleNextClick}
      />
      {/* If image uploaded bg-green (about to be implemented below) */}
      {/* <Button title="Next" className="w-full mt-[16px] bg-green-600"></Button> */}
    </>
  );
}
