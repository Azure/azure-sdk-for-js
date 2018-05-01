// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as uuid from "uuid/v4";
import * as debugModule from "debug";
import { BlobLeaseManager, LeaseManager } from "./blobLeaseManager";
import { BlobLease, Lease } from "./blobLease";
import { PartitionContext } from "./partitionContext";
import { EventHubClient } from "../eventHubClient";
import { EventEmitter } from "events";
import {
  TokenProvider, EventHubRuntimeInformation, EventHubPartitionRuntimeInformation,
  ReceiveOptions, EventPosition, OnMessage, OnError, EventHubsError
} from "..";
import { Dictionary, EventData } from "../eventData";
import {
  ApplicationTokenCredentials, UserTokenCredentials,
  DeviceTokenCredentials, MSITokenCredentials
} from "ms-rest-azure";
import { ReceiveHandler } from "../streamingReceiver";
const debug = debugModule("azure:event-hubs:eph:host");

/**
 * Describes the event handler signature for the "ephost:opened" event.
 */
export type OnEphOpen = (context: PartitionContext) => void;

/**
 * Describes the event handler signature for the "ephost:message" event.
 */
export type OnEphMessage = (context: PartitionContext, eventData: EventData) => void;

/**
 * Describes the event handler signature for the "ephost:closed" event.
 */
export type OnEphClose = (context: PartitionContext, reason?: any) => void;

/**
 * A function that takes a partition ID and return true/false for whether we should
 *  attempt to grab the lease and watch it.
 */
export type PartitionFilter = (id: string | number) => boolean;

export interface StartEPHOptions {
  /**
   * @property {PartitionFilter} [partitionFilter] Predicate that takes a partition ID and return
   * true/false for whether we should attempt to grab the lease and watch it.
   * If not provided, all partitions will be tried.
   */
  partitionFilter?: PartitionFilter;
}

/**
 * Describes the optional parameters that can be provided for creating an EventProcessorHost.
 * @interface EventProcessorOptions
 */
export interface EventProcessorOptions {
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
   * @property {LeaseManager} [LeaseManager] A manager to manage leases. Default: BlobLeaseManager.
   */
  leaseManager?: LeaseManager;
  /**
   * @property {string} [leasecontainerName] Azure Storage container name for use by built-in lease and checkpoint manager.
   */
  leasecontainerName?: string;
  /**
   * @property {string} [storageBlobPrefix] Prefix used when naming blobs within the storage container.
   */
  storageBlobPrefix?: string;
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
export class EventProcessorHost extends EventEmitter {
  /**
   * Opened: Triggered whenever a partition obtains its lease. The PartitionContext is passed to
   * the event listener.
   */
  static opened: string = "ephost:opened";
  /**
   * Closed: Triggered whenever a partition loses its lease and has to stop receiving,
   * or when the host is shut down. The PartitionContext and the closing reason is passed to the
   * event listener.
   */
  static closed: string = "ephost:closed";
  /**
   * Message: Triggered whenever a message comes in on a given partition. The PartitionContext and
   * EventData is passed to the event listener.
   */
  static message: string = "ephost:message";

  /**
   * Error: Triggered when an error occurs on a given receiver. The EventHubsError or a generic
   * Error object is passed the event listener.
   */
  static error: string = "ephost:error";

  private _hostName: string;
  private _consumerGroup: string;
  private _storageConnectionString: string;
  private _eventHubClient: EventHubClient;
  private _leaseManager: LeaseManager;
  private _contextByPartition?: Dictionary<PartitionContext>;
  private _receiverByPartition?: Dictionary<ReceiveHandler>;
  private _initialOffset?: EventPosition;
  private _leasecontainerName: string;
  private _storageBlobPrefix?: string;

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
  constructor(hostName: string, storageConnectionString: string, eventHubClient: EventHubClient, options?: EventProcessorOptions) {
    super();
    function ensure(paramName: string, param: any, type: string): void {
      if (!param) throw new Error(`${paramName} cannot be null or undefined.`);
      if (param) {
        if (typeof param !== type) {
          throw new Error(`${paramName} must be of type ${type}.`);
        }
      }
    }
    ensure("storageConnectionString", storageConnectionString, "string");
    ensure("eventHubClient", eventHubClient, "object");

    if (!options) options = {};
    this._eventHubClient = eventHubClient;
    this._storageConnectionString = storageConnectionString;
    this._hostName = hostName;
    this._consumerGroup = options.consumerGroup || "$default";
    this._leaseManager = options.leaseManager || new BlobLeaseManager(hostName);
    this._leasecontainerName = options.leasecontainerName || this._hostName;
    this._initialOffset = options.initialOffset;
    this._contextByPartition = {};
    this._receiverByPartition = {};
  }

  /**
   * Provides the host name for the Event processor host.
   */
  get hostName(): string {
    return this._hostName;
  }

  /**
   * Provides the consumer group name for the Event processor host.
   */
  get consumerGroup(): string {
    return this._consumerGroup;
  }

  /**
   * Provides the eventhub runtime information.
   * @method getHubRuntimeInformation
   * @returns {Promise<EventHubRuntimeInformation>}
   */
  async getHubRuntimeInformation(): Promise<EventHubRuntimeInformation> {
    return await this._eventHubClient.getHubRuntimeInformation();
  }

  /**
   * Provides information about the specified partition.
   * @method getPartitionInformation
   * @param {(string|number)} partitionId Partition ID for which partition information is required.
   */
  async getPartitionInformation(partitionId: string | number): Promise<EventHubPartitionRuntimeInformation> {
    return await this._eventHubClient.getPartitionInformation(partitionId);
  }

  /**
   * Provides an array of partitionIds.
   * @method getPartitionIds
   * @returns {Promise<string[]>}
   */
  async getPartitionIds(): Promise<string[]> {
    return this._eventHubClient.getPartitionIds();
  }

  /**
   * Starts the event processor host, fetching the list of partitions, (optionally) filtering
   * them, and attempting to grab leases on the (filtered) set. For each successful lease, will
   * get the details from the blob and start a receiver at the point where it left off previously.
   * @method start
   *
   * @param {StartEPHOptions} [options] Optional parameters that can be provided while starting the
   * EPH.
   * @return {Promise<void>}
   */
  async start(options?: StartEPHOptions): Promise<void> {
    try {
      if (!options) options = {};
      this._contextByPartition = {};
      this._receiverByPartition = {};
      this._leaseManager.reset();
      // Acquired lease.
      this._leaseManager.on(BlobLeaseManager.acquired, async (lease: Lease) => {
        const id = lease.partitionId!;
        try {
          debug("Acquired lease on partitionId: '%s'.", id);
          await this._attachReceiver(id as string);
        } catch (err) {
          debug("An error occurred while attaching the receiver for partition '%s': %O", id, err);
        }
      });
      // Lost lease.
      this._leaseManager.on(BlobLeaseManager.lost, async (lease: Lease) => {
        const id = lease.partitionId!;
        try {
          debug("Lost lease on on partitionId: '%s'.", id);
          await this._detachReceiver(id, "Lease lost.");
        } catch (err) {
          debug("An error occurred while detaching the receiver for partition '%s': %O", id, err);
        }
      });
      // Released lease.
      this._leaseManager.on(BlobLeaseManager.released, async (lease: Lease) => {
        const id = lease.partitionId!;
        try {
          debug("Released lease on partitionId: '%s'.", lease.partitionId);
          await this._detachReceiver(id, "Lease released.");
        } catch (err) {
          debug("An error occurred while detaching the receiver for partition '%s': %O", id, err);
        }
      });
      // Renewed lease.
      this._leaseManager.on(BlobLeaseManager.renewed, async (lease: Lease) => {
        const id = lease.partitionId!;
        try {
          debug("Renewed lease on partitionId: '%s'.", id);
          const info = await this._contextByPartition![id].checkpoint();
          debug(">>>> [EPH - %s] Successfully checkpointed info '%o' for partition '%s'.",
            this._hostName, info, id);
        } catch (err) {
          debug("[EPH - %s] An error occurred while checkpointing information for partition '%s': %O",
            this._hostName, id, err);
        }
      });

      const ids = await this._eventHubClient.getPartitionIds();
      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        if (options.partitionFilter && !options.partitionFilter(id)) {
          debug("Skipping partition id: '%s'.", id);
          continue;
        }
        debug("Managing lease for partition id: '%s'", id);
        const blobPath = this._storageBlobPrefix
          ? `${this._storageBlobPrefix.trim()}${this._consumerGroup}/${id}`
          : `${this._consumerGroup}/${id}`;
        const lease = new BlobLease(this._hostName, this._storageConnectionString,
          this._leasecontainerName, blobPath);
        lease.partitionId = id;
        this._contextByPartition![id] = new PartitionContext(id, this._hostName, lease);
        this._leaseManager.manageLease(lease);
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * Stops the EventProcessorHost from processing messages.
   * @return {Promise<void>}
   */
  stop(): Promise<void> {
    const unmanage = (l: Lease) => { return this._leaseManager.unmanageLease(l); };
    const releases: any = [];
    for (const partitionId in this._contextByPartition!) {
      if (!this._contextByPartition!.hasOwnProperty(partitionId)) continue;
      const id = partitionId;
      const context = this._contextByPartition![id];
      releases.push(this._detachReceiver(id).then(unmanage.bind(undefined, context.lease)));
    }
    return Promise.all(releases).then(() => {
      this._leaseManager.reset();
      this._contextByPartition = {};
      return this._eventHubClient.close();
    }).catch((err) => {
      debug("An error occurred while stopping the eph '%s': %O.", this._hostName, err);
    });
  }

  private async _attachReceiver(partitionId: string): Promise<ReceiveHandler> {
    const context = this._contextByPartition![partitionId];
    if (!context)
      throw new Error(`Invalid state - missing context for partition "${partitionId}".`);
    const checkpoint = await context.updateCheckpointInfoFromLease();
    let eventPosition: EventPosition | undefined = undefined;
    if (checkpoint && checkpoint.offset) {
      eventPosition = EventPosition.fromOffset(checkpoint.offset);
      debug("[%s] [EPH - '%s'] While creating the receiver, setting the event position " +
        "to the offset: '%s'.", this._eventHubClient.connectionId, this._hostName,
        this._initialOffset!.getExpression());
    } else if (this._initialOffset) {
      // Since there is no checkpoint offset and the initial offset was provided we shall start
      // receiving events from that position.
      debug("[%s] [EPH - '%s'] While creating the receiver, setting the event position to " +
        "the provided initial offset: '%s'.", this._eventHubClient.connectionId,
        this._hostName, this._initialOffset!.getExpression());
      eventPosition = this._initialOffset;
    }
    let receiveHandler: ReceiveHandler;
    const rcvrOptions: ReceiveOptions = {
      consumerGroup: this._consumerGroup,
      eventPosition: eventPosition
    };
    const onMessage: OnMessage = (eventData: EventData) => {
      context.updateCheckpointDataFromEventData(eventData);
      this.emit(EventProcessorHost.message, context, eventData);
    };
    const onError: OnError = (error: EventHubsError | Error) => {
      debug("[%s] [EPH - '%s'] Receiver '%s' received an error: %O.",
        this._eventHubClient.connectionId, this._hostName, receiveHandler.name, error);
      this.emit(EventProcessorHost.error, error);
    };
    receiveHandler = this._eventHubClient.receive(partitionId, onMessage, onError, rcvrOptions);
    debug("[%s] [EPH - '%s'] Attaching receiver '%s' for partition '%s' with offset: %s",
      this._eventHubClient.connectionId, this._hostName, receiveHandler.name,
      partitionId, (checkpoint ? checkpoint.offset : "None"));
    this.emit(EventProcessorHost.opened, context);
    this._receiverByPartition![partitionId] = receiveHandler;
    return receiveHandler;
  }

  private async _detachReceiver(partitionId: string, reason?: string): Promise<void> {
    const receiveHandler = this._receiverByPartition![partitionId];
    const context = this._contextByPartition![partitionId];
    try {
      if (receiveHandler) {
        delete this._receiverByPartition![partitionId];
        await receiveHandler.stop();
        debug("[%s] [EPH - '%s'] Closed the receiver '%s'.", this._eventHubClient.connectionId,
          this._hostName, receiveHandler.name);
        this.emit(EventProcessorHost.closed, context, reason);
      }
    } catch (err) {
      debug("[%s] [EPH - '%s'] Receiver '%s' received an error: %O.",
        this._eventHubClient.connectionId, this._hostName, receiveHandler.name, err);
    }
  }

  /**
   * Convenience method for generating unique host name.
   * @static
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
   * @static
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
   */
  static createFromConnectionString(
    hostName: string,
    storageConnectionString: string,
    eventHubConnectionString: string,
    options?: ConnectionStringBasedOptions): EventProcessorHost {
    if (!options) options = {};
    return new EventProcessorHost(hostName, storageConnectionString,
      EventHubClient.createFromConnectionString(eventHubConnectionString, options.eventHubPath,
        options.tokenProvider), options);
  }

  /**
   * Creates a new host to process events from an Event Hub.
   * @static
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
   * @param {ConnectionStringBasedOptions} [options] Optional parameters for creating an
   * EventProcessorHost.
   */
  static createFromAadTokenCredentials(
    hostName: string,
    storageConnectionString: string,
    namespace: string,
    eventHubPath: string,
    credentials: ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials,
    options?: EventProcessorOptions): EventProcessorHost {
    return new EventProcessorHost(hostName, storageConnectionString,
      EventHubClient.createFromAadTokenCredentials(namespace, eventHubPath, credentials), options);
  }
}
