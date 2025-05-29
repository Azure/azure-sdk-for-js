// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { sendNotificationInternal } from "./internal/_sendNotification.js";
/**
 * Sends push notifications to devices that match the given tags or tag expression.
 * @param context - The Notification Hubs client.
 * @param notification - The notification to send to the matching devices.
 * @param options - Options for the notification including tags, device handles and whether to enable test send.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function sendNotification(context, notification, options) {
    return sendNotificationInternal(context, notification, options);
}
//# sourceMappingURL=sendNotification.js.map