// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineResponse } from "@azure/core-rest-pipeline";
import {
  createDefaultHttpClient,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import { diag } from "@opentelemetry/api";
import { ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS } from "../Declarations/Constants.js";

/** Request timeout, in milliseconds, for a single OneSettings HTTP call. */
const ONE_SETTINGS_REQUEST_TIMEOUT_MS = 10000;

/**
 * Parsed result of a single OneSettings HTTP request.
 *
 * The request helper never throws: transient failures (network errors, timeouts) are reported
 * via {@link OneSettingsResponse.hasException} rather than as exceptions, so callers can decide
 * whether to retry.
 * @internal
 */
export interface OneSettingsResponse {
  /** ETag header value, used to detect changes on subsequent polls. Absent when not returned. */
  etag?: string;
  /** Refresh interval, in milliseconds, until the next poll should occur. */
  refreshIntervalMs: number;
  /** Configuration key-value pairs. Empty for 304 (unchanged) and error responses. */
  settings: Record<string, unknown>;
  /** HTTP status code, or 0 when the request failed before a response was received. */
  statusCode: number;
  /** True when the request failed with a transient error (network error, timeout). */
  hasException: boolean;
}

/**
 * Make an HTTP GET request to a OneSettings endpoint and parse the response.
 *
 * This helper never throws: transient failures are caught and returned as a response with
 * `hasException: true`, and non-success HTTP status codes are preserved so the caller can decide
 * whether they are retryable.
 *
 * @param url - The OneSettings endpoint URL.
 * @param query - Query parameters to append to the URL.
 * @param headers - HTTP headers to send, e.g. `If-None-Match` for ETag-based change detection.
 * @returns A parsed {@link OneSettingsResponse}.
 * @internal
 */
export async function makeOneSettingsRequest(
  url: string,
  query: Record<string, string> = {},
  headers: Record<string, string> = {},
): Promise<OneSettingsResponse> {
  try {
    const request = createPipelineRequest({
      url: buildUrl(url, query),
      method: "GET",
      headers: createHttpHeaders(headers),
      timeout: ONE_SETTINGS_REQUEST_TIMEOUT_MS,
    });
    const response = await createDefaultHttpClient().sendRequest(request);
    return parseOneSettingsResponse(response);
  } catch (error) {
    diag.debug("Failed to fetch configuration from OneSettings:", error);
    return {
      refreshIntervalMs: ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS,
      settings: {},
      statusCode: 0,
      hasException: true,
    };
  }
}

/**
 * Append query parameters to a URL.
 */
function buildUrl(url: string, query: Record<string, string>): string {
  const parsed = new URL(url);
  for (const [key, value] of Object.entries(query)) {
    parsed.searchParams.set(key, value);
  }
  return parsed.toString();
}

/**
 * Parse a OneSettings HTTP response into a {@link OneSettingsResponse}.
 *
 * The status code is always preserved so callers can distinguish retryable server errors from
 * non-retryable client errors. Settings are only parsed on `200`; `304 Not Modified` and error
 * responses yield an empty settings object.
 */
function parseOneSettingsResponse(response: PipelineResponse): OneSettingsResponse {
  const statusCode = response.status;
  const etag = response.headers.get("etag") ?? undefined;

  let refreshIntervalMs = ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS;
  const refreshIntervalHeader = response.headers.get("x-ms-onesetinterval");
  if (refreshIntervalHeader) {
    // OneSettings returns the refresh interval as a positive integer number of minutes;
    // convert to milliseconds. Reject anything else (non-integer, zero, negative, non-numeric).
    const minutes = Number(refreshIntervalHeader);
    if (Number.isInteger(minutes) && minutes > 0) {
      refreshIntervalMs = minutes * 60 * 1000;
    } else {
      diag.debug(`Invalid OneSettings refresh interval header: ${refreshIntervalHeader}`);
    }
  }

  let settings: Record<string, unknown> = {};
  if (statusCode === 200) {
    if (response.bodyAsText) {
      try {
        settings = JSON.parse(response.bodyAsText).settings ?? {};
      } catch (error) {
        diag.debug("Failed to parse OneSettings response body:", error);
      }
    }
  } else if (statusCode !== 304) {
    diag.debug(`OneSettings request returned status code ${statusCode}`);
  }

  return { etag, refreshIntervalMs, settings, statusCode, hasException: false };
}
