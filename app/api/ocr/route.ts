import { ocrService } from "@/lib/ocrService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("OCR API route called");

  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;

    console.log(
      "File received:",
      file ? `${file.name} (${file.size} bytes)` : "No file"
    );

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

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

    console.log("Converting file to buffer...");
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log("Buffer created, size:", buffer.length);

    console.log("Calling OCR service...");
    // Extract text using OCR service
    const result = await ocrService.extractTextFromImage(buffer);
    console.log("OCR result:", {
      textLength: result.fullText.length,
      wordsCount: result.words.length,
    });

    return NextResponse.json({
      success: true,
      data: result,
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
