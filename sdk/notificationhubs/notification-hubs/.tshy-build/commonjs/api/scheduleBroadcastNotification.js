"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleBroadcastNotification = scheduleBroadcastNotification;
const _scheduleNotification_js_1 = require("./internal/_scheduleNotification.js");
/**
 * Schedules a push notification to all registered devices.
 * NOTE: This is only available in Standard SKU Azure Notification Hubs.
 * @param context - The Notification Hubs client.
 * @param scheduledTime - The Date to send the push notification.
 * @param notification - The notification to send to the matching devices.
 * @param options - Operation options.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
function scheduleBroadcastNotification(context, scheduledTime, notification, options = {}) {
    return (0, _scheduleNotification_js_1.scheduleNotificationInternal)(context, scheduledTime, notification, options, "scheduleBroadcastNotification");
}
//# sourceMappingURL=scheduleBroadcastNotification.js.map