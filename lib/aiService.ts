import OpenAI from 'openai';

const API_KEY = process.env.LLM_API || "";

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
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: API_KEY,
    });
  }

  async extractBusinessCardInfo(extractedText: string) {
    try {
      console.log(extractedText);
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert at extracting structured information from business card text. Always respond with valid JSON only."
          },
          {
            role: "user",
            content: `Extract person information from this OCR text and return ONLY a valid JSON object.

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
4. No markdown, no explanations, ONLY the JSON object`

          }
        ],
        temperature: 0.1,
        max_tokens: 500
      });

      const text = completion.choices[0]?.message?.content || "";

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
      console.error("Error calling OpenAI:", error);
    }
  }

}

export const aiService = new AIService();