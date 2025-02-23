# Cover Letter Generator

A React application that generates personalized cover letters by leveraging GPT-based
models. Upload your resume in PDF format, provide a job description, select a model, and
generate a cover letter that can be viewed as text or downloaded as a PDF.

## Features

- **Dynamic Cover Letter Generation:** Create a tailored cover letter based on your resume
  and job description.
- **Multiple Model Support:** Choose between GPT-4, GPT-4 Mini, and GPT-3.5 Turbo.
- **PDF Download:** Download the generated cover letter as a timestamped PDF file.
- **Text Preview:** View the cover letter text directly in your browser.
- **Error Handling:** User-friendly error messages for missing inputs or generation
  issues.

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later) or yarn

### Steps

**Clone the Repository:**
```bash
git clone git@github.com:krvvko/cover-letter-ai-generator.git
cd cover-letter-ai-generator
```

**Create .env from .env-example:**
```dotenv
OPENAI_API_KEY=""

PORT=3000
```

**Install dependencies:**
```bash
cd backend-express
npm i
npm run build
npm start
cd ../frontend-react
npm i
npm start dev
```

**Open in browser:**
http://localhost:5173

**License:**

This project is licensed under the MIT License.