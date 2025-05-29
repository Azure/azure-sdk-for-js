"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionContextBase = void 0;
const rhea_promise_1 = require("rhea-promise");
const runtimeInfo_js_1 = require("./util/runtimeInfo.js");
const cbs_js_1 = require("./cbs.js");
const connectionConfig_js_1 = require("./connectionConfig/connectionConfig.js");
const constants_js_1 = require("./util/constants.js");
const core_util_1 = require("@azure/core-util");
const maxListenerLimit = 1000;
class CoreAmqpConnection extends rhea_promise_1.Connection {
    /**
     * Creates an amqp sender link. Max listener limit on the sender is set to 1000 because the
     * default value of 10 in NodeJS is too low.
     * @param options - Optional parameters to create a sender link.
     * @returns Promise<Sender>.
     */
    async createSender(options) {
        const sender = await super.createSender(options);
        sender.setMaxListeners(maxListenerLimit);
        return sender;
    }
    /**
     * Creates an awaitable amqp sender. Max listener limit on the sender is set to 1000 because the
     * default value of 10 in NodeJS is too low.
     * @param options - Optional parameters to create an awaitable sender link.
     * - If `onError` and `onSessionError` handlers are not provided then the `AwaitableSender` will
     * clear the timer and reject the Promise for all the entries of inflight send operation in its
     * `deliveryDispositionMap`.
     * - If the user is handling the reconnection of sender link or the underlying connection in it's
     * app, then the `onError` and `onSessionError` handlers must be provided by the user and (s)he
     * shall be responsible of clearing the `deliveryDispositionMap` of inflight `send()` operation.
     *
     * @returns Promise<AwaitableSender>.
     */
    async createAwaitableSender(options) {
        const sender = await super.createAwaitableSender(options);
        sender.setMaxListeners(maxListenerLimit);
        return sender;
    }
    /**
     * Creates an amqp receiver link. Max listener limit on the sender is set to 1000 because the
     * default value of 10 in NodeJS is too low.
     * @param options - Optional parameters to create a receiver link.
     * @returns Promise<Receiver>.
     */
    async createReceiver(options) {
        const receiver = await super.createReceiver(options);
        receiver.setMaxListeners(maxListenerLimit);
        return receiver;
    }
}
// eslint-disable-next-line @typescript-eslint/no-redeclare -- renaming constant would be a breaking change.
exports.ConnectionContextBase = {
    /**
     * Creates the base connection context.
     * @param parameters - Parameters to be provided to create
     * the base connection context.
     */
    create(parameters) {
        var _a, _b, _c;
        connectionConfig_js_1.ConnectionConfig.validate(parameters.config, {
            isEntityPathRequired: parameters.isEntityPathRequired || false,
        });
        const userAgent = parameters.connectionProperties.userAgent;
        if (userAgent.length > constants_js_1.Constants.maxUserAgentLength) {
            throw new Error(`The user-agent string cannot be more than ${constants_js_1.Constants.maxUserAgentLength} characters in length.` +
                `The given user-agent string is: ${userAgent} with length: ${userAgent.length}`);
        }
        const connectionOptions = {
            transport: (parameters.config.useDevelopmentEmulator ? constants_js_1.Constants.TCP : constants_js_1.Constants.TLS),
            host: parameters.config.host,
            hostname: (_a = parameters.config.amqpHostname) !== null && _a !== void 0 ? _a : parameters.config.host,
            username: parameters.config.sharedAccessKeyName,
            port: (_b = parameters.config.port) !== null && _b !== void 0 ? _b : (parameters.config.useDevelopmentEmulator ? 5672 : 5671),
            reconnect: false,
            properties: {
                product: parameters.connectionProperties.product,
                version: parameters.connectionProperties.version,
                "user-agent": userAgent,
                platform: (0, runtimeInfo_js_1.getPlatformInfo)(),
                framework: (0, runtimeInfo_js_1.getFrameworkInfo)(),
            },
            idle_time_out: constants_js_1.Constants.defaultConnectionIdleTimeoutInMs,
            operationTimeoutInSeconds: parameters.operationTimeoutInMs
                ? parameters.operationTimeoutInMs / 1000
                : undefined,
        };
        if (parameters.config.webSocket ||
            (!core_util_1.isNodeLike && typeof self !== "undefined" && self.WebSocket)) {
            const socket = parameters.config.webSocket || self.WebSocket;
            const host = parameters.config.host;
            const endpoint = parameters.config.webSocketEndpointPath || "";
            const socketOptions = parameters.config.webSocketConstructorOptions || {};
            const port = (_c = parameters.config.port) !== null && _c !== void 0 ? _c : 443;
            connectionOptions.webSocketOptions = {
                webSocket: socket,
                url: `wss://${host}:${port}/${endpoint}`,
                protocol: ["AMQPWSB10"],
                options: socketOptions,
            };
        }
        const connection = new CoreAmqpConnection(connectionOptions);
        const connectionLock = `${constants_js_1.Constants.establishConnection}-${(0, rhea_promise_1.generate_uuid)()}`;
        const connectionContextBase = {
            wasConnectionCloseCalled: false,
            connectionLock: connectionLock,
            negotiateClaimLock: `${constants_js_1.Constants.negotiateClaim}-${(0, rhea_promise_1.generate_uuid)()}`,
            connection: connection,
            connectionId: connection.id,
            cbsSession: new cbs_js_1.CbsClient(connection, connectionLock),
            config: parameters.config,
            refreshConnection() {
                const newConnection = new CoreAmqpConnection(connectionOptions);
                const newConnectionLock = `${constants_js_1.Constants.establishConnection}-${(0, rhea_promise_1.generate_uuid)()}`;
                this.wasConnectionCloseCalled = false;
                this.connectionLock = newConnectionLock;
                this.negotiateClaimLock = `${constants_js_1.Constants.negotiateClaim} - ${(0, rhea_promise_1.generate_uuid)()}`;
                this.connection = newConnection;
                this.connectionId = newConnection.id;
                this.cbsSession = new cbs_js_1.CbsClient(newConnection, newConnectionLock);
            },
        };
        return connectionContextBase;
    },
};
//# sourceMappingURL=ConnectionContextBase.js.map