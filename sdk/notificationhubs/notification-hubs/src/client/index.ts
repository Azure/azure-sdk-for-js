// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  HttpHeaders,
  HttpMethods,
  PipelineRequest,
  PipelineResponse,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import { NotificationHubsMessageResponse, NotificationHubsResponse } from "../models/response.js";
import { OperationOptions, ServiceClient } from "@azure/core-client";
import {
  createTokenProviderFromConnection,
  parseNotificationHubsConnectionString,
} from "../utils/connectionStringUtils.js";
import { NotificationHubsClientOptions } from "../models/options.js";
import { SasTokenProvider } from "@azure/core-amqp";

const API_VERSION = "2020-06";

/**
 * Represents the Notification Hubs SDK client.
 */
export interface NotificationHubsClient {
  /**
   * The SAS Token Provider for connecting to Notification Hubs.
   */
  sasTokenProvider: SasTokenProvider;

  /**
   * The base URL for the Notification Hub namespace.
   */
  baseUrl: string;

  /**
   * The Notification Hub name.
   */
  hubName: string;

  /**
   * @internal
   */
  sendRequest(request: PipelineRequest): Promise<PipelineResponse>;

  /**
   * @internal
   */
  getBaseUrl(): URL;

  /**
   * @internal
   */
  createHeaders(): HttpHeaders;
}

/**
 * Creates a NotificationHubClient from the Access Policy connection string and hub name.
 * @param connectionString - The Access Policy connection string for the notification hub.
 * @param hubName - The notification hub name.
 * @returns A NotificationHubsClient initialized from the connection string and hub name.
 */
export function clientFromConnectionString(
  connectionString: string,
  hubName: string,
  options: NotificationHubsClientOptions = {}
): NotificationHubsClient {
  return new NotificationHubsServiceClient(connectionString, hubName, options);
}

class NotificationHubsServiceClient extends ServiceClient implements NotificationHubsClient {
  sasTokenProvider: SasTokenProvider;
  baseUrl: string;
  hubName: string;

  constructor(
    connectionString: string,
    hubName: string,
    options: NotificationHubsClientOptions = {}
  ) {
    super(options);
    this.hubName = hubName;

    const parsedConnection = parseNotificationHubsConnectionString(connectionString);
    this.baseUrl = parsedConnection.endpoint;
    this.sasTokenProvider = createTokenProviderFromConnection(
      parsedConnection.sharedAccessKey,
      parsedConnection.sharedAccessKeyName
    );
  }

  createHeaders(): HttpHeaders {
    const authorization = this.sasTokenProvider.getToken(this.baseUrl);
    const headers = createHttpHeaders();
    headers.set("Authorization", authorization.token);
    headers.set("x-ms-version", API_VERSION);

    return headers;
  }

  getBaseUrl(): URL {
    // Node doesn't allow change in protocol but browsers do, so doing a string replace
    const url = new URL(this.baseUrl.replace("sb://", "https://"));
    url.pathname = this.hubName;
    url.searchParams.set("api-version", API_VERSION);

    return url;
  }
}

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
