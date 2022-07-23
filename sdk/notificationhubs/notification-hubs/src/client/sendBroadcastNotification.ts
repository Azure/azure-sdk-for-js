// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Notification } from "../models/notification.js";
import { NotificationHubsClient } from "./index.js";
import { NotificationHubsMessageResponse } from "../models/response.js";
import { SendOperationOptions } from "../models/options.js";
import { sendNotificationPayload } from "./internal/_sendNotificationPayload.js";

/**
 * Sends push notifications to all devices on the Notification Hub.
 * @param client - The Notification Hubs client.
 * @param notification - The notification to send to all devices.
 * @param options - Configuration options for the direct send operation which can contain custom headers
 * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function sendBroadcastNotification(
  client: NotificationHubsClient,
  notification: Notification,
  options: SendOperationOptions = {}
): Promise<NotificationHubsMessageResponse> {
  return sendNotificationPayload(
    client,
    notification,
    "sendNotification",
    undefined,
    undefined,
    options
  );
}
