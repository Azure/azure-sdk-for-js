"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEndpoint = parseEndpoint;
/**
 * Parses the host, hostname, and port from an endpoint.
 * @param endpoint - And endpoint to parse.
 * @internal
 */
function parseEndpoint(endpoint) {
    const hostMatch = endpoint.match(/.*:\/\/([^/]*)/);
    if (!hostMatch) {
        throw new TypeError(`Invalid endpoint missing host: ${endpoint}`);
    }
    const [, host] = hostMatch;
    const [hostname, port] = host.split(":");
    return { host, hostname, port };
}
//# sourceMappingURL=parseEndpoint.js.map