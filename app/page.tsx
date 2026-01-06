"use client";
import CardSavedComponent from "@/components/sections/cardSavedComponent";
import MoreInfoSection from "@/components/sections/moreInfoSection";
import ParseCardSection from "@/components/sections/parseCardSection";
import StepperComponent from "@/components/stepperComponent";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
export const dynamic = "force-dynamic";

interface BusinessCardData {
  full_name: string;
  job_title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  address: string;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // Parse Card Section
  const [currentStep, setCurrentStep] = useState(1);
  const [files, setFiles] = useState<File[] | undefined>();
  const [filePreviews, setFilePreviews] = useState<(string | undefined)[]>([]);
  const [isImageParsed, setIsImageParsed] = useState(false);
  const [extractedData, setExtractedData] = useState<
    BusinessCardData | undefined
  >();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  // Parse Card Section End

  // More Info Section
  const [whoMet, setWhoMet] = useState("");
  const [whereMet, setWhereMet] = useState("");
  const [remarks, setRemarks] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [selectedFollowUp, setSelectedFollowUp] = useState("yes");
  const [selectedFollowUpType, setSelectedFollowUpType] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [isAppending, setIsAppending] = useState(false);
  // More Info Section End

  useEffect(() => {
    setMounted(true);

    // const dummyData: BusinessCardData = {
    //   full_name: "Test User Static",
    //   job_title: "Software Engineer",
    //   company: "Tech Corp",
    //   email: "test.duplicate@example.com",
    //   phone: "08123456789",
    //   website: "www.example.com",
    //   address: "Jakarta, Indonesia",
    // };

    // setExtractedData(dummyData);
    // setIsImageParsed(true);

    // const dummyFile = new File(["dummy content"], "test-image.png", {
    //   type: "image/png",
    // });
    // setFiles([dummyFile]);
  }, []);

  const handleSaveCard = async () => {
    if (!files || files.length === 0 || !extractedData) {
      alert("Please parse a business card first.");
      return;
    }

    const emailSubjectToUse =
      selectedFollowUpType === "Others" ? emailSubject : selectedFollowUpType;

    const allData = {
      ...extractedData,
      phone: extractedData.phone?.replace(/^\+/, "") || "",
      whoMet,
      whereMet,
      remarks,
      emailMessage,
      emailSubject: emailSubjectToUse,
    };

    const formData = new FormData();
    formData.append("image", files[0]);
    formData.append("data", JSON.stringify(allData));

    try {
      setIsAppending(true);
      const response = await fetch("/api/save-card", {
        method: "POST",
        body: formData,
      });

      // if (!response.ok) {
      //   if(response.status === 409) {
      //     const errorResult = await response.json();
      //     alert(errorResult.error);
      //     return;
      //   }
      //   throw new Error("Failed to save card data");
      // }

      const result = await response.json();
      console.log(result.message);
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0 });
    } catch (error) {
      console.error("Error saving card:", error);
      alert("Error saving card. Please try again.");
    } finally {
      setIsAppending(false);
    }
  };

  const handleNextClick = () => {
    if (isImageParsed) {
      console.log("Next button clicked");
      if (currentStep === 2) {
        handleSaveCard();
      } else {
        setCurrentStep((prev) => prev + 1);
        console.log("Moving to step:", currentStep + 1);
        window.scrollTo({ top: 0 });
      }
    }
  };

  const compressImage = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement("img");
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Max dimensions for compression
          const MAX_WIDTH = 1920;
          const MAX_HEIGHT = 1920;

          let width = img.width;
          let height = img.height;

          // Calculate new dimensions while maintaining aspect ratio
          if (width > height) {
            if (width > MAX_WIDTH) {
              height = (height * MAX_WIDTH) / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = (width * MAX_HEIGHT) / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                });
                console.log(
                  `Compressed ${file.name}: ${(file.size / 1024).toFixed(
                    2
                  )}KB -> ${(compressedFile.size / 1024).toFixed(2)}KB`
                );
                resolve(compressedFile);
              } else {
                reject(new Error("Failed to compress image"));
              }
            },
            "image/jpeg",
            0.85 // Quality: 0.85 = 85%
          );
        };
        img.onerror = () =>
          reject(new Error("Failed to load image for compression"));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const handleImageDrop = async (droppedFiles: File[]) => {
    console.log(
      "Original files:",
      droppedFiles.map((f) => `${f.name} (${(f.size / 1024).toFixed(2)}KB)`)
    );

    try {
      // Compress images before storing
      const compressedFiles = await Promise.all(
        droppedFiles.map((file) => compressImage(file))
      );

      setFiles(compressedFiles);
      setIsImageParsed(false);

      // Generate previews
      compressedFiles.forEach((file, index) => {
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (typeof e.target?.result === "string") {
              setFilePreviews((prev) => {
                const newPreviews = [...prev];
                newPreviews[index] = e.target?.result as string;
                return newPreviews;
              });
            }
          };
          reader.readAsDataURL(file);
        }
      });
    } catch (error) {
      console.error("Error compressing images:", error);
      Swal.fire({
        icon: "error",
        title: "Image Compression Failed",
        text: error instanceof Error ? error.message : "Unknown error occurred",
        heightAuto: true,
      });
    }
  };

  const handleUploadAndParse = async () => {
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    setIsImageParsed(false);

    try {
      console.log("Starting OCR and AI processing...");
      console.log(`Files to process: ${files.length}`);
      files.forEach((file, idx) => {
        console.log(
          `File ${idx + 1}: ${file.name} - ${(file.size / 1024).toFixed(2)}KB`
        );
      });

      const formData = new FormData();
      files.forEach((file) => {
        if (file) formData.append("image", file);
      });

      console.log("Sending OCR request...");
      const ocrResponse = await fetch("/api/ocr", {
        method: "POST",
        body: formData,
      });

      console.log(
        `OCR Response Status: ${ocrResponse.status} ${ocrResponse.statusText}`
      );

      if (!ocrResponse.ok) {
        const errorData = await ocrResponse.json().catch(() => ({}));
        const errorMessage =
          errorData.error || errorData.message || ocrResponse.statusText;

        console.error("OCR API Error Response:", {
          status: ocrResponse.status,
          statusText: ocrResponse.statusText,
          error: errorData,
        });

        // Handle specific error codes
        if (ocrResponse.status === 413) {
          throw new Error(
            `Image file(s) too large for server (${ocrResponse.status}). ` +
              `Total size: ${(
                files.reduce((sum, f) => sum + f.size, 0) / 1024
              ).toFixed(2)}KB. ` +
              `Try using lower resolution images.`
          );
        } else if (ocrResponse.status === 400) {
          throw new Error(`Invalid request: ${errorMessage}`);
        } else if (ocrResponse.status >= 500) {
          throw new Error(
            `Server error (${ocrResponse.status}): ${errorMessage}`
          );
        } else {
          throw new Error(
            `OCR failed (${ocrResponse.status}): ${errorMessage}`
          );
        }
      }

      const ocrResult = await ocrResponse.json();
      const extractedText = ocrResult.data.fullText;

      console.log(
        "OCR extraction completed. Text length:",
        extractedText.length
      );
      console.log("Extracted text preview:", extractedText.substring(0, 200));

      console.log("Sending AI extraction request...");
      const aiResponse = await fetch("/api/ai/extract-businesscard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ extractedText }),
      });

      console.log(
        `AI Response Status: ${aiResponse.status} ${aiResponse.statusText}`
      );

      if (!aiResponse.ok) {
        const errorData = await aiResponse.json().catch(() => ({}));
        const errorMessage =
          errorData.error || errorData.message || aiResponse.statusText;

        console.error("AI API Error Response:", {
          status: aiResponse.status,
          statusText: aiResponse.statusText,
          error: errorData,
        });

        throw new Error(
          `AI processing failed (${aiResponse.status}): ${errorMessage}`
        );
      }

      const aiResult = await aiResponse.json();
      const businessCardData = aiResult.data;

      console.log("AI processing completed:", businessCardData);

      if (businessCardData.email) {
        try {
          console.log("Checking for duplicate email...");
          const checkRes = await fetch("/api/check-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: businessCardData.email }),
          });

          if (checkRes.ok) {
            const checkData = await checkRes.json();
            if (checkData.exists) {
              Swal.fire({
                icon: "error",
                title: "Duplicate Entry",
                heightAuto: true,
                html: `This person already exists in the spreadsheet <br/> (Row: ${checkData.rowIndex}) with email <b>"${businessCardData.email}"</b>.`,
              });
              setIsProcessing(false);
              return;
            }
          }
        } catch (err) {
          console.error("Failed to check duplicate:", err);
          // Continue processing even if duplicate check fails
        }
      }

      setExtractedData(businessCardData);
      setIsImageParsed(true);
      console.log("✅ Processing completed successfully");
    } catch (error) {
      console.error("❌ Error processing business card:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      Swal.fire({
        icon: "error",
        title: "Processing Failed",
        html: `
          <div style="text-align: left;">
            <p><strong>Error:</strong> ${errorMessage}</p>
            <hr style="margin: 10px 0;"/>
            <p style="font-size: 12px; color: #666;">
              <strong>Debug Info:</strong><br/>
              Files: ${files?.length || 0}<br/>
              Total Size: ${
                files
                  ? (files.reduce((sum, f) => sum + f.size, 0) / 1024).toFixed(
                      2
                    )
                  : 0
              }KB<br/>
              ${
                files
                  ?.map(
                    (f, i) => `File ${i + 1}: ${(f.size / 1024).toFixed(2)}KB`
                  )
                  .join("<br/>") || ""
              }
            </p>
          </div>
        `,
        heightAuto: true,
        width: 600,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <StepperComponent currentStep={currentStep} />

      <ParseCardSection
        currentStep={currentStep}
        handleNextClick={handleNextClick}
        files={files}
        filePreviews={filePreviews}
        isImageParsed={isImageParsed}
        isProcessing={isProcessing}
        extractedData={extractedData}
        setExtractedData={setExtractedData}
        onDrop={handleImageDrop}
        onUploadAndParse={handleUploadAndParse}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />

      <MoreInfoSection
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        handleNextClick={handleNextClick}
        whoMet={whoMet}
        setWhoMet={setWhoMet}
        whereMet={whereMet}
        setWhereMet={setWhereMet}
        remarks={remarks}
        setRemarks={setRemarks}
        yourMessage={emailMessage}
        setYourMessage={setEmailMessage}
        selectedFollowUp={selectedFollowUp}
        setSelectedFollowUp={setSelectedFollowUp}
        selectedFollowUpType={selectedFollowUpType}
        setSelectedFollowUpType={setSelectedFollowUpType}
        isAppending={isAppending}
        extractedData={extractedData}
        emailSubject={emailSubject}
        setEmailSubject={setEmailSubject}
      />

      <CardSavedComponent currentStep={currentStep} />
    </>
  );
}
