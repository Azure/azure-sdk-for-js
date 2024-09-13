// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function buildTsvCollection(items: string[] | number[]): string {
  return items.join("\t");
}
