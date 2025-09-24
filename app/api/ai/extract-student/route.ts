import { aiService } from "@/lib/aiService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { extractedText } = body;

    if (!extractedText) {
      return NextResponse.json(
        { error: "No extracted text provided" },
        { status: 400 }
      );
    }

    // Process the extracted text with Gemini AI
    const studentInfo = await aiService.extractStudentInfo(extractedText);

    return NextResponse.json({
      success: true,
      data: studentInfo,
      message: "Student information extracted successfully",
    });
  } catch (error) {
    console.error("AI Processing Error:", error);
    return NextResponse.json(
      {
        error: "Failed to process text with AI",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
