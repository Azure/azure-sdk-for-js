// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function buildTsvCollection(items: string[] | number[]): string {
  return items.join("\t");
}
