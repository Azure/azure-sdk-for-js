// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { assertIsEventData, isAmqpAnnotatedMessage, populateIdempotentMessageAnnotations, toRheaMessage, } from "./eventData.js";
import { message } from "rhea-promise";
import { isDefined, isObjectWithProperties } from "@azure/core-util";
import { instrumentEventData } from "./diagnostics/instrumentEventData.js";
import { throwTypeErrorIfParameterMissing } from "./util/error.js";
/**
 * The amount of bytes to reserve as overhead for a small message.
 */
const smallMessageOverhead = 5;
/**
 * The amount of bytes to reserve as overhead for a large message.
 */
const largeMessageOverhead = 8;
/**
 * The maximum number of bytes that a message may be to be considered small.
 */
const smallMessageMaxBytes = 255;
/**
 * Checks if the provided eventDataBatch is an instance of `EventDataBatch`.
 * @param eventDataBatch - The instance of `EventDataBatch` to verify.
 * @internal
 */
export function isEventDataBatch(eventDataBatch) {
    return (isObjectWithProperties(eventDataBatch, ["count", "sizeInBytes", "tryAdd"]) &&
        typeof eventDataBatch.tryAdd === "function" &&
        typeof eventDataBatch.count === "number" &&
        typeof eventDataBatch.sizeInBytes === "number");
}
/**
 * An internal class representing a batch of events which can be used to send events to Event Hub.
 *
 * @internal
 */
export class EventDataBatchImpl {
    /**
     * EventDataBatch should not be constructed using `new EventDataBatch()`
     * Use the `createBatch()` method on your `EventHubProducer` instead.
     * @internal
     */
    constructor(context, maxSizeInBytes, isIdempotent, partitionKey, partitionId) {
        /**
         * Encoded amqp messages.
         */
        this._encodedMessages = [];
        /**
         * List of 'message' span contexts.
         */
        this._spanContexts = [];
        this._context = context;
        this._maxSizeInBytes = maxSizeInBytes;
        this._isIdempotent = isIdempotent;
        this._partitionKey = isDefined(partitionKey) ? String(partitionKey) : partitionKey;
        this._partitionId = isDefined(partitionId) ? String(partitionId) : partitionId;
        this._sizeInBytes = 0;
        this._count = 0;
    }
    /**
     * The maximum size of the batch, in bytes.
     * @readonly
     */
    get maxSizeInBytes() {
        return this._maxSizeInBytes;
    }
    /**
     * The partitionKey set during `EventDataBatch` creation. This value is hashed to
     * produce a partition assignment when the producer is created without a `partitionId`
     * @readonly
     */
    get partitionKey() {
        return this._partitionKey;
    }
    /**
     * The partitionId set during `EventDataBatch` creation.
     * If this value is set then partitionKey can not be set.
     * @readonly
     */
    get partitionId() {
        return this._partitionId;
    }
    /**
     * Size of the `EventDataBatch` instance after the events added to it have been
     * encoded into a single AMQP message.
     * @readonly
     */
    get sizeInBytes() {
        return this._sizeInBytes;
    }
    /**
     * Number of events in the `EventDataBatch` instance.
     * @readonly
     */
    get count() {
        return this._count;
    }
    /**
     * The publishing sequence number assigned to the first event in the batch at the time
     * the batch was successfully published.
     * If the producer was not configured to apply sequence numbering or if the batch
     * has not yet been successfully published, the value will be `undefined`.
     */
    get startingPublishedSequenceNumber() {
        return this._startingPublishSequenceNumber;
    }
    /**
     * Gets the "message" span contexts that were created when adding events to the batch.
     * @internal
     */
    get _messageSpanContexts() {
        return this._spanContexts;
    }
    /**
     * Generates an AMQP message that contains the provided encoded events and annotations.
     * @param encodedEvents - The already encoded events to include in the AMQP batch.
     * @param annotations - The message annotations to set on the batch.
     * @param publishingProps - Idempotent publishing properties used to decorate the events in the batch while sending.
     */
    _generateBatch(encodedEvents, annotations, publishingProps) {
        if (this._isIdempotent && publishingProps) {
            // We need to decode the encoded events, add the idempotent annotations, and re-encode them.
            // We can't lazily encode the events because we rely on `message.encode` to capture the
            // byte length of anything not in `event.body`.
            // Events can't be decorated ahead of time because the publishing properties aren't known
            // until the events are being sent to the service.
            const decodedEvents = encodedEvents.map(message.decode);
            const decoratedEvents = this._decorateRheaMessagesWithPublishingProps(decodedEvents, publishingProps);
            encodedEvents = decoratedEvents.map(message.encode);
        }
        const batchEnvelope = {
            body: message.data_sections(encodedEvents),
        };
        if (annotations) {
            batchEnvelope.message_annotations = annotations;
        }
        return message.encode(batchEnvelope);
    }
    /**
     * Uses the publishingProps to add idempotent properties as message annotations to rhea messages.
     */
    _decorateRheaMessagesWithPublishingProps(events, publishingProps) {
        if (!this._isIdempotent) {
            return events;
        }
        const { lastPublishedSequenceNumber = 0, ownerLevel, producerGroupId } = publishingProps;
        const startingSequenceNumber = lastPublishedSequenceNumber + 1;
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            populateIdempotentMessageAnnotations(event, {
                isIdempotentPublishingEnabled: this._isIdempotent,
                ownerLevel,
                producerGroupId,
                publishSequenceNumber: startingSequenceNumber + i,
            });
        }
        this._pendingStartingSequenceNumber = startingSequenceNumber;
        return events;
    }
    /**
     * Annotates a rhea message with placeholder idempotent properties if the batch is idempotent.
     * This is necessary so that we can accurately calculate the size of the batch while adding events.
     * Placeholder values are used because real values won't be known until we attempt to send the batch.
     */
    _decorateRheaMessageWithPlaceholderIdempotencyProps(event) {
        if (!this._isIdempotent) {
            return event;
        }
        if (!event.message_annotations) {
            event.message_annotations = {};
        }
        // Set placeholder values for these annotations.
        populateIdempotentMessageAnnotations(event, {
            isIdempotentPublishingEnabled: this._isIdempotent,
            ownerLevel: 0,
            publishSequenceNumber: 0,
            producerGroupId: 0,
        });
        return event;
    }
    /**
     * Generates the single AMQP message which is the result of encoding all the events
     * added into the `EventDataBatch` instance.
     *
     * This is not meant for the user to use directly.
     *
     * When the `EventDataBatch` instance is passed to the `send()` method on the `EventHubProducer`,
     * this single batched AMQP message is what gets sent over the wire to the service.
     * @readonly
     */
    _generateMessage(publishingProps) {
        return this._generateBatch(this._encodedMessages, this._batchAnnotations, publishingProps);
    }
    /**
     * Sets startingPublishSequenceNumber to the pending publish sequence number.
     */
    _commitPublish() {
        this._startingPublishSequenceNumber = this._pendingStartingSequenceNumber;
    }
    /**
     * Tries to add an event data to the batch if permitted by the batch's size limit.
     * **NOTE**: Always remember to check the return value of this method, before calling it again
     * for the next event.
     *
     * @param eventData -  An individual event data object.
     * @returns A boolean value indicating if the event data has been added to the batch or not.
     */
    tryAdd(eventData, options = {}) {
        throwTypeErrorIfParameterMissing(this._context.connectionId, "tryAdd", "eventData", eventData);
        if (!isAmqpAnnotatedMessage(eventData)) {
            assertIsEventData(eventData);
        }
        const { entityPath, host } = this._context.config;
        const { event: instrumentedEvent, spanContext } = instrumentEventData(eventData, options, entityPath, host);
        // Convert EventData to RheaMessage.
        const amqpMessage = toRheaMessage(instrumentedEvent, this._partitionKey);
        const originalAnnotations = amqpMessage.message_annotations && Object.assign({}, amqpMessage.message_annotations);
        this._decorateRheaMessageWithPlaceholderIdempotencyProps(amqpMessage);
        const encodedMessage = message.encode(amqpMessage);
        let currentSize = this._sizeInBytes;
        // The first time an event is added, we need to calculate
        // the overhead of creating an AMQP batch, including the
        // message_annotations that are taken from the 1st message.
        if (this.count === 0) {
            if (originalAnnotations) {
                this._batchAnnotations = originalAnnotations;
            }
            // Figure out the overhead of creating a batch by generating an empty batch
            // with the expected batch annotations.
            currentSize += this._generateBatch([], this._batchAnnotations).length;
        }
        const messageSize = encodedMessage.length;
        const messageOverhead = messageSize <= smallMessageMaxBytes ? smallMessageOverhead : largeMessageOverhead;
        currentSize += messageSize + messageOverhead;
        // Check if the size of the batch exceeds the maximum allowed size
        // once we add the new event to it.
        if (currentSize > this._maxSizeInBytes) {
            return false;
        }
        // The event will fit in the batch, so it is now safe to store it.
        this._encodedMessages.push(encodedMessage);
        if (spanContext) {
            this._spanContexts.push(spanContext);
        }
        this._sizeInBytes = currentSize;
        this._count++;
        return true;
    }
}
//# sourceMappingURL=eventDataBatch.js.map