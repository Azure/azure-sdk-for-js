// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function isClientErrorStatusCode(statusCode: number): boolean {
  return statusCode >= 400 && statusCode < 500;
}
