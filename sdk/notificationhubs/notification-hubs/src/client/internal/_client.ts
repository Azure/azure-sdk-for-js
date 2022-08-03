// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
} from "../../models/response.js";
import { NotificationHubsClientContext } from "../index.js";
import { OperationOptions } from "@azure/core-client";
import { isDefined } from "../../utils/utils.js";
import { parseXMLError } from "../../utils/xmlUtils.js";

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
  successStatusCode: number | number[]
): Promise<PipelineResponse> {
  const statuses: number[] = Array.isArray(successStatusCode)
    ? successStatusCode
    : [successStatusCode];

  const response = await context.sendRequest(request);

  if (!statuses.some((statusCode) => statusCode === response.status)) {
    const responseBody = response.bodyAsText;
    let details: string | undefined;
    if (isDefined(responseBody)) {
      try {
        details = await parseXMLError(responseBody);
      } catch (err) {
        // eslint-disable no-empty
      }
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
