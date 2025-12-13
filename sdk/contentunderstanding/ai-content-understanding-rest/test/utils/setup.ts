// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import type { TestProject } from "vitest/node";
import { EnvVarKeys } from "./constants.js";
import * as MOCKS from "./constants.js";

// Load .env explicitly so tests run the same whether invoked directly or via dev-tool
// Load package test .env first (located at test/.env)
dotenv.config({ path: path.join(__dirname, "..", ".env") });
// Also load package root .env (if present) so developers can put their creds there
dotenv.config(); // loads from process.cwd()/.env

// DEBUG: indicate presence of key/endpoint (do NOT print secret values)
console.log(
  "DEBUG ENV ENDPOINT DEFINED:",
  Boolean(process.env.AZURE_CONTENT_UNDERSTANDING_ENDPOINT),
);
console.log("DEBUG ENV KEY DEFINED:", Boolean(process.env.AZURE_CONTENT_UNDERSTANDING_KEY));

declare module "vitest" {
  type MyEnvVarKeys = {
    [K in (typeof EnvVarKeys)[keyof typeof EnvVarKeys]]: string;
  };
  export interface ProvidedContext extends Omit<MyEnvVarKeys, typeof EnvVarKeys.TEST_MODE> {
    [EnvVarKeys.TEST_MODE]: string | undefined;
  }
}

function assertEnvironmentVariable<
  T extends (typeof EnvVarKeys)[keyof Pick<typeof EnvVarKeys, "TEST_MODE">],
>(key: T): string | undefined;
function assertEnvironmentVariable(key: string): string;
function assertEnvironmentVariable(key: string): string | undefined {
  const value = process.env[key];
  if (key === EnvVarKeys.TEST_MODE) {
    return value?.toLowerCase();
  }
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined.`);
  }
  return value;
}

/**
 * Auto-detect whether recordings were made with API key or AAD authentication.
 * Checks if any recording file contains "Ocp-Apim-Subscription-Key" header (API key auth)
 * or "Authorization" header (AAD auth).
 * @returns true if recordings use API key, false if they use AAD, null if cannot determine
 */
function detectRecordingAuthType(): boolean | null {
  const recordingsDir = path.join(__dirname, "..", "..", "recordings", "node");

  if (!fs.existsSync(recordingsDir)) {
    return null;
  }

  // Check first recording file we find
  const dirs = fs.readdirSync(recordingsDir);
  for (const dir of dirs) {
    const dirPath = path.join(recordingsDir, dir);
    if (fs.statSync(dirPath).isDirectory()) {
      const files = fs.readdirSync(dirPath);
      for (const file of files) {
        if (file.endsWith(".json")) {
          try {
            const content = fs.readFileSync(path.join(dirPath, file), "utf-8");
            // Check for API key header in recording
            if (content.includes('"Ocp-Apim-Subscription-Key"')) {
              return true; // Uses API key
            }
            // Check for Authorization header (AAD)
            if (content.includes('"Authorization"')) {
              return false; // Uses AAD
            }
          } catch {
            // Continue to next file
          }
        }
      }
    }
  }
  return null;
}

export default async function ({ provide }: TestProject): Promise<void> {
  const testMode = assertEnvironmentVariable(EnvVarKeys.TEST_MODE);
  if (["live", "record"].includes(testMode ?? "")) {
    const endpoint = assertEnvironmentVariable(EnvVarKeys.ENDPOINT);
    const key = process.env[EnvVarKeys.KEY] || null; // Use null if not set, to use AAD

    // For testing container SAS URL - optional for basic tests
    let testingContainerSasUrl = MOCKS.TESTING_CONTAINER_SAS_URL;
    try {
      testingContainerSasUrl = assertEnvironmentVariable(EnvVarKeys.TESTING_CONTAINER_SAS_URL);
    } catch {
      // Use mock value if not provided
    }

    provide(EnvVarKeys.ENDPOINT, endpoint);
    provide(EnvVarKeys.KEY, key);
    provide(EnvVarKeys.TEST_MODE, testMode);
    provide(EnvVarKeys.TESTING_CONTAINER_SAS_URL, testingContainerSasUrl);
  } else {
    // Auto-detect auth type from recordings for playback mode
    const usesApiKey = detectRecordingAuthType();
    const mockKey = usesApiKey === true ? MOCKS.KEY : null;

    provide(EnvVarKeys.ENDPOINT, MOCKS.ENDPOINT);
    provide(EnvVarKeys.KEY, mockKey);
    provide(EnvVarKeys.TEST_MODE, testMode);
    provide(EnvVarKeys.TESTING_CONTAINER_SAS_URL, MOCKS.TESTING_CONTAINER_SAS_URL);
  }
}
