// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function parseNewlineCollection(value: string): string[] {
  return value ? value.split("\n") : [];
}
