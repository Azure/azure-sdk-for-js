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
    statusCode === 500 || // Server Error
    statusCode === 503 // Server Unavailable
  );
}

/**
 * Convert milliseconds to Breeze expected time.
 * @internal
 */
export function msToTimeSpan(ms: number): string {
  let totalms = ms;
  if (Number.isNaN(totalms) || totalms < 0 || !Number.isFinite(ms)) {
    totalms = 0;
  }

  let sec = ((totalms / 1000) % 60).toFixed(7).replace(/0{0,4}$/, "");
  let min = `${Math.floor(totalms / (1000 * 60)) % 60}`;
  let hour = `${Math.floor(totalms / (1000 * 60 * 60)) % 24}`;
  const days = Math.floor(totalms / (1000 * 60 * 60 * 24));

  sec = sec.indexOf(".") < 2 ? `0${sec}` : sec;
  min = min.length < 2 ? `0${min}` : min;
  hour = hour.length < 2 ? `0${hour}` : hour;
  const daysText = days > 0 ? `${days}.` : "";

  return `${daysText + hour}:${min}:${sec}`;
}
