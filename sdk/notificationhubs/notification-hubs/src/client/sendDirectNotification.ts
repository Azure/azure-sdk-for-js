// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Notification } from "../models/notification.js";
import { NotificationHubsClientContext } from "./index.js";
import { NotificationHubsMessageResponse } from "../models/notificationDetails.js";
import { OperationOptions } from "@azure/core-client";
import { PushHandle } from "../models/installation.js";
import { sendNotificationPayload } from "./internal/_sendNotificationPayload.js";

/**
 * Sends a direct push notification to a device with the given push handle.
 * @param context - The Notification Hubs client.
 * @param pushHandle - The push handle which is the unique identifier for the device.
 * @param notification - The notification to send to the device.
 * @param options - The options for sending a direct notification.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function sendDirectNotification(
  context: NotificationHubsClientContext,
  pushHandle: PushHandle,
  notification: Notification,
  options: OperationOptions = {}
): Promise<NotificationHubsMessageResponse> {
  return sendNotificationPayload(
    context,
    notification,
    "sendDirectNotification",
    pushHandle,
    undefined,
    options
  );
}
