// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface WebPushNotification extends Notification {
  clickAction?: string;
}

export type WebPushNotificationHandler = (value: WebPushNotification) => void;

export type WebPushUnsubscribe = () => void;
