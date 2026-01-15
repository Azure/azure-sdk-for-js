import type { AmqpAnnotatedMessage } from "@azure/core-amqp";
import type { EventData, EventHubBufferedProducerClientOptions, EventHubProducerClient, OperationOptions } from "./index.js";
import type { AbortSignalLike } from "@azure/abort-controller";
export interface BatchingPartitionChannelProps {
    loopAbortSignal: AbortSignalLike;
    maxBufferSize: number;
    maxWaitTimeInMs: number;
    partitionId: string;
    producer: EventHubProducerClient;
    /**
     * The handler to call once a batch has successfully published.
     */
    onSendEventsSuccessHandler?: EventHubBufferedProducerClientOptions["onSendEventsSuccessHandler"];
    /**
     * The handler to call when a batch fails to publish.
     */
    onSendEventsErrorHandler: EventHubBufferedProducerClientOptions["onSendEventsErrorHandler"];
}
/**
 * The `BatchingPartitionChannel` is responsible for accepting enqueued events
 * and optimally batching and sending them to an Event Hub.
 * @internal
 */
export declare class BatchingPartitionChannel {
    private _eventQueue;
    private _batchedEvents;
    private _bufferCount;
    private _readyQueue;
    private _flushState;
    private _isRunning;
    private _lastBatchCreationTime;
    private _loopAbortSignal;
    private _maxBufferSize;
    private _maxWaitTimeInMs;
    private _onSendEventsErrorHandler;
    private _onSendEventsSuccessHandler?;
    private _partitionId;
    private _producer;
    constructor({ loopAbortSignal, maxBufferSize, maxWaitTimeInMs, onSendEventsErrorHandler, onSendEventsSuccessHandler, partitionId, producer, }: BatchingPartitionChannelProps);
    getCurrentBufferedCount(): number;
    enqueueEvent(event: EventData | AmqpAnnotatedMessage): Promise<void>;
    /**
     * Sets the flush state so that no new events can be enqueued until
     * all the currently buffered events are sent to the Event Hub.
     *
     * Returns a promise that resolves once flushing is complete.
     */
    flush(_options?: OperationOptions): Promise<void>;
    /**
     * Returns a promise that resolves once there is room for events to be added
     * to the buffer.
     */
    private _ready;
    /**
     * Starts the loop that creates batches and sends them to the Event Hub.
     *
     * The loop will run until the `_loopAbortSignal` is aborted.
     */
    private _startPublishLoop;
    /**
     * Helper method that returns an `EventDataBatch`.
     * This also has the side effects of
     *  - keeping track of batch creation time: needed for maxWaitTime calculations.
     *  - clearing reference to batched events.
     *  - incrementing the readiness: creating a new batch indicates the buffer
     *    should have room, so we can resolve some pending `ready()` calls.
     */
    private _createBatch;
    /**
     * This method will resolve as many pending `ready()` calls as it can
     * based on how much space remains in the buffer.
     *
     * If the channel is currently flushing, this is a no-op. This prevents
     * `enqueueEvent` calls from adding the event to the buffer until flushing
     * completes.
     */
    private _incrementReadiness;
    /**
     * Calls the user-provided `onSendEventsSuccessHandler` with the events
     * that were successfully sent.
     */
    private _reportSuccess;
    /**
     * Calls the user-provided `onSendEventsErrorHandler` with an error and the events
     * that were not successfully sent.
     */
    private _reportFailure;
    /**
     * Updates the channel's flush state once the size of the
     * event buffer has decreased to 0.
     */
    private _updateFlushState;
}
//# sourceMappingURL=batchingPartitionChannel.d.ts.map