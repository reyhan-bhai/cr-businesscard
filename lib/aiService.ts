import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBSj2Pjpl3ALEbCinbs_YkG5JSZ9mINvVQ";

export interface BusinessCardInfo {
  full_name: string;
  job_title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  address: string;
}

export interface StudentInfo {
  id: string;
  name: string;
  major: string;
  university: string;
  status?: string;
  campus?: string;
}

class AIService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(API_KEY);
  }

  async extractBusinessCardInfo(extractedText: string) {
    try {
      const model = this.genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });
      console.log(extractedText);
      const prompt = `
Extract person information from this OCR text and return ONLY a valid JSON object.

OCR Text: "${extractedText}"

Rules:
1. Look for these patterns:
   - Full Name: Person's full name (usually in capital letters)
   - Job Title: The person job title 
   - Company: The Person company name
   - Email: The person's email address
   - Phone Number: The person's phone number
   - Website: The person's website URL
   - Address: The person's address

2. Return ONLY this JSON structure without any formatting or code blocks:
{

  "full_name": "full name",
  "job_title": "job title",
  "company": "company name",
  "email": "email address",
  "phone": "phone number",
  "website": "website URL",
  "address": "address"
}

3. Use empty string "" if field not found
4. No markdown, no explanations, ONLY the JSON object
            `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      try {
        let cleanedText = text.trim();
        if (cleanedText.startsWith("```json")) {
          cleanedText = cleanedText
            .replace(/```json\s*/, "")
            .replace(/\s*```$/, "");
        } else if (cleanedText.startsWith("```")) {
          cleanedText = cleanedText
            .replace(/```\s*/, "")
            .replace(/\s*```$/, "");
        }

        const businessCardInfo = JSON.parse(cleanedText) as BusinessCardInfo;

        // Return the business card info (empty fields are acceptable)
        return businessCardInfo;
      } catch (parseError) {
        console.error("Failed to parse AI response as JSON:", text, parseError);
      }
    } catch (error) {
      console.error("Error calling Gemini AI:", error);
    }
  }

  //   private extractBasicInfo(text: string): StudentInfo {
  //     const cleanText = text.replace(/\s+/g, " ").trim();

  //     let id = "";
  //     let name = "";
  //     let major = "";
  //     let university = "";
  //     let status = "";
  //     let campus = "";

  //     const idPattern = /\b\d{7,10}\b/;
  //     const idMatch = cleanText.match(idPattern);
  //     if (idMatch) {
  //       id = idMatch[0];
  //     }

  //     const universityPattern = /(UNIVERSITAS|INSTITUT|POLITEKNIK)\s+[A-Z\s]+/i;
  //     const universityMatch = cleanText.match(universityPattern);
  //     if (universityMatch) {
  //       const words = universityMatch[0].split(/\s+/);
  //       university = words.slice(0, Math.min(5, words.length)).join(" ");
  //     }

  //     const namePattern = /\b[A-Z]{2,}(?:\s+[A-Z]{2,}){1,4}\b/g;
  //     const nameMatches = cleanText.match(namePattern);
  //     if (nameMatches) {
  //       const filteredNames = nameMatches.filter(
  //         (match) =>
  //           !match.includes("UNIVERSITAS") &&
  //           !match.includes("INSTITUT") &&
  //           !match.includes("POLITEKNIK") &&
  //           match.split(/\s+/).length >= 2 &&
  //           match.split(/\s+/).length <= 4
  //       );
  //       if (filteredNames.length > 0) {
  //         name = filteredNames[0];
  //       }
  //     }

  //     const majorPatterns = [
  //       /Teknik\s+\w+\s*\([SD]\d\)/i,
  //       /\w+\s*\([SD]\d\)/i,
  //       /Teknik\s+\w+/i,
  //       /Sistem\s+\w+/i,
  //       /Manajemen\s+\w+/i,
  //       /Ilmu\s+\w+/i,
  //     ];

  //     for (const pattern of majorPatterns) {
  //       const majorMatch = cleanText.match(pattern);
  //       if (majorMatch) {
  //         major = majorMatch[0].trim();
  //         break;
  //       }
  //     }

  //     if (/\baktif\b/i.test(cleanText)) {
  //       status = "Aktif";
  //     } else if (/\blulus\b/i.test(cleanText)) {
  //       status = "Lulus";
  //     } else if (/\bcuti\b/i.test(cleanText)) {
  //       status = "Cuti";
  //     }

  //     const campusPatterns = [
  //       /kampus\s+[a-z]+/i,
  //       /\b[A-Z]+\s+Kampus\s+[A-Z]+/i,
  //       /UPI\s+Kampus\s+\w+/i,
  //     ];

  //     for (const pattern of campusPatterns) {
  //       const campusMatch = cleanText.match(pattern);
  //       if (campusMatch) {
  //         campus = campusMatch[0].trim();
  //         break;
  //       }
  //     }

  //     return {
  //       id,
  //       name,
  //       major,
  //       university,
  //       status,
  //       campus,
  //     };
  //   }
}

export const aiService = new AIService();
