// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function parseCsvCollection(value: string): string[] {
  return value ? value.split(",") : [];
}
