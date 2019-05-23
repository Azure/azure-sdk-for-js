// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as log from "./log";
import { WebSocketImpl } from "rhea-promise";
import {
  ApplicationTokenCredentials,
  DeviceTokenCredentials,
  UserTokenCredentials,
  MSITokenCredentials
} from "@azure/ms-rest-nodeauth";
import {
  MessagingError,
  DataTransformer,
  TokenProvider,
  EventHubConnectionConfig,
  AadTokenProvider,
  SasTokenProvider,
  ConnectionConfig,
  Constants
} from "@azure/amqp-common";
import { OnMessage, OnError } from "./eventHubReceiver";
import { EventData, ReceivedEventData } from "./eventData";
import { ConnectionContext } from "./connectionContext";
import { PartitionInformation, HubInformation } from "./managementClient";
import { EventPosition } from "./eventPosition";
import { EventHubSender } from "./eventHubSender";
import { StreamingReceiver, ReceiveHandler } from "./streamingReceiver";
import { BatchingReceiver } from "./batchingReceiver";
import { IotHubClient } from "./iothub/iothubClient";
import { Aborter } from "./aborter";

/**
 * LogLevel that defines the level of logging to be used
 */
export enum LogLevel {
  /**
   * No logging will be done
   */
  None,
  /**
   * Only logs pertaining to errors will be presented
   */
  Error,
  /**
   * Only logs pertaining to warnings and errors will be presented
   */
  Warning,
  /**
   * Only informational logs along with errors and warnings will be presented
   */
  Info,
  /**
   * All possible logs will be presented
   */
  Verbose
}

/**
 * Retry policy options for operations on the EventHubClient
 */
export interface RetryOptions {
  /**
   * Number of times to attempt an operation on failure
   */
  retryCount?: number;
  /**
   * Number of seconds to wait between retries
   */
  delayBetweenRetriesInSeconds?: number;
}

/**
 * Options that can be passed to each operation on the EventHubsClient
 */
export interface RequestOptions {
  /**
   * Retry policy options for operations on the EventHubClient
   */
  retryOptions?: RetryOptions;
  /**
   * Number of seconds to wait before declaring an opetration to have timed out
   */
  timeoutInSeconds?: number;
  /**
   * The cancellation token used to cancel the current request
   */
  cancellationToken?: Aborter;
  /**
   * Log level to use for the current operation. This overrides the value set when creating the EventHubsClient
   */
  logLevel?: LogLevel;
}

/**
 * Options that can be passed when sending a batch of events using the EventHubsClient
 */
export interface BatchingOptions extends RequestOptions {
  /**
   * The id of the partition to which the event should be sent
   */
  partitionId?: string;
  /**
   * @property {string | null} [batchLabel] If specified EventHub will hash this string to a partitionId.
   * It guarantees that messages end up in the same partition on the event hub.
   * This will be ignored if `paritionId` is used when sending events.
   */
  batchLabel?: string | null;
}

/**
 * Options that can be passed to the receive operations on the EventHubsClient
 * @interface ReceiveOptions
 */
export interface ReceiveOptions extends RequestOptions {
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
   * @property {number} [epoch] The epoch value that this receiver is currently using for partition ownership.
   */
  epoch?: number;
  /**
   * @property {boolean} [enableReceiverRuntimeMetric] A value indicating whether the runtime metric of a receiver is enabled.
   */
  enableReceiverRuntimeMetric?: boolean;
}

/**
 * Describes the options that can be provided while creating the EventHub Client.
 * @interface ClientOptions
 */
export interface ClientOptions {
  /**
   * @property {DataTransformer} [dataTransformer] The data transformer that will be used to encode
   * and decode the sent and received messages respectively. If not provided then we will use the
   * DefaultDataTransformer. The default transformer should handle majority of the cases. This
   * option needs to be used only for specialized scenarios.
   */
  dataTransformer?: DataTransformer;
  /**
   * @property {string} [userAgent] The user agent that needs to be appended to the built in
   * user agent string.
   */
  userAgent?: string;
  /**
   * @property {WebSocketImpl} [webSocket] - The WebSocket constructor used to create an AMQP connection
   * over a WebSocket. In browsers, the built-in WebSocket will be  used by default. In Node, a
   * TCP socket will be used if a WebSocket constructor is not provided.
   */
  webSocket?: WebSocketImpl;
  /**
   * @property {webSocketConstructorOptions} - Options to be passed to the WebSocket constructor
   */
  webSocketConstructorOptions?: any;
  /**
   * LogLevel that defines the level of logging to be used. The logLevel set on each operation of the
   * EventHubsClient will override this value
   */
  logLevel?: LogLevel;
}

/**
 * @class EventHubClient
 * Describes the EventHub client.
 */
export class EventHubClient {
  /**
   * @property {string} eventhubName The name of the Eventhub.
   * @readonly
   */
  get hubPath(): string {
    return this._context.config.entityPath!;
  }

  /**
   * @property {ConnectionContext} _context Describes the amqp connection context for the eventhub client.
   * @private
   */
  private _context: ConnectionContext;

  /**
   * @constructor
   * @param host - Fully qualified domain name for Event Hubs. Most likely,
   * <yournamespace>.servicebus.windows.net
   * @param entityPath - EventHub path of the form 'my-event-hub-name'
   * @param tokenProvider - Your token provider that implements the TokenProvider interface.
   * @param options - The options that can be provided during client creation.
   */
  constructor(host: string, entityPath: string, tokenProvider: TokenProvider, options?: ClientOptions);
  /**
   * @constructor
   * @param host - Fully qualified domain name for Event Hubs. Most likely,
   * <yournamespace>.servicebus.windows.net
   * @param entityPath - EventHub path of the form 'my-event-hub-name'
   * @param credentials - The Token credentials as implemented in the `ms-rest-nodeauth` library. It can be one of the following:
   *  - ApplicationTokenCredentials
   *  - UserTokenCredentials
   *  - DeviceTokenCredentials
   *  - MSITokenCredentials.
   * @param options - The options that can be provided during client creation.
   */
  constructor(
    host: string,
    entityPath: string,
    credentials: ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials,
    options?: ClientOptions
  );
  constructor(
    host: string,
    entityPath: string,
    tokenProviderOrCredentials:
      | TokenProvider
      | ApplicationTokenCredentials
      | UserTokenCredentials
      | DeviceTokenCredentials
      | MSITokenCredentials,
    options?: ClientOptions
  ) {
    if (!host) {
      throw new Error(
        "Please provide a fully qualified domain name of your Event Hub instance for the 'host' parameter."
      );
    }

    if (!entityPath) {
      throw new Error("Please provide a value for the 'entityPath' parameter.");
    }

    if (!tokenProviderOrCredentials) {
      throw new Error("Please provide either a token provider or a valid credentials object.");
    }

    let sharedAccessKeyName = "defaultKeyName";
    let sharedAccessKey = "defaultKeyValue";
    let tokenProvider: TokenProvider;
    if (
      tokenProviderOrCredentials instanceof ApplicationTokenCredentials ||
      tokenProviderOrCredentials instanceof UserTokenCredentials ||
      tokenProviderOrCredentials instanceof DeviceTokenCredentials ||
      tokenProviderOrCredentials instanceof MSITokenCredentials
    ) {
      tokenProvider = new AadTokenProvider(tokenProviderOrCredentials);
    } else {
      tokenProvider = tokenProviderOrCredentials;
      if (tokenProvider instanceof SasTokenProvider) {
        sharedAccessKeyName = tokenProvider.keyName;
        sharedAccessKey = tokenProvider.key;
      }
    }

    if (!host.endsWith("/")) host += "/";
    if (!options) options = {};

    const connectionString = `Endpoint=sb://${host};SharedAccessKeyName=${sharedAccessKeyName};SharedAccessKey=${sharedAccessKey}`;
    const config = EventHubConnectionConfig.create(connectionString, entityPath);
    this._context = ConnectionContext.create(config, tokenProvider, options);
  }

  /**
   * Closes the AMQP connection to the Event Hub for this client,
   * returning a promise that will be resolved when disconnection is completed.
   * @returns {Promise<void>} Promise<void>
   */
  async close(): Promise<void> {
    try {
      if (this._context.connection.isOpen()) {
        // Close all the senders.
        for (const senderName of Object.keys(this._context.senders)) {
          await this._context.senders[senderName].close();
        }
        // Close all the receivers.
        for (const receiverName of Object.keys(this._context.receivers)) {
          await this._context.receivers[receiverName].close();
        }
        // Close the cbs session;
        await this._context.cbsSession.close();
        // Close the management session
        await this._context.managementSession!.close();
        await this._context.connection.close();
        this._context.wasConnectionCloseCalled = true;
        log.client("Closed the amqp connection '%s' on the client.", this._context.connectionId);
      }
    } catch (err) {
      err = err instanceof Error ? err : JSON.stringify(err);
      log.error(`An error occurred while closing the connection "${this._context.connectionId}":\n${err}`);
      throw err;
    }
  }

  /**
   * Send a batch of EventData to the EventHub.
   *
   * @param data  An array of EventData objects to be sent in a Batch message.
   * @param partitionId Partition ID to which the event data needs to be sent. When not specified EventHub will store
   * the messages in a round-robin fashion amongst the different partitions in the EventHub.
   *
   * @return Promise<void>
   */
  async send(data: EventData[], partitionId?: string): Promise<void>;
  /**
   * Send a batch of EventData to the EventHub using the options provided.
   *
   * @param data  An array of EventData objects to be sent in a Batch message.
   * @param options Options where you can specifiy the partition to send the message to along with controlling the send
   * request via retry options, log level and cancellation token.
   *
   * @return {Promise<void>} Promise<void>
   */
  async send(data: EventData[], options?: BatchingOptions): Promise<void>;
  async send(data: EventData[], partitionIdOrOptions?: string | BatchingOptions): Promise<void> {
    let partitionId: string | undefined;
    let batchingOptions: BatchingOptions = {};
    if (typeof partitionIdOrOptions === "string" || typeof partitionIdOrOptions === "number") {
      partitionId = partitionIdOrOptions;
    } else if (partitionIdOrOptions) {
      partitionId = partitionIdOrOptions.partitionId;
      batchingOptions = partitionIdOrOptions;
    }
    const sender = EventHubSender.create(this._context, partitionId);
    return sender.send(data, batchingOptions);
  }

  /**
   * Starts the receiver by establishing an AMQP session and an AMQP receiver link on the session. Messages will be passed to
   * the provided onMessage handler and error will be passed to the provided onError handler.
   *
   * @param {string|number} partitionId                        Partition ID from which to receive.
   * @param {OnMessage} onMessage                              The message handler to receive event data objects.
   * @param {OnError} onError                                  The error handler to receive an error that occurs
   * while receiving messages.
   * @param {ReceiveOptions} [options]                         Options for how you'd like to receive messages.
   *
   * @returns {ReceiveHandler} ReceiveHandler - An object that provides a mechanism to stop receiving more messages.
   */
  receive(partitionId: string, onMessage: OnMessage, onError: OnError, options?: ReceiveOptions): ReceiveHandler;
  /**
   * Starts the receiver by establishing an AMQP session and an AMQP receiver link on the session. Messages will be passed to
   * the provided onMessage handler and error will be passed to the provided onError handler.
   *
   * @param {string|number} partitionId                        Partition ID from which to receive.
   * @param {OnMessage} onMessage                              The message handler to receive event data objects.
   * @param {OnError} onError                                  The error handler to receive an error that occurs
   * while receiving messages.
   * @param {ReceiveOptions} [options]                         Options for how you'd like to receive messages.
   *
   * @returns {ReceiveHandler} ReceiveHandler - An object that provides a mechanism to stop receiving more messages.
   */
  receive(partitionId: string, onMessage: OnMessage, onError: OnError, maxConcurrentCalls: number, options?: ReceiveOptions): ReceiveHandler;
  receive(partitionId: string, onMessage: OnMessage, onError: OnError, maxConcurrentCallsOrOptions?: number | ReceiveOptions, options?: ReceiveOptions): ReceiveHandler {
    if (typeof partitionId !== "string" && typeof partitionId !== "number") {
      throw new Error("'partitionId' is a required parameter and must be of type: 'string' | 'number'.");
    }
    let maxConcurrentCalls = Constants.defaultPrefetchCount;
    if (typeof maxConcurrentCallsOrOptions === "number") {
      // TODO: Enable manual credit management in this case
      maxConcurrentCalls = maxConcurrentCallsOrOptions;
    } else {
      options = maxConcurrentCallsOrOptions;
    }
    const sReceiver = StreamingReceiver.create(this._context, partitionId, options);
    sReceiver.prefetchCount = maxConcurrentCalls;
    this._context.receivers[sReceiver.name] = sReceiver;
    return sReceiver.receive(onMessage, onError);
  }

  /**
   * Receives a batch of EventData objects from an EventHub partition for a given count and a given max wait time in seconds, whichever
   * happens first. This method can be used directly after creating the receiver object and **MUST NOT** be used along with the `start()` method.
   *
   * @param {string|number} partitionId                        Partition ID from which to receive.
   * @param {number} maxMessageCount                           The maximum message count. Must be a value greater than 0.
   * @param {number} [maxWaitTimeInSeconds]                    The maximum wait time in seconds for which the Receiver should wait
   * to receiver the said amount of messages. If not provided, it defaults to 60 seconds.
   * @param {ReceiveOptions} [options]                         Options for how you'd like to receive messages.
   *
   * @returns {Promise<Array<EventData>>} Promise<Array<EventData>>.
   */
  async receiveBatch(
    partitionId: string,
    maxMessageCount: number,
    options?: ReceiveOptions
  ): Promise<ReceivedEventData[]>;
  /**
   * Receives a batch of EventData objects from an EventHub partition for a given count and a given max wait time in seconds, whichever
   * happens first. This method can be used directly after creating the receiver object and **MUST NOT** be used along with the `start()` method.
   *
   * @param {string|number} partitionId                        Partition ID from which to receive.
   * @param {number} maxMessageCount                           The maximum message count. Must be a value greater than 0.
   * @param {number} [maxWaitTimeInSeconds]                    The maximum wait time in seconds for which the Receiver should wait
   * to receiver the said amount of messages. If not provided, it defaults to 60 seconds.
   * @param {ReceiveOptions} [options]                         Options for how you'd like to receive messages.
   *
   * @returns {Promise<Array<EventData>>} Promise<Array<EventData>>.
   */
  async receiveBatch(
    partitionId: string,
    maxMessageCount: number,
    maxWaitTimeInSeconds: number,
    options?: ReceiveOptions
  ): Promise<ReceivedEventData[]>;
  async receiveBatch(
    partitionId: string,
    maxMessageCount: number,
    maxWaitTimeInSecondsOrOptions?: number | ReceiveOptions,
    options?: ReceiveOptions
  ): Promise<ReceivedEventData[]> {
    if (typeof partitionId !== "string" && typeof partitionId !== "number") {
      throw new Error("'partitionId' is a required parameter and must be of type: 'string' | 'number'.");
    }
    let maxWaitTimeInSeconds;
    if (typeof maxWaitTimeInSecondsOrOptions === "number") {
      maxWaitTimeInSeconds = maxWaitTimeInSecondsOrOptions;
    } else {
      options = maxWaitTimeInSecondsOrOptions;
    }
    const bReceiver = BatchingReceiver.create(this._context, partitionId, options);
    this._context.receivers[bReceiver.name] = bReceiver;
    let error: MessagingError | undefined;
    let result: ReceivedEventData[] = [];
    try {
      result = await bReceiver.receive(maxMessageCount, maxWaitTimeInSeconds);
    } catch (err) {
      error = err;
      log.error(
        "[%s] Receiver '%s', an error occurred while receiving %d messages for %d max time:\n %O",
        this._context.connectionId,
        bReceiver.name,
        maxMessageCount,
        maxWaitTimeInSeconds,
        err
      );
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
   * @returns {Promise<HubInformation>} A promise that resolves with HubInformation.
   */
  async getHubInformation(options?: RequestOptions): Promise<HubInformation> {
    try {
      return await this._context.managementSession!.getHubRuntimeInformation(options);
    } catch (err) {
      log.error("An error occurred while getting the hub runtime information: %O", err);
      throw err;
    }
  }

  /**
   * Provides an array of partitionIds.
   * @returns {Promise<Array<string>>} A promise that resolves with an Array of strings.
   */
  async getPartitionIds(options?: RequestOptions): Promise<Array<string>> {
    try {
      const runtimeInfo = await this.getHubInformation(options);
      return runtimeInfo.partitionIds;
    } catch (err) {
      log.error("An error occurred while getting the partition ids: %O", err);
      throw err;
    }
  }

  /**
   * Provides information about the specified partition.
   * @param {(string|number)} partitionId Partition ID for which partition information is required.
   * @returns {Promise<PartitionInformation>} A promise that resoloves with EventHubPartitionRuntimeInformation.
   */
  async getPartitionInformation(partitionId: string, options?: RequestOptions): Promise<PartitionInformation> {
    if (typeof partitionId !== "string" && typeof partitionId !== "number") {
      throw new Error("'partitionId' is a required parameter and must be of type: 'string' | 'number'.");
    }
    try {
      return await this._context.managementSession!.getPartitionInformation(partitionId, options);
    } catch (err) {
      log.error("An error occurred while getting the partition information: %O", err);
      throw err;
    }
  }

  /**
   * Creates an EventHub Client from connection string.
   * @param {string} connectionString - Connection string of the form 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key'
   * @param {string} [entityPath] - EventHub path of the form 'my-event-hub-name'
   * @param {ClientOptions} [options] Options that can be provided during client creation.
   * @returns {EventHubClient} - An instance of the eventhub client.
   */
  static createFromConnectionString(
    connectionString: string,
    entityPath?: string,
    options?: ClientOptions
  ): EventHubClient {
    if (!connectionString || (connectionString && typeof connectionString !== "string")) {
      throw new Error("'connectionString' is a required parameter and must be of type: 'string'.");
    }
    const config = ConnectionConfig.create(connectionString, entityPath);
    if (!config.entityPath) {
      throw new TypeError(
        `Either provide "path" or the "connectionString": "${connectionString}", ` +
          `must contain EntityPath="<path-to-the-entity>".`
      );
    }
    const tokenProvider = new SasTokenProvider(config.endpoint, config.sharedAccessKeyName, config.sharedAccessKey);
    return new EventHubClient(config.host, config.entityPath, tokenProvider, options);
  }

  /**
   * Creates an EventHub Client from connection string.
   * @param {string} iothubConnectionString - Connection string of the form 'HostName=iot-host-name;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key'
   * @param {ClientOptions} [options] Options that can be provided during client creation.
   * @returns {Promise<EventHubClient>} - Promise<EventHubClient>.
   */
  static async createFromIotHubConnectionString(
    iothubConnectionString: string,
    options?: ClientOptions
  ): Promise<EventHubClient> {
    if (!iothubConnectionString || (iothubConnectionString && typeof iothubConnectionString !== "string")) {
      throw new Error("'connectionString' is a required parameter and must be of type: 'string'.");
    }
    const connectionString = await new IotHubClient(iothubConnectionString).getEventHubConnectionString();
    return EventHubClient.createFromConnectionString(connectionString, undefined, options);
  }
}
