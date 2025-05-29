"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalancedLoadBalancingStrategy = void 0;
const loadBalancingStrategy_js_1 = require("./loadBalancingStrategy.js");
/**
 * The BalancedLoadBalancerStrategy is meant to be used when the user
 * wants to reach a load balanced state with less partition 'thrashing'.
 *
 * Partition thrashing - where a partition changes owners - is minimized
 * by only returning a single partition to claim at a time.
 * This minimizes the number of times a partition should need to be stolen.
 * @internal
 */
class BalancedLoadBalancingStrategy {
    /**
     * Creates an instance of BalancedLoadBalancingStrategy.
     *
     * @param _partitionOwnershipExpirationIntervalInMs - The length of time a partition claim is valid.
     */
    constructor(_partitionOwnershipExpirationIntervalInMs) {
        this._partitionOwnershipExpirationIntervalInMs = _partitionOwnershipExpirationIntervalInMs;
    }
    /**
     * Implements load balancing by taking into account current ownership and
     * the full set of partitions in the Event Hub.
     * @param ourOwnerId - The id we should assume is _our_ id when checking for ownership.
     * @param claimedPartitionOwnershipMap - The current claimed ownerships for partitions.
     * @param partitionIds - Partitions to assign owners to.
     * @returns Partition ids to claim.
     */
    getPartitionsToClaim(ourOwnerId, claimedPartitionOwnershipMap, partitionIds) {
        const claimablePartitions = (0, loadBalancingStrategy_js_1.listAvailablePartitions)(ourOwnerId, claimedPartitionOwnershipMap, partitionIds, this._partitionOwnershipExpirationIntervalInMs);
        if (!claimablePartitions.length) {
            return [];
        }
        const randomIndex = Math.floor(Math.random() * claimablePartitions.length);
        return [claimablePartitions[randomIndex]];
    }
}
exports.BalancedLoadBalancingStrategy = BalancedLoadBalancingStrategy;
//# sourceMappingURL=balancedStrategy.js.map