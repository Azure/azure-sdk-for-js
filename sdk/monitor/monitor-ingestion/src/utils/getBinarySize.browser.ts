// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export function getBinarySize(stringArray: string): number {
  return new Blob([stringArray]).size;
}
