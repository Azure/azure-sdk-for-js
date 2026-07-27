// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
 * Upper bound for a parsed Retry-After delay, in milliseconds (24 hours).
 *
 * The Retry-After value is server-controlled. Without a cap, a malformed or hostile
 * header can break the exporter two ways:
 *  - A value above Node's `setTimeout` ceiling (2^31-1 ms, ~24.85 days) is silently
 *    clamped to 1 ms and emits `TimeoutOverflowWarning`, firing the retry almost
 *    immediately and defeating backoff.
 *  - A value just under that ceiling parks the offline-retry timer for weeks.
 *
 * Clamping to 24h keeps every delay well under the `setTimeout` ceiling while still
 * honoring any realistic server-issued backoff.
 * @internal
 */
export const MAX_RETRY_AFTER_MS = 24 * 60 * 60 * 1000;

/**
 * Parse a Retry-After header value into milliseconds.
 * Supports both delay-seconds (integer) and HTTP-date formats.
 * The result is clamped to {@link MAX_RETRY_AFTER_MS} so a server-controlled value
 * can never overflow `setTimeout` or stall retries for an unbounded period.
 * Returns undefined if the header is missing or unparseable.
 * @internal
 */
export function parseRetryAfterHeader(retryAfter: string | undefined): number | undefined {
  if (!retryAfter) {
    return undefined;
  }
  // Try delay-seconds (1*DIGIT, may have leading zeros)
  const trimmed = retryAfter.trim();
  if (/^\d+$/.test(trimmed)) {
    const delaySec = Number(trimmed);
    return delaySec > 0 ? Math.min(delaySec * 1000, MAX_RETRY_AFTER_MS) : undefined;
  }
  // Try HTTP-date
  const date = Date.parse(retryAfter);
  if (!isNaN(date)) {
    const delayMs = date - Date.now();
    return delayMs > 0 ? Math.min(delayMs, MAX_RETRY_AFTER_MS) : undefined;
  }
  return undefined;
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

/**
 * Checks if the error message indicates a sampling-related rejection.
 * Sampling rejections should not be retried as the server will always reject these items.
 * @internal
 */
export function isSamplingRejection(error: BreezeError): boolean {
  return error.message.toLowerCase() === "telemetry sampled out.";
}

//  Convert ms to c# time span format DD.HH:MM:SS.MMMMMM
export function msToTimeSpan(totalms: number): string {
  if (isNaN(totalms) || totalms < 0) {
    totalms = 0;
  }
  let sec = ((totalms / 1000) % 60).toFixed(7).replace(/0{0,4}$/, "");
  let min = "" + (Math.floor(totalms / (1000 * 60)) % 60);
  let hour = "" + (Math.floor(totalms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(totalms / (1000 * 60 * 60 * 24));

  sec = sec.indexOf(".") < 2 ? "0" + sec : sec;
  min = min.length < 2 ? "0" + min : min;
  hour = hour.length < 2 ? "0" + hour : hour;
  const daysText = days > 0 ? days + "." : "";
  return daysText + hour + ":" + min + ":" + sec;
}
