// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as constants from "../utils/constants.js";
import {
  HttpClient,
  HttpHeaders,
  PipelineRequest,
  PipelineResponse,
  RestError,
  createDefaultHttpClient,
  createHttpHeaders,
} from "@azure/core-rest-pipeline";
import {
  createTokenCredentialFromConnection,
  parseNotificationHubsConnectionString,
} from "../auth/connectionStringUtils.js";
import { NotificationHubsClientOptions } from "../models/options.js";
import { SasTokenCredential } from "../auth/sasTokenCredential.js";
import { Client, getClient } from "@azure-rest/core-client";

const API_VERSION = "2020-06";

/**
 * Represents the Notification Hubs SDK client context.
 */
export interface NotificationHubsClientContext {
  /**
   * @internal
   */
  sendRequest(request: PipelineRequest): Promise<PipelineResponse>;

  /**
   * @internal
   */
  createHeaders(operationName: string, rawHeaders?: Record<string, string>): Promise<HttpHeaders>;

  /**
   * @internal
   */
  requestUrl(): URL;
}

/**
 * Creates a NotificationHubClient from the Access Policy connection string and hub name.
 * @param connectionString - The Access Policy connection string for the notification hub.
 * @param hubName - The notification hub name.
 * @returns A NotificationHubsClientContext initialized from the connection string and hub name.
 */
export function createClientContext(
  connectionString: string,
  hubName: string,
  options: NotificationHubsClientOptions = {},
): NotificationHubsClientContext {
  return new NotificationHubsServiceClient(connectionString, hubName, options);
}

class NotificationHubsServiceClient implements NotificationHubsClientContext {
  sasTokenCredential: SasTokenCredential;
  baseUrl: string;
  hubName: string;
  client: Client;
  httpClient: HttpClient;

  constructor(
    connectionString: string,
    hubName: string,
    options: NotificationHubsClientOptions = {},
  ) {
    this.hubName = hubName;

    const parsedConnection = parseNotificationHubsConnectionString(connectionString);
    // Node doesn't allow change in protocol but browsers do, so doing a string replace
    this.baseUrl = parsedConnection.endpoint.replace("sb://", "https://");
    this.sasTokenCredential = createTokenCredentialFromConnection(
      parsedConnection.sharedAccessKey,
      parsedConnection.sharedAccessKeyName,
    );

    const packageDetails = `azsdk-js-notificationhubs/${constants.SDK_VERSION}`;
    const userAgentPrefix = options.userAgentOptions?.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}`
      : `${packageDetails}`;

    this.httpClient = options?.httpClient ?? createDefaultHttpClient();
    this.client = getClient(this.baseUrl, {
      userAgentOptions: {
        userAgentPrefix,
      },
      ...options,
    });
  }

  async createHeaders(
    operationName: string,
    rawHeaders?: Record<string, string>,
  ): Promise<HttpHeaders> {
    const authorization = await this.sasTokenCredential.getToken(this.baseUrl);
    if (!authorization) {
      throw new RestError("Failed to get the authorization header", { statusCode: 401 });
    }

    const headers = createHttpHeaders(rawHeaders);
    headers.set("Authorization", authorization.token);
    headers.set("x-ms-version", API_VERSION);
    headers.set(
      "x-ms-azsdk-telemetry",
      `class=NotificationHubsServiceClient;method=${operationName}`,
    );

    return headers;
  }

  sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
    return this.client.pipeline.sendRequest(this.httpClient, request);
  }

  requestUrl(): URL {
    const url = new URL(this.baseUrl);
    url.pathname = this.hubName;
    url.searchParams.set("api-version", API_VERSION);

    return url;
  }
}
