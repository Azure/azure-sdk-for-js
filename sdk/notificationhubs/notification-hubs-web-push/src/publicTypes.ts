// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
   * The ServiceWorker URL for the Web Push instance.
   */
  serviceWorkerUrl?: string;

  /**
   * @internal
   */
  onPush?: WebPushNotificationHandler;

  /**
   * @internal
   */
  onNotificationClick?: NotificationClickHandler;

  /**
   * @internal
   */
  createHeaders(operationName: string): Promise<Headers>;

  /**
   * @internal
   */
  requestUrl(): URL;
}

/**
 * Represents a Notification Hubs Web Push handler.
 */
export type WebPushNotificationHandler = (value: PushMessageData) => Promise<void>;

/**
 * Represents a Notification click handler.
 */
export type NotificationClickHandler = (value: NotificationEvent) => Promise<void>;

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
  serviceWorkerUrl?: string;
  /**
   * The service worker registration.
   */
  serviceWorkerRegistration?: ServiceWorkerRegistration;
}

/**
 * Represents a response from the Notification Hubs Service.
 */
export interface NotificationHubResponse {
  /**
   * The Notification Hubs tracking ID
   */
  trackingId?: string;
  /**
   * The Notification Hubs correlation ID
   */
  correlationId?: string;
}
