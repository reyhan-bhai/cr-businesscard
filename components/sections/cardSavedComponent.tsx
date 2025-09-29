"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../button";
interface CardSaveComponentProps {
  currentStep: number;
}
const CardSaveComponent: React.FC<CardSaveComponentProps> = ({
  currentStep,
}) => {
  const router = useRouter();
  return (
    <>
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
              // onClick={handleNextClick}
            />
            <Button
              title="Upload Another Card"
              color="bg-white-500"
              className="w-full text-black border border-gray-500"
              onClick={() => router.push("/")}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default CardSaveComponent;
