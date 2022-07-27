// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Notification } from "../models/notification.js";
import { NotificationHubsClientContext } from "./index.js";
import { NotificationHubsMessageResponse } from "../models/response.js";
import { OperationOptions } from "@azure/core-client";
import { scheduleNotificationPayload } from "./internal/_scheduleNotificationPayload.js";

/**
 * Schedules a push notification to all devices registered on the Notification Hub.
 * NOTE: This is only available in Standard SKU Azure Notification Hubs.
 * @param context - The Notification Hubs client.
 * @param scheduledTime - The Date to send the push notification.
 * @param notification - The notification to send to the matching devices.
 * @param options - Configuration options for the direct send operation which can contain custom headers
 * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function scheduleBroadcastNotification(
  context: NotificationHubsClientContext,
  scheduledTime: Date,
  notification: Notification,
  options: OperationOptions = {}
): Promise<NotificationHubsMessageResponse> {
  return scheduleNotificationPayload(context, scheduledTime, undefined, notification, options);
}
