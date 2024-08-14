// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function addToOffset(offset: string, numToAdd: number): string {
  return `${parseInt(offset) + numToAdd}`;
}
