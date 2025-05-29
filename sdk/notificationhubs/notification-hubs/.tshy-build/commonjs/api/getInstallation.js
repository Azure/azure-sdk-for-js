"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstallation = getInstallation;
const _client_js_1 = require("./internal/_client.js");
const tracing_js_1 = require("../utils/tracing.js");
const OPERATION_NAME = "getInstallation";
/**
 * Gets an Azure Notification Hub installation by the installation ID.
 * @param context - The Notification Hubs client.
 * @param installationId - The ID of the installation to get.
 * @param options - Configuration options for the get installation operation.
 * @returns The installation that matches the installation ID.
 */
function getInstallation(context, installationId, options = {}) {
    return tracing_js_1.tracingClient.withSpan(`NotificationHubsClientContext.${OPERATION_NAME}`, options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += `/installations/${installationId}`;
        const headers = await context.createHeaders(OPERATION_NAME);
        headers.set("Content-Type", "application/json");
        const request = (0, _client_js_1.createRequest)(endpoint, "GET", headers, updatedOptions);
        const response = await (0, _client_js_1.sendRequest)(context, request, 200);
        return JSON.parse(response.bodyAsText);
    });
}
//# sourceMappingURL=getInstallation.js.map