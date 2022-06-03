// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions, ServiceClient } from "@azure/core-client";
import { createHttpHeaders, createPipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createTokenProviderFromConnectionString, parseNotificationHubsConnectionString } from "./utils/connectionStringUtils";
import { Installation, NotificationHubsClientOptions } from "./models";
import { SasTokenProvider } from "@azure/core-amqp";
import { tracingClient } from "./utils/tracing";

const API_VERSION = "2020-06";

export interface NotificationHubResponse {
  trackingId?: string;
  correlationId?: string;
  location?: string;
}

export class NotificationHubsClient extends ServiceClient {
  private _baseUrl: string;
  private _hubName: string;
  private _sasTokenProvider: SasTokenProvider;

  constructor(connectionString: string, hubName: string, options: NotificationHubsClientOptions = {}) {
    super(options);
    this._hubName = hubName;

    const parsedConnection = parseNotificationHubsConnectionString(connectionString);
    this._baseUrl = parsedConnection.endpoint;
    this._sasTokenProvider = createTokenProviderFromConnectionString(connectionString);
  }

  public deleteInstallation(installationId: string, options: OperationOptions = {}): Promise<NotificationHubResponse> {
    return tracingClient.withSpan("NotificationHubsClient-deleteInstallation", options, async (updatedOptions) => {
      const endpoint = this.getBaseURL();
      endpoint.pathname += `/installations/${installationId}`;
      const authorization = this._sasTokenProvider.getToken(this._baseUrl);
      const headers = createHttpHeaders();
      headers.set("Authorization", authorization.token);
      headers.set("x-ms-version", API_VERSION);

      const request = createPipelineRequest({
        ...updatedOptions.tracingOptions,
        ...updatedOptions.requestOptions,
        url: endpoint.toString(),
        abortSignal: updatedOptions.abortSignal,
        method: "DELETE",
        headers
      });

      const response = await this.sendRequest(request);
      if (response.status !== 204) {
        // TODO: throw special error
        throw new Error(`deleteInstallation failed with ${response.status}`);
      }

      return this.parseNotificationResponse(response);
    });
  }

  public getInstallation(installationId: string, options: OperationOptions = {}): Promise<Installation> {
    return tracingClient.withSpan("NotificationHubsClient-getInstallation", options, async (updatedOptions) => {
      const endpoint = this.getBaseURL();
      endpoint.pathname += `/installations/${installationId}`;
      const authorization = this._sasTokenProvider.getToken(this._baseUrl);
      const headers = createHttpHeaders();
      headers.set("Authorization", authorization.token);
      headers.set("x-ms-version", API_VERSION);

      const request = createPipelineRequest({
        ...updatedOptions.tracingOptions,
        ...updatedOptions.requestOptions,
        url: endpoint.toString(),
        abortSignal: updatedOptions.abortSignal,
        method: "PUT",
        headers
      });

      const response = await this.sendRequest(request);
      if (response.status !== 200) {
        // TODO: throw special error
        throw new Error(`deleteInstallation failed with ${response.status}`);
      }

      const installation = JSON.parse(response.bodyAsText) as Installation;
      return installation;
    });
  }

  private parseNotificationResponse(response: PipelineResponse): NotificationHubResponse {
      const correlationId = response.headers.get("x-ms-correlation-request-id");
      const trackingId = response.headers.get("TrackingId");
      const location = response.headers.get("Location");

      return {
        correlationId,
        trackingId,
        location
      };
  }

  private getBaseURL(): URL {
    // Node doesn't allow change in protocol but browsers do, so doing a string replace
    const url = new URL(this._baseUrl.replace("sb://", "https://"));
    url.pathname = this._hubName;
    url.searchParams.set("api-version", API_VERSION);

    return url;
  }
}
