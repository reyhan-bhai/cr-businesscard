import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import { Info } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import Button from "./button";

interface ImageUploaderProps {
  frontFiles?: File[];
  backFiles?: File[];
  frontPreview?: string;
  backPreview?: string;
  onFrontDrop: (files: File[]) => void;
  onBackDrop: (files: File[]) => void;
  onUploadAndParse: () => void;
  isProcessing?: boolean;
}

const ImageUploader = ({
  frontFiles,
  backFiles,
  frontPreview,
  backPreview,
  onFrontDrop,
  onBackDrop,
  onUploadAndParse,
  isProcessing,
}: ImageUploaderProps) => {
  const [showDualCards, setShowDualCards] = useState(false);
  const frontCameraRef = useRef<HTMLInputElement>(null);
  const frontGalleryRef = useRef<HTMLInputElement>(null);
  const backCameraRef = useRef<HTMLInputElement>(null);
  const backGalleryRef = useRef<HTMLInputElement>(null);

  const isMobile =
    typeof window !== "undefined" &&
    /Mobi|Android|iPhone/i.test(navigator.userAgent);

  const hasFiles =
    (frontFiles && frontFiles.length > 0) ||
    (backFiles && backFiles.length > 0);

  const handleInitialClick = () => {
    setShowDualCards(true);
  };

  const renderDropzone = (
    side: "front" | "back",
    files: File[] | undefined,
    preview: string | undefined,
    onDrop: (files: File[]) => void,
    cameraRef: React.RefObject<HTMLInputElement>,
    galleryRef: React.RefObject<HTMLInputElement>
  ) => (
    <div className="flex-1">
      {/* hidden inputs for camera/gallery */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={cameraRef}
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            console.log(
              `📷 Camera capture (${side}):`,
              file.name,
              `${(file.size / 1024).toFixed(2)}KB`
            );
            onDrop([...e.target.files]);
          }
        }}
      />
      <input
        type="file"
        accept="image/*"
        ref={galleryRef}
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            console.log(
              `🖼️ Gallery pick (${side}):`,
              file.name,
              `${(file.size / 1024).toFixed(2)}KB`
            );
            onDrop([...e.target.files]);
          }
        }}
      />

      <div className="mb-2">
        <span className="font-semibold text-sm text-gray-700 capitalize">
          {side} Side
        </span>
      </div>

      <Dropzone
        {...(isMobile ? { noClick: true } : {})}
        onDrop={onDrop}
        onError={console.error}
        src={files?.length ? files : undefined}
        className="py-12 bg-white rounded-xl flex flex-col justify-center items-center gap-2.5 overflow-hidden border-dashed border-2 border-zinc-300"
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
                {/* Use non-button interactive elements to avoid nested <button> */}
                <div
                  role="button"
                  tabIndex={0}
                  className="w-full py-2 px-2 rounded-lg bg-blue-800 text-white font-semibold flex items-center justify-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    cameraRef.current?.click();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      cameraRef.current?.click();
                    }
                  }}
                >
                  Take Photo
                </div>

                <div
                  role="button"
                  tabIndex={0}
                  className="w-full py-2 px-2 rounded-lg bg-white text-black font-semibold border border-gray-300 flex items-center justify-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    galleryRef.current?.click();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      galleryRef.current?.click();
                    }
                  }}
                >
                  Open Gallery
                </div>
              </div>
            )}
          </div>
        </DropzoneEmptyState>

        <DropzoneContent>
          {preview && (
            <div className="h-[102px] w-full relative">
              <Image
                alt={`${side} side preview`}
                className="absolute top-0 left-0 h-full w-full object-cover rounded"
                src={preview}
                fill
              />
            </div>
          )}
        </DropzoneContent>
      </Dropzone>
    </div>
  );

  if (!showDualCards) {
    return (
      <div className="self-stretch p-8 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-stone-300 flex flex-col justify-center items-center gap-6 overflow-hidden">
        <div
          onClick={handleInitialClick}
          className="w-full py-12 bg-white rounded-xl flex flex-col justify-center items-center gap-2.5 overflow-hidden border-dashed border-2 border-zinc-300 cursor-pointer hover:border-blue-400 transition-colors"
        >
          <div className="flex flex-col items-center justify-center">
            {!isMobile && (
              <div className="w-full flex flex-col justify-center items-center space-y-6">
                <div>
                  <span className="font-bold">Drop an image</span> or{" "}
                  <span className="font-bold">Tap to choose</span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Info className="h-4 w-4 text-blue-700" />
                  <span className="font-bold text-blue-700">
                    You can upload up to 2 images (front and back of the card)
                  </span>
                </div>
              </div>
            )}

            {isMobile && (
              <div className="w-full flex flex-col items-center">
                <span className="font-bold mb-4">Pick an image</span>
                <div className="flex flex-row items-center gap-2 px-6">
                  <Info className="h-4 w-4 text-blue-700" />
                  <span className="text-sm text-blue-700">
                    Upload front and back of the card
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="self-stretch p-8 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-stone-300 flex flex-col justify-center items-center gap-6 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-6 w-full">
        {renderDropzone(
          "front",
          frontFiles,
          frontPreview,
          onFrontDrop,
          frontCameraRef,
          frontGalleryRef
        )}
        {renderDropzone(
          "back",
          backFiles,
          backPreview,
          onBackDrop,
          backCameraRef,
          backGalleryRef
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
