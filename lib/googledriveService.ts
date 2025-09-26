"use server";
import { JWT } from "google-auth-library";
import { google } from "googleapis";


const GOOGLE_DRIVE_ID = "1RBYxSG1CdPtwncUrwNoUYcZojyEcHBJe";

// Initialize JWT client
const jwtClient = new JWT({
  email: process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
  key: process.env.GOOGLE_DRIVE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
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

/**
 * Get file metadata from Google Drive
 */
export async function getFileMetadata(fileId: string = GOOGLE_DRIVE_ID) {
  try {
    await authenticateGoogleDrive();

    const response = await drive.files.get({
      fileId: fileId,
      fields:
        "id, name, mimeType, size, createdTime, modifiedTime, webViewLink, webContentLink",
    });

    return response.data;
  } catch (error) {
    console.error("Error getting file metadata:", error);
    throw error;
  }
}

/**
 * Download file content from Google Drive
 */
export async function downloadFileContent(fileId: string = GOOGLE_DRIVE_ID) {
  try {
    await authenticateGoogleDrive();

    const response = await drive.files.get({
      fileId: fileId,
      alt: "media",
    });

    return response.data;
  } catch (error) {
    console.error("Error downloading file content:", error);
    throw error;
  }
}

/**
 * Export Google Docs/Sheets/Slides to specified format
 */
export async function exportFile(
  fileId: string = GOOGLE_DRIVE_ID,
  mimeType: string = "application/pdf"
) {
  try {
    await authenticateGoogleDrive();

    const response = await drive.files.export({
      fileId: fileId,
      mimeType: mimeType,
    });

    return response.data;
  } catch (error) {
    console.error("Error exporting file:", error);
    throw error;
  }
}

/**
 * List files in a folder (if the ID is a folder)
 */
export async function listFilesInFolder(folderId: string = GOOGLE_DRIVE_ID) {
  try {
    await authenticateGoogleDrive();

    const response = await drive.files.list({
      q: `'${folderId}' in parents`,
      fields: "files(id, name, mimeType, size, createdTime, modifiedTime)",
    });

    return response.data.files;
  } catch (error) {
    console.error("Error listing files in folder:", error);
    throw error;
  }
}

/**
 * Get file permissions
 */
export async function getFilePermissions(fileId: string = GOOGLE_DRIVE_ID) {
  try {
    await authenticateGoogleDrive();

    const response = await drive.permissions.list({
      fileId: fileId,
      fields: "permissions(id, type, role, emailAddress)",
    });

    return response.data.permissions;
  } catch (error) {
    console.error("Error getting file permissions:", error);
    throw error;
  }
}

/**
 * Search files in Google Drive
 */
export async function searchFiles(query: string, maxResults: number = 10) {
  try {
    await authenticateGoogleDrive();

    const response = await drive.files.list({
      q: query,
      pageSize: maxResults,
      fields:
        "files(id, name, mimeType, size, createdTime, modifiedTime, webViewLink)",
    });

    return response.data.files;
  } catch (error) {
    console.error("Error searching files:", error);
    throw error;
  }
}

/**
 * Get file as base64 string (useful for images)
 */
export async function getFileAsBase64(
  fileId: string = GOOGLE_DRIVE_ID
): Promise<string> {
  try {
    const content = await downloadFileContent(fileId);

    if (typeof content === "string") {
      return Buffer.from(content).toString("base64");
    } else if (content instanceof Buffer) {
      return content.toString("base64");
    } else {
      return Buffer.from(JSON.stringify(content)).toString("base64");
    }
  } catch (error) {
    console.error("Error converting file to base64:", error);
    throw error;
  }
}

// Define interface for the result
interface GoogleDriveResult {
  metadata: unknown;
  content: unknown;
  files: unknown[] | null;
  permissions: unknown[] | null;
}

/**
 * Main function to access Google Drive content
 * Returns comprehensive information about the file/folder
 */
export async function accessGoogleDriveContent(
  fileId: string = GOOGLE_DRIVE_ID
) {
  try {
    const metadata = await getFileMetadata(fileId);

    const result: GoogleDriveResult = {
      metadata,
      content: null,
      files: null,
      permissions: null,
    };

    // Get permissions
    try {
      result.permissions = (await getFilePermissions(fileId)) || null;
    } catch (error) {
      console.warn("Could not get permissions:", error);
    }

    // Check if it's a folder
    if (metadata.mimeType === "application/vnd.google-apps.folder") {
      result.files = (await listFilesInFolder(fileId)) || null;
    } else {
      // Try to download content
      try {
        if (metadata.mimeType?.startsWith("application/vnd.google-apps.")) {
          // Google Docs/Sheets/Slides - export as PDF
          result.content = await exportFile(fileId, "application/pdf");
        } else {
          // Regular file - download directly
          result.content = await downloadFileContent(fileId);
        }
      } catch (error) {
        console.warn("Could not download content:", error);
      }
    }

    return result;
  } catch (error) {
    console.error("Error accessing Google Drive content:", error);
    throw error;
  }
}
