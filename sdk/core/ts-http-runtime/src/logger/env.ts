// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import process from "node:process";

/**
 * Reads an environment variable by name.
 * @param name - The environment variable name.
 * @returns The value of the environment variable, or undefined if not set.
 * @internal
 */
export function getEnvVariable(name: string): string | undefined {
  return process.env[name] || undefined;
}
