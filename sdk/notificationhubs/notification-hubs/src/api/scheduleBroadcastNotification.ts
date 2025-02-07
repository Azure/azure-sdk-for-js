// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Notification } from "../models/notification.js";
import type { NotificationHubsClientContext } from "./index.js";
import type { NotificationHubsMessageResponse } from "../models/notificationDetails.js";
import type { OperationOptions } from "@azure-rest/core-client";
import { scheduleNotificationInternal } from "./internal/_scheduleNotification.js";

/**
 * Schedules a push notification to all registered devices.
 * NOTE: This is only available in Standard SKU Azure Notification Hubs.
 * @param context - The Notification Hubs client.
 * @param scheduledTime - The Date to send the push notification.
 * @param notification - The notification to send to the matching devices.
 * @param options - Operation options.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function scheduleBroadcastNotification(
  context: NotificationHubsClientContext,
  scheduledTime: Date,
  notification: Notification,
  options: OperationOptions = {},
): Promise<NotificationHubsMessageResponse> {
  return scheduleNotificationInternal(
    context,
    scheduledTime,
    notification,
    options,
    "scheduleBroadcastNotification",
  );
}
