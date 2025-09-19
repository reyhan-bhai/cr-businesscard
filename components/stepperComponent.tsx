"use client";
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { Check, LoaderCircleIcon } from "lucide-react";

const steps = [{ title: "Parse Card" }, { title: "More Information" }];

interface StepperComponentProps {
  currentStep: number;
}

export default function Component({ currentStep }: StepperComponentProps) {
  return (
    <div className={`w-full ${currentStep === 3 ? "hidden" : ""}`}>
      <Stepper
        value={currentStep}
        indicators={{
          completed: <Check className="size-4" />,
          loading: <LoaderCircleIcon className="size-4 animate-spin" />,
        }}
        className="space-y-8 mt-[24px]"
      >
        <StepperNav>
          {steps.map((step, index) => (
            <StepperItem
              key={index}
              step={index + 1}
              className="relative flex-1 items-start"
            >
              <StepperTrigger className="flex flex-col gap-2.5">
                <StepperIndicator className="bg-gray-200 text-gray-800 dark:bg-zinc-700 data-[state=active]:bg-[#0C007D] data-[state=active]:text-white data-[state=completed]:bg-green-600 data-[state=completed]:text-white">
                  {index + 1}
                </StepperIndicator>
                <StepperTitle>{step.title}</StepperTitle>
              </StepperTrigger>

              {steps.length > index + 1 && (
                <StepperSeparator className="absolute top-3 left-[calc(50%+1.5rem)] right-[calc(-50%+1.5rem)] h-0.5 bg-gray-200 group-data-[state=completed]/step:bg-green-600" />
              )}
            </StepperItem>
          ))}
        </StepperNav>

        <StepperPanel className="text-sm">
          {steps.map((step, index) => (
            <StepperContent
              key={index}
              value={index + 1}
              className="flex items-center justify-center"
            ></StepperContent>
          ))}
        </StepperPanel>
      </Stepper>{" "}
    </div>
  );
}
