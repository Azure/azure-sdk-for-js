// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const diagnosticLevelFromEnv: string | undefined = undefined;

export function getExperimentalReadProfiling(): boolean {
  return false;
}

export function getExperimentalReadImplementation(): "javascript" | "rust" {
  return "javascript";
}
