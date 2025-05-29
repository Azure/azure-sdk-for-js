// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { sendNotificationInternal } from "./internal/_sendNotification.js";
/**
 * Sends push notifications to all devices with a broadcast send.
 * @param context - The Notification Hubs client.
 * @param notification - The notification to send to the matching devices.
 * @param options - Options for the notification including whether to enable test send.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function sendBroadcastNotification(context, notification, options = {}) {
    return sendNotificationInternal(context, notification, options);
}
//# sourceMappingURL=sendBroadcastNotification.js.map