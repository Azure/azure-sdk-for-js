// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isTokenCredential } from "@azure/core-auth";
import { parseConnectionString } from "./connectionString.js";
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
export const isKeyCredential = (credential) => {
    const castCredential = credential;
    return (castCredential &&
        typeof castCredential.key === "string" &&
        castCredential.getToken === undefined);
};
/**
 * Parses arguments passed to a communication client.
 * @hidden
 */
export const parseClientArguments = (connectionStringOrUrl, credentialOrOptions) => {
    if (isKeyCredential(credentialOrOptions) || isTokenCredential(credentialOrOptions)) {
        assertValidEndpoint(connectionStringOrUrl);
        return { url: connectionStringOrUrl, credential: credentialOrOptions };
    }
    else {
        const { endpoint: host, credential } = parseConnectionString(connectionStringOrUrl);
        assertValidEndpoint(host);
        return { url: host, credential };
    }
};
//# sourceMappingURL=clientArguments.js.map