// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { AtomXmlSerializer, HttpOperationResponse } from "@azure/core-http";
import * as Constants from "../util/constants";
import { serializeToAtomXmlRequest, deserializeAtomXmlResponse } from "../util/atomXmlHelper";
import { getStringOrUndefined } from "../util/utils";

const requestProperties: Array<keyof InternalQueueOptions> = [
  Constants.LOCK_DURATION,
  Constants.SIZE_IN_BYTES,
  Constants.MAX_SIZE_IN_MEGABYTES,

  Constants.MESSAGE_COUNT,

  Constants.MAX_DELIVERY_COUNT,

  Constants.ENABLE_PARTITIONING,
  Constants.REQUIRES_SESSION,
  Constants.ENABLE_BATCHED_OPERATIONS,

  Constants.DEFAULT_MESSAGE_TIME_TO_LIVE,
  Constants.AUTO_DELETE_ON_IDLE,

  Constants.REQUIRES_DUPLICATE_DETECTION,
  Constants.DUPLICATE_DETECTION_HISTORY_TIME_WINDOW,
  Constants.DEAD_LETTERING_ON_MESSAGE_EXPIRATION,
  Constants.FORWARD_DEADLETTERED_MESSAGES_TO
];

export function buildQueueOptions(queueOptions: QueueOptions): InternalQueueOptions {
  const internalQueueOptions: InternalQueueOptions = {
    LockDuration: queueOptions.lockDuration,
    SizeInBytes: getStringOrUndefined(queueOptions.sizeInBytes),
    MaxSizeInMegabytes: getStringOrUndefined(queueOptions.maxSizeInMegabytes),

    MessageCount: getStringOrUndefined(queueOptions.messageCount),

    MaxDeliveryCount: getStringOrUndefined(queueOptions.maxDeliveryCount),

    EnablePartitioning: getStringOrUndefined(queueOptions.enablePartitioning),
    RequiresSession: getStringOrUndefined(queueOptions.requiresSession),
    EnableBatchedOperations: getStringOrUndefined(queueOptions.enableBatchedOperations),

    DefaultMessageTimeToLive: queueOptions.defaultMessageTimeToLive,
    AutoDeleteOnIdle: queueOptions.autoDeleteOnIdle,

    RequiresDuplicateDetection: getStringOrUndefined(queueOptions.requiresDuplicateDetection),
    DuplicateDetectionHistoryTimeWindow: queueOptions.duplicateDetectionHistoryTimeWindow,
    DeadLetteringOnMessageExpiration: getStringOrUndefined(
      queueOptions.deadLetteringOnMessageExpiration
    ),
    ForwardDeadLetteredMessagesTo: queueOptions.forwardDeadLetteredMessagesTo
  };
  return internalQueueOptions;
}

export function buildQueue(rawQueue: any): Queue | {} {
  if (rawQueue == undefined || rawQueue == {}) {
    return { undefined };
  } else {
    const result: Queue = {
      queueName: rawQueue["QueueName"],

      lockDuration: rawQueue["LockDuration"],
      sizeInBytes: rawQueue["SizeInBytes"],
      maxSizeInMegabytes: rawQueue["MaxSizeInMegabytes"],

      messageCount: rawQueue["MessageCount"],

      maxDeliveryCount: rawQueue["MaxDeliveryCount"],

      enablePartitioning: rawQueue["EnablePartitioning"],
      requiresSession: rawQueue["RequiresSession"],
      enableBatchedOperations: rawQueue["EnableBatchedOperations"],

      defaultMessageTimeToLive: rawQueue["DefaultMessageTimeToLive"],
      autoDeleteOnIdle: rawQueue["AutoDeleteOnIdle"],

      requiresDuplicateDetection: rawQueue["RequiresDuplicateDetection"],
      duplicateDetectionHistoryTimeWindow: rawQueue["DuplicateDetectionHistoryTimeWindow"],
      deadLetteringOnMessageExpiration: rawQueue["DeadLetteringOnMessageExpiration"],
      forwardDeadLetteredMessagesTo: rawQueue["ForwardDeadLetteredMessagesTo"],

      countDetails: rawQueue["CountDetails"],
      supportOrdering: rawQueue["SupportOrdering"],
      enableExpress: rawQueue["EnableExpress"],

      authorizationRules: rawQueue["AuthorizationRules"],
      isAnonymousAccessible: rawQueue["IsAnonymousAccessible"],

      entityAvailabilityStatus: rawQueue["EntityAvailabilityStatus"],
      status: rawQueue["Status"],
      createdAt: rawQueue["CreatedAt"],
      updatedAt: rawQueue["UpdatedAt"],
      accessedAt: rawQueue["AccessedAt"]
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
   * The maximum delivery count.
   *
   */
  maxDeliveryCount?: number;

  /**
   * Specifies whether the queue should be partitioned.
   */
  enablePartitioning?: boolean;

  /**
   * Settable only at queue creation time. If set to true, the queue will be session-aware and only SessionReceiver will be supported. Session-aware queues are not supported through REST.
   */
  requiresSession?: boolean;

  /**
   * Specifies if batched operations should be allowed.
   */
  enableBatchedOperations?: boolean;

  /**
   * Depending on whether DeadLettering is enabled, a message is automatically moved to the DeadLetterQueue or deleted if it has been stored in the queue for longer than the specified time. This value is overwritten by a TTL specified on the message if and only if the message TTL is smaller than the TTL set on the queue. This value is immutable after the Queue has been created.
   */
  defaultMessageTimeToLive?: string;

  /**
   * Max idle time before entity is deleted
   *
   */
  autoDeleteOnIdle?: string;

  /**
   * Settable only at queue creation time.
   */
  requiresDuplicateDetection?: boolean;

  /**
   * Specifies the time span during which the Service Bus detects message duplication.
   */
  duplicateDetectionHistoryTimeWindow?: string;

  /**
   * This field controls how the Service Bus handles a message whose TTL has expired. If it is enabled and a message expires, the Service Bus moves the message from the queue into the queue’s dead-letter sub-queue. If disabled, message will be permanently deleted from the queue. Settable only at queue creation time.
   */
  deadLetteringOnMessageExpiration?: boolean;

  /**
   * Entity to forward deadlettered messages to
   *
   */
  forwardDeadLetteredMessagesTo?: string;
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
   * Specifies the maximum queue size in megabytes. Any attempt to enqueue a message that will cause the queue to exceed this value will fail.
   */
  MaxSizeInMegabytes?: string;

  /**
   * The entity's message count.
   *
   */
  MessageCount?: string;

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
   * Depending on whether DeadLettering is enabled, a message is automatically moved to the DeadLetterQueue or deleted if it has been stored in the queue for longer than the specified time. This value is overwritten by a TTL specified on the message if and only if the message TTL is smaller than the TTL set on the queue. This value is immutable after the Queue has been created.
   */
  DefaultMessageTimeToLive?: string;

  /**
   * Max idle time before entity is deleted
   *
   */
  AutoDeleteOnIdle?: string;

  /**
   * Settable only at queue creation time.
   */
  RequiresDuplicateDetection?: string;

  /**
   * Specifies the time span during which the Service Bus detects message duplication.
   */
  DuplicateDetectionHistoryTimeWindow?: string;

  /**
   * This field controls how the Service Bus handles a message whose TTL has expired. If it is enabled and a message expires, the Service Bus moves the message from the queue into the queue’s dead-letter sub-queue. If disabled, message will be permanently deleted from the queue. Settable only at queue creation time.
   */
  DeadLetteringOnMessageExpiration?: string;
  /**
   * Entity to forward deadlettered messages to
   *
   */
  ForwardDeadLetteredMessagesTo?: string;
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
   * Count details
   * E.g.,
        {
          "d2p1:ActiveMessageCount": "0";
          "d2p1:DeadLetterMessageCount": "0";
          "d2p1:ScheduledMessageCount": "0";
          "d2p1:TransferMessageCount": "0";
          "d2p1:TransferDeadLetterMessageCount": "0";
        };
   *
   */
  countDetails?: any;

  /**
   * Ordering support for messages
   */
  supportOrdering?: string;

  /**
   * Enable express option
   */
  enableExpress?: string;

  /**
   * Is anonymous accessible queue option
   */
  isAnonymousAccessible?: string;

  /**
   * Authorization rules on the queue
   */
  authorizationRules?: any;

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
  serialize(resource: InternalQueueOptions): string {
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
