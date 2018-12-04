// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as log from "./log";
import { packageJsonInfo } from "./util/constants";
import {
  ConnectionConfig, Constants, ConnectionContextBase, CreateConnectionContextBaseParameters,
  Dictionary, delay
} from "@azure/amqp-common";
import { NamespaceOptions } from "./namespace";
import { Client } from "./client";
import { OnAmqpEvent, EventContext, ConnectionEvents } from "rhea-promise";

/**
 * @interface ConnectionContext
 * Provides contextual information like the underlying amqp connection, cbs session, management session,
 * tokenProvider, senders, receivers, etc. about the ServiceBus client.
 */
export interface ConnectionContext extends ConnectionContextBase {
  /**
   * @property {Dictionary<Client>} [clients] A dictionary of servicebus entities for the
   * given amqp connection.
   */
  clients: Dictionary<Client>;
}

export namespace ConnectionContext {
  /**
   * @property {string} userAgent The user agent string for the ServiceBus client.
   * Constant value: "/js-service-bus".
   */
  export const userAgent: string = "/js-service-bus";

  export function create(config: ConnectionConfig, options?: NamespaceOptions): ConnectionContext {
    if (!options) options = {};
    const parameters: CreateConnectionContextBaseParameters = {
      config: config,
      tokenProvider: options.tokenProvider,
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
    connectionContext.clients = {};

    // Define listeners to be added to the connection object for
    // "connection_open" and "connection_error" events.
    const onConnectionOpen: OnAmqpEvent = (context: EventContext) => {
      connectionContext.wasConnectionCloseCalled = false;
      log.connectionCtxt("[%s] setting 'wasConnectionCloseCalled' property of connection context to %s.",
        connectionContext.connection.id, connectionContext.wasConnectionCloseCalled);
    };

    const disconnected: OnAmqpEvent = async (context: EventContext) => {
      const connectionError = context.connection && context.connection.error
        ? context.connection.error
        : undefined;
      if (connectionError) {
        log.error("[%s] Error (context.connection.error) occurred on the amqp connection: %O",
          connectionContext.connection.id, connectionError);
      }
      const contextError = context.error;
      if (contextError) {
        log.error("[%s] Error (context.error) occurred on the amqp connection: %O",
          connectionContext.connection.id, contextError);
      }
      const state: Readonly<{
        wasConnectionCloseCalled: boolean; numClients: number;
      }> = {
        wasConnectionCloseCalled: connectionContext.wasConnectionCloseCalled,
        numClients: Object.keys(connectionContext.clients).length
      };
      // The connection should always be brought back up if the sdk did not call connection.close()
      // and there was atleast one sender/receiver link on the connection before it went down.
      log.error("[%s] state: %O", connectionContext.connectionId, state);
      if (!state.wasConnectionCloseCalled && (state.numClients)) {
        log.error("[%s] connection.close() was not called from the sdk and there were some " +
          "clients. We should reconnect.", connectionContext.connection.id);
        await delay(Constants.connectionReconnectDelay);
        // reconnect clients if any
        for (const id of Object.keys(connectionContext.clients)) {
          const client = connectionContext.clients[id];
          log.error("[%s] calling detached on client '%s'.",
            connectionContext.connection.id, client.id);
          client.detached().catch((err) => {
            log.error("[%s] An error occurred while reconnecting the sender '%s': %O.",
              connectionContext.connection.id, client.id, err);
          });
        }
      }
    };

    // Add listeners on the connection object.
    connectionContext.connection.on(ConnectionEvents.connectionOpen, onConnectionOpen);
    connectionContext.connection.on(ConnectionEvents.disconnected, disconnected);

    log.connectionCtxt("[%s] Created connection context successfully.",
      connectionContext.connectionId);

    return connectionContext;
  }
}
