// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Notification } from "../models/notification";
import { NotificationHubsClient } from "./client";
import { NotificationHubsMessageResponse } from "../models/response";
import { OperationOptions } from "@azure/core-client";
import { scheduleNotificationPayload } from "./_scheduleNotificationPayload";

/**
 * Schedules a push notification to devices that match the given tags or tag expression at the specified time.
 * NOTE: This is only available in Standard SKU Azure Notification Hubs.
 * @param client - The Notification Hubs client.
 * @param scheduledTime - The Date to send the push notification.
 * @param tags - The tags used to target the device for push notifications in either an array or tag expression.
 * @param notification - The notification to send to the matching devices.
 * @param options - Configuration options for the direct send operation which can contain custom headers
 * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function scheduleNotification(
  client: NotificationHubsClient,
  scheduledTime: Date,
  tags: string[] | string,
  notification: Notification,
  options: OperationOptions = {}
): Promise<NotificationHubsMessageResponse> {
  return scheduleNotificationPayload(client, scheduledTime, tags, notification, options);
}
