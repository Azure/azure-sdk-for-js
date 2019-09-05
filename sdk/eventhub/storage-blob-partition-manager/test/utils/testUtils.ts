// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as dotenv from "dotenv";
dotenv.config();

export const isNode =
  !!process && !!process.version && !!process.versions && !!process.versions.node;

export enum EnvVarKeys {
  STORAGE_CONNECTION_STRING = "STORAGE_CONNECTION_STRING"
}

function getEnvVarValue(name: string): string | undefined {
  if (isNode) {
    return process.env[name];
  } else {
    // @ts-ignore
    return window.__env__[name];
  }
}

export function getEnvVars(): { [key in EnvVarKeys]: any } {
  return {
    [EnvVarKeys.STORAGE_CONNECTION_STRING]: getEnvVarValue(EnvVarKeys.STORAGE_CONNECTION_STRING)
  };
}
