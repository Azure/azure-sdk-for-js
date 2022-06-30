// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BrowserPushChannel,
  InstallationPatch,
  Installation,
  NotificationHubMessage,
  NotificationHubResponse,
  NotificationHubsClientOptions,
  PushHandle,
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

/**
 * This represents a client for Azure Notification Hubs to manage installations and send
 * messages to devices.
 */
export class NotificationHubsClient extends ServiceClient {
  private _baseUrl: string;
  private _hubName: string;
  private _sasTokenProvider: SasTokenProvider;

  /**
   * Creates a new instance of the NotificationClient with a connection string, hub name and options.
   * @param connectionString - The Notification Hub Access Policy connection string.
   * @param hubName - The name of the Azure Notification Hub.
   * @param options - Options for configuring the Azure Notification Hubs client.
   */
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

  /**
   * Deletes an installation from a Notification Hub.
   * @param installationId - The installation ID of the installation to delete.
   * @param options - Configuration options for the installation delete operation.
   * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
   */
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

  /**
   * Gets an Azure Notification Hub installation by the installation ID.
   * @param installationId - The ID of the installation to get.
   * @param options - Configuration options for the get installation operation.
   * @returns The installation that matches the installation ID.
   */
  public getInstallation(
    installationId: string,
    options: OperationOptions = {}
  ): Promise<Installation> {
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

        const installation = JSON.parse(response.bodyAsText!) as Installation;
        return installation;
      }
    );
  }

  /**
   * Creates or overwrites an installation to a Notification Hub.
   * @param installation - The installation to create or overwrite.
   * @param options - Configuration options for the create or update installation operation.
   * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
   */
  public createOrUpdateInstallation(
    installation: Installation,
    options: OperationOptions = {}
  ): Promise<NotificationHubResponse> {
    return tracingClient.withSpan(
      "NotificationHubsClient-createOrUpdateInstallation",
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
          throw new Error(`createOrUpdateInstallation failed with ${response.status}`);
        }

        return this.parseNotificationResponse(response);
      }
    );
  }

  /**
   * Patches an installation using the JSON-Patch standard in RFC6902.
   * @param installationId - The ID of the installation to update.
   * @param installationPatches - An array of patches following the JSON-Patch standard.
   * @param options - Configuration options for the patch installation operation.
   * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
   */
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
          throw new Error(`patchInstallation failed with ${response.status}`);
        }

        return this.parseNotificationResponse(response);
      }
    );
  }

  /**
   * Retrieves an Azure Storage container URL. The container has feedback data for the notification hub.
   * The caller can then use the Azure Storage Services SDK to retrieve the contents of the container.
   * @param options - The options for getting the push notification feedback container URL.
   * @returns The URL of the Azure Storage Container containing the feedback data.
   */
  public getFeedbackContainerURL(options: OperationOptions = {}): Promise<string> {
    return tracingClient.withSpan(
      "NotificationHubsClient-getFeedbackContainerURL",
      options,
      async (updatedOptions) => {
        const endpoint = this.getBaseURL();
        endpoint.pathname += "/feedbackcontainer";
        const headers = this.createHeaders();
        headers.set("Content-Type", "application/xml;type=entry;charset=utf-8");

        const request = this.createRequest(endpoint, "GET", headers, updatedOptions);
        const response = await this.sendRequest(request);
        if (response.status !== 200) {
          // TODO: throw special errors
          throw new Error(`getFeedbackContainerURL failed with ${response.status}`);
        }

        return response.bodyAsText!;
      }
    );
  }

  /**
   * Sends a direct push notification to a device with the given push handle.
   * @param pushHandle - The push handle which is the unique identifier for the device.
   * @param message - The message to send to the device.
   * @param options - Configuration options for the direct send operation which can contain custom headers
   * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
   * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
   */
  public sendDirectNotification(
    pushHandle: PushHandle,
    message: NotificationHubMessage,
    options: SendOperationOptions = {}
  ): Promise<NotificationHubResponse> {
    return this.sendNotificationImpl(
      message,
      "sendDirectNotification",
      pushHandle,
      undefined,
      undefined,
      options
    );
  }

  /**
   * Sends push notifications to devices that match the given tags or tag expression.
   * @param tags - The tags used to target the device for push notifications in either an array or tag expression.
   * @param message - The message to send to the matching devices.
   * @param options - Configuration options for the direct send operation which can contain custom headers
   * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
   * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
   */
  public sendNotification(
    tags: string[] | string,
    message: NotificationHubMessage,
    options: SendOperationOptions = {}
  ): Promise<NotificationHubResponse> {
    return this.sendNotificationImpl(
      message,
      "sendNotification",
      undefined,
      tags,
      undefined,
      options
    );
  }

  /**
   * Schedules a push notification to devices that match the given tags or tag expression at the specified time.
   * NOTE: This is only available in Standard SKU Azure Notification Hubs.
   * @param scheduledTime - The Date to send the push notification.
   * @param tags - The tags used to target the device for push notifications in either an array or tag expression.
   * @param message - The message to send to the matching devices.
   * @param options - Configuration options for the direct send operation which can contain custom headers
   * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
   * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
   */
  public scheduleNotification(
    scheduledTime: Date,
    tags: string[] | string,
    message: NotificationHubMessage,
    options: SendOperationOptions = {}
  ): Promise<NotificationHubResponse> {
    return this.sendNotificationImpl(
      message,
      "scheduleNotification",
      undefined,
      tags,
      scheduledTime,
      options
    );
  }

  private sendNotificationImpl(
    message: NotificationHubMessage,
    method: string,
    pushHandle?: PushHandle,
    tags?: string | string[],
    scheduledTime?: Date,
    options: SendOperationOptions = {}
  ): Promise<NotificationHubResponse> {
    return tracingClient.withSpan(
      `NotificationHubsClient-${method}`,
      options,
      async (updatedOptions) => {
        const endpoint = this.getBaseURL();

        let subPath = null;
        if (scheduledTime) {
          subPath = "/schedulednotifications/";
        } else {
          subPath = "/messages/";
        }
        endpoint.pathname += subPath;

        if (options.debug) {
          endpoint.searchParams.append("debug", "true");
        }

        const headers = this.createHeaders();
        if (message.headers) {
          for (const headerName of Object.keys(message.headers)) {
            headers.set(headerName, message.headers[headerName]);
          }
        }

        if (pushHandle) {
          // TODO: Validation?
          if (message.platform === "browser") {
            const browserHandle = pushHandle as BrowserPushChannel;
            headers.set("ServiceBusNotification-DeviceHandle", browserHandle.endpoint);
            headers.set("Auth", browserHandle.auth);
            headers.set("P256DH", browserHandle.p256dh);
          } else {
            headers.set("ServiceBusNotification-DeviceHandle", pushHandle as string);
          }
        }

        if (scheduledTime) {
          headers.set("ServiceBusNotification-ScheduleTime", scheduledTime.toISOString());
        }

        headers.set("Content-Type", message.contentType);
        headers.set("ServiceBusNotification-Format", message.platform);

        if (tags) {
          let tagExpression = null;
          if (Array.isArray(tags)) {
            tagExpression = tags.join("||");
          } else {
            tagExpression = tags;
          }
          headers.set("ServiceBusNotification-Tags", tagExpression);
        }

        const request = this.createRequest(endpoint, "POST", headers, updatedOptions);

        request.body = message.body;

        const response = await this.sendRequest(request);
        if (response.status !== 201) {
          // TODO: throw special errors
          throw new Error(`${method} failed with ${response.status}`);
        }

        return this.parseNotificationResponse(response);
      }
    );
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
