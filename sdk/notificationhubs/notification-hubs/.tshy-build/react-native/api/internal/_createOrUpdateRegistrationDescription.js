// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createRequest, sendRequest } from "./_client.js";
import { registrationDescriptionParser, registrationDescriptionSerializer, } from "../../serializers/registrationSerializer.js";
import { isDefined } from "../../utils/utils.js";
/**
 * @internal
 */
export async function createOrUpdateRegistrationDescription(context, registration, operationName, options) {
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
        headers.set("If-Match", isDefined(etag) ? `"${etag}"` : "*");
    }
    const request = createRequest(endpoint, httpMethod, headers, options);
    request.body = registrationDescriptionSerializer.serializeRegistrationDescription(registration);
    const response = await sendRequest(context, request, [200, 201]);
    return registrationDescriptionParser.parseRegistrationEntry(response.bodyAsText);
}
//# sourceMappingURL=_createOrUpdateRegistrationDescription.js.map