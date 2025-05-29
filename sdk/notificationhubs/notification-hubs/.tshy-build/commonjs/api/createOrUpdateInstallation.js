"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrUpdateInstallation = createOrUpdateInstallation;
const _client_js_1 = require("./internal/_client.js");
const tracing_js_1 = require("../utils/tracing.js");
const OPERATION_NAME = "createOrUpdateInstallation";
/**
 * Creates or overwrites an installation to a Notification Hub.
 * @param context - The Notification Hubs client.
 * @param installation - The installation to create or overwrite.
 * @param options - Configuration options for the create or update installation operation.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
function createOrUpdateInstallation(context, installation, options = {}) {
    return tracing_js_1.tracingClient.withSpan(`NotificationHubsClientContext.${OPERATION_NAME}`, options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += `/installations/${installation.installationId}`;
        const headers = await context.createHeaders(OPERATION_NAME);
        headers.set("Content-Type", "application/json");
        const request = (0, _client_js_1.createRequest)(endpoint, "PUT", headers, updatedOptions);
        request.body = JSON.stringify(installation);
        const response = await (0, _client_js_1.sendRequest)(context, request, 200);
        return (0, _client_js_1.parseNotificationResponse)(response);
    });
}
//# sourceMappingURL=createOrUpdateInstallation.js.map