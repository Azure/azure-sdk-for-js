// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { FullOperationResponse, OperationOptions } from "@azure/core-client";
import {
  AtomXmlSerializer,
  deserializeAtomXmlResponse,
  serializeToAtomXmlRequest,
} from "../util/atomXmlHelper";
import * as Constants from "../util/constants";
import {
  AuthorizationRule,
  getAuthorizationRulesOrUndefined,
  getBoolean,
  getMessageCountDetails,
  getInteger,
  getIntegerOrUndefined,
  getRawAuthorizationRules,
  getString,
  getStringOrUndefined,
  getDate,
  EntityStatus,
  EntityAvailabilityStatus,
} from "../util/utils";

/**
 * @internal
 * Builds the queue options object from the user provided options.
 * Handles the differences in casing for the property names,
 * converts values to string and ensures the right order as expected by the service
 */
export function buildQueueOptions(queue: CreateQueueOptions): InternalQueueOptions {
  return {
    // NOTE: this ordering is extremely important. As an example, misordering of the ForwardTo property
    // resulted in a customer bug where the Forwarding attributes appeared to be set but the portal was
    // not picking up on it.
    //
    // The authority on this ordering is here:
    // https://github.com/Azure/azure-sdk-for-net/blob/8af2dfc32c96ef3e340f9d20013bf588d97ea756/sdk/servicebus/Azure.Messaging.ServiceBus/src/Administration/QueuePropertiesExtensions.cs#L20

    LockDuration: queue.lockDuration,
    MaxSizeInMegabytes: getStringOrUndefined(queue.maxSizeInMegabytes),
    RequiresDuplicateDetection: getStringOrUndefined(queue.requiresDuplicateDetection),
    RequiresSession: getStringOrUndefined(queue.requiresSession),
    DefaultMessageTimeToLive: queue.defaultMessageTimeToLive,
    DeadLetteringOnMessageExpiration: getStringOrUndefined(queue.deadLetteringOnMessageExpiration),
    DuplicateDetectionHistoryTimeWindow: queue.duplicateDetectionHistoryTimeWindow,
    MaxDeliveryCount: getStringOrUndefined(queue.maxDeliveryCount),
    EnableBatchedOperations: getStringOrUndefined(queue.enableBatchedOperations),
    AuthorizationRules: getRawAuthorizationRules(queue.authorizationRules),
    Status: getStringOrUndefined(queue.status),
    ForwardTo: getStringOrUndefined(queue.forwardTo),
    UserMetadata: getStringOrUndefined(queue.userMetadata),
    AutoDeleteOnIdle: getStringOrUndefined(queue.autoDeleteOnIdle),
    EnablePartitioning: getStringOrUndefined(queue.enablePartitioning),
    ForwardDeadLetteredMessagesTo: getStringOrUndefined(queue.forwardDeadLetteredMessagesTo),
    EntityAvailabilityStatus: getStringOrUndefined(queue.availabilityStatus),
    EnableExpress: getStringOrUndefined(queue.enableExpress),
    MaxMessageSizeInKilobytes: getStringOrUndefined(queue.maxMessageSizeInKilobytes),
  };
}

/**
 * @internal
 * Builds the queue object from the raw json object gotten after deserializing the
 * response from the service
 */
export function buildQueue(rawQueue: Record<string, any>): QueueProperties {
  return {
    name: getString(rawQueue[Constants.QUEUE_NAME], "queueName"),

    forwardTo: getStringOrUndefined(rawQueue[Constants.FORWARD_TO]),
    userMetadata: rawQueue[Constants.USER_METADATA],

    lockDuration: getString(rawQueue[Constants.LOCK_DURATION], "lockDuration"),
    maxSizeInMegabytes: getInteger(rawQueue[Constants.MAX_SIZE_IN_MEGABYTES], "maxSizeInMegabytes"),

    maxDeliveryCount: getInteger(rawQueue[Constants.MAX_DELIVERY_COUNT], "maxDeliveryCount"),

    enablePartitioning: getBoolean(rawQueue[Constants.ENABLE_PARTITIONING], "enablePartitioning"),
    requiresSession: getBoolean(rawQueue[Constants.REQUIRES_SESSION], "requiresSession"),
    enableBatchedOperations: getBoolean(
      rawQueue[Constants.ENABLE_BATCHED_OPERATIONS],
      "enableBatchedOperations"
    ),

    defaultMessageTimeToLive: getString(
      rawQueue[Constants.DEFAULT_MESSAGE_TIME_TO_LIVE],
      "defaultMessageTimeToLive"
    ),
    autoDeleteOnIdle: rawQueue[Constants.AUTO_DELETE_ON_IDLE],

    requiresDuplicateDetection: getBoolean(
      rawQueue[Constants.REQUIRES_DUPLICATE_DETECTION],
      "requiresDuplicateDetection"
    ),
    duplicateDetectionHistoryTimeWindow: getString(
      rawQueue[Constants.DUPLICATE_DETECTION_HISTORY_TIME_WINDOW],
      "duplicateDetectionHistoryTimeWindow"
    ),
    deadLetteringOnMessageExpiration: getBoolean(
      rawQueue[Constants.DEAD_LETTERING_ON_MESSAGE_EXPIRATION],
      "deadLetteringOnMessageExpiration"
    ),
    forwardDeadLetteredMessagesTo: getStringOrUndefined(
      rawQueue[Constants.FORWARD_DEADLETTERED_MESSAGES_TO]
    ),

    authorizationRules: getAuthorizationRulesOrUndefined(rawQueue[Constants.AUTHORIZATION_RULES]),

    status: rawQueue[Constants.STATUS],

    enableExpress: getBoolean(rawQueue[Constants.ENABLE_EXPRESS], "enableExpress"),

    availabilityStatus: rawQueue[Constants.ENTITY_AVAILABILITY_STATUS],

    maxMessageSizeInKilobytes: getIntegerOrUndefined(
      rawQueue[Constants.MAX_MESSAGE_SIZE_IN_KILOBYTES]
    ),
  };
}

/**
 * @internal
 * Builds the queue runtime info object from the raw json object gotten after deserializing the
 * response from the service
 */
export function buildQueueRuntimeProperties(rawQueue: Record<string, any>): QueueRuntimeProperties {
  const messageCountDetails = getMessageCountDetails(rawQueue[Constants.COUNT_DETAILS]);
  return {
    name: getString(rawQueue[Constants.QUEUE_NAME], "queueName"),
    sizeInBytes: getIntegerOrUndefined(rawQueue[Constants.SIZE_IN_BYTES]),
    totalMessageCount: getIntegerOrUndefined(rawQueue[Constants.MESSAGE_COUNT]),
    ...messageCountDetails,
    createdAt: getDate(rawQueue[Constants.CREATED_AT], "createdAt"),
    modifiedAt: getDate(rawQueue[Constants.UPDATED_AT], "modifiedAt"),
    accessedAt: getDate(rawQueue[Constants.ACCESSED_AT], "accessedAt"),
  };
}

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
export class QueueResourceSerializer implements AtomXmlSerializer {
  serialize(resource: InternalQueueOptions): Record<string, unknown> {
    return serializeToAtomXmlRequest("QueueDescription", resource);
  }

  async deserialize(response: FullOperationResponse): Promise<FullOperationResponse> {
    return deserializeAtomXmlResponse(["QueueName"], response);
  }
}
