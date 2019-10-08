
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as dotenv from "dotenv";
dotenv.config();

export const isNode =
  !!process && !!process.version && !!process.versions && !!process.versions.node;

export enum EnvVarKeys {
  INKRECOGNIZER_API_KEY = "INKRECOGNIZER_API_KEY"
}

function getEnvVarValue(name: string, addBrowserSuffix?: boolean): string | undefined {
  if (isNode) {
    return process.env[name];
  } else {
    const nameForBrowser = addBrowserSuffix ? name + "_BROWSER" : name;
    // @ts-ignore
    return window.__env__[nameForBrowser];
  }
}

export function getEnvVars(): { [key in EnvVarKeys]: any } {
  return {
    [EnvVarKeys.INKRECOGNIZER_API_KEY]: getEnvVarValue(EnvVarKeys.INKRECOGNIZER_API_KEY, !isNode)
  };
}