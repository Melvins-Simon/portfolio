import express from "express";
import "dotenv/config";
import condb from "./db/connDB.js";
import router from "./routers/portfolio_router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "https://melvins-simon-f2dqa4bcedcpefbq.eastus-01.azurewebsites.net",
      "http://localhost:5000",
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

app.get("/health", (req, res) => res.status(200).send("OK"));

app.use("/api", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server Error");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  condb();
  console.log(
    `🚀Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`
  );
});
