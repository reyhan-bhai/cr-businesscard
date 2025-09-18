import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import Image from "next/image";
import Button from "./button";

interface ImageUploaderProps {
  files?: File[];
  filePreview?: string;
  onDrop: (files: File[]) => void;
  onUploadAndParse: () => void;
  hasFiles?: boolean;
}

const ImageUploader = ({
  files,
  filePreview,
  onDrop,
  onUploadAndParse,
  hasFiles,
}: ImageUploaderProps) => {
  return (
    <div className="self-stretch p-8 bg-white rounded-xl  outline outline-1 outline-offset-[-1px] outline-stone-300 flex flex-col justify-center items-center gap-6 overflow-hidden">
      <Dropzone
        accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
        onDrop={onDrop}
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
      <Button
        title="Upload & Parse"
        onClick={onUploadAndParse}
        className={hasFiles ? "" : "bg-zinc-500/50 cursor-not-allowed"}
        disabled={!hasFiles}
      />
    </div>
  );
};

export default ImageUploader;
