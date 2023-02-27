// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as constants from "./utils/constants.js";
import {
  createTokenProviderFromConnection,
  parseNotificationHubsConnectionString,
} from "./auth/connectionStringUtils.js";
import type { WebPushClientContext } from "./publicTypes.js";

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
  const baseUrl = parsedConnection.endpoint;
  const sasTokenProvider = createTokenProviderFromConnection(
    parsedConnection.sharedAccessKey,
    parsedConnection.sharedAccessKeyName
  );

  if (clientContext && baseUrl === clientContext.baseUrl && hubName === clientContext.hubName) {
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
    // Node doesn't allow change in protocol but browsers do, so doing a string replace
    const url = new URL(baseUrl.replace("sb://", "https://"));
    url.pathname = hubName;
    url.searchParams.set("api-version", API_VERSION);

    return url;
  }

  clientContext = {
    hubName,
    baseUrl,
    createHeaders,
    requestUrl,
  };

  return clientContext;
}
