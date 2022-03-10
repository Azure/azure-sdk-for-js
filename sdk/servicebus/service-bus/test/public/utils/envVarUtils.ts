// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "@azure/core-util";

/**
 * Enum to abstract away string values used for referencing the Environment Variable names.
 */
export enum EnvVarNames {
  SERVICEBUS_CONNECTION_STRING = "SERVICEBUS_CONNECTION_STRING",
  AZURE_CLIENT_ID = "AZURE_CLIENT_ID",
  AZURE_CLIENT_SECRET = "AZURE_CLIENT_SECRET",
  AZURE_TENANT_ID = "AZURE_TENANT_ID",
}

/**
 * Utility to retrieve the environment variable value with given name.
 */
export function getEnvVarValue(name: string): string | undefined {
  if (isNode) {
    return process.env[name];
  } else {
    return (self as any).__env__[name];
  }
}

// Reference to cached envVars that is unique per test run.
let envVars: any;

/**
 * Utility to return cached map of environment variables,
 * or create and return one from configured values if not existing.
 */
export function getEnvVars(): { [key in EnvVarNames]: string } {
  if (envVars !== undefined) {
    return envVars;
  }

  // Throw error if required environment variables are missing.
  [
    EnvVarNames.SERVICEBUS_CONNECTION_STRING,
    EnvVarNames.AZURE_CLIENT_ID,
    EnvVarNames.AZURE_CLIENT_SECRET,
    EnvVarNames.AZURE_TENANT_ID,
  ].forEach(function (name: string) {
    if (!getEnvVarValue(name)) {
      throw new Error(`Define ${name} in your environment before running integration tests.`);
    }
  });

  envVars = {
    [EnvVarNames.SERVICEBUS_CONNECTION_STRING]: getEnvVarValue(
      EnvVarNames.SERVICEBUS_CONNECTION_STRING
    ),
    [EnvVarNames.AZURE_CLIENT_ID]: getEnvVarValue(EnvVarNames.AZURE_CLIENT_ID),
    [EnvVarNames.AZURE_CLIENT_SECRET]: getEnvVarValue(EnvVarNames.AZURE_CLIENT_SECRET),
    [EnvVarNames.AZURE_TENANT_ID]: getEnvVarValue(EnvVarNames.AZURE_TENANT_ID),
  };

  return envVars;
}
