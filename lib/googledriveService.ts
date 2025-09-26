"use server";
import { JWT } from "google-auth-library";
import { google } from "googleapis";

// Service Account Credentials
const SERVICE_ACCOUNT_CREDENTIALS = {
  type: "service_account",
  project_id: "eirene-5413a",
  private_key_id: "f20ffb78369dcbcd7ad3395805efbe469304eac9",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDbAQ7ptDu8Msei\n2DqB5R5sKC7v1LhaSbWIKejbGkIXbpz6I9U2qiXrvoMWMLebNY57yuXMqDkA99Kh\nqKUmbZEyJv5SEBnuub+qD+YBOb3V3LVvtlgjiCfyaRhnQ6JmfEzV1fMXjM7Mnn82\nem+kxa+WgVEtgSz2G8cnJj5U/HCOk4T18iG2aR34y8/uiYfFPfU1MwpuhaJeG1m/\nKE4qyU8U6p8hRfoKWcr8iJwqptDwByjapjH5ij8ZaWHO93vjOMy/DQFtUqeHeMjJ\nvgrHC6CShX4Y9kCrBhzXX0IB4PqAwscNQll0oA55ZyZIpxV/YH1e6S6ua888O3ay\n6HfiE2TtAgMBAAECggEAAipqw2tgRYPACc93FqaVdtmCi1Bwc+4eK4b0kfQaxWC3\nOy8EXP/GPmRPfLZFyTUN9WdD1KgGNkj9GNL83RorcSebD2SFiSDmRmWABLDq5xTs\nE2XQzdB7H/sjk2PYajMzpFAIZnTNQmSVL/dP0tKPTQmhgUscJCE8BoUANqFvcILR\nasQ2RXsmEBUHUmduQQsjM4w0hWu4FYQaEX1l041RxlAKvOU4IYSRJFQTGjzPqQqB\n6XYasFDgzAMnvtBis81Ebue1xCfNrq3Bi4RjVdWUm9u/Y7vkaxI6hoP3iY49QNiX\nkqenxlOcXZhkdcRdtuCGxxo1wbm5qjqziIiaJNY72QKBgQD+XJSSFqA/0d1G0gYJ\nBABCek/xBlt6hrlx5OQDuscc7hbOFEGnd0sjN414xpdoEBR3gBXSFHJEMkFihK/L\nG3W2H1MHKwslfcz21/ENAhIYkyjyLvPUV3zlsSWkhQuALCwD5c3fNeyUt2sqi2vC\nR1cYDyCOHg1avJ/yOeZLkKHlCQKBgQDcai0wrfAWlJO4kn0+gor9nDZBOGe1p/k6\nNYcWWU2+jw0SvwTnmO/pvqQhp5NI7/INkXbN3wKrtrACdl7shH2Shf6Clz63mgoB\n9k3SuWNZzixr/cfFDbnDerHPLyu7Rqj3ACCIVzyqfjyck8qW90qcMz++6BGJfCNd\nAq6fwFM9xQKBgB282SnTN1z+vi3/c/Et5JHhFuOI6L0Ebz3fksDU316Ef2oMeDiJ\n++DcJ9AM97qU1q+569MpzMooTfikpqDKTxLBysU1xRHXCVV6nZX1vgPdgJX/40Xa\nDKIV+d6oJ1YO0/6IqW8FMOmaIA9TSX/nM0l+y0GSReFr2A9LsZ74A9VxAoGBAMoo\nxCvqzNMZEOfvy9mih/KV7Rkir9RoLOmboLv5ypmlwNrZwpjcp+ceiJGpjigOk1ao\nfWvTSDLQS1zmzqdl2XqjVUzXhZmGOfmUu8ozaRE8TXf6+tgcf63wAdfCLv0EkQKC\n5lPGl4jUYalG0EBordDYHHZviW4tIo4zYJB7KJ31AoGATsKF6KL5g6toQ6GC5Crr\n1MJ1GIeHWtpgfELpVUwJOIdzIVguS/dy5GaU0GzaW6pAZCB7PCQICnsVD+e964x0\ntVhE7MUs0rtKG7aLTeTO2UxQc47Ylfkfjrh7UXJHbcWkRfPidbou0poskU5yR6ml\nfYdNNN7utvzYcOfwWqEHtA4=\n-----END PRIVATE KEY-----\n",
  client_email: "googledrive-test@eirene-5413a.iam.gserviceaccount.com",
  client_id: "109336601970514884592",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/googledrive-test%40eirene-5413a.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

const GOOGLE_DRIVE_ID = "1RBYxSG1CdPtwncUrwNoUYcZojyEcHBJe";

// Initialize JWT client
const jwtClient = new JWT({
  email: SERVICE_ACCOUNT_CREDENTIALS.client_email,
  key: SERVICE_ACCOUNT_CREDENTIALS.private_key,
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
