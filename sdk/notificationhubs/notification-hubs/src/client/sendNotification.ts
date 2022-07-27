// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Notification } from "../models/notification.js";
import { NotificationHubsClientContext } from "./index.js";
import { NotificationHubsMessageResponse } from "../models/response.js";
import { SendOperationOptions } from "../models/options.js";
import { sendNotificationPayload } from "./internal/_sendNotificationPayload.js";

/**
 * Sends push notifications to devices that match the given tags or tag expression.
 * @param context - The Notification Hubs client.
 * @param tags - The tags used to target the device for push notifications in either an array or tag expression.
 * @param notification - The notification to send to the matching devices.
 * @param options - Configuration options for the direct send operation which can contain custom headers
 * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function sendNotification(
  context: NotificationHubsClientContext,
  tags: string[] | string,
  notification: Notification,
  options: SendOperationOptions = {}
): Promise<NotificationHubsMessageResponse> {
  return sendNotificationPayload(
    context,
    notification,
    "sendNotification",
    undefined,
    tags,
    options
  );
}
