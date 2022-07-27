// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  HttpHeaders,
  PipelineRequest,
  PipelineResponse,
  createHttpHeaders,
} from "@azure/core-rest-pipeline";
import {
  createTokenProviderFromConnection,
  parseNotificationHubsConnectionString,
} from "../utils/connectionStringUtils.js";
import { parseXML, stringifyXML } from "@azure/core-xml";
import { InternalClientPipelineOptions } from "@azure/core-client";
import { NotificationHubsClientOptions } from "../models/options.js";
import { SasTokenProvider } from "@azure/core-amqp";
import { ServiceClient } from "@azure/core-client";

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
export function createClientContext(
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
    super({
      deserializationOptions: {
        parseXML,
      },
      serializationOptions: {
        stringifyXML,
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
