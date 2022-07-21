// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Notification } from "../models/notification";
import { NotificationHubsClient } from "./client";
import { NotificationHubsMessageResponse } from "../models/response";
import { PushHandle } from "../models/installation";
import { SendOperationOptions } from "../models/options";
import { sendNotificationPayload } from "./_sendNotificationPayload";

/**
 * Sends a direct push notification to a device with the given push handle.
 * @param client - The Notification Hubs client.
 * @param pushHandle - The push handle which is the unique identifier for the device.
 * @param notification - The notification to send to the device.
 * @param options - Configuration options for the direct send operation which can contain custom headers
 * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function sendDirectNotification(
  client: NotificationHubsClient,
  pushHandle: PushHandle,
  notification: Notification,
  options: SendOperationOptions = {}
): Promise<NotificationHubsMessageResponse> {
  return sendNotificationPayload(
    client,
    notification,
    "sendDirectNotification",
    pushHandle,
    undefined,
    options
  );
}
