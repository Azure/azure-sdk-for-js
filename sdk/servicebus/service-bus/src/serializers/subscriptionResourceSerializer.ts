// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  AtomXmlSerializer,
  serializeToAtomXmlRequest,
  deserializeAtomXmlResponse,
  HttpOperationResponse
} from "@azure/core-http";
import * as Constants from "../util/constants";

/**
 * Represents settable options on a subscription
 */
export interface SubscriptionOptions {
  /**
   * The default lock duration is applied to subscriptions that do not define a lock duration. Settable only at subscription creation time.
   */
  LockDuration?: string;

  /**
   * Settable only at subscription creation time. If set to true, the subscription will be session-aware and only SessionReceiver will be supported. Session-aware subscription are not supported through REST.
   */
  RequiresSession?: string;

  /**
   * Specifies the maximum topic size in megabytes. Any attempt to enqueue a message that will cause the topic to exceed this value will fail. All messages that are stored in the topic or any of its subscriptions count towards this value. Multiple copies of a message that reside in one or multiple subscriptions count as a single messages. For example, if message m exists once in subscription s1 and twice in subscription s2, m is counted as a single message.
   */
  MaxSizeInMegabytes?: string;

  /**
   * Determines how long a message lives in the subscription. Based on whether dead-lettering is enabled, a message whose TTL has expired will either be moved to the subscription’s associated DeadLtterQueue or permanently deleted.
   */
  DefaultMessageTimeToLive?: string;

  /**
   * This field controls how the Service Bus handles a message whose TTL has expired. If it is enabled and a message expires, the Service Bus moves the message from the queue into the subscription’s dead-letter sub-queue. If disabled, message will be permanently deleted from the subscription’s main queue. Settable only at subscription creation time.
   */
  DeadLetteringOnMessageExpiration?: string;

  /**
   * Determines how the Service Bus handles a message that causes an exception during a subscription’s filter evaluation. If the value is set to true, the message that caused the exception will be moved to the subscription’s dead-letter queue. Otherwise, it will be discarded. By default this parameter is set to true, allowing the user a chance to investigate the cause of the exception. It can occur from a malformed message or some incorrect assumptions being made in the filter about the form of the message. Settable only at topic creation time.
   */
  DeadLetteringOnFilterEvaluationExceptions?: string;

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
   * Specifies whether the topic should be partitioned
   */
  EnablePartitioning?: string;

  /**
   * Entity to forward deadlettered messages to
   *
   */
  ForwardDeadLetteredMessagesTo?: string;

  /**
   * The subscription's count details.
   *
   */
  CountDetails?: string;
}

/**
 * Represents all attributes of a subscription entity
 */
export interface SubscriptionFields extends SubscriptionOptions {
  /**
   * Name of the subscription
   */
  SubscriptionName?: string;

  /**
   * Name of the topic
   */
  TopicName?: string;

  /**
   * Entity availability status
   */
  EntityAvailabilityStatus?: string;

  /**
   * Queue entity status
   */
  Status?: string;

  /**
   * Created at timestamp
   */
  CreatedAt?: string;

  /**
   * Updated at timestamp
   */
  UpdatedAt?: string;

  /**
   * Accessed at timestamp
   */
  AccessedAt?: string;

  /**
   * Atom XML content root element body
   * E.g.,
      {
        ContentRootElement: "SubscriptionDescription";
        id: "<url-to-entity>";
        title: "<subscription-name>";
        published: "<timestamp>";
        updated: "<timestamp>";
        author: {
          name: "<servicebus-namespace>";
        };
        link: "<additional-property>";
      };
   */
  _?: any;
}

/**
 * @ignore SubscriptionResourceSerializer for serializing / deserializing Subscription entities
 */
export class SubscriptionResourceSerializer implements AtomXmlSerializer {
  serialize(resource: SubscriptionOptions): string {
    const properties: Array<keyof SubscriptionOptions> = [
      Constants.LOCK_DURATION,
      Constants.REQUIRES_SESSION,
      Constants.DEFAULT_MESSAGE_TIME_TO_LIVE,
      Constants.DEAD_LETTERING_ON_MESSAGE_EXPIRATION,
      Constants.DEAD_LETTERING_ON_FILTER_EVALUATION_EXCEPTIONS,
      Constants.MESSAGE_COUNT,
      Constants.MAX_SIZE_IN_MEGABYTES,
      Constants.MAX_DELIVERY_COUNT,
      Constants.ENABLE_BATCHED_OPERATIONS,
      Constants.AUTO_DELETE_ON_IDLE,
      Constants.FORWARD_DEADLETTERED_MESSAGES_TO,
      Constants.MESSAGE_COUNT,
      Constants.SIZE_IN_BYTES,
      Constants.COUNT_DETAILS
    ];

    return serializeToAtomXmlRequest(
      "SubscriptionDescription",
      resource,
      properties,
      Constants.XML_NAMESPACE
    );
  }

  async deserialize(response: HttpOperationResponse): Promise<HttpOperationResponse> {
    return deserializeAtomXmlResponse(["TopicName", "SubscriptionName"], response);
  }
}
