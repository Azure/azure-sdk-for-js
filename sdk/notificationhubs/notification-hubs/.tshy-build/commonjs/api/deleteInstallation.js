"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInstallation = deleteInstallation;
const _client_js_1 = require("./internal/_client.js");
const tracing_js_1 = require("../utils/tracing.js");
const OPERATION_NAME = "deleteInstallation";
/**
 * Deletes an installation from a Notification Hub.
 * @param context - The Notification Hubs client.
 * @param installationId - The installation ID of the installation to delete.
 * @param options - Configuration options for the installation delete operation.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
function deleteInstallation(context, installationId, options = {}) {
    return tracing_js_1.tracingClient.withSpan(`NotificationHubsClientContext.${OPERATION_NAME}`, options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += `/installations/${installationId}`;
        const headers = await context.createHeaders(OPERATION_NAME);
        const request = (0, _client_js_1.createRequest)(endpoint, "DELETE", headers, updatedOptions);
        const response = await (0, _client_js_1.sendRequest)(context, request, 204);
        return (0, _client_js_1.parseNotificationResponse)(response);
    });
}
//# sourceMappingURL=deleteInstallation.js.map