"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotificationInternal = sendNotificationInternal;
const _client_js_1 = require("./_client.js");
const optionUtils_js_1 = require("../../utils/optionUtils.js");
const notificationUtils_js_1 = require("../../utils/notificationUtils.js");
const core_util_1 = require("@azure/core-util");
const tracing_js_1 = require("../../utils/tracing.js");
/**
 * Sends push notifications to devices that match the given tags or tag expression.
 * @param context - The Notification Hubs client.
 * @param notification - The notification to send to the matching devices.
 * @param options - Options for the notification including tags, device handles and whether to enable test send.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
function sendNotificationInternal(context, notification, options) {
    return tracing_js_1.tracingClient.withSpan(`NotificationHubsClientContext.sendNotification`, options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += "/messages/";
        // Check if batch direct send
        if ((0, optionUtils_js_1.isDirectSendNotificationOptions)(options) && Array.isArray(options.deviceHandle)) {
            endpoint.pathname += "$batch";
        }
        // Check for test send
        if (((0, optionUtils_js_1.isSendNotificationOptions)(options) || (0, optionUtils_js_1.isBroadcastSendNotificationOptions)(options)) &&
            options.enableTestSend) {
            endpoint.searchParams.append("test", "true");
        }
        const headers = await context.createHeaders("sendNotification", notification.headers);
        headers.set("ServiceBusNotification-Format", notification.platform);
        let body = notification.body;
        let contentType = notification.contentType;
        // Check for direct batch send
        if ((0, optionUtils_js_1.isDirectSendNotificationOptions)(options) && Array.isArray(options.deviceHandle)) {
            endpoint.searchParams.append("direct", "true");
            const boundary = `nh-boundary-${(0, core_util_1.randomUUID)()}`;
            contentType = `multipart/mixed; boundary = "${boundary}"`;
            body = (0, notificationUtils_js_1.createMultipartDirectNotification)(boundary, notification, options.deviceHandle);
        }
        else if ((0, optionUtils_js_1.isDirectSendNotificationOptions)(options)) {
            endpoint.searchParams.append("direct", "true");
            if (notification.platform === "browser") {
                const browserHandle = options.deviceHandle;
                headers.set("ServiceBusNotification-DeviceHandle", browserHandle.endpoint);
                headers.set("Auth", browserHandle.auth);
                headers.set("P256DH", browserHandle.p256dh);
            }
            else {
                headers.set("ServiceBusNotification-DeviceHandle", options.deviceHandle);
            }
        }
        else if ((0, optionUtils_js_1.isSendNotificationOptions)(options)) {
            headers.set("ServiceBusNotification-Tags", options.tagExpression);
        }
        headers.set("Content-Type", contentType);
        headers.set("ServiceBusNotification-Format", notification.platform);
        const request = (0, _client_js_1.createRequest)(endpoint, "POST", headers, updatedOptions);
        request.body = body;
        const response = await (0, _client_js_1.sendRequest)(context, request, 201);
        return (0, _client_js_1.parseNotificationSendResponse)(response);
    });
}
//# sourceMappingURL=_sendNotification.js.map