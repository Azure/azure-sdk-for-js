// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as os from "os";
import * as process from "process";
import * as uuid from "uuid/v4";
import * as log from "./log";
import { packageJsonInfo } from "./util/constants";
import { EventHubReceiver } from "./eventHubReceiver";
import { EventHubSender } from "./eventHubSender";
import {
  TokenProvider, CbsClient, DataTransformer, DefaultDataTransformer, SasTokenProvider,
  Constants, ConnectionConfig, delay
} from "./amqp-common";
import { ManagementClient, ManagementClientOptions } from "./managementClient";
import { ClientOptions } from "./eventHubClient";
import {
  Connection, Dictionary, ConnectionOptions, OnAmqpEvent, EventContext, ConnectionEvents
} from "./rhea-promise";
import { connectionReconnectDelay, maxUserAgentLength } from "./amqp-common/util/constants";

/**
 * @interface ConnectionContext
 * @ignore
 * Provides contextual information like the underlying amqp connection, cbs session, management session,
 * tokenProvider, senders, receivers, etc. about the EventHub client.
 */
export interface ConnectionContext {
  /**
   * @property {ConnectionConfig} config The EventHub connection config that is created after parsing the connection string.
   */
  readonly config: ConnectionConfig;
  /**
   * @property {Connection} [connection] The underlying AMQP connection.
   */
  connection: Connection;
  /**
   * @property {string} [connectionId] The amqp connection id that uniquely identifies the connection within a process.
   */
  connectionId: string;
  /**
   * @property {DataTransformer} dataTransformer A DataTransformer object that has methods named
   * - encode Responsible for encoding the AMQP message before sending it on the wire.
   * - decode Responsible for decoding the received AMQP message before passing it to the customer.
   */
  dataTransformer: DataTransformer;
  /**
   * @property {boolean} wasConnectionCloseCalled Indicates whether the close() method was
   * called on theconnection object.
   */
  wasConnectionCloseCalled: boolean;
  /**
   * @property {TokenProvider} tokenProvider The TokenProvider to be used for getting tokens for authentication for the EventHub client.
   */
  readonly tokenProvider: TokenProvider;
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
  /**
   * @property {CbsClient} cbsSession A reference to the cbs session ($cbs endpoint) on the underlying
   * the amqp connection for the EventHub Client.
   */
  cbsSession: CbsClient;
  /**
   * @property {string} connectionLock The unqiue lock name per connection that is used to acquire the lock
   * for establishing an aqmp connection per client if one does not exist.
   */
  readonly connectionLock: string;
  /**
   * @property {string} negotiateClaimLock The unqiue lock name per connection that is used to acquire the lock
   * for negotiating cbs claim by an entity on that connection.
   */
  readonly negotiateClaimLock: string;
}

export interface ConnectionContextOptions extends ClientOptions {
  managementSessionAddress?: string;
  managementSessionAudience?: string;
}

export namespace ConnectionContext {

  const userAgent: string = "/js-event-hubs";

  export function getUserAgent(options: ConnectionContextOptions): string {
    const finalUserAgent = options.userAgent ? `${userAgent},${options.userAgent}` : userAgent;
    if (finalUserAgent.length > maxUserAgentLength) {
      throw new Error(`The user-agent string cannot be more than 128 characters in length.` +
        `The given user-agent string is: ${finalUserAgent} with length: ${finalUserAgent.length}`);
    }
    return finalUserAgent;
  }

  export function create(config: ConnectionConfig, options?: ConnectionContextOptions): ConnectionContext {
    if (!options) options = {};
    ConnectionConfig.validate(config, { isEntityPathRequired: true });
    const packageVersion = packageJsonInfo.version;
    const connectionOptions: ConnectionOptions = {
      transport: Constants.TLS,
      host: config.host,
      hostname: config.host,
      username: config.sharedAccessKeyName,
      port: 5671,
      reconnect: false,
      properties: {
        product: "MSJSClient",
        version: packageVersion,
        platform: `(${os.arch()}-${os.type()}-${os.release()})`,
        framework: `Node/${process.version}`,
        "user-agent": getUserAgent(options)
      }
    };
    const connection = new Connection(connectionOptions);
    const connectionLock = `${Constants.establishConnection}-${uuid()}`;
    const connectionContext: ConnectionContext = {
      wasConnectionCloseCalled: false,
      connectionLock: connectionLock,
      negotiateClaimLock: `${Constants.negotiateClaim}-${uuid()}`,
      connection: connection,
      connectionId: connection.id,
      cbsSession: new CbsClient(connection, connectionLock),
      config: config,
      tokenProvider: options.tokenProvider ||
        new SasTokenProvider(config.endpoint, config.sharedAccessKeyName, config.sharedAccessKey),
      senders: {},
      receivers: {},
      dataTransformer: options.dataTransformer || new DefaultDataTransformer()
    };
    const mOptions: ManagementClientOptions = {
      address: options.managementSessionAddress,
      audience: options.managementSessionAudience
    };
    connectionContext.managementSession = new ManagementClient(connectionContext, mOptions);

    // register handlers on the connection.
    const onConnectionOpen: OnAmqpEvent = (context: EventContext) => {
      connectionContext.wasConnectionCloseCalled = false;
      log.context("[%s] setting 'wasConnectionCloseCalled' property of connection context to %s.",
        connectionContext.connection.id, connectionContext.wasConnectionCloseCalled);
    };
    connectionContext.connection.registerHandler(ConnectionEvents.connectionOpen, onConnectionOpen);

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
        wasConnectionCloseCalled: boolean; numSenders: number; numReceivers: number;
      }> = {
        wasConnectionCloseCalled: connectionContext.wasConnectionCloseCalled,
        numSenders: Object.keys(connectionContext.senders).length,
        numReceivers: Object.keys(connectionContext.receivers).length
      };
      // The connection should always be brought back up if the sdk did not call connection.close()
      // and there was atleast one sender/receiver link on the connection before it went down.
      log.error("[%s] state: %O", connectionContext.connection.id, state);
      if (!state.wasConnectionCloseCalled && (state.numSenders || state.numReceivers)) {
        log.error("[%s] connection.close() was not called from the sdk and there were some " +
          "sender or receiver links or both. We should reconnect.", connectionContext.connection.id);
        await delay(connectionReconnectDelay);
        // reconnect senders if any
        for (const sender of Object.values(connectionContext.senders)) {
          if (!sender.isConnecting) {
            log.error("[%s] calling detached on sender '%s' with address '%s'.",
              connectionContext.connection.id, sender.name, sender.address);
            sender.detached().catch((err) => {
              log.error("[%s] An error occurred while reconnecting the sender '%s' with adress '%s' %O.",
                connectionContext.connection.id, sender.name, sender.address, err);
            });
          } else {
            log.error("[%s] sender '%s' with address '%s' is already reconnecting. Hence not " +
              "calling detached on the sender.", connectionContext.connection.id, sender.name,
              sender.address);
          }
        }
        // reconnect receivers if any
        for (const receiver of Object.values(connectionContext.receivers)) {
          if (!receiver.isConnecting) {
            log.error("[%s] calling detached on receiver '%s' with address '%s'.",
              connectionContext.connection.id, receiver.name, receiver.address);
            receiver.detached().catch((err) => {
              log.error("[%s] An error occurred while reconnecting the receiver '%s' with adress '%s' %O.",
                connectionContext.connection.id, receiver.name, receiver.address, err);
            });
          } else {
            log.error("[%s] receiver '%s' with address '%s' is already reconnecting. Hence not " +
              "calling detached on the receiver.", connectionContext.connection.id, receiver.name,
              receiver.address);
          }
        }
      }
    };
    connectionContext.connection.registerHandler(ConnectionEvents.disconnected, disconnected);

    log.context("[%s] Created connection context successfully.", connectionContext.connectionId);
    return connectionContext;
  }
}
