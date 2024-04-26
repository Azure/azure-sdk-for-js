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

//  Convert ms to c# time span format DD.HH:MM:SS.MMMMMM
export function msToTimeSpan(totalms: number): string {
  if (isNaN(totalms) || totalms < 0) {
    totalms = 0;
  }
  var sec = ((totalms / 1000) % 60).toFixed(7).replace(/0{0,4}$/, "");
  var min = "" + (Math.floor(totalms / (1000 * 60)) % 60);
  var hour = "" + (Math.floor(totalms / (1000 * 60 * 60)) % 24);
  var days = Math.floor(totalms / (1000 * 60 * 60 * 24));

  sec = sec.indexOf(".") < 2 ? "0" + sec : sec;
  min = min.length < 2 ? "0" + min : min;
  hour = hour.length < 2 ? "0" + hour : hour;
  var daysText = days > 0 ? days + "." : "";
  return daysText + hour + ":" + min + ":" + sec;
}
