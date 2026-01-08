"use server";
import { google } from "googleapis";

export async function getSheetData() {
  const glAuth = await google.auth.getClient({
    credentials: {
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n").trim(),
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
export async function checkIfEmailExists(email: string) {
  const glAuth = await google.auth.getClient({
    credentials: {
      private_key: process.env.GOOGLE_SPREADSHEET_PRIVATE_KEY?.replace(/\\n/g, "\n").trim(),
      client_email: process.env.GOOGLE_SPREADSHEET_CLIENT_EMAIL,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const glSheets = google.sheets({ version: "v4", auth: glAuth });
  const spreadsheetId = "1hxo3xvlh4dh3vZKsgiT2VUr1nEwv06yWhrJG-4GiBOw"; // ID yang sama dengan appendToSheet

  try {
    // Mengambil Kolom E (Email) dari Sheet1
    const response = await glSheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: "Sheet1!E:E", 
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return { exists: false, rowIndex: -1 };
    }

    const targetEmail = email.toLowerCase().trim();
    
    // Cari index di array (rows adalah array of arrays, misal [['email1'], ['email2']])
    const index = rows.findIndex((r) => r[0]?.toString().toLowerCase().trim() === targetEmail);

    if (index !== -1) {
      // Mengembalikan true dan nomor baris spreadsheet (1-based index)
      return { exists: true, rowIndex: index + 1 };
    }

    return { exists: false, rowIndex: -1 };
  } catch (error) {
    console.error("Error checking email:", error);
    throw error;
  }
}


export async function appendToSheet(values: string[]) {
  const glAuth = await google.auth.getClient({
    credentials: {
      private_key: process.env.GOOGLE_SPREADSHEET_PRIVATE_KEY?.replace(/\\n/g, "\n").trim(),
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
