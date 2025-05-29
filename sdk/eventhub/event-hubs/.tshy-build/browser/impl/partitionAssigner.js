// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isDefined } from "@azure/core-util";
import { mapPartitionKeyToId } from "./partitionKeyToIdMapper.js";
/**
 * @internal
 * Assigns a partition based on the partition ids it knows about and an optional partition id or partition key.
 */
export class PartitionAssigner {
    constructor() {
        this._partitions = [];
        this._lastRoundRobinPartitionIndex = -1;
    }
    /**
     * Set the partition ids that can be used when assigning a partition.
     * @param partitionIds - All valid partition ids.
     */
    setPartitionIds(partitionIds) {
        this._partitions = partitionIds;
    }
    /**
     * Returns a partitionId from the list of partition ids set via `setPartitionIds`.
     *
     * If a partitionId is specified, then that will be returned directly.
     * If a partitionKey is specified, then a partitionId will be calculated based on the partitionKey.
     * Specifying both partitionId and partitionKey results in an error.
     *
     * If neither partitionId nor partitionKey are specified, then a partitionId will be selected
     * based on a round-robin approach.
     */
    assignPartition({ partitionId, partitionKey, }) {
        if (isDefined(partitionId) && isDefined(partitionKey)) {
            throw new Error(`The partitionId (${partitionId}) and partitionKey (${partitionKey}) cannot both be specified.`);
        }
        if (!this._partitions.length) {
            throw new Error(`Unable to determine partitionIds, can't assign partitionId.`);
        }
        if (isDefined(partitionId) && this._partitions.includes(partitionId)) {
            return partitionId;
        }
        if (isDefined(partitionKey)) {
            return mapPartitionKeyToId(partitionKey, this._partitions.length).toString();
        }
        return this._assignRoundRobinPartition();
    }
    _assignRoundRobinPartition() {
        const maxPartitionIndex = this._partitions.length - 1;
        const proposedPartitionIndex = this._lastRoundRobinPartitionIndex + 1;
        const nextPartitionIndex = proposedPartitionIndex > maxPartitionIndex ? 0 : proposedPartitionIndex;
        this._lastRoundRobinPartitionIndex = nextPartitionIndex;
        return this._partitions[nextPartitionIndex];
    }
}
//# sourceMappingURL=partitionAssigner.js.map