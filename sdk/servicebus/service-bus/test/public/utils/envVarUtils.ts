// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
/**
 * Enum to abstract away string values used for referencing the Environment Variable names.
 */
export enum EnvVarNames {
  SERVICEBUS_FQDN = "SERVICEBUS_FQDN",
  SERVICEBUS_CONNECTION_STRING = "SERVICEBUS_CONNECTION_STRING",
}

/**
 * Utility to retrieve the environment variable value with given name.
 */
export function getEnvVarValue(name: string): string | undefined {
  try {
    return assertEnvironmentVariable(name);
  } catch {
    return undefined;
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
  [EnvVarNames.SERVICEBUS_FQDN].forEach(function (name: string) {
    if (!getEnvVarValue(name)) {
      throw new Error(`Define ${name} in your environment before running integration tests.`);
    }
  });

  envVars = {
    [EnvVarNames.SERVICEBUS_CONNECTION_STRING]: getEnvVarValue(
      EnvVarNames.SERVICEBUS_CONNECTION_STRING,
    ),
    [EnvVarNames.SERVICEBUS_FQDN]: getEnvVarValue(EnvVarNames.SERVICEBUS_FQDN),
  };

  return envVars;
}
