// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { LoadBalancingStrategy } from "./loadBalancingStrategy.js";
import { PartitionOwnership } from "../eventProcessor.js";

/**
 * The UnbalancedLoadBalancingStrategy does no actual load balancing.
 * It is intended to be used when you want to avoid load balancing
 * and consume a set of partitions.
 * @internal
 */
export class UnbalancedLoadBalancingStrategy implements LoadBalancingStrategy {
  /**
   * Implements load balancing by taking into account current ownership and
   * the full set of partitions in the Event Hub.
   * @param _ourOwnerId - The id we should assume is _our_ id when checking for ownership.
   * @param _claimedPartitionOwnershipMap - The current claimed ownerships for partitions.
   * @param partitionIds - Partitions to assign owners to.
   * @returns Partition ids to claim.
   */
  public getPartitionsToClaim(
    _ourOwnerId: string,
    _claimedPartitionOwnershipMap: Map<string, PartitionOwnership>,
    partitionIds: string[],
  ): string[] {
    return partitionIds;
  }
}
