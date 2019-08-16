// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  PartitionManager,
  PartitionProcessorFactory,
  PartitionOwnership,
  EventProcessorOptions
} from "./eventProcessor";
import { PartitionContext } from "./partitionContext";
import { CheckpointManager } from "./checkpointManager";
import { PumpManager } from "./pumpManager";
import { EventHubClient } from "./eventHubClient";
import { EventPosition } from "./eventPosition";
import { AbortSignalLike } from "@azure/abort-controller";
import { delay } from "@azure/core-amqp";
import * as log from "./log";

export class PartitionLoadBalancer {
  private _consumerGroupName: string;
  private _eventHubClient: EventHubClient;
  private _partitionProcessorFactory: PartitionProcessorFactory;
  private _ownerId: string;
  private _pumpManager: PumpManager;
  private _partitionManager: PartitionManager;
  private _processorOptions: EventProcessorOptions;

  /**
   * @param consumerGroupName The consumer group name used in this event processor to consumer events.
   * @param eventHubAsyncClient The Event Hub client.
   * @param partitionProcessorFactory The factory to create new partition processor(s).
   * @param initialEventPosition Initial event position to start consuming events.
   * @param partitionManager The partition manager.
   * @param eventHubName The Event Hub name.
   */
  constructor(
    partitionManager: PartitionManager,
    eventHubClient: EventHubClient,
    consumerGroupName: string,
    ownerId: string,
    partitionProcessorFactory: PartitionProcessorFactory,
    pumpManager: PumpManager,
    options?: EventProcessorOptions
  ) {
    if (!options) options = {};

    this._partitionManager = partitionManager;
    this._eventHubClient = eventHubClient;
    this._consumerGroupName = consumerGroupName;
    this._ownerId = ownerId;
    this._partitionProcessorFactory = partitionProcessorFactory;
    this._pumpManager = pumpManager;
    this._processorOptions = options;
  }

  private _findPartitionToSteal(ownerPartitionMap: Map<string, PartitionOwnership[]>): string {
    let maxList: PartitionOwnership[] = [];
    let maxPartitionsOwnedByAnyEventProcessor = Number.MIN_VALUE;
    for (const ownershipList of ownerPartitionMap.values()) {
      if (ownershipList.length > maxPartitionsOwnedByAnyEventProcessor) {
        maxPartitionsOwnedByAnyEventProcessor = ownershipList.length;
        maxList = ownershipList;
      }
    }
    return maxList[Math.floor(Math.random() * maxList.length)].partitionId;
  }

  private _createPartitionOwnershipRequest(
    partitionOwnershipMap: Map<string, PartitionOwnership>,
    partitionIdToClaim: string
  ): PartitionOwnership {
    const previousPartitionOwnership = partitionOwnershipMap.get(partitionIdToClaim);
    const partitionOwnership: PartitionOwnership = {
      ownerId: this._ownerId,
      partitionId: partitionIdToClaim,
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
    const ownershipRequest = this._createPartitionOwnershipRequest(
      partitionOwnershipMap,
      partitionIdToClaim
    );
    try {
      await this._partitionManager.claimOwnership([ownershipRequest]);
      const partitionContext: PartitionContext = {
        consumerGroupName: this._consumerGroupName,
        eventHubName: this._eventHubClient.eventHubName,
        partitionId: ownershipRequest.partitionId
      };

      const checkpointManager = new CheckpointManager(
        partitionContext,
        this._partitionManager,
        this._ownerId
      );

      log.eventProcessor(
        `[${this._ownerId}] [${partitionIdToClaim}] Calling user-provided PartitionProcessorFactory.`
      );
      const partitionProcessor = this._partitionProcessorFactory(
        partitionContext,
        checkpointManager
      );

      const eventPosition = ownershipRequest.sequenceNumber
        ? EventPosition.fromSequenceNumber(ownershipRequest.sequenceNumber)
        : this._processorOptions.initialEventPosition || EventPosition.earliest();

      await this._pumpManager.createPump(
        this._eventHubClient,
        partitionContext,
        eventPosition,
        partitionProcessor
      );
      log.eventProcessor(`[${this._ownerId}] PartitionPump created successfully.`);
    } catch (err) {
      log.error(
        `[${this._ownerId}] Failed to claim ownership of partition ${ownershipRequest.partitionId}`
      );
    }
  }

  private _shouldOwnMorePartitions(
    minPartitionsPerEventProcessor: number,
    ownerPartitionMap: Map<string, PartitionOwnership[]>
  ): boolean {
    let numberOfPartitionsOwned = 0;
    const ownershipList = ownerPartitionMap.get(this._ownerId);
    if (ownershipList) {
      numberOfPartitionsOwned = ownershipList.length;
    }
    let leastPartitionsOwnedByAnyEventProcessor = Number.MAX_VALUE;
    for (const ownershipList of ownerPartitionMap.values()) {
      if (ownershipList.length < leastPartitionsOwnedByAnyEventProcessor) {
        leastPartitionsOwnedByAnyEventProcessor = ownershipList.length;
      }
    }
    if (
      numberOfPartitionsOwned > minPartitionsPerEventProcessor ||
      numberOfPartitionsOwned > leastPartitionsOwnedByAnyEventProcessor
    ) {
      return false;
    }

    return true;
  }

  private _isLoadBalanced(
    minPartitionsPerEventProcessor: number,
    numberOfEventProcessorsWithAdditionalPartition: number,
    ownerPartitionMap: Map<string, PartitionOwnership[]>
  ): boolean {
    let matchCount = 0;
    for (const ownershipList of ownerPartitionMap.values()) {
      if (
        ownershipList.length > minPartitionsPerEventProcessor ||
        ownershipList.length < minPartitionsPerEventProcessor + 1
      ) {
        matchCount++;
      }
    }
    if (matchCount === ownerPartitionMap.size) {
      let count = 0;
      for (const ownershipList of ownerPartitionMap.values()) {
        if (ownershipList.length === minPartitionsPerEventProcessor + 1) {
          count++;
        }
      }
      return count === numberOfEventProcessorsWithAdditionalPartition;
    }
    return false;
  }

  private _removeInactivePartitionOwnerships(
    partitionOwnershipMap: Map<string, PartitionOwnership>
  ): Map<string, PartitionOwnership> {
    const activePartitionOwnershipMap: Map<string, PartitionOwnership> = new Map();
    partitionOwnershipMap.forEach((value: PartitionOwnership, key: string) => {
      var date = new Date();
      var currentTimeInMS = date.getMilliseconds();
      if (value.lastModifiedTimeInMS && currentTimeInMS - value.lastModifiedTimeInMS < 5000) {
        activePartitionOwnershipMap.set(key, value);
      }
    });

    return activePartitionOwnershipMap;
  }

  private async _loadBalance(
    partitionOwnershipMap: Map<string, PartitionOwnership>,
    partitionIds: string[]
  ): Promise<void> {
    /*
     * Remove all partitions ownerships that have not be modified for a long time. This means that the previous
     * event processor that owned the partition is probably down and the partition is now eligible to be
     * claimed by other event processors.
     */
    const activePartitionOwnershipMap = this._removeInactivePartitionOwnerships(
      partitionOwnershipMap
    );
    if (Object.keys(activePartitionOwnershipMap).length === 0) {
      /*
       * If the active partition ownership map is empty, this is the first time an event processor is
       * running or all Event Processors are down for this Event Hub, consumer group combination. All
       * partitions in this Event Hub are available to claim. Choose a random partition to claim ownership.
       */
      await this._claimOwnership(
        partitionOwnershipMap,
        partitionIds[Math.floor(Math.random() * partitionIds.length)]
      );
      return;
    }

    /*
     * Create a map of owner id and a list of partitions it owns
     */
    const ownerPartitionMap: Map<string, PartitionOwnership[]> = new Map();
    for (const activePartitionOwnership of activePartitionOwnershipMap.values()) {
      if (!ownerPartitionMap.has(activePartitionOwnership.ownerId)) {
        const partitionOwnershipArr = [];
        partitionOwnershipArr.push(activePartitionOwnership);
        ownerPartitionMap.set(activePartitionOwnership.ownerId, partitionOwnershipArr!);
      } else {
        const partitionOwnershipArr = ownerPartitionMap.get(activePartitionOwnership.ownerId);
        partitionOwnershipArr!.push(activePartitionOwnership);
        ownerPartitionMap.set(activePartitionOwnership.ownerId, partitionOwnershipArr!);
      }
    }
    // add the current event processor to the map if it doesn't exist
    if (!ownerPartitionMap.has(this._ownerId)) {
      ownerPartitionMap.set(this._ownerId, []);
    }
    /*
     * Find the minimum number of partitions every event processor should own when the load is
     * evenly distributed.
     */
    const minPartitionsPerEventProcessor = partitionIds.length / ownerPartitionMap.size;
    /*
     * Due to the number of partitions in Event Hub and number of event processors running,
     * a few Event Processors may own 1 additional partition than the minimum. Calculate
     * the number of event processors that can own additional partition.
     */
    const numberOfEventProcessorsWithAdditionalPartition =
      partitionIds.length % ownerPartitionMap.size;

    if (
      this._isLoadBalanced(
        minPartitionsPerEventProcessor,
        numberOfEventProcessorsWithAdditionalPartition,
        ownerPartitionMap
      )
    ) {
      return;
    }

    if (!this._shouldOwnMorePartitions(minPartitionsPerEventProcessor, ownerPartitionMap)) {
      // This event processor already has enough partitions and shouldn't own more yet
      return;
    }
    // If we have reached this stage, this event processor has to claim/steal ownership of at least 1 more partition

    /*
     * If some partitions are unclaimed, this could be because an event processor is down and
     * it's partitions are now available for others to own or because event processors are just
     * starting up and gradually claiming partitions to own or new partitions were added to Event Hub.
     * Find any partition that is not actively owned and claim it.
     *
     * OR
     *
     * Find a partition to steal from another event processor. Pick the event processor that owns the highest
     * number of partitions.
     */
    let partitionToClaim: string | undefined;
    for (const partitionId of partitionIds) {
      if (!activePartitionOwnershipMap.has(partitionId)) {
        partitionToClaim = partitionId;
      }
    }
    if (!partitionToClaim) {
      partitionToClaim = this._findPartitionToSteal(ownerPartitionMap);
    }

    return await this._claimOwnership(partitionOwnershipMap, partitionToClaim);
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
      log.error(`[${this._ownerId}] An error occured when retrieving partition ids: ${err}`);
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
  async _runLoop(abortSignal: AbortSignalLike): Promise<void> {
    // periodically check if there is any partition not being processed and process it
    const waitIntervalInMs = 10000;
    while (!abortSignal.aborted) {
      try {
        // check if the loop has been cancelled
        if (abortSignal.aborted) {
          return;
        }

        const partitionOwnershipMap: Map<string, PartitionOwnership> = new Map();
        const partitionOwnership = await this._partitionManager.listOwnership(
          this._eventHubClient.eventHubName,
          this._consumerGroupName
        );
        for (const ownership of partitionOwnership) {
          partitionOwnershipMap.set(ownership.partitionId, ownership);
        }
        // get a list of partition ids that are not being processed by this EventProcessor
        const partitionsToAdd = await this._getInactivePartitions();
        //   const partitionsToAdd = await this._eventHubClient.getPartitionIds();

        if (partitionsToAdd.length > 0) {
          await this._loadBalance(partitionOwnershipMap, partitionsToAdd);
        }

        // sleep
        log.eventProcessor(
          `[${this._ownerId}] Pausing the EventProcessor loop for ${waitIntervalInMs} ms.`
        );
        await delay(waitIntervalInMs, abortSignal);
      } catch (err) {
        log.error(`[${this._ownerId}] An error occured within the EventProcessor loop: ${err}`);
      }
    }
  }
}
