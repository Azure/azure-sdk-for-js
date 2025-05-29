// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { listAvailablePartitions } from "./loadBalancingStrategy.js";
/**
 * @internal
 */
export class GreedyLoadBalancingStrategy {
    /**
     * Creates an instance of GreedyLoadBalancingStrategy.
     *
     * @param _partitionOwnershipExpirationIntervalInMs - The length of time a partition claim is valid.
     */
    constructor(_partitionOwnershipExpirationIntervalInMs) {
        this._partitionOwnershipExpirationIntervalInMs = _partitionOwnershipExpirationIntervalInMs;
    }
    /**
     * Implements load balancing by taking into account current ownership and
     * the new set of partitions to add.
     * @param ourOwnerId - The id we should assume is _our_ id when checking for ownership.
     * @param claimedPartitionOwnershipMap - The current claimed ownerships for partitions.
     * @param partitionIds - Partitions to assign owners to.
     * @returns Partition ids to claim.
     */
    getPartitionsToClaim(ourOwnerId, claimedPartitionOwnershipMap, partitionIds) {
        return listAvailablePartitions(ourOwnerId, claimedPartitionOwnershipMap, partitionIds, this._partitionOwnershipExpirationIntervalInMs);
    }
}
//# sourceMappingURL=greedyStrategy.js.map