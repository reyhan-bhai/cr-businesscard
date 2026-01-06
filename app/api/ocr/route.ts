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
        ? files
            .map((f) => `${f.name} (${(f.size / 1024).toFixed(2)}KB)`)
            .join(", ")
        : "No files"
    );

    if (files.length === 0) {
      return NextResponse.json(
        {
          error: "No image file provided",
          message: "Please upload at least one image file",
        },
        { status: 400 }
      );
    }

    // Calculate total size
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    const totalSizeMB = totalSize / (1024 * 1024);

    console.log(`Total upload size: ${totalSizeMB.toFixed(2)}MB`);

    // Check total size limit (10MB per file, 20MB total for safety)
    const MAX_TOTAL_SIZE = 20 * 1024 * 1024; // 20MB
    if (totalSize > MAX_TOTAL_SIZE) {
      return NextResponse.json(
        {
          error: "Total file size too large",
          message: `Total size ${totalSizeMB.toFixed(2)}MB exceeds maximum of ${
            MAX_TOTAL_SIZE / (1024 * 1024)
          }MB`,
          details: {
            totalSize: totalSize,
            maxSize: MAX_TOTAL_SIZE,
            files: files.map((f) => ({ name: f.name, size: f.size })),
          },
        },
        { status: 413 }
      );
    }

    let combinedText = "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let combinedWords: any[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate file type
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          {
            error: "Invalid file type",
            message: `File "${file.name}" is not an image. Please upload only image files.`,
            details: { fileName: file.name, fileType: file.type },
          },
          { status: 400 }
        );
      }

      // Validate individual file size (max 10MB)
      const MAX_FILE_SIZE = 10 * 1024 * 1024;
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            error: "File size too large",
            message: `File "${file.name}" (${(
              file.size /
              (1024 * 1024)
            ).toFixed(2)}MB) exceeds maximum size of ${
              MAX_FILE_SIZE / (1024 * 1024)
            }MB`,
            details: {
              fileName: file.name,
              fileSize: file.size,
              maxSize: MAX_FILE_SIZE,
            },
          },
          { status: 413 }
        );
      }

      console.log(`Processing file ${i + 1}/${files.length}: ${file.name}`);

      try {
        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Extract text using OCR service
        const result = await ocrService.extractTextFromImage(buffer);
        combinedText += result.fullText + "\n";
        combinedWords = [...combinedWords, ...result.words];

        console.log(
          `File ${i + 1} processed: ${
            result.fullText.length
          } characters extracted`
        );
      } catch (fileError) {
        console.error(`Error processing file ${file.name}:`, fileError);
        return NextResponse.json(
          {
            error: "OCR processing failed",
            message: `Failed to extract text from "${file.name}": ${
              fileError instanceof Error ? fileError.message : "Unknown error"
            }`,
            details: {
              fileName: file.name,
              error:
                fileError instanceof Error
                  ? fileError.message
                  : String(fileError),
            },
          },
          { status: 500 }
        );
      }
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
      meta: {
        filesProcessed: files.length,
        totalSize: totalSize,
        textLength: combinedText.length,
      },
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
      type: error instanceof Error ? error.constructor.name : typeof error,
    });

    return NextResponse.json(
      {
        error: "Internal server error",
        message: errorMessage,
        details:
          process.env.NODE_ENV === "development"
            ? {
                stack: errorStack,
                type:
                  error instanceof Error
                    ? error.constructor.name
                    : typeof error,
              }
            : undefined,
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
