"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistration = getRegistration;
const _client_js_1 = require("./internal/_client.js");
const registrationSerializer_js_1 = require("../serializers/registrationSerializer.js");
const tracing_js_1 = require("../utils/tracing.js");
const OPERATION_NAME = "getRegistration";
/**
 * Gets a registration by the given registration ID.
 * @param context - The Notification Hubs client.
 * @param registrationId - The ID of the registration to get.
 * @param options - The options for getting a registration by ID.
 * @returns A RegistrationDescription that has the given registration ID.
 */
function getRegistration(context, registrationId, options = {}) {
    return tracing_js_1.tracingClient.withSpan(`NotificationHubsClientContext.${OPERATION_NAME}`, options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += `/registrations/${registrationId}`;
        const headers = await context.createHeaders(OPERATION_NAME);
        headers.set("Content-Type", "application/xml;type=entry;charset=utf-8");
        const request = (0, _client_js_1.createRequest)(endpoint, "GET", headers, updatedOptions);
        const response = await (0, _client_js_1.sendRequest)(context, request, 200);
        return registrationSerializer_js_1.registrationDescriptionParser.parseRegistrationEntry(response.bodyAsText);
    });
}
//# sourceMappingURL=getRegistration.js.map