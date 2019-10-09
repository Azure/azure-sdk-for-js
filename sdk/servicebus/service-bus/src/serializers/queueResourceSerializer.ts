// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { AtomXmlSerializer, HttpOperationResponse } from "@azure/core-http";
import * as Constants from "../util/constants";
import { serializeToAtomXmlRequest, deserializeAtomXmlResponse } from "../util/atomXmlHelper";
import {
  getStringOrUndefined,
  getIntegerOrUndefined,
  getBooleanOrUndefined,
  getCountDetailsOrUndefined,
  getRawAuthorizationRules,
  getAuthorizationRulesOrUndefined,
  CountDetails,
  AuthorizationRule
} from "../util/utils";

const requestProperties: Array<keyof InternalQueueOptions> = [
  Constants.LOCK_DURATION,
  Constants.MAX_SIZE_IN_MEGABYTES,
  Constants.REQUIRES_DUPLICATE_DETECTION,
  Constants.REQUIRES_SESSION,
  Constants.DEFAULT_MESSAGE_TIME_TO_LIVE,
  Constants.DEAD_LETTERING_ON_MESSAGE_EXPIRATION,
  Constants.DUPLICATE_DETECTION_HISTORY_TIME_WINDOW,
  Constants.MAX_DELIVERY_COUNT,
  Constants.ENABLE_BATCHED_OPERATIONS,
  Constants.SIZE_IN_BYTES,
  Constants.MESSAGE_COUNT,
  Constants.AUTHORIZATION_RULES,
  Constants.AUTO_DELETE_ON_IDLE,
  Constants.ENABLE_PARTITIONING,
  Constants.FORWARD_DEADLETTERED_MESSAGES_TO,
  Constants.USER_METADATA
];

/**
 * @ignore
 * Builds the queue options object
 * @param queueOptions
 */
export function buildQueueOptions(queueOptions: QueueOptions): InternalQueueOptions {
  const internalQueueOptions: InternalQueueOptions = {
    LockDuration: queueOptions.lockDuration,
    SizeInBytes: getStringOrUndefined(queueOptions.sizeInBytes),
    MaxSizeInMegabytes: getStringOrUndefined(queueOptions.maxSizeInMegabytes),
    MessageCount: getStringOrUndefined(queueOptions.messageCount),
    DefaultMessageTimeToLive: queueOptions.defaultMessageTimeToLive,
    DuplicateDetectionHistoryTimeWindow: queueOptions.duplicateDetectionHistoryTimeWindow,
    ForwardDeadLetteredMessagesTo: queueOptions.forwardDeadLetteredMessagesTo,
    AutoDeleteOnIdle: getStringOrUndefined(queueOptions.autoDeleteOnIdle),
    MaxDeliveryCount: getStringOrUndefined(queueOptions.maxDeliveryCount),
    EnablePartitioning: getStringOrUndefined(queueOptions.enablePartitioning),
    RequiresSession: getStringOrUndefined(queueOptions.requiresSession),
    EnableBatchedOperations: getStringOrUndefined(queueOptions.enableBatchedOperations),
    RequiresDuplicateDetection: getStringOrUndefined(queueOptions.requiresDuplicateDetection),
    DeadLetteringOnMessageExpiration: getStringOrUndefined(
      queueOptions.deadLetteringOnMessageExpiration
    ),
    UserMetadata: getStringOrUndefined(queueOptions.userMetadata),
    AuthorizationRules: getRawAuthorizationRules(queueOptions.authorizationRules)
  };
  return internalQueueOptions;
}

/**
 * @ignore
 * Builds the queue object
 * @param rawQueue
 */
export function buildQueue(rawQueue: any): Queue | undefined {
  if (rawQueue == undefined) {
    return undefined;
  } else {
    const result: Queue = {
      queueName: rawQueue[Constants.QUEUE_NAME],

      forwardTo: rawQueue[Constants.FORWARD_TO],
      path: rawQueue[Constants.PATH],
      userMetadata: rawQueue[Constants.USER_METADATA],

      lockDuration: rawQueue[Constants.LOCK_DURATION],
      sizeInBytes: getIntegerOrUndefined(rawQueue[Constants.SIZE_IN_BYTES]),
      maxSizeInMegabytes: getIntegerOrUndefined(rawQueue[Constants.MAX_SIZE_IN_MEGABYTES]),

      messageCount: getIntegerOrUndefined(rawQueue[Constants.MESSAGE_COUNT]),
      maxDeliveryCount: getIntegerOrUndefined(rawQueue[Constants.MAX_DELIVERY_COUNT]),

      enablePartitioning: getBooleanOrUndefined(rawQueue[Constants.ENABLE_PARTITIONING]),
      requiresSession: getBooleanOrUndefined(rawQueue[Constants.REQUIRES_SESSION]),
      enableBatchedOperations: getBooleanOrUndefined(rawQueue[Constants.ENABLE_BATCHED_OPERATIONS]),

      defaultMessageTimeToLive: rawQueue[Constants.DEFAULT_MESSAGE_TIME_TO_LIVE],
      autoDeleteOnIdle: rawQueue[Constants.AUTO_DELETE_ON_IDLE],

      requiresDuplicateDetection: getBooleanOrUndefined(
        rawQueue[Constants.REQUIRES_DUPLICATE_DETECTION]
      ),
      duplicateDetectionHistoryTimeWindow:
        rawQueue[Constants.DUPLICATE_DETECTION_HISTORY_TIME_WINDOW],
      deadLetteringOnMessageExpiration: getBooleanOrUndefined(
        rawQueue[Constants.DEAD_LETTERING_ON_MESSAGE_EXPIRATION]
      ),
      forwardDeadLetteredMessagesTo: rawQueue[Constants.FORWARD_DEADLETTERED_MESSAGES_TO],

      countDetails: getCountDetailsOrUndefined(rawQueue[Constants.COUNT_DETAILS]),
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
    return result;
  }
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
   * Entity to forward deadlettered messages to
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
   * Settable only at queue creation time.
   */
  requiresDuplicateDetection?: boolean;

  /**
   * This field controls how the Service Bus handles a message whose TTL has expired. If it is enabled and a message expires, the Service Bus moves the message from the queue into the queue’s dead-letter sub-queue. If disabled, message will be permanently deleted from the queue. Settable only at queue creation time.
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
   * Entity to forward deadlettered messages to
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
   * Settable only at queue creation time.
   */
  RequiresDuplicateDetection?: string;

  /**
   * This field controls how the Service Bus handles a message whose TTL has expired. If it is enabled and a message expires, the Service Bus moves the message from the queue into the queue’s dead-letter sub-queue. If disabled, message will be permanently deleted from the queue. Settable only at queue creation time.
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
export interface Queue extends QueueOptions {
  /**
   * Name of the queue
   */
  queueName?: string;

  /**
   * Entity path
   */
  path?: string;

  /**
   * Count details
   */
  countDetails?: CountDetails;

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
    return serializeToAtomXmlRequest(
      "QueueDescription",
      resource,
      requestProperties,
      Constants.XML_NAMESPACE
    );
  }

  async deserialize(response: HttpOperationResponse): Promise<HttpOperationResponse> {
    return deserializeAtomXmlResponse(["QueueName"], response);
  }
}
