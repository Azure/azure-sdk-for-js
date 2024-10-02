// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const SDK_VERSION: string = "1.0.0-beta.7";

/**
 * @internal
 *
 * Keys of known environment variables we look up.
 */
export type KnownEnvironmentKey = "AZURE_HTTP_TRACING_CHILDREN_DISABLED" | "AZURE_TRACING_DISABLED";

/**
 * @internal
 *
 * Cached values of environment variables that were fetched.
 */
export const environmentCache = new Map<KnownEnvironmentKey, string | undefined>();

/**
 * Converts an environment variable to Boolean.
 * the strings "false" and "0" are treated as falsy values.
 *
 * @internal
 */
export function envVarToBoolean(key: KnownEnvironmentKey): boolean {
  if (!environmentCache.has(key)) {
    loadEnvironmentVariable(key);
  }
  const value = (environmentCache.get(key) ?? "").toLowerCase();
  return value !== "false" && value !== "0" && Boolean(value);
}

function loadEnvironmentVariable(key: KnownEnvironmentKey): void {
  if (typeof process !== "undefined" && process.env) {
    const rawValue = process.env[key] ?? process.env[key.toLowerCase()];
    environmentCache.set(key, rawValue);
  }
}
