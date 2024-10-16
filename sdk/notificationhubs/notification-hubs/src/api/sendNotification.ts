// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DirectSendNotificationOptions, SendNotificationOptions } from "../models/options.js";
import { Notification } from "../models/notification.js";
import { NotificationHubsClientContext } from "./index.js";
import { NotificationHubsMessageResponse } from "../models/notificationDetails.js";
import { sendNotificationInternal } from "./internal/_sendNotification.js";

/**
 * Sends push notifications to devices that match the given tags or tag expression.
 * @param context - The Notification Hubs client.
 * @param notification - The notification to send to the matching devices.
 * @param options - Options for the notification including tags, device handles and whether to enable test send.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function sendNotification(
  context: NotificationHubsClientContext,
  notification: Notification,
  options: DirectSendNotificationOptions | SendNotificationOptions,
): Promise<NotificationHubsMessageResponse> {
  return sendNotificationInternal(context, notification, options);
}
