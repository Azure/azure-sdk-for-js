// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import process from "node:process";
import { Constants } from "../common/constants.js";

export const diagnosticLevelFromEnv: string | undefined =
  process.env[Constants.CosmosDbDiagnosticLevelEnvVarName];

export function getExperimentalReadProfiling(): boolean {
  const value = process.env["AZURE_COSMOS_EXPERIMENTAL_READ_PROFILING"];
  if (value === undefined || value === "none") return false;
  if (value === "stages_v1") return true;
  throw new Error("AZURE_COSMOS_EXPERIMENTAL_READ_PROFILING must be 'none' or 'stages_v1'.");
}

export function getExperimentalReadImplementation(): "javascript" | "rust" {
  const value = process.env["AZURE_COSMOS_EXPERIMENTAL_READ_IMPLEMENTATION"];
  if (value === undefined || value === "javascript") {
    return "javascript";
  }
  if (value === "rust") {
    return "rust";
  }
  throw new Error("AZURE_COSMOS_EXPERIMENTAL_READ_IMPLEMENTATION must be 'javascript' or 'rust'.");
}
