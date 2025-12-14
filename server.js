import express from "express";
import "./config/dbConfig.js";
import portfolioRoute from "./routes/portfolioRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dir } from "console";

import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api/portfolio", portfolioRoute);

// Serve static files
app.use("/uploads", express.static("uploads"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  // react app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in PORT ${PORT}`);
});
