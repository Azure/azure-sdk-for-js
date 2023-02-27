// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.


import type { 
  WebPushClientContext, 
  WebPushNotificationHandler, 
  WebPushUnsubscribe 
} from "../publicTypes.js";
import { WebPushError } from "../errors.js";

/**
 * Sets the handler to call when a push notification is received.
 * @param clientContext - The client context.
 * @param handler - the handler to call when a push notification is received.
 * @returns A subscription that can be used to unsubscribe from push notifications.
 */
export function onPush(
  clientContext: WebPushClientContext,
  handler: WebPushNotificationHandler,
): WebPushUnsubscribe {
  if (!clientContext) {
    throw new WebPushError("clientContext is not properly initilized");
  }

  clientContext.onPush = handler;

  return () => {
    clientContext.onPush = undefined;
  };
}
