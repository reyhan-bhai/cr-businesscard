'use server';
import { google } from "googleapis";

export async function getSheetData() { 
  const glAuth = await google.auth.getClient({
        credentials: {
            // "type": "service_account",
            // "project_id": "eirene-5413a",
            // "private_key_id": "7cd7d4fa43f6e834d500eeb8700125d15b4f06b7",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCYDmiirA+Wqy5u\n9pCDVBgyjg6oh+hlsLCIJxxPTXB5cqb16pqrIVE+r209cySK1KtE3CWMmBtCYtnV\nDSNqX4cI4d1RbOnxQ8XNXkv/3r5jW2RLdUa2VVCpTiW+l2Tz6O5k25etUSr8lphx\n4U15gKMbGpMRC5nvHR1pN0jEnF4AeKtuG07V/HznE3YlTOZT8BYjZxnatk4JFX+s\n49NYZrmRZV37vXc4pIgGbWrvTiW+f/Xwg1Rdq0PJ0HHZs77QmshhRyMydCahufA6\nsrolYWgdogfnOPuKlpG3dWyVcqOF7EyiB5p8JOEZme6hfe+ojdr8KvfFN0r73eiL\ndSsAYd23AgMBAAECggEAAso85EM49ABHFVUj2K0J1p+hqDj6LCd+Tbk9/TyEBE50\nvs1jsiEl3vsUC40ZzgxR6i0J6Vb/JQwwSAb6L+D51tFiILTZZApkzjxdM6AwKR2L\nrRDFT+In3TtoWONpQEp1WVdoJI95NPJEcM57/+86zuwBZ84pMGh92ijgBm+CEAsf\nhl4Ldk4fVNSlXayaz6yaO148Xtz811Jy/vnsptj0pURLFxAwOlkpBWCIJvfsTmCF\nWmR50ZSH7VbkTteqWcT0cNGPo4RuShrXdfjt5p5f2U6cljPkM5DHeFGdOC9DCeUn\nG5p/8N9Xwk4MpD7eqC7g01oWyQDqo7xyUJBbnInNfQKBgQDPPnFJMt57SKYDTGrs\nVu59L00ny8ilTWQkAu7zt3OrpizbmLEax9gihKa0gdhTN2v5V5sL8idgw7ZLsUvw\nF7WE8x5/zj8NSLNALDpq77VWomJlETeboG1o0enmDsN4vD1kDRMvcvAvBtPkibta\nLzDI2UoAEtGbrA/qMjxjl6xQ8wKBgQC71DaQyujcesX4DE1GrPphE4JscukJ2ffB\nwqsvuU1tdYF0XeEwXVfCvqbF3K3cQbZ6pYEXw0H+8KOJvYpcag+wsOY5yAm1663m\nEE2LqP/0K6LdhtCkr/CGA90pHD5Juti9oUeKyKPLzTMM526DXf/uAJ8nyk3qyCzu\nfGsXDUqRLQKBgQCC8s+eEthlSbgsKWL+RseWrgaweKElYcs+vePCd05NTUjW0JpH\nc7LrzKmRMOJBYqmE+YfsemvLRp6vIS38XN7DTOMemnFYsXEhwVCANUp9nUlS1xgt\n66Z2Lvz98qIsbbTUvTY8KwH8lPHaW/TXvS20GygY98sd9BBySJ/DxhiJZQKBgF8V\nFmpFzYuPOxhOYfAdMMJjtepgYUfzZ1BW04HdNCztBxN5Ur3BAuQ6zwHqrLiLK2z6\ny1bUKVx9RMw9fwU5S6gOZP1rHj9Rhz6nkhnY+3kHffLWhFhaGFA/NH3TJlT8mSul\nsSm4V/KbdfRaU798nkpFVkw2RStNGjHAGhYZTF4hAoGAAjhkPMwxuiEMkrm38Sia\nMz7Jm4JSrrn9gA6VzwCQ/nzFgbEGUUm9FViaiTNULRWv6RprqKzJ7StULtg+FU2L\nWNPWh90gu6byxTWjsvwlumQAg1UCfN+fHhUdZ5g2cKm2qLl3/JncG0YAKpMIyGnI\nBJUJ33kDR+EuzWIaelYo+ho=\n-----END PRIVATE KEY-----\n",
            "client_email": "spreadsheet-test@eirene-5413a.iam.gserviceaccount.com",
            // "universe_domain": "googleapis.com"
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