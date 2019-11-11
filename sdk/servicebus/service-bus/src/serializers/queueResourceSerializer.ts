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
  getBooleanOrUndefined
} from "../util/utils";

/**
 * @ignore
 * Builds the queue options object from the user provided options.
 * Handles the differences in casing for the property names, converts values to string and ensures the
 * right order as expected by the service
 * @param queueOptions
 */
export function buildQueueOptions(queueOptions: QueueOptions): InternalQueueOptions {
  return {
    LockDuration: queueOptions.lockDuration,
    MaxSizeInMegabytes: getStringOrUndefined(queueOptions.maxSizeInMegabytes),
    RequiresDuplicateDetection: getStringOrUndefined(queueOptions.requiresDuplicateDetection),
    RequiresSession: getStringOrUndefined(queueOptions.requiresSession),
    DefaultMessageTimeToLive: queueOptions.defaultMessageTimeToLive,
    DeadLetteringOnMessageExpiration: getStringOrUndefined(
      queueOptions.deadLetteringOnMessageExpiration
    ),
    DuplicateDetectionHistoryTimeWindow: queueOptions.duplicateDetectionHistoryTimeWindow,
    MaxDeliveryCount: getStringOrUndefined(queueOptions.maxDeliveryCount),
    EnableBatchedOperations: getStringOrUndefined(queueOptions.enableBatchedOperations),
    SizeInBytes: getStringOrUndefined(queueOptions.sizeInBytes),
    MessageCount: getStringOrUndefined(queueOptions.messageCount),
    AuthorizationRules: getRawAuthorizationRules(queueOptions.authorizationRules),
    AutoDeleteOnIdle: getStringOrUndefined(queueOptions.autoDeleteOnIdle),
    EnablePartitioning: getStringOrUndefined(queueOptions.enablePartitioning),
    ForwardDeadLetteredMessagesTo: queueOptions.forwardDeadLetteredMessagesTo,
    UserMetadata: getStringOrUndefined(queueOptions.userMetadata)
  };
}

/**
 * @ignore
 * Builds the queue object from the raw json object gotten after deserializing the response
 * from the service
 * @param rawQueue
 */
export function buildQueue(rawQueue: any): QueueDetails {
  return {
    queueName: getString(rawQueue[Constants.QUEUE_NAME], "queueName"),

    forwardTo: rawQueue[Constants.FORWARD_TO],
    path: rawQueue[Constants.PATH],
    userMetadata: rawQueue[Constants.USER_METADATA],

    lockDuration: getString(rawQueue[Constants.LOCK_DURATION], "lockDuration"),
    sizeInBytes: getInteger(rawQueue[Constants.SIZE_IN_BYTES], "sizeInBytes"),
    maxSizeInMegabytes: getInteger(rawQueue[Constants.MAX_SIZE_IN_MEGABYTES], "maxSizeInMegabytes"),

    messageCount: getInteger(rawQueue[Constants.MESSAGE_COUNT], "messageCount"),
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
    forwardDeadLetteredMessagesTo: rawQueue[Constants.FORWARD_DEADLETTERED_MESSAGES_TO],

    messageCountDetails: getCountDetailsOrUndefined(rawQueue[Constants.COUNT_DETAILS]),
    supportOrdering: getBooleanOrUndefined(rawQueue[Constants.SUPPORT_ORDERING]),
    enableExpress: getBooleanOrUndefined(rawQueue[Constants.ENABLE_EXPRESS]),

    authorizationRules: getAuthorizationRulesOrUndefined(rawQueue[Constants.AUTHORIZATION_RULES]),
    isAnonymousAccessible: getBooleanOrUndefined(rawQueue[Constants.IS_ANONYMOUS_ACCESSIBLE]),

    entityAvailabilityStatus: rawQueue[Constants.ENTITY_AVAILABILITY_STATUS],

    status: rawQueue[Constants.STATUS],
    createdAt: rawQueue[Constants.CREATED_AT],
    updatedAt: rawQueue[Constants.UPDATED_AT],
    accessedAt: rawQueue[Constants.ACCESSED_AT]
  };
}

/**
 * Represents settable options on a queue
 */
export interface QueueOptions {
  /**
   * Determines the amount of time in seconds in which a message should be locked for processing by a receiver. After this period, the message is unlocked and available for consumption by the next receiver. Settable only at queue creation time.
   */
  lockDuration?: string;

  /**
   * The entity's size in bytes.
   *
   */
  sizeInBytes?: number;

  /**
   * Specifies the maximum queue size in megabytes. Any attempt to enqueue a message that will cause the queue to exceed this value will fail.
   */
  maxSizeInMegabytes?: number;

  /**
   * The entity's message count.
   *
   */
  messageCount?: number;

  /**
   * Depending on whether DeadLettering is enabled, a message is automatically moved to the DeadLetterQueue or deleted if it has been stored in the queue for longer than the specified time. This value is overwritten by a TTL specified on the message if and only if the message TTL is smaller than the TTL set on the queue. This value is immutable after the Queue has been created.
   */
  defaultMessageTimeToLive?: string;

  /**
   * Specifies the time span during which the Service Bus detects message duplication.
   */
  duplicateDetectionHistoryTimeWindow?: string;

  /**
   * The URL of Service Bus queue to forward deadlettered messages to.
   *
   */
  forwardDeadLetteredMessagesTo?: string;

  /**
   * Max idle time before entity is deleted
   *
   */
  autoDeleteOnIdle?: string;

  /**
   * The maximum delivery count.
   *
   */
  maxDeliveryCount?: number;

  /**
   * Settable only at queue creation time. If set to true, the queue will be session-aware and only SessionReceiver will be supported. Session-aware queues are not supported through REST.
   */
  requiresSession?: boolean;

  /**
   * Specifies if batched operations should be allowed.
   */
  enableBatchedOperations?: boolean;

  /**
   *  If enabled, the topic will detect duplicate messages within the time span specified by the DuplicateDetectionHistoryTimeWindow property.
   * Settable only at queue creation time.
   */
  requiresDuplicateDetection?: boolean;

  /**
   * If it is enabled and a message expires, the Service Bus moves the message from the queue into the queue’s dead-letter sub-queue. If disabled, message will be permanently deleted from the queue. Settable only at queue creation time.
   */
  deadLetteringOnMessageExpiration?: boolean;

  /**
   * ForwardTo header
   */
  forwardTo?: string;

  /**
   * The user metadata information
   */
  userMetadata?: string;

  /**
   * Specifies whether the queue should be partitioned.
   */
  enablePartitioning?: boolean;

  /**
   * Authorization rules on the queue
   */
  authorizationRules?: AuthorizationRule[];
}

/**
 * @ignore
 * Internal representation of settable options on a queue
 */
export interface InternalQueueOptions {
  /**
   * Determines the amount of time in seconds in which a message should be locked for processing by a receiver. After this period, the message is unlocked and available for consumption by the next receiver. Settable only at queue creation time.
   */
  LockDuration?: string;

  /**
   * The entity's size in bytes.
   *
   */
  SizeInBytes?: string;

  /**
   * The max size in MegaBytes
   *
   */
  MaxSizeInMegabytes?: string;

  /**
   * The entity's message count.
   *
   */
  MessageCount?: string;

  /**
   * Depending on whether DeadLettering is enabled, a message is automatically moved to the DeadLetterQueue or deleted if it has been stored in the queue for longer than the specified time. This value is overwritten by a TTL specified on the message if and only if the message TTL is smaller than the TTL set on the queue. This value is immutable after the Queue has been created.
   */
  DefaultMessageTimeToLive?: string;

  /**
   * Specifies the time span during which the Service Bus detects message duplication.
   */
  DuplicateDetectionHistoryTimeWindow?: string;

  /**
   * The URL of Service Bus queue to forward deadlettered messages to.
   *
   */
  ForwardDeadLetteredMessagesTo?: string;

  /**
   * Max idle time before entity is deleted
   *
   */
  AutoDeleteOnIdle?: string;

  /**
   * The maximum delivery count.
   *
   */
  MaxDeliveryCount?: string;

  /**
   * Specifies whether the queue should be partitioned.
   */
  EnablePartitioning?: string;

  /**
   * Settable only at queue creation time. If set to true, the queue will be session-aware and only SessionReceiver will be supported. Session-aware queues are not supported through REST.
   */
  RequiresSession?: string;

  /**
   * Specifies if batched operations should be allowed.
   */
  EnableBatchedOperations?: string;

  /**
   *  If enabled, the topic will detect duplicate messages within the time span specified by the DuplicateDetectionHistoryTimeWindow property.
   * Settable only at queue creation time.
   */
  RequiresDuplicateDetection?: string;

  /**
   * If it is enabled and a message expires, the Service Bus moves the message from the queue into the queue’s dead-letter sub-queue. If disabled, message will be permanently deleted from the queue. Settable only at queue creation time.
   */
  DeadLetteringOnMessageExpiration?: string;

  /**
   * The user metadata information
   */
  UserMetadata?: string;

  /**
   * Authorization rules on the queue
   */
  AuthorizationRules?: any;

  /**
   * ForwardTo header
   */
  ForwardTo?: string;

  /**
   * Entity path
   */
  Path?: string;

  /**
   * Entity status
   */
  Status?: string;
}

/**
 * Represents all attributes of a queue entity
 */
export interface QueueDetails {
  /**
   * Name of the queue
   */
  queueName: string;

  /**
   * Determines the amount of time in seconds in which a message should be locked for processing by a receiver. After this period, the message is unlocked and available for consumption by the next receiver. Settable only at queue creation time.
   */
  lockDuration: string;

  /**
   * The entity's size in bytes.
   *
   */
  sizeInBytes: number;

  /**
   * Specifies the maximum queue size in megabytes. Any attempt to enqueue a message that will cause the queue to exceed this value will fail.
   */
  maxSizeInMegabytes: number;

  /**
   * The entity's message count.
   *
   */
  messageCount: number;

  /**
   * Depending on whether DeadLettering is enabled, a message is automatically moved to the DeadLetterQueue or deleted if it has been stored in the queue for longer than the specified time. This value is overwritten by a TTL specified on the message if and only if the message TTL is smaller than the TTL set on the queue. This value is immutable after the Queue has been created.
   */
  defaultMessageTimeToLive: string;

  /**
   * Specifies the time span during which the Service Bus detects message duplication.
   */
  duplicateDetectionHistoryTimeWindow: string;

  /**
   * The URL of Service Bus queue to forward deadlettered messages to.
   *
   */
  forwardDeadLetteredMessagesTo?: string;

  /**
   * Max idle time before entity is deleted
   *
   */
  autoDeleteOnIdle: string;

  /**
   * The maximum delivery count.
   *
   */
  maxDeliveryCount: number;

  /**
   * Settable only at queue creation time. If set to true, the queue will be session-aware and only SessionReceiver will be supported. Session-aware queues are not supported through REST.
   */
  requiresSession: boolean;

  /**
   * Specifies if batched operations should be allowed.
   */
  enableBatchedOperations: boolean;

  /**
   *  If enabled, the topic will detect duplicate messages within the time span specified by the DuplicateDetectionHistoryTimeWindow property.
   * Settable only at queue creation time.
   */
  requiresDuplicateDetection: boolean;

  /**
   * If it is enabled and a message expires, the Service Bus moves the message from the queue into the queue’s dead-letter sub-queue. If disabled, message will be permanently deleted from the queue. Settable only at queue creation time.
   */
  deadLetteringOnMessageExpiration: boolean;

  /**
   * ForwardTo header
   */
  forwardTo?: string;

  /**
   * The user metadata information
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
   * Entity path
   */
  path?: string;

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
   * Queue entity status
   */
  status?: string;

  /**
   * Created at timestamp
   */
  createdAt?: string;

  /**
   * Updated at timestamp
   */
  updatedAt?: string;

  /**
   * Accessed at timestamp
   */
  accessedAt?: string;
}

/**
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
