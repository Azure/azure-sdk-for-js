/**
 * @internal
 * Assigns a partition based on the partition ids it knows about and an optional partition id or partition key.
 */
export declare class PartitionAssigner {
    private _partitions;
    private _lastRoundRobinPartitionIndex;
    /**
     * Set the partition ids that can be used when assigning a partition.
     * @param partitionIds - All valid partition ids.
     */
    setPartitionIds(partitionIds: string[]): void;
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
    assignPartition({ partitionId, partitionKey, }: {
        partitionId?: string;
        partitionKey?: string;
    }): string;
    private _assignRoundRobinPartition;
}
//# sourceMappingURL=partitionAssigner.d.ts.map