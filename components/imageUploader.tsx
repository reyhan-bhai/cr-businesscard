import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRef } from "react";
import Button from "./button";

interface ImageUploaderProps {
  files?: File[];
  filePreview?: string;
  onDrop: (files: File[]) => void;
  onUploadAndParse: () => void;
  hasFiles?: boolean;
  isProcessing?: boolean;
}

const ImageUploader = ({
  filePreview,
  onDrop,
  onUploadAndParse,
  hasFiles,
  isProcessing,
}: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const filesArray = Array.from(selectedFiles);
      onDrop(filesArray);
    }
  };

  const handleClickArea = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="self-stretch p-8 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-stone-300 flex flex-col justify-center items-center gap-6 overflow-hidden">
      
      <Input
        id="picture"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Clickable area with same UI as dropzone */}
      <div
        onClick={handleClickArea}
        className="w-full py-12 bg-white rounded-xl flex flex-col justify-center items-center gap-2.5 overflow-hidden border-dashed border-2 border-zinc-300 cursor-pointer hover:border-zinc-400 transition-colors"
      >
        {!filePreview ? (
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
        ) : (
          <div className="h-[102px] w-full relative px-4">
            <Image
              alt="Preview"
              className="absolute top-0 left-0 h-full w-full object-contain rounded"
              src={filePreview}
              fill
            />
          </div>
        )}
      </div>

      <Button
        title={isProcessing ? "Processing..." : "Upload & Parse"}
        onClick={onUploadAndParse}
        className={
          hasFiles && !isProcessing ? "" : "bg-zinc-500/50 cursor-not-allowed"
        }
        disabled={!hasFiles || isProcessing}
      />
    </div>
  );
};

export default ImageUploader;
