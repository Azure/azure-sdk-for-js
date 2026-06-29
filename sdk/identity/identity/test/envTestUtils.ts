// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Gets a required environment variable.
 *
 * @throws Error if the env var is missing or empty.
 */
export function requireEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Required env var ${name} is not set`);
  }
  return value;
}
