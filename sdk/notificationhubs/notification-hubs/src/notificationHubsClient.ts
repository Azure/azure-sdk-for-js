// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions, ServiceClient } from "@azure/core-client";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { createTokenProviderFromConnectionString, parseEndpoint, parseNotificationHubsConnectionString } from "./utils/connectionStringUtils";
import { NotificationHubsClientOptions } from "./models";
import { SasTokenProvider } from "@azure/core-amqp";
import { tracingClient } from "./utils/tracing";

const API_VERSION = "2020-06";

export interface NotificationHubResponse {
  trackingId?: string;
  correlationId?: string;
  location?: string;
}

export class NotificationHubsClient extends ServiceClient {
  private _baseUrl: { host: string; hostname: string; port?: string } ;
  private _hubName: string;
  private _sasTokenProvider: SasTokenProvider;

  constructor(connectionString: string, hubName: string, options: NotificationHubsClientOptions = {}) {
    super(options);
    this._hubName = hubName;

    const parsedConnection = parseNotificationHubsConnectionString(connectionString);
    this._baseUrl = parseEndpoint(parsedConnection.endpoint);
    this._sasTokenProvider = createTokenProviderFromConnectionString(connectionString);
  }

  public deleteInstallation(installationId: string, options: OperationOptions = {}): Promise<NotificationHubResponse> {
    return tracingClient.withSpan("NotificationHubsClient-deleteInstallation", options, async (updatedOptions) => {
      const endpoint = `${this._baseUrl.hostname.replace("sb://", "https://")}/${this._hubName}/installations/${installationId}?api-version=${API_VERSION}`;
      const authorization = this._sasTokenProvider.getToken(this._baseUrl.hostname);
      const headers = createHttpHeaders();
      headers.set("Authorization", authorization.token);
      headers.set("x-ms-version", API_VERSION);

      const request = createPipelineRequest({
        ...updatedOptions.tracingOptions,
        ...updatedOptions.requestOptions,
        url: endpoint,
        abortSignal: updatedOptions.abortSignal,
        method: "DELETE",
        headers
      });

      const response = await this.sendRequest(request);
      if (response.status !== 204) {
        // TODO: throw special error
        throw new Error(`deleteInstallation failed with ${response.status}`);
      }

      const correlationId = response.headers.get("x-ms-correlation-request-id");
      const trackingId = response.headers.get("TrackingId");
      const location = response.headers.get("Location");

      return {
        correlationId,
        trackingId,
        location
      }
    });
  }
}
