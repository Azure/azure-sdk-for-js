// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as constants from "./utils/constants.js";
import {
  createTokenProviderFromConnection,
  parseNotificationHubsConnectionString,
} from "./auth/connectionStringUtils.js";
import type {
  JsonPatch,
  NotificationHubResponse,
  WebPushClientContext,
  WebPushInstallation,
} from "./publicTypes.js";
import { WebPushError } from "./errors.js";

const API_VERSION = "2020-06";

let clientContext: WebPushClientContext | undefined;

/**
 * @internal
 */
export function _getClientContextInstance(): WebPushClientContext | undefined {
  return clientContext;
}

/**
 * Creates a new instance of the Notification Hubs Web Push client context.
 * @param connectionString - The Azure Notification Hubs connection string.
 * @param hubName - The Azure Notification Hubs hub name.
 * @returns The created client context.
 */
export function createClientContext(
  connectionString: string,
  hubName: string
): WebPushClientContext {
  const parsedConnection = parseNotificationHubsConnectionString(connectionString);
  const baseUrl = parsedConnection.endpoint.replace("sb://", "https://");
  const sasTokenProvider = createTokenProviderFromConnection(
    parsedConnection.sharedAccessKey,
    parsedConnection.sharedAccessKeyName
  );

  const applicationUrl = new URL(baseUrl);
  applicationUrl.pathname += `/${hubName}`;
  const applicationId = applicationUrl.toString();

  if (clientContext && applicationId === clientContext.applicationId) {
    return clientContext;
  }

  async function createHeaders(operationName: string): Promise<Headers> {
    const authorization = await sasTokenProvider.getToken(baseUrl);
    const headers = new Headers();
    headers.set("Authorization", authorization.token);
    headers.set("x-ms-version", API_VERSION);
    headers.set(
      "x-ms-azsdk-telemetry",
      `class=NotificationHubsServiceClient;method=${operationName}`
    );
    headers.set(
      "User-Agent",
      `azsdk-js-messaging-notificationhubs-web-push/${constants.SDK_VERSION}`
    );

    return headers;
  }

  function requestUrl(): URL {
    const url = new URL(baseUrl);
    url.pathname = hubName;
    url.searchParams.set("api-version", API_VERSION);

    return url;
  }

  async function installationRequest(
    installationId: string,
    method: string,
    body?: BodyInit
  ): Promise<NotificationHubResponse> {
    const operation = `${method.toLowerCase()}Installation`;
    const url = requestUrl();
    url.pathname += `/installations/${installationId}`;

    const headers = await createHeaders(operation);
    const response = await fetch(url, {
      body,
      headers,
      method,
    });

    return handleResponse(response, operation);
  }

  function handleResponse(response: Response, operation: string): NotificationHubResponse {
    const trackingId = response.headers.get("trackingid") || undefined;
    const correlationId = response.headers.get("x-ms-correlation-request-id") || undefined;
    const location = response.headers.get("location") || undefined;
    if (!response.ok) {
      throw new WebPushError(`${operation} failed with status ${response.status}`, {
        status: response.status,
        trackingId,
        correlationId,
      });
    }

    return {
      trackingId,
      correlationId,
      location,
    };
  }

  async function createOrUpdateInstallation(
    installation: WebPushInstallation
  ): Promise<NotificationHubResponse> {
    const installationToSave = {
      installationId: installation.installationId,
      platform: "browser",
      pushChannel: {
        endpoint: installation.pushChannel.endpoint,
        p256dh: installation.pushChannel.p256dh,
        auth: installation.pushChannel.auth,
      },
    };
    return installationRequest(
      installation.installationId,
      "PUT",
      JSON.stringify(installationToSave)
    );
  }

  async function deleteInstallation(installationId: string): Promise<NotificationHubResponse> {
    return installationRequest(installationId, "DELETE");
  }

  async function updateInstallation(
    installationId: string,
    updates: JsonPatch[]
  ): Promise<NotificationHubResponse> {
    return installationRequest(installationId, "PATCH", JSON.stringify(updates));
  }

  clientContext = {
    applicationId,
    lifecycle: {
      createOrUpdateInstallation,
      deleteInstallation,
      updateInstallation,
    },
  };

  return clientContext;
}
