// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export const SDK_VERSION: string = "1.0.0-beta.2";

/**
 * @internal
 *
 * Keys of known environment variables we lookup.
 */
export type KnownEnvironmentKeys = "AZURE_HTTP_TRACING_DISABLED" | "AZURE_TRACING_DISABLED";

export const environment = new Map<KnownEnvironmentKeys, string | undefined>();

if (typeof process !== "undefined" && process.env) {
  environment.set("AZURE_HTTP_TRACING_DISABLED", process.env.AZURE_HTTP_TRACING_DISABLED);
  environment.set("AZURE_TRACING_DISABLED", process.env.AZURE_TRACING_DISABLED);
}

/**
 * Converts an environment variable to Boolean.
 * the strings "false" and "0" are treated as falsy values.
 *
 * @internal
 */
export function envVarToBoolean(key: KnownEnvironmentKeys): boolean {
  const valueWithDefault = (environment.get(key) ?? "").toLowerCase();
  return valueWithDefault !== "false" && valueWithDefault !== "0" && Boolean(valueWithDefault);
}
