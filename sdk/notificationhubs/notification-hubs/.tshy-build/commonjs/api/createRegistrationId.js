"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRegistrationId = createRegistrationId;
const _client_js_1 = require("./internal/_client.js");
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const tracing_js_1 = require("../utils/tracing.js");
const OPERATION_NAME = "createRegistrationId";
/**
 * Creates a new registration ID.
 * @param context - The Notification Hubs client.
 * @param options - The options for creating a new registration ID.
 * @returns The newly created registration ID.
 */
function createRegistrationId(context, options = {}) {
    return tracing_js_1.tracingClient.withSpan(`NotificationHubsClientContext.${OPERATION_NAME}`, options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += "/registrationIDs";
        const headers = await context.createHeaders(OPERATION_NAME);
        headers.set("Content-Type", "application/xml;type=entry;charset=utf-8");
        const request = (0, _client_js_1.createRequest)(endpoint, "POST", headers, updatedOptions);
        const response = await (0, _client_js_1.sendRequest)(context, request, 201);
        // In the form: https://{namespace}.servicebus.windows.net/{NotificationHub}/registrations/<registrationId>
        const locationHeader = response.headers.get("Location");
        if (!locationHeader || !locationHeader.startsWith("https://")) {
            throw new core_rest_pipeline_1.RestError(`Location header ${locationHeader} is an invalid URL`, {
                statusCode: 500,
                request,
                response,
            });
        }
        const locationUrl = new URL(locationHeader);
        const registrationId = locationUrl.pathname.split("/")[3];
        return registrationId;
    });
}
//# sourceMappingURL=createRegistrationId.js.map