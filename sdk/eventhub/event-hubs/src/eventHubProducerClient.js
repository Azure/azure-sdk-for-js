// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createConnectionContext } from "./connectionContext.js";
import { EventDataBatchImpl, isEventDataBatch } from "./eventDataBatch.js";
import { isDefined } from "@azure/core-util";
import { isCredential } from "./util/typeGuards.js";
import { logErrorStackTrace, logger } from "./logger.js";
import { idempotentAlreadyPublished, idempotentSomeAlreadyPublished, throwErrorIfConnectionClosed, throwTypeErrorIfParameterMissing, validateProducerPartitionSettings, } from "./util/error.js";
import { assertIsEventData } from "./eventData.js";
import { EventHubSender } from "./eventHubSender.js";
import { toSpanOptions, tracingClient } from "./diagnostics/tracing.js";
import { instrumentEventData } from "./diagnostics/instrumentEventData.js";
import { getRandomName } from "./util/utils.js";
/**
 * The `EventHubProducerClient` class is used to send events to an Event Hub.
 *
 * There are multiple ways to create an `EventHubProducerClient`
 * - Use the connection string from the SAS policy created for your Event Hub instance.
 * - Use the connection string from the SAS policy created for your Event Hub namespace,
 * and the name of the Event Hub instance
 * - Use the full namespace like `<yournamespace>.servicebus.windows.net`, and a credentials object.
 *
 * Optionally, you can also pass an options bag to configure the retry policy or proxy settings.
 *
 */
export class EventHubProducerClient {
    /**
     * Describes the amqp connection context for the client.
     */
    _context;
    /**
     * The options passed by the user when creating the EventHubClient instance.
     */
    _clientOptions;
    /**
     * Map of partitionId to senders
     */
    _sendersMap;
    /**
     * Indicates whether or not the EventHubProducerClient should enable idempotent publishing to Event Hub partitions.
     * If enabled, the producer will only be able to publish directly to partitions;
     * it will not be able to publish to the Event Hubs gateway for automatic partition routing
     * nor will it be able to use a partition key.
     * Default: false
     */
    _enableIdempotentRetries;
    /**
     * The set of options that can be specified to influence publishing behavior specific to the configured Event Hub partition.
     * These options are not necessary in the majority of scenarios and are intended for use with specialized scenarios,
     * such as when recovering the state used for idempotent publishing.
     */
    _partitionOptions;
    /**
     * @readonly
     * The name of the Event Hub instance for which this client is created.
     */
    get eventHubName() {
        return this._context.config.entityPath;
    }
    /**
     * @readonly
     * The fully qualified namespace of the Event Hub instance for which this client is created.
     * This is likely to be similar to <yournamespace>.servicebus.windows.net.
     */
    get fullyQualifiedNamespace() {
        return this._context.config.host;
    }
    /**
     * The name used to identify this EventHubProducerClient.
     * If not specified or empty, a random unique one will be generated.
     */
    identifier;
    constructor(fullyQualifiedNamespaceOrConnectionString1, eventHubNameOrOptions2, credentialOrOptions3, options4) {
        this._context = createConnectionContext(fullyQualifiedNamespaceOrConnectionString1, eventHubNameOrOptions2, credentialOrOptions3, options4);
        if (typeof eventHubNameOrOptions2 !== "string") {
            this._clientOptions = eventHubNameOrOptions2 || {};
        }
        else if (!isCredential(credentialOrOptions3)) {
            this._clientOptions = credentialOrOptions3 || {};
        }
        else {
            this._clientOptions = options4 || {};
        }
        this.identifier = this._clientOptions.identifier ?? getRandomName();
        this._sendersMap = new Map();
    }
    /**
     * Creates an instance of `EventDataBatch` to which one can add events until the maximum supported size is reached.
     * The batch can be passed to the {@link sendBatch} method of the `EventHubProducerClient` to be sent to Azure Event Hubs.
     *
     * Events with different values for partitionKey or partitionId will need to be put into different batches.
     * To simplify such batch management across partitions or to have the client automatically batch events
     * and send them in specific intervals, use `EventHubBufferedProducerClient` instead.
     *
     * The below example assumes you have an array of events at hand to be batched safely.
     * If you have events coming in one by one, `EventHubBufferedProducerClient` is recommended instead
     * for effecient management of batches.
     *
     * Example usage:
     * ```ts snippet:EventHubProducerClient_CreateBatch
     * import { EventHubProducerClient } from "@azure/event-hubs";
     *
     * const client = new EventHubProducerClient("my-connection-string", "my-event-hub");
     *
     * const messages = [
     *   { body: "my-event-body1" },
     *   { body: "my-event-body2" },
     *   { body: "my-event-body3" },
     *   { body: "my-event-body4" },
     *   { body: "my-event-body5" },
     * ];
     *
     * let batch = await client.createBatch();
     * for (let i = 0; i < messages.length; i++) {
     *   if (!batch.tryAdd(messages[i])) {
     *     await client.sendBatch(batch);
     *     batch = await client.createBatch();
     *     if (!batch.tryAdd(messages[i])) {
     *       throw new Error("Message too big to fit");
     *     }
     *     if (i === messages.length - 1) {
     *       await client.sendBatch(batch);
     *     }
     *   }
     * }
     * ```
     *
     * @param options -  Configures the behavior of the batch.
     * - `partitionKey`  : A value that is hashed and used by the Azure Event Hubs service to determine the partition to which
     * the events need to be sent.
     * - `partitionId`   : Id of the partition to which the batch of events need to be sent.
     * - `maxSizeInBytes`: The upper limit for the size of batch. The `tryAdd` function will return `false` after this limit is reached.
     * - `abortSignal`   : A signal the request to cancel the operation.
     * @returns Promise<EventDataBatch>
     * @throws Error if both `partitionId` and `partitionKey` are set in the options.
     * @throws Error if the underlying connection has been closed, create a new EventHubProducerClient.
     * @throws AbortError if the operation is cancelled via the abortSignal in the options.
     */
    async createBatch(options = {}) {
        throwErrorIfConnectionClosed(this._context);
        const partitionId = isDefined(options.partitionId) ? String(options.partitionId) : undefined;
        validateProducerPartitionSettings({
            enableIdempotentRetries: this._enableIdempotentRetries,
            partitionId,
            partitionKey: options.partitionKey,
        });
        let sender = this._sendersMap.get(partitionId || "");
        if (!sender) {
            const partitionPublishingOptions = isDefined(partitionId)
                ? this._partitionOptions?.[partitionId]
                : undefined;
            sender = EventHubSender.create(this._context, this.identifier, {
                enableIdempotentProducer: Boolean(this._enableIdempotentRetries),
                partitionId,
                partitionPublishingOptions,
            });
            this._sendersMap.set(partitionId || "", sender);
        }
        let maxMessageSize = await sender.getMaxMessageSize({
            retryOptions: this._clientOptions.retryOptions,
            abortSignal: options.abortSignal,
        });
        if (options.maxSizeInBytes) {
            if (options.maxSizeInBytes > maxMessageSize) {
                const error = new Error(`Max message size (${options.maxSizeInBytes} bytes) is greater than maximum message size (${maxMessageSize} bytes) on the AMQP sender link.`);
                logger.warning(`[${this._context.connectionId}] ${error.message}`);
                logErrorStackTrace(error);
                throw error;
            }
            maxMessageSize = options.maxSizeInBytes;
        }
        return new EventDataBatchImpl(this._context, maxMessageSize, Boolean(this._enableIdempotentRetries), options.partitionKey, partitionId);
    }
    /**
     * Get the information about the state of publishing for a partition as observed by the `EventHubProducerClient`.
     * This data can always be read, but will only be populated with information relevant to the active features
     * for the producer client.
     *
     * @param partitionId - Id of the partition from which to retrieve publishing properties.
     * @param options - The set of options to apply to the operation call.
     * - `abortSignal`  : A signal the request to cancel the send operation.
     * @returns Promise<void>
     * @throws AbortError if the operation is cancelled via the abortSignal.
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore this is called in EventHubBufferedProducerClient via cast-to-any workaround
    async getPartitionPublishingProperties(partitionId, options = {}) {
        if (!isDefined(partitionId)) {
            throw new TypeError(`getPartitionPublishingProperties called without required argument "partitionId"`);
        }
        if (typeof partitionId === "number") {
            partitionId = String(partitionId);
        }
        let sender = this._sendersMap.get(partitionId);
        if (!sender) {
            sender = EventHubSender.create(this._context, this.identifier, {
                enableIdempotentProducer: Boolean(this._enableIdempotentRetries),
                partitionId,
                partitionPublishingOptions: this._partitionOptions?.[partitionId],
            });
            this._sendersMap.set(partitionId, sender);
        }
        return sender.getPartitionPublishingProperties(options);
    }
    async sendBatch(batch, options = {}) {
        throwErrorIfConnectionClosed(this._context);
        throwTypeErrorIfParameterMissing(this._context.connectionId, "sendBatch", "batch", batch);
        let partitionId;
        let partitionKey;
        // Holds an EventData properties object containing tracing properties.
        // This lets us avoid cloning batch when it is EventData[], which is
        // important as the idempotent EventHubSender needs to decorate the
        // original EventData passed through.
        const eventDataTracingProperties = [];
        // link message span contexts
        let spanContextsToLink = [];
        if (isEventDataBatch(batch)) {
            if (this._enableIdempotentRetries &&
                isDefined(batch.startingPublishedSequenceNumber)) {
                throw new Error(idempotentAlreadyPublished);
            }
            const partitionAssignment = extractPartitionAssignmentFromBatch(batch, options);
            partitionId = partitionAssignment.partitionId;
            partitionKey = partitionAssignment.partitionKey;
            spanContextsToLink = batch._messageSpanContexts;
        }
        else {
            if (!Array.isArray(batch)) {
                batch = [batch];
            }
            batch.forEach(assertIsEventData);
            if (batch.some((event) => isDefined(event._publishedSequenceNumber))) {
                throw new Error(idempotentSomeAlreadyPublished);
            }
            const partitionAssignment = extractPartitionAssignmentFromOptions(options);
            partitionId = partitionAssignment.partitionId;
            partitionKey = partitionAssignment.partitionKey;
            for (let i = 0; i < batch.length; i++) {
                batch[i] = instrumentEventData(batch[i], options, this._context.config.entityPath, this._context.config.host, "publish").event;
                eventDataTracingProperties[i] = batch[i].properties;
            }
        }
        validateProducerPartitionSettings({
            enableIdempotentRetries: this._enableIdempotentRetries,
            partitionId,
            partitionKey,
        });
        return tracingClient.withSpan(`${EventHubProducerClient.name}.${this.sendBatch.name}`, options, (updatedOptions) => {
            let sender = this._sendersMap.get(partitionId || "");
            if (!sender) {
                const partitionPublishingOptions = isDefined(partitionId)
                    ? this._partitionOptions?.[partitionId]
                    : undefined;
                sender = EventHubSender.create(this._context, this.identifier, {
                    enableIdempotentProducer: Boolean(this._enableIdempotentRetries),
                    partitionId,
                    partitionPublishingOptions,
                });
                this._sendersMap.set(partitionId || "", sender);
            }
            return sender.send(batch, {
                ...updatedOptions,
                partitionId,
                partitionKey,
                retryOptions: this._clientOptions.retryOptions,
            });
        }, {
            spanLinks: spanContextsToLink.map((tracingContext) => {
                return { tracingContext };
            }),
            ...toSpanOptions(this._context.config, "publish", "client"),
        });
    }
    /**
     * Closes the AMQP connection to the Event Hub instance,
     * returning a promise that will be resolved when disconnection is completed.
     * @returns Promise<void>
     * @throws Error if the underlying connection encounters an error while closing.
     */
    async close() {
        await this._context.close();
        for (const pair of this._sendersMap) {
            await pair[1].close();
        }
        this._sendersMap.clear();
    }
    /**
     * Provides the Event Hub runtime information.
     * @param options - The set of options to apply to the operation call.
     * @returns A promise that resolves with information about the Event Hub instance.
     * @throws Error if the underlying connection has been closed, create a new EventHubProducerClient.
     * @throws AbortError if the operation is cancelled via the abortSignal.
     */
    getEventHubProperties(options = {}) {
        return this._context.managementSession.getEventHubProperties({
            ...options,
            retryOptions: this._clientOptions.retryOptions,
        });
    }
    /**
     * Provides the id for each partition associated with the Event Hub.
     * @param options - The set of options to apply to the operation call.
     * @returns A promise that resolves with an Array of strings representing the id for
     * each partition associated with the Event Hub.
     * @throws Error if the underlying connection has been closed, create a new EventHubProducerClient.
     * @throws AbortError if the operation is cancelled via the abortSignal.
     */
    async getPartitionIds(options = {}) {
        const eventHubProperties = await this._context.managementSession.getEventHubProperties({
            ...options,
            retryOptions: this._clientOptions.retryOptions,
        });
        return eventHubProperties.partitionIds;
    }
    /**
     * Provides information about the state of the specified partition.
     * @param partitionId - The id of the partition for which information is required.
     * @param options - The set of options to apply to the operation call.
     * @returns A promise that resolves with information about the state of the partition .
     * @throws Error if the underlying connection has been closed, create a new EventHubProducerClient.
     * @throws AbortError if the operation is cancelled via the abortSignal.
     */
    getPartitionProperties(partitionId, options = {}) {
        return this._context.managementSession.getPartitionProperties(partitionId, {
            ...options,
            retryOptions: this._clientOptions.retryOptions,
        });
    }
}
/**
 * @internal
 */
function extractPartitionAssignmentFromOptions(options = {}) {
    const result = {};
    const { partitionId, partitionKey } = options;
    if (isDefined(partitionId)) {
        result.partitionId = String(partitionId);
    }
    if (isDefined(partitionKey)) {
        result.partitionKey = String(partitionKey);
    }
    return result;
}
/**
 * @internal
 */
function extractPartitionAssignmentFromBatch(batch, options) {
    const result = {};
    const partitionId = batch.partitionId;
    const partitionKey = batch.partitionKey;
    const { partitionId: unexpectedPartitionId, partitionKey: unexpectedPartitionKey } = extractPartitionAssignmentFromOptions(options);
    if (unexpectedPartitionKey && partitionKey !== unexpectedPartitionKey) {
        throw new Error(`The partitionKey (${unexpectedPartitionKey}) set on sendBatch does not match the partitionKey (${partitionKey}) set when creating the batch.`);
    }
    if (unexpectedPartitionId && unexpectedPartitionId !== partitionId) {
        throw new Error(`The partitionId (${unexpectedPartitionId}) set on sendBatch does not match the partitionId (${partitionId}) set when creating the batch.`);
    }
    if (isDefined(partitionId)) {
        result.partitionId = String(partitionId);
    }
    if (isDefined(partitionKey)) {
        result.partitionKey = String(partitionKey);
    }
    return result;
}
//# sourceMappingURL=eventHubProducerClient.js.map