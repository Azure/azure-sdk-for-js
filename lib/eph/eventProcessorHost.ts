// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as uuid from "uuid/v4";
import * as debugModule from "debug";
import BlobLeaseManager, { LeaseManager } from "./blobLeaseManager";
import BlobLease, { Lease } from "./blobLease";
import PartitionContext from "./partitionContext";
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
const debug = debugModule("azure:event-hubs:processor:host");

/**
 * Describes the event handler signtaure for the "ephost:opened" event.
 */
export interface OnOpen {
  (event: "ephost:opened", handler: (context: PartitionContext) => void): void;
}

/**
 * Describes the event handler signtaure for the "ephost:message" event.
 */
export interface OnMessage {
  (event: "ephost:message", handler: (context: PartitionContext, eventData: EventData) => void): void;
}

/**
 * Describes the event handler signtaure for the "ephost:closed" event.
 */
export interface OnClose {
  (event: "ephost:closed", handler: (context: PartitionContext, reason?: any) => void): void;
}

/**
 * A function that takes a partition ID and return true/false for whether we should
 *  attempt to grab the lease and watch it.
 */
export type PartitionFiler = (id: string | number) => boolean;

/**
 * Describes the Event Processor Host to process events from an EventHub.
 * @class EventProcessorHost
 */
export class EventProcessorHost extends EventEmitter {
  /**
   * Opened: Triggered whenever a partition obtains its lease. Passed the PartitionContext.
   */
  static opened: string = "ephost:opened";
  /**
   * Closed: Triggered whenever a partition loses its lease and has to stop receiving,
   * or when the host is shut down. Passed the PartitionContext and the closing reason.
   */
  static closed: string = "ephost:closed";
  /**
   * Message: Triggered whenever a message comes in on a given partition.
   * Passed the PartitionContext and EventData.
   */
  static message: string = "ephost:message";

  /**
   * Error: Triggered when an error occurs on a given receiver.
   * Passed the received error.
   */
  static error: string = "ephost:error";

  private _hostName: string;
  private _consumerGroup: string;
  private _storageConnectionString: string;
  private _eventHubClient: EventHubClient;
  private _leaseManager: LeaseManager;
  private _contextByPartition?: Dictionary<PartitionContext>;
  private _receiverByPartition?: Dictionary<ReceiveHandler>;

  /**
   * Creates a new host to process events from an Event Hub.
   * @param {string} hostName Name of the processor host. MUST BE UNIQUE. Strongly recommend
   * including a Guid to ensure uniqueness.
   * @param {string} consumerGroup The name of the consumer group within the Event Hub.
   * @param {string} storageConnectionString Connection string to Azure Storage account used for
   * leases and checkpointing. Example DefaultEndpointsProtocol=https;AccountName=<account-name>;
   * AccountKey=<account-key>;EndpointSuffix=core.windows.net
   * @param {EventHubClient} eventHubClient The EventHub client
   * @param {LeaseManager} [LeaseManager] A manager to manage leases. Default: BlobLeaseManager.
   */
  constructor(hostName: string, consumerGroup: string, storageConnectionString: string, eventHubClient: EventHubClient, leaseManager?: LeaseManager) {
    super();
    function ensure(paramName: string, param: any, type: string): void {
      if (!param) throw new Error(`${paramName} cannot be null or undefined.`);
      if (param) {
        if (typeof param !== type) {
          throw new Error(`${paramName} must be of type ${type}.`);
        }
      }
    }
    ensure("name", hostName, "string");
    ensure("consumerGroup", consumerGroup, "string");
    ensure("storageConnectionString", storageConnectionString, "string");
    ensure("eventHubClient", eventHubClient, "object");

    this._hostName = hostName;
    this._consumerGroup = consumerGroup;
    this._eventHubClient = eventHubClient;
    this._storageConnectionString = storageConnectionString;
    this._leaseManager = leaseManager || new BlobLeaseManager();
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
    try {
      return await this._eventHubClient.getHubRuntimeInformation();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * Provides information about the specified partition.
   * @method getPartitionInformation
   * @param {(string|number)} partitionId Partition ID for which partition information is required.
   */
  async getPartitionInformation(partitionId: string | number): Promise<EventHubPartitionRuntimeInformation> {
    try {
      return await this._eventHubClient.getPartitionInformation(partitionId);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * Provides an array of partitionIds.
   * @method getPartitionIds
   * @returns {Promise<string[]>}
   */
  async getPartitionIds(): Promise<string[]> {
    try {
      return this._eventHubClient.getPartitionIds();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * Starts the event processor host, fetching the list of partitions, (optionally) filtering
   * them, and attempting to grab leases on the (filtered) set. For each successful lease, will
   * get the details from the blob and start a receiver at the point where it left off previously.
   * @method start
   * @param {function} [partitionFilter]  Predicate that takes a partition ID and return
   * true/false for whether we should attempt to grab the lease and watch it.
   * If not provided, all partitions will be tried.
   *
   * @return {Promise<void>}
   */
  async start(partitionFilter?: (id: string | number) => boolean): Promise<void> {
    try {
      this._contextByPartition = {};
      this._receiverByPartition = {};
      this._leaseManager.reset();
      this._leaseManager.on(BlobLeaseManager.acquired, (lease) => {
        debug("Acquired lease on " + lease.partitionId);
        this._attachReceiver(lease.partitionId).catch((err) => {
          const msg = `An error occurred while attaching the receiver: ${JSON.stringify(err)}.`;
          debug(msg);
        });
      });
      this._leaseManager.on(BlobLeaseManager.lost, (lease) => {
        debug("Lost lease on " + lease.partitionId);
        this._detachReceiver(lease.partitionId, "Lease lost").catch();
      });
      this._leaseManager.on(BlobLeaseManager.released, (lease) => {
        debug("Released lease on " + lease.partitionId);
        this._detachReceiver(lease.partitionId, "Lease released").catch();
      });
      const ids = await this._eventHubClient.getPartitionIds();
      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        if (partitionFilter && !partitionFilter(id)) {
          debug("Skipping partition " + id);
          continue;
        }
        debug("Managing lease for partition " + id);
        const blobPath = this._consumerGroup + "/" + id;
        const lease = new BlobLease(this._storageConnectionString, this._hostName, blobPath);
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
  async stop(): Promise<void> {
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
    });
  }

  private async _attachReceiver(partitionId: string): Promise<ReceiveHandler> {
    const context = this._contextByPartition![partitionId];
    if (!context)
      return Promise.reject(new Error("Invalid state - missing context for partition " + partitionId));
    const checkpoint = await context.updateCheckpointDataFromLease();
    let eventPosition: EventPosition | undefined = undefined;
    if (checkpoint && checkpoint.offset) {
      eventPosition = EventPosition.fromOffset(checkpoint.offset);
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
    receiveHandler = this._eventHubClient.receiveOnMessage(partitionId, onMessage, onError, rcvrOptions);
    debug("[%s] [EPH - '%s'] Attaching receiver '%s' for patition '%s' with offset: %s",
      this._eventHubClient.connectionId, this._hostName, receiveHandler.name,
      partitionId, checkpoint ? checkpoint.offset : "None");
    this.emit(EventProcessorHost.opened, context);
    this._receiverByPartition![partitionId] = receiveHandler;
    return receiveHandler;
  }

  private _detachReceiver(partitionId: string, reason?: string): Promise<void> {
    const context = this._contextByPartition![partitionId];
    const receiveHandler = this._receiverByPartition![partitionId];
    let result = Promise.resolve();
    if (receiveHandler) {
      delete this._receiverByPartition![partitionId];
      result = receiveHandler.stop().catch((err) => {
        debug("[%s] [EPH - '%s'] Receiver '%s' received an error: %O.",
          this._eventHubClient.connectionId, this._hostName, receiveHandler.name, err);
      }).finally(() => {
        debug("[%s] [EPH - '%s'] Closed the receiver '%s'.", this._eventHubClient.connectionId,
          this._hostName, receiveHandler.name);
        this.emit(EventProcessorHost.closed, context, reason);
      });
    }
    return result;
  }

  /**
   * Convenience method for generating unique host name.
   * @param {string} [prefix] String to use as the beginning of the name. Default value: "js-host".
   * @return {string} A unique host name
   */
  static createHostName(prefix?: string): string {
    if (!prefix) prefix = "js-host";
    return `${prefix}-${uuid()}`;
  }

  /**
   * Creates a new host to process events from an Event Hub.
   * @param {string} hostName Name of the processor host. MUST BE UNIQUE.
   * Strongly recommend including a Guid to ensure uniqueness.
   * @param {string} consumerGroup The name of the consumer group within the Event Hub.
   * @param {string} storageConnectionString Connection string to Azure Storage account used for
   * leases and checkpointing. Example DefaultEndpointsProtocol=https;AccountName=<account-name>;
   * AccountKey=<account-key>;EndpointSuffix=core.windows.net
   * @param {string} eventHubConnectionString Connection string for the Event Hub to receive from.
   * Example: 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;
   * SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key'
   * @param {string} [eventHubPath] The name of the EventHub. This is optional if the
   * eventHubConnectionString contains ENTITY_PATH=hub-name.
   * @param {TokenProvider} [tokenProvider] An instance of the token provider that provides the
   * token for authentication. Default value: SasTokenProvider.
   * @param {LeaseManager} [LeaseManager] A manager to manage leases. Default: BlobLeaseManager.
   */
  static createFromConnectionString(
    hostName: string,
    consumerGroup: string,
    storageConnectionString: string,
    eventHubConnectionString: string,
    eventHubPath?: string,
    tokenProvider?: TokenProvider,
    leaseManager?: LeaseManager): EventProcessorHost {
    return new EventProcessorHost(
      hostName, consumerGroup, storageConnectionString,
      EventHubClient.createFromConnectionString(eventHubConnectionString, eventHubPath,
        tokenProvider), leaseManager);
  }

  /**
   * Creates a new host to process events from an Event Hub.
   * @method
   * @param {string} hostName Name of the processor host. MUST BE UNIQUE.
   * Strongly recommend including a Guid to ensure uniqueness.
   * @param {string} consumerGroup The name of the consumer group within the Event Hub.
   * @param {string} storageConnectionString Connection string to Azure Storage account used for
   * leases and checkpointing. Example DefaultEndpointsProtocol=https;AccountName=<account-name>;
   * AccountKey=<account-key>;EndpointSuffix=core.windows.net
   * @param {string} namespace Fully qualified domain name for Event Hubs.
   * Example: "{your-sb-namespace}.servicebus.windows.net"
   * @param {string} eventHubPath The name of the EventHub. This is optional if the
   * eventHubConnectionString contains ENTITY_PATH=hub-name.
   * @param {TokenCredentials} credentials - The AAD Token credentials. It can be one of the
   * following: ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials
   * | MSITokenCredentials.
   * @param {LeaseManager} [LeaseManager] A manager to manage leases. Default: BlobLeaseManager.
   */
  static createFromAadTokenCredentials(
    hostName: string,
    consumerGroup: string,
    storageConnectionString: string,
    namespace: string,
    eventHubPath: string,
    credentials: ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials,
    leaseManager?: LeaseManager): EventProcessorHost {
    return new EventProcessorHost(
      hostName, consumerGroup, storageConnectionString,
      EventHubClient.createFromAadTokenCredentials(namespace, eventHubPath, credentials), leaseManager);
  }
}
