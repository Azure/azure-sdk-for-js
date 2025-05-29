import type { ServiceBusMessage } from "./serviceBusMessage.js";
import type { ConnectionContext } from "./connectionContext.js";
import type { TracingContext } from "@azure/core-tracing";
import type { TryAddOptions } from "./modelsToBeSharedWithEventHubs.js";
import type { AmqpAnnotatedMessage } from "@azure/core-amqp";
/**
 * A batch of messages that you can create using the {@link createBatch} method.
 *
 */
export interface ServiceBusMessageBatch {
    /**
     * Size of the batch in bytes after the events added to it have been encoded into a single AMQP
     * message.
     * @readonly
     */
    readonly sizeInBytes: number;
    /**
     * Number of messages added to the batch.
     * @readonly
     */
    readonly count: number;
    /**
     * The maximum size of the batch, in bytes. The `tryAddMessage` function on the batch will return `false`
     * if the message being added causes the size of the batch to exceed this limit. Use the `createMessageBatch()` method on
     * the `Sender` to set the maxSizeInBytes.
     * @readonly
     */
    readonly maxSizeInBytes: number;
    /**
     * Adds a message to the batch if permitted by the batch's size limit.
     * **NOTE**: Always remember to check the return value of this method, before calling it again
     * for the next event.
     *
     * @param message - The message to add to the batch.
     * @returns A boolean value indicating if the message has been added to the batch or not.
     */
    tryAddMessage(message: ServiceBusMessage | AmqpAnnotatedMessage, options?: TryAddOptions): boolean;
    /**
     * The AMQP message containing encoded events that were added to the batch.
     * Used internally by the `sendBatch()` method on the `Sender`.
     * This is not meant for the user to use directly.
     *
     * @readonly
     * @internal
     * @hidden
     */
    _generateMessage(): Buffer;
    /**
     * Gets the "message" span contexts that were created when adding events to the batch.
     * Used internally by the `sendBatch()` method to set up the right spans in traces if tracing is enabled.
     * @internal
     * @hidden
     */
    readonly _messageSpanContexts: TracingContext[];
}
/**
 * An internal class representing a batch of messages which can be used to send messages to Service Bus.
 *
 * @internal
 */
export declare class ServiceBusMessageBatchImpl implements ServiceBusMessageBatch {
    private _context;
    private _maxSizeInBytes;
    /**
     * Current size of the batch in bytes.
     */
    private _sizeInBytes;
    /**
     * Encoded amqp messages.
     */
    private _encodedMessages;
    /**
     * List of 'message' span contexts.
     */
    private _spanContexts;
    /**
     * ServiceBusMessageBatch should not be constructed using `new ServiceBusMessageBatch()`
     * Use the `createBatch()` method on your `Sender` instead.
     * @internal
     * @hidden
     */
    constructor(_context: ConnectionContext, _maxSizeInBytes: number);
    /**
     * The maximum size of the batch, in bytes.
     * @readonly
     */
    get maxSizeInBytes(): number;
    /**
     * Size of the `ServiceBusMessageBatch` instance after the messages added to it have been
     * encoded into a single AMQP message.
     * @readonly
     */
    get sizeInBytes(): number;
    /**
     * Number of messages in the `ServiceBusMessageBatch` instance.
     * @readonly
     */
    get count(): number;
    /**
     * Gets the "message" span contexts that were created when adding messages to the batch.
     * @internal
     * @hidden
     */
    get _messageSpanContexts(): TracingContext[];
    /**
     * Generates an AMQP message that contains the provided encoded messages and annotations.
     *
     * @param encodedMessages - The already encoded messages to include in the AMQP batch.
     * @param annotations - The message annotations to set on the batch.
     * @param applicationProperties - The application properties to set on the batch.
     * @param messageProperties - The message properties to set on the batch.
     */
    private _generateBatch;
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
    _generateMessage(): Buffer;
    /**
     * The message annotations to apply on the batch envelope.
     * This will reflect the message annotations on the first message
     * that was added to the batch.
     */
    private _batchAnnotations?;
    /**
     * The message properties to apply on the batch envelope.
     * This will reflect the message properties on the first message
     * that was added to the batch.
     */
    private _batchMessageProperties?;
    /**
     * The application properties to apply on the batch envelope.
     * This will reflect the application properties on the first message
     * that was added to the batch.
     */
    private _batchApplicationProperties?;
    /**
     * Tries to add a message to the batch if permitted by the batch's size limit.
     * **NOTE**: Always remember to check the return value of this method, before calling it again
     * for the next message.
     *
     * @param originalMessage - An individual service bus message.
     * @returns A boolean value indicating if the message has been added to the batch or not.
     */
    tryAddMessage(originalMessage: ServiceBusMessage | AmqpAnnotatedMessage, options?: TryAddOptions): boolean;
}
//# sourceMappingURL=serviceBusMessageBatch.d.ts.map