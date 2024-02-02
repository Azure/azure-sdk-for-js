// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Breeze errors.
 * @internal
 */
export interface BreezeError {
  index: number;
  statusCode: number;
  message: string;
}

/**
 * Breeze response definition.
 * @internal
 */
export interface BreezeResponse {
  itemsReceived: number;
  itemsAccepted: number;
  errors: BreezeError[];
}

/**
 * Breeze retriable status codes.
 * @internal
 */
export function isRetriable(statusCode: number): boolean {
  return (
    statusCode === 206 || // Partial Accept
    statusCode === 401 || // Unauthorized
    statusCode === 403 || // Forbidden
    statusCode === 408 || // Timeout
    statusCode === 429 || // Too many requests
    statusCode === 439 || // Daily quota exceeded (legacy)
    statusCode === 500 || // Server Error
    statusCode === 502 || // Bad Gateway
    statusCode === 503 || // Server Unavailable
    statusCode === 504 // Gateway Timeout
  );
}
