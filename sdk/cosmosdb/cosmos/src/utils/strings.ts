// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function isNonEmptyString(variable: unknown): boolean {
  return typeof variable === "string" && variable.trim().length > 0;
}
