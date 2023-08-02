// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function isNonEmptyString(variable: any) {
  return typeof variable === "string" && variable.trim().length > 0;
}
