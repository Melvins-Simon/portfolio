import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  const module = await import("./server/server.js");
  console.log("Server module loaded successfully");
} catch (err) {
  console.error("Failed to load server module:", err);
  process.exit(1);
}
