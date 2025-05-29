"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedbackContainerUrl = getFeedbackContainerUrl;
const _client_js_1 = require("./internal/_client.js");
const tracing_js_1 = require("../utils/tracing.js");
const OPERATION_NAME = "getFeedbackContainerUrl";
/**
 * Retrieves an Azure Storage container URL. The container has feedback data for the notification hub.
 * The caller can then use the Azure Storage Services SDK to retrieve the contents of the container.
 * @param context - The Notification Hubs client.
 * @param options - The options for getting the push notification feedback container URL.
 * @returns The URL of the Azure Storage Container containing the feedback data.
 */
function getFeedbackContainerUrl(context, options = {}) {
    return tracing_js_1.tracingClient.withSpan(`NotificationHubsClientContext.${OPERATION_NAME}`, options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += "/feedbackcontainer";
        const headers = await context.createHeaders(OPERATION_NAME);
        headers.set("Content-Type", "application/xml;type=entry;charset=utf-8");
        const request = (0, _client_js_1.createRequest)(endpoint, "GET", headers, updatedOptions);
        const response = await (0, _client_js_1.sendRequest)(context, request, 200);
        return response.bodyAsText;
    });
}
//# sourceMappingURL=getFeedbackContainerUrl.js.map