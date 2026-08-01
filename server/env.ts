import dotenv from "dotenv";
import fs from "fs";
import path from "path";

let loaded = false;

export function loadEnv(): void {
  if (loaded) return;
  loaded = true;

  const mode = (process.env.APP_ENV || process.env.NODE_ENV || "development").toLowerCase();

  // Baseline files
  const filesToLoad: string[] = [".env"];

  if (mode === "stage" || mode === "staging") {
    filesToLoad.push(".env.stage", ".env.staging", ".env.stage.local");
  } else if (mode === "prod" || mode === "production") {
    filesToLoad.push(".env.prod", ".env.production", ".env.prod.local");
  } else {
    filesToLoad.push(".env.dev", ".env.development", ".env.local");
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
    console.log(`[Env] Loaded environment configuration from: ${loadedFiles.join(", ")} (mode=${mode})`);
  }
}

// Automatically load environment on import
loadEnv();
