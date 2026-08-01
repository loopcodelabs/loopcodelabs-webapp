import dotenv from "dotenv";
import fs from "fs";
import path from "path";

let loaded = false;

export function loadEnv(): void {
  if (loaded) return;
  loaded = true;

  const nodeEnv = process.env.NODE_ENV || "development";

  // Files to load in order from baseline to stage/env specific
  const filesToLoad: string[] = [".env", ".env.local"];

  if (nodeEnv) {
    if (nodeEnv === "staging" || nodeEnv === "stage") {
      filesToLoad.push(".env.stage", ".env.staging", ".env.stage.local", ".env.staging.local");
    } else {
      filesToLoad.push(`.env.${nodeEnv}`, `.env.${nodeEnv}.local`);
    }
  }

  const loadedFiles: string[] = [];

  for (const file of filesToLoad) {
    const filePath = path.resolve(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      dotenv.config({ path: filePath, override: true });
      if (!loadedFiles.includes(file)) {
        loadedFiles.push(file);
      }
    }
  }

  if (loadedFiles.length > 0) {
    console.log(`[Env] Loaded environment configuration from: ${loadedFiles.join(", ")} (NODE_ENV=${nodeEnv})`);
  }
}

// Automatically load environment on import
loadEnv();
