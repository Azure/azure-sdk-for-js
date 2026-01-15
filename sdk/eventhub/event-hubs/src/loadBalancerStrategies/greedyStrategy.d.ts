import type { LoadBalancingStrategy } from "./loadBalancingStrategy.js";
import type { PartitionOwnership } from "../eventProcessor.js";
/**
 * @internal
 */
export declare class GreedyLoadBalancingStrategy implements LoadBalancingStrategy {
    private readonly _partitionOwnershipExpirationIntervalInMs;
    /**
     * Creates an instance of GreedyLoadBalancingStrategy.
     *
     * @param _partitionOwnershipExpirationIntervalInMs - The length of time a partition claim is valid.
     */
    constructor(_partitionOwnershipExpirationIntervalInMs: number);
    /**
     * Implements load balancing by taking into account current ownership and
     * the new set of partitions to add.
     * @param ourOwnerId - The id we should assume is _our_ id when checking for ownership.
     * @param claimedPartitionOwnershipMap - The current claimed ownerships for partitions.
     * @param partitionIds - Partitions to assign owners to.
     * @returns Partition ids to claim.
     */
    getPartitionsToClaim(ourOwnerId: string, claimedPartitionOwnershipMap: Map<string, PartitionOwnership>, partitionIds: string[]): string[];
}
//# sourceMappingURL=greedyStrategy.d.ts.map