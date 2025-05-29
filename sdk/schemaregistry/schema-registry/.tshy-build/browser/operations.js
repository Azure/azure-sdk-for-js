// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isUnexpected } from "./isUnexpected.js";
import { buildContentType, convertSchemaIdResponse, convertSchemaResponse } from "./conversions.js";
import { createRestError } from "@azure-rest/core-client";
export async function registerSchema(context, schema, options = {}) {
    const { groupName, name: schemaName, definition: schemaContent, format } = schema;
    const response = await context
        .path("/$schemaGroups/{groupName}/schemas/{schemaName}", groupName, schemaName)
        .put(Object.assign({ contentType: buildContentType(format), body: prepareSchemaContent(schemaContent) }, options));
    if (isUnexpected(response)) {
        throw createRestError(response);
    }
    return convertSchemaIdResponse(response, format);
}
export function prepareSchemaContent(schemaContent) {
    return new TextEncoder().encode(schemaContent);
}
export async function getSchemaProperties(context, schema, options = {}) {
    const { groupName, name: schemaName, definition: schemaContent, format } = schema;
    const response = await context
        .path("/$schemaGroups/{groupName}/schemas/{schemaName}:get-id", groupName, schemaName)
        .post(Object.assign({ contentType: buildContentType(format), body: schemaContent }, options));
    if (isUnexpected(response)) {
        throw createRestError(response);
    }
    return convertSchemaIdResponse(response, format);
}
export async function getSchemaById(context, schemaId, options) {
    const response = await context.path("/$schemaGroups/$schemas/{id}", schemaId).get(Object.assign({}, options));
    if (isUnexpected(response)) {
        throw createRestError(response);
    }
    return convertSchemaResponse(response);
}
export async function getSchemaByVersion(context, groupName, name, version, options) {
    const response = await context
        .path("/$schemaGroups/{groupName}/schemas/{schemaName}/versions/{schemaVersion}", groupName, name, version)
        .get(Object.assign({}, options));
    if (isUnexpected(response)) {
        throw createRestError(response);
    }
    return convertSchemaResponse(response);
}
//# sourceMappingURL=operations.js.map