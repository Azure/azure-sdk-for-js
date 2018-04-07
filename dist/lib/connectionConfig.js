"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./util/utils");
var ConnectionConfig;
(function (ConnectionConfig) {
    /**
     * Creates the connection config.
     * @param {string} connectionString - The event hub connection string
     * @param {string} [path]           - The name/path of the entity (hub name) to which the connection needs to happen
     */
    function create(connectionString, path) {
        if (!connectionString || (connectionString && typeof connectionString !== "string")) {
            throw new Error("'connectionString' is a required parameter and must be of type: 'string'.");
        }
        const parsedCS = utils_1.parseConnectionString(connectionString);
        if (!path && !parsedCS.EntityPath) {
            throw new Error(`Either provide "path" or the "connectionString": "${connectionString}", must contain EntityPath="<path-to-the-entity>".`);
        }
        const result = {
            connectionString: connectionString,
            endpoint: parsedCS.Endpoint,
            host: (parsedCS && parsedCS.Endpoint) ? (parsedCS.Endpoint.match('sb://([^/]*)') || [])[1] : "",
            entityPath: path || parsedCS.EntityPath,
            sharedAccessKeyName: parsedCS.SharedAccessKeyName,
            sharedAccessKey: parsedCS.SharedAccessKey
        };
        return result;
    }
    ConnectionConfig.create = create;
    /**
     * Validates the properties of connection config.
     * @param {ConnectionConfig} config The connection config to be validated.
     */
    function validate(config) {
        if (!config || (config && typeof config !== "object")) {
            throw new Error("'config' is a required parameter and must be of type: 'object'.");
        }
        if (!config.endpoint || (config.endpoint && typeof config.endpoint !== "string")) {
            throw new Error("'endpoint' is a required property of the ConnectionConfig.");
        }
        if (!config.entityPath || (config.entityPath && typeof config.entityPath !== "string")) {
            throw new Error("'entityPath' is a required property of the ConnectionConfig.");
        }
        if (!config.sharedAccessKeyName || (config.sharedAccessKeyName && typeof config.sharedAccessKeyName !== "string")) {
            throw new Error("'sharedAccessKeyName' is a required property of the ConnectionConfig.");
        }
        if (!config.sharedAccessKey || (config.sharedAccessKey && typeof config.sharedAccessKey !== "string")) {
            throw new Error("'sharedAccessKey' is a required property of the ConnectionConfig.");
        }
    }
    ConnectionConfig.validate = validate;
})(ConnectionConfig = exports.ConnectionConfig || (exports.ConnectionConfig = {}));
//# sourceMappingURL=connectionConfig.js.map