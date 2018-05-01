// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as debugModule from "debug";
import { closeConnection, Delivery } from "./rhea-promise";
import { ApplicationTokenCredentials, DeviceTokenCredentials, UserTokenCredentials, MSITokenCredentials } from "ms-rest-azure";
import { ConnectionConfig, OnMessage, OnError, EventData, EventHubsError } from ".";
import * as rpc from "./rpc";
import { ConnectionContext } from "./connectionContext";
import { TokenProvider } from "./auth/token";
import { AadTokenProvider } from "./auth/aad";
import { EventHubPartitionRuntimeInformation, EventHubRuntimeInformation } from "./managementClient";
import { EventPosition } from "./eventPosition";
import { EventHubSender } from "./eventHubSender";
import { StreamingReceiver, ReceiveHandler } from "./streamingReceiver";
import { BatchingReceiver } from "./batchingReceiver";
const debug = debugModule("azure:event-hubs:client");

export interface ReceiveOptions {
  /**
   * @property {string} [name] The name of the receiver. If not provided then we will set a GUID by default.
   */
  name?: string;
  /**
   * @property {object} [eventPosition] The starting event position at which to start receiving messages.
   * This is used to filter messages for the EventHub Receiver.
   */
  eventPosition?: EventPosition;
  /**
   * @property {string} [consumerGroup] The consumer group to which the receiver wants to connect to.
   * If not provided then it will be connected to "$default" consumer group.
   */
  consumerGroup?: string;
  /**
   * @property {number} [prefetchCount] The upper limit of events this receiver will actively receive
   * regardless of whether a receive operation is pending. Defaults to 1000.
   */
  prefetchCount?: number;
  /**
   * @property {number} [epoch] The epoch value that this receiver is currently using for partition ownership.
   */
  epoch?: number;
  /**
   * @property {string} [identifier] The receiver identifier that uniqely identifies the receiver.
   */
  identifier?: string;
  /**
   * @property {boolean} [enableReceiverRuntimeMetric] A value indicating whether the runtime metric of a receiver is enabled.
   */
  enableReceiverRuntimeMetric?: boolean;
}

/**
 * Describes the base client options.
 */
export interface ClientOptionsBase {
  /**
   * @property {Function} [encoder] A function that takes the body property from an EventData object
   * and returns an encoded body.
   */
  encoder?: (body: any) => any;
  /**
   * @property {Function} [decoder] A function that takes the body property from an AMQP message
   * and returns the decoded message body.
   */
  decoder?: (body: any) => any;
}

export interface ClientOptions extends ClientOptionsBase {
  /**
   * @property {TokenProvider} [tokenProvider] - The token provider that provides the token for authentication.
   * Default value: SasTokenProvider.
   */
  tokenProvider?: TokenProvider;
}

/**
 * @class EventHubClient
 * Describes the EventHub client.
 */
export class EventHubClient {

  /**
   * @property {string} [connectionId] The amqp connection id that uniquely identifies the connection within a process.
   */
  connectionId?: string;
  /**
   * @property {ConnectionContext} _context Describes the amqp connection context for the eventhub client.
   * @private
   */
  private _context: ConnectionContext;

  /**
   * Instantiates a client pointing to the Event Hub given by this configuration.
   *
   * @constructor
   * @param {ConnectionConfig} config - The connection configuration to create the EventHub Client.
   * @param {TokenProvider} [tokenProvider] - The token provider that provides the token for authentication.
   * Default value: SasTokenProvider.
   */
  constructor(config: ConnectionConfig, options?: ClientOptions) {
    if (!options) options = {};
    this._context = ConnectionContext.create(config, options);
  }

  /**
   * Closes the AMQP connection to the Event Hub for this client,
   * returning a promise that will be resolved when disconnection is completed.
   * @method close
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
        await this._context.cbsSession.close();
        // Close the management session
        await this._context.managementSession.close();
        await closeConnection(this._context.connection);
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
   * Sends the given message to the EventHub.
   *
   * @method send
   * @param {any} data                    Message to send.  Will be sent as UTF8-encoded JSON string.
   * @param {string|number} [partitionId] Partition ID to which the event data needs to be sent. This should only be specified
   * if you intend to send the event to a specific partition. When not specified EventHub will store the messages in a round-robin
   * fashion amongst the different partitions in the EventHub.
   *
   * @returns {Promise<Delivery>} Promise<rheaPromise.Delivery>
   */
  async send(data: EventData, partitionId?: string | number): Promise<Delivery> {
    const sender = EventHubSender.create(this._context, partitionId);
    return await sender.send(data);
  }

  /**
   * Send a batch of EventData to the EventHub. The "message_annotations", "application_properties" and "properties"
   * of the first message will be set as that of the envelope (batch message).
   *
   * @method sendBatch
   * @param {Array<EventData>} datas  An array of EventData objects to be sent in a Batch message.
   * @param {string|number} [partitionId] Partition ID to which the event data needs to be sent. This should only be specified
   * if you intend to send the event to a specific partition. When not specified EventHub will store the messages in a round-robin
   * fashion amongst the different partitions in the EventHub.
   *
   * @return {Promise<rheaPromise.Delivery>} Promise<rheaPromise.Delivery>
   */
  async sendBatch(datas: EventData[], partitionId?: string | number): Promise<Delivery> {
    const sender = EventHubSender.create(this._context, partitionId);
    return await sender.sendBatch(datas);
  }

  /**
   * Starts the receiver by establishing an AMQP session and an AMQP receiver link on the session. Messages will be passed to
   * the provided onMessage handler and error will be passes to the provided onError handler.
   *
   * @param {string|number} partitionId                        Partition ID from which to receive.
   * @param {OnMessage} onMessage                              The message handler to receive event data objects.
   * @param {OnError} onError                                  The error handler to receive an error that occurs
   * while receiving messages.
   * @param {ReceiveOptions} [options]                         Options for how you'd like to connect.
   * @param {string} [name]                                    The name of the receiver. If not provided
   * then we will set a GUID by default.
   * @param {string} [options.consumerGroup]                   Consumer group from which to receive.
   * @param {number} [options.prefetchCount]                   The upper limit of events this receiver will
   * actively receive regardless of whether a receive operation is pending.
   * @param {boolean} [options.enableReceiverRuntimeMetric]    Provides the approximate receiver runtime information
   * for a logical partition of an Event Hub if the value is true. Default false.
   * @param {number} [options.epoch]                           The epoch value that this receiver is currently
   * using for partition ownership. A value of undefined means this receiver is not an epoch-based receiver.
   * @param {EventPosition} [options.eventPosition]            The position of EventData in the EventHub parition from
   * where the receiver should start receiving. Only one of offset, sequenceNumber, enqueuedTime, customFilter can be specified.
   * `EventPosition.withCustomFilter()` should be used if you want more fine-grained control of the filtering.
   * See https://github.com/Azure/amqpnetlite/wiki/Azure%20Service%20Bus%20Event%20Hubs for details.
   *
   * @returns {ReceiveHandler} ReceiveHandler - An object that provides a mechanism to stop receiving more messages.
   */
  receive(partitionId: string | number, onMessage: OnMessage, onError: OnError, options?: ReceiveOptions): ReceiveHandler {
    if (!partitionId || (partitionId && typeof partitionId !== "string" && typeof partitionId !== "number")) {
      throw new Error("'partitionId' is a required parameter and must be of type: 'string' | 'number'.");
    }
    const sReceiver = StreamingReceiver.create(this._context, partitionId, options);
    this._context.receivers[sReceiver.name] = sReceiver;
    sReceiver.receive(onMessage, onError);
    return new ReceiveHandler(sReceiver);
  }

  /**
   * Receives a batch of EventData objects from an EventHub partition for a given count and a given max wait time in seconds, whichever
   * happens first. This method can be used directly after creating the receiver object and **MUST NOT** be used along with the `start()` method.
   *
   * @param {string|number} partitionId                        Partition ID from which to receive.
   * @param {number} maxMessageCount                           The maximum message count. Must be a value greater than 0.
   * @param {number} [maxWaitTimeInSeconds]                    The maximum wait time in seconds for which the Receiver should wait
   * to receiver the said amount of messages. If not provided, it defaults to 60 seconds.
   * @param {ReceiveOptions} [options]                         Options for how you'd like to connect.
   * @param {string} [name]                                    The name of the receiver. If not provided
   * then we will set a GUID by default.
   * @param {string} [options.consumerGroup]                   Consumer group from which to receive.
   * @param {number} [options.prefetchCount]                   The upper limit of events this receiver will
   * actively receive regardless of whether a receive operation is pending.
   * @param {boolean} [options.enableReceiverRuntimeMetric]    Provides the approximate receiver runtime information
   * for a logical partition of an Event Hub if the value is true. Default false.
   * @param {number} [options.epoch]                           The epoch value that this receiver is currently
   * using for partition ownership. A value of undefined means this receiver is not an epoch-based receiver.
   * @param {EventPosition} [options.eventPosition]            The position of EventData in the EventHub parition from
   * where the receiver should start receiving. Only one of offset, sequenceNumber, enqueuedTime, customFilter can be specified.
   * `EventPosition.withCustomFilter()` should be used if you want more fine-grained control of the filtering.
   * See https://github.com/Azure/amqpnetlite/wiki/Azure%20Service%20Bus%20Event%20Hubs for details.
   *
   * @returns {Promise<EventData[]>} A promise that resolves with an array of EventData objects.
   */
  async receiveBatch(partitionId: string | number, maxMessageCount: number, maxWaitTimeInSeconds?: number, options?: ReceiveOptions): Promise<EventData[]> {
    if (!partitionId || (partitionId && typeof partitionId !== "string" && typeof partitionId !== "number")) {
      throw new Error("'partitionId' is a required parameter and must be of type: 'string' | 'number'.");
    }
    const bReceiver = BatchingReceiver.create(this._context, partitionId, options);
    let error: EventHubsError | undefined;
    let result: EventData[] = [];
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
   * Provides the eventhub runtime information.
   * @method getHubRuntimeInformation
   * @returns {Promise<EventHubRuntimeInformation>}
   */
  async getHubRuntimeInformation(): Promise<EventHubRuntimeInformation> {
    try {
      await rpc.open(this._context);
      return await this._context.managementSession.getHubRuntimeInformation(this._context.connection);
    } catch (err) {
      debug("An error occurred while getting the hub runtime information: %O", err);
      throw err;
    }
  }

  /**
   * Provides an array of partitionIds.
   * @method getPartitionIds
   * @returns {Promise<Array<string>>}
   */
  async getPartitionIds(): Promise<Array<string>> {
    try {
      const runtimeInfo = await this.getHubRuntimeInformation();
      return runtimeInfo.partitionIds;
    } catch (err) {
      debug("An error occurred while getting the partition ids: %O", err);
      throw err;
    }
  }

  /**
   * Provides information about the specified partition.
   * @method getPartitionInformation
   * @param {(string|number)} partitionId Partition ID for which partition information is required.
   */
  async getPartitionInformation(partitionId: string | number): Promise<EventHubPartitionRuntimeInformation> {
    if (!partitionId || (partitionId && typeof partitionId !== "string" && typeof partitionId !== "number")) {
      throw new Error("'partitionId' is a required parameter and must be of type: 'string' | 'number'.");
    }
    try {
      await rpc.open(this._context);
      return await this._context.managementSession.getPartitionInformation(this._context.connection, partitionId);
    } catch (err) {
      debug("An error occurred while getting the partition information: %O", err);
      throw err;
    }
  }

  /**
   * Creates an EventHub Client from connection string.
   * @method createFromConnectionString
   * @param {string} connectionString - Connection string of the form 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key'
   * @param {string} [path] - EventHub path of the form 'my-event-hub-name'
   * @param {ClientOptions} [options] Options that can be provided during client creation.
   * @param {TokenProvider} [options.tokenProvider] - An instance of the token provider that provides the token for authentication. Default value: SasTokenProvider.
   * @returns {EventHubClient} - An instance of the eventhub client.
   */
  static createFromConnectionString(connectionString: string, path?: string, options?: ClientOptions): EventHubClient {
    if (!connectionString || (connectionString && typeof connectionString !== "string")) {
      throw new Error("'connectionString' is a required parameter and must be of type: 'string'.");
    }
    const config = ConnectionConfig.create(connectionString, path);

    if (!config.entityPath) {
      throw new Error(`Either the connectionString must have "EntityPath=<path-to-entity>" or you must provide "path", while creating the client`);
    }
    return new EventHubClient(config, options);
  }

  /**
   * Creates an EventHub Client from AADTokenCredentials.
   * @method
   * @param {string} host - Fully qualified domain name for Event Hubs. Most likely, {yournamespace}.servicebus.windows.net
   * @param {string} entityPath - EventHub path of the form 'my-event-hub-name'
   * @param {TokenCredentials} credentials - The AAD Token credentials. It can be one of the following: ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials.
   * @param {ClientOptionsBase} options - The options that can be provided during client creation.
   * @returns {EventHubClient} An instance of the Eventhub client.
   */
  static createFromAadTokenCredentials(
    host: string,
    entityPath: string,
    credentials: ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials,
    options?: ClientOptionsBase): EventHubClient {
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
    return EventHubClient.createFromConnectionString(connectionString, entityPath, clientOptions);
  }
}
