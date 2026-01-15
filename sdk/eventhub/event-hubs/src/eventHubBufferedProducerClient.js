// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { EventHubProducerClient } from "./eventHubProducerClient.js";
import { isDefined } from "@azure/core-util";
import { isCredential } from "./util/typeGuards.js";
import { delay } from "@azure/core-amqp";
import { BatchingPartitionChannel } from "./batchingPartitionChannel.js";
import { PartitionAssigner } from "./impl/partitionAssigner.js";
import { logger } from "./logger.js";
import { getRandomName } from "./util/utils.js";
/**
 * The `EventHubBufferedProducerClient`is used to publish events to a specific Event Hub.
 *
 * The `EventHubBufferedProducerClient` does not publish events immediately.
 * Instead, events are buffered so they can be efficiently batched and published
 * when the batch is full or the `maxWaitTimeInMs` has elapsed with no new events
 * enqueued.
 *
 * Depending on the options specified when events are enqueued, they may be
 * automatically assigned to a partition, grouped according to the specified partition key,
 * or assigned a specifically requested partition.
 *
 * This model is intended to shift the burden of batch management from callers, at the cost of
 * non-deterministic timing, for when events will be published. There are additional trade-offs
 * to consider, as well:
 * - If the application crashes, events in the buffer will not have been published. To prevent
 *   data loss, callers are encouraged to track publishing progress using the
 *   `onSendEventsSuccessHandler` and `onSendEventsErrorHandler` handlers.
 * - Events specifying a partition key may be assigned a different partition than those using
 *   the same key with other producers.
 * - In the unlikely event that a partition becomes temporarily unavailable, the
 *   `EventHubBufferedProducerClient` may take longer to recover than other producers.
 *
 * In scenarios where it is important to have events published immediately with a deterministic
 * outcome, ensure that partition keys are assigned to a partition consistent with other
 * publishers, or where maximizing availability is a requirement, using the
 * `EventHubProducerClient` is recommended.
 */
export class EventHubBufferedProducerClient {
    /**
     * Controls the `abortSignal` passed to each `BatchingPartitionChannel`.
     * Used to signal when a channel should stop waiting for events.
     */
    _abortController = new AbortController();
    /**
     * Indicates whether the client has been explicitly closed.
     */
    _isClosed = false;
    /**
     * Handles assigning partitions.
     */
    _partitionAssigner = new PartitionAssigner();
    /**
     * The known partitionIds that will be used when assigning events to partitions.
     */
    _partitionIds = [];
    /**
     * The EventHubProducerClient to use when creating and sending batches to the Event Hub.
     */
    _producer;
    /**
     * Mapping of partitionIds to `BatchingPartitionChannels`.
     * Each `BatchingPartitionChannel` handles buffering events and backpressure independently.
     */
    _partitionChannels = new Map();
    /**
     * The options passed by the user when creating the EventHubBufferedProducerClient instance.
     */
    _clientOptions;
    /**
     * The interval at which the background management operation should run.
     */
    _backgroundManagementInterval = 10000; // 10 seconds
    /**
     * Indicates whether the background management loop is running.
     */
    _isBackgroundManagementRunning = false;
    /**
     * @readonly
     * The name of the Event Hub instance for which this client is created.
     */
    get eventHubName() {
        return this._producer.eventHubName;
    }
    /**
     * @readonly
     * The fully qualified namespace of the Event Hub instance for which this client is created.
     * This is likely to be similar to <yournamespace>.servicebus.windows.net.
     */
    get fullyQualifiedNamespace() {
        return this._producer.fullyQualifiedNamespace;
    }
    /**
     * The name used to identify this EventHubBufferedProducerClient.
     * If not specified or empty, a random unique one will be generated.
     */
    identifier;
    constructor(fullyQualifiedNamespaceOrConnectionString1, eventHubNameOrOptions2, credentialOrOptions3, options4) {
        if (typeof eventHubNameOrOptions2 !== "string") {
            this.identifier = eventHubNameOrOptions2.identifier ?? getRandomName();
            this._producer = new EventHubProducerClient(fullyQualifiedNamespaceOrConnectionString1, {
                ...eventHubNameOrOptions2,
                identifier: this.identifier,
            });
            this._clientOptions = { ...eventHubNameOrOptions2 };
        }
        else if (!isCredential(credentialOrOptions3)) {
            this.identifier = credentialOrOptions3?.identifier ?? getRandomName();
            this._producer = new EventHubProducerClient(fullyQualifiedNamespaceOrConnectionString1, eventHubNameOrOptions2, { ...credentialOrOptions3, identifier: this.identifier });
            this._clientOptions = { ...credentialOrOptions3 };
        }
        else {
            this.identifier = options4?.identifier ?? getRandomName();
            this._producer = new EventHubProducerClient(fullyQualifiedNamespaceOrConnectionString1, eventHubNameOrOptions2, credentialOrOptions3, { ...options4, identifier: this.identifier });
            this._clientOptions = { ...options4 };
        }
        // setting internal idempotent publishing option on the standard producer.
        this._producer._enableIdempotentRetries = this._clientOptions.enableIdempotentRetries;
    }
    /**
     * Closes the AMQP connection to the Event Hub instance,
     * returning a promise that will be resolved when disconnection is completed.
     *
     * This will wait for enqueued events to be flushed to the service before closing
     * the connection.
     * To close without flushing, set the `flush` option to `false`.
     *
     * @param options - The set of options to apply to the operation call.
     * @returns Promise<void>
     * @throws Error if the underlying connection encounters an error while closing.
     */
    async close(options = {}) {
        logger.verbose("closing buffered producer client...");
        if (!isDefined(options.flush) || options.flush === true) {
            await this.flush(options);
        }
        // Calling abort signals to the BatchingPartitionChannels that they
        // should stop reading/sending events, and to the background management
        // loop that it should stop periodic partition id updates.
        this._abortController.abort();
        await this._producer.close();
        this._isClosed = true;
    }
    /**
     * Enqueues an event into the buffer to be published to the Event Hub.
     * If there is no capacity in the buffer when this method is invoked,
     * it will wait for space to become available and ensure that the event
     * has been enqueued.
     *
     * When this call returns, the event has been accepted into the buffer,
     * but it may not have been published yet.
     * Publishing will take place at a nondeterministic point in the future as the buffer is processed.
     *
     * @param events - An {@link EventData} or `AmqpAnnotatedMessage`.
     * @param options - A set of options that can be specified to influence the way in which
     * the event is sent to the associated Event Hub.
     * - `abortSignal`  : A signal used to cancel the enqueueEvent operation.
     * - `partitionId`  : The partition this set of events will be sent to. If set, `partitionKey` can not be set.
     * - `partitionKey` : A value that is hashed to produce a partition assignment. If set, `partitionId` can not be set.
     * @returns The total number of events that are currently buffered and waiting to be published, across all partitions.
     */
    async enqueueEvent(event, options = {}) {
        if (this._isClosed) {
            throw new Error(`This EventHubBufferedProducerClient has already been closed. Create a new client to enqueue events.`);
        }
        if (!this._partitionIds.length) {
            await this._updatePartitionIds();
        }
        if (!this._isBackgroundManagementRunning) {
            // Fire-and-forget background loop with error handling
            this._startPartitionIdsUpdateLoop().catch((e) => {
                logger.error(`The following error occurred during partition ID update loop: ${JSON.stringify(e, undefined, "  ")}`);
            });
            this._isBackgroundManagementRunning = true;
        }
        const partitionId = this._partitionAssigner.assignPartition({
            partitionId: options.partitionId,
            partitionKey: options.partitionKey,
        });
        const partitionChannel = this._getPartitionChannel(partitionId);
        await partitionChannel.enqueueEvent(event);
        return this._getTotalBufferedEventsCount();
    }
    /**
     * Enqueues events into the buffer to be published to the Event Hub.
     * If there is no capacity in the buffer when this method is invoked,
     * it will wait for space to become available and ensure that the events
     * have been enqueued.
     *
     * When this call returns, the events have been accepted into the buffer,
     * but it may not have been published yet.
     * Publishing will take place at a nondeterministic point in the future as the buffer is processed.
     *
     * @param events - An array of {@link EventData} or `AmqpAnnotatedMessage`.
     * @param options - A set of options that can be specified to influence the way in which
     * events are sent to the associated Event Hub.
     * - `abortSignal`  : A signal used to cancel the enqueueEvents operation.
     * - `partitionId`  : The partition this set of events will be sent to. If set, `partitionKey` can not be set.
     * - `partitionKey` : A value that is hashed to produce a partition assignment. If set, `partitionId` can not be set.
     * @returns The total number of events that are currently buffered and waiting to be published, across all partitions.
     */
    async enqueueEvents(events, 
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options = {}) {
        for (const event of events) {
            await this.enqueueEvent(event, options);
        }
        return this._getTotalBufferedEventsCount();
    }
    /**
     * Attempts to publish all events in the buffer immediately.
     * This may result in multiple batches being published,
     * the outcome of each of which will be individually reported by
     * the `onSendEventsSuccessHandler` and `onSendEventsErrorHandler` handlers.
     *
     * @param options - The set of options to apply to the operation call.
     */
    async flush(options = {}) {
        await Promise.all(Array.from(this._partitionChannels.values()).map((channel) => channel.flush(options)));
    }
    /**
     * Provides the Event Hub runtime information.
     * @param options - The set of options to apply to the operation call.
     * @returns A promise that resolves with information about the Event Hub instance.
     * @throws Error if the underlying connection has been closed, create a new EventHubBufferedProducerClient.
     * @throws AbortError if the operation is cancelled via the abortSignal.
     */
    getEventHubProperties(options = {}) {
        return this._producer.getEventHubProperties(options);
    }
    /**
     * Provides the id for each partition associated with the Event Hub.
     * @param options - The set of options to apply to the operation call.
     * @returns A promise that resolves with an Array of strings representing the id for
     * each partition associated with the Event Hub.
     * @throws Error if the underlying connection has been closed, create a new EventHubBufferedProducerClient.
     * @throws AbortError if the operation is cancelled via the abortSignal.
     */
    getPartitionIds(options = {}) {
        return this._producer.getPartitionIds(options);
    }
    /**
     * Provides information about the state of the specified partition.
     * @param partitionId - The id of the partition for which information is required.
     * @param options - The set of options to apply to the operation call.
     * @returns A promise that resolves with information about the state of the partition .
     * @throws Error if the underlying connection has been closed, create a new EventHubBufferedProducerClient.
     * @throws AbortError if the operation is cancelled via the abortSignal.
     */
    getPartitionProperties(partitionId, options = {}) {
        return this._producer.getPartitionProperties(partitionId, options);
    }
    /**
     * Gets the `BatchingPartitionChannel` associated with the partitionId.
     *
     * If one does not exist, it is created.
     */
    _getPartitionChannel(partitionId) {
        const partitionChannel = this._partitionChannels.get(partitionId) ??
            new BatchingPartitionChannel({
                loopAbortSignal: this._abortController.signal,
                maxBufferSize: this._clientOptions.maxEventBufferLengthPerPartition || 1500,
                maxWaitTimeInMs: this._clientOptions.maxWaitTimeInMs || 1000,
                onSendEventsErrorHandler: this._clientOptions.onSendEventsErrorHandler,
                onSendEventsSuccessHandler: this._clientOptions.onSendEventsSuccessHandler,
                partitionId,
                producer: this._producer,
            });
        this._partitionChannels.set(partitionId, partitionChannel);
        return partitionChannel;
    }
    /**
     * Returns the total number of buffered events across all partitions.
     */
    _getTotalBufferedEventsCount() {
        let total = 0;
        for (const [_, channel] of this._partitionChannels) {
            total += channel.getCurrentBufferedCount();
        }
        return total;
    }
    async _updatePartitionIds() {
        logger.verbose("Checking for partition Id updates...");
        const queriedPartitionIds = await this.getPartitionIds();
        if (this._partitionIds.length !== queriedPartitionIds.length) {
            logger.verbose("Applying partition Id updates");
            this._partitionIds = queriedPartitionIds;
            this._partitionAssigner.setPartitionIds(this._partitionIds);
        }
    }
    async _startPartitionIdsUpdateLoop() {
        logger.verbose("Starting a background loop to check and apply partition id updates...");
        while (!this._abortController.signal.aborted && !this._isClosed) {
            await delay(this._backgroundManagementInterval);
            if (!this._isClosed) {
                await this._updatePartitionIds();
            }
        }
    }
}
//# sourceMappingURL=eventHubBufferedProducerClient.js.map