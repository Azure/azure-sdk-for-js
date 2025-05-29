// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isDefined } from "@azure/core-util";
import { parseConnectionString } from "../util/utils.js";
const specialLocalIPs = ["::1", "0:0:0:0:0:0:0:1"];
function getHost(endpoint) {
    for (const ip of specialLocalIPs) {
        if (endpoint.includes(ip)) {
            return ip;
        }
    }
    const matches = /.*:\/\/([^/:]*)/.exec(endpoint);
    const match = matches === null || matches === void 0 ? void 0 : matches[1];
    return !match ? endpoint : match;
}
function extractPort(ep) {
    const matches = /.*:(\d*)/.exec(ep);
    const match = matches === null || matches === void 0 ? void 0 : matches[1];
    return match ? parseInt(match, 10) : undefined;
}
function getPort(endpoint) {
    for (const ip of specialLocalIPs) {
        if (endpoint.includes(ip)) {
            return extractPort(endpoint.replace(ip, ""));
        }
    }
    return extractPort(endpoint);
}
/**
 * Describes the ConnectionConfig module
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare -- renaming constant would be a breaking change.
export const ConnectionConfig = {
    /**
     * Creates the connection config.
     * @param connectionString - The connection string for a given service like
     * EventHub/ServiceBus.
     * @param path - The name/path of the entity (hub name) to which the
     * connection needs to happen. This will override the EntityPath in the connectionString
     * if present.
     * @returns ConnectionConfig
     */
    create(connectionString, path) {
        connectionString = String(connectionString);
        const parsedCS = parseConnectionString(connectionString);
        if (!parsedCS.Endpoint) {
            throw new TypeError("Missing Endpoint in Connection String.");
        }
        if (!parsedCS.Endpoint.endsWith("/"))
            parsedCS.Endpoint += "/";
        let port;
        if (parsedCS.Endpoint.includes(":")) {
            port = getPort(parsedCS.Endpoint);
        }
        const result = Object.assign({ connectionString: connectionString, endpoint: parsedCS.Endpoint, host: getHost(parsedCS.Endpoint), sharedAccessKeyName: parsedCS.SharedAccessKeyName, sharedAccessKey: parsedCS.SharedAccessKey, useDevelopmentEmulator: parsedCS.UseDevelopmentEmulator === "true" }, (port !== undefined ? { port } : undefined));
        if (path || parsedCS.EntityPath) {
            result.entityPath = path || parsedCS.EntityPath;
        }
        return result;
    },
    /**
     * Validates the properties of connection config.
     * @param config - The connection config to be validated.
     * @returns void
     */
    validate(config, options) {
        if (!options)
            options = {};
        if (!config) {
            throw new TypeError("Missing configuration");
        }
        if (!config.endpoint) {
            throw new TypeError("Missing 'endpoint' in configuration");
        }
        config.endpoint = String(config.endpoint);
        if (!config.host) {
            throw new TypeError("Missing 'host' in configuration");
        }
        config.host = String(config.host);
        if (config.port !== undefined && !(config.port >= 0 && config.port <= 65535)) {
            throw new TypeError(`Invalid 'port' of ${config.port} in configuration`);
        }
        if (options.isEntityPathRequired && !config.entityPath) {
            throw new TypeError("Missing 'entityPath' in configuration");
        }
        if (isDefined(config.entityPath)) {
            config.entityPath = String(config.entityPath);
        }
        if (!isSharedAccessSignature(config.connectionString)) {
            if (!config.sharedAccessKeyName) {
                throw new TypeError("Missing 'sharedAccessKeyName' in configuration");
            }
            config.sharedAccessKeyName = String(config.sharedAccessKeyName);
            if (!config.sharedAccessKey) {
                throw new TypeError("Missing 'sharedAccessKey' in configuration");
            }
            config.sharedAccessKey = String(config.sharedAccessKey);
        }
    },
};
/**
 * @internal
 */
export function isSharedAccessSignature(connectionString) {
    return connectionString.match(/;{0,1}SharedAccessSignature=SharedAccessSignature /) != null;
}
//# sourceMappingURL=connectionConfig.js.map