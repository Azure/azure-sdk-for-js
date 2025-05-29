"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHubProducerClient = void 0;
const connectionContext_js_1 = require("./connectionContext.js");
const eventDataBatch_js_1 = require("./eventDataBatch.js");
const core_util_1 = require("@azure/core-util");
const typeGuards_js_1 = require("./util/typeGuards.js");
const logger_js_1 = require("./logger.js");
const error_js_1 = require("./util/error.js");
const eventData_js_1 = require("./eventData.js");
const eventHubSender_js_1 = require("./eventHubSender.js");
const tracing_js_1 = require("./diagnostics/tracing.js");
const instrumentEventData_js_1 = require("./diagnostics/instrumentEventData.js");
const utils_js_1 = require("./util/utils.js");
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
class EventHubProducerClient {
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
    constructor(fullyQualifiedNamespaceOrConnectionString1, eventHubNameOrOptions2, credentialOrOptions3, options4) {
        var _a;
        this._context = (0, connectionContext_js_1.createConnectionContext)(fullyQualifiedNamespaceOrConnectionString1, eventHubNameOrOptions2, credentialOrOptions3, options4);
        if (typeof eventHubNameOrOptions2 !== "string") {
            this._clientOptions = eventHubNameOrOptions2 || {};
        }
        else if (!(0, typeGuards_js_1.isCredential)(credentialOrOptions3)) {
            this._clientOptions = credentialOrOptions3 || {};
        }
        else {
            this._clientOptions = options4 || {};
        }
        this.identifier = (_a = this._clientOptions.identifier) !== null && _a !== void 0 ? _a : (0, utils_js_1.getRandomName)();
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
        var _a;
        (0, error_js_1.throwErrorIfConnectionClosed)(this._context);
        const partitionId = (0, core_util_1.isDefined)(options.partitionId) ? String(options.partitionId) : undefined;
        (0, error_js_1.validateProducerPartitionSettings)({
            enableIdempotentRetries: this._enableIdempotentRetries,
            partitionId,
            partitionKey: options.partitionKey,
        });
        let sender = this._sendersMap.get(partitionId || "");
        if (!sender) {
            const partitionPublishingOptions = (0, core_util_1.isDefined)(partitionId)
                ? (_a = this._partitionOptions) === null || _a === void 0 ? void 0 : _a[partitionId]
                : undefined;
            sender = eventHubSender_js_1.EventHubSender.create(this._context, this.identifier, {
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
                logger_js_1.logger.warning(`[${this._context.connectionId}] ${error.message}`);
                (0, logger_js_1.logErrorStackTrace)(error);
                throw error;
            }
            maxMessageSize = options.maxSizeInBytes;
        }
        return new eventDataBatch_js_1.EventDataBatchImpl(this._context, maxMessageSize, Boolean(this._enableIdempotentRetries), options.partitionKey, partitionId);
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
        var _a;
        if (!(0, core_util_1.isDefined)(partitionId)) {
            throw new TypeError(`getPartitionPublishingProperties called without required argument "partitionId"`);
        }
        if (typeof partitionId === "number") {
            partitionId = String(partitionId);
        }
        let sender = this._sendersMap.get(partitionId);
        if (!sender) {
            sender = eventHubSender_js_1.EventHubSender.create(this._context, this.identifier, {
                enableIdempotentProducer: Boolean(this._enableIdempotentRetries),
                partitionId,
                partitionPublishingOptions: (_a = this._partitionOptions) === null || _a === void 0 ? void 0 : _a[partitionId],
            });
            this._sendersMap.set(partitionId, sender);
        }
        return sender.getPartitionPublishingProperties(options);
    }
    async sendBatch(batch, options = {}) {
        (0, error_js_1.throwErrorIfConnectionClosed)(this._context);
        (0, error_js_1.throwTypeErrorIfParameterMissing)(this._context.connectionId, "sendBatch", "batch", batch);
        let partitionId;
        let partitionKey;
        // Holds an EventData properties object containing tracing properties.
        // This lets us avoid cloning batch when it is EventData[], which is
        // important as the idempotent EventHubSender needs to decorate the
        // original EventData passed through.
        const eventDataTracingProperties = [];
        // link message span contexts
        let spanContextsToLink = [];
        if ((0, eventDataBatch_js_1.isEventDataBatch)(batch)) {
            if (this._enableIdempotentRetries &&
                (0, core_util_1.isDefined)(batch.startingPublishedSequenceNumber)) {
                throw new Error(error_js_1.idempotentAlreadyPublished);
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
            batch.forEach(eventData_js_1.assertIsEventData);
            if (batch.some((event) => (0, core_util_1.isDefined)(event._publishedSequenceNumber))) {
                throw new Error(error_js_1.idempotentSomeAlreadyPublished);
            }
            const partitionAssignment = extractPartitionAssignmentFromOptions(options);
            partitionId = partitionAssignment.partitionId;
            partitionKey = partitionAssignment.partitionKey;
            for (let i = 0; i < batch.length; i++) {
                batch[i] = (0, instrumentEventData_js_1.instrumentEventData)(batch[i], options, this._context.config.entityPath, this._context.config.host, "publish").event;
                eventDataTracingProperties[i] = batch[i].properties;
            }
        }
        (0, error_js_1.validateProducerPartitionSettings)({
            enableIdempotentRetries: this._enableIdempotentRetries,
            partitionId,
            partitionKey,
        });
        return tracing_js_1.tracingClient.withSpan(`${EventHubProducerClient.name}.${this.sendBatch.name}`, options, (updatedOptions) => {
            var _a;
            let sender = this._sendersMap.get(partitionId || "");
            if (!sender) {
                const partitionPublishingOptions = (0, core_util_1.isDefined)(partitionId)
                    ? (_a = this._partitionOptions) === null || _a === void 0 ? void 0 : _a[partitionId]
                    : undefined;
                sender = eventHubSender_js_1.EventHubSender.create(this._context, this.identifier, {
                    enableIdempotentProducer: Boolean(this._enableIdempotentRetries),
                    partitionId,
                    partitionPublishingOptions,
                });
                this._sendersMap.set(partitionId || "", sender);
            }
            return sender.send(batch, Object.assign(Object.assign({}, updatedOptions), { partitionId,
                partitionKey, retryOptions: this._clientOptions.retryOptions }));
        }, Object.assign({ spanLinks: spanContextsToLink.map((tracingContext) => {
                return { tracingContext };
            }) }, (0, tracing_js_1.toSpanOptions)(this._context.config, "publish", "client")));
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
        return this._context.managementSession.getEventHubProperties(Object.assign(Object.assign({}, options), { retryOptions: this._clientOptions.retryOptions }));
    }
    /**
     * Provides the id for each partition associated with the Event Hub.
     * @param options - The set of options to apply to the operation call.
     * @returns A promise that resolves with an Array of strings representing the id for
     * each partition associated with the Event Hub.
     * @throws Error if the underlying connection has been closed, create a new EventHubProducerClient.
     * @throws AbortError if the operation is cancelled via the abortSignal.
     */
    getPartitionIds(options = {}) {
        return this._context
            .managementSession.getEventHubProperties(Object.assign(Object.assign({}, options), { retryOptions: this._clientOptions.retryOptions }))
            .then((eventHubProperties) => {
            return eventHubProperties.partitionIds;
        });
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
        return this._context.managementSession.getPartitionProperties(partitionId, Object.assign(Object.assign({}, options), { retryOptions: this._clientOptions.retryOptions }));
    }
}
exports.EventHubProducerClient = EventHubProducerClient;
/**
 * @internal
 */
function extractPartitionAssignmentFromOptions(options = {}) {
    const result = {};
    const { partitionId, partitionKey } = options;
    if ((0, core_util_1.isDefined)(partitionId)) {
        result.partitionId = String(partitionId);
    }
    if ((0, core_util_1.isDefined)(partitionKey)) {
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
    if ((0, core_util_1.isDefined)(partitionId)) {
        result.partitionId = String(partitionId);
    }
    if ((0, core_util_1.isDefined)(partitionKey)) {
        result.partitionKey = String(partitionKey);
    }
    return result;
}
//# sourceMappingURL=eventHubProducerClient.js.map