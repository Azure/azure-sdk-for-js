"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = sendNotification;
const _sendNotification_js_1 = require("./internal/_sendNotification.js");
/**
 * Sends push notifications to devices that match the given tags or tag expression.
 * @param context - The Notification Hubs client.
 * @param notification - The notification to send to the matching devices.
 * @param options - Options for the notification including tags, device handles and whether to enable test send.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
function sendNotification(context, notification, options) {
    return (0, _sendNotification_js_1.sendNotificationInternal)(context, notification, options);
}
//# sourceMappingURL=sendNotification.js.map