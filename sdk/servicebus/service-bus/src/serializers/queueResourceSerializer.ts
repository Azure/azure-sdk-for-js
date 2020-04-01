// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { HttpOperationResponse } from "@azure/core-http";
import * as Constants from "../util/constants";
import {
  serializeToAtomXmlRequest,
  deserializeAtomXmlResponse,
  AtomXmlSerializer
} from "../util/atomXmlHelper";
import {
  getStringOrUndefined,
  getCountDetailsOrUndefined,
  getRawAuthorizationRules,
  getAuthorizationRulesOrUndefined,
  MessageCountDetails,
  AuthorizationRule,
  getInteger,
  getBoolean,
  getString,
  getBooleanOrUndefined,
  getIntegerOrUndefined,
  EntityStatus
} from "../util/utils";

/**
 * @internal
 * @ignore
 * Builds the queue options object from the user provided options.
 * Handles the differences in casing for the property names,
 * converts values to string and ensures the right order as expected by the service
 * @param queueOptions
 */
export function buildQueueOptions(queueOptions: QueueOptions): InternalQueueOptions {
  return {
    LockDuration: queueOptions.lockDuration,
    MaxSizeInMegabytes: getStringOrUndefined(queueOptions.maxSizeInMegabytes),
    RequiresDuplicateDetection: getStringOrUndefined(queueOptions.requiresDuplicateDetection),
    RequiresSession: getStringOrUndefined(queueOptions.requiresSession),
    DefaultMessageTimeToLive: queueOptions.defaultMessageTtl,
    DeadLetteringOnMessageExpiration: getStringOrUndefined(
      queueOptions.deadLetteringOnMessageExpiration
    ),
    DuplicateDetectionHistoryTimeWindow: queueOptions.duplicateDetectionHistoryTimeWindow,
    MaxDeliveryCount: getStringOrUndefined(queueOptions.maxDeliveryCount),
    EnableBatchedOperations: getStringOrUndefined(queueOptions.enableBatchedOperations),
    AuthorizationRules: getRawAuthorizationRules(queueOptions.authorizationRules),
    Status: getStringOrUndefined(queueOptions.status),
    AutoDeleteOnIdle: getStringOrUndefined(queueOptions.autoDeleteOnIdle),
    EnablePartitioning: getStringOrUndefined(queueOptions.enablePartitioning),
    ForwardDeadLetteredMessagesTo: getStringOrUndefined(queueOptions.forwardDeadLetteredMessagesTo),
    ForwardTo: getStringOrUndefined(queueOptions.forwardTo),
    UserMetadata: getStringOrUndefined(queueOptions.userMetadata)
  };
}

/**
 * @internal
 * @ignore
 * Builds the queue object from the raw json object gotten after deserializing the
 * response from the service
 * @param rawQueue
 */
export function buildQueue(rawQueue: any): QueueDetails {
  return {
    queueName: getString(rawQueue[Constants.QUEUE_NAME], "queueName"),

    forwardTo: getStringOrUndefined(rawQueue[Constants.FORWARD_TO]),
    userMetadata: rawQueue[Constants.USER_METADATA],

    lockDuration: getString(rawQueue[Constants.LOCK_DURATION], "lockDuration"),
    sizeInBytes: getIntegerOrUndefined(rawQueue[Constants.SIZE_IN_BYTES]),
    maxSizeInMegabytes: getInteger(rawQueue[Constants.MAX_SIZE_IN_MEGABYTES], "maxSizeInMegabytes"),

    messageCount: getIntegerOrUndefined(rawQueue[Constants.MESSAGE_COUNT]),
    maxDeliveryCount: getInteger(rawQueue[Constants.MAX_DELIVERY_COUNT], "maxDeliveryCount"),

    enablePartitioning: getBoolean(rawQueue[Constants.ENABLE_PARTITIONING], "enablePartitioning"),
    requiresSession: getBoolean(rawQueue[Constants.REQUIRES_SESSION], "requiresSession"),
    enableBatchedOperations: getBoolean(
      rawQueue[Constants.ENABLE_BATCHED_OPERATIONS],
      "enableBatchedOperations"
    ),

    defaultMessageTtl: getString(
      rawQueue[Constants.DEFAULT_MESSAGE_TIME_TO_LIVE],
      "defaultMessageTtl"
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

    messageCountDetails: getCountDetailsOrUndefined(rawQueue[Constants.COUNT_DETAILS]),
    supportOrdering: getBooleanOrUndefined(rawQueue[Constants.SUPPORT_ORDERING]),
    enableExpress: getBooleanOrUndefined(rawQueue[Constants.ENABLE_EXPRESS]),

    authorizationRules: getAuthorizationRulesOrUndefined(rawQueue[Constants.AUTHORIZATION_RULES]),
    isAnonymousAccessible: getBooleanOrUndefined(rawQueue[Constants.IS_ANONYMOUS_ACCESSIBLE]),

    entityAvailabilityStatus: rawQueue[Constants.ENTITY_AVAILABILITY_STATUS],

    status: rawQueue[Constants.STATUS],
    createdOn: rawQueue[Constants.CREATED_AT],
    updatedOn: rawQueue[Constants.UPDATED_AT],
    accessedOn: rawQueue[Constants.ACCESSED_AT]
  };
}

/**
 * @internal
 * @ignore
 * Represents settable options on a queue
 */
export interface QueueOptions {
  /**
   * Determines the amount of time in seconds in which a message should be locked for
   * processing by a receiver. After this period, the message is unlocked and available
   * for consumption by the next receiver. Settable only at queue creation time.
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
   */
  lockDuration?: string;

  /**
   * Specifies the maximum queue size in megabytes. Any attempt to enqueue a message that
   * will cause the queue to exceed this value will fail.
   */
  maxSizeInMegabytes?: number;

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
   */
  defaultMessageTtl?: string;

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
   * The user provided metadata information associated with the queue description.
   * Used to specify textual content such as tags, labels, etc.
   * Value must not exceed 1024 bytes encoded in utf-8.
   */
  userMetadata?: string;

  /**
   * Max idle time before entity is deleted.
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
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
}

/**
 * @internal
 * @ignore
 * Internal representation of settable options on a queue
 */
export interface InternalQueueOptions {
  /**
   * Determines the amount of time in seconds in which a message should be locked for
   * processing by a receiver. After this period, the message is unlocked and
   * can be consumed by the next receiver.
   * Settable only at queue creation time.
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
   */
  LockDuration?: string;

  /**
   * The max size in MegaBytes
   *
   */
  MaxSizeInMegabytes?: string;

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
   * The user provided metadata information associated with the queue description.
   * Used to specify textual content such as tags, labels, etc.
   * Value must not exceed 1024 bytes encoded in utf-8.
   */
  UserMetadata?: string;

  /**
   * Max idle time before entity is deleted.
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
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
}

/**
 * @internal
 * @ignore
 * Represents all attributes of a queue entity
 */
export interface QueueDetails {
  /**
   * Name of the queue
   */
  queueName: string;

  /**
   * Determines the amount of time in seconds in which a message should be locked
   * for processing by a receiver. After this period, the message is unlocked and
   * can be consumed by the next receiver.
   * Settable only at queue creation time.
   * This is specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
   */
  lockDuration: string;

  /**
   * The entity's size in bytes.
   *
   */
  sizeInBytes?: number;

  /**
   * Specifies the maximum queue size in megabytes. Any attempt to enqueue
   * a message that will cause the queue to exceed this value will fail.
   */
  maxSizeInMegabytes: number;

  /**
   * The entity's message count.
   *
   */
  messageCount?: number;

  /**
   * Depending on whether DeadLettering is enabled, a message is automatically
   * moved to the DeadLetterQueue or deleted if it has been stored in the queue
   * for longer than the specified time. This value is overwritten by a TTL
   * specified on the message if and only if the message TTL is smaller than
   * the TTL set on the queue.
   * This value is immutable after the Queue has been created.
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
   */
  defaultMessageTtl: string;

  /**
   * Specifies the time span during which the Service Bus detects message duplication.
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
   */
  duplicateDetectionHistoryTimeWindow: string;

  /**
   * Absolute URL or the name of the queue or topic the dead-lettered
   * messages are to be forwarded to.
   * For example, an absolute URL input would be of the form
   * `sb://<your-service-bus-namespace-endpoint>/<queue-or-topic-name>`
   */
  forwardDeadLetteredMessagesTo?: string;

  /**
   * Max idle time before entity is deleted.
   * This is specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
   */
  autoDeleteOnIdle: string;

  /**
   * The maximum delivery count of messages after which if it is still not settled,
   * gets moved to the dead-letter sub-queue.
   *
   */
  maxDeliveryCount: number;

  /**
   * If set to true, the queue will be session-aware and only SessionReceiver
   * will be supported. Session-aware queues are not supported through REST.
   * Settable only at queue creation time.
   */
  requiresSession: boolean;

  /**
   * Specifies if batched operations should be allowed.
   */
  enableBatchedOperations: boolean;

  /**
   *  If enabled, the topic will detect duplicate messages within the time
   * span specified by the DuplicateDetectionHistoryTimeWindow property.
   * Settable only at queue creation time.
   */
  requiresDuplicateDetection: boolean;

  /**
   * If it is enabled and a message expires, the Service Bus moves the message
   * from the queue into the queue’s dead-letter sub-queue. If disabled, message
   * will be permanently deleted from the queue. Settable only at queue creation time.
   */
  deadLetteringOnMessageExpiration: boolean;

  /**
   * Absolute URL or the name of the queue or topic the
   * messages are to be forwarded to.
   * For example, an absolute URL input would be of the form
   * `sb://<your-service-bus-namespace-endpoint>/<queue-or-topic-name>`
   */
  forwardTo?: string;

  /**
   * The user provided metadata information associated with the queue description.
   * Used to specify textual content such as tags, labels, etc.
   * Value must not exceed 1024 bytes encoded in utf-8.
   */
  userMetadata?: string;

  /**
   * Specifies whether the queue should be partitioned.
   */
  enablePartitioning: boolean;

  /**
   * Authorization rules on the queue
   */
  authorizationRules?: AuthorizationRule[];

  /**
   * Message count details
   */
  messageCountDetails?: MessageCountDetails;

  /**
   * Ordering support for messages
   */
  supportOrdering?: boolean;

  /**
   * Enable express option
   */
  enableExpress?: boolean;

  /**
   * Is anonymous accessible queue option
   */
  isAnonymousAccessible?: boolean;

  /**
   * Entity availability status
   */
  entityAvailabilityStatus?: string;

  /**
   * Status of the messaging entity.
   */
  status?: EntityStatus;

  /**
   * Created at timestamp
   */
  createdOn?: string;

  /**
   * Updated at timestamp
   */
  updatedOn?: string;

  /**
   * Accessed at timestamp
   */
  accessedOn?: string;
}

/**
 * @internal
 * @ignore
 * Atom XML Serializer for Queues.
 */
export class QueueResourceSerializer implements AtomXmlSerializer {
  serialize(resource: InternalQueueOptions): object {
    return serializeToAtomXmlRequest("QueueDescription", resource);
  }

  async deserialize(response: HttpOperationResponse): Promise<HttpOperationResponse> {
    return deserializeAtomXmlResponse(["QueueName"], response);
  }
}
