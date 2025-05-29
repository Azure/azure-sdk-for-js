// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Connection, generate_uuid, } from "rhea-promise";
import { getFrameworkInfo, getPlatformInfo } from "./util/runtimeInfo.js";
import { CbsClient } from "./cbs.js";
import { ConnectionConfig } from "./connectionConfig/connectionConfig.js";
import { Constants } from "./util/constants.js";
import { isNodeLike } from "@azure/core-util";
const maxListenerLimit = 1000;
class CoreAmqpConnection extends Connection {
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
export const ConnectionContextBase = {
    /**
     * Creates the base connection context.
     * @param parameters - Parameters to be provided to create
     * the base connection context.
     */
    create(parameters) {
        var _a, _b, _c;
        ConnectionConfig.validate(parameters.config, {
            isEntityPathRequired: parameters.isEntityPathRequired || false,
        });
        const userAgent = parameters.connectionProperties.userAgent;
        if (userAgent.length > Constants.maxUserAgentLength) {
            throw new Error(`The user-agent string cannot be more than ${Constants.maxUserAgentLength} characters in length.` +
                `The given user-agent string is: ${userAgent} with length: ${userAgent.length}`);
        }
        const connectionOptions = {
            transport: (parameters.config.useDevelopmentEmulator ? Constants.TCP : Constants.TLS),
            host: parameters.config.host,
            hostname: (_a = parameters.config.amqpHostname) !== null && _a !== void 0 ? _a : parameters.config.host,
            username: parameters.config.sharedAccessKeyName,
            port: (_b = parameters.config.port) !== null && _b !== void 0 ? _b : (parameters.config.useDevelopmentEmulator ? 5672 : 5671),
            reconnect: false,
            properties: {
                product: parameters.connectionProperties.product,
                version: parameters.connectionProperties.version,
                "user-agent": userAgent,
                platform: getPlatformInfo(),
                framework: getFrameworkInfo(),
            },
            idle_time_out: Constants.defaultConnectionIdleTimeoutInMs,
            operationTimeoutInSeconds: parameters.operationTimeoutInMs
                ? parameters.operationTimeoutInMs / 1000
                : undefined,
        };
        if (parameters.config.webSocket ||
            (!isNodeLike && typeof self !== "undefined" && self.WebSocket)) {
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
        const connectionLock = `${Constants.establishConnection}-${generate_uuid()}`;
        const connectionContextBase = {
            wasConnectionCloseCalled: false,
            connectionLock: connectionLock,
            negotiateClaimLock: `${Constants.negotiateClaim}-${generate_uuid()}`,
            connection: connection,
            connectionId: connection.id,
            cbsSession: new CbsClient(connection, connectionLock),
            config: parameters.config,
            refreshConnection() {
                const newConnection = new CoreAmqpConnection(connectionOptions);
                const newConnectionLock = `${Constants.establishConnection}-${generate_uuid()}`;
                this.wasConnectionCloseCalled = false;
                this.connectionLock = newConnectionLock;
                this.negotiateClaimLock = `${Constants.negotiateClaim} - ${generate_uuid()}`;
                this.connection = newConnection;
                this.connectionId = newConnection.id;
                this.cbsSession = new CbsClient(newConnection, newConnectionLock);
            },
        };
        return connectionContextBase;
    },
};
//# sourceMappingURL=ConnectionContextBase.js.map