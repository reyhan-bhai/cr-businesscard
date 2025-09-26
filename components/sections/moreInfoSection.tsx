import { useState } from "react";
import Button from "../button";
import CustomDropdown from "../CustomDropdown";
import FormField from "../formField";
interface MoreInfoSectionProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  handleNextClick: () => void;
}

const MoreInfoSection: React.FC<MoreInfoSectionProps> = ({
  currentStep,
  setCurrentStep,
  handleNextClick,
}) => {
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

  const followUpOptions = [
    "Thank You",
    "CR Rating Information",
    "More Discussion",
    "Others",
  ];
  return (
    <>
      <section
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
            <div className="justify-start text-black text-base font-bold font-['DM_Sans']">
              Remarks/Notes
            </div>
            <FormField
              onChange={setRemark}
              className="w-full "
              textArea={true}
              placeholder={remark}
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

          {/* <RadioGroup className="flex flex-col" defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">Option One</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">Option Two</Label>
            </div>
          </RadioGroup> */}

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
                Email Subject{" "}
              </div>
              <FormField
                onChange={setYourMessage}
                className="w-full"
                placeholder="Type Email Subject here"
              />
            </div>
            <div
              className={`self-stretch flex flex-col justify-start items-start gap-3 ${
                selectedFollowUpType ? "" : "hidden"
              }`}
            >
              <div className="justify-start text-black text-base font-medium font-['DM_Sans']">
                Email Message{" "}
              </div>
              <div className="self-stretch h-32 relative bg-white rounded-xl outline outline-[0.50px] outline-offset-[-0.50px] outline-zinc-500/50 overflow-hidden">
                <FormField
                  textArea={true}
                  placeholder={yourMessage}
                  onChange={setYourMessage}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col w-full gap-x-3 gap-y-3 mt-5 mb-12">
          <Button
            title="Back"
            color="bg-white-500"
            className="w-full  text-[#585858] border-black border"
            onClick={() => setCurrentStep(1)}
          />
          <Button
            title="Email"
            color="bg-[#518FED]"
            className={`w-full  text-white ${selectedFollowUp === "yes" ? "" : "hidden"}`}
            onClick={() => {
              /* Handle Email Action 
                 Direct to email app with prefilled content (About to be implemented)
              */
            }}
          />
          <Button
            title="Next"
            color="bg-[#007D49]"
            className="w-full  text-white"
            onClick={() => {
              /* Handle Next Action */
              {handleNextClick()}
              // Append to spreadsheet (About to be implemented)
            }}
          />
        </div>
      </section>
    </>
  );
};

export default MoreInfoSection;
