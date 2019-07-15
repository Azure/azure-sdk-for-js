// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as log from "./log";
import * as os from "os";
import { packageJsonInfo } from "./util/constants";
import { EventHubReceiver } from "./eventHubReceiver";
import { EventHubSender } from "./eventHubSender";
import {
  Constants,
  delay,
  ConnectionContextBase,
  CreateConnectionContextBaseParameters,
  EventHubConnectionConfig
} from "@azure/amqp-common";
import { ManagementClient, ManagementClientOptions } from "./managementClient";
import { ClientOptions } from "./eventHubClient";
import { Dictionary, OnAmqpEvent, EventContext, ConnectionEvents } from "rhea-promise";

/**
 * @interface ConnectionContext
 * @ignore
 * Provides contextual information like the underlying amqp connection, cbs session, management session,
 * tokenProvider, senders, receivers, etc. about the EventHub client.
 */
export interface ConnectionContext extends ConnectionContextBase {
  /**
   * @property {EventHubConnectionConfig} config The EventHub connection config that is created after
   * parsing the connection string.
   */
  readonly config: EventHubConnectionConfig;
  /**
   * @property {boolean} wasConnectionCloseCalled Indicates whether the close() method was
   * called on theconnection object.
   */
  wasConnectionCloseCalled: boolean;
  /**
   * @property {Dictionary<EventHubReceiver>} receivers A dictionary of the EventHub Receivers associated with this client.
   */
  receivers: Dictionary<EventHubReceiver>;
  /**
   * @property {Dictionary<EventHubSender>} senders A dictionary of the EventHub Senders associated with this client.
   */
  senders: Dictionary<EventHubSender>;
  /**
   * @property {ManagementClient} managementSession A reference to the management session ($management endpoint) on
   * the underlying amqp connection for the EventHub Client.
   */
  managementSession?: ManagementClient;
}

export interface ConnectionContextOptions extends ClientOptions {
  managementSessionAddress?: string;
  managementSessionAudience?: string;
}

export namespace ConnectionContext {
  /**
   * @property {string} userAgent The user agent string for the EventHubs client.
   * See guideline at https://github.com/Azure/azure-sdk/blob/master/docs/design/Telemetry.mdk
   */
  const userAgent: string = `azsdk-js-azureeventhubs/${packageJsonInfo.version} (NODE-VERSION ${
    process.version
  }; ${os.type()} ${os.release()})`;

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

  export function create(config: EventHubConnectionConfig, options?: ConnectionContextOptions): ConnectionContext {
    if (!options) options = {};

    const parameters: CreateConnectionContextBaseParameters = {
      config: config,
      tokenProvider: options.tokenProvider,
      dataTransformer: options.dataTransformer,
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
      log.context(
        "[%s] setting 'wasConnectionCloseCalled' property of connection context to %s.",
        connectionContext.connection.id,
        connectionContext.wasConnectionCloseCalled
      );
    };

    const disconnected: OnAmqpEvent = async (context: EventContext) => {
      const connectionError = context.connection && context.connection.error ? context.connection.error : undefined;
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
        numReceivers: Object.keys(connectionContext.receivers).length
      };

      // Clear internal map maintained by rhea to avoid reconnecting of old links once the
      // connection is back up.
      connectionContext.connection.removeAllSessions();

      // Close the cbs session to ensure all the event handlers are released.
      await connectionContext.cbsSession.close();
      // Close the management session to ensure all the event handlers are released.
      await connectionContext.managementSession!.close();

      // The connection should always be brought back up if the sdk did not call connection.close()
      // and there was atleast one sender/receiver link on the connection before it went down.
      log.error("[%s] state: %O", connectionContext.connection.id, state);
      if (!state.wasConnectionCloseCalled && (state.numSenders || state.numReceivers)) {
        log.error(
          "[%s] connection.close() was not called from the sdk and there were some " +
            "sender or receiver links or both. We should reconnect.",
          connectionContext.connection.id
        );
        await delay(Constants.connectionReconnectDelay);
        // reconnect senders if any
        for (const senderName of Object.keys(connectionContext.senders)) {
          const sender = connectionContext.senders[senderName];
          if (!sender.isConnecting) {
            log.error(
              "[%s] calling detached on sender '%s' with address '%s'.",
              connectionContext.connection.id,
              sender.name,
              sender.address
            );
            sender.detached(connectionError || contextError).catch(err => {
              log.error(
                "[%s] An error occurred while reconnecting the sender '%s' with adress '%s' %O.",
                connectionContext.connection.id,
                sender.name,
                sender.address,
                err
              );
            });
          } else {
            log.error(
              "[%s] sender '%s' with address '%s' is already reconnecting. Hence not " +
                "calling detached on the sender.",
              connectionContext.connection.id,
              sender.name,
              sender.address
            );
          }
        }
        // reconnect receivers if any
        for (const receiverName of Object.keys(connectionContext.receivers)) {
          const receiver = connectionContext.receivers[receiverName];
          if (!receiver.isConnecting) {
            log.error(
              "[%s] calling detached on receiver '%s' with address '%s'.",
              connectionContext.connection.id,
              receiver.name,
              receiver.address
            );
            receiver.detached(connectionError || contextError).catch(err => {
              log.error(
                "[%s] An error occurred while reconnecting the receiver '%s' with adress '%s' %O.",
                connectionContext.connection.id,
                receiver.name,
                receiver.address,
                err
              );
            });
          } else {
            log.error(
              "[%s] receiver '%s' with address '%s' is already reconnecting. Hence not " +
                "calling detached on the receiver.",
              connectionContext.connection.id,
              receiver.name,
              receiver.address
            );
          }
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

    // Add listeners on the connection object.
    connectionContext.connection.on(ConnectionEvents.connectionOpen, onConnectionOpen);
    connectionContext.connection.on(ConnectionEvents.disconnected, disconnected);
    connectionContext.connection.on(ConnectionEvents.protocolError, protocolError);
    connectionContext.connection.on(ConnectionEvents.error, error);

    log.context("[%s] Created connection context successfully.", connectionContext.connectionId);
    return connectionContext;
  }
}
