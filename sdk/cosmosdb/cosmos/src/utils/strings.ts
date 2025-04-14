// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function isNonEmptyString(variable: unknown): boolean {
  return typeof variable === "string" && variable.trim().length > 0;
}
