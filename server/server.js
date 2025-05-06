import express from "express";
import "dotenv/config";
import condb from "./db/connDB.js";
import router from "./routers/portfolio_router.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api", router);
app.listen(process.env.PORT || 3000, () => {
  condb();
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});
