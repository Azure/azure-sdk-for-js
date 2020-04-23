// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as log from "./log";
import * as os from "os";
import { packageJsonInfo } from "./util/constants";
import {
  ConnectionConfig,
  Constants,
  ConnectionContextBase,
  CreateConnectionContextBaseParameters,
  Dictionary,
  delay,
  TokenProvider
} from "@azure/amqp-common";
import { ServiceBusClientOptions } from "./serviceBusClient";
import { ClientEntityContext } from "./clientEntityContext";
import { OnAmqpEvent, EventContext, ConnectionEvents, Connection } from "rhea-promise";

/**
 * @internal
 * @interface ConnectionContext
 * Provides contextual information like the underlying amqp connection, cbs session, management session,
 * tokenProvider, senders, receivers, etc. about the ServiceBus client.
 */
export interface ConnectionContext extends ConnectionContextBase {
  /**
   * @property A dictionary of ClientEntityContext
   * objects for each of the client in the `clients` dictionary
   */
  clientContexts: Dictionary<ClientEntityContext>;
}

/**
 * @internal
 */
export namespace ConnectionContext {
  /**
   * @property {string} userAgent The user agent string for the ServiceBus client.
   * See guideline at https://github.com/Azure/azure-sdk/blob/master/docs/design/Telemetry.mdk
   */
  export const userAgent: string = `azsdk-js-azureservicebus/${
    packageJsonInfo.version
  } (NODE-VERSION ${process.version}; ${os.type()} ${os.release()})`;

  export function create(
    config: ConnectionConfig,
    tokenProvider: TokenProvider,
    options?: ServiceBusClientOptions
  ): ConnectionContext {
    if (!options) options = {};
    const parameters: CreateConnectionContextBaseParameters = {
      config: config,
      tokenProvider: tokenProvider,
      dataTransformer: options.dataTransformer,
      isEntityPathRequired: false,
      connectionProperties: {
        product: "MSJSClient",
        userAgent: userAgent,
        version: packageJsonInfo.version
      }
    };
    // Let us create the base context and then add ServiceBus specific ConnectionContext properties.
    const connectionContext = ConnectionContextBase.create(parameters) as ConnectionContext;
    connectionContext.clientContexts = {};

    // Define listeners to be added to the connection object for
    // "connection_open" and "connection_error" events.
    const onConnectionOpen: OnAmqpEvent = (context: EventContext) => {
      connectionContext.wasConnectionCloseCalled = false;
      log.connectionCtxt(
        "[%s] setting 'wasConnectionCloseCalled' property of connection context to %s.",
        connectionContext.connection.id,
        connectionContext.wasConnectionCloseCalled
      );
    };

    const disconnected: OnAmqpEvent = async (context: EventContext) => {
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
}
