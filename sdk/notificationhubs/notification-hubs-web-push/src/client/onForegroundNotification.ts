// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="dom" />

import { WebPushClientContext, WebPushNotificationHandler, WebPushUnsubscribe } from "../publicTypes.js";

export function onForegroundNotification(
  clientContext: WebPushClientContext,
  notificationHandler: WebPushNotificationHandler
): WebPushUnsubscribe {

  clientContext.onBackgroundMessage = notificationHandler;

  return () => {
    clientContext.onBackgroundMessage = undefined;
  };
}
