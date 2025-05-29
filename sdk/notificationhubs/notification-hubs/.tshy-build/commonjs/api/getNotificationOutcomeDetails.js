"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotificationOutcomeDetails = getNotificationOutcomeDetails;
const _client_js_1 = require("./internal/_client.js");
const notificationDetailsSerializer_js_1 = require("../serializers/notificationDetailsSerializer.js");
const tracing_js_1 = require("../utils/tracing.js");
const OPERATION_NAME = "getNotificationOutcomeDetails";
/**
 * Retrieves the results of a send operation. This can retrieve intermediate results if the send is being processed
 * or final results if the Send* has completed. This API can only be called for Standard SKU and above.
 * @param context - The Notification Hubs client.
 * @param notificationId - The notification ID returned from the send operation.
 * @param options - The operation options.
 * @returns The results of the send operation.
 */
function getNotificationOutcomeDetails(context, notificationId, options = {}) {
    return tracing_js_1.tracingClient.withSpan(`NotificationHubsClientContext.${OPERATION_NAME}`, options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += `/messages/${notificationId}`;
        const headers = await context.createHeaders(OPERATION_NAME);
        const request = (0, _client_js_1.createRequest)(endpoint, "GET", headers, updatedOptions);
        const response = await (0, _client_js_1.sendRequest)(context, request, 200);
        return (0, notificationDetailsSerializer_js_1.parseNotificationDetails)(response.bodyAsText);
    });
}
//# sourceMappingURL=getNotificationOutcomeDetails.js.map