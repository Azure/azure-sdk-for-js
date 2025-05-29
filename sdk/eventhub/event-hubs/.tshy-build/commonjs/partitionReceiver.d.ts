import type { AbortSignalLike } from "@azure/abort-controller";
import type { MessagingError } from "@azure/core-amqp";
import type { ReceivedEventData } from "./eventData.js";
import type { EventPosition } from "./eventPosition.js";
import type { ConnectionContext } from "./connectionContext.js";
import type { PartitionReceiverOptions } from "./models/private.js";
type Writable<T> = {
    -readonly [P in keyof T]: T[P];
};
/** @internal */
export type WritableReceiver = Writable<PartitionReceiver>;
/**
 * A set of information about the last enqueued event of a partition, as observed by the consumer as
 * events are received from the Event Hubs service
 */
export interface LastEnqueuedEventProperties {
    /**
     * The sequence number of the event that was last enqueued into the Event Hub partition from which
     * this event was received.
     */
    sequenceNumber?: number;
    /**
     * The date and time, in UTC, that the last event was enqueued into the Event Hub partition from
     * which this event was received.
     */
    enqueuedOn?: Date;
    /**
     * The offset of the event that was last enqueued into the Event Hub partition from which
     * this event was received.
     */
    offset?: string;
    /**
     * The date and time, in UTC, that the last event was retrieved from the Event Hub partition.
     */
    retrievedOn?: Date;
}
/** @internal */
export interface PartitionReceiver {
    readonly checkpoint: number;
    readonly lastEnqueuedEventProperties: LastEnqueuedEventProperties;
    readonly isClosed: boolean;
    readonly close: () => Promise<void>;
    readonly abort: () => Promise<void>;
    readonly isOpen: () => boolean;
    readonly receiveBatch: (maxMessageCount: number, maxWaitTimeInSeconds?: number, abortSignal?: AbortSignalLike) => Promise<ReceivedEventData[]>;
    /** Needed for tests only */
    readonly _onError?: (error: MessagingError | Error) => void;
    readonly connect: (options: ConnectOptions) => Promise<void>;
}
interface ConnectOptions {
    abortSignal: AbortSignalLike | undefined;
    timeoutInMs: number;
}
/** @internal */
export declare function createReceiver(ctx: ConnectionContext, consumerGroup: string, consumerId: string, partitionId: string, eventPosition: EventPosition, options?: PartitionReceiverOptions): PartitionReceiver;
/**
 * @internal
 */
export declare function checkOnInterval(waitTimeInMs: number, check: () => boolean, options?: {
    abortSignal?: AbortSignalLike;
    cleanupBeforeAbort?: () => void;
    abortErrorMsg?: string;
}): Promise<void>;
/**
 * Returns a promise that will resolve when it is time to read from the queue
 * @param maxEventCount - The maximum number of events to receive.
 * @param maxWaitTimeInMs - The maximum time to wait in ms for the queue to contain any events.
 * @param readIntervalWaitTimeInMs - The time interval to wait in ms before checking the queue.
 * @param queue - The queue to read from.
 * @param options - The options bag.
 * @returns a promise that will resolve when it is time to read from the queue
 * @internal
 */
export declare function waitForEvents(maxEventCount: number, maxWaitTimeInMs: number, readIntervalWaitTimeInMs: number, queue: unknown[], options?: {
    abortSignal?: AbortSignalLike;
    cleanupBeforeAbort?: () => void;
    receivedAfterWait?: () => void;
    receivedAlready?: () => void;
    receivedNone?: () => void;
}): Promise<void>;
export {};
//# sourceMappingURL=partitionReceiver.d.ts.map