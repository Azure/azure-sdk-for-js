// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function parsePipeCollection(value: string): string[] {
  return value ? value.split("|") : [];
}
