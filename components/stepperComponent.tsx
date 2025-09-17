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
} from '@/components/ui/stepper';
import { Check, LoaderCircleIcon } from 'lucide-react';

const steps = [{ title: 'Step 1' }, { title: 'Step 2' }];

export default function Component() {
  return (
    <Stepper
      defaultValue={2}
      indicators={{
        completed: <Check className="size-4" />,
        loading: <LoaderCircleIcon className="size-4 animate-spin" />,
      }}
      className="space-y-8 mt-[24px]"
    >
      <StepperNav>
        {steps.map((step, index) => (
          <StepperItem key={index} step={index + 1} className="relative flex-1 items-start">
            <StepperTrigger className="flex flex-col gap-2.5">
              <StepperIndicator className="bg-gray-200 text-gray-800 dark:bg-zinc-700 data-[state=active]:bg-[#0C007D] data-[state=active]:text-white data-[state=completed]:bg-green-600 data-[state=completed]:text-white">
                {index + 1}
              </StepperIndicator>
              <StepperTitle>{step.title}</StepperTitle>
            </StepperTrigger>

            {steps.length > index + 1 && (
              <StepperSeparator className="absolute top-3 inset-x-0 left-[calc(50%+0.875rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none group-data-[state=completed]/step:bg-primary" />
            )}
          </StepperItem>
        ))}
      </StepperNav>


    </Stepper>
  );
}
