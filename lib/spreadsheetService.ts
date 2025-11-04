"use server";
import { google } from "googleapis";

export async function getSheetData() {
  const glAuth = await google.auth.getClient({
    credentials: {
      private_key: process.env.GOOGLE_PRIVATE_KEY,
      client_email: process.env.GOOGLE_SPREADSHEET_CLIENT_EMAIL,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const glSheets = google.sheets({ version: "v4", auth: glAuth });

  const data = await glSheets.spreadsheets.values.get({
    spreadsheetId: "1daipgiXZeeznjoQ2c5Y5Wn6TCsFd5ckfH5UMwn-bi2I",
    range: "Sheet2!A1:Z100",
  });

  return { data: data.data.values };
}

export async function appendToSheet(values: string[]) {
  const glAuth = await google.auth.getClient({
    credentials: {
      private_key: process.env.GOOGLE_SPREADSHEET_PRIVATE_KEY,
      client_email: process.env.GOOGLE_SPREADSHEET_CLIENT_EMAIL,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const glSheets = google.sheets({ version: "v4", auth: glAuth });

  try {
    const response = await glSheets.spreadsheets.values.append({
      spreadsheetId: "1hxo3xvlh4dh3vZKsgiT2VUr1nEwv06yWhrJG-4GiBOw",
      range: "Sheet1!A1",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [values],
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error appending to sheet:", error);
    throw error;
  }
}
