"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelScheduledNotification = cancelScheduledNotification;
const _client_js_1 = require("./internal/_client.js");
const tracing_js_1 = require("../utils/tracing.js");
const OPERATION_NAME = "cancelScheduledNotification";
/**
 * Cancels the scheduled notification with the given notification ID.
 * NOTE: This is only available in Standard SKU Azure Notification Hubs.
 * @param context - The Notification Hubs client.
 * @param notificationId - The notification ID from the scheduled notification.
 * @param options - The operation options.
 * @returns A notification hub response with correlation ID and tracking ID.
 */
function cancelScheduledNotification(context, notificationId, options = {}) {
    return tracing_js_1.tracingClient.withSpan(`NotificationHubsClientContext.${OPERATION_NAME}`, options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += `/schedulednotifications/${notificationId}`;
        const headers = await context.createHeaders(OPERATION_NAME);
        const request = (0, _client_js_1.createRequest)(endpoint, "DELETE", headers, updatedOptions);
        const response = await (0, _client_js_1.sendRequest)(context, request, 200);
        return (0, _client_js_1.parseNotificationSendResponse)(response);
    });
}
//# sourceMappingURL=cancelScheduledNotification.js.map