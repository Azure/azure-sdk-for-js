// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export function getBinarySize(stringArray: string): number {
  return new Blob([stringArray]).size;
}
