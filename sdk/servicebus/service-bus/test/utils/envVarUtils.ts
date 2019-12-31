// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

export const isNode =
  !!process && !!process.version && !!process.versions && !!process.versions.node;

/**
 * Enum to abstract away string values used for the Environment Variable key names.
 */
export enum EnvVarKeys {
  SERVICEBUS_CONNECTION_STRING = "SERVICEBUS_CONNECTION_STRING",
  AAD_CLIENT_ID = "AAD_CLIENT_ID",
  AAD_CLIENT_SECRET = "AAD_CLIENT_SECRET",
  AAD_TENANT_ID = "AAD_TENANT_ID"
}

/**
 * Utility to retrieve the environment variable value based
 * on targetted platform and type.
 *
 * @param name
 * @param forBrowser
 */
function getEnvVarValue(name: EnvVarKeys): string | undefined {
  if (isNode) {
    return process.env[name];
  } else {
    // @ts-ignore
    return window.__env__[nameForBrowser];
  }
}

// Reference to cached envVars that is unique per test run.
let envVars: any;

/**
 * Utility to return cached map of environment variables,
 * or create and return one from configured values if not existing.
 */
export function getEnvVarMap(): { [key in EnvVarKeys]: any } {
  if (envVars != undefined) {
    return envVars;
  }

  // Throw error if required environment variables are missing.
  [
    EnvVarKeys.SERVICEBUS_CONNECTION_STRING,
    EnvVarKeys.AAD_CLIENT_ID,
    EnvVarKeys.AAD_CLIENT_SECRET,
    EnvVarKeys.AAD_TENANT_ID
  ].forEach(function(key: EnvVarKeys) {
    if (!getEnvVarValue(key)) {
      throw new Error(`Define ${key} in your environment before running integration tests.`);
    }
  });

  envVars = {
    [EnvVarKeys.SERVICEBUS_CONNECTION_STRING]: getEnvVarValue(
      EnvVarKeys.SERVICEBUS_CONNECTION_STRING
    ),
    [EnvVarKeys.AAD_CLIENT_ID]: getEnvVarValue(EnvVarKeys.AAD_CLIENT_ID),
    [EnvVarKeys.AAD_CLIENT_SECRET]: getEnvVarValue(EnvVarKeys.AAD_CLIENT_SECRET),
    [EnvVarKeys.AAD_TENANT_ID]: getEnvVarValue(EnvVarKeys.AAD_TENANT_ID)
  };

  return envVars;
}
