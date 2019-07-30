// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import uuid from "uuid/v4";
import { EventHubClient } from "./eventHubClient";
import { EventPosition } from "./eventPosition";
import { PartitionContext } from "./partitionContext";
import { CheckpointManager, Checkpoint } from "./checkpointManager";
import { EventData } from "./eventData";
import { PumpManager } from "./pumpManager";
import { AbortSignalLike, AbortController } from "@azure/abort-controller";
import * as log from "./log";
import { cancellableDelay } from "./util/cancellableDelay";

/**
 * Reason for closing an EventProcessor.
 */
export enum CloseReason {
  /**
   * Ownership of the partition was lost or transitioned to a new processor instance.
   */
  OwnershipLost = "OwnershipLost",
  /**
   * The EventProcessor was shutdown.
   */
  Shutdown = "Shutdown"
}

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
  close?(reason: CloseReason): Promise<void>;
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
  private _pumpManager: PumpManager;
  private _id: string = uuid();
  private _isRunning: boolean = false;
  private _loopTask?: PromiseLike<void>;
  private _abortController?: AbortController;

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
    this._pumpManager = new PumpManager(this._id, options);
  }

  private async _getInactivePartitions(): Promise<string[]> {
    try {
      // get all partition ids on the event hub
      const partitionIds = await this._eventHubClient.getPartitionIds();
      // get partitions this EventProcessor is actively processing
      const activePartitionIds = this._pumpManager.receivingFromPartitions();

      // get a list of partition ids that are not being processed by this EventProcessor
      const inactivePartitionIds: string[] = partitionIds.filter(
        (id) => activePartitionIds.indexOf(id) === -1
      );
      return inactivePartitionIds;
    } catch (err) {
      log.error(`[${this._id}] An error occured when retrieving partition ids: ${err}`);
      throw err;
    }
  }

  /**
   * Starts the EventProcessor loop.
   * Load-balancing and partition ownership should be checked inside the loop.
   * @ignore
   */
  private async _runLoop(abortSignal: AbortSignalLike): Promise<void> {
    // periodically check if there is any partition not being processed and process it
    const waitIntervalInMs = 30000;
    while (!abortSignal.aborted) {
      try {
        // get a list of partition ids that are not being processed by this EventProcessor
        const partitionsToAdd = await this._getInactivePartitions();
        // check if the loop has been cancelled
        if (abortSignal.aborted) {
          return;
        }

        const tasks: PromiseLike<void>[] = [];
        // create partition pumps to process any partitions we should be processing
        for (const partitionId of partitionsToAdd) {
          const partitionContext: PartitionContext = {
            consumerGroupName: this._consumerGroupName,
            eventHubName: this._eventHubClient.eventHubName,
            partitionId: partitionId
          };

          const checkpointManager = new CheckpointManager();

          log.eventProcessor(
            `[${this._id}] [${partitionId}] Calling user-provided PartitionProcessorFactory.`
          );
          const partitionProcessor = this._partitionProcessorFactory(
            partitionContext,
            checkpointManager
          );

          // eventually this will 1st check if the existing PartitionOwnership has a position
          const eventPosition =
            this._processorOptions.initialEventPosition || EventPosition.earliest();

          tasks.push(
            this._pumpManager.createPump(
              this._eventHubClient,
              partitionContext,
              eventPosition,
              partitionProcessor
            )
          );
        }

        // wait for all the new pumps to be created
        await Promise.all(tasks);
        log.eventProcessor(`[${this._id}] PartitionPumps created within EventProcessor.`);

        // sleep
        log.eventProcessor(
          `[${this._id}] Pausing the EventProcessor loop for ${waitIntervalInMs} ms.`
        );
        await cancellableDelay(waitIntervalInMs, abortSignal);
      } catch (err) {
        log.error(`[${this._id}] An error occured within the EventProcessor loop: ${err}`);
      }
    }

    // loop has completed, remove all existing pumps
    return this._pumpManager.removeAllPumps(CloseReason.Shutdown);
  }

  /**
   * Starts the event processor, fetching the list of partitions, and attempting to grab leases
   * For each successful lease, it will get the details from the blob and start a receiver at the
   * point where it left off previously.
   *
   * @return {void}
   */
  start(): void {
    if (this._isRunning) {
      log.eventProcessor(`[${this._id}] Attempted to start an already running EventProcessor.`);
      return;
    }

    this._isRunning = true;
    this._abortController = new AbortController();
    log.eventProcessor(`[${this._id}] Starting an EventProcessor.`);
    this._loopTask = this._runLoop(this._abortController.signal);
  }

  /**
   * Stops the EventProcessor from processing messages.
   * @return {Promise<void>}
   */
  async stop(): Promise<void> {
    log.eventProcessor(`[${this._id}] Stopping an EventProcessor.`);
    if (this._abortController) {
      // cancel the event processor loop
      this._abortController.abort();
    }

    this._isRunning = false;
    try {
      // waits for the event processor loop to complete
      // will complete immediately if _loopTask is undefined
      await this._loopTask;
    } catch (err) {
      log.error(`[${this._id}] An error occured while stopping the EventProcessor: ${err}`);
    } finally {
      log.eventProcessor(`[${this._id}] EventProcessor stopped.`);
    }
  }
}
