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
  CountDetails
} from "../util/utils";

const requestProperties: Array<keyof InternalQueueOptions> = [
  Constants.LOCK_DURATION,
  Constants.SIZE_IN_BYTES,
  Constants.MESSAGE_COUNT,
  Constants.DEFAULT_MESSAGE_TIME_TO_LIVE,
  Constants.DUPLICATE_DETECTION_HISTORY_TIME_WINDOW,
  Constants.FORWARD_DEADLETTERED_MESSAGES_TO
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
    MessageCount: getStringOrUndefined(queueOptions.messageCount),
    DefaultMessageTimeToLive: queueOptions.defaultMessageTimeToLive,
    DuplicateDetectionHistoryTimeWindow: queueOptions.duplicateDetectionHistoryTimeWindow,
    ForwardDeadLetteredMessagesTo: queueOptions.forwardDeadLetteredMessagesTo
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
      queueName: rawQueue["QueueName"],

      lockDuration: rawQueue["LockDuration"],
      sizeInBytes: getIntegerOrUndefined(rawQueue["SizeInBytes"]),
      maxSizeInMegabytes: getIntegerOrUndefined(rawQueue["MaxSizeInMegabytes"]),

      messageCount: getIntegerOrUndefined(rawQueue["MessageCount"]),
      maxDeliveryCount: getIntegerOrUndefined(rawQueue["MaxDeliveryCount"]),

      enablePartitioning: getBooleanOrUndefined(rawQueue["EnablePartitioning"]),
      requiresSession: getBooleanOrUndefined(rawQueue["RequiresSession"]),
      enableBatchedOperations: getBooleanOrUndefined(rawQueue["EnableBatchedOperations"]),

      defaultMessageTimeToLive: rawQueue["DefaultMessageTimeToLive"],
      autoDeleteOnIdle: rawQueue["AutoDeleteOnIdle"],

      requiresDuplicateDetection: getBooleanOrUndefined(rawQueue["RequiresDuplicateDetection"]),
      duplicateDetectionHistoryTimeWindow: rawQueue["DuplicateDetectionHistoryTimeWindow"],
      deadLetteringOnMessageExpiration: getBooleanOrUndefined(
        rawQueue["DeadLetteringOnMessageExpiration"]
      ),
      forwardDeadLetteredMessagesTo: rawQueue["ForwardDeadLetteredMessagesTo"],

      countDetails: getCountDetailsOrUndefined(rawQueue["CountDetails"]),
      supportOrdering: getBooleanOrUndefined(rawQueue["SupportOrdering"]),
      enableExpress: getBooleanOrUndefined(rawQueue["EnableExpress"]),

      authorizationRules: rawQueue["AuthorizationRules"],
      isAnonymousAccessible: getBooleanOrUndefined(rawQueue["IsAnonymousAccessible"]),

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
   * Max idle time before entity is deleted
   *
   */
  autoDeleteOnIdle?: string;

  /**
   * Specifies the maximum queue size in megabytes. Any attempt to enqueue a message that will cause the queue to exceed this value will fail.
   */
  maxSizeInMegabytes?: number;

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
   * Settable only at queue creation time.
   */
  requiresDuplicateDetection?: boolean;

  /**
   * This field controls how the Service Bus handles a message whose TTL has expired. If it is enabled and a message expires, the Service Bus moves the message from the queue into the queue’s dead-letter sub-queue. If disabled, message will be permanently deleted from the queue. Settable only at queue creation time.
   */
  deadLetteringOnMessageExpiration?: boolean;

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
   * Authorization rules on the queue
   */
  authorizationRules?: string;

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
