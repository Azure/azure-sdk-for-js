// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

declare const self: any;

export function getEnvVarValue(name: string): string | undefined {
  return self.__env__[name];
}
