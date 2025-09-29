import { uploadFile } from "@/lib/googledriveService";
import { appendToSheet } from "@/lib/spreadsheetService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File;
    const data = JSON.parse(formData.get("data") as string);

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await image.arrayBuffer());
    const imageUrl = await uploadFile(image.name, fileBuffer, image.type);

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Failed to upload image to Google Drive" },
        { status: 500 }
      );
    }

    const timestamp = new Date().toISOString();
    const sheetData = [
      timestamp,
      data.full_name,
      data.job_title,
      data.company,
      data.email,
      data.phone,
      data.website,
      data.address,
      data.whoMet,
      data.whereMet,
      data.remarks,
      imageUrl,
    ];

    await appendToSheet(sheetData);

    return NextResponse.json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving card data:", error);
    return NextResponse.json(
      { error: "Failed to save card data" },
      { status: 500 }
    );
  }
}
