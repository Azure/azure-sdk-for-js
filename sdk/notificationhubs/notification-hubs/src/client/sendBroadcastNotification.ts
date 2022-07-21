// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Notification } from "../models/notification";
import { NotificationHubsClient } from "./client";
import { NotificationHubsMessageResponse } from "../models/response";
import { SendOperationOptions } from "../models/options";
import { sendNotificationPayload } from "./_sendNotificationPayload";

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
