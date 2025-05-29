"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseClientArguments = exports.isKeyCredential = void 0;
const core_auth_1 = require("@azure/core-auth");
const connectionString_js_1 = require("./connectionString.js");
const isValidEndpoint = (host) => {
    var _a;
    const url = new URL(host);
    return (!!((_a = url.protocol) === null || _a === void 0 ? void 0 : _a.match(/^http[s]?/)) &&
        url.host !== undefined &&
        url.host !== "" &&
        (url.pathname === undefined || url.pathname === "" || url.pathname === "/"));
};
const assertValidEndpoint = (host) => {
    if (!isValidEndpoint(host)) {
        throw new Error(`Invalid endpoint url ${host}`);
    }
};
/**
 * Checks whether a value is a KeyCredential.
 *
 * @param credential - The credential being checked.
 */
const isKeyCredential = (credential) => {
    const castCredential = credential;
    return (castCredential &&
        typeof castCredential.key === "string" &&
        castCredential.getToken === undefined);
};
exports.isKeyCredential = isKeyCredential;
/**
 * Parses arguments passed to a communication client.
 * @hidden
 */
const parseClientArguments = (connectionStringOrUrl, credentialOrOptions) => {
    if ((0, exports.isKeyCredential)(credentialOrOptions) || (0, core_auth_1.isTokenCredential)(credentialOrOptions)) {
        assertValidEndpoint(connectionStringOrUrl);
        return { url: connectionStringOrUrl, credential: credentialOrOptions };
    }
    else {
        const { endpoint: host, credential } = (0, connectionString_js_1.parseConnectionString)(connectionStringOrUrl);
        assertValidEndpoint(host);
        return { url: host, credential };
    }
};
exports.parseClientArguments = parseClientArguments;
//# sourceMappingURL=clientArguments.js.map