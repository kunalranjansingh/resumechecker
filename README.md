# AI Resume Analyzer

A simple AI-powered Resume Analyzer web app built with Node.js, Express, MongoDB (Mongoose), vanilla HTML/CSS/JS, and the OpenAI API.

## Features

- Upload resume as PDF
- Extracts text using `pdf-parse`
- Sends text to OpenAI for analysis
- Returns skills found, missing skills, ATS score (0-100), and suggestions
- Stores resume text and AI analysis in MongoDB
- Clean, modern glassmorphism UI

## Requirements

- Node.js (v18+ recommended)
- MongoDB running locally or in the cloud (e.g., MongoDB Atlas)
- OpenAI API key

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

   Fill in:

   - `MONGODB_URI`
   - `OPENAI_API_KEY`
   - `PORT` (optional, default 5000)

3. Start the server:

   ```bash
   npm run dev
   ```

4. Open your browser and go to:

   ```
   http://localhost:5000
   ```

## API

- `POST /api/analyze`
  - Form-data body with field `resume` (PDF file)
  - Returns JSON: `{ success, data: { skills, missingSkills, atsScore, suggestions }, id }`

## Notes

- This project uses the official `openai` Node SDK.
- The AI response is expected to be valid JSON. Basic validation and error handling are included.
