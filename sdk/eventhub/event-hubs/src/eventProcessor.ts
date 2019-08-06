// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import uuid from "uuid/v4";
import { EventHubClient } from "./eventHubClient";
import { EventPosition } from "./eventPosition";
import { PartitionContext } from "./partitionContext";
import { CheckpointManager, Checkpoint } from "./checkpointManager";
import { ReceivedEventData } from "./eventData";
import { PumpManager } from "./pumpManager";
import { AbortSignalLike, AbortController } from "@azure/abort-controller";
import * as log from "./log";
import { delay } from "@azure/core-amqp";

/**
 * Reason for closing a PartitionProcessor.
 */
export enum CloseReason {
  /**
   * The PartitionProcessor was shutdown due to some internal or service exception.
   */
  EventHubException = "EventHubException",
  /**
   * Ownership of the partition was lost or transitioned to a new processor instance.
   */
  OwnershipLost = "OwnershipLost",
  /**
   * The EventProcessor was shutdown.
   */
  Shutdown = "Shutdown"
}

/**
 * Implementations of this interface are responsible to process events, handle errors and update checkpoints
 *
 */
export interface PartitionProcessor {
  /**
   * This method is called when the `EventProcessor` takes ownership of a new partition and before any
   * events are received.
   *
   * @return {void}
   */
  initialize?(): Promise<void>;
  /**
   * This method is called before the partition processor is closed by the EventProcessor.
   *
   * @param closeReason The reason for closing this partition processor.
   * @return {void}
   */
  close?(reason: CloseReason): Promise<void>;
  /**
   * This method is called when new events are received.
   *
   * This is also a good place to update checkpoints as appropriate.
   *
   * @param eventData The received events to be processed.
   * @return {void}
   */
  processEvents(events: ReceivedEventData[]): Promise<void>;
  /**
   * This method is called when an error occurs while receiving events from Event Hub.
   * 
   * @param error The error to be processed.
   * @return {void}
   */
  processError(error: Error): Promise<void>;
}

/**
 * Partition ownership information. Used by `PartitionManager` to claim ownership.
 */
export interface PartitionOwnership {
  /**
   * @property The event hub name
   */
  eventHubName: string;
  /**
   * @property The consumer group name
   */
  consumerGroupName: string;
  /**
   * @property The unique identifier of the event processor.
   */
  ownerId: string;
  /**
   * @property The identifier of the Event Hub partition
   */
  partitionId: string;
  /**
   * @property
   * The owner level
   */
  ownerLevel: number;
  /**
   * @property The offset of the event.
   */
  offset?: number;
  /**
   * @property The sequence number of the event.
   */
  sequenceNumber?: number;
  /**
   * @property The last modified time.
   */
  lastModifiedTimeInMS?: number;
  /**
   * @property The unique identifier for the operation.
   */
  eTag?: string;
}

/**
 * A functional interface to create new instance(s) of `PartitionProcessor` when provided with a `PartitionContext` and `CheckpointManager`.
 */
export interface PartitionProcessorFactory {
  /**
   * Factory method to create a new instance of `PartitionProcessor` for a partition.
   *
   * @param partitionContext The partition context containing partition and Event Hub information. The new instance of
   * `PartitionProcessor` created by this method will be responsible for processing events only for this
   * partition.
   * @param checkpointManager The checkpoint manager for updating checkpoints when events are processed by `PartitionProcessor`.
   *
   * @return A new instance of `PartitionProcessor` responsible for processing events.
   */
  (context: PartitionContext, checkpointManager: CheckpointManager): PartitionProcessor;
}

/**
 *  Partition manager stores and retrieves partition ownership information and checkpoint details for each partition in a given consumer group of an event hub instance.
 */
export interface PartitionManager {
  /**
   * Called to get the list of all existing partition ownership from the underlying data store. Could return empty
   * results if there are is no existing ownership information.
   *
   * @param eventHubName The event hub name.
   * @param consumerGroupName The consumer group name.
   * @return A list of partition ownership details of all the partitions that have/had an owner.
   */
  listOwnership(eventHubName: string, consumerGroupName: string): Promise<PartitionOwnership[]>;
  /**
   * Called to claim ownership of a list of partitions. This will return the list of partitions that were owned
   * successfully.
   *
   * @param partitionOwnership The list of partition ownership this instance is claiming to own.
   * @return A list of partitions this instance successfully claimed ownership.
   */
  claimOwnership(partitionOwnership: PartitionOwnership[]): Promise<PartitionOwnership[]>;
  /**
   * Updates the checkpoint in the data store for a partition.
   *
   * @param checkpoint The checkpoint.
   * @return The new eTag on successful update.
   */
  updateCheckpoint(checkpoint: Checkpoint): Promise<string>;
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
  private _partitionManager: PartitionManager;

  /**
   * @param consumerGroupName The consumer group name used in this event processor to consumer events.
   * @param eventHubAsyncClient The Event Hub client.
   * @param partitionProcessorFactory The factory to create new partition processor(s).
   * @param initialEventPosition Initial event position to start consuming events.
   * @param partitionManager The partition manager.
   * @param eventHubName The Event Hub name.
   */
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
    this._partitionManager = partitionManager;
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

  /*
   * A simple implementation of an event processor that:
   * - Fetches all partition ids from Event Hub
   * - Gets the current ownership information of all the partitions from PartitionManager
   * - Claims ownership of any partition that doesn't have an owner yet.
   * - Starts a new PartitionProcessor and receives events from each of the partitions this instance owns
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

          const partitionOwnership: PartitionOwnership = {
            eventHubName: this._eventHubClient.eventHubName,
            consumerGroupName: this._consumerGroupName,
            ownerId: this._id,
            partitionId: partitionId,
            ownerLevel: 0
          };
          await this._partitionManager.claimOwnership([partitionOwnership]);

          const checkpointManager = new CheckpointManager(
            partitionContext,
            this._partitionManager,
            this._id
          );

          log.eventProcessor(
            `[${this._id}] [${partitionId}] Calling user-provided PartitionProcessorFactory.`
          );
          const partitionProcessor = this._partitionProcessorFactory(
            partitionContext,
            checkpointManager
          );

          // eventually this will 1st check if the existing PartitionOwnership has a position
          let eventPosition =
            this._processorOptions.initialEventPosition || EventPosition.earliest();

          const partitionOwnerships = await this._partitionManager.listOwnership(
            this._eventHubClient.eventHubName,
            this._consumerGroupName
          );
          for (const ownership of partitionOwnerships) {
            if (ownership.partitionId === partitionId && ownership.sequenceNumber) {
              eventPosition = EventPosition.fromSequenceNumber(ownership.sequenceNumber);
              break;
            }
          }

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
        await delay(waitIntervalInMs, abortSignal);
      } catch (err) {
        log.error(`[${this._id}] An error occured within the EventProcessor loop: ${err}`);
      }
    }

    // loop has completed, remove all existing pumps
    return this._pumpManager.removeAllPumps(CloseReason.Shutdown);
  }

  /**
   * The unique identifier for the EventProcessor.
   *
   * @return {string}
   */
  get id(): string {
    return this._id;
  }

  /**
   * Starts processing of events for all partitions of the Event Hub that this event processor can own, assigning a
   * dedicated `PartitionProcessor` to each partition. If there are other Event Processors active for the same
   * consumer group on the Event Hub, responsibility for partitions will be shared between them.
   *
   * Subsequent calls to start will be ignored if this event processor is already running. Calling `start()` after `stop()`
   * is called will restart this event processor.
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
   * Stops processing events for all partitions owned by this event processor. All `PartitionProcessor` will be
   * shutdown and any open resources will be closed.
   *
   * Subsequent calls to stop will be ignored if the event processor is not running.
   *
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
