// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Reads an environment variable by name.
 * On browser, environment variables are not available — always returns undefined.
 * @internal
 */
export function getEnvVariable(_name: string): string | undefined {
  return undefined;
}
