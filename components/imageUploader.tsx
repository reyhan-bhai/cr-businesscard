import Button from "./button";

const ImageUploader = () => {
  return (
    <div className="self-stretch p-6 bg-white rounded-xl  outline outline-1 outline-offset-[-1px] outline-stone-300 inline-flex flex-col justify-center items-center gap-6 overflow-hidden">
      <div className="self-stretch h-32 py-6 bg-white rounded-xl outline outline-1 outline-zinc-500 flex flex-col justify-center items-center gap-2.5 overflow-hidden">
        <div className="w-96 h-14 flex flex-col justify-start items-center gap-2">
          <div className="self-stretch text-center justify-start">
            <span className="text-black text-base font-bold font-['DM_Sans']">
              Drop an image{" "}
            </span>
            <span className="text-black text-base font-normal font-['DM_Sans']">
              or
            </span>
            <span className="text-black text-base font-bold font-['DM_Sans']">
              {" "}
              tap to choose
            </span>
          </div>
          <div className="self-stretch text-center justify-start text-black text-sm font-normal font-['DM_Sans']">
            Large images are auto-resized before OCR for speed
          </div>
        </div>
      </div>
        <Button title="Upload & Parse"></Button>
    </div>
  );
};

export default ImageUploader;
