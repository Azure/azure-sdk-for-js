// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PartitionOwnership } from "../eventProcessor";
import { LoadBalancerStrategy, identifyClaimablePartitions } from "./loadBalancerStrategy";

/**
 * @internal
 * @ignore
 */
export class GreedyLoadBalancerStrategy implements LoadBalancerStrategy {
  /**
   * Creates an instance of BalancedLoadBalancerStrategy.
   *
   * @param _partitionOwnershipExpirationIntervalInMs The length of time a partition claim is valid.
   */
  constructor(private readonly _partitionOwnershipExpirationIntervalInMs: number) {}

  /**
   * Implements load balancing by taking into account current ownership and
   * the new set of partitions to add.
   * @param ourOwnerId The id we should assume is _our_ id when checking for ownership.
   * @param claimedPartitionOwnershipMap The current claimed ownerships for partitions.
   * @param partitionIds Partitions to assign owners to.
   * @returns Partition ids to claim.
   */
  public identifyPartitionsToClaim(
    ourOwnerId: string,
    claimedPartitionOwnershipMap: Map<string, PartitionOwnership>,
    partitionIds: string[]
  ): string[] {
    return identifyClaimablePartitions(
      ourOwnerId,
      claimedPartitionOwnershipMap,
      partitionIds,
      this._partitionOwnershipExpirationIntervalInMs
    );
  }
}
