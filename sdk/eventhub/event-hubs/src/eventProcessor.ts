// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import uuid from "uuid/v4";
import { EventHubClient } from "./impl/eventHubClient";
import { EventPosition } from "./eventPosition";
import { PumpManager } from "./pumpManager";
import { AbortController, AbortSignalLike } from "@azure/abort-controller";
import * as log from "./log";
import { FairPartitionLoadBalancer, PartitionLoadBalancer } from "./partitionLoadBalancer";
import { delay } from "@azure/core-amqp";
import { PartitionProcessor, Checkpoint } from "./partitionProcessor";
import { SubscribeOptions } from "./eventHubConsumerClientModels";
import { SubscriptionEventHandlers } from "./eventHubConsumerClientModels";

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
 * An interface representing the details on which instance of a `EventProcessor` owns processing
 * of a given partition from a consumer group of an Event Hub instance.
 *
 * **Note**: This is used internally by the `EventProcessor` and user never has to create it directly.
 */
export interface PartitionOwnership {
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
  consumerGroup: string;
  /**
   * @property The identifier of the Event Hub partition.
   */
  partitionId: string;
  /**
   * @property The unique identifier of the event processor.
   */
  ownerId: string;
  /**
   * @property The last modified time.
   */
  lastModifiedTimeInMs?: number;
  /**
   * @property The unique identifier for the operation.
   */
  etag?: string;
}

/**
 * A checkpoint store stores and retrieves partition ownership information and checkpoint details
 * for each partition in a given consumer group of an event hub instance.
 *
 * Users are not meant to implement an `CheckpointStore`.
 * Users are expected to choose existing implementations of this interface, instantiate it, and pass
 * it to the constructor of `EventProcessor`.
 *
 * To get started, you can use the `InMemoryCheckpointStore` which will store the relevant information in memory.
 * But in production, you should choose an implementation of the `CheckpointStore` interface that will
 * store the checkpoints and partition ownerships to a durable store instead.
 *
 * Implementations of `CheckpointStore` can be found on npm by searching for packages with the prefix &commat;azure/eventhub-checkpointstore-.
 */
export interface CheckpointStore {
  /**
   * Called to get the list of all existing partition ownership from the underlying data store. Could return empty
   * results if there are is no existing ownership information.
   *
   * @param fullyQualifiedNamespace The fully qualified Event Hubs namespace. This is likely to be similar to
   * <yournamespace>.servicebus.windows.net.
   * @param eventHubName The event hub name.
   * @param consumerGroup The consumer group name.
   * @return A list of partition ownership details of all the partitions that have/had an owner.
   */
  listOwnership(
    fullyQualifiedNamespace: string,
    eventHubName: string,
    consumerGroup: string
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
   */
  updateCheckpoint(checkpoint: Checkpoint): Promise<void>;

  /**
   * Lists all the checkpoints in a data store for a given namespace, eventhub and consumer group.
   *
   * @param fullyQualifiedNamespace The fully qualified Event Hubs namespace. This is likely to be similar to
   * <yournamespace>.servicebus.windows.net.
   * @param eventHubName The event hub name.
   * @param consumerGroup The consumer group name.
   */
  listCheckpoints(
    fullyQualifiedNamespace: string,
    eventHubName: string,
    consumerGroup: string
  ): Promise<Checkpoint[]>;
}

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
 *     maxWaitTimeInSeconds: 60,
 * }
 * ```
 * @internal
 */
export interface FullEventProcessorOptions
  extends // make the 'maxBatchSize', 'maxWaitTimeInSeconds', 'ownerLevel' fields required extends
    // for our internal classes (these are optional for external users)
    Required<Pick<SubscribeOptions, "maxBatchSize" | "maxWaitTimeInSeconds">>,
    Pick<
      SubscribeOptions,
      Exclude<
        keyof SubscribeOptions,
        // (made required above)
        "maxBatchSize" | "maxWaitTimeInSeconds"
      >
    > {
  /**
   * A load balancer to use
   */
  partitionLoadBalancer?: PartitionLoadBalancer;
  /**
   * The amount of time to wait between each attempt at claiming partitions.
   */
  loopIntervalInMs?: number;

  /**
   * The maximum amount of time since a PartitionOwnership was updated
   * to use to determine if a partition is no longer claimed.
   * Setting this value to 0 will cause the default value to be used.
   */
  inactiveTimeLimitInMs?: number;
  /**
   * An optional ownerId to use rather than using an internally generated ID
   * This allows you to logically group a series of processors together (for instance
   * like we do with EventHubConsumerClient)
   */
  ownerId?: string;
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
 * - An instance of `CheckpointStore`. See &commat;azure/eventhubs-checkpointstore-blob for an implementation.
 * For production, choose an implementation that will store checkpoints and partition ownership details to a durable store.
 * Implementations of `CheckpointStore` can be found on npm by searching for packages with the prefix &commat;azure/eventhub-checkpointstore-.
 *
 * @class EventProcessor
 */
export class EventProcessor {
  private _consumerGroup: string;
  private _eventHubClient: EventHubClient;
  private _processorOptions: FullEventProcessorOptions;
  private _pumpManager: PumpManager;
  private _id: string;
  private _isRunning: boolean = false;
  private _loopTask?: PromiseLike<void>;
  private _abortController?: AbortController;
  private _partitionLoadBalancer: PartitionLoadBalancer;
  private _loopIntervalInMs = 10000;
  private _inactiveTimeLimitInMs = 60000;

  /**
   * @param consumerGroup The name of the consumer group from which you want to process events.
   * @param eventHubClient An instance of `EventHubClient` that was created for the Event Hub instance.
   * @param PartitionProcessorClass A user-provided class that extends the `PartitionProcessor` class.
   * This class will be responsible for processing and checkpointing events.
   * @param checkpointStore An instance of `CheckpointStore`. See &commat;azure/eventhubs-checkpointstore-blob for an implementation.
   * For production, choose an implementation that will store checkpoints and partition ownership details to a durable store.
   * @param options A set of options to configure the Event Processor
   * - `maxBatchSize`         : The max size of the batch of events passed each time to user code for processing.
   * - `maxWaitTimeInSeconds` : The maximum amount of time to wait to build up the requested message count before
   * passing the data to user code for processing. If not provided, it defaults to 60 seconds.
   */
  constructor(
    consumerGroup: string,
    eventHubClient: EventHubClient,
    private _subscriptionEventHandlers: SubscriptionEventHandlers,
    private _checkpointStore: CheckpointStore,
    options: FullEventProcessorOptions
  ) {
    if (options.ownerId) {
      this._id = options.ownerId;
      log.eventProcessor(`Starting event processor with ID ${this._id}`);
    } else {
      this._id = uuid();
      log.eventProcessor(`Starting event processor with autogenerated ID ${this._id}`);
    }

    this._consumerGroup = consumerGroup;
    this._eventHubClient = eventHubClient;
    this._processorOptions = options;
    this._pumpManager = new PumpManager(this._id, this._processorOptions);
    const inactiveTimeLimitInMS = options.inactiveTimeLimitInMs || this._inactiveTimeLimitInMs;
    this._partitionLoadBalancer =
      options.partitionLoadBalancer ||
      new FairPartitionLoadBalancer(inactiveTimeLimitInMS);
    if (options.loopIntervalInMs) {
      this._loopIntervalInMs = options.loopIntervalInMs;
    }
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
      consumerGroup: this._consumerGroup,
      eventHubName: this._eventHubClient.eventHubName,
      etag: previousPartitionOwnership ? previousPartitionOwnership.etag : undefined
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
      const claimedOwnerships = await this._checkpointStore.claimOwnership([ownershipRequest]);
      // since we only claim one ownership at a time, check the array length and throw
      if (!claimedOwnerships.length) {
        throw new Error(`Failed to claim ownership of partition ${ownershipRequest.partitionId}`);
      }

      log.partitionLoadBalancer(
        `[${this._id}] Successfully claimed ownership of partition ${partitionIdToClaim}.`
      );

      log.partitionLoadBalancer(
        `[${this._id}] [${partitionIdToClaim}] Calling user-provided PartitionProcessorFactory.`
      );
      const partitionProcessor = new PartitionProcessor(
        this._subscriptionEventHandlers,
        this._checkpointStore,
        {
          fullyQualifiedNamespace: this._eventHubClient.fullyQualifiedNamespace,
          eventHubName: this._eventHubClient.eventHubName,
          consumerGroup: this._consumerGroup,
          partitionId: ownershipRequest.partitionId,
          eventProcessorId: this.id
        }
      );

      const eventPosition = await this._getStartingPosition(partitionIdToClaim);

      await this._pumpManager.createPump(this._eventHubClient, eventPosition, partitionProcessor);
      log.partitionLoadBalancer(`[${this._id}] PartitionPump created successfully.`);
    } catch (err) {
      log.error(
        `[${this.id}] Failed to claim ownership of partition ${ownershipRequest.partitionId}`
      );
      await this._handleSubscriptionError(err);
    }
  }

  private async _getStartingPosition(partitionIdToClaim: string) {
    const availableCheckpoints = await this._checkpointStore.listCheckpoints(
      this._eventHubClient.fullyQualifiedNamespace,
      this._eventHubClient.eventHubName,
      this._consumerGroup
    );

    const validCheckpoints = availableCheckpoints.filter(
      (chk) => chk.partitionId === partitionIdToClaim
    );

    if (validCheckpoints.length > 0) {
      return EventPosition.fromOffset(validCheckpoints[0].offset);
    }

    return undefined;
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
    while (!abortSignal.aborted) {
      try {
        const partitionOwnershipMap: Map<string, PartitionOwnership> = new Map();
        // Retrieve current partition ownership details from the datastore.
        const partitionOwnership = await this._checkpointStore.listOwnership(
          this._eventHubClient.fullyQualifiedNamespace,
          this._eventHubClient.eventHubName,
          this._consumerGroup
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
            this._id,
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
          `[${this._id}] Pausing the EventProcessor loop for ${this._loopIntervalInMs} ms.`
        );
        await delay(this._loopIntervalInMs, abortSignal);
      } catch (err) {
        log.error(`[${this._id}] An error occured within the EventProcessor loop: ${err}`);
        await this._handleSubscriptionError(err);
      }
    }
  }

  /**
   * This is called when there are errors that are not specific to a partition (ex: load balancing)
   */
  private async _handleSubscriptionError(err: Error): Promise<void> {
    // filter out any internal "expected" errors
    if (err.name === "AbortError") {
      return;
    }

    if (this._subscriptionEventHandlers.processError) {
      try {
        await this._subscriptionEventHandlers.processError(err, {
          fullyQualifiedNamespace: this._eventHubClient.fullyQualifiedNamespace,
          eventHubName: this._eventHubClient.eventHubName,
          consumerGroup: this._consumerGroup,
          partitionId: "",
          updateCheckpoint: async () => {}
        });
      } catch (err) {
        log.error(`[${this._id}] An error was thrown from the user's processError handler: ${err}`);
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
