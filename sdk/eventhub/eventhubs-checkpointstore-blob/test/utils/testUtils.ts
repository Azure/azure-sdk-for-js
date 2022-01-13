// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";
dotenv.config();

declare const self: any;

export const isNode =
  !!process && !!process.version && !!process.versions && !!process.versions.node;

export enum EnvVarKeys {
  STORAGE_CONNECTION_STRING = "STORAGE_CONNECTION_STRING",
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
    [EnvVarKeys.STORAGE_CONNECTION_STRING]: getEnvVarValue(EnvVarKeys.STORAGE_CONNECTION_STRING),
  };
}
