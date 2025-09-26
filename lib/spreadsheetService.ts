'use server';
import { google } from "googleapis";

export async function getSheetData() { 
  const glAuth = await google.auth.getClient({
        credentials: {
            "private_key": process.env.GOOGLE_PRIVATE_KEY,
            "client_email": process.env.GOOGLE_SPREADSHEET_CLIENT_EMAIL,
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const glSheets = google.sheets({ version: "v4", auth: glAuth });

    const data = await glSheets.spreadsheets.values.get({
        spreadsheetId: "1daipgiXZeeznjoQ2c5Y5Wn6TCsFd5ckfH5UMwn-bi2I",
        range: 'Sheet2!A1:Z100',
    });

    return { data: data.data.values };
}