"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendBroadcastNotification = sendBroadcastNotification;
const _sendNotification_js_1 = require("./internal/_sendNotification.js");
/**
 * Sends push notifications to all devices with a broadcast send.
 * @param context - The Notification Hubs client.
 * @param notification - The notification to send to the matching devices.
 * @param options - Options for the notification including whether to enable test send.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
function sendBroadcastNotification(context, notification, options = {}) {
    return (0, _sendNotification_js_1.sendNotificationInternal)(context, notification, options);
}
//# sourceMappingURL=sendBroadcastNotification.js.map