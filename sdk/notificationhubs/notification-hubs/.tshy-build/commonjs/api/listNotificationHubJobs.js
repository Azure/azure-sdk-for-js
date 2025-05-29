"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.listNotificationHubJobs = listNotificationHubJobs;
const _client_js_1 = require("./internal/_client.js");
const notificationHubJobSerializer_js_1 = require("../serializers/notificationHubJobSerializer.js");
const tracing_js_1 = require("../utils/tracing.js");
const OPERATION_NAME = "listNotificationHubJobs";
/**
 * Gets all Notification Hub Jobs for this Notification Hub.
 * @param context - The Notification Hubs client.xs
 * @param options - The operation options.
 * @returns An array of all Notification Hub Jobs for this Notification Hub.
 */
function listNotificationHubJobs(context, options = {}) {
    return tracing_js_1.tracingClient.withSpan(`NotificationHubsClientContext.${OPERATION_NAME}`, options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += "/jobs";
        const headers = await context.createHeaders(OPERATION_NAME);
        headers.set("Content-Type", "application/atom+xml;type=entry;charset=utf-8");
        const request = (0, _client_js_1.createRequest)(endpoint, "GET", headers, updatedOptions);
        const response = await (0, _client_js_1.sendRequest)(context, request, 200);
        return (0, notificationHubJobSerializer_js_1.parseNotificationHubJobFeed)(response.bodyAsText);
    });
}
//# sourceMappingURL=listNotificationHubJobs.js.map