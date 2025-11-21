import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import Image from "next/image";
import Button from "./button";
import { useRef } from "react";

interface ImageUploaderProps {
  files?: File[];
  filePreview?: string;
  onDrop: (files: File[]) => void;
  onUploadAndParse: () => void;
  hasFiles?: boolean;
  isProcessing?: boolean;
}

const ImageUploader = ({
  files,
  filePreview,
  onDrop,
  onUploadAndParse,
  hasFiles,
  isProcessing,
}: ImageUploaderProps) => {
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const isMobile =
    typeof window !== "undefined" &&
    /Mobi|Android|iPhone/i.test(navigator.userAgent);
  return (
    <div className="self-stretch p-8 bg-white rounded-xl  outline outline-1 outline-offset-[-1px] outline-stone-300 flex flex-col justify-center items-center gap-6 overflow-hidden">
      {/* Hidden camera input */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={cameraRef}
        className="hidden"
        onChange={(e) => e.target.files && onDrop([...e.target.files])}
      />

      {/* Hidden gallery input */}
      <input
        type="file"
        accept="image/*"
        ref={galleryRef}
        className="hidden"
        onChange={(e) => e.target.files && onDrop([...e.target.files])}
      />

      <Dropzone
        {...(isMobile ? { noClick: true } : {})}
        onDrop={onDrop}
        onError={console.error}
        src={files}
        className=" py-12 bg-white rounded-xl flex flex-col justify-center items-center gap-2.5 overflow-hidden border-dashed border-2 border-zinc-300"
      >
        <DropzoneEmptyState>
          <div className="flex flex-col items-center justify-center">
            {/* Desktop: Text */}
            {!isMobile && (
              <div className="w-full">
                <span className="font-bold">Drop an image</span> or{" "}
                <span
                  className="font-bold text-blue-600 underline cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    galleryRef.current?.click(); // desktop picker
                  }}
                >
                  click to upload
                </span>
              </div>
            )}

            {/* Mobile: Text */}
            {isMobile && (
              <div className="w-full">
                <span className="font-bold">Pick an image</span>
              </div>
            )}

            {/* Mobile: Buttons */}
            {isMobile && (
              <div className="flex flex-row mt-4 gap-3 w-full px-6">
                <button
                  type="button"
                  className="w-full py-2 px-2 rounded-lg bg-blue-800 text-white font-semibold"
                  onClick={(e) => {
                    e.stopPropagation();
                    cameraRef.current?.click();
                  }}
                >
                  Take Photo
                </button>

                <button
                  type="button"
                  className="w-full py-2 px-2 rounded-lg bg-white text-black font-semibold border border-gray-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    galleryRef.current?.click();
                  }}
                >
                  Open Gallery
                </button>
              </div>
            )}
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
