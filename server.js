// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import path from "path";
// import mongoose from "mongoose";
// import resumeRoutes from "./src/routes/resumeRoutes.js";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// console.log("KEY CHECK:", process.env.OPENAI_API_KEY);

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Paths
// const publicPath = path.join(__dirname, "public");

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve static files
// app.use(express.static(publicPath));

// // MongoDB
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => console.error("❌ MongoDB error:", err));

// // API routes
// app.use("/api", resumeRoutes);

// // Serve frontend
// app.get("/", (req, res) => {
//   res.sendFile(path.join(publicPath, "index.html"));
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import resumeRoutes from "./src/routes/resumeRoutes.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

const publicPath = path.join(__dirname, "public");

app.use(cors());
app.use(express.json());
app.use(express.static(publicPath));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB error:", err));

app.use("/api", resumeRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});