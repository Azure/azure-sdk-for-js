"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleNotification = scheduleNotification;
const _scheduleNotification_js_1 = require("./internal/_scheduleNotification.js");
/**
 * Schedules a push notification to devices that match the given tags or tag expression at the specified time.
 * NOTE: This is only available in Standard SKU Azure Notification Hubs.
 * @param context - The Notification Hubs client.
 * @param scheduledTime - The Date to send the push notification.
 * @param notification - The notification to send to the matching devices.
 * @param options - Options which include tags used to target the device for push notifications in either an array or tag expression.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
function scheduleNotification(context, scheduledTime, notification, options) {
    return (0, _scheduleNotification_js_1.scheduleNotificationInternal)(context, scheduledTime, notification, options, "scheduleNotification", options.tagExpression);
}
//# sourceMappingURL=scheduleNotification.js.map