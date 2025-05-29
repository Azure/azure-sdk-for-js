"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = registerSchema;
exports.prepareSchemaContent = prepareSchemaContent;
exports.getSchemaProperties = getSchemaProperties;
exports.getSchemaById = getSchemaById;
exports.getSchemaByVersion = getSchemaByVersion;
const isUnexpected_js_1 = require("./isUnexpected.js");
const conversions_js_1 = require("./conversions.js");
const core_client_1 = require("@azure-rest/core-client");
async function registerSchema(context, schema, options = {}) {
    const { groupName, name: schemaName, definition: schemaContent, format } = schema;
    const response = await context
        .path("/$schemaGroups/{groupName}/schemas/{schemaName}", groupName, schemaName)
        .put(Object.assign({ contentType: (0, conversions_js_1.buildContentType)(format), body: prepareSchemaContent(schemaContent) }, options));
    if ((0, isUnexpected_js_1.isUnexpected)(response)) {
        throw (0, core_client_1.createRestError)(response);
    }
    return (0, conversions_js_1.convertSchemaIdResponse)(response, format);
}
function prepareSchemaContent(schemaContent) {
    return new TextEncoder().encode(schemaContent);
}
async function getSchemaProperties(context, schema, options = {}) {
    const { groupName, name: schemaName, definition: schemaContent, format } = schema;
    const response = await context
        .path("/$schemaGroups/{groupName}/schemas/{schemaName}:get-id", groupName, schemaName)
        .post(Object.assign({ contentType: (0, conversions_js_1.buildContentType)(format), body: schemaContent }, options));
    if ((0, isUnexpected_js_1.isUnexpected)(response)) {
        throw (0, core_client_1.createRestError)(response);
    }
    return (0, conversions_js_1.convertSchemaIdResponse)(response, format);
}
async function getSchemaById(context, schemaId, options) {
    const response = await context.path("/$schemaGroups/$schemas/{id}", schemaId).get(Object.assign({}, options));
    if ((0, isUnexpected_js_1.isUnexpected)(response)) {
        throw (0, core_client_1.createRestError)(response);
    }
    return (0, conversions_js_1.convertSchemaResponse)(response);
}
async function getSchemaByVersion(context, groupName, name, version, options) {
    const response = await context
        .path("/$schemaGroups/{groupName}/schemas/{schemaName}/versions/{schemaVersion}", groupName, name, version)
        .get(Object.assign({}, options));
    if ((0, isUnexpected_js_1.isUnexpected)(response)) {
        throw (0, core_client_1.createRestError)(response);
    }
    return (0, conversions_js_1.convertSchemaResponse)(response);
}
//# sourceMappingURL=operations.js.map