"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSchemaIdResponse = convertSchemaIdResponse;
exports.buildContentType = buildContentType;
exports.convertSchemaResponse = convertSchemaResponse;
const textPlain = "text/plain";
const charsetutf8 = "charset=utf-8";
const customContentType = `${textPlain}; ${charsetutf8}`;
const customFormat = "Custom";
/**
 * Converts generated client's response to SchemaIdentityResponse.
 *
 * @internal
 */
async function convertSchemaIdResponse(response, schemaFormat) {
    return {
        // `!`s here because server is required to return these on success, but that
        // is not modeled by the generated client.
        id: response.headers["schema-id"],
        format: schemaFormat,
        groupName: response.headers["schema-group-name"],
        name: response.headers["schema-name"],
        version: Number(response.headers["schema-version"]),
    };
}
/**
 * @internal
 * @param format - schema format
 * @returns corresponding content-type value
 */
function buildContentType(format) {
    return format.toLowerCase() === customFormat.toLowerCase()
        ? customContentType
        : `application/json; serialization=${format}`;
}
async function convertSchemaResponse(response) {
    return {
        definition: typeof response.body === "string" ? response.body : JSON.stringify(response.body),
        properties: {
            id: response.headers["schema-id"],
            format: mapContentTypeToFormat(response.headers["content-type"]),
            groupName: response.headers["schema-group-name"],
            name: response.headers["schema-name"],
            version: Number(response.headers["schema-version"]),
        },
    };
}
function mapContentTypeToFormat(contentType) {
    if (contentType.match(new RegExp(`${textPlain};\\s?${charsetutf8}`)))
        return customFormat;
    const parts = /.*serialization=(.*)$/.exec(contentType);
    const schemaFormat = parts === null || parts === void 0 ? void 0 : parts[1];
    if (schemaFormat) {
        return schemaFormat;
    }
    else {
        return contentType;
    }
}
//# sourceMappingURL=conversions.js.map