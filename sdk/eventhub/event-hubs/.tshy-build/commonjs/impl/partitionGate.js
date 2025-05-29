"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartitionGate = void 0;
/**
 * Used by EventHubConsumerClient to prevent accidentally spinning up multiple
 * subscriptions against the same set of partitions.
 *
 * This is needed now that EventHubConsumerClient only uses a single CheckpointStore
 * instance - otherwise users will see unpredictable results as their event processor
 * continually steals/overwrites checkpointing and ownership with itself.
 *
 * @internal
 */
class PartitionGate {
    constructor() {
        this._partitions = new Set();
    }
    /**
     * Adds a partition, throwing an Error if there is a conflict with partitions (including "all")
     * that are already added.
     *
     * @param partitionId - A partition ID or the constant "all"
     */
    add(partitionId) {
        if ((partitionId === "all" && this._partitions.size > 0) ||
            this._partitions.has(partitionId) ||
            this._partitions.has("all")) {
            throw new Error(`Partition already has a subscriber.`);
        }
        this._partitions.add(partitionId);
    }
    /**
     * Removes a partition
     *
     * @param partitionId - A partition ID or the constant "all"
     */
    remove(partitionId) {
        this._partitions.delete(partitionId);
    }
}
exports.PartitionGate = PartitionGate;
//# sourceMappingURL=partitionGate.js.map