import mongoose from "mongoose";
import "dotenv/config";
async function condb() {
  try {
    await mongoose.connect(process.env.COSMOS_URI);
    console.log("✅ Connected to Azure Cosmos DB!");
  } catch (error) {
    console.log("❌ Failed to connect:", error);
  }
}

export default condb;
