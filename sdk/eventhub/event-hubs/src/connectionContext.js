// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ConnectionEvents } from "rhea-promise";
import { ConnectionConfig, ConnectionContextBase, Constants, createSasTokenProvider, } from "@azure/core-amqp";
import { parseEventHubConnectionString } from "./util/connectionStringUtils.js";
import { ManagementClient } from "./managementClient.js";
import { isNamedKeyCredential, isSASCredential } from "@azure/core-auth";
import { logErrorStackTrace, logger } from "./logger.js";
import { EventHubConnectionConfig } from "./eventhubConnectionConfig.js";
import { getRuntimeInfo } from "./util/runtimeInfo.js";
import { isCredential } from "./util/typeGuards.js";
import { packageJsonInfo } from "./util/constants.js";
import { createAbortablePromise } from "@azure/core-util";
/**
 * @internal
 */
export var ConnectionContext;
(function (ConnectionContext) {
    /**
     * The user agent string for the EventHubs client.
     * See guideline at https://github.com/Azure/azure-sdk/blob/main/docs/design/Telemetry.mdk
     */
    const userAgent = `azsdk-js-azureeventhubs/${packageJsonInfo.version} (${getRuntimeInfo()})`;
    function getUserAgent(options) {
        const finalUserAgent = options.userAgent ? `${userAgent},${options.userAgent}` : userAgent;
        if (finalUserAgent.length > Constants.maxUserAgentLength) {
            throw new Error(`The user-agent string cannot be more than ${Constants.maxUserAgentLength} characters in length.` +
                `The given user-agent string is: ${finalUserAgent} with length: ${finalUserAgent.length}`);
        }
        return finalUserAgent;
    }
    ConnectionContext.getUserAgent = getUserAgent;
    function create(config, tokenCredential, options) {
        if (!options)
            options = {};
        config.webSocket = options.webSocketOptions && options.webSocketOptions.webSocket;
        config.webSocketEndpointPath = "$servicebus/websocket";
        config.webSocketConstructorOptions =
            options.webSocketOptions && options.webSocketOptions.webSocketConstructorOptions;
        const parameters = {
            config: config,
            // re-enabling this will be a post-GA discussion.
            // dataTransformer: options.dataTransformer,
            isEntityPathRequired: true,
            connectionProperties: {
                product: "MSJSClient",
                userAgent: getUserAgent(options),
                version: packageJsonInfo.version,
            },
        };
        // Let us create the base context and then add EventHub specific ConnectionContext properties.
        const connectionContext = ConnectionContextBase.create(parameters);
        connectionContext.tokenCredential = tokenCredential;
        connectionContext.wasConnectionCloseCalled = false;
        connectionContext.senders = {};
        connectionContext.receivers = {};
        const mOptions = {
            address: options.managementSessionAddress,
            audience: options.managementSessionAudience,
        };
        connectionContext.managementSession = new ManagementClient(connectionContext, mOptions);
        let waitForConnectionRefreshResolve;
        let waitForConnectionRefreshPromise;
        Object.assign(connectionContext, {
            isConnectionClosing() {
                // When the connection is not open, but the remote end is open,
                // then the rhea connection is in the process of terminating.
                return Boolean(!this.connection.isOpen() && this.connection.isRemoteOpen());
            },
            async readyToOpenLink(optionsArg) {
                // Check that the connection isn't in the process of closing.
                // This can happen when the idle timeout has been reached but
                // the underlying socket is waiting to be destroyed.
                if (this.isConnectionClosing()) {
                    // Wait for the disconnected event that indicates the underlying socket has closed.
                    await this.waitForDisconnectedEvent(optionsArg);
                }
                // Wait for the connection to be reset.
                await this.waitForConnectionReset();
            },
            waitForDisconnectedEvent(optionsArg) {
                return createAbortablePromise((resolve) => {
                    logger.verbose(`[${this.connectionId}] Attempting to reinitialize connection` +
                        ` but the connection is in the process of closing.` +
                        ` Waiting for the disconnect event before continuing.`);
                    this.connection.once(ConnectionEvents.disconnected, resolve);
                }, optionsArg);
            },
            waitForConnectionReset() {
                // Check if the connection is currently in the process of disconnecting.
                if (waitForConnectionRefreshPromise) {
                    return waitForConnectionRefreshPromise;
                }
                return Promise.resolve();
            },
            async close() {
                try {
                    if (this.connection.isOpen()) {
                        // Close all the senders.
                        await Promise.all(Object.keys(connectionContext.senders).map((name) => connectionContext.senders[name]?.close().catch(() => {
                            /* error already logged, swallow it here */
                        })));
                        // Close all the receivers.
                        await Promise.all(Object.keys(connectionContext.receivers).map((name) => connectionContext.receivers[name]?.close().catch(() => {
                            /* error already logged, swallow it here */
                        })));
                        // Close the cbs session;
                        await this.cbsSession.close();
                        // Close the management session
                        await this.managementSession?.close();
                        await this.connection.close();
                        this.wasConnectionCloseCalled = true;
                        logger.info("Closed the amqp connection '%s' on the client.", this.connectionId);
                    }
                }
                catch (err) {
                    const errorDescription = err instanceof Error ? `${err.name}: ${err.message}` : JSON.stringify(err);
                    logger.warning(`An error occurred while closing the connection "${this.connectionId}":\n${errorDescription}`);
                    logErrorStackTrace(err);
                    throw err;
                }
            },
        });
        // Define listeners to be added to the connection object for
        // "connection_open" and "connection_error" events.
        const onConnectionOpen = () => {
            connectionContext.wasConnectionCloseCalled = false;
            logger.verbose("[%s] setting 'wasConnectionCloseCalled' property of connection context to %s.", connectionContext.connection.id, connectionContext.wasConnectionCloseCalled);
        };
        async function handleDisconnection(context) {
            if (waitForConnectionRefreshPromise) {
                return;
            }
            waitForConnectionRefreshPromise = new Promise((resolve) => {
                waitForConnectionRefreshResolve = resolve;
            });
            try {
                logger.verbose("[%s] 'disconnected' event occurred on the amqp connection.", connectionContext.connection.id);
                if (context.connection && context.connection.error) {
                    logger.verbose("[%s] Accompanying error on the context.connection: %O", connectionContext.connection.id, context.connection.error);
                }
                if (context.error) {
                    logger.verbose("[%s] Accompanying error on the context: %O", connectionContext.connection.id, context.error);
                }
                const state = {
                    wasConnectionCloseCalled: connectionContext.wasConnectionCloseCalled,
                    numSenders: Object.keys(connectionContext.senders).length,
                    numReceivers: Object.keys(connectionContext.receivers).length,
                };
                logger.verbose("[%s] Closing all open senders and receivers in the state: %O", connectionContext.connection.id, state);
                // Clear internal map maintained by rhea to avoid reconnecting of old links once the
                // connection is back up.
                connectionContext.connection.removeAllSessions();
                // Close the cbs session to ensure all the event handlers are released.
                await connectionContext.cbsSession?.close().catch(() => {
                    /* error already logged, swallow it here */
                });
                // Close the management session to ensure all the event handlers are released.
                await connectionContext.managementSession?.close().catch(() => {
                    /* error already logged, swallow it here */
                });
                // Close all senders and receivers to ensure clean up of timers & other resources.
                if (state.numSenders || state.numReceivers) {
                    await Promise.all(Object.keys(connectionContext.senders).map((name) => connectionContext.senders[name]?.close().catch(() => {
                        /* error already logged, swallow it here */
                    })));
                    await Promise.all(Object.keys(connectionContext.receivers).map((name) => connectionContext.receivers[name]?.close().catch(() => {
                        /* error already logged, swallow it here */
                    })));
                }
            }
            catch (err) {
                logger.verbose(`[${connectionContext.connectionId}] An error occurred while closing the connection in 'disconnected'. %O`, err);
            }
            try {
                await refreshConnection(connectionContext);
            }
            catch (err) {
                logger.verbose(`[${connectionContext.connectionId}] An error occurred while refreshing the connection in 'disconnected'. %O`, err);
            }
            finally {
                waitForConnectionRefreshResolve();
                waitForConnectionRefreshPromise = undefined;
            }
        }
        const onDisconnected = (context) => {
            // Fire-and-forget async operation with error handling
            handleDisconnection(context).catch((err) => {
                logger.verbose(`[${connectionContext.connectionId}] Unhandled error in 'disconnected' event handler. %O`, err);
            });
        };
        const protocolError = (context) => {
            logger.verbose("[%s] 'protocol_error' event occurred on the amqp connection.", connectionContext.connection.id);
            if (context.connection && context.connection.error) {
                logger.verbose("[%s] Accompanying error on the context.connection: %O", connectionContext.connection.id, context.connection && context.connection.error);
            }
            if (context.error) {
                logger.verbose("[%s] Accompanying error on the context: %O", connectionContext.connection.id, context.error);
            }
        };
        const error = (context) => {
            logger.verbose("[%s] 'error' event occurred on the amqp connection.", connectionContext.connection.id);
            if (context.connection && context.connection.error) {
                logger.verbose("[%s] Accompanying error on the context.connection: %O", connectionContext.connection.id, context.connection && context.connection.error);
            }
            if (context.error) {
                logger.verbose("[%s] Accompanying error on the context: %O", connectionContext.connection.id, context.error);
            }
        };
        function addConnectionListeners(connection) {
            // Add listeners on the connection object.
            connection.on(ConnectionEvents.connectionOpen, onConnectionOpen);
            connection.on(ConnectionEvents.disconnected, onDisconnected);
            connection.on(ConnectionEvents.protocolError, protocolError);
            connection.on(ConnectionEvents.error, error);
        }
        function cleanConnectionContext(context) {
            // Remove listeners from the connection object.
            context.connection.removeListener(ConnectionEvents.connectionOpen, onConnectionOpen);
            context.connection.removeListener(ConnectionEvents.disconnected, onDisconnected);
            context.connection.removeListener(ConnectionEvents.protocolError, protocolError);
            context.connection.removeListener(ConnectionEvents.error, error);
            // Close the connection
            return context.connection.close();
        }
        async function refreshConnection(context) {
            const originalConnectionId = context.connectionId;
            try {
                await cleanConnectionContext(context);
            }
            catch (err) {
                logger.verbose(`[${context.connectionId}] There was an error closing the connection before reconnecting: %O`, err);
            }
            // Create a new connection, id, locks, and cbs client.
            context.refreshConnection();
            addConnectionListeners(context.connection);
            logger.verbose(`The connection "${originalConnectionId}" has been updated to "${context.connectionId}".`);
        }
        addConnectionListeners(connectionContext.connection);
        logger.verbose("[%s] Created connection context successfully.", connectionContext.connectionId);
        return connectionContext;
    }
    ConnectionContext.create = create;
})(ConnectionContext || (ConnectionContext = {}));
/**
 * Helper method to create a ConnectionContext from the input passed to either
 * EventHubProducerClient or EventHubConsumerClient constructors
 *
 * @internal
 */
export function createConnectionContext(hostOrConnectionString, eventHubNameOrOptions, credentialOrOptions, options) {
    let connectionString;
    let config;
    let credential;
    hostOrConnectionString = String(hostOrConnectionString);
    if (!isCredential(credentialOrOptions)) {
        const parsedCS = parseEventHubConnectionString(hostOrConnectionString);
        if (!(parsedCS.eventHubName ||
            (typeof eventHubNameOrOptions === "string" && eventHubNameOrOptions))) {
            throw new TypeError(`Either provide "eventHubName" or the "connectionString": "${hostOrConnectionString}", ` +
                `must contain "EntityPath=<your-event-hub-name>".`);
        }
        if (parsedCS.eventHubName &&
            typeof eventHubNameOrOptions === "string" &&
            eventHubNameOrOptions &&
            parsedCS.eventHubName !== eventHubNameOrOptions) {
            throw new TypeError(`The entity path "${parsedCS.eventHubName}" in connectionString: "${hostOrConnectionString}" ` +
                `doesn't match with eventHubName: "${eventHubNameOrOptions}".`);
        }
        connectionString = hostOrConnectionString;
        if (typeof eventHubNameOrOptions !== "string") {
            // connectionstring and/or options were passed to constructor
            config = EventHubConnectionConfig.create(connectionString);
            options = eventHubNameOrOptions;
        }
        else {
            // connectionstring, eventHubName and/or options were passed to constructor
            const eventHubName = eventHubNameOrOptions;
            config = EventHubConnectionConfig.create(connectionString, eventHubName);
            options = credentialOrOptions;
        }
        const parsed = parseEventHubConnectionString(connectionString);
        // Since connectionString was passed, create a TokenProvider.
        credential = createSasTokenProvider(parsed);
    }
    else {
        // host, eventHubName, a TokenCredential and/or options were passed to constructor
        const eventHubName = eventHubNameOrOptions;
        let host = hostOrConnectionString;
        if (isNamedKeyCredential(credentialOrOptions) || isSASCredential(credentialOrOptions)) {
            credential = createSasTokenProvider(credentialOrOptions);
        }
        else {
            credential = credentialOrOptions;
        }
        if (!eventHubName) {
            throw new TypeError(`"eventHubName" is missing`);
        }
        if (!host.endsWith("/"))
            host += "/";
        connectionString = `Endpoint=sb://${host};SharedAccessKeyName=defaultKeyName;SharedAccessKey=defaultKeyValue;EntityPath=${eventHubName}`;
        config = EventHubConnectionConfig.create(connectionString);
    }
    if (options?.customEndpointAddress) {
        EventHubConnectionConfig.setCustomEndpointAddress(config, options.customEndpointAddress);
    }
    ConnectionConfig.validate(config);
    return ConnectionContext.create(config, credential, options);
}
//# sourceMappingURL=connectionContext.js.map