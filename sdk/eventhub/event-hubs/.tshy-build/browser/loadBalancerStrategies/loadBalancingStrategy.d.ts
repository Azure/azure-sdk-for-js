import type { PartitionOwnership } from "../eventProcessor.js";
/**
 * Determines which partitions to claim as part of load balancing.
 * @internal
 */
export interface LoadBalancingStrategy {
    /**
     * Implements load balancing by taking into account current ownership and
     * the full set of partitions in the Event Hub.
     * @param ourOwnerId - The id we should assume is _our_ id when checking for ownership.
     * @param claimedPartitionOwnershipMap - The current claimed ownerships for partitions.
     * @param partitionIds - Partitions to assign owners to.
     * @returns Partition ids to claim.
     */
    getPartitionsToClaim(ownerId: string, claimedPartitionOwnershipMap: Map<string, PartitionOwnership>, partitionIds: string[]): string[];
}
/**
 * Identifies all of the partitions that can be claimed by the specified owner for
 * that owner to reach a balanced state.
 * @param OwnerId - The id we should assume is _our_ id when checking for ownership.
 * @param claimedPartitionOwnershipMap - The current claimed ownerships for partitions.
 * @param partitionIds - Partitions to assign owners to.
 * @param expirationIntervalInMs - The length of time a partition claim is valid.
 * @returns Partition ids that may be claimed.
 * @internal
 */
export declare function listAvailablePartitions(ownerId: string, claimedPartitionOwnershipMap: Map<string, PartitionOwnership>, partitionIds: string[], expirationIntervalInMs: number): string[];
//# sourceMappingURL=loadBalancingStrategy.d.ts.map