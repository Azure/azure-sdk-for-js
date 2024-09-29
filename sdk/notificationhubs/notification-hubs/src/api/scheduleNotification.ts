// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Notification } from "../models/notification.js";
import { NotificationHubsClientContext } from "./index.js";
import { NotificationHubsMessageResponse } from "../models/notificationDetails.js";
import { ScheduleNotificationOptions } from "../models/options.js";
import { scheduleNotificationInternal } from "./internal/_scheduleNotification.js";

/**
 * Schedules a push notification to devices that match the given tags or tag expression at the specified time.
 * NOTE: This is only available in Standard SKU Azure Notification Hubs.
 * @param context - The Notification Hubs client.
 * @param scheduledTime - The Date to send the push notification.
 * @param notification - The notification to send to the matching devices.
 * @param options - Options which include tags used to target the device for push notifications in either an array or tag expression.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function scheduleNotification(
  context: NotificationHubsClientContext,
  scheduledTime: Date,
  notification: Notification,
  options: ScheduleNotificationOptions,
): Promise<NotificationHubsMessageResponse> {
  return scheduleNotificationInternal(
    context,
    scheduledTime,
    notification,
    options,
    "scheduleNotification",
    options.tagExpression,
  );
}
