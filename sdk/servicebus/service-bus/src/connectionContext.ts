// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as log from "./log";
import { packageJsonInfo } from "./util/constants";
import {
  ConnectionConfig,
  ConnectionContextBase,
  Constants,
  CreateConnectionContextBaseParameters,
  SharedKeyCredential,
  TokenCredential,
  delay
} from "@azure/core-amqp";
import { ServiceBusClientOptions } from "./constructorHelpers";
import { Connection, ConnectionEvents, EventContext, OnAmqpEvent } from "rhea-promise";
import { MessageSender } from "./core/messageSender";
import { MessageSession } from "./session/messageSession";
import { MessageReceiver } from "./core/messageReceiver";
import { ManagementClient } from "./core/managementClient";
import { formatUserAgentPrefix } from "./util/utils";
import { getRuntimeInfo } from "./util/runtimeInfo";

/**
 * @internal
 * @ignore
 * Provides contextual information like the underlying amqp connection, cbs session, management session,
 * tokenCredential, senders, receivers, etc. about the ServiceBus client.
 */
export interface ConnectionContext extends ConnectionContextBase {
  /**
   * @property A map of active Service Bus Senders with sender name as key.
   */
  senders: { [name: string]: MessageSender };
  /**
   * @property A map of active Service Bus receivers for non session enabled queues/subscriptions
   * with receiver name as key.
   */
  messageReceivers: { [name: string]: MessageReceiver };
  /**
   * @property A map of active Service Bus receivers for session enabled queues/subscriptions
   * with receiver name as key.
   */
  messageSessions: { [name: string]: MessageSession };
  /**
   * @property A map of ManagementClient instances for operations over the $management link
   * with key as the entity path.
   */
  managementClients: { [name: string]: ManagementClient };
  /**
   * Function returning a promise that resolves once the connectionContext is ready to open an AMQP link.
   * ConnectionContext will be ready to open an AMQP link when:
   * - The AMQP connection is already open on both sides.
   * - The AMQP connection has been closed or disconnected. In this case, a new AMQP connection is expected
   * to be created first.
   * An AMQP link cannot be opened if the AMQP connection
   * is in the process of closing or disconnecting.
   */
  readyToOpenLink(): Promise<void>;
  /**
   * Fetches the receiver from the cache in ConnectionContext based on the receiverName given.
   * Useful for when a message needs to be settled or have its lock renewed.
   *
   * TODO: Track the right receiver on the message instead of the ConnectionContext to remove
   * the need for this helper.
   */
  getReceiverFromCache(
    receiverName: string,
    sessionId?: string
  ): MessageReceiver | MessageSession | undefined;
  /**
   * Gets the management client for given entity path from the cache
   * Creates one if none exists in the cache
   */
  getManagementClient(entityPath: string): ManagementClient;
  /**
   * Indicates whether the connection is in the process of closing.
   * When this returns `true`, a `disconnected` event will be received
   * after the connection is closed.
   */
  isConnectionClosing(): boolean;
}

/**
 * Describes the members on the ConnectionContext that are only
 * used by it internally.
 * @ignore
 * @internal
 */
export interface ConnectionContextInternalMembers extends ConnectionContext {
  /**
   * Resolves once the context's connection emits a `disconnected` event.
   */
  waitForDisconnectedEvent(): Promise<void>;
  /**
   * Resolves once the connection has finished being reset.
   * Connections are reset as part of reacting to a `disconnected` event.
   */
  waitForConnectionReset(): Promise<void>;
}

/**
 * @internal
 * @ignore
 * Helper type to get the names of all the functions on an object.
 */
type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
/**
 * @internal
 * @ignore
 * Helper type to get the types of all the functions on an object.
 */
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;
/**
 * @internal
 * @ignore
 * Helper type to get the types of all the functions on ConnectionContext
 * and the internal methods from ConnectionContextInternalMembers.
 * Note that this excludes the functions that ConnectionContext inherits.
 * Each function also has its `this` type set as `ConnectionContext`.
 */
type ConnectionContextMethods = Omit<
  FunctionProperties<ConnectionContextInternalMembers>,
  FunctionPropertyNames<ConnectionContextBase>
> &
  ThisType<ConnectionContextInternalMembers>;

/**
 * @internal
 * @ignore
 */
export namespace ConnectionContext {
  export function create(
    config: ConnectionConfig,
    tokenCredential: SharedKeyCredential | TokenCredential,
    options?: ServiceBusClientOptions
  ): ConnectionContext {
    if (!options) options = {};
    const userAgent = `${formatUserAgentPrefix(
      options.userAgentOptions?.userAgentPrefix
    )} ${getRuntimeInfo()}`;
    const parameters: CreateConnectionContextBaseParameters = {
      config: config,
      tokenCredential: tokenCredential,
      // re-enabling this will be a post-GA discussion similar to event-hubs.
      // dataTransformer: options.dataTransformer,
      isEntityPathRequired: false,
      connectionProperties: {
        product: "MSJSClient",
        userAgent,
        version: packageJsonInfo.version
      }
    };
    // Let us create the base context and then add ServiceBus specific ConnectionContext properties.
    const connectionContext = ConnectionContextBase.create(parameters) as ConnectionContext;
    connectionContext.senders = {};
    connectionContext.messageReceivers = {};
    connectionContext.messageSessions = {};
    connectionContext.managementClients = {};

    let waitForConnectionRefreshResolve: () => void;
    let waitForConnectionRefreshPromise: Promise<void> | undefined;
    Object.assign<ConnectionContext, ConnectionContextMethods>(connectionContext, {
      isConnectionClosing() {
        // When the connection is not open, but the remote end is open,
        // then the rhea connection is in the process of terminating.
        return Boolean(!this.connection.isOpen() && this.connection.isRemoteOpen());
      },
      async readyToOpenLink() {
        log.error(`[${this.connectionId}] Waiting until the connection is ready to open link.`);
        // Check that the connection isn't in the process of closing.
        // This can happen when the idle timeout has been reached but
        // the underlying socket is waiting to be destroyed.
        if (this.isConnectionClosing()) {
          log.error(`[${this.connectionId}] Connection is closing, waiting for disconnected event`);
          // Wait for the disconnected event that indicates the underlying socket has closed.
          await this.waitForDisconnectedEvent();
        }

        // Wait for the connection to be reset.
        await this.waitForConnectionReset();
        log.error(`[${this.connectionId}] Connection is ready to open link.`);
      },
      waitForDisconnectedEvent() {
        return new Promise((resolve) => {
          log.error(
            `[${this.connectionId}] Attempting to reinitialize connection` +
              ` but the connection is in the process of closing.` +
              ` Waiting for the disconnect event before continuing.`
          );
          this.connection.once(ConnectionEvents.disconnected, resolve);
        });
      },
      waitForConnectionReset() {
        // Check if the connection is currently in the process of disconnecting.
        if (waitForConnectionRefreshPromise) {
          log.error(`[${this.connectionId}] Waiting for connection reset`);
          return waitForConnectionRefreshPromise;
        }

        log.error(
          `[${this.connectionId}] Connection not waiting to be reset. Resolving immediately.`
        );
        return Promise.resolve();
      },
      getReceiverFromCache(
        receiverName: string,
        sessionId?: string
      ): MessageReceiver | MessageSession | undefined {
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
        } else {
          existingReceivers +=
            (existingReceivers ? ", " : "") + Object.keys(this.messageReceivers).join(",");
        }

        log.error(
          "[%s] Failed to find receiver '%s' among existing receivers: %s",
          this.connectionId,
          receiverName,
          existingReceivers
        );
        return;
      },
      getManagementClient(entityPath: string): ManagementClient {
        if (!this.managementClients[entityPath]) {
          this.managementClients[entityPath] = new ManagementClient(this, entityPath, {
            address: `${entityPath}/$management`
          });
        }
        return this.managementClients[entityPath];
      }
    });

    // Define listeners to be added to the connection object for
    // "connection_open" and "connection_error" events.
    const onConnectionOpen: OnAmqpEvent = () => {
      connectionContext.wasConnectionCloseCalled = false;
      log.connectionCtxt(
        "[%s] setting 'wasConnectionCloseCalled' property of connection context to %s.",
        connectionContext.connection.id,
        connectionContext.wasConnectionCloseCalled
      );
    };

    const disconnected: OnAmqpEvent = async (context: EventContext) => {
      if (waitForConnectionRefreshPromise) {
        return;
      }

      waitForConnectionRefreshPromise = new Promise((resolve) => {
        waitForConnectionRefreshResolve = resolve;
      });

      const connectionError =
        context.connection && context.connection.error ? context.connection.error : undefined;
      if (connectionError) {
        log.error(
          "[%s] Error (context.connection.error) occurred on the amqp connection: %O",
          connectionContext.connection.id,
          connectionError
        );
      }
      const contextError = context.error;
      if (contextError) {
        log.error(
          "[%s] Error (context.error) occurred on the amqp connection: %O",
          connectionContext.connection.id,
          contextError
        );
      }
      const state: Readonly<{
        wasConnectionCloseCalled: boolean;
        numSenders: number;
        numReceivers: number;
      }> = {
        wasConnectionCloseCalled: connectionContext.wasConnectionCloseCalled,
        numSenders: Object.keys(connectionContext.senders).length,
        numReceivers:
          Object.keys(connectionContext.messageReceivers).length +
          Object.keys(connectionContext.messageSessions).length
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

      await refreshConnection(connectionContext);
      waitForConnectionRefreshResolve();
      waitForConnectionRefreshPromise = undefined;
      // The connection should always be brought back up if the sdk did not call connection.close()
      // and there was atleast one sender/receiver link on the connection before it went down.
      log.error("[%s] state: %O", connectionContext.connectionId, state);
      if (!state.wasConnectionCloseCalled && (state.numSenders || state.numReceivers)) {
        log.error(
          "[%s] connection.close() was not called from the sdk and there were some " +
            "senders and/or receivers. We should reconnect.",
          connectionContext.connection.id
        );
        await delay(Constants.connectionReconnectDelay);

        const detachCalls: Promise<void>[] = [];

        // Call onDetached() on sender so that it can gracefully shutdown
        for (const senderName of Object.keys(connectionContext.senders)) {
          const sender = connectionContext.senders[senderName];
          if (sender) {
            log.error(
              "[%s] calling detached on sender '%s'.",
              connectionContext.connection.id,
              sender.name
            );
            detachCalls.push(
              sender.onDetached().catch((err) => {
                log.error(
                  "[%s] An error occurred while calling onDetached() the sender '%s': %O.",
                  connectionContext.connection.id,
                  sender.name,
                  err
                );
              })
            );
          }
        }

        // Call onDetached() on receivers so that batching receivers it can gracefully close any ongoing batch operation
        // and streaming receivers can decide whether to reconnect or not.
        for (const receiverName of Object.keys(connectionContext.messageReceivers)) {
          const receiver = connectionContext.messageReceivers[receiverName];
          if (receiver) {
            log.error(
              "[%s] calling detached on %s receiver '%s'.",
              connectionContext.connection.id,
              receiver.receiverType,
              receiver.name
            );
            const causedByDisconnect = true;
            detachCalls.push(
              receiver
                .onDetached(connectionError || contextError, causedByDisconnect)
                .catch((err) => {
                  log.error(
                    "[%s] An error occurred while calling onDetached() on the %s receiver '%s': %O.",
                    connectionContext.connection.id,
                    receiver.receiverType,
                    receiver.name,
                    err
                  );
                })
            );
          }
        }

        await Promise.all(detachCalls);
      }
    };

    const protocolError: OnAmqpEvent = async (context: EventContext) => {
      if (context.connection && context.connection.error) {
        log.error(
          "[%s] Error (context.connection.error) occurred on the amqp connection: %O",
          connectionContext.connection.id,
          context.connection && context.connection.error
        );
      }
      if (context.error) {
        log.error(
          "[%s] Error (context.error) occurred on the amqp connection: %O",
          connectionContext.connection.id,
          context.error
        );
      }
    };

    const error: OnAmqpEvent = async (context: EventContext) => {
      if (context.connection && context.connection.error) {
        log.error(
          "[%s] Error (context.connection.error) occurred on the amqp connection: %O",
          connectionContext.connection.id,
          context.connection && context.connection.error
        );
      }
      if (context.error) {
        log.error(
          "[%s] Error (context.error) occurred on the amqp connection: %O",
          connectionContext.connection.id,
          context.error
        );
      }
    };

    async function refreshConnection(connectionContext: ConnectionContext) {
      const originalConnectionId = connectionContext.connectionId;
      try {
        await cleanConnectionContext(connectionContext);
      } catch (err) {
        log.error(
          `[${connectionContext.connectionId}] There was an error closing the connection before reconnecting: %O`,
          err
        );
      }
      // Create a new connection, id, locks, and cbs client.
      connectionContext.refreshConnection();
      addConnectionListeners(connectionContext.connection);
      log.error(
        `The connection "${originalConnectionId}" has been updated to "${connectionContext.connectionId}".`
      );
    }

    function addConnectionListeners(connection: Connection) {
      // Add listeners on the connection object.
      connection.on(ConnectionEvents.connectionOpen, onConnectionOpen);
      connection.on(ConnectionEvents.disconnected, disconnected);
      connection.on(ConnectionEvents.protocolError, protocolError);
      connection.on(ConnectionEvents.error, error);
    }

    async function cleanConnectionContext(connectionContext: ConnectionContext) {
      // Remove listeners from the connection object.
      connectionContext.connection.removeListener(
        ConnectionEvents.connectionOpen,
        onConnectionOpen
      );
      connectionContext.connection.removeListener(ConnectionEvents.disconnected, disconnected);
      connectionContext.connection.removeListener(ConnectionEvents.protocolError, protocolError);
      connectionContext.connection.removeListener(ConnectionEvents.error, error);
      // Close the connection
      await connectionContext.connection.close();
    }

    addConnectionListeners(connectionContext.connection);

    log.connectionCtxt(
      "[%s] Created connection context successfully.",
      connectionContext.connectionId
    );

    return connectionContext;
  }

  /**
   * Closes the AMQP connection created by this ServiceBusClient along with AMQP links for
   * sender/receivers created by the queue/topic/subscription clients created by this
   * ServiceBusClient.
   * Once closed,
   * - the clients created by this ServiceBusClient cannot be used to send/receive messages anymore.
   * - this ServiceBusClient cannot be used to create any new queues/topics/subscriptions clients.
   * @returns {Promise<any>}
   */
  export async function close(context: ConnectionContext): Promise<void> {
    try {
      if (context.connection.isOpen()) {
        log.ns("Closing the amqp connection '%s' on the client.", context.connectionId);

        // Close all the senders.
        for (const senderName of Object.keys(context.senders)) {
          await context.senders[senderName].close();
        }

        // Close all MessageReceiver instances
        for (const receiverName of Object.keys(context.messageReceivers)) {
          await context.messageReceivers[receiverName].close();
        }

        // Close all MessageSession instances
        for (const messageSessionName of Object.keys(context.messageSessions)) {
          await context.messageSessions[messageSessionName].close();
        }

        // Close all the ManagementClients.
        for (const entityPath of Object.keys(context.managementClients)) {
          await context.managementClients[entityPath].close();
        }

        await context.cbsSession.close();

        await context.connection.close();
        context.wasConnectionCloseCalled = true;
        log.ns("Closed the amqp connection '%s' on the client.", context.connectionId);
      }
    } catch (err) {
      const errObj = err instanceof Error ? err : new Error(JSON.stringify(err));
      log.error(
        `An error occurred while closing the connection "${context.connectionId}":\n${errObj}`
      );
      throw errObj;
    }
  }
}
