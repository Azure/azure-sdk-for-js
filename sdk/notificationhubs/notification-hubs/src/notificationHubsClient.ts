// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BrowserPushChannel,
  InstallationPatch,
  InstallationType,
  NotificationHubMessageType,
  NotificationHubResponse,
  NotificationHubsClientOptions,
  PushHandleType,
  SendOperationOptions,
} from "./models";
import {
  HttpHeaders,
  HttpMethods,
  PipelineRequest,
  PipelineResponse,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import { OperationOptions, ServiceClient } from "@azure/core-client";
import {
  createTokenProviderFromConnection,
  parseNotificationHubsConnectionString,
} from "./utils/connectionStringUtils";
import { SasTokenProvider } from "@azure/core-amqp";
import { tracingClient } from "./utils/tracing";

const API_VERSION = "2020-06";

export class NotificationHubsClient extends ServiceClient {
  private _baseUrl: string;
  private _hubName: string;
  private _sasTokenProvider: SasTokenProvider;

  constructor(
    connectionString: string,
    hubName: string,
    options: NotificationHubsClientOptions = {}
  ) {
    super(options);
    this._hubName = hubName;

    const parsedConnection = parseNotificationHubsConnectionString(connectionString);
    this._baseUrl = parsedConnection.endpoint;
    this._sasTokenProvider = createTokenProviderFromConnection(
      parsedConnection.sharedAccessKey,
      parsedConnection.sharedAccessKeyName
    );
  }

  public deleteInstallation(
    installationId: string,
    options: OperationOptions = {}
  ): Promise<NotificationHubResponse> {
    return tracingClient.withSpan(
      "NotificationHubsClient-deleteInstallation",
      options,
      async (updatedOptions) => {
        const endpoint = this.getBaseURL();
        endpoint.pathname += `/installations/${installationId}`;
        const headers = this.createHeaders();

        const request = this.createRequest(endpoint, "DELETE", headers, updatedOptions);

        const response = await this.sendRequest(request);
        if (response.status !== 204) {
          // TODO: throw special error
          throw new Error(`deleteInstallation failed with ${response.status}`);
        }

        return this.parseNotificationResponse(response);
      }
    );
  }

  public getInstallation(
    installationId: string,
    options: OperationOptions = {}
  ): Promise<InstallationType> {
    return tracingClient.withSpan(
      "NotificationHubsClient-getInstallation",
      options,
      async (updatedOptions) => {
        const endpoint = this.getBaseURL();
        endpoint.pathname += `/installations/${installationId}`;
        const headers = this.createHeaders();
        headers.set("Content-Type", "application/json");

        const request = this.createRequest(endpoint, "GET", headers, updatedOptions);

        const response = await this.sendRequest(request);
        if (response.status !== 200) {
          // TODO: throw special errors
          throw new Error(`getInstallation failed with ${response.status}`);
        }

        const installation = JSON.parse(response.bodyAsText!) as InstallationType;
        return installation;
      }
    );
  }

  public upsertInstallation(
    installation: InstallationType,
    options: OperationOptions = {}
  ): Promise<NotificationHubResponse> {
    return tracingClient.withSpan(
      "NotificationHubsClient-upsertInstallation",
      options,
      async (updatedOptions) => {
        const endpoint = this.getBaseURL();
        endpoint.pathname += `/installations/${installation.installationId}`;
        const headers = this.createHeaders();
        headers.set("Content-Type", "application/json");

        const request = this.createRequest(endpoint, "PUT", headers, updatedOptions);

        request.body = JSON.stringify(installation);

        const response = await this.sendRequest(request);
        if (response.status !== 200) {
          // TODO: throw special errors
          throw new Error(`upsertInstallation failed with ${response.status}`);
        }

        return this.parseNotificationResponse(response);
      }
    );
  }

  public patchInstallation(
    installationId: string,
    installationPatches: InstallationPatch[],
    options: OperationOptions = {}
  ): Promise<NotificationHubResponse> {
    return tracingClient.withSpan(
      "NotificationHubsClient-patchInstallation",
      options,
      async (updatedOptions) => {
        const endpoint = this.getBaseURL();
        endpoint.pathname += `/installations/${installationId}`;
        const headers = this.createHeaders();
        headers.set("Content-Type", "application/json");

        const request = this.createRequest(endpoint, "PATCH", headers, updatedOptions);

        request.body = JSON.stringify(installationPatches);

        const response = await this.sendRequest(request);
        if (response.status !== 200) {
          // TODO: throw special errors
          throw new Error(`upsertInstallation failed with ${response.status}`);
        }

        return this.parseNotificationResponse(response);
      }
    );
  }

  public sendDirectNotification(
    pushHandle: PushHandleType,
    message: NotificationHubMessageType,
    options: SendOperationOptions = {}
  ): Promise<NotificationHubResponse> {
    return tracingClient.withSpan(
      "NotificationHubsClient-sendDirectMessage",
      options,
      async (updatedOptions) => {
        const endpoint = this.getBaseURL();
        endpoint.pathname += `/messages/`;

        if (options.debug) {
          endpoint.searchParams.append("debug", "true");
        }

        const headers = this.createHeaders();
        headers.set("Content-Type", message.contentType);
        headers.set("ServiceBusNotification-Format", message.platform);

        // TODO: Validation?
        if (message.platform === "browser") {
          const browserHandle = pushHandle as BrowserPushChannel;
          headers.set("ServiceBusNotification-DeviceHandle", browserHandle.endpoint);
          headers.set("Auth", browserHandle.auth);
          headers.set("P256DH", browserHandle.p256dh);
        } else {
          headers.set("ServiceBusNotification-DeviceHandle", pushHandle as string);
        }

        const request = this.createRequest(endpoint, "POST", headers, updatedOptions);

        request.body = message.body;

        const response = await this.sendRequest(request);
        if (response.status !== 201) {
          // TODO: throw special errors
          throw new Error(`upsertInstallation failed with ${response.status}`);
        }

        return this.parseNotificationResponse(response);
      }
    );
  }

  public sendNotificationWithTagExpression(
    tagExpression: string,
    message: NotificationHubMessageType,
    options: SendOperationOptions = {}
  ): Promise<NotificationHubResponse> {
    return tracingClient.withSpan(
      "NotificationHubsClient-sendDirectMessage",
      options,
      async (updatedOptions) => {
        const endpoint = this.getBaseURL();
        endpoint.pathname += `/messages/`;

        if (options.debug) {
          endpoint.searchParams.append("debug", "true");
        }

        const headers = this.createHeaders();
        headers.set("Content-Type", message.contentType);
        headers.set("ServiceBusNotification-Format", message.platform);
        headers.set("ServiceBusNotification-Tags", tagExpression);

        const request = this.createRequest(endpoint, "POST", headers, updatedOptions);

        request.body = message.body;

        const response = await this.sendRequest(request);
        if (response.status !== 201) {
          // TODO: throw special errors
          throw new Error(`upsertInstallation failed with ${response.status}`);
        }

        return this.parseNotificationResponse(response);
      }
    );
  }

  public sendNotificationWithTags(
    tags: string[],
    message: NotificationHubMessageType,
    options: SendOperationOptions = {}
  ): Promise<NotificationHubResponse> {
    const tagExpression = tags.join("||");
    return this.sendNotificationWithTagExpression(tagExpression, message, options);
  }

  private createHeaders(): HttpHeaders {
    const authorization = this._sasTokenProvider.getToken(this._baseUrl);
    const headers = createHttpHeaders();
    headers.set("Authorization", authorization.token);
    headers.set("x-ms-version", API_VERSION);

    return headers;
  }

  private createRequest(
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

  private parseNotificationResponse(response: PipelineResponse): NotificationHubResponse {
    const correlationId = response.headers.get("x-ms-correlation-request-id");
    const trackingId = response.headers.get("TrackingId");
    const location = response.headers.get("Location");

    return {
      correlationId,
      trackingId,
      location,
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
