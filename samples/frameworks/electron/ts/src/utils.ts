/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT license.

  Expose a helper function that can ensure an environment
  variable exists and is not empty, allowing the application
  to fail-fast if an environment variable is missing.
*/
export function getEnvironmentVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not defined.`);
  }
  return value;
}
