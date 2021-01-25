// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PartitionOwnership } from "../eventProcessor";
import { LoadBalancingStrategy, listAvailablePartitions } from "./loadBalancingStrategy";

/**
 * The BalancedLoadBalancerStrategy is meant to be used when the user
 * wants to reach a load balanced state with less partition 'thrashing'.
 *
 * Partition thrashing - where a partition changes owners - is minimized
 * by only returning a single partition to claim at a time.
 * This minimizes the number of times a partition should need to be stolen.
 * @internal
 * @ignore
 */
export class BalancedLoadBalancingStrategy implements LoadBalancingStrategy {
  /**
   * Creates an instance of BalancedLoadBalancingStrategy.
   *
   * @param _partitionOwnershipExpirationIntervalInMs The length of time a partition claim is valid.
   */
  constructor(private readonly _partitionOwnershipExpirationIntervalInMs: number) {}

  /**
   * Implements load balancing by taking into account current ownership and
   * the full set of partitions in the Event Hub.
   * @param ourOwnerId The id we should assume is _our_ id when checking for ownership.
   * @param claimedPartitionOwnershipMap The current claimed ownerships for partitions.
   * @param partitionIds Partitions to assign owners to.
   * @returns Partition ids to claim.
   */
  public getPartitionsToCliam(
    ourOwnerId: string,
    claimedPartitionOwnershipMap: Map<string, PartitionOwnership>,
    partitionIds: string[]
  ): string[] {
    const claimablePartitions = listAvailablePartitions(
      ourOwnerId,
      claimedPartitionOwnershipMap,
      partitionIds,
      this._partitionOwnershipExpirationIntervalInMs
    );

    if (!claimablePartitions.length) {
      return [];
    }

    const randomIndex = Math.floor(Math.random() * claimablePartitions.length);
    return [claimablePartitions[randomIndex]];
  }
}
