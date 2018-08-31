// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as uuid from "uuid/v4";
import {
  TokenProvider, EventHubRuntimeInformation, EventHubPartitionRuntimeInformation, AadTokenProvider, EventHubClient
} from "azure-event-hubs";
import {
  ApplicationTokenCredentials, UserTokenCredentials,
  DeviceTokenCredentials, MSITokenCredentials
} from "ms-rest-azure";
import * as log from "./log";
import { LeaseManager } from "./leaseManager";
import { HostContext } from "./hostContext";
import { PartitionManager } from "./partitionManager";
import { CheckpointManager } from "./checkpointManager";
import { FromConnectionStringOptions, EventProcessorHostOptions, FromTokenProviderOptions, OnReceivedMessage, OnReceivedError } from "./modelTypes";
import { validateType } from './util/utils';



/**
 * Describes the Event Processor Host to process events from an EventHub.
 * @class EventProcessorHost
 */
export class EventProcessorHost {
  /**
   * @property {ProcessorContextWithLeaseManager} _context The processor context.
   * @private
   */
  private _context: HostContext;
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
  constructor(hostName: string, options?: EventProcessorHostOptions) {
    if (!options) options = {};
    this._context = HostContext.create(hostName, options);
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
    return await this._context.getHubRuntimeInformation();
  }

  /**
   * Provides information about the specified partition.
   * @param {(string|number)} partitionId Partition ID for which partition information is required.
   *
   * @returns {EventHubPartitionRuntimeInformation} EventHubPartitionRuntimeInformation
   */
  async getPartitionInformation(partitionId: string | number): Promise<EventHubPartitionRuntimeInformation> {
    return await this._context.getPartitionInformation(partitionId);
  }

  /**
   * Provides an array of partitionIds.
   * @returns {Promise<string[]>}
   */
  async getPartitionIds(): Promise<string[]> {
    return this._context.getPartitionIds();
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
   * @param {FromConnectionStringOptions} [options] Optional parameters for creating an
   * EventProcessorHost.
   *
   * @returns {EventProcessorHost} EventProcessorHost
   */
  static createFromConnectionString(
    hostName: string,
    storageConnectionString: string,
    eventHubConnectionString: string,
    options?: FromConnectionStringOptions): EventProcessorHost {
    if (!options) options = {};

    validateType("hostName", hostName, true, "string");
    validateType("storageConnectionString", storageConnectionString, true, "string");
    validateType("eventHubConnectionString", eventHubConnectionString, true, "string");
    validateType("options", options, false, "object");

    const ephOptions: EventProcessorHostOptions = {
      ...options,
      storageConnectionString: storageConnectionString,
      eventHubConnectionString: eventHubConnectionString
    }
    return new EventProcessorHost(hostName, ephOptions);
  }

  /**
   * Creates an event processor host from the given connection string with the given checkpoint
   * manager and lease manager.
   *
   * @param {string} hostName Name of the processor host. MUST BE UNIQUE.
   * Strongly recommend including a Guid or a prefix with a guid to ensure uniqueness. You can use
   * `EventProcessorHost.createHostName("your-prefix")`; Default: `js-host-${uuid()}`.
   * @param {string} eventHubConnectionString Connection string for the Event Hub to receive from.
   * Example: 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;
   * SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key'
   * @param {CheckpointManager} checkpointManager A manager to manage checkpoints.
   * @param {LeaseManager} leaseManager A manager to manage leases.
   * @param {FromConnectionStringOptions} [options] Optional parameters for creating an
   * EventProcessorHost.
   *
   * @returns {EventProcessorHost} EventProcessorHost
   */
  static createFromConnectionStringWithCustomCheckpointAndLeaseManager(
    hostName: string,
    eventHubConnectionString: string,
    checkpointManager: CheckpointManager,
    leaseManager: LeaseManager,
    options?: FromConnectionStringOptions): EventProcessorHost {
    if (!options) options = {};

    validateType("hostName", hostName, true, "string");
    validateType("eventHubConnectionString", eventHubConnectionString, true, "string");
    validateType("checkpointManager", checkpointManager, true, "object");
    validateType("leaseManager", leaseManager, true, "object");
    validateType("options", options, false, "object");

    const ephOptions: EventProcessorHostOptions = {
      ...options,
      eventHubConnectionString: eventHubConnectionString,
      checkpointManager: checkpointManager,
      leaseManager: leaseManager
    };
    return new EventProcessorHost(hostName, ephOptions);
  }

  /**
   * Creates an event processor host from the given token provider.
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
   * @param {FromTokenProviderOptions} [options] Optional parameters for creating an
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
    options?: FromTokenProviderOptions): EventProcessorHost {
    if (!options) options = {};

    validateType("hostName", hostName, true, "string");
    validateType("storageConnectionString", storageConnectionString, true, "string");
    validateType("namespace", namespace, true, "string");
    validateType("eventHubPath", eventHubPath, true, "string");
    validateType("tokenProvider", tokenProvider, true, "object");
    validateType("options", options, false, "object");

    if (!namespace.endsWith("/")) namespace += "/";
    const connectionString = `Endpoint=sb://${namespace};SharedAccessKeyName=defaultKeyName;` +
      `SharedAccessKey=defaultKeyValue;EntityPath=${eventHubPath}`;
    const ephOptions: EventProcessorHostOptions = {
      ...options,
      tokenProvider: tokenProvider,
      storageConnectionString: storageConnectionString,
      eventHubPath: eventHubPath,
      eventHubConnectionString: connectionString
    };
    return new EventProcessorHost(hostName, ephOptions);
  }

  /**
   * Creates an event processor host from the given token provider with the given checkpoint manager
   * and lease manager.
   *
   * @param {string} hostName Name of the processor host. MUST BE UNIQUE.
   * Strongly recommend including a Guid or a prefix with a guid to ensure uniqueness. You can use
   * `EventProcessorHost.createHostName("your-prefix")`; Default: `js-host-${uuid()}`.
   * @param {string} namespace Fully qualified domain name for Event Hubs.
   * Example: "{your-sb-namespace}.servicebus.windows.net"
   * @param {string} eventHubPath The name of the EventHub.
   * @param {TokenProvider} tokenProvider - Your token provider that implements the TokenProvider interface.
   * @param {CheckpointManager} checkpointManager A manager to manage checkpoints.
   * @param {LeaseManager} leaseManager A manager to manage leases.
   * @param {FromTokenProviderOptions} [options] Optional parameters for creating an
   * EventProcessorHost.
   *
   * @returns {EventProcessorHost} EventProcessorHost
   */
  static createFromTokenProviderWithCustomCheckpointAndLeaseManager(
    hostName: string,
    namespace: string,
    eventHubPath: string,
    tokenProvider: TokenProvider,
    checkpointManager: CheckpointManager,
    leaseManager: LeaseManager,
    options?: FromTokenProviderOptions): EventProcessorHost {
    if (!options) options = {};

    validateType("hostName", hostName, true, "string");
    validateType("namespace", namespace, true, "string");
    validateType("eventHubPath", eventHubPath, true, "string");
    validateType("tokenProvider", tokenProvider, true, "object");
    validateType("checkpointManager", checkpointManager, true, "object");
    validateType("leaseManager", leaseManager, true, "object");
    validateType("options", options, false, "object");

    if (!namespace.endsWith("/")) namespace += "/";
    const connectionString = `Endpoint=sb://${namespace};SharedAccessKeyName=defaultKeyName;` +
      `SharedAccessKey=defaultKeyValue;EntityPath=${eventHubPath}`;
    const ephOptions: EventProcessorHostOptions = {
      ...options,
      tokenProvider: tokenProvider,
      eventHubPath: eventHubPath,
      eventHubConnectionString: connectionString,
      checkpointManager: checkpointManager,
      leaseManager: leaseManager
    };
    return new EventProcessorHost(hostName, ephOptions);
  }

  /**
   * Creates an event processor host from AAD token credentials.
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
   * @param {FromTokenProviderOptions} [options] Optional parameters for creating an
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
    options?: FromTokenProviderOptions): EventProcessorHost {
    if (!options) options = {};

    validateType("hostName", hostName, true, "string");
    validateType("storageConnectionString", storageConnectionString, true, "string");
    validateType("namespace", namespace, true, "string");
    validateType("eventHubPath", eventHubPath, true, "string");
    validateType("credentials", credentials, true, "object");
    validateType("options", options, false, "object");

    if (!namespace.endsWith("/")) namespace += "/";
    const connectionString = `Endpoint=sb://${namespace};SharedAccessKeyName=defaultKeyName;` +
      `SharedAccessKey=defaultKeyValue;EntityPath=${eventHubPath}`;

    const ephOptions: EventProcessorHostOptions = {
      ...options,
      tokenProvider: new AadTokenProvider(credentials),
      storageConnectionString: storageConnectionString,
      eventHubPath: eventHubPath,
      eventHubConnectionString: connectionString
    };
    return new EventProcessorHost(hostName, ephOptions);
  }

  /**
   * Creates an event processor host from AAD token credentials with the given checkpoint manager
   * and lease manager.
   *
   * @param {string} hostName Name of the processor host. MUST BE UNIQUE.
   * Strongly recommend including a Guid or a prefix with a guid to ensure uniqueness. You can use
   * `EventProcessorHost.createHostName("your-prefix")`; Default: `js-host-${uuid()}`.
   * @param {string} namespace Fully qualified domain name for Event Hubs.
   * Example: "{your-sb-namespace}.servicebus.windows.net"
   * @param {string} eventHubPath The name of the EventHub.
   * @param {TokenCredentials} credentials - The AAD Token credentials. It can be one of the
   * following: ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials
   * | MSITokenCredentials.
   * @param {CheckpointManager} checkpointManager A manager to manage checkpoints.
   * @param {LeaseManager} leaseManager A manager to manage leases.
   * @param {FromTokenProviderOptions} [options] Optional parameters for creating an
   * EventProcessorHost.
   *
   * @returns {EventProcessorHost} EventProcessorHost
   */
  static createFromAadTokenCredentialsWithCustomCheckpointAndLeaseManager(
    hostName: string,
    namespace: string,
    eventHubPath: string,
    credentials: ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials,
    checkpointManager: CheckpointManager,
    leaseManager: LeaseManager,
    options?: FromTokenProviderOptions): EventProcessorHost {
    if (!options) options = {};

    validateType("hostName", hostName, true, "string");
    validateType("namespace", namespace, true, "string");
    validateType("eventHubPath", eventHubPath, true, "string");
    validateType("credentials", credentials, true, "object");
    validateType("checkpointManager", checkpointManager, true, "object");
    validateType("leaseManager", leaseManager, true, "object");
    validateType("options", options, false, "object");

    if (!namespace.endsWith("/")) namespace += "/";
    const connectionString = `Endpoint=sb://${namespace};SharedAccessKeyName=defaultKeyName;` +
      `SharedAccessKey=defaultKeyValue;EntityPath=${eventHubPath}`;
    const ephOptions: EventProcessorHostOptions = {
      ...options,
      tokenProvider: new AadTokenProvider(credentials),
      eventHubPath: eventHubPath,
      eventHubConnectionString: connectionString,
      checkpointManager: checkpointManager,
      leaseManager: leaseManager
    };
    return new EventProcessorHost(hostName, ephOptions);
  }

  /**
   * Creates an event processor host from the Iothub connection string.
   *
   * @param {string} hostName Name of the processor host. MUST BE UNIQUE.
   * Strongly recommend including a Guid or a prefix with a guid to ensure uniqueness. You can use
   * `EventProcessorHost.createHostName("your-prefix")`; Default: `js-host-${uuid()}`.
   * @param {string} storageConnectionString Connection string to Azure Storage account used for
   * leases and checkpointing. Example DefaultEndpointsProtocol=https;AccountName=<account-name>;
   * AccountKey=<account-key>;EndpointSuffix=core.windows.net
   * @param {string} iotHubConnectionString Connection string for the IotHub.
   * Example: 'Endpoint=iot-host-name;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key'
   * @param {FromConnectionStringOptions} [options] Optional parameters for creating an
   * EventProcessorHost.
   *
   * @returns {EventProcessorHost} EventProcessorHost
   */
  static async  createFromIotHubConnectionString(
    hostName: string,
    storageConnectionString: string,
    iotHubConnectionString: string,
    options?: FromConnectionStringOptions): Promise<EventProcessorHost> {
    if (!options) options = {};

    validateType("hostName", hostName, true, "string");
    validateType("storageConnectionString", storageConnectionString, true, "string");
    validateType("iotHubConnectionString", iotHubConnectionString, true, "string");
    validateType("options", options, false, "object");

    const client = await EventHubClient.createFromIotHubConnectionString(iotHubConnectionString);
    const eventHubConnectionString = client["_context"].config.connectionString;
    const ephOptions: EventProcessorHostOptions = {
      ...options,
      storageConnectionString: storageConnectionString,
      eventHubConnectionString: eventHubConnectionString
    }
    return new EventProcessorHost(hostName, ephOptions);
  }

  /**
   * Creates an event processor host from the given iothub connection string with the given
   * checkpoint manager and lease manager.
   *
   * @param {string} hostName Name of the processor host. MUST BE UNIQUE.
   * Strongly recommend including a Guid or a prefix with a guid to ensure uniqueness. You can use
   * `EventProcessorHost.createHostName("your-prefix")`; Default: `js-host-${uuid()}`.
   * @param {string} iotHubConnectionString Connection string for the IotHub.
   * Example: 'Endpoint=iot-host-name;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key'
   * @param {CheckpointManager} checkpointManager A manager to manage checkpoints.
   * @param {LeaseManager} leaseManager A manager to manage leases.
   * @param {FromConnectionStringOptions} [options] Optional parameters for creating an
   * EventProcessorHost.
   *
   * @returns {EventProcessorHost} EventProcessorHost
   */
  static async createFromIotHubConnectionStringWithCustomCheckpointAndLeaseManager(
    hostName: string,
    iotHubConnectionString: string,
    checkpointManager: CheckpointManager,
    leaseManager: LeaseManager,
    options?: FromConnectionStringOptions): Promise<EventProcessorHost> {
    if (!options) options = {};

    validateType("hostName", hostName, true, "string");
    validateType("iotHubConnectionString", iotHubConnectionString, true, "string");
    validateType("checkpointManager", checkpointManager, true, "object");
    validateType("leaseManager", leaseManager, true, "object");
    validateType("options", options, false, "object");

    const client = await EventHubClient.createFromIotHubConnectionString(iotHubConnectionString);
    const eventHubConnectionString = client["_context"].config.connectionString;

    const ephOptions: EventProcessorHostOptions = {
      ...options,
      eventHubConnectionString: eventHubConnectionString,
      checkpointManager: checkpointManager,
      leaseManager: leaseManager
    };
    return new EventProcessorHost(hostName, ephOptions);
  }
}
