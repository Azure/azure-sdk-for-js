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
export declare class PartitionGate {
    private _partitions;
    /**
     * Adds a partition, throwing an Error if there is a conflict with partitions (including "all")
     * that are already added.
     *
     * @param partitionId - A partition ID or the constant "all"
     */
    add(partitionId: string | "all"): void;
    /**
     * Removes a partition
     *
     * @param partitionId - A partition ID or the constant "all"
     */
    remove(partitionId: string | "all"): void;
}
//# sourceMappingURL=partitionGate.d.ts.map