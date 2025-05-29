"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitNotificationHubJob = submitNotificationHubJob;
const _client_js_1 = require("./internal/_client.js");
const notificationHubJobSerializer_js_1 = require("../serializers/notificationHubJobSerializer.js");
const tracing_js_1 = require("../utils/tracing.js");
const OPERATION_NAME = "submitNotificationHubJob";
/**
 * Submits a Notification Hub Job.
 * Note: this is available to Standard SKU namespace and above.
 * @param context - The Notification Hubs client.
 * @param job - The notification hub job to submit.
 * @param options - The operation options.
 * @returns The notification hub job details including job ID and status.
 */
function submitNotificationHubJob(context, job, options = {}) {
    return tracing_js_1.tracingClient.withSpan(`NotificationHubsClientContext.${OPERATION_NAME}`, options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += "/jobs";
        const headers = await context.createHeaders(OPERATION_NAME);
        headers.set("Content-Type", "application/atom+xml;type=entry;charset=utf-8");
        const request = (0, _client_js_1.createRequest)(endpoint, "POST", headers, updatedOptions);
        request.body = (0, notificationHubJobSerializer_js_1.serializeNotificationHubJobEntry)(job);
        const response = await (0, _client_js_1.sendRequest)(context, request, 201);
        return (0, notificationHubJobSerializer_js_1.parseNotificationHubJobEntry)(response.bodyAsText);
    });
}
//# sourceMappingURL=submitNotificationHubJob.js.map