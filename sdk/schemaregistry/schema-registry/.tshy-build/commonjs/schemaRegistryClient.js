"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaRegistryClient = void 0;
exports.default = createClient;
const operations_js_1 = require("./operations.js");
const core_client_1 = require("@azure-rest/core-client");
const logger_js_1 = require("./logger.js");
const core_tracing_1 = require("@azure/core-tracing");
const constants_js_1 = require("./constants.js");
/**
 * Initialize a new instance of `SchemaRegistryClient`
 * @param fullyQualifiedNamespace - The Schema Registry service endpoint, for example 'my-namespace.servicebus.windows.net'.
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
function createClient(fullyQualifiedNamespace, credentials, options = {}) {
    var _a, _b, _c, _d, _e, _f;
    const baseUrl = (_a = options.baseUrl) !== null && _a !== void 0 ? _a : `${fullyQualifiedNamespace}`;
    options.apiVersion = (_b = options.apiVersion) !== null && _b !== void 0 ? _b : "2023-07-01";
    const userAgentInfo = `azsdk-js-schema-registry/${constants_js_1.SDK_VERSION}`;
    const userAgentPrefix = options.userAgentOptions && options.userAgentOptions.userAgentPrefix
        ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
        : `${userAgentInfo}`;
    options = Object.assign(Object.assign({}, options), { userAgentOptions: {
            userAgentPrefix,
        }, loggingOptions: {
            logger: (_d = (_c = options.loggingOptions) === null || _c === void 0 ? void 0 : _c.logger) !== null && _d !== void 0 ? _d : logger_js_1.logger.info,
        }, credentials: {
            scopes: (_f = (_e = options.credentials) === null || _e === void 0 ? void 0 : _e.scopes) !== null && _f !== void 0 ? _f : [constants_js_1.DEFAULT_SCOPE],
        } });
    const client = (0, core_client_1.getClient)(baseUrl, credentials, options);
    return client;
}
/**
 * Client for Azure Schema Registry service.
 */
class SchemaRegistryClient {
    /**
     * Creates a new client for Azure Schema Registry service.
     *
     * @param fullyQualifiedNamespace - The Schema Registry service qualified namespace URL, for example
     *                                  https://mynamespace.servicebus.windows.net.
     * @param credential - Credential to authenticate requests to the service.
     * @param options - Options to configure API requests to the service.
     */
    constructor(fullyQualifiedNamespace, credential, options = {}) {
        this._tracing = (0, core_tracing_1.createTracingClient)({
            namespace: "Microsoft.EventHub",
            packageName: "@azure/schema-registry",
            packageVersion: constants_js_1.SDK_VERSION,
        });
        this._client = createClient(fullyQualifiedNamespace, credential, Object.assign({}, options));
        this.fullyQualifiedNamespace = fullyQualifiedNamespace;
    }
    /**
     * Registers a new schema and returns its ID.
     *
     * If schema of specified name does not exist in the specified group, a schema
     * is created at version 1. If schema of specified name exists already in
     * specified group, schema is created at latest version + 1.
     *
     * @param schema - Schema to register.
     * @returns Registered schema's ID.
     */
    registerSchema(schema, options = {}) {
        return this._tracing.withSpan("SchemaRegistryClient.registerSchema", options, (updatedOptions) => (0, operations_js_1.registerSchema)(this._client, schema, updatedOptions));
    }
    /**
     * Gets the ID of an existing schema with matching name, group, type, and
     * definition.
     *
     * @param schema - Schema to match.
     * @returns Matched schema's ID.
     */
    getSchemaProperties(schema, options = {}) {
        return this._tracing.withSpan("SchemaRegistryClient.getSchemaProperties", options, (updatedOptions) => (0, operations_js_1.getSchemaProperties)(this._client, schema, updatedOptions));
    }
    // implementation
    getSchema(nameOrId, groupNameOrOptions, version, options = {}) {
        if (typeof groupNameOrOptions !== "string" && version === undefined) {
            return this._tracing.withSpan("SchemaRegistryClient.getSchema", groupNameOrOptions !== null && groupNameOrOptions !== void 0 ? groupNameOrOptions : {}, (updatedOptions) => (0, operations_js_1.getSchemaById)(this._client, nameOrId, updatedOptions));
        }
        return this._tracing.withSpan("SchemaRegistryClient.getSchema", options, (updatedOptions) => (0, operations_js_1.getSchemaByVersion)(this._client, groupNameOrOptions, nameOrId, version, updatedOptions));
    }
}
exports.SchemaRegistryClient = SchemaRegistryClient;
//# sourceMappingURL=schemaRegistryClient.js.map