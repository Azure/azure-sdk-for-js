// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EventHubClient } from "./eventHubClient";
import { EventPosition } from "./eventPosition";
import { PartitionContext } from "./partitionContext";
import { CheckpointManager, Checkpoint } from "./checkpointManager";
import { EventData } from "./eventData";
import { PartitionPump } from "./partitionPump";

export interface PartitionProcessor {
  /**
   * Optional. Called when EPH begins processing a partition.
   */
  initialize?(): Promise<void>;
  /**
   * Optional. Called when EPH stops processing a partition.
   * This may occur when control of the partition switches to another EPH or when user stops EPH
   * TODO: update string -> CloseReason
   */
  close?(reason: string): Promise<void>;
  /**
   * Called when a batch of events have been received.
   */
  processEvents(events: EventData[]): Promise<void>;
  /**
   * Called when the underlying client experiences an error while receiving.
   */
  processError(error: Error): Promise<void>;
}

/**
 * used by PartitionManager to claim ownership.
 * returned by listOwnerships
 */
export interface PartitionOwnership {
  eventHubName: string;
  consumerGroupName: string;
  instanceId: string;
  partitionId: string;
  ownerLevel: number;
  offset?: number;
  sequenceNumber?: number;
  lastModifiedTime?: number;
  ETag?: string;
}

/**
 * The PartitionProcessorFactory is called by EPH whenever a new partition is about to be processed.
 */
export interface PartitionProcessorFactory {
  (context: PartitionContext, checkpointManager: CheckpointManager): PartitionProcessor;
}

/**
 * Interface for the plugin to be passed when creating the EventProcessorHost
 * to manage partition ownership and checkpoint creation.
 * Deals mainly with read/write to the chosen storage service
 */
export interface PartitionManager {
  listOwnerships(eventHubName: string, consumerGroupName: string): Promise<PartitionOwnership[]>;
  claimOwnerships(partitionOwnerships: PartitionOwnership[]): Promise<PartitionOwnership[]>;
  createCheckpoint(checkpoint: Checkpoint): Promise<void>;
}

// Options passed when creating EventProcessor, everything is optional
export interface EventProcessorOptions {
  initialEventPosition?: EventPosition;
  maxBatchSize?: number;
  maxWaitTimeInSeconds?: number;
}

/**
 * Describes the Event Processor Host to process events from an EventHub.
 * @class EventProcessorHost
 */
export class EventProcessor {
  private _consumerGroupName: string;
  private _eventHubClient: EventHubClient;
  private _partitionProcessorFactory: PartitionProcessorFactory;
  private _processorOptions: EventProcessorOptions;
  private _partitionPump?: PartitionPump;

  constructor(
    consumerGroupName: string,
    eventHubClient: EventHubClient,
    partitionProcessorFactory: PartitionProcessorFactory,
    partitionManager: PartitionManager,
    options?: EventProcessorOptions
  ) {
    if (!options) options = {};

    this._consumerGroupName = consumerGroupName;
    this._eventHubClient = eventHubClient;
    this._partitionProcessorFactory = partitionProcessorFactory;
    this._processorOptions = options;
  }

  /**
   * Starts the event processor, fetching the list of partitions, and attempting to grab leases
   * For each successful lease, it will get the details from the blob and start a receiver at the
   * point where it left off previously.
   *
   * @return {Promise<void>}
   */
  async start(): Promise<void> {
    const partitionIds = await this._eventHubClient.getPartitionIds();
    const partitionContext: PartitionContext = {
      partitionId: partitionIds[0],
      consumerGroupName: this._consumerGroupName,
      eventHubName: this._eventHubClient.eventHubName
    };
    const partitionProcessor = this._partitionProcessorFactory(
      partitionContext,
      new CheckpointManager()
    );
    this._partitionPump = new PartitionPump(
      this._eventHubClient,
      partitionContext,
      partitionProcessor,
      this._processorOptions
    );
    await this._partitionPump.start(partitionIds[0]);
  }

  /**
   * Stops the EventProcessor from processing messages.
   * @return {Promise<void>}
   */
  async stop(): Promise<void> {
    if (this._partitionPump) {
      await this._partitionPump.stop("Stopped processing");
    }
  }
}
