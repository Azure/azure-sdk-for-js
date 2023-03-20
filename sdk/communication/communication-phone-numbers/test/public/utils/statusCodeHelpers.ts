// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function isClientErrorStatusCode(statusCode: number): boolean {
  return statusCode >= 400 && statusCode < 500;
}
