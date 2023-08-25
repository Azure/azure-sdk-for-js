// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Represents an access token for a SAS Credential.
 */
export interface AccessToken {
  /**
   * The SAS Token.
   */
  token: string;

  /**
   * The expiration time of the token.
   */
  expiresOnTimestamp: number;
}

/**
 * Represents a token credential.
 */
export interface TokenCredential {
  /**
   * Gets the token for the specified audience.
   * @param audience - The audience for which the token is desired.
   */
  getToken(audience: string): Promise<AccessToken | null>;
}

/**
 * The options for creating a Web Push client context.
 */
export interface WebPushClientContextOptions {
  /**
   * The Notification Hubs API version.
   */
  apiVersion?: string;
}

/**
 * Represents the Web Push client context.
 */
export interface WebPushClientContext {
  /**
   * @internal
   * The Notification Hubs namespace URL.
   */
  namespaceUrl: string;
  /**
   * The Notification Hubs hub name.
   * @internal
   */
  hubName: string;

  /**
   * The Notification Hubs API version.
   * @internal
   */
  apiVersion: string;

  /**
   * The Notification Hubs token credential.
   * @internal
   */
  tokenCredential: TokenCredential;

  /**
   * @internal
   * The Web Push Application ID.
   */
  applicationId: string;
  /**
   * The ServiceWorkerRegistration for the Web Push.
   */
  serviceWorkerRegistration?: ServiceWorkerRegistration;

  /**
   * The VAPID public key for the Web Push instance.
   */
  vapidPublicKey?: string;

  /**
   * The ServiceWorker URL for the Web Push instance.
   */
  serviceWorkerUrl?: string;

  /**
   * @internal
   * The Web Push notification handler.
   */
  onPush?: WebPushNotificationHandler;

  /**
   * @internal
   * The Web Push notification click handler.
   */
  onNotificationClick?: NotificationClickHandler;
}

/**
 * Represents a Notification Hubs Web Push handler.
 */
export type WebPushNotificationHandler = (value: unknown) => Promise<void>;

/**
 * Represents a Notification click handler.
 */
export type NotificationClickHandler = (value: WebPushNotificationClickEvent) => Promise<void>;

/**
 * Represents a Web Push unsubscribe function.
 */
export type WebPushUnsubscribe = () => void;

/**
 * Represents the Web Push channel.
 */
export interface WebPushChannel {
  /**
   * The endpoint for the Web Push channel.
   */
  endpoint: string;
  /**
   * The auth secret for the Web Push channel.
   */
  auth: string;
  /**
   * The P256DH secret for the Web Push channel.
   */
  p256dh: string;

  /**
   * The VAPID public key for the Web Push channel.
   */
  vapidPublicKey?: string;
}

/**
 * Represents the Web Push installation.
 */
export interface WebPushInstallation {
  /**
   * The installation ID for the Web Push installation.
   */
  installationId: string;
  /**
   * The push channel for the Web Push installation.
   */
  pushChannel: WebPushChannel;
}

/**
 * Represents the options for getting or creating a Web Push installation.
 */
export interface GetInstallationOptions {
  /**
   * The ServiceWorker URL for the Web Push instance.
   */
  readonly serviceWorkerUrl?: string;
  /**
   * The service worker registration.
   */
  readonly serviceWorkerRegistration?: ServiceWorkerRegistration;
}

/**
 * Represents a response from the Notification Hubs Service.
 */
export interface NotificationHubResponse {
  /**
   * The Notification Hubs tracking ID
   */
  readonly trackingId?: string;
  /**
   * The Notification Hubs correlation ID
   */
  readonly correlationId?: string;

  /**
   * The notification hubs location header.
   */
  readonly location?: string;
}

/**
 * Represents a notification click event.
 */
export interface WebPushNotificationClickEvent {
  /**
   * The action that was clicked.
   */
  readonly action: string;
  /**
   * The notification that was clicked.
   */
  readonly notification: Notification;
}

/**
 * Represents a JSON Patch Operation
 */
export interface JsonPatch {
  /**
   * The operation to perform.
   */
  op: "add" | "remove" | "replace";
  /**
   * The path to perform the operation on.
   */
  path: string;
  /**
   * The value to use for the operation.
   */
  value?: string;
}
