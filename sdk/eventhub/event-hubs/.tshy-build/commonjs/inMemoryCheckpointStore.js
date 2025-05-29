"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryCheckpointStore = void 0;
const error_js_1 = require("./util/error.js");
const utils_js_1 = require("./util/utils.js");
/**
 * The `EventProcessor` relies on a `CheckpointStore` to store checkpoints and handle partition
 * ownerships. `InMemoryCheckpointStore` is simple partition manager that stores checkpoints and
 * partition ownerships in memory of your program.
 *
 * You can use the `InMemoryCheckpointStore` to get started with using the `EventProcessor`.
 * But in production, you should choose an implementation of the `CheckpointStore` interface that will
 * store the checkpoints and partition ownerships to a durable store instead.
 *
 * @internal
 */
class InMemoryCheckpointStore {
    constructor() {
        this._partitionOwnershipMap = new Map();
        this._committedCheckpoints = new Map();
    }
    /**
     * Get the list of all existing partition ownership from the underlying data store. Could return empty
     * results if there are is no existing ownership information.
     *
     * @param fullyQualifiedNamespace - The fully qualified Event Hubs namespace. This is likely to be similar to
     * <yournamespace>.servicebus.windows.net.
     * @param eventHubName - The event hub name.
     * @param consumerGroup - The consumer group name.
     * @returns Partition ownership details of all the partitions that have/had an owner..
     */
    async listOwnership(_fullyQualifiedNamespace, _eventHubName, _consumerGroup) {
        const ownerships = [];
        for (const value of this._partitionOwnershipMap.values()) {
            ownerships.push(Object.assign({}, value));
        }
        return ownerships;
    }
    /**
     * Claim ownership of a list of partitions. This will return the list of partitions that were owned
     * successfully.
     *
     * @param partitionOwnership - The list of partition ownership this instance is claiming to own.
     * @returns A list partitions this instance successfully claimed ownership.
     */
    async claimOwnership(partitionOwnership) {
        const claimedOwnerships = [];
        for (const ownership of partitionOwnership) {
            if (!this._partitionOwnershipMap.has(ownership.partitionId) ||
                this._partitionOwnershipMap.get(ownership.partitionId).etag === ownership.etag) {
                const date = new Date();
                const newOwnership = Object.assign(Object.assign({}, ownership), { etag: (0, utils_js_1.getRandomName)(), lastModifiedTimeInMs: date.getTime() });
                this._partitionOwnershipMap.set(newOwnership.partitionId, newOwnership);
                claimedOwnerships.push(newOwnership);
            }
        }
        return claimedOwnerships;
    }
    /**
     * Updates the checkpoint in the data store for a partition.
     *
     * @param checkpoint - The checkpoint.
     */
    async updateCheckpoint(checkpoint) {
        (0, error_js_1.throwTypeErrorIfParameterMissing)("", "updateCheckpoint", "sequenceNumber", checkpoint.sequenceNumber);
        (0, error_js_1.throwTypeErrorIfParameterMissing)("", "updateCheckpoint", "offset", checkpoint.offset);
        checkpoint = Object.assign({}, checkpoint);
        const partitionOwnership = this._partitionOwnershipMap.get(checkpoint.partitionId);
        if (partitionOwnership) {
            partitionOwnership.etag = (0, utils_js_1.getRandomName)();
            const key = `${checkpoint.fullyQualifiedNamespace}:${checkpoint.eventHubName}:${checkpoint.consumerGroup}`;
            let partitionMap = this._committedCheckpoints.get(key);
            if (partitionMap == null) {
                partitionMap = new Map();
                this._committedCheckpoints.set(key, partitionMap);
            }
            partitionMap.set(checkpoint.partitionId, checkpoint);
        }
    }
    async listCheckpoints(fullyQualifiedNamespace, eventHubName, consumerGroup) {
        const key = `${fullyQualifiedNamespace}:${eventHubName}:${consumerGroup}`;
        const partitionMap = this._committedCheckpoints.get(key);
        if (partitionMap == null) {
            return [];
        }
        const checkpoints = [];
        for (const value of partitionMap.values()) {
            checkpoints.push(Object.assign({}, value));
        }
        return checkpoints;
    }
}
exports.InMemoryCheckpointStore = InMemoryCheckpointStore;
//# sourceMappingURL=inMemoryCheckpointStore.js.map