import express from "express";
import "dotenv/config";
import condb from "./db/connDB.js";
import router from "./routers/portfolio_router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import path from "path";

const app = express();
const __dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "https://melvins-simon-f2dqa4bcedcpefbq.eastus-01.azurewebsites.net",
      "http://localhost:5173",
    ],
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

// API Routes
app.use("/api", router);

// Production setup
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "dist")));

  // Handle SPA routing
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

// Start server
app.listen(process.env.PORT || 3000, () => {
  condb();
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});
