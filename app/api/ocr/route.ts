import { ocrService } from "@/lib/ocrService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("OCR API route called");

  try {
    const formData = await request.formData();
    const files = formData.getAll("image") as File[];

    console.log(
      "Files received:",
      files.length > 0
        ? files.map((f) => `${f.name} (${f.size} bytes)`).join(", ")
        : "No files"
    );

    if (files.length === 0) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    let combinedText = "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let combinedWords: any[] = [];

    for (const file of files) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Invalid file type. Please upload an image." },
          { status: 400 }
        );
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: "File size too large. Maximum size is 10MB." },
          { status: 400 }
        );
      }

      console.log(`Processing file: ${file.name}`);
      // Convert file to buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Extract text using OCR service
      const result = await ocrService.extractTextFromImage(buffer);
      combinedText += result.fullText + "\n";
      combinedWords = [...combinedWords, ...result.words];
    }

    console.log("OCR result:", {
      textLength: combinedText.length,
      wordsCount: combinedWords.length,
    });

    return NextResponse.json({
      success: true,
      data: {
        fullText: combinedText,
        words: combinedWords,
      },
      message: "Text extracted successfully",
    });
  } catch (error) {
    console.error("OCR API Error:", error);

    // More detailed error information
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    const errorStack = error instanceof Error ? error.stack : undefined;

    console.error("Error details:", {
      message: errorMessage,
      stack: errorStack,
    });

    return NextResponse.json(
      {
        error: "Internal server error",
        message: errorMessage,
        details:
          process.env.NODE_ENV === "development" ? errorStack : undefined,
      },
      { status: 500 }
    );
  }
}

// Handle base64 image data
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { image } = body;

    if (!image) {
      return NextResponse.json(
        { error: "No base64 image data provided" },
        { status: 400 }
      );
    }

    // Extract text using OCR service
    const result = await ocrService.extractTextFromBase64(image);

    return NextResponse.json({
      success: true,
      data: result,
      message: "Text extracted successfully from base64 image",
    });
  } catch (error) {
    console.error("OCR API Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
