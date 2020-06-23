// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PartitionOwnership } from "../eventProcessor";
import { LoadBalancingStrategy } from "./loadBalancingStrategy";

/**
 * @internal
 * @ignore
 */
export class UnbalancedLoadBalancingStrategy implements LoadBalancingStrategy {
  /**
   * Creates an instance of UnbalancedLoadBalancingStrategy.
   */
  constructor() {}

  /**
   * Implements load balancing by taking into account current ownership and
   * the new set of partitions to add.
   * @param ourOwnerId The id we should assume is _our_ id when checking for ownership.
   * @param claimedPartitionOwnershipMap The current claimed ownerships for partitions.
   * @param partitionIds Partitions to assign owners to.
   * @returns Partition ids to claim.
   */
  public identifyPartitionsToClaim(
    _ourOwnerId: string,
    _claimedPartitionOwnershipMap: Map<string, PartitionOwnership>,
    partitionIds: string[]
  ): string[] {
    return partitionIds;
  }
}
