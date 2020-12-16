/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT license.
*/

import { credential } from "./auth";

function getEnvironmentVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not defined.`);
  }
  return value;
}
export { getEnvironmentVariable, credential };
