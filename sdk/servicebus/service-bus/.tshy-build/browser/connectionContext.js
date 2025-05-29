// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { connectionLogger as logger } from "./log.js";
import { packageJsonInfo } from "./util/constants.js";
import { ConnectionContextBase } from "@azure/core-amqp";
import { ConnectionEvents } from "rhea-promise";
import { ManagementClient } from "./core/managementClient.js";
import { formatUserAgentPrefix } from "./util/utils.js";
import { getRuntimeInfo } from "./util/runtimeInfo.js";
import { ServiceBusError } from "./serviceBusError.js";
/**
 * @internal
 * Helper method to call onDetached on the non-sessions batching and streaming receivers from the connection context upon seeing an error.
 */
async function callOnDetachedOnReceivers(connectionContext, contextOrConnectionError, receiverType) {
    const detachCalls = [];
    // Iterating over non-sessions batching and streaming receivers
    for (const receiverName of Object.keys(connectionContext.messageReceivers)) {
        const receiver = connectionContext.messageReceivers[receiverName];
        if (receiver && receiver.receiverType === receiverType) {
            logger.verbose("[%s] calling detached on %s receiver '%s'.", connectionContext.connection.id, receiver.receiverType, receiver.name);
            detachCalls.push(receiver.onDetached(contextOrConnectionError).catch((err) => {
                logger.logError(err, "[%s] An error occurred while calling onDetached() on the %s receiver '%s'", connectionContext.connection.id, receiver.receiverType, receiver.name);
            }));
        }
    }
    return Promise.all(detachCalls);
}
/**
 * @internal
 * Helper method to call onDetached on the session receivers from the connection context upon seeing an error.
 */
async function callOnDetachedOnSessionReceivers(connectionContext, contextOrConnectionError) {
    const getSessionError = (sessionId, entityPath) => {
        const sessionInfo = `The receiver for session "${sessionId}" in "${entityPath}" has been closed and can no longer be used. ` +
            `Please create a new receiver using the "acceptSession" or "acceptNextSession" method on the ServiceBusClient.`;
        const errorMessage = contextOrConnectionError == null
            ? `Unknown error occurred on the AMQP connection while receiving messages. ` + sessionInfo
            : `Error occurred on the AMQP connection while receiving messages. ` +
                sessionInfo +
                `\nMore info - \n${contextOrConnectionError}`;
        const error = new ServiceBusError(errorMessage, "SessionLockLost");
        error.retryable = false;
        return error;
    };
    const detachCalls = [];
    for (const receiverName of Object.keys(connectionContext.messageSessions)) {
        const receiver = connectionContext.messageSessions[receiverName];
        logger.verbose("[%s] calling detached on %s receiver(sessions).", connectionContext.connection.id, receiver.name);
        detachCalls.push(receiver.onDetached(getSessionError(receiver.sessionId, receiver.entityPath)).catch((err) => {
            logger.logError(err, "[%s] An error occurred while calling onDetached() on the session receiver(sessions) '%s'", connectionContext.connection.id, receiver.name);
        }));
    }
    return Promise.all(detachCalls);
}
/**
 * @internal
 * Helper method to get the number of receivers of specified type from the connectionContext.
 */
function getNumberOfReceivers(connectionContext, receiverType) {
    if (receiverType === "session") {
        const receivers = connectionContext.messageSessions;
        return Object.keys(receivers).length;
    }
    const receivers = connectionContext.messageReceivers;
    const receiverNames = Object.keys(receivers);
    const count = receiverNames.reduce((acc, name) => (receivers[name].receiverType === receiverType ? ++acc : acc), 0);
    return count;
}
/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export var ConnectionContext;
(function (ConnectionContext) {
    function create(config, tokenCredential, options) {
        var _a;
        if (!options)
            options = {};
        const userAgent = `${formatUserAgentPrefix((_a = options.userAgentOptions) === null || _a === void 0 ? void 0 : _a.userAgentPrefix)} ${getRuntimeInfo()}`;
        const parameters = {
            config: config,
            // re-enabling this will be a post-GA discussion similar to event-hubs.
            // dataTransformer: options.dataTransformer,
            isEntityPathRequired: false,
            connectionProperties: {
                product: "MSJSClient",
                userAgent,
                version: packageJsonInfo.version,
            },
        };
        // Let us create the base context and then add ServiceBus specific ConnectionContext properties.
        const connectionContext = ConnectionContextBase.create(parameters);
        connectionContext.tokenCredential = tokenCredential;
        connectionContext.senders = {};
        connectionContext.messageReceivers = {};
        connectionContext.messageSessions = {};
        connectionContext.managementClients = {};
        let waitForConnectionRefreshResolve;
        let waitForConnectionRefreshPromise;
        Object.assign(connectionContext, {
            isConnectionClosing() {
                // When the connection is not open, but the remote end is open,
                // then the rhea connection is in the process of terminating.
                return Boolean(!this.connection.isOpen() && this.connection.isRemoteOpen());
            },
            async readyToOpenLink() {
                logger.verbose(`[${this.connectionId}] Waiting until the connection is ready to open link.`);
                // Check that the connection isn't in the process of closing.
                // This can happen when the idle timeout has been reached but
                // the underlying socket is waiting to be destroyed.
                if (this.isConnectionClosing()) {
                    logger.verbose(`[${this.connectionId}] Connection is closing, waiting for disconnected event`);
                    // Wait for the disconnected event that indicates the underlying socket has closed.
                    await this.waitForDisconnectedEvent();
                }
                // Wait for the connection to be reset.
                await this.waitForConnectionReset();
                logger.verbose(`[${this.connectionId}] Connection is ready to open link.`);
            },
            waitForDisconnectedEvent() {
                return new Promise((resolve) => {
                    logger.verbose(`[${this.connectionId}] Attempting to reinitialize connection` +
                        ` but the connection is in the process of closing.` +
                        ` Waiting for the disconnect event before continuing.`);
                    this.connection.once(ConnectionEvents.disconnected, resolve);
                });
            },
            waitForConnectionReset() {
                // Check if the connection is currently in the process of disconnecting.
                if (waitForConnectionRefreshPromise) {
                    logger.verbose(`[${this.connectionId}] Waiting for connection reset`);
                    return waitForConnectionRefreshPromise;
                }
                logger.verbose(`[${this.connectionId}] Connection not waiting to be reset. Resolving immediately.`);
                return Promise.resolve();
            },
            getReceiverFromCache(receiverName, sessionId) {
                if (sessionId != null && this.messageSessions[receiverName]) {
                    return this.messageSessions[receiverName];
                }
                if (this.messageReceivers[receiverName]) {
                    return this.messageReceivers[receiverName];
                }
                let existingReceivers = "";
                if (sessionId != null) {
                    for (const messageSessionName of Object.keys(this.messageSessions)) {
                        if (this.messageSessions[messageSessionName].sessionId === sessionId) {
                            existingReceivers = this.messageSessions[messageSessionName].name;
                            break;
                        }
                    }
                }
                else {
                    existingReceivers +=
                        (existingReceivers ? ", " : "") + Object.keys(this.messageReceivers).join(",");
                }
                logger.verbose("[%s] Failed to find receiver '%s' among existing receivers: %s", this.connectionId, receiverName, existingReceivers);
                return;
            },
            getManagementClient(entityPath) {
                if (!this.managementClients[entityPath]) {
                    this.managementClients[entityPath] = new ManagementClient(this, entityPath, {
                        address: `${entityPath}/$management`,
                    });
                }
                return this.managementClients[entityPath];
            },
        });
        // Define listeners to be added to the connection object for
        // "connection_open" and "connection_error" events.
        const onConnectionOpen = () => {
            connectionContext.wasConnectionCloseCalled = false;
            logger.verbose("[%s] setting 'wasConnectionCloseCalled' property of connection context to %s.", connectionContext.connection.id, connectionContext.wasConnectionCloseCalled);
        };
        const disconnected = async (context) => {
            if (waitForConnectionRefreshPromise) {
                return;
            }
            waitForConnectionRefreshPromise = new Promise((resolve) => {
                waitForConnectionRefreshResolve = resolve;
            });
            const connectionError = context.connection && context.connection.error ? context.connection.error : undefined;
            if (connectionError) {
                logger.logError(connectionError, "[%s] Error (context.connection.error) occurred on the amqp connection", connectionContext.connection.id);
            }
            const contextError = context.error;
            if (contextError) {
                logger.logError(contextError, "[%s] Error (context.error) occurred on the amqp connection", connectionContext.connection.id);
            }
            const state = {
                wasConnectionCloseCalled: connectionContext.wasConnectionCloseCalled,
                numSenders: Object.keys(connectionContext.senders).length,
                numReceivers: Object.keys(connectionContext.messageReceivers).length +
                    Object.keys(connectionContext.messageSessions).length,
            };
            // Clear internal map maintained by rhea to avoid reconnecting of old links once the
            // connection is back up.
            connectionContext.connection.removeAllSessions();
            // Close the cbs session to ensure all the event handlers are released.
            await connectionContext.cbsSession.close();
            // Close the management sessions to ensure all the event handlers are released.
            for (const entityPath of Object.keys(connectionContext.managementClients)) {
                await connectionContext.managementClients[entityPath].close();
            }
            if (state.wasConnectionCloseCalled) {
                // Do Nothing
            }
            else {
                // Calling onDetached on sender
                if (state.numSenders) {
                    // We don't do recovery for the sender:
                    //   Because we don't want to keep the sender active all the time
                    //   and the "next" send call would bear the burden of creating the link.
                    // Call onDetached() on sender so that it can gracefully shutdown
                    //   by cleaning up the timers and closing the links.
                    // We don't call onDetached for sender after `refreshConnection()`
                    //   because any new send calls that potentially initialize links would also get affected if called later.
                    logger.verbose(`[${connectionContext.connection.id}] connection.close() was not called from the sdk and there were ${state.numSenders} ` +
                        `senders. We should not reconnect.`);
                    const detachCalls = [];
                    for (const senderName of Object.keys(connectionContext.senders)) {
                        const sender = connectionContext.senders[senderName];
                        if (sender) {
                            logger.verbose("[%s] calling detached on sender '%s'.", connectionContext.connection.id, sender.name);
                            detachCalls.push(sender.onDetached().catch((err) => {
                                logger.logError(err, "[%s] An error occurred while calling onDetached() the sender '%s'", connectionContext.connection.id, sender.name);
                            }));
                        }
                    }
                    await Promise.all(detachCalls);
                }
                // Calling onDetached on batching receivers for the same reasons as sender
                const numBatchingReceivers = getNumberOfReceivers(connectionContext, "batching");
                if (numBatchingReceivers) {
                    logger.verbose(`[${connectionContext.connection.id}] connection.close() was not called from the sdk and there were ${numBatchingReceivers} ` +
                        `batching receivers. We should not reconnect.`);
                    // Call onDetached() on receivers so that batching receivers it can gracefully close any ongoing batch operation
                    await callOnDetachedOnReceivers(connectionContext, connectionError || contextError, "batching");
                }
                // Calling onDetached on session receivers
                const numSessionReceivers = getNumberOfReceivers(connectionContext, "session");
                if (numSessionReceivers) {
                    logger.verbose(`[${connectionContext.connection.id}] connection.close() was not called from the sdk and there were ${numSessionReceivers} ` +
                        `session receivers. We should close them.`);
                    await callOnDetachedOnSessionReceivers(connectionContext, connectionError || contextError);
                }
            }
            await refreshConnection();
            waitForConnectionRefreshResolve();
            waitForConnectionRefreshPromise = undefined;
            // The connection should always be brought back up if the sdk did not call connection.close()
            // and there was at least one receiver link on the connection before it went down.
            logger.verbose("[%s] state: %O", connectionContext.connectionId, state);
            // Calling onDetached on streaming receivers
            const numStreamingReceivers = getNumberOfReceivers(connectionContext, "streaming");
            if (!state.wasConnectionCloseCalled && numStreamingReceivers) {
                logger.verbose(`[${connectionContext.connection.id}] connection.close() was not called from the sdk and there were ${numStreamingReceivers} ` +
                    `streaming receivers. We should reconnect.`);
                // Calling `onDetached()` on streaming receivers after the refreshConnection() since `onDetached()` would
                // recover the streaming receivers and that would only be possible after the connection is refreshed.
                //
                // This is different from the batching receiver since `onDetached()` for the batching receiver would
                // return the outstanding messages and close the receive link.
                await callOnDetachedOnReceivers(connectionContext, connectionError || contextError, "streaming");
            }
        };
        const protocolError = async (context) => {
            if (context.connection && context.connection.error) {
                logger.logError(context.connection.error, "[%s] Error (context.connection.error) occurred on the amqp connection", connectionContext.connection.id);
            }
            if (context.error) {
                logger.logError(context.error, "[%s] Error (context.error) occurred on the amqp connection", connectionContext.connection.id);
            }
        };
        const error = async (context) => {
            if (context.connection && context.connection.error) {
                logger.logError(context.connection.error, "[%s] Error (context.connection.error) occurred on the amqp connection", connectionContext.connection.id);
            }
            if (context.error) {
                logger.logError(context.error, "[%s] Error (context.error) occurred on the amqp connection", connectionContext.connection.id);
            }
        };
        async function refreshConnection() {
            const originalConnectionId = connectionContext.connectionId;
            try {
                await cleanConnectionContext();
            }
            catch (err) {
                logger.logError(err, `[${connectionContext.connectionId}] There was an error closing the connection before reconnecting`);
            }
            // Create a new connection, id, locks, and cbs client.
            connectionContext.refreshConnection();
            addConnectionListeners(connectionContext.connection);
            logger.verbose(`The connection "${originalConnectionId}" has been updated to "${connectionContext.connectionId}".`);
        }
        function addConnectionListeners(connection) {
            // Add listeners on the connection object.
            connection.on(ConnectionEvents.connectionOpen, onConnectionOpen);
            connection.on(ConnectionEvents.disconnected, disconnected);
            connection.on(ConnectionEvents.protocolError, protocolError);
            connection.on(ConnectionEvents.error, error);
        }
        async function cleanConnectionContext() {
            // Remove listeners from the connection object.
            connectionContext.connection.removeListener(ConnectionEvents.connectionOpen, onConnectionOpen);
            connectionContext.connection.removeListener(ConnectionEvents.disconnected, disconnected);
            connectionContext.connection.removeListener(ConnectionEvents.protocolError, protocolError);
            connectionContext.connection.removeListener(ConnectionEvents.error, error);
            // Close the connection
            await connectionContext.connection.close();
        }
        addConnectionListeners(connectionContext.connection);
        logger.verbose("[%s] Created connection context successfully.", connectionContext.connectionId);
        return connectionContext;
    }
    ConnectionContext.create = create;
    /**
     * Closes the AMQP connection created by this ServiceBusClient along with AMQP links for
     * sender/receivers created by the queue/topic/subscription clients created by this
     * ServiceBusClient.
     * Once closed,
     * - the clients created by this ServiceBusClient cannot be used to send/receive messages anymore.
     * - this ServiceBusClient cannot be used to create any new queues/topics/subscriptions clients.
     */
    async function close(context) {
        const logPrefix = `[${context.connectionId}]`;
        try {
            logger.verbose(`${logPrefix} Permanently closing the amqp connection on the client.`);
            const senderNames = Object.keys(context.senders);
            const messageReceiverNames = Object.keys(context.messageReceivers);
            const messageSessionNames = Object.keys(context.messageSessions);
            const managementClientsEntityPaths = Object.keys(context.managementClients);
            logger.verbose(`${logPrefix} Permanently closing all the senders(${senderNames.length}), MessageReceivers(${messageReceiverNames.length}), MessageSessions(${messageSessionNames.length}), and ManagementClients(${managementClientsEntityPaths.length}).`);
            await Promise.all([
                ...senderNames.map((n) => context.senders[n].close()),
                ...messageReceiverNames.map((n) => context.messageReceivers[n].close()),
                ...messageSessionNames.map((n) => context.messageSessions[n].close()),
                ...managementClientsEntityPaths.map((p) => context.managementClients[p].close()),
            ]);
            logger.verbose(`${logPrefix} Permanently closing cbsSession`);
            await context.cbsSession.close();
            logger.verbose(`${logPrefix} Permanently closing internal connection`);
            await context.connection.close();
            context.wasConnectionCloseCalled = true;
            logger.verbose(`[${logPrefix} Permanently closed the amqp connection on the client.`);
        }
        catch (err) {
            const errObj = err instanceof Error ? err : new Error(JSON.stringify(err));
            logger.logError(err, `${logPrefix} An error occurred while closing the connection`);
            throw errObj;
        }
    }
    ConnectionContext.close = close;
})(ConnectionContext || (ConnectionContext = {}));
//# sourceMappingURL=connectionContext.js.map