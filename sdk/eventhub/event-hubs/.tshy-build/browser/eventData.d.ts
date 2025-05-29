import { AmqpAnnotatedMessage } from "@azure/core-amqp";
import type { DeliveryAnnotations, MessageAnnotations, Message as RheaMessage } from "rhea-promise";
import type { PENDING_PUBLISH_SEQ_NUM_SYMBOL } from "./util/constants.js";
/**
 * Describes the delivery annotations.
 * @internal
 */
export interface EventHubDeliveryAnnotations extends DeliveryAnnotations {
    /**
     * The offset of the last event.
     */
    last_enqueued_offset?: string;
    /**
     * The sequence number of the last event.
     */
    last_enqueued_sequence_number?: number;
    /**
     * The enqueued time of the last event.
     */
    last_enqueued_time_utc?: number;
    /**
     * The retrieval time of the last event.
     */
    runtime_info_retrieval_time_utc?: number;
    /**
     * Any unknown delivery annotations.
     */
    [x: string]: any;
}
/**
 * Map containing message attributes that will be held in the message header.
 * @internal
 */
export interface EventHubMessageAnnotations extends MessageAnnotations {
    /**
     * Annotation for the partition key set for the event.
     */
    "x-opt-partition-key"?: string | null;
    /**
     * Annotation for the sequence number of the event.
     */
    "x-opt-sequence-number"?: number;
    /**
     * Annotation for the enqueued time of the event.
     */
    "x-opt-enqueued-time"?: number;
    /**
     * Annotation for the offset of the event.
     */
    "x-opt-offset"?: string;
    /**
     * Any other annotation that can be added to the message.
     */
    [x: string]: any;
}
/**
 * Describes the structure of an event to be sent or received from the EventHub.
 * @internal
 */
export interface EventDataInternal {
    /**
     * The message body that needs to be sent or is received.
     */
    body: any;
    /**
     * The enqueued time of the event.
     */
    enqueuedTimeUtc?: Date;
    /**
     * If specified EventHub will hash this to a partitionId.
     * It guarantees that messages end up in a specific partition on the event hub.
     */
    partitionKey?: string | null;
    /**
     * The offset of the event.
     */
    offset?: string;
    /**
     * The sequence number of the event.
     */
    sequenceNumber?: number;
    /**
     * The application specific properties.
     */
    properties?: {
        [property: string]: any;
    };
    /**
     * The last sequence number of the event within the partition stream of the Event Hub.
     */
    lastSequenceNumber?: number;
    /**
     * The offset of the last enqueued event.
     */
    lastEnqueuedOffset?: string;
    /**
     * The enqueued UTC time of the last event.
     */
    lastEnqueuedTime?: Date;
    /**
     * The time when the runtime info was retrieved
     */
    retrievalTime?: Date;
    /**
     * The properties set by the service.
     */
    systemProperties?: {
        [property: string]: any;
    };
    /**
     * The content type of the message. Optionally describes
     * the payload of the message, with a descriptor following the format of RFC2045, Section 5, for
     * example "application/json".
     */
    contentType?: string;
    /**
     * The correlation identifier that allows an
     * application to specify a context for the message for the purposes of correlation, for example
     * reflecting the MessageId of a message that is being replied to.
     */
    correlationId?: string | number | Buffer;
    /**
     * The message identifier is an
     * application-defined value that uniquely identifies the message and its payload.
     *
     * Note: Numbers that are not whole integers are not allowed.
     */
    messageId?: string | number | Buffer;
    /**
     * Returns the underlying raw amqp message.
     */
    getRawAmqpMessage(): AmqpAnnotatedMessage;
    /**
     * The pending publish sequence number, set while the event
     * is being published with idempotent partitions enabled.
     */
    [PENDING_PUBLISH_SEQ_NUM_SYMBOL]?: number;
    /**
     * The sequence number the event was published with
     * when idempotent partitions are enabled.
     */
    _publishedSequenceNumber?: number;
}
/**
 * Converts the AMQP message to an EventData.
 * @param msg - The AMQP message that needs to be converted to EventData.
 * @param skipParsingBodyAsJson - Boolean to skip running JSON.parse() on message body when body type is `content`.
 * @internal
 */
export declare function fromRheaMessage(msg: RheaMessage, skipParsingBodyAsJson: boolean): EventDataInternal;
/**
 * Converts an EventData object to an AMQP message.
 * @param data - The EventData object that needs to be converted to an AMQP message.
 * @param partitionKey - An optional key to determine the partition that this event should land in.
 * @internal
 */
export declare function toRheaMessage(data: EventData | AmqpAnnotatedMessage, partitionKey?: string): RheaMessage;
/**
 * The interface that describes the data to be sent to Event Hub.
 * Use this as a reference when creating the object to be sent when using the `EventHubProducerClient`.
 * For example, `{ body: "your-data" }` or
 * ```
 * {
 *    body: "your-data",
 *    properties: {
 *       propertyName: "property value"
 *    }
 * }
 * ```
 */
export interface EventData {
    /**
     * The message body that needs to be sent.
     * If the application reading the events is not using this SDK,
     * convert your body payload to a byte array or Buffer for better
     * cross-language compatibility.
     */
    body: any;
    /**
     * The content type of the message. Optionally describes
     * the payload of the message, with a descriptor following the format of RFC2045, Section 5, for
     * example "application/json".
     */
    contentType?: string;
    /**
     * The correlation identifier that allows an
     * application to specify a context for the message for the purposes of correlation, for example
     * reflecting the MessageId of a message that is being replied to.
     */
    correlationId?: string | number | Buffer;
    /**
     * The message identifier is an
     * application-defined value that uniquely identifies the message and its payload.
     *
     * Note: Numbers that are not whole integers are not allowed.
     */
    messageId?: string | number | Buffer;
    /**
     * Set of key value pairs that can be used to set properties specific to user application.
     */
    properties?: {
        [key: string]: any;
    };
}
/**
 * Asserts that the provided data conforms to the `EventData` interface.
 *
 * This function performs runtime checks on the `data` object to ensure it matches the expected
 * structure and types defined in the `EventData` interface. If any of the checks fail, it throws
 * an error with a descriptive message indicating the mismatch.
 *
 * @param data - The data object to validate as `EventData`.
 * @throws \{Error\} Throws an error if the data does not conform to the `EventData` interface.
 */
export declare function assertIsEventData(data: any): asserts data is EventData;
/**
 * The interface that describes the structure of the event received from Event Hub.
 * Use this as a reference when creating the `processEvents` function to process the events
 * received from an Event Hub when using the `EventHubConsumerClient`.
 */
export interface ReceivedEventData {
    /**
     * The message body that needs to be sent or is received.
     */
    body: any;
    /**
     * The application specific properties.
     */
    properties?: {
        [key: string]: any;
    };
    /**
     * The enqueued time of the event.
     */
    enqueuedTimeUtc: Date;
    /**
     * When specified Event Hub will hash this to a partitionId.
     * It guarantees that messages end up in a specific partition on the event hub.
     */
    partitionKey: string | null;
    /**
     * The offset of the event.
     */
    offset: string;
    /**
     * The sequence number of the event.
     */
    sequenceNumber: number;
    /**
     * The properties set by the service.
     */
    systemProperties?: {
        [key: string]: any;
    };
    /**
     * The content type of the message. Optionally describes
     * the payload of the message, with a descriptor following the format of RFC2045, Section 5, for
     * example "application/json".
     */
    contentType?: string;
    /**
     * The correlation identifier that allows an
     * application to specify a context for the message for the purposes of correlation, for example
     * reflecting the MessageId of a message that is being replied to.
     */
    correlationId?: string | number | Buffer;
    /**
     * The message identifier is an
     * application-defined value that uniquely identifies the message and its payload.
     */
    messageId?: string | number | Buffer;
    /**
     * Returns the underlying raw amqp message.
     */
    getRawAmqpMessage(): AmqpAnnotatedMessage;
}
/**
 * @internal
 */
export declare function isAmqpAnnotatedMessage(possible: unknown): possible is AmqpAnnotatedMessage;
/**
 * @internal
 */
export interface PopulateIdempotentMessageAnnotationsParameters {
    isIdempotentPublishingEnabled: boolean;
    ownerLevel?: number;
    producerGroupId?: number;
    publishSequenceNumber?: number;
}
/**
 * Populates a rhea message with idempotent producer properties.
 * @internal
 */
export declare function populateIdempotentMessageAnnotations(rheaMessage: RheaMessage, { isIdempotentPublishingEnabled, ownerLevel, producerGroupId, publishSequenceNumber, }: PopulateIdempotentMessageAnnotationsParameters): void;
//# sourceMappingURL=eventData.d.ts.map