import type { FullOperationResponse, OperationOptions } from "@azure/core-client";
import type { AtomXmlSerializer } from "../util/atomXmlHelper.js";
import type { AuthorizationRule, EntityStatus, EntityAvailabilityStatus } from "../util/utils.js";
/**
 * @internal
 * Builds the queue options object from the user provided options.
 * Handles the differences in casing for the property names,
 * converts values to string and ensures the right order as expected by the service
 */
export declare function buildQueueOptions(queue: CreateQueueOptions): InternalQueueOptions;
/**
 * @internal
 * Builds the queue object from the raw json object gotten after deserializing the
 * response from the service
 */
export declare function buildQueue(rawQueue: Record<string, any>): QueueProperties;
/**
 * @internal
 * Builds the queue runtime info object from the raw json object gotten after deserializing the
 * response from the service
 */
export declare function buildQueueRuntimeProperties(rawQueue: Record<string, any>): QueueRuntimeProperties;
/**
 * Represents settable options on a queue
 */
export interface CreateQueueOptions extends OperationOptions {
    /**
     * Determines the amount of time in seconds in which a message should be locked for
     * processing by a receiver. After this period, the message is unlocked and available
     * for consumption by the next receiver.
     * (If sessions are enabled, this lock duration is applicable for sessions and not for messages.)
     *
     * This is to be specified in ISO-8601 duration format
     * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
     *
     * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
     */
    lockDuration?: string;
    /**
     * Specifies the maximum queue size in megabytes. Any attempt to enqueue a message that
     * will cause the queue to exceed this value will fail.
     */
    maxSizeInMegabytes?: number;
    /**
     * The maximum message size in kilobytes for messages sent to this queue.
     *
     * (Configurable only for Premium Tier Service Bus namespace.)
     */
    maxMessageSizeInKilobytes?: number;
    /**
     * If enabled, the topic will detect duplicate messages within the time
     * span specified by the DuplicateDetectionHistoryTimeWindow property.
     * Settable only at queue creation time.
     */
    requiresDuplicateDetection?: boolean;
    /**
     * If set to true, the queue will be session-aware and only SessionReceiver
     * will be supported. Session-aware queues are not supported through REST.
     * Settable only at queue creation time.
     */
    requiresSession?: boolean;
    /**
     * Depending on whether DeadLettering is enabled, a message is automatically
     * moved to the dead-letter sub-queue or deleted if it has been stored in the
     * queue for longer than the specified time.
     * This value is overwritten by a TTL specified on the message
     * if and only if the message TTL is smaller than the TTL set on the queue.
     * This value is immutable after the Queue has been created.
     * This is to be specified in ISO-8601 duration format
     * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
     *
     * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
     */
    defaultMessageTimeToLive?: string;
    /**
     * If it is enabled and a message expires, the Service Bus moves the message
     * from the queue into the queue’s dead-letter sub-queue. If disabled,
     * message will be permanently deleted from the queue.
     * Settable only at queue creation time.
     */
    deadLetteringOnMessageExpiration?: boolean;
    /**
     * Specifies the time span during which the Service Bus detects message duplication.
     * This is to be specified in ISO-8601 duration format
     * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
     *
     * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
     */
    duplicateDetectionHistoryTimeWindow?: string;
    /**
     * The maximum delivery count of messages after which if it is still not settled,
     * gets moved to the dead-letter sub-queue.
     */
    maxDeliveryCount?: number;
    /**
     * Specifies if batched operations should be allowed.
     */
    enableBatchedOperations?: boolean;
    /**
     * Authorization rules on the queue
     */
    authorizationRules?: AuthorizationRule[];
    /**
     * Status of the messaging entity.
     */
    status?: EntityStatus;
    /**
     * Absolute URL or the name of the queue or topic the
     * messages are to be forwarded to.
     * For example, an absolute URL input would be of the form
     * `sb://<your-service-bus-namespace-endpoint>/<queue-or-topic-name>`
     */
    forwardTo?: string;
    /**
     * The user provided metadata information associated with the queue.
     * Used to specify textual content such as tags, labels, etc.
     * Value must not exceed 1024 bytes encoded in utf-8.
     */
    userMetadata?: string;
    /**
     * Max idle time before entity is deleted.
     * This is to be specified in ISO-8601 duration format
     * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
     *
     * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
     */
    autoDeleteOnIdle?: string;
    /**
     * Specifies whether the queue should be partitioned.
     */
    enablePartitioning?: boolean;
    /**
     * Absolute URL or the name of the queue or topic the dead-lettered
     * messages are to be forwarded to.
     * For example, an absolute URL input would be of the form
     * `sb://<your-service-bus-namespace-endpoint>/<queue-or-topic-name>`
     */
    forwardDeadLetteredMessagesTo?: string;
    /**
     * Specifies whether express entities are enabled on queue.
     */
    enableExpress?: boolean;
    /**
     * Availability status of the messaging entity.
     */
    availabilityStatus?: EntityAvailabilityStatus;
}
/**
 * Represents the input for updateQueue.
 *
 */
export interface QueueProperties {
    /**
     * Name of the queue
     */
    readonly name: string;
    /**
     * Determines the amount of time in seconds in which a message should be locked for
     * processing by a receiver. After this period, the message is unlocked and available
     * for consumption by the next receiver.
     * (If sessions are enabled, this lock duration is applicable for sessions and not for messages.)
     *
     * This is to be specified in ISO-8601 duration format
     * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
     *
     * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
     */
    lockDuration: string;
    /**
     * Specifies the maximum queue size in megabytes. Any attempt to enqueue a message that
     * will cause the queue to exceed this value will fail.
     */
    maxSizeInMegabytes: number;
    /**
     * The maximum message size in kilobytes for messages sent to this queue.
     *
     * Not applicable if service version "2017-04" is chosen when creating the `ServiceBusAdministrationClient`.
     */
    maxMessageSizeInKilobytes?: number;
    /**
     * If enabled, the topic will detect duplicate messages within the time
     * span specified by the DuplicateDetectionHistoryTimeWindow property.
     * Settable only at queue creation time.
     */
    readonly requiresDuplicateDetection: boolean;
    /**
     * If set to true, the queue will be session-aware and only SessionReceiver
     * will be supported. Session-aware queues are not supported through REST.
     * Settable only at queue creation time.
     */
    readonly requiresSession: boolean;
    /**
     * Depending on whether DeadLettering is enabled, a message is automatically
     * moved to the dead-letter sub-queue or deleted if it has been stored in the
     * queue for longer than the specified time.
     * This value is overwritten by a TTL specified on the message
     * if and only if the message TTL is smaller than the TTL set on the queue.
     * This value is immutable after the Queue has been created.
     * This is to be specified in ISO-8601 duration format
     * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
     *
     * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
     */
    defaultMessageTimeToLive: string;
    /**
     * If it is enabled and a message expires, the Service Bus moves the message
     * from the queue into the queue’s dead-letter sub-queue. If disabled,
     * message will be permanently deleted from the queue.
     * Settable only at queue creation time.
     */
    deadLetteringOnMessageExpiration: boolean;
    /**
     * Specifies the time span during which the Service Bus detects message duplication.
     * This is to be specified in ISO-8601 duration format
     * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
     *
     * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
     */
    duplicateDetectionHistoryTimeWindow: string;
    /**
     * The maximum delivery count of messages after which if it is still not settled,
     * gets moved to the dead-letter sub-queue.
     */
    maxDeliveryCount: number;
    /**
     * Specifies if batched operations should be allowed.
     */
    enableBatchedOperations: boolean;
    /**
     * Authorization rules on the queue
     */
    authorizationRules?: AuthorizationRule[];
    /**
     * Status of the messaging entity.
     */
    status: EntityStatus;
    /**
     * Absolute URL or the name of the queue or topic the
     * messages are to be forwarded to.
     * For example, an absolute URL input would be of the form
     * `sb://<your-service-bus-namespace-endpoint>/<queue-or-topic-name>`
     */
    forwardTo?: string;
    /**
     * The user provided metadata information associated with the queue.
     * Used to specify textual content such as tags, labels, etc.
     * Value must not exceed 1024 bytes encoded in utf-8.
     */
    userMetadata: string;
    /**
     * Max idle time before entity is deleted.
     * This is to be specified in ISO-8601 duration format
     * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
     *
     * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
     */
    autoDeleteOnIdle: string;
    /**
     * Specifies whether the queue should be partitioned.
     */
    readonly enablePartitioning: boolean;
    /**
     * Absolute URL or the name of the queue or topic the dead-lettered
     * messages are to be forwarded to.
     * For example, an absolute URL input would be of the form
     * `sb://<your-service-bus-namespace-endpoint>/<queue-or-topic-name>`
     */
    forwardDeadLetteredMessagesTo?: string;
    /**
     * Specifies whether express entities are enabled on queue.
     */
    readonly enableExpress: boolean;
    /**
     * Availability status of the messaging entity.
     */
    readonly availabilityStatus: EntityAvailabilityStatus;
}
/**
 * @internal
 * Internal representation of settable options on a queue
 */
export interface InternalQueueOptions {
    /**
     * Determines the amount of time in seconds in which a message should be locked for
     * processing by a receiver. After this period, the message is unlocked and
     * can be consumed by the next receiver.
     * (If sessions are enabled, this lock duration is applicable for sessions and not for messages.)
     *
     * This is to be specified in ISO-8601 duration format
     * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
     *
     * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
     */
    LockDuration?: string;
    /**
     * The max size in MegaBytes
     *
     */
    MaxSizeInMegabytes?: string;
    /**
     * The maximum message size in kilobytes for messages sent to this queue/topic.
     */
    MaxMessageSizeInKilobytes?: string;
    /**
     *  If enabled, the topic will detect duplicate messages within the time
     * span specified by the DuplicateDetectionHistoryTimeWindow property.
     * Settable only at queue creation time.
     */
    RequiresDuplicateDetection?: string;
    /**
     * If set to true, the queue will be session-aware and only SessionReceiver
     * will be supported. Session-aware queues are not supported through REST.
     * Settable only at queue creation time.
     */
    RequiresSession?: string;
    /**
     * Depending on whether DeadLettering is enabled, a message is automatically moved to
     * the DeadLetterQueue or deleted if it has been stored in the queue for longer than
     * the specified time. This value is overwritten by a TTL specified on the message
     * if and only if the message TTL is smaller than the TTL set on the queue.
     * This value is immutable after the Queue has been created.
     * This is to be specified in ISO-8601 duration format
     * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
     *
     * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
     */
    DefaultMessageTimeToLive?: string;
    /**
     * If it is enabled and a message expires, the Service Bus moves the message
     * from the queue into the queue’s dead-letter sub-queue. If disabled,
     * message will be permanently deleted from the queue.
     * Settable only at queue creation time.
     */
    DeadLetteringOnMessageExpiration?: string;
    /**
     * Specifies the time span during which the Service Bus detects message duplication.
     * This is to be specified in ISO-8601 duration format
     * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
     *
     * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
     */
    DuplicateDetectionHistoryTimeWindow?: string;
    /**
     * The maximum delivery count of messages after which if it is still not settled,
     * gets moved to the dead-letter sub-queue.
     *
     */
    MaxDeliveryCount?: string;
    /**
     * Specifies if batched operations should be allowed.
     */
    EnableBatchedOperations?: string;
    /**
     * Authorization rules on the queue
     */
    AuthorizationRules?: any;
    /**
     * Status of the messaging entity.
     */
    Status?: string;
    /**
     * Absolute URL or the name of the queue or topic the
     * messages are to be forwarded to.
     * For example, an absolute URL input would be of the form
     * `sb://<your-service-bus-namespace-endpoint>/<queue-or-topic-name>`
     */
    ForwardTo?: string;
    /**
     * The user provided metadata information associated with the queue.
     * Used to specify textual content such as tags, labels, etc.
     * Value must not exceed 1024 bytes encoded in utf-8.
     */
    UserMetadata?: string;
    /**
     * Max idle time before entity is deleted.
     * This is to be specified in ISO-8601 duration format
     * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
     *
     * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
     */
    AutoDeleteOnIdle?: string;
    /**
     * Specifies whether the queue should be partitioned.
     */
    EnablePartitioning?: string;
    /**
     * Absolute URL or the name of the queue or topic the dead-lettered
     * messages are to be forwarded to.
     * For example, an absolute URL input would be of the form
     * `sb://<your-service-bus-namespace-endpoint>/<queue-or-topic-name>`
     */
    ForwardDeadLetteredMessagesTo?: string;
    /**
     * Specifies whether express entities are enabled on queue.
     */
    EnableExpress?: string;
    /**
     * Availability status of the messaging entity.
     */
    EntityAvailabilityStatus?: string;
}
/**
 * Represents runtime info attributes of a queue entity
 */
export interface QueueRuntimeProperties {
    /**
     * Name of the queue
     */
    name: string;
    /**
     * Created at timestamp
     */
    createdAt: Date;
    /**
     * Updated at timestamp
     */
    modifiedAt: Date;
    /**
     * Accessed at timestamp
     */
    accessedAt: Date;
    /**
     * The entity's message count.
     *
     */
    totalMessageCount?: number;
    /**
     * The number of active messages in the queue.
     */
    activeMessageCount: number;
    /**
     * The number of messages that have been dead lettered.
     */
    deadLetterMessageCount: number;
    /**
     * The number of scheduled messages.
     */
    scheduledMessageCount: number;
    /**
     * The number of messages transferred to another queue, topic, or subscription
     */
    transferMessageCount: number;
    /**
     * The number of messages transferred to the dead letter queue.
     */
    transferDeadLetterMessageCount: number;
    /**
     * The entity's size in bytes.
     *
     */
    sizeInBytes?: number;
}
/**
 * @internal
 * Atom XML Serializer for Queues.
 */
export declare class QueueResourceSerializer implements AtomXmlSerializer {
    serialize(resource: InternalQueueOptions): Record<string, unknown>;
    deserialize(response: FullOperationResponse): Promise<FullOperationResponse>;
}
//# sourceMappingURL=queueResourceSerializer.d.ts.map