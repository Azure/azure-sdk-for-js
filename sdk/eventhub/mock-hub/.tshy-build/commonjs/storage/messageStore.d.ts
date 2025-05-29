import type { EventPosition } from "../utils/eventPosition.js";
import type { Message } from "rhea";
export interface MessageRecord {
    partitionKey?: string;
    enqueuedTime: Date;
    sequenceNumber: number;
    offset: number;
    message: Message;
}
export interface PartitionInfo {
    beginningSequenceNumber: number;
    lastEnqueuedOffset: string;
    lastEnqueuedTimeUtc: Date;
    lastEnqueuedSequenceNumber: number;
    partitionId: string;
    isPartitionEmpty: boolean;
}
/**
 * The `MessageStore` stores events sent to the service.
 * It provides a method of pulling events from a partition via `getMessageIterator`,
 * and setting a `startPosition` that indicates which event in a partition to start reading from.
 */
export declare class MessageStore {
    /**
     * All messages are stored in a list specific to a partition.
     *
     * Key: partitionId
     * Value: List of `MessageRecord`.
     */
    private _partitionRecordMap;
    /**
     * Each partition has any number of 'QueueViews' associated with it.
     *
     * QueueViews provide a way to have multiple senders stream events using the same
     * backing `MessageStore`, even supporting different starting positions.
     *
     * Key: partitionId
     * Value: A Set containing all the `QueueViews` for a partition.
     */
    private _partitionQueueViews;
    /**
     * Gets the list of `MessageRecord` associated with the specified partition id.
     * @param partitionId - The partition id to find message records for.
     */
    private _getPartitionStore;
    /**
     * Gets the full Set of 'QueueViews' associated with the specified partition id.
     * @param partitionId -
     */
    private _getPartitionViews;
    /**
     * Returns the list of `MessageRecord` that appears on or after the specified `startPosition`.
     * @param fullList - List of `MessageRecord`.
     * @param startPosition - The `EventPosition` used to find which `MessageRecord` to start reading from.
     */
    private _getSubList;
    private _isValidPositionedRecord;
    /**
     * Provides information about the state of the specified partition.
     * @param partitionId - The partition ID to find information about.
     */
    getPartitionInfo(partitionId: string): PartitionInfo;
    /**
     * Associates the provided `Message` with a `partitionId` and stores it.
     *
     * This will also update any `MessageIterator`s that are waiting on this partitionId.
     * @param partitionId - The partition id to associate the message with.
     * @param message - The message to store.
     * @param partitionKey - Optional partition key.
     */
    storeMessage(partitionId: string, message: Message, partitionKey?: string): void;
    /**
     * Returns an AsyncIterableIterator that yields `MessageRecord`.
     *
     * @param partitionId - The partition ID
     * @param startPosition - Specifies which `MessageRecord` to start iterating from.
     */
    getMessageIterator(partitionId: string, startPosition: EventPosition): AsyncIterator<MessageRecord, void, boolean | undefined>;
}
//# sourceMappingURL=messageStore.d.ts.map