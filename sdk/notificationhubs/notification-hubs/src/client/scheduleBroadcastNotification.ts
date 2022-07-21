// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Notification } from "../models/notification";
import { NotificationHubsClient } from "./client";
import { NotificationHubMessageResponse } from "../models/response";
import { OperationOptions } from "@azure/core-client";
import { scheduleNotificationPayload } from "./_scheduleNotificationPayload";

/**
 * Schedules a push notification to all devices registered on the Notification Hub.
 * NOTE: This is only available in Standard SKU Azure Notification Hubs.
 * @param client - The Notification Hubs client.
 * @param scheduledTime - The Date to send the push notification.
 * @param notification - The notification to send to the matching devices.
 * @param options - Configuration options for the direct send operation which can contain custom headers
 * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function scheduleBroadcastNotification(
  client: NotificationHubsClient,
  scheduledTime: Date,
  notification: Notification,
  options: OperationOptions = {}
): Promise<NotificationHubMessageResponse> {
  return scheduleNotificationPayload(client, scheduledTime, undefined, notification, options);
}
