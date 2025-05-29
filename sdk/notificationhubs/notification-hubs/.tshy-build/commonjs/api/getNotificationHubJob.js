"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotificationHubJob = getNotificationHubJob;
const _client_js_1 = require("./internal/_client.js");
const notificationHubJobSerializer_js_1 = require("../serializers/notificationHubJobSerializer.js");
const tracing_js_1 = require("../utils/tracing.js");
const OPERATION_NAME = "getNotificationHubJob";
/**
 * Gets a Notification Hub Job by the ID.
 * @param context - The Notification Hubs client.
 * @param jobId - The Notification Hub Job ID.
 * @param options - The operation options.
 * @returns The Notification Hub Job with the matching ID.
 */
function getNotificationHubJob(context, jobId, options = {}) {
    return tracing_js_1.tracingClient.withSpan(`NotificationHubsClientContext.${OPERATION_NAME}`, options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += `/jobs/${jobId}`;
        const headers = await context.createHeaders(OPERATION_NAME);
        headers.set("Content-Type", "application/atom+xml;type=entry;charset=utf-8");
        const request = (0, _client_js_1.createRequest)(endpoint, "GET", headers, updatedOptions);
        const response = await (0, _client_js_1.sendRequest)(context, request, 200);
        return (0, notificationHubJobSerializer_js_1.parseNotificationHubJobEntry)(response.bodyAsText);
    });
}
//# sourceMappingURL=getNotificationHubJob.js.map