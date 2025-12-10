// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import dotenv from "dotenv";
import path from "path";
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
    provide(EnvVarKeys.ENDPOINT, MOCKS.ENDPOINT);
    provide(EnvVarKeys.KEY, MOCKS.KEY);
    provide(EnvVarKeys.TEST_MODE, testMode);
    provide(EnvVarKeys.TESTING_CONTAINER_SAS_URL, MOCKS.TESTING_CONTAINER_SAS_URL);
  }
}
