"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleNotificationInternal = scheduleNotificationInternal;
const _client_js_1 = require("./_client.js");
const tracing_js_1 = require("../../utils/tracing.js");
/**
 * Schedules a push notification to devices that match the given tags or tag expression at the specified time.
 * NOTE: This is only available in Standard SKU Azure Notification Hubs.
 * @param context - The Notification Hubs client.
 * @param scheduledTime - The Date to send the push notification.
 * @param notification - The notification to send to the matching devices.
 * @param options - Options which include tags used to target the device for push notifications in either an array or tag expression.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
function scheduleNotificationInternal(context, scheduledTime, notification, options, method, tagExpression) {
    return tracing_js_1.tracingClient.withSpan(`NotificationHubsClientContext.${method}`, options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += "/schedulednotifications/";
        const headers = await context.createHeaders("scheduleNotification", notification.headers);
        headers.set("ServiceBusNotification-ScheduleTime", scheduledTime.toISOString());
        headers.set("Content-Type", notification.contentType);
        headers.set("ServiceBusNotification-Format", notification.platform);
        if (tagExpression) {
            headers.set("ServiceBusNotification-Tags", tagExpression);
        }
        const request = (0, _client_js_1.createRequest)(endpoint, "POST", headers, updatedOptions);
        request.body = notification.body;
        const response = await (0, _client_js_1.sendRequest)(context, request, 201);
        return (0, _client_js_1.parseNotificationSendResponse)(response);
    });
}
//# sourceMappingURL=_scheduleNotification.js.map