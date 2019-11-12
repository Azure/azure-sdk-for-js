// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import uuid from "uuid/v4";
import { EventHubClient } from "./eventHubClient";
import { EventPosition } from "./eventPosition";
import { PumpManager } from "./pumpManager";
import { AbortController, AbortSignalLike } from "@azure/abort-controller";
import * as log from "./log";
import { FairPartitionLoadBalancer, PartitionLoadBalancer } from "./partitionLoadBalancer";
import { delay } from "@azure/core-amqp";
import { PartitionProcessor, Checkpoint } from "./partitionProcessor";
import { SubscriptionOptions } from './eventHubConsumerClientModels';

/**
 * An enum representing the different reasons for an `EventProcessor` to stop processing
 * events from a partition in a consumer group of an Event Hub instance.
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

/**
 * An interface representing data that can identify a partition.
 */
export interface PartitionContext {
  /**
   * @property The fully qualified Event Hubs namespace. This is likely to be similar to
   * <yournamespace>.servicebus.windows.net
   */
  fullyQualifiedNamespace: string;
  /**
   * @property The event hub name
   */
  eventHubName: string;
  /**
   * @property The consumer group name
   */
  consumerGroupName: string;
  /**
   * @property The identifier of the Event Hub partition
   */
  partitionId: string;
}

/**
 * An interface representing the details on which instance of a `EventProcessor` owns processing
 * of a given partition from a consumer group of an Event Hub instance.
 *
 * **Note**: This is used internally by the `EventProcessor` and user never has to create it directly.
 */
export interface PartitionOwnership extends PartitionContext {
  /**
   * @property The unique identifier of the event processor.
   */
  ownerId: string;  
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
 * A Partition manager stores and retrieves partition ownership information and checkpoint details
 * for each partition in a given consumer group of an event hub instance.
 *
 * Users are not meant to implement an `PartitionManager`.
 * Users are expected to choose existing implementations of this interface, instantiate it, and pass
 * it to the constructor of `EventProcessor`.
 *
 * To get started, you can use the `InMemoryPartitionManager` which will store the relevant information in memory.
 * But in production, you should choose an implementation of the `PartitionManager` interface that will
 * store the checkpoints and partition ownerships to a durable store instead.
 *
 * Implementations of `PartitionManager` can be found on npm by searching for packages with the prefix &commat;azure/eventhub-checkpointstore-.
 */
export interface PartitionManager {
  /**
   * Called to get the list of all existing partition ownership from the underlying data store. Could return empty
   * results if there are is no existing ownership information.
   *
   * @param fullyQualifiedNamespace The fully qualified Event Hubs namespace. This is likely to be similar to
   * <yournamespace>.servicebus.windows.net.
   * @param eventHubName The event hub name.
   * @param consumerGroupName The consumer group name.
   * @return A list of partition ownership details of all the partitions that have/had an owner.
   */
  listOwnership(
    fullyQualifiedNamespace: string,
    eventHubName: string,
    consumerGroupName: string
  ): Promise<PartitionOwnership[]>;
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

export type SubscriptionEventHandlers = 'processClose' | 'processError' | 'processEvents' | 'processInitialize';
export type SubscriptionBatchOptions = 'maxBatchSize' | 'maxWaitTimeInSeconds';

/**
 * A set of options to pass to the constructor of `EventProcessor`.
 * You can specify
 * - `maxBatchSize`: The max size of the batch of events passed each time to user code for processing.
 * - `maxWaitTimeInSeconds`: The maximum amount of time to wait to build up the requested message count before
 * passing the data to user code for processing. If not provided, it defaults to 60 seconds.
 *
 * Example usage with default values:
 * ```ts
 * {
  *     maxBatchSize: 1,
  *     maxWaitTimeInSeconds: 60
  * }
  * ```
  * @internal
  */
export interface FullEventProcessorOptions extends
  // make the 'maxBatchSize' and 'maxWaitTimeInSeconds' fields required for our internal classes
  // (it's optional for users)
  Required<Pick<SubscriptionOptions, SubscriptionBatchOptions>>,
  Pick<SubscriptionOptions, Exclude<keyof SubscriptionOptions, SubscriptionBatchOptions | SubscriptionEventHandlers>> {
  /**
   * A load balancer to use
   */
  partitionLoadBalancer ?: PartitionLoadBalancer
}

/**
 * Event Processor based applications consist of one or more instances of EventProcessor which have been
 * configured to consume events from the same Event Hub and consumer group. They balance the
 * workload across different instances by distributing the partitions to be processed among themselves.
 * They also allow the user to track progress when events are processed using checkpoints.
 *
 * A checkpoint is meant to represent the last successfully processed event by the user from a particular
 * partition of a consumer group in an Event Hub instance.
 *
 * You need the below to create an instance of `EventProcessor`
 * - The name of the consumer group from which you want to process events
 * - An instance of `EventHubClient` class that was created for the Event Hub instance.
 * - A user implemented class that extends the `PartitionProcessor` class. To get started, you can use the
 * base class `PartitionProcessor` which simply logs the incoming events. To provide your code to process incoming
 * events, extend this class and override the `processEvents()` method. For example:
 * ```js
 * class SamplePartitionProcessor extends PartitionProcessor {
 *     async processEvents(events) {
 *        // user code to process events here
 *        // Information on the partition being processed is available as properties on the `SamplePartitionProcessor` class
 *        // use `this.updateCheckpoint()` method to update checkpoints as needed
 *     }
 * }
 * ```
 * - An instance of `PartitionManager`. To get started, you can pass an instance of `InMemoryPartitionManager`.
 * For production, choose an implementation that will store checkpoints and partition ownership details to a durable store.
 * Implementations of `PartitionManager` can be found on npm by searching for packages with the prefix &commat;azure/eventhub-checkpointstore-.
 *
 * @class EventProcessor
 */
export class EventProcessor {
  private _consumerGroupName: string;
  private _eventHubClient: EventHubClient;
  private _partitionProcessorClass: typeof PartitionProcessor;
  private _processorOptions: FullEventProcessorOptions;
  private _pumpManager: PumpManager;
  private _id: string = uuid();
  private _isRunning: boolean = false;
  private _loopTask?: PromiseLike<void>;
  private _abortController?: AbortController;
  private _partitionManager: PartitionManager;
  private _partitionLoadBalancer: PartitionLoadBalancer;

  /**
   * @param consumerGroupName The name of the consumer group from which you want to process events.
   * @param eventHubClient An instance of `EventHubClient` that was created for the Event Hub instance.
   * @param PartitionProcessorClass A user-provided class that extends the `PartitionProcessor` class.
   * This class will be responsible for processing and checkpointing events.
   * @param partitionManager An instance of `PartitionManager`. To get started, you can pass an instance of `InMemoryPartitionManager`.
   * For production, choose an implementation that will store checkpoints and partition ownership details to a durable store.
   * @param options A set of options to configure the Event Processor
   * - `maxBatchSize`         : The max size of the batch of events passed each time to user code for processing.
   * - `maxWaitTimeInSeconds` : The maximum amount of time to wait to build up the requested message count before
   * passing the data to user code for processing. If not provided, it defaults to 60 seconds.
   */
  constructor(
    consumerGroupName: string,
    eventHubClient: EventHubClient,
    PartitionProcessorClass: typeof PartitionProcessor,
    partitionManager: PartitionManager,
    options: FullEventProcessorOptions
  ) {
    this._consumerGroupName = consumerGroupName;
    this._eventHubClient = eventHubClient;
    this._partitionProcessorClass = PartitionProcessorClass;
    this._partitionManager = partitionManager;
    this._processorOptions = options;
    this._pumpManager = new PumpManager(this._id, this._processorOptions);
    const inactiveTimeLimitInMS = 60000; // ownership expiration time (1 minute)
    this._partitionLoadBalancer = options.partitionLoadBalancer || new FairPartitionLoadBalancer(this._id, inactiveTimeLimitInMS);
  }

  /**
   * The unique identifier for the EventProcessor.
   *
   * @return {string}
   */
  get id(): string {
    return this._id;
  }

  private _createPartitionOwnershipRequest(
    partitionOwnershipMap: Map<string, PartitionOwnership>,
    partitionIdToClaim: string
  ): PartitionOwnership {
    const previousPartitionOwnership = partitionOwnershipMap.get(partitionIdToClaim);
    const partitionOwnership: PartitionOwnership = {
      ownerId: this._id,
      partitionId: partitionIdToClaim,
      fullyQualifiedNamespace: this._eventHubClient.fullyQualifiedNamespace,
      consumerGroupName: this._consumerGroupName,
      eventHubName: this._eventHubClient.eventHubName,
      sequenceNumber: previousPartitionOwnership
        ? previousPartitionOwnership.sequenceNumber
        : undefined,
      offset: previousPartitionOwnership ? previousPartitionOwnership.offset : undefined,
      eTag: previousPartitionOwnership ? previousPartitionOwnership.eTag : undefined,
      ownerLevel: 0
    };

    return partitionOwnership;
  }

  /*
   * Claim ownership of the given partition if it's available
   */
  private async _claimOwnership(
    partitionOwnershipMap: Map<string, PartitionOwnership>,
    partitionIdToClaim: string
  ): Promise<void> {
    log.partitionLoadBalancer(
      `[${this._id}] Attempting to claim ownership of partition ${partitionIdToClaim}.`
    );
    const ownershipRequest = this._createPartitionOwnershipRequest(
      partitionOwnershipMap,
      partitionIdToClaim
    );
    try {
      await this._partitionManager.claimOwnership([ownershipRequest]);
      log.partitionLoadBalancer(
        `[${this._id}] Successfully claimed ownership of partition ${partitionIdToClaim}.`
      );

      log.partitionLoadBalancer(
        `[${this._id}] [${partitionIdToClaim}] Calling user-provided PartitionProcessorFactory.`
      );
      const partitionProcessor = new this._partitionProcessorClass();
      partitionProcessor.fullyQualifiedNamespace = this._eventHubClient.fullyQualifiedNamespace;
      partitionProcessor.eventHubName = this._eventHubClient.eventHubName;
      partitionProcessor.consumerGroupName = this._consumerGroupName;
      partitionProcessor.partitionId = ownershipRequest.partitionId;
      partitionProcessor.partitionManager = this._partitionManager;
      partitionProcessor.eventProcessorId = this.id;

      const eventPosition = ownershipRequest.sequenceNumber
        ? EventPosition.fromSequenceNumber(ownershipRequest.sequenceNumber)
        : (this._processorOptions.defaultEventPosition || EventPosition.earliest());

      await this._pumpManager.createPump(this._eventHubClient, eventPosition, partitionProcessor);
      log.partitionLoadBalancer(`[${this._id}] PartitionPump created successfully.`);
    } catch (err) {
      log.error(
        `[${this.id}] Failed to claim ownership of partition ${ownershipRequest.partitionId}`
      );
    }
  }

  /**
   * Every loop to this method will result in this EventProcessor owning at most one new partition.
   *
   * The load is considered balanced when no active EventProcessor owns 2 partitions more than any other active
   * EventProcessor. Given that each invocation to this method results in ownership claim of at most one partition,
   * this algorithm converges gradually towards a steady state.
   *
   * When a new partition is claimed, this method is also responsible for starting a partition pump that creates an
   * EventHubConsumer for processing events from that partition.
   */

  private async _runLoop(abortSignal: AbortSignalLike): Promise<void> {
    // periodically check if there is any partition not being processed and process it
    const waitIntervalInMs = 10000;
    while (!abortSignal.aborted) {
      try {
        const partitionOwnershipMap: Map<string, PartitionOwnership> = new Map();
        // Retrieve current partition ownership details from the datastore.
        const partitionOwnership = await this._partitionManager.listOwnership(
          this._eventHubClient.fullyQualifiedNamespace,
          this._eventHubClient.eventHubName,
          this._consumerGroupName
        );
        for (const ownership of partitionOwnership) {
          partitionOwnershipMap.set(ownership.partitionId, ownership);
        }
        const partitionIds = await this._eventHubClient.getPartitionIds({
          abortSignal: abortSignal
        });

        if (abortSignal.aborted) {
          return;
        }

        if (partitionIds.length > 0) {
          const partitionsToClaim = this._partitionLoadBalancer.loadBalance(
            partitionOwnershipMap,
            partitionIds
          );
          if (partitionsToClaim) {
            for (const partitionToClaim of partitionsToClaim) {
              await this._claimOwnership(partitionOwnershipMap, partitionToClaim);
            }
          }
        }

        // sleep
        log.eventProcessor(
          `[${this._id}] Pausing the EventProcessor loop for ${waitIntervalInMs} ms.`
        );
        await delay(waitIntervalInMs, abortSignal);
      } catch (err) {
        log.error(`[${this._id}] An error occured within the EventProcessor loop: ${err}`);
      }
    }
  }

  /**
   * Starts the `EventProcessor`. Based on the number of instances of `EventProcessor` that are running for the
   * same consumer group, the partitions are distributed among these instances to process events.
   *
   * For each partition, the user provided `PartitionProcessor` is instantiated.
   *
   * Subsequent calls to start will be ignored if this event processor is already running.
   * Calling `start()` after `stop()` is called will restart this event processor.
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

  isRunning() {
    return this._isRunning;
  }

  /**
   * Stops processing events for all partitions owned by this event processor.
   * All `PartitionProcessor` will be shutdown and any open resources will be closed.
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
      // remove all existing pumps
      await this._pumpManager.removeAllPumps(CloseReason.Shutdown);

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
