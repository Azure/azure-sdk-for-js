// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const diagnosticLevelFromEnv: string | undefined = undefined;

export function getExperimentalReadImplementation(): "javascript" | "rust" {
  return "javascript";
}
