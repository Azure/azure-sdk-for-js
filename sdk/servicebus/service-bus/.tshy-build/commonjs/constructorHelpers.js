"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEndpoint = parseEndpoint;
exports.createConnectionContext = createConnectionContext;
exports.createConnectionContextForConnectionString = createConnectionContextForConnectionString;
exports.createConnectionContextForCredential = createConnectionContextForCredential;
exports.getEntityNameFromConnectionString = getEntityNameFromConnectionString;
const core_amqp_1 = require("@azure/core-amqp");
const core_auth_1 = require("@azure/core-auth");
const connectionContext_js_1 = require("./connectionContext.js");
const connectionStringUtils_js_1 = require("./util/connectionStringUtils.js");
// TODO: extract parseEndpoint and setCustomEndpointAddress into core-amqp
// ConnectionConfig so that it can be shared between Event Hubs and Service Bus
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
/**
 * Updates the provided ConnectionConfig to use the custom endpoint address.
 * @param config - An existing connection configuration to be updated.
 * @param customEndpointAddress - The custom endpoint address to use.
 */
function setCustomEndpointAddress(config, customEndpointAddress) {
    // The amqpHostname should match the host prior to using the custom endpoint.
    config.amqpHostname = config.host;
    const { hostname, port } = parseEndpoint(customEndpointAddress);
    // Since we specify the port separately, set host to the customEndpointAddress hostname.
    config.host = hostname;
    if (port) {
        config.port = parseInt(port, 10);
    }
}
/**
 * @internal
 *
 */
function createConnectionContext(connectionString, credential, options) {
    var _a, _b;
    const config = core_amqp_1.ConnectionConfig.create(connectionString);
    config.webSocket = (_a = options === null || options === void 0 ? void 0 : options.webSocketOptions) === null || _a === void 0 ? void 0 : _a.webSocket;
    config.webSocketEndpointPath = "$servicebus/websocket";
    config.webSocketConstructorOptions = (_b = options === null || options === void 0 ? void 0 : options.webSocketOptions) === null || _b === void 0 ? void 0 : _b.webSocketConstructorOptions;
    if (options === null || options === void 0 ? void 0 : options.customEndpointAddress) {
        setCustomEndpointAddress(config, options.customEndpointAddress);
    }
    return connectionContext_js_1.ConnectionContext.create(config, credential, options);
}
/**
 * @internal
 */
function createConnectionContextForConnectionString(connectionString, options = {}) {
    const parsed = (0, connectionStringUtils_js_1.parseServiceBusConnectionString)(connectionString);
    const sasTokenProvider = (0, core_amqp_1.createSasTokenProvider)(parsed);
    return createConnectionContext(connectionString, sasTokenProvider, options);
}
/**
 *
 * @internal
 */
function createConnectionContextForCredential(credential, host, options = {}) {
    if (typeof host !== "string") {
        throw new TypeError("`host` parameter is not a string");
    }
    let tokenProvider;
    // host, credential and options based constructor was invoked
    if (!host.endsWith("/")) {
        host += "/";
    }
    if ((0, core_auth_1.isNamedKeyCredential)(credential) || (0, core_auth_1.isSASCredential)(credential)) {
        tokenProvider = (0, core_amqp_1.createSasTokenProvider)(credential);
    }
    else {
        tokenProvider = credential;
    }
    const connectionString = `Endpoint=sb://${host};SharedAccessKeyName=defaultKeyName;SharedAccessKey=defaultKeyValue;`;
    return createConnectionContext(connectionString, tokenProvider, options);
}
/**
 * Parses a connection string and extracts the EntityPath named entity out.
 * @param connectionString - An entity specific Service Bus connection string.
 * @internal
 */
function getEntityNameFromConnectionString(connectionString) {
    const entityPathMatch = connectionString.match(/^.+EntityPath=(.+?);{0,1}$/);
    if (entityPathMatch != null && entityPathMatch.length === 2) {
        return entityPathMatch[1];
    }
    else {
        throw new Error("No entity name present in the connection string");
    }
}
//# sourceMappingURL=constructorHelpers.js.map