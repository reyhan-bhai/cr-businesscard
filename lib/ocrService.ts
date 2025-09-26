import { ImageAnnotatorClient } from "@google-cloud/vision";

// Service Account Credentials for Google Cloud Vision
const VISION_SERVICE_ACCOUNT_CREDENTIALS = {
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDIuzBG/bZtLHnO\nRP808Sc8hLCyRR8P0s/SvUD+l2jm0VaY36X0tD73bDmO2h0VkW5WjDCkrj1FluTb\npxqss3Ou7FUmyxnWg8TNGvcLTwPWDYMmlVqYbX667vNXTT8wLTXbcwo4AOW77m0E\nZaWIIvnynuVofXVjlATV1KCGKJIvi7KVjiyPpJSor3/e/d9OuqEBWubae4CvifLI\nutIx6Aojm0UwUsgb1G6IjYHeu8XkrSV6exxEmJzMegA6tL2iCEjIe61iZc0vg6eu\nV8dIaL1IBY5b1ZRmX3eG4Bu8Lqxrdr4uidDDTWy9CrdLNzbx7Pbjab0Q94GlnmTm\nLjagLt//AgMBAAECggEAGe7tLs7KidJMLlUFr75UNmJiPbXmbHHs/aoLwpinKeLz\n0C5cz3+V/vtReF4/kbDHU5ErG6uTKPF0wdgV/yf0Ey5fVfK5dNhzTZhlQGXF9hqq\nzgpPuQ+0ZsxGTgoh1sSQh7iWImQjSiNknEPRngP+zNSwiM5koyfVdBbTYmHNeSzV\nYhXmkqOBqdnD0r2foLAmhKNqEa5DpCzV0kefD2cdfPuvqgfbkW2WBw0KBA1rk3gB\nOtcdNYhwclCB3dufarMip3DCRbsKegqYyOlClYbSM1ls6qjXsDNnxDdrVjmeVL86\nv6tK9zAbfhbfqqIK5PmtNMUOJ+x4hXHtXBgZb8sRuQKBgQD459Ji33MnNH8UOs6M\nfX34Ed+4CdO7Id/afhnsiNl5sWzS7Q0RSQgRJC+pPy3B2L0OqcGd5UG1Pe+/fwyb\nrsCjmWY3IcbpNt8gqiisTS31WSrKx/S0XlN35ORliAgjRHKpQoQYaR12aWoCGtcO\nyK1lAz/u+IWaiAuB7PPCeP7C9QKBgQDOc9ro9xeByo7DfTLKFclWVvpMvq+ISK8V\ncimcEU1OIzuEvrTHkKOvVwfqjMP/HyZXAky03dp87N/u92qoECr4xDDF2LGCT0OJ\n507lzezfodO2D12Vh/Au7ohg6+PhhLKF2lVmhZKJvymmTEqVVtsQJ2Od3wo2ot3Q\nnsgO/WsGowKBgBvsJbXhy1FCml7ymek4ysDhgG9s6su7aRlhvBbE42C7frHK1gRy\nZO1HWfFqnP96CPt0H7xO06g5YoPhBNESMZoow0a8C0xuU2merSFnJxi3AA3vkIwL\naOGyU8zwDbmnHBXQ2HDEmgGGodXKnQWTjaAfVTTBvHsxd9kDc/UFDc9hAoGAKIR4\nTAxiYqicSCWEGEEaWIWNbg5maLrLEcxr+iMzJsinX7AFzrzGQx0zgobJ2IIGhkD/\nSOfZf3cFo+KO3hj+NgBbChkzDT39JU1uII+/k0wxPqPZXAVnz+4kedER0iq21qo4\n5HwGfF42EFscsB5xs8PnOw6Q9JQWMGFZJgf6Pz0CgYBMiDtVzcbmHnLXWBUXY1FD\ntwKLVUyn+3lxTBX81HV8JcTUG5OVtjnTVOFGLWRjYzaFE+Pw6BI102+dP0BFMY7b\nMN9rJNwlzj7enLVI3pJxM8GhstbVc1Qce3EwCccGRakudJ8ks5+wt63rWXSNWJ49\nNQ+LlbX4sKF0RVJHWM0Uug==\n-----END PRIVATE KEY-----\n",
  client_email: "ocr-94@eirene-5413a.iam.gserviceaccount.com",
  // client_id: "105569258412552814973",
  // auth_uri: "https://accounts.google.com/o/oauth2/auth",
  // token_uri: "https://oauth2.googleapis.com/token",
  // auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  // client_x509_cert_url:
  //   "https://www.googleapis.com/robot/v1/metadata/x509/ocr-94%40eirene-5413a.iam.gserviceaccount.com",
  // universe_domain: "googleapis.com",
};

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
        "OCR_GOOGLE_CLIENT_EMAIL:",
        process.env.OCR_GOOGLE_CLIENT_EMAIL === VISION_SERVICE_ACCOUNT_CREDENTIALS.client_email
          ? "Matches expected"
          : "Does not match expected"
      );
      console.log(
        "OCR_GOOGLE_PRIVATE_KEY:",
        process.env.OCR_GOOGLE_PRIVATE_KEY === VISION_SERVICE_ACCOUNT_CREDENTIALS.private_key
          ? "Matches expected"
          : "Does not match expected"
      );

      // Initialize client with credentials directly
      this.client = new ImageAnnotatorClient({
        credentials: {
          client_email: VISION_SERVICE_ACCOUNT_CREDENTIALS.client_email,
          private_key: VISION_SERVICE_ACCOUNT_CREDENTIALS.private_key,
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
