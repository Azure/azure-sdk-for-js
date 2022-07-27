// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  HttpHeaders,
  HttpMethods,
  PipelineRequest,
  PipelineResponse,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import {
  NotificationHubsMessageResponse,
  NotificationHubsResponse,
} from "../../models/response.js";
import { OperationOptions } from "@azure/core-client";

/**
 * @internal
 */
export function createRequest(
  endpoint: URL,
  method: HttpMethods,
  headers: HttpHeaders,
  options: OperationOptions
): PipelineRequest {
  return createPipelineRequest({
    ...options.tracingOptions,
    ...options.requestOptions,
    url: endpoint.toString(),
    abortSignal: options.abortSignal,
    method,
    headers,
  });
}

/**
 * @internal
 */
export function parseNotificationResponse(response: PipelineResponse): NotificationHubsResponse {
  const correlationId = response.headers.get("x-ms-correlation-request-id");
  const trackingId = response.headers.get("TrackingId");
  const location = response.headers.get("Location");

  return {
    correlationId,
    trackingId,
    location,
  };
}

/**
 * @internal
 */
export function parseNotificationSendResponse(
  response: PipelineResponse
): NotificationHubsMessageResponse {
  const result = parseNotificationResponse(response);
  let notificationId: string | undefined;
  if (result.location) {
    const locationUrl = new URL(result.location);
    notificationId = locationUrl.pathname.split("/")[3];
  }

  return {
    ...result,
    notificationId,
  };
}
