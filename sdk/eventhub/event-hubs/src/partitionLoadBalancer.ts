// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { PartitionOwnership } from "./eventProcessor";
import { logger } from "./log";

/**
 * Implements a load balancing algorithm for determining which consumers
 * own which partitions.
 * @ignore
 * @internal
 */
export interface PartitionLoadBalancer {
  /**
   * Implements load balancing by taking into account current ownership and
   * the new set of partitions to add.
   * @param ownerId The id we should assume is _our_ id when checking for ownership.
   * @param partitionOwnershipMap The current ownerships for partitions.
   * @param partitionsToAdd New partitions to assign owners to.
   * @returns Partition ids to claim.
   */
  loadBalance(
    ownerId: string,
    partitionOwnershipMap: Map<string, PartitionOwnership>,
    partitionsToAdd: string[]
  ): string[];
}

/**
 * This class does no load balancing - it's intended to be used when
 * you want to avoid load balancing and consume a set of partitions (or all
 * available partitions)
 * @internal
 * @ignore
 */
export class GreedyPartitionLoadBalancer implements PartitionLoadBalancer {
  private partitionsToClaim?: Set<string>;

  /**
   * @param partitionIds An optional set of partition IDs. undefined means all partitions.
   */
  constructor(partitionIds?: string[]) {
    logger.verbose(
      `GreedyPartitionLoadBalancer created. Watching ${
        partitionIds ? "(" + partitionIds.join(",") + ")" : "all"
      }.`
    );
    this.partitionsToClaim = partitionIds && new Set(partitionIds);
  }

  loadBalance(
    ownerId: string,
    partitionOwnershipMap: Map<string, PartitionOwnership>,
    partitionsToAdd: string[]
  ): string[] {
    let potential: string[] = partitionsToAdd;

    if (this.partitionsToClaim) {
      const partitionsToClaim = this.partitionsToClaim;
      potential = partitionsToAdd.filter((part) => partitionsToClaim.has(part));
    }

    return potential;
  }
}

/**
 * This class is responsible for balancing the load of processing events from all partitions of an Event Hub by
 * distributing the number of partitions uniformly among all the active EventProcessors.
 *
 * This load balancer will retrieve partition ownership details from the CheckpointStore to find the number of
 * active EventProcessor. It uses the last modified time to decide if an EventProcessor is active. If a
 * partition ownership entry has not be updated for a specified duration of time, the owner of that partition is
 * considered inactive and the partition is available for other EventProcessors to own.
 * @class PartitionLoadBalancer
 * @internal
 * @ignore
 */
export class FairPartitionLoadBalancer implements PartitionLoadBalancer {
  private _inactiveTimeLimitInMS: number;

  /**
   * Creates an instance of PartitionBasedLoadBalancer.
   *
   * @param ownerId The identifier of the Event Processor that owns this load balancer.
   * @param inactiveTimeLimitInMS The time to wait for an update on an ownership record before
   * assuming the owner of the partition is inactive.
   * */
  constructor(inactiveTimeLimitInMS: number) {
    logger.verbose(
      `FairPartitionLoadBalancer created inactive time limit: ${inactiveTimeLimitInMS}ms`
    );
    this._inactiveTimeLimitInMS = inactiveTimeLimitInMS;
  }

  /*
   * Find the event processor that owns the maximum number of partitions and steal a random partition
   * from it.
   */
  private _findPartitionToSteal(
    ourOwnerId: string,
    ownerPartitionMap: Map<string, PartitionOwnership[]>
  ): string {
    let maxList: PartitionOwnership[] = [];
    let maxPartitionsOwnedByAnyEventProcessor = Number.MIN_VALUE;
    let ownerId;
    ownerPartitionMap.forEach((ownershipList: PartitionOwnership[], ownerId: string) => {
      if (ownershipList.length > maxPartitionsOwnedByAnyEventProcessor) {
        maxPartitionsOwnedByAnyEventProcessor = ownershipList.length;
        maxList = ownershipList;
        ownerId = ownerId;
      }
    });
    logger.verbose(
      `[${ourOwnerId}] Owner id ${ownerId} owns ${maxList.length} partitions, stealing a partition from it.`
    );
    return maxList[Math.floor(Math.random() * maxList.length)].partitionId;
  }

  /**
   * Whether we should attempt to claim more partitions for this particular processor.
   *
   * @param minRequired The minimum required number of partitions.
   * @param numEventProcessorsWithAdditionalPartition The current number of processors that have an additional partition.
   * @param numPartitionsOwnedByUs The number of partitions we currently own.
   * @param processorCounts Processors, grouped by criteria.
   */
  private _shouldOwnMorePartitions(
    minRequired: number,
    numEventProcessorsWithAdditionalPartition: number,
    numPartitionsOwnedByUs: number,
    processorCounts: ProcessorCounts
  ): boolean {
    let actualRequired = minRequired;

    if (
      numEventProcessorsWithAdditionalPartition > 0 &&
      // eventually the `haveTooManyPartitions` will get decay into `haveAdditionalPartition`
      // processors as partitions are balanced to consumers that aren't at par. We can
      // consider them to be `haveAdditionalPartition` processors for our purposes.
      processorCounts.haveAdditionalPartition + processorCounts.haveTooManyPartitions <
        numEventProcessorsWithAdditionalPartition
    ) {
      // overall we don't have enough processors that are taking on an additional partition
      // so we should attempt to.
      actualRequired = minRequired + 1;
    }

    return numPartitionsOwnedByUs < actualRequired;
  }

  /**
   * Validates that we are currently in a balanced state - all processors own the
   * minimum required number of partitions (and additional partitions, if the # of partitions
   * is not evenly divisible by the # of processors).
   *
   * @param requiredNumberOfEventProcessorsWithAdditionalPartition The # of processors that process an additional partition, in addition to the required minimum.
   * @param totalExpectedProcessors The total # of processors we expect.
   * @param processorCounts Processors, grouped by criteria.
   */
  private _isLoadBalanced(
    requiredNumberOfEventProcessorsWithAdditionalPartition: number,
    totalExpectedProcessors: number,
    processorCounts: ProcessorCounts
  ): boolean {
    return (
      processorCounts.haveAdditionalPartition ===
        requiredNumberOfEventProcessorsWithAdditionalPartition &&
      processorCounts.haveRequiredPartitions + processorCounts.haveAdditionalPartition ===
        totalExpectedProcessors
    );
  }

  /**
   * Counts the processors and tallying them by type.
   *
   * To be in balance we need to make sure that each processor is only consuming
   * their fair share.
   *
   * When the partitions are divvied up we will sometimes end up with some processors
   * that will have 1 more partition than others. This can happen if the number of
   * partitions is not evenly divisible by the number of processors.
   *
   * So this function largely exists to support _isLoadBalanced() and
   * _shouldOwnMorePartitions(), both of which depend on knowing if our current list
   * of processors is actually in the proper state.
   *
   * @param numPartitionsRequired The number of required partitions per processor.
   * @param ownerPartitionMap The current ownerships for partitions.
   */
  private _getProcessorCounts(
    numPartitionsRequired: number,
    ownerPartitionMap: Map<string, PartitionOwnership[]>
  ): ProcessorCounts {
    const counts: ProcessorCounts = {
      haveRequiredPartitions: 0,
      haveAdditionalPartition: 0,
      haveTooManyPartitions: 0
    };

    for (const ownershipList of ownerPartitionMap.values()) {
      const numberOfPartitions = ownershipList.length;

      // there are basically three kinds of partition counts
      // for a processor:

      // 1. Has _exactly_ the required number of partitions
      if (numberOfPartitions === numPartitionsRequired) {
        counts.haveRequiredPartitions++;
      }

      // 2. Has the required number plus one extra (correct in cases)
      // where the # of partitions is not evenly divisible by the
      // number of processors.
      if (numberOfPartitions === numPartitionsRequired + 1) {
        counts.haveAdditionalPartition++;
      }

      // 3. has more than the possible # of partitions required
      if (numberOfPartitions > numPartitionsRequired + 1) {
        counts.haveTooManyPartitions++;
      }
    }

    return counts;
  }

  /*
   * This method will create a new map of partition id and PartitionOwnership containing only those partitions
   * that are actively owned. All entries in the original map returned by CheckpointStore that haven't been
   * modified for a duration of time greater than the allowed inactivity time limit are assumed to be owned by
   * dead event processors. These will not be included in the map returned by this method.
   */
  private _removeInactivePartitionOwnerships(
    partitionOwnershipMap: Map<string, PartitionOwnership>
  ): Map<string, PartitionOwnership> {
    const activePartitionOwnershipMap: Map<string, PartitionOwnership> = new Map();
    partitionOwnershipMap.forEach((partitionOwnership: PartitionOwnership, partitionId: string) => {
      var date = new Date();
      if (
        partitionOwnership.lastModifiedTimeInMs &&
        date.getTime() - partitionOwnership.lastModifiedTimeInMs < this._inactiveTimeLimitInMS &&
        partitionOwnership.ownerId
      ) {
        activePartitionOwnershipMap.set(partitionId, partitionOwnership);
      }
    });

    return activePartitionOwnershipMap;
  }

  /*
   * This method works with the given partition ownership details and Event Hub partitions to evaluate whether the
   * current Event Processor should take on the responsibility of processing more partitions.
   */
  loadBalance(
    ourOwnerId: string,
    partitionOwnershipMap: Map<string, PartitionOwnership>,
    partitionsToAdd: string[]
  ): string[] {
    //  Remove all partitions ownership that have not been modified within the configured period of time. This means that the previous
    //  event processor that owned the partition is probably down and the partition is now eligible to be
    //  claimed by other event processors.
    const activePartitionOwnershipMap = this._removeInactivePartitionOwnerships(
      partitionOwnershipMap
    );
    logger.verbose(
      `[${ourOwnerId}] Number of active ownership records: ${activePartitionOwnershipMap.size}.`
    );
    if (activePartitionOwnershipMap.size === 0) {
      // If the active partition ownership map is empty, this is the first time an event processor is
      // running or all Event Processors are down for this Event Hub, consumer group combination. All
      // partitions in this Event Hub are available to claim. Choose a random partition to claim ownership.
      return [partitionsToAdd[Math.floor(Math.random() * partitionsToAdd.length)]];
    }

    // Create a map of owner id and a list of partitions it owns
    const ownerPartitionMap: Map<string, PartitionOwnership[]> = new Map();
    for (const activePartitionOwnership of activePartitionOwnershipMap.values()) {
      const partitionOwnershipArray = ownerPartitionMap.get(activePartitionOwnership.ownerId) || [];
      partitionOwnershipArray.push(activePartitionOwnership);
      ownerPartitionMap.set(activePartitionOwnership.ownerId, partitionOwnershipArray);
    }

    // add the current event processor to the map if it doesn't exist
    if (!ownerPartitionMap.has(ourOwnerId)) {
      ownerPartitionMap.set(ourOwnerId, []);
    }
    logger.info(`[${ourOwnerId}] Number of active event processors: ${ownerPartitionMap.size}.`);

    // Include any partitions this entity already owns in the list of partitions to claim.
    const partitionsToClaim = (ownerPartitionMap.get(ourOwnerId) || []).map(
      (ownership) => ownership.partitionId
    );

    // Find the minimum number of partitions every event processor should own when the load is
    // evenly distributed.
    const minPartitionsPerEventProcessor = Math.floor(
      partitionsToAdd.length / ownerPartitionMap.size
    );
    // If the number of partitions in Event Hub is not evenly divisible by number of active event processors,
    // a few Event Processors may own 1 additional partition than the minimum when the load is balanced. Calculate
    // the number of event processors that can own an additional partition.
    const requiredNumberOfEventProcessorsWithAdditionalPartition =
      partitionsToAdd.length % ownerPartitionMap.size;

    logger.verbose(
      `[${ourOwnerId}] Expected minimum number of partitions per event processor: ${minPartitionsPerEventProcessor}, 
      expected number of event processors with additional partition: ${requiredNumberOfEventProcessorsWithAdditionalPartition}.`
    );

    const processorCounts = this._getProcessorCounts(
      minPartitionsPerEventProcessor,
      ownerPartitionMap
    );

    if (
      this._isLoadBalanced(
        requiredNumberOfEventProcessorsWithAdditionalPartition,
        ownerPartitionMap.size,
        processorCounts
      )
    ) {
      logger.info(`[${ourOwnerId}] Load is balanced.`);
      // If the partitions are evenly distributed among all active event processors, no change required.
      return partitionsToClaim;
    }

    if (
      !this._shouldOwnMorePartitions(
        minPartitionsPerEventProcessor,
        requiredNumberOfEventProcessorsWithAdditionalPartition,
        ownerPartitionMap.get(ourOwnerId)!.length,
        processorCounts
      )
    ) {
      logger.verbose(
        `[${ourOwnerId}] This event processor owns ${
          ownerPartitionMap.get(ourOwnerId)!.length
        } partitions and shouldn't own more.`
      );
      // This event processor already has enough partitions and shouldn't own more yet
      return partitionsToClaim;
    }
    logger.info(
      `[${ourOwnerId}] Load is unbalanced and this event processor should own more partitions.`
    );
    // If we have reached this stage, this event processor has to claim/steal ownership of at least 1 more partition

    //  If some partitions are unclaimed, this could be because an event processor is down and
    //  it's partitions are now available for others to own or because event processors are just
    //  starting up and gradually claiming partitions to own or new partitions were added to Event Hub.
    //  Find any partition that is not actively owned and claim it.

    //   OR

    //  Find a partition to steal from another event processor. Pick the event processor that owns the highest
    //  number of partitions.
    const unOwnedPartitionIds = [];

    for (const partitionId of partitionsToAdd) {
      if (!activePartitionOwnershipMap.has(partitionId)) {
        unOwnedPartitionIds.push(partitionId);
      }
    }
    if (unOwnedPartitionIds.length === 0) {
      logger.info(
        `[${ourOwnerId}] No unclaimed partitions, stealing from another event processor.`
      );
      partitionsToClaim.push(this._findPartitionToSteal(ourOwnerId, ownerPartitionMap));
    } else {
      partitionsToClaim.push(
        unOwnedPartitionIds[Math.floor(Math.random() * unOwnedPartitionIds.length)]
      );
    }

    return partitionsToClaim;
  }
}

/**
 * Counts of the processors that currently own partitions.
 */
interface ProcessorCounts {
  /**
   * The # of processors that only own the required # of
   * partitions.
   */
  haveRequiredPartitions: number;
  /**
   * The # of processors that currently own the required #
   * of partitions + 1 additional (ie, handling the case where
   * the number of partitions is not evenly divisible by the # of
   * processors).
   */
  haveAdditionalPartition: number;
  /**
   * Processors which have more than the required or even required + 1
   * number of partitions. These will eventually be downsized by other
   * processors as they acquire their required number of partitions.
   */
  haveTooManyPartitions: number;
}
