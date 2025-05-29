"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreedyLoadBalancingStrategy = void 0;
const loadBalancingStrategy_js_1 = require("./loadBalancingStrategy.js");
/**
 * @internal
 */
class GreedyLoadBalancingStrategy {
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
        return (0, loadBalancingStrategy_js_1.listAvailablePartitions)(ourOwnerId, claimedPartitionOwnershipMap, partitionIds, this._partitionOwnershipExpirationIntervalInMs);
    }
}
exports.GreedyLoadBalancingStrategy = GreedyLoadBalancingStrategy;
//# sourceMappingURL=greedyStrategy.js.map