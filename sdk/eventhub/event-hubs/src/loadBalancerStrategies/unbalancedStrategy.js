// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * The UnbalancedLoadBalancingStrategy does no actual load balancing.
 * It is intended to be used when you want to avoid load balancing
 * and consume a set of partitions.
 * @internal
 */
export class UnbalancedLoadBalancingStrategy {
    /**
     * Implements load balancing by taking into account current ownership and
     * the full set of partitions in the Event Hub.
     * @param _ourOwnerId - The id we should assume is _our_ id when checking for ownership.
     * @param _claimedPartitionOwnershipMap - The current claimed ownerships for partitions.
     * @param partitionIds - Partitions to assign owners to.
     * @returns Partition ids to claim.
     */
    getPartitionsToClaim(_ourOwnerId, _claimedPartitionOwnershipMap, partitionIds) {
        return partitionIds;
    }
}
//# sourceMappingURL=unbalancedStrategy.js.map