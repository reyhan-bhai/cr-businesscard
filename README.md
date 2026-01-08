# Business Card OCR Application

A Next.js application that extracts text from business card images using Google Cloud Vision API, processes the data with AI, and saves it to Google Sheets and Google Drive.

## Features

- **OCR Processing**: Extract text from business card images using Google Cloud Vision API
- **AI Integration**: Process extracted data using Google Generative AI
- **Google Sheets Integration**: Automatically save business card data to Google Sheets
- **Google Drive Integration**: Upload and manage business card images in Google Drive
- **Modern UI**: Built with Next.js, React, and Tailwind CSS

## Prerequisites

Before you begin, ensure you have:

- Node.js 20+ installed
- Yarn package manager
- Google Cloud Platform account with the following APIs enabled:
  - Google Cloud Vision API
  - Google Sheets API
  - Google Drive API
- Service account credentials for:
  - Google Sheets access
  - Google Drive access
  - Google Cloud Vision API access
- API key for Google Generative AI (LLM)

## Getting Started

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd cr-businesscard-nd
```

2. Install dependencies:
```bash
yarn install
```

3. Create a `.env` file in the root directory with the following variables:
```env
NODE_ENV=development
LLM_API=your-google-generative-ai-api-key
GOOGLE_SPREADSHEET_CLIENT_EMAIL=your-google-spreadsheet-service-account-email
GOOGLE_DRIVE_CLIENT_EMAIL=your-google-drive-service-account-email
OCR_GOOGLE_CLIENT_EMAIL=your-ocr-google-service-account-email
```

4. Place your Google Cloud service account JSON key files in the project root (or configure the paths in your code).

5. Run the development server:
```bash
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

The following environment variables are required:

| Variable | Description |
|----------|-------------|
| `LLM_API` | Google Generative AI API key for processing extracted text |
| `GOOGLE_SPREADSHEET_CLIENT_EMAIL` | Service account email for Google Sheets API access |
| `GOOGLE_DRIVE_CLIENT_EMAIL` | Service account email for Google Drive API access |
| `OCR_GOOGLE_CLIENT_EMAIL` | Service account email for Google Cloud Vision API access |
| `NODE_ENV` | Environment mode (`development` or `production`) |
| `PORT` | Server port (default: 8080 for production, 3000 for development) |

## Deployment

### Local Deployment

Run the application locally without Docker using the standard Next.js workflow:

1. **Install dependencies:**
```bash
yarn install
```

2. **Set up environment variables:**
   - Create a `.env` file in the root directory (see [Environment Variables](#environment-variables) section)
   - Ensure all required API keys and service account credentials are configured

3. **Start the development server:**
```bash
yarn dev
```

The application will be available at `http://localhost:3000`.

**Note**: The development server uses `NODE_OPTIONS=--openssl-legacy-provider` (configured in `package.json`) to handle OpenSSL compatibility issues with certain dependencies.

### Local Docker Deployment

Build and run the application using Docker:

```bash
# Build the Docker image
docker build -f Dockerfile.local -t cr-businesscard-local .

# Run the container
docker run --env-file .env -p 8080:8080 cr-businesscard-local
```

The application will be available at `http://localhost:8080`.

**Note**: The Dockerfile uses a multi-stage build with Next.js standalone output for optimized production builds.

### Deploy to Google App Engine

This application is configured to deploy to Google App Engine (GCP). Follow these steps:

#### 1. Prerequisites

- Install [Google Cloud SDK](https://cloud.google.com/sdk/docs/install)
- Authenticate with GCP:
```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

#### 2. Configure Environment Variables

Update `app.yaml` with your actual environment variables:

```yaml
env_variables:
  NODE_ENV: "production"
  LLM_API: "your-actual-api-key"
  GOOGLE_SPREADSHEET_CLIENT_EMAIL: "your-actual-service-account-email"
  GOOGLE_DRIVE_CLIENT_EMAIL: "your-actual-service-account-email"
  OCR_GOOGLE_CLIENT_EMAIL: "your-actual-service-account-email"
```

#### 3. Build the Application

Before deploying, build the Next.js application:

```bash
yarn build
```

This creates the `.next` directory with the standalone output required by App Engine.

#### 4. Deploy to App Engine

Deploy using the Google Cloud SDK:

```bash
gcloud app deploy
```

Or deploy a specific version:

```bash
gcloud app deploy --version VERSION_NAME
```

#### 5. View Your Application

After deployment, view your application:

```bash
gcloud app browse
```

Or visit: `https://YOUR_PROJECT_ID.uc.r.appspot.com`

### App Engine Configuration

The `app.yaml` file configures:

- **Runtime**: Node.js 24
- **Instance Class**: F2 (for better performance with image processing)
- **Auto-scaling**: 
  - Min instances: 0 (scales down when idle)
  - Max instances: 2 (limits cost)
  - Target CPU: 65%
  - Target throughput: 75%
- **Static File Handling**: Optimized routing for Next.js static assets
- **Security**: All routes use HTTPS

### Deployment Notes

- The application uses Next.js **standalone output mode** (configured in `next.config.mjs`)
- Static files are served directly by App Engine for better performance
- API routes are handled by Next.js server
- Service account credentials should be stored securely (consider using Secret Manager for production)

### Updating the Deployment

To update your deployed application:

1. Make your code changes
2. Rebuild: `yarn build`
3. Redeploy: `gcloud app deploy`

### Monitoring

Monitor your App Engine deployment:

```bash
# View logs
gcloud app logs tail

# View service status
gcloud app services list

# View versions
gcloud app versions list
```

## Project Structure

```
cr-businesscard-nd/
├── app/                    # Next.js app directory
│   ├── api/               # API routes (OCR, save-card)
│   └── page.tsx           # Main page component
├── lib/                    # Utility libraries
│   ├── ocrService.ts      # Google Vision OCR service
│   ├── spreadsheetService.ts  # Google Sheets integration
│   └── googledriveService.ts   # Google Drive integration
├── components/             # React components
├── public/                 # Static assets
├── Dockerfile.local       # Docker configuration for local deployment
├── app.yaml               # Google App Engine configuration
├── next.config.mjs        # Next.js configuration (standalone mode)
└── package.json           # Dependencies and scripts
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Google App Engine Documentation](https://cloud.google.com/appengine/docs) - Deploy Node.js apps to App Engine
- [Google Cloud Vision API](https://cloud.google.com/vision/docs) - OCR and image analysis
- [Google Sheets API](https://developers.google.com/sheets/api) - Spreadsheet integration
- [Google Drive API](https://developers.google.com/drive/api) - File storage and management

## Troubleshooting

### OpenSSL Legacy Provider Issues

If you encounter OpenSSL decoder errors, ensure:
- `NODE_OPTIONS=--openssl-legacy-provider` is set (already configured in package.json scripts)
- Node.js version is compatible (20+)

### Build Issues

- Ensure all environment variables are set
- Verify service account credentials are accessible
- Check that all required Google Cloud APIs are enabled

### Deployment Issues

- Verify `gcloud` CLI is authenticated
- Check that your project has App Engine enabled
- Ensure billing is enabled for your GCP project
- Review App Engine logs: `gcloud app logs tail`
