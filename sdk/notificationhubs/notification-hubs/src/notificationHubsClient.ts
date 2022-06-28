// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  HttpHeaders,
  HttpMethods,
  PipelineRequest,
  PipelineResponse,
  createHttpHeaders,
  createPipelineRequest,
  RestError,
} from "@azure/core-rest-pipeline";
import { OperationOptions, ServiceClient } from "@azure/core-client";
import { registrationDescriptionParser, registrationDescriptionSerializer } from "./serializers/registrationSerializer";
import {
  createTokenProviderFromConnection,
  parseNotificationHubsConnectionString,
} from "./utils/connectionStringUtils";
import { SasTokenProvider } from "@azure/core-amqp";
import { tracingClient } from "./utils/tracing";
import { Installation, InstallationPatch, PushHandle, BrowserPushChannel } from "./models/installation";
import { NotificationHubMessage } from "./models/message";
import { EntityOperationOptions, NotificationHubsClientOptions, RegistrationQueryLimitOptions, RegistrationQueryOptions, SendOperationOptions } from "./models/options";
import { NotificationHubMessageResponse, NotificationHubResponse, RegistrationQueryResponse } from "./models/response";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { RegistrationDescription } from "./models/registration";
import { parseNotificationDetails } from "./serializers/notificationDetailsSerializer";
import { NotificationDetails } from "./models/notificationDetails";

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
          throw new RestError(
            `deleteInstallation failed with ${response.status}`,
            {
              statusCode: response.status,
              response: response
            });
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
          throw new RestError(
            `getInstallation failed with ${response.status}`,
            {
              statusCode: response.status,
              response: response
            });
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
          throw new RestError(
            `createOrUpdateInstallation failed with ${response.status}`,
            {
              statusCode: response.status,
              response: response
            });
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
          throw new RestError(
            `patchInstallation failed with ${response.status}`,
            {
              statusCode: response.status,
              response: response
            });
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
          throw new RestError(
            `getFeedbackContainerURL failed with ${response.status}`,
            {
              statusCode: response.status,
              response: response
            });
        }

        return response.bodyAsText!;
      }
    );
  }

  /**
   * Creates a new registration ID.
   * @param options - The options for creating a new registration ID.
   * @returns The newly created registration ID.
   */
  public async createRegistrationId(options: OperationOptions = {}): Promise<string> {
    return tracingClient.withSpan(
      "NotificationHubsClient-createRegistrationId",
      options,
      async (updatedOptions) => {
        const endpoint = this.getBaseURL();
        endpoint.pathname += "/registrationIDs";

        const headers = this.createHeaders();
        headers.set("Content-Type", "application/xml;type=entry;charset=utf-8");

        const request = this.createRequest(endpoint, "POST", headers, updatedOptions);
        const response = await this.sendRequest(request);
        if (response.status !== 201) {
          throw new RestError(
            `createRegistrationId failed with ${response.status}`,
            {
              statusCode: response.status,
              response: response
            });
        }

        // In the form: https://{namespace}.servicebus.windows.net/{NotificationHub}/registrations/<registrationId>
        const locationHeader = response.headers.get("Location");
        const locationUrl = new URL(locationHeader!);
        const registrationId = locationUrl.pathname.split("/")[3];

        return registrationId;
      });
  }

  /**
   * Gets a registration by the given registration ID.
   * @param registrationId - The ID of the registration to get.
   * @param options - The options for getting a registration by ID.
   * @returns A RegistrationDescription that has the given registration ID.
   */
  public async getRegistrationById(
    registrationId: string,
    options: OperationOptions = {}
  ): Promise<RegistrationDescription> {
    return tracingClient.withSpan(
      "NotificationHubsClient-getRegistrationById",
      options,
      async (updatedOptions) => {
        const endpoint = this.getBaseURL();
        endpoint.pathname += `/registrations/${registrationId}`;

        const headers = this.createHeaders();
        headers.set("Content-Type", "application/xml;type=entry;charset=utf-8");

        const request = this.createRequest(endpoint, "GET", headers, updatedOptions);
        const response = await this.sendRequest(request);
        if (response.status !== 200) {
          throw new RestError(
            `getRegistrationById failed with ${response.status}`,
            {
              statusCode: response.status,
              response: response
            });
        }

        return registrationDescriptionParser.parseRegistrationEntry(response.bodyAsText!);
      });
  }

  /**
   * Deletes a registration with the given registration ID.
   * @param registrationId - The registration ID of the registration to delete.
   * @param options - The options for delete operations including the ETag
   * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
   */
  public deleteRegistrationById(
    registrationId: string,
    options: EntityOperationOptions = {}
  ): Promise<NotificationHubResponse> {
    return tracingClient.withSpan(
      "NotificationHubsClient-deleteRegistrationById",
      options,
      async (updatedOptions) => {
        const endpoint = this.getBaseURL();
        endpoint.pathname += `/registrations/${registrationId}`;

        const headers = this.createHeaders();
        headers.set("Content-Type", "application/atom+xml;type=entry;charset=utf-8");
        headers.set("If-Match", options.eTag ?? "*");

        const request = this.createRequest(endpoint, "GET", headers, updatedOptions);
        const response = await this.sendRequest(request);
        if (response.status !== 200) {
          throw new RestError(
            `deleteRegistrationById failed with ${response.status}`,
            {
              statusCode: response.status,
              response: response
            });
        }

        return this.parseNotificationResponse(response);
      });
  }

  /**
   * Creates a new registration. This method generates a registration ID, 
   * which you can subsequently use to retrieve, update, and delete this registration.
   * @param registration - The registration to create.
   * @param options - Options for creating a new registration.
   * @returns The newly created registration description.
   */
  public async createRegistration(
    registration: RegistrationDescription,
    options: OperationOptions = {}
  ): Promise<RegistrationDescription> {
    return tracingClient.withSpan(
      "NotificationHubsClient-createRegistration",
      options,
      async (updatedOptions) => {
        if (registration.registrationId) {
          throw new RestError("registrationId must not be set during a create operation", { statusCode: 400 });
        }

        return this.createOrUpdateRegistrationDescription(
          registration,
          "create",
          "*",
          updatedOptions
        );
      });
  }

  /**
   * Creates or updates a registration.
   * @param registration - The registration to create or update.
   * @param options - The operation options.
   * @returns The created or updated registration description.
   */
  public async createOrUpdateRegistration(
    registration: RegistrationDescription,
    options: OperationOptions = {}
  ): Promise<RegistrationDescription> {
    return tracingClient.withSpan(
      "NotificationHubsClient-createOrUpdateRegistration",
      options,
      async (updatedOptions) => {
        return this.createOrUpdateRegistrationDescription(
          registration,
          "createOrUpdate",
          "*",
          updatedOptions
        );
      });
  }

  /**
   * Updates an existing registration.
   * @param registration - The registration to update.
   * @param options - The operation options.
   * @returns The updated registration description.
   */
  public async updateRegistration(
    registration: RegistrationDescription,
    options: OperationOptions = {}
  ): Promise<RegistrationDescription> {
    return tracingClient.withSpan(
      "NotificationHubsClient-updateRegistration",
      options,
      async (updatedOptions) => {
        if (!registration.eTag) {
          throw new RestError("ETag is required for registration update", { statusCode: 400 });
        }
        return this.createOrUpdateRegistrationDescription(
          registration,
          "update",
          `"${registration.eTag}"`,
          updatedOptions
        );
      });
  }

  private async createOrUpdateRegistrationDescription(
    registration: RegistrationDescription,
    operationName: "create" | "createOrUpdate" | "update",
    eTag: string,
    options: OperationOptions,
  ): Promise<RegistrationDescription> {
    const endpoint = this.getBaseURL();
    endpoint.pathname += "/registrations";
    let httpMethod: HttpMethods = "POST";

    if (operationName === "createOrUpdate" || operationName === "update") {
      endpoint.pathname += `/${registration.registrationId}`;
      httpMethod = "PUT";
    }

    // Clear out readonly properties
    registration.registrationId = undefined;
    registration.eTag = undefined;

    const headers = this.createHeaders();
    headers.set("Content-Type", "application/atom+xml;type=entry;charset=utf-8");
    headers.set("If-Match", eTag);

    const request = this.createRequest(endpoint, httpMethod, headers, options);
    request.body = registrationDescriptionSerializer.serializeRegistrationDescription(registration);
    const response = await this.sendRequest(request);
    if (response.status !== 200 && response.status !== 201) {
      throw new RestError(
        `${operationName}Registration failed with ${response.status}`,
        {
          statusCode: response.status,
          response: response
        });
    }

    return registrationDescriptionParser.parseRegistrationEntry(response.bodyAsText!);
  }

  /**
   * Gets all registrations for the notification hub with the given query options.
   * @param options - The options for querying the registrations such as $top and $filter.
   * @returns A paged async iterable containing all of the registrations for the notification hub.
   */
  public listRegistrations(
    options: RegistrationQueryOptions = {}
  ): PagedAsyncIterableIterator<RegistrationDescription> {
    const { span, updatedOptions } = tracingClient.startSpan("NotificationHubsClient-listRegistrations", options);
    try {
      const iter = this.listRegistrationsAll(updatedOptions);
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: () => {
          return this.listRegistrationPagingPage(options);
        }
      };
    } catch (e: any) {
      span.setStatus({ status: "error", error: e });
      throw e;
    } finally {
      span.end();
    }
  }

  private async *listRegistrationsAll(
    options: RegistrationQueryOptions
  ): AsyncIterableIterator<RegistrationDescription> {
    for await (const page of this.listRegistrationPagingPage(options)) {
      yield* page;
    }
  }

  private async *listRegistrationPagingPage(
    options: RegistrationQueryOptions
  ): AsyncIterableIterator<RegistrationDescription[]> {
    let result = await this._listRegistrations(options);
    yield result.registrations || [];
    let continuationToken = result.continuationToken;
    while (continuationToken) {
      result = await this._listRegistrations(options, continuationToken);
      continuationToken = result.continuationToken;
      yield result.registrations || [];
    }
  }

  private async _listRegistrations(
    options: RegistrationQueryOptions, 
    continuationToken?: string
  ): Promise<RegistrationQueryResponse> {
    const endpoint = this.getBaseURL();
    endpoint.pathname += "/registrations";
    if (options.top !== undefined) {
      endpoint.searchParams.set("$top", `${options.top}`);
    }

    if (options.filter !== undefined) {
      endpoint.searchParams.set("$filter", options.filter);
    }

    if (continuationToken !== undefined) {
      endpoint.searchParams.set("continuationtoken", continuationToken);
    }

    const headers = this.createHeaders();

    const request = this.createRequest(endpoint, "GET", headers, options);
    const response = await this.sendRequest(request);
    if (response.status !== 200) {
      throw new RestError(
        `listRegistrations failed with ${response.status}`,
        {
          statusCode: response.status,
          response: response
        });
    }

    const registrations = await registrationDescriptionParser.parseRegistrationFeed(response.bodyAsText!);
    const nextToken = response.headers.get("x-ms-continuationtoken");
    return {
      registrations,
      continuationToken: nextToken
    };
  }

  /**
   * Lists all registrations with the matching tag.
   * @param tag - The tag to query for matching registrations.
   * @param options - The query options such as $top.
   * @returns A paged async iterable containing the matching registrations for the notification hub.
   */
  public listRegistrationsByTag(
    tag: string,
    options: RegistrationQueryLimitOptions
  ): PagedAsyncIterableIterator<RegistrationDescription> {
    const { span, updatedOptions } = tracingClient.startSpan("NotificationHubsClient-listRegistrationsByTag", options);
    try {
      const iter = this.listRegistrationsByTagAll(tag, updatedOptions);
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: () => {
          return this.listRegistrationsByTagPagingPage(tag, options);
        }
      };
    } catch (e: any) {
      span.setStatus({ status: "error", error: e });
      throw e;
    } finally {
      span.end();
    }
  }

  private async *listRegistrationsByTagAll(
    tag: string,
    options: RegistrationQueryLimitOptions
  ): AsyncIterableIterator<RegistrationDescription> {
    for await (const page of this.listRegistrationsByTagPagingPage(tag, options)) {
      yield* page;
    }
  }

  private async *listRegistrationsByTagPagingPage(
    tag: string,
    options: RegistrationQueryLimitOptions
  ): AsyncIterableIterator<RegistrationDescription[]> {
    let result = await this._listRegistrationsByTag(tag, options);
    yield result.registrations || [];
    let continuationToken = result.continuationToken;
    while (continuationToken) {
      result = await this._listRegistrationsByTag(tag, options, continuationToken);
      continuationToken = result.continuationToken;
      yield result.registrations || [];
    }
  }

  private async _listRegistrationsByTag(
    tag: string,
    options: RegistrationQueryLimitOptions, 
    continuationToken?: string
  ): Promise<RegistrationQueryResponse> {
    const endpoint = this.getBaseURL();
    endpoint.pathname += `/tags/${tag}/registrations`;
    if (options.top !== undefined) {
      endpoint.searchParams.set("$top", `${options.top}`);
    }

    if (continuationToken !== undefined) {
      endpoint.searchParams.set("continuationtoken", continuationToken);
    }

    const headers = this.createHeaders();

    const request = this.createRequest(endpoint, "GET", headers, options);
    const response = await this.sendRequest(request);
    if (response.status !== 200) {
      throw new RestError(
        `listRegistrations failed with ${response.status}`,
        {
          statusCode: response.status,
          response: response
        });
    }

    const registrations = await registrationDescriptionParser.parseRegistrationFeed(response.bodyAsText!);
    const nextToken = response.headers.get("x-ms-continuationtoken");
    return {
      registrations,
      continuationToken: nextToken
    };
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
    return this.sendNotificationMessage(
      message,
      "sendDirectNotification",
      pushHandle,
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
    return this.sendNotificationMessage(
      message,
      "sendNotification",
      undefined,
      tags,
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
    options: OperationOptions = {}
  ): Promise<NotificationHubMessageResponse> {
    return tracingClient.withSpan(
      "NotificationHubsClient-$scheduleNotification",
      options,
      async (updatedOptions) => {
        const endpoint = this.getBaseURL();
        endpoint.pathname += "/schedulednotifications/";

        const headers = this.createHeaders();
        if (message.headers) {
          for (const headerName of Object.keys(message.headers)) {
            headers.set(headerName, message.headers[headerName]);
          }
        }

        headers.set("ServiceBusNotification-ScheduleTime", scheduledTime.toISOString());
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
          throw new RestError(
            `scheduleNotification failed with ${response.status}`,
            {
              statusCode: response.status,
              response: response
            });
        }

        return this.parseNotificationSendResponse(response);
      });
  }

  /**
   * Cancels the scheduled notification with the given notification ID.
   * @param notificationId - The notification ID from the scheduled notification.
   * @param options - The operation options.
   * @returns A notification hub response with correlation ID and tracking ID.
   */
  public async cancelScheduledNotification(
    notificationId: string,
    options: OperationOptions = {}
  ): Promise<NotificationHubResponse> {
    return tracingClient.withSpan(
      "NotificationHubsClient-cancelScheduledNotification",
      options,
      async (updatedOptions) => {
        const endpoint = this.getBaseURL();
        endpoint.pathname += `/schedulednotifications/${notificationId}`;

        const headers = this.createHeaders();
        const request = this.createRequest(endpoint, "DELETE", headers, updatedOptions);

        const response = await this.sendRequest(request);
        if (response.status !== 200) {
          throw new RestError(
            `cancelScheduledNotification failed with ${response.status}`,
            {
              statusCode: response.status,
              response: response
            });
        }

        return this.parseNotificationSendResponse(response);
      });
  }

  private sendNotificationMessage(
    message: NotificationHubMessage,
    method: string,
    pushHandle?: PushHandle,
    tags?: string | string[],
    options: SendOperationOptions = {}
  ): Promise<NotificationHubMessageResponse> {
    return tracingClient.withSpan(
      `NotificationHubsClient-${method}`,
      options,
      async (updatedOptions) => {
        const endpoint = this.getBaseURL();
        endpoint.pathname += "/messages/";;

        if (options.enableTestSend) {
          endpoint.searchParams.append("debug", "true");
        }

        const headers = this.createHeaders();
        if (message.headers) {
          for (const headerName of Object.keys(message.headers)) {
            headers.set(headerName, message.headers[headerName]);
          }
        }

        if (pushHandle) {
          endpoint.searchParams.append("direct", "true");

          if (message.platform === "browser") {
            const browserHandle = pushHandle as BrowserPushChannel;
            headers.set("ServiceBusNotification-DeviceHandle", browserHandle.endpoint);
            headers.set("Auth", browserHandle.auth);
            headers.set("P256DH", browserHandle.p256dh);
          } else {
            headers.set("ServiceBusNotification-DeviceHandle", pushHandle as string);
          }
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
          throw new RestError(
            `${method} failed with ${response.status}`,
            {
              statusCode: response.status,
              response: response
            });
        }

        return this.parseNotificationSendResponse(response);
      }
    );
  }

  /**
   * Retrieves the results of a send operation. This can retrieve intermediate results if the send is being processed 
   * or final results if the Send* has completed. This API can only be called for Standard SKU and above.
   * @param notificationId - The notification ID returned from the send operation.
   * @param options - The operation options.
   * @returns The results of the send operation.
   */
  public async getNotificationOutcomeDetails(
    notificationId: string,
    options: OperationOptions = {},
  ): Promise<NotificationDetails> {
    return tracingClient.withSpan(
      "getNotificationOutcomeDetails-NotificationHubsClient",
      options,
      async (updatedOptions) => {
        const endpoint = this.getBaseURL();
        endpoint.pathname += `/messages/${notificationId}`;

        const headers = this.createHeaders();
        const request = this.createRequest(endpoint, "GET", headers, updatedOptions);

        const response = await this.sendRequest(request);
        if (response.status !== 200) {
          throw new RestError(
            `getNotificationOutcomeDetails failed with ${response.status}`,
            {
              statusCode: response.status,
              response: response
            });
        }

        return parseNotificationDetails(response.bodyAsText!);
      });
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

  private parseNotificationSendResponse(response: PipelineResponse): NotificationHubMessageResponse {
    const result = this.parseNotificationResponse(response);
    let notificationId: string | undefined;
    if (result.location) {
      const locationUrl = new URL(result.location);
      notificationId = locationUrl.pathname.split("/")[3];
    }

    return {
      ...result,
      notificationId
    }
  }

  private getBaseURL(): URL {
    // Node doesn't allow change in protocol but browsers do, so doing a string replace
    const url = new URL(this._baseUrl.replace("sb://", "https://"));
    url.pathname = this._hubName;
    url.searchParams.set("api-version", API_VERSION);

    return url;
  }
}
