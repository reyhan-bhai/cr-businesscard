import { aiService } from "@/lib/aiService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { extractedText } = body;

    console.log(
      "AI extraction request received. Text length:",
      extractedText?.length || 0
    );

    if (!extractedText) {
      return NextResponse.json(
        {
          error: "No extracted text provided",
          message:
            "The OCR text is empty or missing. Please ensure the image contains readable text.",
        },
        { status: 400 }
      );
    }

    if (typeof extractedText !== "string") {
      return NextResponse.json(
        {
          error: "Invalid text format",
          message: "The extracted text must be a string",
        },
        { status: 400 }
      );
    }

    console.log("Calling AI service for business card extraction...");
    const businessCardInfo = await aiService.extractBusinessCardInfo(
      extractedText
    );

    console.log("AI extraction completed successfully");

    return NextResponse.json({
      success: true,
      data: businessCardInfo,
      message: "Business card information extracted successfully",
    });
  } catch (error) {
    console.error("AI Processing Error:", error);

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
        error: "Failed to process text with AI",
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
