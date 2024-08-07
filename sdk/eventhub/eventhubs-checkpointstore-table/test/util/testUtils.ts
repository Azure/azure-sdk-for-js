// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";
dotenv.config();

declare const self: any;

export const isNode =
  !!process && !!process.version && !!process.versions && !!process.versions.node;

export enum EnvVarKeys {
  STORAGE_ACCOUNT_NAME = "STORAGE_ACCOUNT_NAME",
  STORAGE_ACCOUNT_KEY = "STORAGE_ACCOUNT_KEY",
}

function getEnvVarValue(name: string): string | undefined {
  if (isNode) {
    return process.env[name];
  } else {
    return self.__env__[name];
  }
}

export function getEnvVars(): { [key in EnvVarKeys]: any } {
  return {
    [EnvVarKeys.STORAGE_ACCOUNT_KEY]: getEnvVarValue(EnvVarKeys.STORAGE_ACCOUNT_KEY),
    [EnvVarKeys.STORAGE_ACCOUNT_NAME]: getEnvVarValue(EnvVarKeys.STORAGE_ACCOUNT_NAME),
  };
}
