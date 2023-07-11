// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as constants from "../utils/constants.js";
import {
  HttpHeaders,
  PipelineRequest,
  PipelineResponse,
  createHttpHeaders,
} from "@azure/core-rest-pipeline";
import {
  createTokenProviderFromConnection,
  parseNotificationHubsConnectionString,
} from "../auth/connectionStringUtils.js";
import { parseXML, stringifyXML } from "@azure/core-xml";
import { InternalClientPipelineOptions } from "@azure/core-client";
import { NotificationHubsClientOptions } from "../models/options.js";
import { SasTokenProvider } from "../auth/sasTokenProvider.js";
import { ServiceClient } from "@azure/core-client";

const API_VERSION = "2020-06";

/**
 * Represents the Notification Hubs SDK client context.
 */
export interface NotificationHubsClientContext {
  /**
   * The SAS Token Provider for connecting to Notification Hubs.
   */
  readonly sasTokenProvider: SasTokenProvider;

  /**
   * The base URL for the Notification Hub namespace.
   */
  readonly baseUrl: string;

  /**
   * The Notification Hub name.
   */
  readonly hubName: string;

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
  options: NotificationHubsClientOptions = {}
): NotificationHubsClientContext {
  return new NotificationHubsServiceClient(connectionString, hubName, options);
}

class NotificationHubsServiceClient extends ServiceClient implements NotificationHubsClientContext {
  sasTokenProvider: SasTokenProvider;
  baseUrl: string;
  hubName: string;

  constructor(
    connectionString: string,
    hubName: string,
    options: NotificationHubsClientOptions = {}
  ) {
    super({
      deserializationOptions: {
        parseXML,
      },
      serializationOptions: {
        stringifyXML,
      },
      userAgentOptions: {
        userAgentPrefix: `azsdk-js-messaging-notificationhubs/${constants.SDK_VERSION}`,
      },
      ...options,
    } as InternalClientPipelineOptions);

    this.hubName = hubName;

    const parsedConnection = parseNotificationHubsConnectionString(connectionString);
    this.baseUrl = parsedConnection.endpoint;
    this.sasTokenProvider = createTokenProviderFromConnection(
      parsedConnection.sharedAccessKey,
      parsedConnection.sharedAccessKeyName
    );
  }

  async createHeaders(
    operationName: string,
    rawHeaders?: Record<string, string>
  ): Promise<HttpHeaders> {
    const authorization = await this.sasTokenProvider.getToken(this.baseUrl);
    const headers = createHttpHeaders(rawHeaders);
    headers.set("Authorization", authorization.token);
    headers.set("x-ms-version", API_VERSION);
    headers.set(
      "x-ms-azsdk-telemetry",
      `class=NotificationHubsServiceClient;method=${operationName}`
    );

    return headers;
  }

  requestUrl(): URL {
    // Node doesn't allow change in protocol but browsers do, so doing a string replace
    const url = new URL(this.baseUrl.replace("sb://", "https://"));
    url.pathname = this.hubName;
    url.searchParams.set("api-version", API_VERSION);

    return url;
  }
}
