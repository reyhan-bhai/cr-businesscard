import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import Image from "next/image";
import { useState } from "react";
import Button from "./button";

const ImageUploader = () => {
  const [files, setFiles] = useState<File[] | undefined>();
  const [filePreview, setFilePreview] = useState<string | undefined>();

  const handleDrop = (files: File[]) => {
    console.log(files);
    setFiles(files);
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          setFilePreview(e.target?.result);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };
  return (
    <div className="self-stretch p-8 bg-white rounded-xl  outline outline-1 outline-offset-[-1px] outline-stone-300 flex flex-col justify-center items-center gap-6 overflow-hidden">
      <Dropzone
        accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
        onDrop={handleDrop}
        onError={console.error}
        src={files}
        className=" py-12 bg-white rounded-xl flex flex-col justify-center items-center gap-2.5 overflow-hidden border-dashed border-2 border-zinc-300"
      >
        <DropzoneEmptyState>
          <div className="flex flex-col items-center justify-center">
            <div className="w-full truncate text-wrap text-center">
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
            <div className="w-full truncate text-wrap text-center text-black text-sm font-normal font-['DM_Sans']">
              Large images are auto-resized before OCR for speed
            </div>
          </div>
        </DropzoneEmptyState>
        <DropzoneContent>
          {filePreview && (
            <div className="h-[102px] w-full relative">
              <Image
                alt="Preview"
                className="absolute top-0 left-0 h-full w-full object-cover rounded"
                src={filePreview}
                fill
              />
            </div>
          )}
        </DropzoneContent>
      </Dropzone>
      <Button title="Upload & Parse"></Button>
    </div>
  );
};

export default ImageUploader;
