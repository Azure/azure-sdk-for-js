// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { logger } from "./log";
import { getRuntimeInfo } from "./util/runtimeInfo";
import { packageJsonInfo } from "./util/constants";
import { EventHubReceiver } from "./eventHubReceiver";
import { EventHubSender } from "./eventHubSender";
import {
  Constants,
  ConnectionContextBase,
  CreateConnectionContextBaseParameters,
  EventHubConnectionConfig,
  TokenCredential,
  SharedKeyCredential
} from "@azure/core-amqp";
import { ManagementClient, ManagementClientOptions } from "./managementClient";
import { EventHubClientOptions } from "./models/public";
import { Dictionary, OnAmqpEvent, EventContext, ConnectionEvents } from "rhea-promise";

/**
 * @interface ConnectionContext
 * @internal
 * @ignore
 * Provides contextual information like the underlying amqp connection, cbs session, management session,
 * tokenProvider, senders, receivers, etc. about the EventHub client.
 */
export interface ConnectionContext extends ConnectionContextBase {
  /**
   * @property config The EventHub connection config that is created after
   * parsing the connection string.
   */
  readonly config: EventHubConnectionConfig;
  /**
   * @property wasConnectionCloseCalled Indicates whether the close() method was
   * called on theconnection object.
   */
  wasConnectionCloseCalled: boolean;
  /**
   * @property receivers A dictionary of the EventHub Receivers associated with this client.
   */
  receivers: Dictionary<EventHubReceiver>;
  /**
   * @property senders A dictionary of the EventHub Senders associated with this client.
   */
  senders: Dictionary<EventHubSender>;
  /**
   * @property managementSession A reference to the management session ($management endpoint) on
   * the underlying amqp connection for the EventHub Client.
   */
  managementSession?: ManagementClient;
}

/**
 * @internal
 * @ignore
 */
export interface ConnectionContextOptions extends EventHubClientOptions {
  managementSessionAddress?: string;
  managementSessionAudience?: string;
}

/**
 * @internal
 * @ignore
 */
export namespace ConnectionContext {
  /**
   * @property userAgent The user agent string for the EventHubs client.
   * See guideline at https://github.com/Azure/azure-sdk/blob/master/docs/design/Telemetry.mdk
   */
  const userAgent: string = `azsdk-js-azureeventhubs/${
    packageJsonInfo.version
  } (${getRuntimeInfo()})`;

  export function getUserAgent(options: ConnectionContextOptions): string {
    const finalUserAgent = options.userAgent ? `${userAgent},${options.userAgent}` : userAgent;
    if (finalUserAgent.length > Constants.maxUserAgentLength) {
      throw new Error(
        `The user-agent string cannot be more than ${Constants.maxUserAgentLength} characters in length.` +
          `The given user-agent string is: ${finalUserAgent} with length: ${finalUserAgent.length}`
      );
    }
    return finalUserAgent;
  }

  export function create(
    config: EventHubConnectionConfig,
    tokenCredential: SharedKeyCredential | TokenCredential,
    options?: ConnectionContextOptions
  ): ConnectionContext {
    if (!options) options = {};

    config.webSocket = options.webSocketOptions && options.webSocketOptions.webSocket;
    config.webSocketEndpointPath = "$servicebus/websocket";
    config.webSocketConstructorOptions =
      options.webSocketOptions && options.webSocketOptions.webSocketConstructorOptions;

    const parameters: CreateConnectionContextBaseParameters = {
      config: config,
      tokenCredential: tokenCredential,
      // re-enabling this will be a post-GA discussion.
      // dataTransformer: options.dataTransformer,
      isEntityPathRequired: true,
      connectionProperties: {
        product: "MSJSClient",
        userAgent: getUserAgent(options),
        version: packageJsonInfo.version
      }
    };
    // Let us create the base context and then add EventHub specific ConnectionContext properties.
    const connectionContext = ConnectionContextBase.create(parameters) as ConnectionContext;
    connectionContext.wasConnectionCloseCalled = false;
    connectionContext.senders = {};
    connectionContext.receivers = {};
    const mOptions: ManagementClientOptions = {
      address: options.managementSessionAddress,
      audience: options.managementSessionAudience
    };
    connectionContext.managementSession = new ManagementClient(connectionContext, mOptions);

    // Define listeners to be added to the connection object for
    // "connection_open" and "connection_error" events.
    const onConnectionOpen: OnAmqpEvent = (context: EventContext) => {
      connectionContext.wasConnectionCloseCalled = false;
      logger.verbose(
        "[%s] setting 'wasConnectionCloseCalled' property of connection context to %s.",
        connectionContext.connection.id,
        connectionContext.wasConnectionCloseCalled
      );
    };

    const disconnected: OnAmqpEvent = async (context: EventContext) => {
      logger.verbose(
        "[%s] 'disconnected' event occurred on the amqp connection.",
        connectionContext.connection.id
      );

      if (context.connection && context.connection.error) {
        logger.verbose(
          "[%s] Accompanying error on the context.connection: %O",
          connectionContext.connection.id,
          context.connection && context.connection.error
        );
      }
      if (context.error) {
        logger.verbose(
          "[%s] Accompanying error on the context: %O",
          connectionContext.connection.id,
          context.error
        );
      }
      const state: Readonly<{
        wasConnectionCloseCalled: boolean;
        numSenders: number;
        numReceivers: number;
      }> = {
        wasConnectionCloseCalled: connectionContext.wasConnectionCloseCalled,
        numSenders: Object.keys(connectionContext.senders).length,
        numReceivers: Object.keys(connectionContext.receivers).length
      };
      logger.verbose(
        "[%s] Closing all open senders and receivers in the state: %O",
        connectionContext.connection.id,
        state
      );

      // Clear internal map maintained by rhea to avoid reconnecting of old links once the
      // connection is back up.
      connectionContext.connection.removeAllSessions();

      // Close the cbs session to ensure all the event handlers are released.
      await connectionContext.cbsSession.close();
      // Close the management session to ensure all the event handlers are released.
      await connectionContext.managementSession!.close();

      // Close all senders and receivers to ensure clean up of timers & other resources.
      if (state.numSenders || state.numReceivers) {
        for (const senderName of Object.keys(connectionContext.senders)) {
          const sender = connectionContext.senders[senderName];
          if (!sender.isConnecting) {
            await sender.close().catch((err) => {
              logger.verbose(
                "[%s] Error when closing sender [%s] after disconnected event: %O",
                connectionContext.connection.id,
                senderName,
                err
              );
            });
          }
        }
        for (const receiverName of Object.keys(connectionContext.receivers)) {
          const receiver = connectionContext.receivers[receiverName];
          if (!receiver.isConnecting) {
            await receiver.close().catch((err) => {
              logger.verbose(
                "[%s] Error when closing sender [%s] after disconnected event: %O",
                connectionContext.connection.id,
                receiverName,
                err
              );
            });
          }
        }
      }
    };

    const protocolError: OnAmqpEvent = async (context: EventContext) => {
      logger.verbose(
        "[%s] 'protocol_error' event occurred on the amqp connection.",
        connectionContext.connection.id
      );

      if (context.connection && context.connection.error) {
        logger.verbose(
          "[%s] Accompanying error on the context.connection: %O",
          connectionContext.connection.id,
          context.connection && context.connection.error
        );
      }
      if (context.error) {
        logger.verbose(
          "[%s] Accompanying error on the context: %O",
          connectionContext.connection.id,
          context.error
        );
      }
    };

    const error: OnAmqpEvent = async (context: EventContext) => {
      logger.verbose(
        "[%s] 'error' event occurred on the amqp connection.",
        connectionContext.connection.id
      );

      if (context.connection && context.connection.error) {
        logger.verbose(
          "[%s] Accompanying error on the context.connection: %O",
          connectionContext.connection.id,
          context.connection && context.connection.error
        );
      }
      if (context.error) {
        logger.verbose(
          "[%s] Accompanying error on the context: %O",
          connectionContext.connection.id,
          context.error
        );
      }
    };

    // Add listeners on the connection object.
    connectionContext.connection.on(ConnectionEvents.connectionOpen, onConnectionOpen);
    connectionContext.connection.on(ConnectionEvents.disconnected, disconnected);
    connectionContext.connection.on(ConnectionEvents.protocolError, protocolError);
    connectionContext.connection.on(ConnectionEvents.error, error);

    logger.verbose("[%s] Created connection context successfully.", connectionContext.connectionId);
    return connectionContext;
  }
}
