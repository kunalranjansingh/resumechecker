// src/models/ResumeAnalysis.js
// Mongoose model for storing resume text and AI analysis result

import mongoose from "mongoose";

// Define schema for storing resume text and AI analysis
const ResumeAnalysisSchema = new mongoose.Schema(
  {
    // Plain text extracted from the uploaded resume PDF
    resumeText: {
      type: String,
      required: true,
    },

    // AI analysis result object (skills, missing skills, ats score, suggestions, etc.)
    analysisResult: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);

// Create the model
const ResumeAnalysis = mongoose.model("ResumeAnalysis", ResumeAnalysisSchema);

// Export default so we can `import ResumeAnalysis from '../models/ResumeAnalysis.js'`
export default ResumeAnalysis;