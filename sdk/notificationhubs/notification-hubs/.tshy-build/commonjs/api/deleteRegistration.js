"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRegistration = deleteRegistration;
const _client_js_1 = require("./internal/_client.js");
const utils_js_1 = require("../utils/utils.js");
const tracing_js_1 = require("../utils/tracing.js");
const OPERATION_NAME = "deleteRegistration";
/**
 * Deletes a registration with the given registration ID.
 * @param context - The Notification Hubs client.
 * @param registrationId - The registration ID of the registration to delete.
 * @param options - The options for delete operations including the ETag
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
function deleteRegistration(context, registrationId, options = {}) {
    return tracing_js_1.tracingClient.withSpan(`NotificationHubsClientContext.${OPERATION_NAME}`, options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += `/registrations/${registrationId}`;
        const headers = await context.createHeaders(OPERATION_NAME);
        headers.set("Content-Type", "application/atom+xml;type=entry;charset=utf-8");
        headers.set("If-Match", (0, utils_js_1.isDefined)(options.etag) ? `"${options.etag}"` : "*");
        const request = (0, _client_js_1.createRequest)(endpoint, "DELETE", headers, updatedOptions);
        const response = await (0, _client_js_1.sendRequest)(context, request, 200);
        return (0, _client_js_1.parseNotificationResponse)(response);
    });
}
//# sourceMappingURL=deleteRegistration.js.map