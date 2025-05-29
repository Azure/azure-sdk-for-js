"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrUpdateRegistrationDescription = createOrUpdateRegistrationDescription;
const _client_js_1 = require("./_client.js");
const registrationSerializer_js_1 = require("../../serializers/registrationSerializer.js");
const utils_js_1 = require("../../utils/utils.js");
/**
 * @internal
 */
async function createOrUpdateRegistrationDescription(context, registration, operationName, options) {
    const endpoint = context.requestUrl();
    endpoint.pathname += "/registrations";
    let httpMethod = "POST";
    if (operationName === "createOrUpdate" || operationName === "update") {
        endpoint.pathname += `/${registration.registrationId}`;
        httpMethod = "PUT";
    }
    const etag = registration.etag;
    // Clear out readonly properties
    registration.registrationId = undefined;
    registration.etag = undefined;
    const headers = await context.createHeaders(`${operationName}Registration`);
    headers.set("Content-Type", "application/atom+xml;type=entry;charset=utf-8");
    if (operationName === "update") {
        headers.set("If-Match", (0, utils_js_1.isDefined)(etag) ? `"${etag}"` : "*");
    }
    const request = (0, _client_js_1.createRequest)(endpoint, httpMethod, headers, options);
    request.body = registrationSerializer_js_1.registrationDescriptionSerializer.serializeRegistrationDescription(registration);
    const response = await (0, _client_js_1.sendRequest)(context, request, [200, 201]);
    return registrationSerializer_js_1.registrationDescriptionParser.parseRegistrationEntry(response.bodyAsText);
}
//# sourceMappingURL=_createOrUpdateRegistrationDescription.js.map