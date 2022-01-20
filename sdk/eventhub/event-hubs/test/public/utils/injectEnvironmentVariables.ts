// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "./env";
import { EnvVarKeys } from "./EnvVarKeys";

export function injectEnvironmentVariables(
  envVars: Omit<{ [key in EnvVarKeys]: string }, EnvVarKeys.TEST_TARGET>
): void {
  for (const key of Object.keys(envVars) as Exclude<EnvVarKeys, EnvVarKeys.TEST_TARGET>[]) {
    process.env[key] = envVars[key];
  }
}
