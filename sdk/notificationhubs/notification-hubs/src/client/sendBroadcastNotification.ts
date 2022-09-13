// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Notification } from "../models/notification.js";
import { NotificationHubsClientContext } from "./index.js";
import { NotificationHubsMessageResponse } from "../models/notificationDetails.js";
import { SendOperationOptions } from "../models/options.js";
import { sendNotificationPayload } from "./internal/_sendNotificationPayload.js";

/**
 * Sends push notifications to all devices on the Notification Hub.
 * @param context - The Notification Hubs client.
 * @param notification - The notification to send to all devices.
 * @param options - Configuration options for the direct send operation which can contain custom headers
 * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function sendBroadcastNotification(
  context: NotificationHubsClientContext,
  notification: Notification,
  options: SendOperationOptions = {}
): Promise<NotificationHubsMessageResponse> {
  return sendNotificationPayload(
    context,
    notification,
    "sendNotification",
    undefined,
    undefined,
    options
  );
}
