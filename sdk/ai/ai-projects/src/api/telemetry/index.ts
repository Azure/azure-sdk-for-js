// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AIProjectContext as Client,
  TelemetryGetAppInsightsOptionalParams,
} from "../index.js";
import {
  GetAppInsightsResponse,
  getAppInsightsResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

/**
 * Telemetry options
 */
export interface TelemetryOptions {
  /** Enable content recording */
  enableContentRecording: boolean;
}

const telemetryOptions: TelemetryOptions & { connectionString: string | undefined, appInsightsResourceUrl: string | undefined } = {
  enableContentRecording: false,
  connectionString: undefined,
  appInsightsResourceUrl: undefined,
};

/**
 * Update the telemetry settings
 * @param options - The telemetry options
 */
export function updateTelemetryOptions(options: TelemetryOptions): void {
  telemetryOptions.enableContentRecording = options.enableContentRecording;
}

/**
 * Get the telemetry options
 * @returns The telemetry options
 */
export function getTelemetryOptions(): TelemetryOptions {
  return { ...telemetryOptions };
}

/**
 * Reset the telemetry options
 */
export function resetTelemetryOptions(): void {
  telemetryOptions.connectionString = undefined;
  telemetryOptions.enableContentRecording = false;
}

export function _getAppInsightsSend(
  context: Client,
  appInsightsResourceUrl: string,
  options: TelemetryGetAppInsightsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{appInsightsResourceUrl}{?api-version}",
    {
      appInsightsResourceUrl: appInsightsResourceUrl,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getAppInsightsDeserialize(
  result: PathUncheckedResponse,
): Promise<GetAppInsightsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return getAppInsightsResponseDeserializer(result.body);
}

/** Gets the properties of the specified Application Insights resource */
export async function getAppInsights(
  context: Client,
  appInsightsResourceUrl: string,
  options: TelemetryGetAppInsightsOptionalParams = { requestOptions: {} },
): Promise<GetAppInsightsResponse> {
  const result = await _getAppInsightsSend(
    context,
    appInsightsResourceUrl,
    options,
  );

  const appInsights = await _getAppInsightsDeserialize(result);
  telemetryOptions.appInsightsResourceUrl = appInsightsResourceUrl;
  telemetryOptions.connectionString = appInsights.properties?.connectionString;
  return appInsights;
}

export async function getConnectionString(
  context: Client,
  appInsightsResourceUrl: string,
  options: TelemetryGetAppInsightsOptionalParams = { requestOptions: {} },
): Promise<string | undefined> {
  if (telemetryOptions.connectionString) {
    return telemetryOptions.connectionString;
  }

  await getAppInsights(
    context,
    appInsightsResourceUrl,
    options,
  );
  return telemetryOptions.connectionString;
}
