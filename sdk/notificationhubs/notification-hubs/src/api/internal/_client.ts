// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  HttpHeaders,
  HttpMethods,
  PipelineRequest,
  PipelineResponse,
  RestError,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import {
  NotificationHubsMessageResponse,
  NotificationHubsResponse,
} from "../../models/notificationDetails.js";
import { NotificationHubsClientContext } from "../index.js";
import { OperationOptions } from "@azure-rest/core-client";
import { isDefined } from "../../utils/utils.js";
import { parseNotificationOutcome } from "../../serializers/notificationOutcomeSerializer.js";
import { parseXMLError } from "../../utils/xmlUtils.js";

export function createRequest(
  endpoint: URL,
  method: HttpMethods,
  headers: HttpHeaders,
  options: OperationOptions,
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
 * Parses the HTTP response and creates a NotificationHubsResponse with header information from the operation.
 * @param response - The HTTP response used to populate the result.
 * @returns A NotificationHubsResponse with header information from the operation.
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
 * Parses the HTTP response and creates a NotificationHubsMessageResponse with results from the notification.
 * @param response - The HTTP response used to populate the result.
 * @returns A NotificationHubsMessageResponse with results from the notification.
 */
export async function parseNotificationSendResponse(
  response: PipelineResponse,
): Promise<NotificationHubsMessageResponse> {
  const result = parseNotificationResponse(response);
  let notificationId: string | undefined;
  if (result.location) {
    const locationUrl = new URL(result.location);
    notificationId = locationUrl.pathname.split("/")[3];
  }

  const requestUrl = new URL(response.request.url);
  const isTestSend = requestUrl.searchParams.has("test");
  const isDirectSend = requestUrl.searchParams.has("direct");

  // Only broadcast/tag based sends are supported for test send
  const responseBody = response.bodyAsText;
  if (isTestSend && !isDirectSend && isDefined(responseBody)) {
    const outcome = await parseNotificationOutcome(responseBody);
    return {
      ...result,
      ...outcome,
      notificationId,
    };
  } else {
    return createDefaultResponse(result, notificationId);
  }
}

function createDefaultResponse(
  response: NotificationHubsResponse,
  notificationId?: string,
): NotificationHubsMessageResponse {
  return {
    ...response,
    notificationId,
    successCount: 0,
    failureCount: 0,
    results: [],
    state: "Enqueued",
  };
}

/**
 * Sends a request through the client context.
 * @param context - The client context to use.
 * @param request - The HTTP request to send.
 * @param successStatusCode - A status code or list of status codes to check for success.
 * @returns The HTTP Response.
 */
export async function sendRequest(
  context: NotificationHubsClientContext,
  request: PipelineRequest,
  successStatusCode: number | number[],
): Promise<PipelineResponse> {
  const statuses: number[] = Array.isArray(successStatusCode)
    ? successStatusCode
    : [successStatusCode];

  const response = await context.sendRequest(request);

  if (!statuses.some((statusCode) => statusCode === response.status)) {
    const responseBody = response.bodyAsText;
    let details: string | undefined;
    if (isDefined(responseBody)) {
      details = await parseXMLError(responseBody);
    }

    let errorMessage: string | undefined;
    if (isDefined(details)) {
      errorMessage = `operations failed with: ${details}`;
    } else {
      errorMessage = `operation failed with status ${response.status}`;
    }

    throw new RestError(errorMessage, {
      statusCode: response.status,
      response,
    });
  }

  return response;
}
