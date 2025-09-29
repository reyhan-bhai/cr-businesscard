"use server";
import { google } from "googleapis";

export async function getSheetData() {
  const private_key = process.env.GOOGLE_SPREADSHEET_PRIVATE_KEY;
  const client_email = process.env.GOOGLE_SPREADSHEET_CLIENT_EMAIL;
  console.log("PRIVATE_KEY:", private_key);
  console.log("CLIENT_EMAIL:", client_email);
  const glAuth = await google.auth.getClient({
    credentials: {
      type: "service_account",
      project_id: "eirene-5413a",
      private_key_id: "7cd7d4fa43f6e834d500eeb8700125d15b4f06b7",
      private_key: `${private_key}`.replace(/\\n/g, "\n"),
      client_email: `${client_email}`,
      universe_domain: "googleapis.com",
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
