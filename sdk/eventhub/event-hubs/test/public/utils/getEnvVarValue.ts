// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "./env";

export function getEnvVarValue(name: string): string | undefined {
  return process.env[name];
}
