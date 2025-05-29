"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartitionProcessor = void 0;
const logger_js_1 = require("./logger.js");
/**
 * The `PartitionProcessor` is responsible for processing events received from Event Hubs when using `EventProcessor`
 *
 * The EventProcessor creates a new instance of the PartitionProcessor for each partition of the event hub it starts processing. When you extend the `PartitionProcessor` in order to customize it as you see fit,
 * - Override the `processEvents()` method to add the code to process the received events. This is also a good place to update the checkpoints using the `updateCheckpoint()` method
 * - Optionally override the `processError()` method to handle any error that might have occurred when processing the events.
 * - Optionally override the `initialize()` method to implement any set up related tasks you would want to carry out before starting to receive events from the partition
 * - Optionally override the `close()` method to implement any tear down or clean up tasks you would want to carry out.
 * @internal
 */
class PartitionProcessor {
    constructor(_eventHandlers, _checkpointStore, _context) {
        this._eventHandlers = _eventHandlers;
        this._checkpointStore = _checkpointStore;
        this._context = _context;
    }
    /**
     * Information on the last enqueued event in the partition that is being processed.
     * This property is updated by the `EventProcessor` if the `trackLastEnqueuedEventProperties` option is set to true
     * when creating an instance of EventProcessor
     * @readonly
     */
    get lastEnqueuedEventProperties() {
        return this._lastEnqueuedEventProperties;
    }
    /**
     * Information on the last enqueued event in the partition that is being processed.
     * This property is updated by the `EventProcessor` if the `trackLastEnqueuedEventProperties` option is set to true
     * when creating an instance of EventProcessor
     */
    set lastEnqueuedEventProperties(properties) {
        this._lastEnqueuedEventProperties = properties;
    }
    /**
     * The fully qualified namespace from where the current partition is being processed. It is set by the `EventProcessor`
     * @readonly
     */
    get fullyQualifiedNamespace() {
        return this._context.fullyQualifiedNamespace;
    }
    /**
     * The name of the consumer group from where the current partition is being processed. It is set by the `EventProcessor`
     * @readonly
     */
    get consumerGroup() {
        return this._context.consumerGroup;
    }
    /**
     * The name of the event hub to which the current partition belongs. It is set by the `EventProcessor`
     * @readonly
     */
    get eventHubName() {
        return this._context.eventHubName;
    }
    /**
     * The identifier of the Event Hub partition that is being processed. It is set by the `EventProcessor`
     * @readonly
     */
    get partitionId() {
        return this._context.partitionId;
    }
    /**
     * The unique identifier of the `EventProcessor` that has spawned the current instance of `PartitionProcessor`. This is set by the `EventProcessor`
     */
    get eventProcessorId() {
        return this._context.eventProcessorId;
    }
    /**
     * This method is called when the `EventProcessor` takes ownership of a new partition and before any
     * events are received.
     */
    async initialize() {
        var _a, _b;
        return (_b = (_a = this._eventHandlers).processInitialize) === null || _b === void 0 ? void 0 : _b.call(_a, this);
    }
    /**
     * This method is called before the partition processor is closed by the EventProcessor.
     *
     * @param reason - The reason for closing this partition processor.
     */
    async close(reason) {
        if (this._eventHandlers.processClose) {
            await this._eventHandlers.processClose(reason, this);
        }
    }
    /**
     * This method is called when new events are received.
     *
     * This is also a good place to update checkpoints as appropriate.
     *
     * @param event - The received events to be processed.
     */
    async processEvents(events) {
        await this._eventHandlers.processEvents(events, this);
    }
    /**
     * This method is called when an error occurs while receiving events from Event Hubs.
     *
     * @param error - The error to be processed.
     */
    async processError(error) {
        if (this._eventHandlers.processError) {
            try {
                await this._eventHandlers.processError(error, this);
            }
            catch (err) {
                logger_js_1.logger.verbose(`Error thrown from user's processError handler : ${err}`);
            }
        }
    }
    /**
     * Updates the checkpoint using the event data.
     *
     * A checkpoint is meant to represent the last successfully processed event by the user from a particular
     * partition of a consumer group in an Event Hub instance.
     *
     * @param eventData - The event that you want to update the checkpoint with.
     */
    async updateCheckpoint(eventData) {
        const checkpoint = {
            fullyQualifiedNamespace: this._context.fullyQualifiedNamespace,
            eventHubName: this._context.eventHubName,
            consumerGroup: this._context.consumerGroup,
            partitionId: this._context.partitionId,
            sequenceNumber: eventData.sequenceNumber,
            offset: eventData.offset,
        };
        await this._checkpointStore.updateCheckpoint(checkpoint);
    }
}
exports.PartitionProcessor = PartitionProcessor;
//# sourceMappingURL=partitionProcessor.js.map