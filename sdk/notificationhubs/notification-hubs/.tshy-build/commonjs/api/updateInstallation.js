"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInstallation = updateInstallation;
const _client_js_1 = require("./internal/_client.js");
const tracing_js_1 = require("../utils/tracing.js");
const OPERATION_NAME = "updateInstallation";
/**
 * Updates an installation using the JSON-Patch standard in RFC6902.
 * @param context - The Notification Hubs client.
 * @param installationId - The ID of the installation to update.
 * @param installationPatches - An array of patches following the JSON-Patch standard.
 * @param options - Configuration options for the patch installation operation.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
function updateInstallation(context, installationId, installationPatches, options = {}) {
    return tracing_js_1.tracingClient.withSpan(`NotificationHubsClientContext.${OPERATION_NAME}`, options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += `/installations/${installationId}`;
        const headers = await context.createHeaders(OPERATION_NAME);
        headers.set("Content-Type", "application/json");
        const request = (0, _client_js_1.createRequest)(endpoint, "PATCH", headers, updatedOptions);
        request.body = JSON.stringify(installationPatches);
        const response = await (0, _client_js_1.sendRequest)(context, request, 200);
        return (0, _client_js_1.parseNotificationResponse)(response);
    });
}
//# sourceMappingURL=updateInstallation.js.map