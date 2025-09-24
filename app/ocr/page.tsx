"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Copy,
  Download,
  FileImage,
  Loader2,
  Upload,
  Wand2,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface OCRResult {
  fullText: string;
  confidence: number;
  words: {
    text: string;
  }[];
}

interface StudentInfo {
  id: string;
  name: string;
  major: string;
  university: string;
  status?: string;
  campus?: string;
}

const Page = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [ocrResult, setOcrResult] = useState<OCRResult | null>(null);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [error, setError] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  const processWithAI = useCallback(async (text: string) => {
    setIsProcessingAI(true);

    try {
      const response = await fetch("/api/ai/extract-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ extractedText: text }),
      });

      const result = await response.json();
      console.log("AI processing result:", result);
      if (result.success) {
        setStudentInfo(result.data);
      } else {
        console.error("AI processing failed:", result.error);
        // Don't show error to user, just log it
      }
    } catch (err) {
      console.error("Error processing with AI:", err);
      // Don't show error to user, just log it
    } finally {
      setIsProcessingAI(false);
    }
  }, []);

  const processOCR = useCallback(
    async (file: File) => {
      setIsProcessing(true);
      setError("");

      try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch("/api/ocr", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          setOcrResult(result.data);
          setExtractedText(result.data.fullText);

          // Process with AI to extract student info
          await processWithAI(result.data.fullText);
        } else {
          setError(result.error || "Failed to extract text");
        }
      } catch (err) {
        setError(
          "Error processing image: " +
            (err instanceof Error ? err.message : "Unknown error")
        );
      } finally {
        setIsProcessing(false);
      }
    },
    [processWithAI]
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setFileName(file.name);
        setError("");
        const reader = new FileReader();
        reader.onload = () => {
          setUploadedImage(reader.result as string);
        };
        reader.readAsDataURL(file);

        await processOCR(file);
      }
    },
    [processOCR]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp"],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(extractedText);
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const downloadText = () => {
    const element = document.createElement("a");
    const file = new Blob([extractedText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `extracted-text-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const clearAll = () => {
    setUploadedImage(null);
    setExtractedText("");
    setOcrResult(null);
    setStudentInfo(null);
    setError("");
    setFileName("");
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          OCR Text Extraction
        </h1>
        <p className="text-gray-600">
          Upload an image to extract text using Google Cloud Vision API
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Image Upload
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <input {...getInputProps()} />
              <FileImage className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              {isDragActive ? (
                <p className="text-blue-600">Drop the image here...</p>
              ) : (
                <div>
                  <p className="text-gray-600 mb-2">
                    Drag & drop an image here, or click to select
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports PNG, JPG, JPEG, GIF, BMP, WebP (max 10MB)
                  </p>
                </div>
              )}
            </div>

            {fileName && (
              <p className="mt-2 text-sm text-gray-600">Selected: {fileName}</p>
            )}

            {uploadedImage && (
              <div className="mt-4">
                <div className="relative max-h-[300px] overflow-hidden rounded-lg border">
                  <Image
                    src={uploadedImage}
                    alt="Uploaded"
                    width={400}
                    height={300}
                    className="max-w-full h-auto object-contain"
                    style={{ maxHeight: "300px" }}
                  />
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="mt-4 flex items-center justify-center gap-2 text-blue-600">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processing image...</span>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Extracted Text</span>
              {extractedText && (
                <div className="flex gap-2">
                  {/* <Button
                    variant="outline"
                    size="sm"
                    onClick={() => processWithAI(extractedText)}
                    disabled={isProcessingAI}
                    className="flex items-center gap-1"
                  >
                    <Wand2 className="h-4 w-4" />
                    {isProcessingAI ? "Processing..." : "Process with AI"}
                  </Button> */}
                  {/* <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="flex items-center gap-1"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadText}
                    className="flex items-center gap-1"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button> */}
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="extracted-text">Full Text:</Label>
                <Textarea
                  id="extracted-text"
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  placeholder="Extracted text will appear here..."
                  className="min-h-[200px] mt-2"
                />
              </div>

              {ocrResult && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    {/* <span className="font-medium">Confidence Score:</span> */}
                    <span
                      className={`${
                        ocrResult.confidence > 0.8
                          ? "text-green-600"
                          : ocrResult.confidence > 0.6
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {/* {(ocrResult.confidence * 100).toFixed(1)}% */}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Words detected:</span>{" "}
                    {ocrResult.words.length}
                  </div>
                </div>
              )}

              {uploadedImage && (
                <Button variant="outline" onClick={clearAll} className="w-full">
                  Clear All
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Information Form */}
      {extractedText && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Student Information</span>
              {isProcessingAI && (
                <div className="flex items-center gap-2 text-blue-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Processing with AI...</span>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="student-id"
                    className="text-sm font-medium text-gray-700"
                  >
                    Student ID
                  </Label>
                  <div className="mt-1 p-3 border rounded-md bg-gray-50">
                    <span className="text-gray-900">
                      {studentInfo?.id || "Not detected"}
                    </span>
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="student-name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Name
                  </Label>
                  <div className="mt-1 p-3 border rounded-md bg-gray-50">
                    <span className="text-gray-900">
                      {studentInfo?.name || "Not detected"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="student-major"
                    className="text-sm font-medium text-gray-700"
                  >
                    Major
                  </Label>
                  <div className="mt-1 p-3 border rounded-md bg-gray-50">
                    <span className="text-gray-900">
                      {studentInfo?.major || "Not detected"}
                    </span>
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="student-university"
                    className="text-sm font-medium text-gray-700"
                  >
                    University
                  </Label>
                  <div className="mt-1 p-3 border rounded-md bg-gray-50">
                    <span className="text-gray-900">
                      {studentInfo?.university || "Not detected"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              {(studentInfo?.status || studentInfo?.campus) && (
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                  {studentInfo?.status && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Status
                      </Label>
                      <div className="mt-1 p-3 border rounded-md bg-gray-50">
                        <span className="text-gray-900">
                          {studentInfo.status}
                        </span>
                      </div>
                    </div>
                  )}
                  {studentInfo?.campus && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Campus
                      </Label>
                      <div className="mt-1 p-3 border rounded-md bg-gray-50">
                        <span className="text-gray-900">
                          {studentInfo.campus}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Debug Information */}
              {!studentInfo && !isProcessingAI && extractedText && (
                <div className="md:col-span-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-700 text-sm">
                    <span className="font-medium">AI Processing:</span> No
                    structured data extracted yet. Make sure the image contains
                    student information like ID, name, major, and university.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Page;
