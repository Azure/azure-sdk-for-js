// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function addToOffset(offset: string, numToAdd: number): string {
  return `${parseInt(offset) + numToAdd}`;
}
