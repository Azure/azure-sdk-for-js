// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, PipelineResponse } from "@azure/core-rest-pipeline";
import {
  createDefaultHttpClient,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import { diag } from "@opentelemetry/api";
import {
  ONE_SETTINGS_CHANGE_VERSION_KEY,
  ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_SECONDS,
} from "../Declarations/Constants.js";

type QueryParameters = Record<string, string>;

type HeaderParameters = Record<string, string>;

type LogHandler = (message: string) => void;

const defaultLogWarn: LogHandler = (message) => {
  diag.warn(message);
};

/**
 * Structured representation of a OneSettings response.
 */
export class OneSettingsResponse {
  /**
   * Creates a new {@link OneSettingsResponse} instance.
   */
  constructor(
    public etag: string | undefined = undefined,
    public refreshInterval: number = ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_SECONDS,
    public settings: Record<string, unknown> = {},
    public version: number | undefined = undefined,
    public statusCode: number = 200,
  ) {}
}

/**
 * Execute an HTTP GET request to the OneSettings service and parse the response.
 */
export async function makeOneSettingsRequest(
  url: string,
  queryParams: QueryParameters | undefined = undefined,
  headers: HeaderParameters | undefined = undefined,
  httpClient: HttpClient = createDefaultHttpClient(),
  logWarn: LogHandler = defaultLogWarn,
): Promise<OneSettingsResponse> {
  const query = queryParams ?? {};
  const headerValues = headers ?? {};

  try {
    const requestUrl = new URL(url);
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null) {
        requestUrl.searchParams.set(key, value);
      }
    }

    const request = createPipelineRequest({
      url: requestUrl.toString(),
      method: "GET",
      timeout: 10000,
      headers: createHttpHeaders(headerValues),
    });

    const response = await httpClient.sendRequest(request);
    return parseOneSettingsResponse(response, logWarn);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    logWarn(`Failed to fetch configuration from OneSettings: ${message}`);
    return new OneSettingsResponse(
      undefined,
      ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_SECONDS,
      {},
      undefined,
      0,
    );
  }
}

/**
 * Convert a {@link PipelineResponse} into a {@link OneSettingsResponse}.
 */
export function parseOneSettingsResponse(
  response: PipelineResponse,
  logWarn: LogHandler = defaultLogWarn,
): OneSettingsResponse {
  let refreshInterval = ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_SECONDS;
  let etag: string | undefined;
  const settings: Record<string, unknown> = {};
  let version: number | undefined = undefined;
  let statusCode = 0;

  if (!response) {
    logWarn("No settings found in OneSettings response");
    return new OneSettingsResponse(etag, refreshInterval, settings, version, statusCode);
  }

  statusCode = response.status;

  if (response.headers) {
    etag = response.headers.get("etag") ?? undefined;
    const refreshIntervalHeader = response.headers.get("x-ms-onesetinterval");
    if (refreshIntervalHeader) {
      const parsedMinutes = Number.parseInt(refreshIntervalHeader, 10);
      if (Number.isFinite(parsedMinutes) && parsedMinutes > 0) {
        refreshInterval = parsedMinutes * 60;
      } else {
        logWarn(`Invalid refresh interval format: ${refreshIntervalHeader}`);
      }
    }
  }

  switch (response.status) {
    // 304 Not Modified - no changes to apply
    case 304:
      break;
    // 200 OK - parse settings from body
    case 200:
      if (response.bodyAsText) {
        try {
          const parsed = JSON.parse(response.bodyAsText) as {
            settings?: Record<string, unknown>;
          };
          if (parsed.settings) {
            for (const [key, value] of Object.entries(parsed.settings)) {
              settings[key] = value;
            }
            const changeVersion = parsed.settings[ONE_SETTINGS_CHANGE_VERSION_KEY];
            if (changeVersion !== undefined && changeVersion !== null) {
              const parsedVersion = Number(changeVersion);
              if (!Number.isNaN(parsedVersion)) {
                version = parsedVersion;
              } else {
                logWarn(`Failed to parse OneSettings change version: ${String(changeVersion)}`);
              }
            }
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          logWarn(`Failed to decode OneSettings response content: ${message}`);
        }
      }
      break;
    case 400:
      logWarn(`Bad request to OneSettings: ${response.bodyAsText ?? "OneSettings returned 400"}`);
      break;
    case 404:
      logWarn(
        `OneSettings configuration not found: ${response.bodyAsText ?? "OneSettings returned 404"}`,
      );
      break;
    case 414:
      logWarn(
        `OneSettings request URI too long: ${response.bodyAsText ?? "OneSettings returned 414"}`,
      );
      break;
    case 500:
      logWarn(
        `Internal server error from OneSettings: ${
          response.bodyAsText ?? "OneSettings returned 500"
        }`,
      );
      break;
    default:
      logWarn(
        `Unexpected OneSettings response status ${response.status}: ${response.bodyAsText ?? ""}`,
      );
      break;
  }

  return new OneSettingsResponse(etag, refreshInterval, settings, version, statusCode);
}
