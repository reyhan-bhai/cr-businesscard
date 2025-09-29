"use server";
import { JWT } from "google-auth-library";
import { google } from "googleapis";

const GOOGLE_DRIVE_ID = "1RBYxSG1CdPtwncUrwNoUYcZojyEcHBJe";

// Initialize JWT client
const jwtClient = new JWT({
  email: process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
  key: process.env.GOOGLE_DRIVE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

// Initialize Google Drive API
const drive = google.drive({ version: "v3", auth: jwtClient });

/**
 * Authenticate the service account
 */
export async function authenticateGoogleDrive(): Promise<void> {
  try {
    await jwtClient.authorize();
    console.log("Google Drive authentication successful");
  } catch (error) {
    console.error("Google Drive authentication failed:", error);
    throw error;
  }
}

import { Readable } from "stream";

/**
 * Upload a file to Google Drive
 */
export async function uploadFile(
  fileName: string,
  fileContent: Buffer,
  mimeType: string
) {
  try {
    await authenticateGoogleDrive();

    const fileMetadata = {
      name: fileName,
      parents: [GOOGLE_DRIVE_ID],
    };

    const media = {
      mimeType: mimeType,
      body: Readable.from(fileContent),
    };

    const file = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id, webViewLink",
      supportsAllDrives: true,
    });

    if (!file.data.id) {
      throw new Error("File ID not found after upload");
    }

    // Make the file publicly readable
    await drive.permissions.create({
      fileId: file.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    return file.data.webViewLink;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
