// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  AtomXmlSerializer,
  serializeToAtomXmlRequest,
  deserializeAtomXmlResponse,
  HttpOperationResponse
} from "@azure/core-http";
import * as Constants from "../util/constants";

export interface QueueOptions {
  /**
   * Determines the amount of time in seconds in which a message should be locked for processing by a receiver. After this period, the message is unlocked and available for consumption by the next receiver. Settable only at queue creation time.
   */
  LockDuration?: string;

  /**
   * Specifies the maximum queue size in megabytes. Any attempt to enqueue a message that will cause the queue to exceed this value will fail.
   */
  MaxSizeInMegabytes?: string;

  /**
   * Settable only at queue creation time.
   */
  RequiresDuplicateDetection?: string;

  /**
   * Settable only at queue creation time. If set to true, the queue will be session-aware and only SessionReceiver will be supported. Session-aware queues are not supported through REST.
   */
  RequiresSession?: string;

  /**
   * Depending on whether DeadLettering is enabled, a message is automatically moved to the DeadLetterQueue or deleted if it has been stored in the queue for longer than the specified time. This value is overwritten by a TTL specified on the message if and only if the message TTL is smaller than the TTL set on the queue. This value is immutable after the Queue has been created.
   */
  DefaultMessageTimeToLive?: string;

  /**
   * This field controls how the Service Bus handles a message whose TTL has expired. If it is enabled and a message expires, the Service Bus moves the message from the queue into the queue’s dead-letter sub-queue. If disabled, message will be permanently deleted from the queue. Settable only at queue creation time.
   */
  DeadLetteringOnMessageExpiration?: string;

  /**
   * Specifies the time span during which the Service Bus detects message duplication.
   */
  DuplicateDetectionHistoryTimeWindow?: string;

  /**
   * Specifies whether the queue should be partitioned.
   */
  EnablePartitioning?: string;

  /**
   * The maximum delivery count.
   *
   */
  MaxDeliveryCount?: string;

  /**
   * Specifies if batched operations should be allowed.
   */
  EnableBatchedOperations?: string;

  /**
   * Max idle time before entity is deleted
   *
   */
  AutoDeleteOnIdle?: string;

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
   * Entity to forward deadlettered messages to
   *
   */
  ForwardDeadLetteredMessagesTo?: string;
}

/**
 * @ignore
 * Atom XML Serializer for Queues.
 */
export class QueueResourceSerializer implements AtomXmlSerializer {
  serialize(resource: QueueOptions): string {
    const properties: Array<keyof QueueOptions> = [
      Constants.LOCK_DURATION,
      Constants.MAX_SIZE_IN_MEGABYTES,
      Constants.REQUIRES_DUPLICATE_DETECTION,
      Constants.REQUIRES_SESSION,
      Constants.DEFAULT_MESSAGE_TIME_TO_LIVE,
      Constants.DEAD_LETTERING_ON_MESSAGE_EXPIRATION,
      Constants.DUPLICATE_DETECTION_HISTORY_TIME_WINDOW,
      Constants.MAX_DELIVERY_COUNT,
      Constants.ENABLE_BATCHED_OPERATIONS,
      Constants.AUTO_DELETE_ON_IDLE,
      Constants.SIZE_IN_BYTES,
      Constants.MESSAGE_COUNT,
      Constants.ENABLE_PARTITIONING,
      Constants.FORWARD_DEADLETTERED_MESSAGES_TO
    ];

    return serializeToAtomXmlRequest(
      "QueueDescription",
      resource,
      properties,
      Constants.XML_NAMESPACE
    );
  }

  async deserialize(
    response: HttpOperationResponse,
    shouldParseResponse: boolean
  ): Promise<HttpOperationResponse> {
    return deserializeAtomXmlResponse(["QueueName"], response, shouldParseResponse);
  }
}
