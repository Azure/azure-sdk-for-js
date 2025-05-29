// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { toRheaMessage } from "./serviceBusMessage.js";
import { errorInvalidMessageTypeSingle, throwIfNotValidServiceBusMessage, throwTypeErrorIfParameterMissing, } from "./util/errors.js";
import { messageProperties as RheaMessagePropertiesList, message as RheaMessageUtil, } from "rhea-promise";
import { defaultDataTransformer } from "./dataTransformer.js";
import { instrumentMessage } from "./diagnostics/instrumentServiceBusMessage.js";
/**
 * @internal
 * The amount of bytes to reserve as overhead for a small message.
 */
const smallMessageOverhead = 5;
/**
 * @internal
 * The amount of bytes to reserve as overhead for a large message.
 */
const largeMessageOverhead = 8;
/**
 * @internal
 * The maximum number of bytes that a message may be to be considered small.
 */
const smallMessageMaxBytes = 255;
/**
 * An internal class representing a batch of messages which can be used to send messages to Service Bus.
 *
 * @internal
 */
export class ServiceBusMessageBatchImpl {
    /**
     * ServiceBusMessageBatch should not be constructed using `new ServiceBusMessageBatch()`
     * Use the `createBatch()` method on your `Sender` instead.
     * @internal
     * @hidden
     */
    constructor(_context, _maxSizeInBytes) {
        this._context = _context;
        this._maxSizeInBytes = _maxSizeInBytes;
        /**
         * Encoded amqp messages.
         */
        this._encodedMessages = [];
        /**
         * List of 'message' span contexts.
         */
        this._spanContexts = [];
        this._sizeInBytes = 0;
        this._batchMessageProperties = {};
    }
    /**
     * The maximum size of the batch, in bytes.
     * @readonly
     */
    get maxSizeInBytes() {
        return this._maxSizeInBytes;
    }
    /**
     * Size of the `ServiceBusMessageBatch` instance after the messages added to it have been
     * encoded into a single AMQP message.
     * @readonly
     */
    get sizeInBytes() {
        return this._sizeInBytes;
    }
    /**
     * Number of messages in the `ServiceBusMessageBatch` instance.
     * @readonly
     */
    get count() {
        return this._encodedMessages.length;
    }
    /**
     * Gets the "message" span contexts that were created when adding messages to the batch.
     * @internal
     * @hidden
     */
    get _messageSpanContexts() {
        return this._spanContexts;
    }
    /**
     * Generates an AMQP message that contains the provided encoded messages and annotations.
     *
     * @param encodedMessages - The already encoded messages to include in the AMQP batch.
     * @param annotations - The message annotations to set on the batch.
     * @param applicationProperties - The application properties to set on the batch.
     * @param messageProperties - The message properties to set on the batch.
     */
    _generateBatch(encodedMessages, annotations, applicationProperties, messageProperties) {
        const batchEnvelope = {
            body: RheaMessageUtil.data_sections(encodedMessages),
            message_annotations: annotations,
            application_properties: applicationProperties,
        };
        if (messageProperties) {
            for (const prop of RheaMessagePropertiesList) {
                if (messageProperties[prop]) {
                    batchEnvelope[prop] = messageProperties[prop];
                }
            }
        }
        return RheaMessageUtil.encode(batchEnvelope);
    }
    /**
     * Represents the single AMQP message which is the result of encoding all the events
     * added into the `ServiceBusMessageBatch` instance.
     *
     * This is not meant for the user to use directly.
     *
     * When the `ServiceBusMessageBatch` instance is passed to the `sendBatch()` method on the `Sender`,
     * this single batched AMQP message is what gets sent over the wire to the service.
     * @readonly
     */
    _generateMessage() {
        return this._generateBatch(this._encodedMessages, this._batchAnnotations, this._batchApplicationProperties, this._batchMessageProperties);
    }
    /**
     * Tries to add a message to the batch if permitted by the batch's size limit.
     * **NOTE**: Always remember to check the return value of this method, before calling it again
     * for the next message.
     *
     * @param originalMessage - An individual service bus message.
     * @returns A boolean value indicating if the message has been added to the batch or not.
     */
    tryAddMessage(originalMessage, options = {}) {
        throwTypeErrorIfParameterMissing(this._context.connectionId, "message", originalMessage);
        throwIfNotValidServiceBusMessage(originalMessage, errorInvalidMessageTypeSingle);
        const { message, spanContext } = instrumentMessage(originalMessage, options, this._context.config.entityPath, this._context.config.host, "publish");
        // Convert ServiceBusMessage to AmqpMessage.
        const amqpMessage = toRheaMessage(message, defaultDataTransformer);
        const encodedMessage = RheaMessageUtil.encode(amqpMessage);
        let currentSize = this._sizeInBytes;
        // The first time an event is added, we need to calculate
        // the overhead of creating an AMQP batch, including the
        // message_annotations, application_properties and message_properties
        // that are taken from the 1st message.
        if (this.count === 0) {
            if (amqpMessage.message_annotations) {
                this._batchAnnotations = amqpMessage.message_annotations;
            }
            if (amqpMessage.application_properties) {
                this._batchApplicationProperties = amqpMessage.application_properties;
            }
            for (const prop of RheaMessagePropertiesList) {
                if (amqpMessage[prop]) {
                    this._batchMessageProperties[prop] = amqpMessage[prop];
                }
            }
            // Figure out the overhead of creating a batch by generating an empty batch
            // with the expected batch annotations.
            currentSize += this._generateBatch([], this._batchAnnotations, this._batchApplicationProperties, this._batchMessageProperties).length;
        }
        const messageSize = encodedMessage.length;
        const messageOverhead = messageSize <= smallMessageMaxBytes ? smallMessageOverhead : largeMessageOverhead;
        currentSize += messageSize + messageOverhead;
        // Check if the size of the batch exceeds the maximum allowed size
        // once we add the new event to it.
        if (currentSize > this._maxSizeInBytes) {
            return false;
        }
        // The message will fit in the batch, so it is now safe to store it.
        this._encodedMessages.push(encodedMessage);
        if (spanContext) {
            this._spanContexts.push(spanContext);
        }
        this._sizeInBytes = currentSize;
        return true;
    }
}
//# sourceMappingURL=serviceBusMessageBatch.js.map