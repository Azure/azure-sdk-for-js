// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { 
  NotificationClickHandler, 
  WebPushClientContext, 
  WebPushUnsubscribe 
} from "../publicTypes.js";
import { WebPushError } from "../errors.js";

/**
 * Sets the handler to call when a notification has been clicked.
 * @param clientContext - The client context.
 * @param handler - the handler to call when a notification has been clicked.
 * @returns A subscription that can be used to unsubscribe from notification clicks.
 */
export function onNotificationClick(
  clientContext: WebPushClientContext,
  handler: NotificationClickHandler,
): WebPushUnsubscribe {
  if (!clientContext) {
    throw new WebPushError("clientContext is not properly initilized");
  }

  clientContext.onNotificationClick = handler;

  return () => {
    clientContext.onNotificationClick = undefined;
  };
}
