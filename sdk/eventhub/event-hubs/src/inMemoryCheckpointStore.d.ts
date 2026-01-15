import type { CheckpointStore, PartitionOwnership } from "./eventProcessor.js";
import type { Checkpoint } from "./partitionProcessor.js";
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
export declare class InMemoryCheckpointStore implements CheckpointStore {
    private _partitionOwnershipMap;
    private _committedCheckpoints;
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
    listOwnership(_fullyQualifiedNamespace: string, _eventHubName: string, _consumerGroup: string): Promise<PartitionOwnership[]>;
    /**
     * Claim ownership of a list of partitions. This will return the list of partitions that were owned
     * successfully.
     *
     * @param partitionOwnership - The list of partition ownership this instance is claiming to own.
     * @returns A list partitions this instance successfully claimed ownership.
     */
    claimOwnership(partitionOwnership: PartitionOwnership[]): Promise<PartitionOwnership[]>;
    /**
     * Updates the checkpoint in the data store for a partition.
     *
     * @param checkpoint - The checkpoint.
     */
    updateCheckpoint(checkpoint: Checkpoint): Promise<void>;
    listCheckpoints(fullyQualifiedNamespace: string, eventHubName: string, consumerGroup: string): Promise<Checkpoint[]>;
}
//# sourceMappingURL=inMemoryCheckpointStore.d.ts.map