// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

export const isNode =
  !!process && !!process.version && !!process.versions && !!process.versions.node;

/**
 * Enum to abstract away string values used for referencing the Environment Variable names.
 */
export enum EnvVarNames {
  SERVICEBUS_CONNECTION_STRING = "SERVICEBUS_CONNECTION_STRING",
  AAD_CLIENT_ID = "AAD_CLIENT_ID",
  AAD_CLIENT_SECRET = "AAD_CLIENT_SECRET",
  AAD_TENANT_ID = "AAD_TENANT_ID"
}

/**
 * Utility to retrieve the environment variable value with given key.
 * @param name
 * @param forBrowser
 */
function getEnvVarValue(name: string): string | undefined {
  if (isNode) {
    return process.env[name];
  } else {
    // @ts-ignore
    return window.__env__[name];
  }
}

// Reference to cached envVars that is unique per test run.
let envVars: any;

/**
 * Utility to return cached map of environment variables,
 * or create and return one from configured values if not existing.
 *
 * The utility helps use the right environment variable key based on targetted platform and type.
 * Specifically, we use different Service Bus namespaces for browser Vs node test runs.
 * Thus, the connection string value is retrieved from `SERVICE_BUS_CONNECTION_STRING_BROWSER`
 * environment variable key for browser, and from `SERVICE_BUS_CONNECTION_STRING` for Node.
 */
export function getEnvVars(): { [key in EnvVarNames]: any } {
  if (envVars != undefined) {
    return envVars;
  }

  let serviceBusConnectionStringEnvVarKey: string = EnvVarNames.SERVICEBUS_CONNECTION_STRING.valueOf();

  if (!isNode) {
    serviceBusConnectionStringEnvVarKey =
      EnvVarNames.SERVICEBUS_CONNECTION_STRING.valueOf() + "_BROWSER";
  }

  // Throw error if required environment variables are missing.
  [
    serviceBusConnectionStringEnvVarKey,
    EnvVarNames.AAD_CLIENT_ID,
    EnvVarNames.AAD_CLIENT_SECRET,
    EnvVarNames.AAD_TENANT_ID
  ].forEach(function(key: string) {
    if (!getEnvVarValue(key)) {
      throw new Error(`Define ${key} in your environment before running integration tests.`);
    }
  });

  envVars = {
    [EnvVarNames.SERVICEBUS_CONNECTION_STRING]: getEnvVarValue(serviceBusConnectionStringEnvVarKey),
    [EnvVarNames.AAD_CLIENT_ID]: getEnvVarValue(EnvVarNames.AAD_CLIENT_ID),
    [EnvVarNames.AAD_CLIENT_SECRET]: getEnvVarValue(EnvVarNames.AAD_CLIENT_SECRET),
    [EnvVarNames.AAD_TENANT_ID]: getEnvVarValue(EnvVarNames.AAD_TENANT_ID)
  };

  return envVars;
}
