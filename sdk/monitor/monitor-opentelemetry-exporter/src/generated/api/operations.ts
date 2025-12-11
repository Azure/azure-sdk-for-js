// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMonitorExporterContext as Client } from "./index.js";
import {
  TelemetryItem,
  TrackResponse,
  trackResponseDeserializer,
  telemetryItemArraySerializer,
} from "../models/models.js";
import { TrackOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _trackSend(
  context: Client,
  body: TelemetryItem[],
  options: TrackOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/track")
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: telemetryItemArraySerializer(body),
    });
}

export async function _trackDeserialize(result: PathUncheckedResponse): Promise<TrackResponse> {
  const expectedStatuses = ["200", "206"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    const statusCode = Number.parseInt(result.status);
    if (statusCode === 400) {
      error.details = trackResponseDeserializer(result.body);
    } else if (statusCode === 402) {
      error.details = trackResponseDeserializer(result.body);
    } else if (statusCode === 429) {
      error.details = trackResponseDeserializer(result.body);
    } else if (statusCode === 500) {
      error.details = trackResponseDeserializer(result.body);
    } else if (statusCode === 503) {
      error.details = trackResponseDeserializer(result.body);
    }
    throw error;
  }

  return trackResponseDeserializer(result.body);
}

/**
 * This operation sends a sequence of telemetry events that will be monitored by
 * Azure Monitor.
 */
export async function track(
  context: Client,
  body: TelemetryItem[],
  options: TrackOptionalParams = { requestOptions: {} },
): Promise<TrackResponse> {
  const result = await _trackSend(context, body, options);
  return _trackDeserialize(result);
}
