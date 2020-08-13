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
import { ClientEntityContext } from "./clientEntityContext";
import { Connection, ConnectionEvents, EventContext, OnAmqpEvent } from "rhea-promise";
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
   * @property A dictionary of ClientEntityContext
   * objects for each of the client in the `clients` dictionary
   */
  clientContexts: { [name: string]: ClientEntityContext };

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
}

/**
 * Describes the members on the ConnectionContext that are only
 * used by it internally.
 * @ignore
 * @internal
 */
export interface ConnectionContextInternalMembers extends ConnectionContext {
  /**
   * Indicates whether the connection is in the process of closing.
   * When this returns `true`, a `disconnected` event will be received
   * after the connection is closed.
   *
   */
  isConnectionClosing(): boolean;
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
    connectionContext.clientContexts = {};

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
          return waitForConnectionRefreshPromise;
        }
        return Promise.resolve();
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
        numClients: number;
      }> = {
        wasConnectionCloseCalled: connectionContext.wasConnectionCloseCalled,
        numClients: Object.keys(connectionContext.clientContexts).length
      };

      // Clear internal map maintained by rhea to avoid reconnecting of old links once the
      // connection is back up.
      connectionContext.connection.removeAllSessions();

      // Close the cbs session to ensure all the event handlers are released.
      await connectionContext.cbsSession.close();

      // Close the management sessions to ensure all the event handlers are released.
      for (const id of Object.keys(connectionContext.clientContexts)) {
        const clientContext = connectionContext.clientContexts[id];
        if (clientContext.managementClient) {
          await clientContext.managementClient.close();
        }
      }

      await refreshConnection(connectionContext);
      waitForConnectionRefreshResolve();
      waitForConnectionRefreshPromise = undefined;
      // The connection should always be brought back up if the sdk did not call connection.close()
      // and there was atleast one sender/receiver link on the connection before it went down.
      log.error("[%s] state: %O", connectionContext.connectionId, state);
      if (!state.wasConnectionCloseCalled && state.numClients) {
        log.error(
          "[%s] connection.close() was not called from the sdk and there were some " +
            "clients. We should reconnect.",
          connectionContext.connection.id
        );
        await delay(Constants.connectionReconnectDelay);
        // reconnect clients if any
        for (const id of Object.keys(connectionContext.clientContexts)) {
          const clientContext = connectionContext.clientContexts[id];
          log.error(
            "[%s] calling detached on client '%s'.",
            connectionContext.connection.id,
            clientContext.clientId
          );
          clientContext.onDetached(connectionError || contextError).catch((err) => {
            log.error(
              "[%s] An error occurred while reconnecting the sender '%s': %O.",
              connectionContext.connection.id,
              clientContext.clientId,
              err
            );
          });
        }
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

        // Close all the clients.
        for (const id of Object.keys(context.clientContexts)) {
          const clientContext = context.clientContexts[id];
          await clientContext.close();
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
