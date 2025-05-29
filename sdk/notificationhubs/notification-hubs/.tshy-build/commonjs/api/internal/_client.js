"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequest = createRequest;
exports.parseNotificationResponse = parseNotificationResponse;
exports.parseNotificationSendResponse = parseNotificationSendResponse;
exports.sendRequest = sendRequest;
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const utils_js_1 = require("../../utils/utils.js");
const notificationOutcomeSerializer_js_1 = require("../../serializers/notificationOutcomeSerializer.js");
const xmlUtils_js_1 = require("../../utils/xmlUtils.js");
function createRequest(endpoint, method, headers, options) {
    return (0, core_rest_pipeline_1.createPipelineRequest)(Object.assign(Object.assign(Object.assign({}, options.tracingOptions), options.requestOptions), { url: endpoint.toString(), abortSignal: options.abortSignal, method,
        headers }));
}
/**
 * Parses the HTTP response and creates a NotificationHubsResponse with header information from the operation.
 * @param response - The HTTP response used to populate the result.
 * @returns A NotificationHubsResponse with header information from the operation.
 */
function parseNotificationResponse(response) {
    const correlationId = response.headers.get("x-ms-correlation-request-id");
    const trackingId = response.headers.get("TrackingId");
    const location = response.headers.get("Location");
    return {
        correlationId,
        trackingId,
        location,
    };
}
/**
 * Parses the HTTP response and creates a NotificationHubsMessageResponse with results from the notification.
 * @param response - The HTTP response used to populate the result.
 * @returns A NotificationHubsMessageResponse with results from the notification.
 */
async function parseNotificationSendResponse(response) {
    const result = parseNotificationResponse(response);
    let notificationId;
    if (result.location) {
        const locationUrl = new URL(result.location);
        notificationId = locationUrl.pathname.split("/")[3];
    }
    const requestUrl = new URL(response.request.url);
    const isTestSend = requestUrl.searchParams.has("test");
    const isDirectSend = requestUrl.searchParams.has("direct");
    // Only broadcast/tag based sends are supported for test send
    const responseBody = response.bodyAsText;
    if (isTestSend && !isDirectSend && (0, utils_js_1.isDefined)(responseBody)) {
        const outcome = await (0, notificationOutcomeSerializer_js_1.parseNotificationOutcome)(responseBody);
        return Object.assign(Object.assign(Object.assign({}, result), outcome), { notificationId });
    }
    else {
        return createDefaultResponse(result, notificationId);
    }
}
function createDefaultResponse(response, notificationId) {
    return Object.assign(Object.assign({}, response), { notificationId, successCount: 0, failureCount: 0, results: [], state: "Enqueued" });
}
/**
 * Sends a request through the client context.
 * @param context - The client context to use.
 * @param request - The HTTP request to send.
 * @param successStatusCode - A status code or list of status codes to check for success.
 * @returns The HTTP Response.
 */
async function sendRequest(context, request, successStatusCode) {
    const statuses = Array.isArray(successStatusCode)
        ? successStatusCode
        : [successStatusCode];
    const response = await context.sendRequest(request);
    if (!statuses.some((statusCode) => statusCode === response.status)) {
        const responseBody = response.bodyAsText;
        let details;
        if ((0, utils_js_1.isDefined)(responseBody)) {
            details = await (0, xmlUtils_js_1.parseXMLError)(responseBody);
        }
        let errorMessage;
        if ((0, utils_js_1.isDefined)(details)) {
            errorMessage = `operations failed with: ${details}`;
        }
        else {
            errorMessage = `operation failed with status ${response.status}`;
        }
        throw new core_rest_pipeline_1.RestError(errorMessage, {
            statusCode: response.status,
            response,
        });
    }
    return response;
}
//# sourceMappingURL=_client.js.map