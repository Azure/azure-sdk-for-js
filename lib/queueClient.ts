// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as debugModule from "debug";
import {
  ApplicationTokenCredentials, DeviceTokenCredentials, UserTokenCredentials, MSITokenCredentials
} from "ms-rest-azure";
import {
  ConnectionConfig, MessagingError, DataTransformer, TokenProvider, AadTokenProvider
} from "./amqp-common";
import { Delivery } from "./rhea-promise";
import { ConnectionContext } from "./connectionContext";
import { MessageSender } from "./messageSender";
import { ReceiveOptions, OnError, OnMessage } from ".";
import { StreamingReceiver, ReceiveHandler } from "./streamingReceiver";
import { BatchingReceiver } from "./batchingReceiver";
import { Message, SBMessage } from './message';
const debug = debugModule("azure:service-bus:queue-client");

/**
 * The mode in which messages should be received
 */
export enum ReceiveMode {
  /**
   * Peek the message and lock it until it is settled or times out.
   * @type {Number}
   */
  peekLock = 1,

  /**
   * Remove the message from the service bus upon delivery.
   * @type {Number}
   */
  receiveAndDelete = 2
}

/**
 * Describes the base client options.
 * @interface ClientOptionsBase
 */
export interface ClientOptionsBase {
  /**
   * @property {DataTransformer} [dataTransformer] The data transformer that will be used to encode
   * and decode the sent and received messages respectively. If not provided then we will use the
   * DefaultDataTransformer. The default transformer should handle majority of the cases. This
   * option needs to be used only for specialized scenarios.
   */
  dataTransformer?: DataTransformer;
}

/**
 * Describes the options that can be provided while creating the QueueClient.
 * @interface ClientOptions
 */
export interface ClientOptions extends ClientOptionsBase {
  /**
   * @property {TokenProvider} [tokenProvider] - The token provider that provides the token
   * for authentication. Default value: SasTokenProvider.
   */
  tokenProvider?: TokenProvider;
}

export class QueueClient {
  /**
   * @property {string} [connectionId] The amqp connection id that uniquely identifies the connection within a process.
   */
  connectionId?: string;
  /**
   * @property {ConnectionContext} _context Describes the amqp connection context for the QueueClient.
   * @private
   */
  private _context: ConnectionContext;

  /**
   * Instantiates a client pointing to the ServiceBus Queue given by this configuration.
   *
   * @constructor
   * @param {ConnectionConfig} config - The connection configuration to create the QueueClient.
   * @param {TokenProvider} [tokenProvider] - The token provider that provides the token for authentication.
   * Default value: SasTokenProvider.
   */
  constructor(config: ConnectionConfig, options?: ClientOptions) {
    if (!options) options = {};
    this._context = ConnectionContext.create(config, options);
  }

  /**
   * Closes the AMQP connection to the ServiceBus Queue for this client,
   * returning a promise that will be resolved when disconnection is completed.
   * @returns {Promise<any>}
   */
  async close(): Promise<any> {
    try {
      if (this._context.connection) {
        // Close all the senders.
        for (const sender of Object.values(this._context.senders)) {
          await sender.close();
        }
        // Close all the receivers.
        for (const receiver of Object.values(this._context.receivers)) {
          await receiver.close();
        }
        // Close the cbs session;
        await this._context.cbsSession!.close();
        // Close the management session
        await this._context.managementSession!.close();
        await this._context.connection.close();
        debug("Closed the amqp connection '%s' on the client.", this._context.connectionId);
        this._context.connection = undefined;
      }
    } catch (err) {
      const msg = `An error occurred while closing the connection "${this._context.connectionId}": ${JSON.stringify(err)}`;
      debug(msg);
      throw new Error(msg);
    }
  }

  /**
   * Sends the given message to the ServiceBus Queue.
   *
   * @param {any} data  Message to send.  Will be sent as UTF8-encoded JSON string.
   * @returns {Promise<Delivery>} Promise<Delivery>
   */
  async send(data: SBMessage, partitionId?: string | number): Promise<Delivery> {
    const sender = MessageSender.create(this._context);
    return await sender.send(data);
  }

  /**
   * Send a batch of Message to the ServiceBus Queue. The "message_annotations", "application_properties"
   * and "properties" of the first message will be set as that of the envelope (batch message).
   *
   * @param {Array<Message>} datas  An array of Message objects to be sent in a Batch
   * message.
   *
   * @return {Promise<Delivery>} Promise<Delivery>
   */
  async sendBatch(datas: SBMessage[]): Promise<Delivery> {
    const sender = MessageSender.create(this._context);
    return await sender.sendBatch(datas);
  }

  /**
   * Starts the receiver by establishing an AMQP session and an AMQP receiver link on the session.
   * Messages will be passed to the provided onMessage handler and error will be passed to the
   * provided onError handler.
   *
   * @param {string|number} partitionId    Partition ID from which to receive.
   * @param {OnMessage} onMessage          The message handler to receive Message objects.
   * @param {OnError} onError              The error handler to receive an error that occurs
   * while receiving messages.
   * @param {ReceiveOptions} [options]     Options for how you'd like to connect.
   *
   * @returns {ReceiveHandler} ReceiveHandler - An object that provides a mechanism to stop receiving more messages.
   */
  receive(onMessage: OnMessage, onError: OnError, options?: ReceiveOptions): ReceiveHandler {
    const sReceiver = StreamingReceiver.create(this._context, options);
    this._context.receivers[sReceiver.name] = sReceiver;
    sReceiver.receive(onMessage, onError);
    return new ReceiveHandler(sReceiver);
  }

  /**
   * Receives a batch of Message objects from a ServiceBus Queue for a given count and a
   * given max wait time in seconds, whichever happens first.
   * @param {number} maxMessageCount        The maximum message count. Must be a value greater than 0.
   * @param {number} [maxWaitTimeInSeconds] The maximum wait time in seconds for which the Receiver
   * should wait to receiver the said amount of messages. If not provided, it defaults to 60 seconds.
   * @param {ReceiveOptions} [options]      Options for how you'd like to connect.
   *
   * @returns {Promise<Message[]>} A promise that resolves with an array of Message objects.
   */
  async receiveBatch(maxMessageCount: number, maxWaitTimeInSeconds?: number, options?: ReceiveOptions): Promise<Message[]> {
    const bReceiver: BatchingReceiver = BatchingReceiver.create(this._context, options);
    let error: MessagingError | undefined;
    let result: Message[] = [];
    try {
      result = await bReceiver.receive(maxMessageCount, maxWaitTimeInSeconds);
    } catch (err) {
      error = err;
      debug("[%s] Receiver '%s', an error occurred while receiving %d messages for %d max time:\n %O",
        this._context.connectionId, bReceiver.name, maxMessageCount, maxWaitTimeInSeconds, err);
    }
    try {
      await bReceiver.close();
    } catch (err) {
      // do nothing about it.
    }
    if (error) {
      throw error;
    }
    return result;
  }

  /**
   * Creates a QueueClient from connection string.
   * @param {string} connectionString - Connection string of the form 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key'
   * @param {string} [path] - Name of the queue.
   * @param {ClientOptions} [options] Options that can be provided during client creation.
   * @param {TokenProvider} [options.tokenProvider] - An instance of the token provider that
   * provides the token for authentication. Default value: SasTokenProvider.
   * @returns {QueueClient} - An instance of the QueueClient.
   */
  static createFromConnectionString(connectionString: string, path?: string, options?: ClientOptions): QueueClient {
    if (!connectionString || (connectionString && typeof connectionString !== "string")) {
      throw new Error("'connectionString' is a required parameter and must be of type: 'string'.");
    }
    const config = ConnectionConfig.create(connectionString, path);

    if (!config.entityPath) {
      throw new Error(`Either the connectionString must have "EntityPath=<path-to-entity>" or you must provide "path", while creating the client`);
    }
    return new QueueClient(config, options);
  }

  /**
   * Creates a QueueClient from AADTokenCredentials.
   * @param {string} host - Fully qualified domain name for ServiceBus.
   * Most likely, {yournamespace}.servicebus.windows.net
   * @param {string} entityPath - Name of the queue.
   * @param {TokenCredentials} credentials - The AAD Token credentials.
   * It can be one of the following: ApplicationTokenCredentials | UserTokenCredentials |
   * DeviceTokenCredentials | MSITokenCredentials.
   * @param {ClientOptionsBase} options - The options that can be provided during client creation.
   * @returns {QueueClient} An instance of the QueueClient.
   */
  static createFromAadTokenCredentials(
    host: string,
    entityPath: string,
    credentials: ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials,
    options?: ClientOptionsBase): QueueClient {
    if (!host || (host && typeof host !== "string")) {
      throw new Error("'host' is a required parameter and must be of type: 'string'.");
    }

    if (!entityPath || (entityPath && typeof entityPath !== "string")) {
      throw new Error("'entityPath' is a required parameter and must be of type: 'string'.");
    }

    if (!credentials ||
      !(credentials instanceof ApplicationTokenCredentials ||
        credentials instanceof UserTokenCredentials ||
        credentials instanceof DeviceTokenCredentials ||
        credentials instanceof MSITokenCredentials)) {
      throw new Error("'credentials' is a required parameter and must be an instance of ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials.");
    }

    if (!host.endsWith("/")) host += "/";
    const connectionString = `Endpoint=sb://${host};SharedAccessKeyName=defaultKeyName;SharedAccessKey=defaultKeyValue`;
    if (!options) options = {};
    const clientOptions: ClientOptions = options;
    clientOptions.tokenProvider = new AadTokenProvider(credentials);
    return QueueClient.createFromConnectionString(connectionString, entityPath, clientOptions);
  }
}

