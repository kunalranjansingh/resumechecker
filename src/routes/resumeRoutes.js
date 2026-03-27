// src/routes/resumeRoutes.js

import express from 'express';
import multer from 'multer';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse'); // ✅ FIXED
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { analyzeResumeWithAI } from '../services/aiService.js';
import ResumeAnalysis from '../models/ResumeAnalysis.js';

const router = express.Router();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads folder exists
const uploadPath = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer config
const upload = multer({
  dest: uploadPath,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'));
    }
    cb(null, true);
  }
});

// POST /api/analyze
router.post('/analyze', upload.single('resume'), async (req, res) => {
  try {
    console.log("📥 File received:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;

    // Read file
    const dataBuffer = fs.readFileSync(filePath);
    console.log("📄 File buffer loaded");

    // Parse PDF
    const pdfData = await pdfParse(dataBuffer);
    console.log("📝 Extracted text preview:", pdfData.text.slice(0, 100));

    // Check empty PDF
    if (!pdfData.text || pdfData.text.trim() === '') {
      return res.status(400).json({
        error: 'Could not extract text from PDF. Try another file.'
      });
    }

    const resumeText = pdfData.text;

    // Analyze with AI
    const analysisResult = await analyzeResumeWithAI(resumeText);
    console.log("🤖 AI analysis done");

    // Save to DB
    const record = await ResumeAnalysis.create({
      resumeText,
      analysisResult
    });

    // Delete uploaded file
    fs.unlink(filePath, (err) => {
      if (err) console.error('❌ Error deleting file:', err);
    });

    return res.json({
      success: true,
      data: analysisResult,
      id: record._id
    });

  } catch (error) {
    console.error('❌ FULL ERROR:', error);

    return res.status(500).json({
      error: error.message || 'Failed to analyze resume.'
    });
  }
});

export default router;