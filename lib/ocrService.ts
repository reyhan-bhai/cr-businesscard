import { ImageAnnotatorClient } from "@google-cloud/vision";

export interface OCRResult {
  fullText: string;
  confidence: number;
  words: {
    text: string;
    confidence: number;
    boundingBox: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  }[];
}

export class OCRService {
  private client: ImageAnnotatorClient;

  constructor() {
    try {
      console.log("Initializing Google Cloud Vision client...");

      console.log(
        "Project ID:",
        process.env.OCR_GOOGLE_PROJECT_ID ? "Set" : "Missing"
      );
      console.log(
        "Client Email:",
        process.env.OCR_GOOGLE_CLIENT_EMAIL ? "Set" : "Missing"
      );
      console.log(
        "Private Key:",
        process.env.OCR_GOOGLE_PRIVATE_KEY ? "Set" : "Missing"
      );

      // Initialize client with credentials directly
      this.client = new ImageAnnotatorClient({
        credentials: {
          client_email: process.env.OCR_GOOGLE_CLIENT_EMAIL,
          private_key: process.env.OCR_GOOGLE_PRIVATE_KEY,
        },
      });

      console.log(
        "Google Cloud Vision client initialized successfully with inline credentials"
      );
    } catch (error) {
      console.error("Error initializing Google Cloud Vision client:", error);
      throw new Error(
        `Failed to initialize Vision API client: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async extractTextFromImage(imageBuffer: Buffer): Promise<OCRResult> {
    try {
      // Perform text detection on the image buffer
      const [result] = await this.client.textDetection({
        image: {
          content: imageBuffer,
        },
      });

      const detections = result.textAnnotations || [];

      if (detections.length === 0) {
        return {
          fullText: "",
          confidence: 0,
          words: [],
        };
      }

      // The first detection contains the full text
      const fullTextAnnotation = detections[0];
      const fullText = fullTextAnnotation.description || "";

      // Extract individual words (skip the first one as it's the full text)
      const words = detections.slice(1).map((detection) => {
        const vertices = detection.boundingPoly?.vertices || [];

        // Calculate bounding box
        let minX = Infinity,
          minY = Infinity,
          maxX = 0,
          maxY = 0;
        vertices.forEach((vertex) => {
          const x = vertex.x || 0;
          const y = vertex.y || 0;
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        });

        return {
          text: detection.description || "",
          confidence: detection.confidence || 0,
          boundingBox: {
            x: minX === Infinity ? 0 : minX,
            y: minY === Infinity ? 0 : minY,
            width: maxX - (minX === Infinity ? 0 : minX),
            height: maxY - (minY === Infinity ? 0 : minY),
          },
        };
      });

      // Calculate overall confidence (average of word confidences)
      const averageConfidence =
        words.length > 0
          ? words.reduce((sum, word) => sum + word.confidence, 0) / words.length
          : 0;

      return {
        fullText,
        confidence: averageConfidence,
        words,
      };
    } catch (error) {
      console.error("Error extracting text from image:", error);
      throw new Error("Failed to extract text from image");
    }
  }

  async extractTextFromBase64(base64Image: string): Promise<OCRResult> {
    try {
      // Remove data URL prefix if present
      const base64Data = base64Image.replace(/^data:image\/[a-z]+;base64,/, "");
      const imageBuffer = Buffer.from(base64Data, "base64");

      return await this.extractTextFromImage(imageBuffer);
    } catch (error) {
      console.error("Error processing base64 image:", error);
      throw new Error("Failed to process base64 image");
    }
  }
}

export const ocrService = new OCRService();
