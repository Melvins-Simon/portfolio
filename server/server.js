import express from "express";
import "dotenv/config";
import condb from "./db/connDB.js";
import router from "./routers/portfolio_router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";

// Proper directory resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [`https://melvins-simon-f2dqa4bcedcpefbq.eastus-01.azurewebsites.net`]
        : ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Health check endpoint
app.get("/health", (req, res) => res.status(200).send("OK"));

// API Routes
app.use("/api", router);

// Production configuration
if (process.env.NODE_ENV === "production") {
  // Serve static files
  app.use(express.static(path.join(__dirname, "../../client/dist")));

  // Handle client-side routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server Error");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  condb();
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
