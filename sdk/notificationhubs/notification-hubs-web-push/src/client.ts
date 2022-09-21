// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as constants from "./utils/constants.js";
import {
  createTokenProviderFromConnection,
  parseNotificationHubsConnectionString,
} from "./auth/connectionStringUtils.js";
import { WebPushNotificationHandler } from "./publicTypes.js";

const API_VERSION = "2020-06";

/**
 * Represents the Web Push client context.
 */
export interface WebPushClientContext {
  /**
   * The base URL for the Notification Hub namespace.
   */
  readonly baseUrl: string;

  /**
   * The Notification Hub name.
   */
  readonly hubName: string;

  /**
   * The ServiceWorkerRegistration for the Web Push.
   */
  serviceWorkerRegistration?: ServiceWorkerRegistration;

  /**
   * The VAPID public key for the Web Push instance.
   */
  vapidPublicKey?: string;

  /**
   * @internal
   */
  onForegroundMessage?: WebPushNotificationHandler;

  /**
   * @internal
   */
  onBackgroundMessage?: WebPushNotificationHandler;  

  /**
   * @internal
   */
  createHeaders(operationName: string): Promise<Headers>;

  /**
   * @internal
   */
  requestUrl(): URL;
}

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

  return {
    hubName,
    baseUrl,
    createHeaders,
    requestUrl,
  };
}
