// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EnvVarKeys } from "./EnvVarKeys";

declare const self: any;

export function injectEnvironmentVariables(
  envVars: Omit<{ [key in EnvVarKeys]: string }, EnvVarKeys.TEST_TARGET>
): void {
  for (const key of Object.keys(envVars) as Exclude<EnvVarKeys, EnvVarKeys.TEST_TARGET>[]) {
    self.__env__[key] = envVars[key];
  }
}
