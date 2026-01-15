import type { LoadBalancingStrategy } from "./loadBalancingStrategy.js";
import type { PartitionOwnership } from "../eventProcessor.js";
/**
 * The BalancedLoadBalancerStrategy is meant to be used when the user
 * wants to reach a load balanced state with less partition 'thrashing'.
 *
 * Partition thrashing - where a partition changes owners - is minimized
 * by only returning a single partition to claim at a time.
 * This minimizes the number of times a partition should need to be stolen.
 * @internal
 */
export declare class BalancedLoadBalancingStrategy implements LoadBalancingStrategy {
    private readonly _partitionOwnershipExpirationIntervalInMs;
    /**
     * Creates an instance of BalancedLoadBalancingStrategy.
     *
     * @param _partitionOwnershipExpirationIntervalInMs - The length of time a partition claim is valid.
     */
    constructor(_partitionOwnershipExpirationIntervalInMs: number);
    /**
     * Implements load balancing by taking into account current ownership and
     * the full set of partitions in the Event Hub.
     * @param ourOwnerId - The id we should assume is _our_ id when checking for ownership.
     * @param claimedPartitionOwnershipMap - The current claimed ownerships for partitions.
     * @param partitionIds - Partitions to assign owners to.
     * @returns Partition ids to claim.
     */
    getPartitionsToClaim(ourOwnerId: string, claimedPartitionOwnershipMap: Map<string, PartitionOwnership>, partitionIds: string[]): string[];
}
//# sourceMappingURL=balancedStrategy.d.ts.map