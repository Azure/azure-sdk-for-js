"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseConnectionString = void 0;
const core_auth_1 = require("@azure/core-auth");
// TODO: update when connection string format is finalized
const CONNECTION_STRING_REGEX = /endpoint=(.*);accesskey=(.*)/i;
const tryParseConnectionString = (s) => {
    const match = s.match(CONNECTION_STRING_REGEX);
    if ((match === null || match === void 0 ? void 0 : match[1]) && match[2]) {
        return { endpoint: match[1], credential: new core_auth_1.AzureKeyCredential(match[2]) };
    }
    return undefined;
};
/**
 * Returns an EndpointCredential to easily access properties of the connection string.
 * @hidden
 *
 * @param connectionString - The connection string to parse
 * @returns Object to access the endpoint and the credentials
 */
const parseConnectionString = (connectionString) => {
    const parsedConnectionString = tryParseConnectionString(connectionString);
    if (parsedConnectionString) {
        return parsedConnectionString;
    }
    else {
        throw new Error(`Invalid connection string ${connectionString}`);
    }
};
exports.parseConnectionString = parseConnectionString;
//# sourceMappingURL=connectionString.js.map