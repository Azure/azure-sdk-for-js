// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as uuid from "uuid/v4";
import {
  TokenProvider, EventHubRuntimeInformation, EventHubPartitionRuntimeInformation, EventPosition,
  MessagingError, EventHubClient, ClientOptions, EventData, ClientOptionsBase
} from "azure-event-hubs";
import {
  ApplicationTokenCredentials, UserTokenCredentials,
  DeviceTokenCredentials, MSITokenCredentials
} from "ms-rest-azure";
import * as log from "./log";
import { LeaseManager } from "./leaseManager";
import { PartitionContext } from "./partitionContext";
import { ProcessorContext } from "./processorContext";
import { PartitionManager } from "./partitionManager";
import { CheckpointManager } from "./checkpointManager";


/**
 * Provides information about internal errors that occur while managing partitions or leases for
 * the partitions.
 * @interface EPHDiagnosticInfo
 */
export interface EPHDiagnosticInfo {
  /**
   * @property {string} hostName The name of the host that experienced the error. Allows
   * distinguishing the error source if multiple hosts in a single process.
   */
  hostName: string;
  /**
   * @property {string} partitionId The partitionId that experienced the error. Allows
   * distinguishing the error source if multiple hosts in a single process.
   */
  partitionId: string;
  /**
   * @property {string} action A short string that indicates what general activity threw the exception.
   */
  action: string;
  /**
   * @property {any} error The error that was thrown.
   */
  error: any;
}

/**
 * Describes the error handler signature to receive notifcation for general errors.
 *
 * Errors which occur while processing events from a particular EventHub partition are delivered
 * to the `onError` handler provided in the `start()` method. This handler is called on
 * occasions when an error occurs while managing partitions or leases for the partitions.
 * @function
 */
export type OnEphError = (error: EPHDiagnosticInfo) => void;

/**
 * Describes the message handler signature for messages received from an EventHub.
 * @function
 */
export type OnReceivedMessage = (context: PartitionContext, eventData: EventData) => void;

/**
 * Describes the message handler signature for errors that occur while receiving messages from an
 * EventHub.
 * @function
 */
export type OnReceivedError = (error: MessagingError | Error) => void;

/**
 * Describes the optional parameters that can be provided for creating an EventProcessorHost.
 * @interface EventProcessorOptions
 */
export interface EventProcessorOptions extends ClientOptionsBase {
  /**
   * @property {EventPosition} initialOffset This is only used when then receiver is being created
   * for the very first time and there is no checkpoint data in the blob. For this option to be
   * effective please make sure to provide a new hostName that was not used previously.
   */
  initialOffset?: EventPosition;
  /**
   * @property {string} [consumerGroup] The name of the consumer group within the Event Hub. Default
   * value: "$default"
   */
  consumerGroup?: string;
  /**
   * @property {CheckpointManager} [checkpointManager] A manager to manage checkpoints other
   * than Azure Storage. Default: `AzureStorageCheckpointLeaseManager`.
   */
  checkpointManager?: CheckpointManager;
  /**
   * @property {LeaseManager} [LeaseManager] A manager to manage leases. Default:
   * `AzureStorageCheckpointLeaseManager`.
   */
  leaseManager?: LeaseManager;
  /**
   * @property {string} [leasecontainerName] Azure Storage container name for use by built-in
   * lease and checkpoint manager.
   */
  leasecontainerName?: string;
  /**
   * @property {string} [storageBlobPrefix] Prefix used when naming blobs within the storage container.
   */
  storageBlobPrefix?: string;
  /**
   * @property {OnEphError} [onEphError] Error handler that can be provided to receive notifcation
   * for general errors.
   *
   * Errors which occur while processing events from a particular EventHub partition are delivered
   * to the `onError` handler provided in the `start()` method. This handler is called on
   * occasions when an error occurs while managing partitions or leases for the partitions.
   */
  onEphError?: OnEphError;
  /**
   * @property {number} [leaseRenewInterval] The sleep interval **in seconds** between scans.
   * Default: `10` seconds.
   *
   * Allows a lease manager implementation to specify to PartitionManager how often it should
   * scan leases and renew them. In order to redistribute leases in a timely fashion after a host
   * ceases operating, we recommend a relatively short interval, such as ten seconds. Obviously it
   * should be less than half of the lease length, to prevent accidental expiration.
   */
  leaseRenewInterval?: number;
  /**
   * @property {number} [leaseDuration] Duration of a lease **in seconds** before it expires
   * unless renewed. Default: `30` seconds, Min Value: `15` seconds, Max value: `60` seconds.
   */
  leaseDuration?: number;
}

/**
 * Describes the optional parameters that can be provided for creating an EventProcessorHost while
 * creating a client from the EventHub connectionstring.
 * @interface ConnectionStringBasedOptions
 * @extends EventProcessorOptions
 */
export interface ConnectionStringBasedOptions extends EventProcessorOptions {
  /**
   * @property {string} [eventHubPath] The name of the EventHub. This is optional if the
   * EventHub connection string contains ENTITY_PATH=hub-name else an Error will be thrown.
   */
  eventHubPath?: string;
  /**
   * @property {TokenProvider} [tokenProvider] An instance of the token provider interface that
   * provides the token for authentication. Default value: SasTokenProvider.
   */
  tokenProvider?: TokenProvider;
}

/**
 * Describes the Event Processor Host to process events from an EventHub.
 * @class EventProcessorHost
 */
export class EventProcessorHost {
  /**
   * @property {ProcessorContextWithLeaseManager} _context The processor context.
   * @private
   */
  private _context: ProcessorContext;
  /**
   * @property {PartitionManager} _partitionManager The partition manager responsible for managing
   * receivers for different partitions within an EventHub.
   * @private
   */
  private _partitionManager: PartitionManager;

  /**
   * Creates a new host to process events from an Event Hub.
   * @param {string} hostName Name of the processor host. MUST BE UNIQUE.
   * Strongly recommend including a Guid or a prefix with a guid to ensure uniqueness. You can use
   * `EventProcessorHost.createHostName("your-prefix")`; Default: `js-host-${uuid()}`.
   * @param {string} storageConnectionString Connection string to Azure Storage account used for
   * leases and checkpointing. Example DefaultEndpointsProtocol=https;AccountName=<account-name>;
   * AccountKey=<account-key>;EndpointSuffix=core.windows.net
   * @param {EventHubClient} eventHubClient The EventHub client
   * @param {EventProcessorOptions} [options] Optional parameters for creating an
   * EventProcessorHost.
   */
  constructor(hostName: string, storageConnectionString: string, eventHubClient: EventHubClient,
    options?: EventProcessorOptions) {
    if (!options) options = {};
    this._context = ProcessorContext.create(hostName, storageConnectionString,
      eventHubClient, options);
    this._partitionManager = new PartitionManager(this._context);
  }

  /**
   * Provides the host name for the Event processor host.
   */
  get hostName(): string {
    return this._context.hostName;
  }

  /**
   * Provides the consumer group name for the Event processor host.
   */
  get consumerGroup(): string {
    return this._context.consumerGroup;
  }

  /**
   * Provides the eventhub runtime information.
   * @returns {Promise<EventHubRuntimeInformation>}
   */
  async getHubRuntimeInformation(): Promise<EventHubRuntimeInformation> {
    return await this._context.eventHubClient.getHubRuntimeInformation();
  }

  /**
   * Provides information about the specified partition.
   * @param {(string|number)} partitionId Partition ID for which partition information is required.
   *
   * @returns {EventHubPartitionRuntimeInformation} EventHubPartitionRuntimeInformation
   */
  async getPartitionInformation(partitionId: string | number): Promise<EventHubPartitionRuntimeInformation> {
    return await this._context.eventHubClient.getPartitionInformation(partitionId);
  }

  /**
   * Provides an array of partitionIds.
   * @returns {Promise<string[]>}
   */
  async getPartitionIds(): Promise<string[]> {
    return this._context.eventHubClient.getPartitionIds();
  }

  /**
   * Provides a list of partitions the EPH is currently receiving messages from.
   *
   * The EPH will try to grab leases for more partitions during each scan that happens once every
   * (configured) lease renew seconds. The number of EPH instances that are being run
   * simultaneously to receive messages from the same consumer group within an event hub also
   * influences the number of partitions that this instance of EPH is actively receiving messages
   * from.
   *
   * @returns {Array<string>} Array<string> List of partitions that this EPH instance is currently
   * receiving messages from.
   */
  get receivingFromPartitions(): string[] {
    return Object.keys(this._context.receiverByPartition);
  }

  /**
   * Starts the event processor host, fetching the list of partitions, and attempting to grab leases
   * For each successful lease, it will get the details from the blob and start a receiver at the
   * point where it left off previously.
   *
   * @return {Promise<void>}
   */
  async start(onMessage: OnReceivedMessage, onError: OnReceivedError): Promise<void> {
    try {
      await this._partitionManager.start(onMessage, onError);
    } catch (err) {
      log.error("[%s] An error occurred while starting the EPH: %O", this._context.hostName, err);
      this._context.onEphError(err);
      throw err;
    }
  }

  /**
   * Stops the EventProcessorHost from processing messages.
   * @return {Promise<void>}
   */
  async stop(): Promise<void> {
    try {
      await this._partitionManager.stop();
    } catch (err) {
      log.error("[%s] An error occurred while stopping the EPH: %O", this._context.hostName, err);
      this._context.onEphError(err);
      throw err;
    }
  }

  /**
   * Convenience method for generating unique host name.
   *
   * @param {string} [prefix] String to use as the beginning of the name. Default value: "js-host".
   * @return {string} A unique host name
   */
  static createHostName(prefix?: string): string {
    if (!prefix) prefix = "js-host";
    return `${prefix}-${uuid()}`;
  }

  /**
   * Creates a new host to process events from an Event Hub.
   *
   * @param {string} hostName Name of the processor host. MUST BE UNIQUE.
   * Strongly recommend including a Guid or a prefix with a guid to ensure uniqueness. You can use
   * `EventProcessorHost.createHostName("your-prefix")`; Default: `js-host-${uuid()}`.
   * @param {string} storageConnectionString Connection string to Azure Storage account used for
   * leases and checkpointing. Example DefaultEndpointsProtocol=https;AccountName=<account-name>;
   * AccountKey=<account-key>;EndpointSuffix=core.windows.net
   * @param {string} eventHubConnectionString Connection string for the Event Hub to receive from.
   * Example: 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;
   * SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key'
   * @param {ConnectionStringBasedOptions} [options] Optional parameters for creating an
   * EventProcessorHost.
   *
   * @returns {EventProcessorHost} EventProcessorHost
   */
  static createFromConnectionString(
    hostName: string,
    storageConnectionString: string,
    eventHubConnectionString: string,
    options?: ConnectionStringBasedOptions): EventProcessorHost {
    if (!options) options = {};
    const ehCOptions: ClientOptions = {
      tokenProvider: options.tokenProvider,
      dataTransformer: options.dataTransformer
    };
    return new EventProcessorHost(hostName, storageConnectionString,
      EventHubClient.createFromConnectionString(eventHubConnectionString, options.eventHubPath,
        ehCOptions), options);
  }

  /**
   * Creates a new host to process events from an Event Hub.
   *
   * @param {string} hostName Name of the processor host. MUST BE UNIQUE.
   * Strongly recommend including a Guid or a prefix with a guid to ensure uniqueness. You can use
   * `EventProcessorHost.createHostName("your-prefix")`; Default: `js-host-${uuid()}`.
   * @param {string} storageConnectionString Connection string to Azure Storage account used for
   * leases and checkpointing. Example DefaultEndpointsProtocol=https;AccountName=<account-name>;
   * AccountKey=<account-key>;EndpointSuffix=core.windows.net
   * @param {string} namespace Fully qualified domain name for Event Hubs.
   * Example: "{your-sb-namespace}.servicebus.windows.net"
   * @param {string} eventHubPath The name of the EventHub.
   * @param {TokenProvider} tokenProvider - Your token provider that implements the TokenProvider interface.
   * @param {EventProcessorOptions} [options] Optional parameters for creating an
   * EventProcessorHost.
   *
   * @returns {EventProcessorHost} EventProcessorHost
   */
  static createFromTokenProvider(
    hostName: string,
    storageConnectionString: string,
    namespace: string,
    eventHubPath: string,
    tokenProvider: TokenProvider,
    options?: EventProcessorOptions
  ): EventProcessorHost {
    if (!options) options = {};
    const ehcOptions: ClientOptionsBase = {
      dataTransformer: options.dataTransformer
    };
    return new EventProcessorHost(hostName, storageConnectionString,
      EventHubClient.createFromTokenProvider(namespace, eventHubPath, tokenProvider, ehcOptions),
      options);
  }

  /**
   * Creates a new host to process events from an Event Hub.
   *
   * @param {string} hostName Name of the processor host. MUST BE UNIQUE.
   * Strongly recommend including a Guid or a prefix with a guid to ensure uniqueness. You can use
   * `EventProcessorHost.createHostName("your-prefix")`; Default: `js-host-${uuid()}`.
   * @param {string} storageConnectionString Connection string to Azure Storage account used for
   * leases and checkpointing. Example DefaultEndpointsProtocol=https;AccountName=<account-name>;
   * AccountKey=<account-key>;EndpointSuffix=core.windows.net
   * @param {string} namespace Fully qualified domain name for Event Hubs.
   * Example: "{your-sb-namespace}.servicebus.windows.net"
   * @param {string} eventHubPath The name of the EventHub.
   * @param {TokenCredentials} credentials - The AAD Token credentials. It can be one of the
   * following: ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials
   * | MSITokenCredentials.
   * @param {EventProcessorOptions} [options] Optional parameters for creating an
   * EventProcessorHost.
   *
   * @returns {EventProcessorHost} EventProcessorHost
   */
  static createFromAadTokenCredentials(
    hostName: string,
    storageConnectionString: string,
    namespace: string,
    eventHubPath: string,
    credentials: ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials,
    options?: EventProcessorOptions): EventProcessorHost {
    if (!options) options = {};
    const ehcOptions: ClientOptionsBase = {
      dataTransformer: options.dataTransformer
    };
    return new EventProcessorHost(hostName, storageConnectionString,
      EventHubClient.createFromAadTokenCredentials(namespace, eventHubPath, credentials, ehcOptions),
      options);
  }
}
