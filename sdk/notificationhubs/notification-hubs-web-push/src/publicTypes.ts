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

export interface WebPushNotification extends Notification {
  clickAction?: string;
}

export type WebPushNotificationHandler = (value: WebPushNotification) => void;

export type WebPushUnsubscribe = () => void;
