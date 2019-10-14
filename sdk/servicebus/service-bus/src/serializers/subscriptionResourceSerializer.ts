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
  getIntegerOrUndefined,
  getBooleanOrUndefined,
  getCountDetailsOrUndefined,
  CountDetails
} from "../util/utils";

const requestProperties: Array<keyof InternalSubscriptionOptions> = [
  Constants.LOCK_DURATION,
  Constants.REQUIRES_SESSION,
  Constants.DEFAULT_MESSAGE_TIME_TO_LIVE,
  Constants.DEAD_LETTERING_ON_MESSAGE_EXPIRATION,
  Constants.DEAD_LETTERING_ON_FILTER_EVALUATION_EXCEPTIONS,
  Constants.DEFAULT_RULE_DESCRIPTION,
  Constants.MAX_DELIVERY_COUNT,
  Constants.ENABLE_BATCHED_OPERATIONS,
  Constants.FORWARD_TO,
  Constants.USER_METADATA,
  Constants.FORWARD_DEADLETTERED_MESSAGES_TO,
  Constants.AUTO_DELETE_ON_IDLE
];

/**
 * @ignore
 * Builds the subscription options object
 * @param subscriptionOptions
 */
export function buildSubscriptionOptions(
  subscriptionOptions: SubscriptionOptions
): InternalSubscriptionOptions {
  const internalSubscriptionOptions: InternalSubscriptionOptions = {
    LockDuration: subscriptionOptions.lockDuration,
    MaxDeliveryCount: getStringOrUndefined(subscriptionOptions.maxDeliveryCount),
    SizeInBytes: getStringOrUndefined(subscriptionOptions.sizeInBytes),
    MaxSizeInMegabytes: getStringOrUndefined(subscriptionOptions.maxSizeInMegabytes),
    MessageCount: getStringOrUndefined(subscriptionOptions.messageCount),
    EnablePartitioning: getStringOrUndefined(subscriptionOptions.enablePartitioning),
    RequiresSession: getStringOrUndefined(subscriptionOptions.requiresSession),
    EnableBatchedOperations: getStringOrUndefined(subscriptionOptions.enableBatchedOperations),
    DefaultMessageTimeToLive: getStringOrUndefined(subscriptionOptions.defaultMessageTimeToLive),
    AutoDeleteOnIdle: getStringOrUndefined(subscriptionOptions.autoDeleteOnIdle),
    DeadLetteringOnMessageExpiration: getStringOrUndefined(
      subscriptionOptions.deadLetteringOnMessageExpiration
    ),
    DeadLetteringOnFilterEvaluationExceptions: getStringOrUndefined(
      subscriptionOptions.deadLetteringOnFilterEvaluationExceptions
    ),
    ForwardDeadLetteredMessagesTo: getStringOrUndefined(
      subscriptionOptions.forwardDeadLetteredMessagesTo
    ),
    DefaultRuleDescription: subscriptionOptions.defaultRuleDescription
  };
  return internalSubscriptionOptions;
}

/**
 * @ignore
 * Builds the subscription object
 * @param rawSubscription
 */
export function buildSubscription(rawSubscription: any): Subscription | undefined {
  if (rawSubscription == undefined) {
    return undefined;
  } else {
    const result: Subscription = {
      subscriptionName: rawSubscription["SubscriptionName"],
      topicName: rawSubscription["TopicName"],

      lockDuration: rawSubscription["LockDuration"],
      sizeInBytes: getIntegerOrUndefined(rawSubscription["SizeInBytes"]),
      maxSizeInMegabytes: getIntegerOrUndefined(rawSubscription["MaxSizeInMegabytes"]),

      messageCount: getIntegerOrUndefined(rawSubscription["MessageCount"]),
      maxDeliveryCount: getIntegerOrUndefined(rawSubscription["MaxDeliveryCount"]),

      enablePartitioning: getBooleanOrUndefined(rawSubscription["EnablePartitioning"]),
      requiresSession: getBooleanOrUndefined(rawSubscription["RequiresSession"]),
      enableBatchedOperations: getBooleanOrUndefined(rawSubscription["EnableBatchedOperations"]),

      defaultMessageTimeToLive: rawSubscription["DefaultMessageTimeToLive"],
      autoDeleteOnIdle: rawSubscription["AutoDeleteOnIdle"],

      deadLetteringOnMessageExpiration: getBooleanOrUndefined(
        rawSubscription["DeadLetteringOnMessageExpiration"]
      ),
      deadLetteringOnFilterEvaluationExceptions: getBooleanOrUndefined(
        rawSubscription["DeadLetteringOnFilterEvaluationExceptions"]
      ),
      forwardDeadLetteredMessagesTo: rawSubscription["ForwardDeadLetteredMessagesTo"],
      defaultRuleDescription: rawSubscription["DefaultRuleDescription"],

      countDetails: getCountDetailsOrUndefined(rawSubscription["CountDetails"]),

      forwardTo: rawSubscription["ForwardTo"],
      userMetadata: rawSubscription["UserMetadata"],

      entityAvailabilityStatus: rawSubscription["EntityAvailabilityStatus"],
      status: rawSubscription["Status"],
      createdAt: rawSubscription["CreatedAt"],
      updatedAt: rawSubscription["UpdatedAt"],
      accessedAt: rawSubscription["AccessedAt"]
    };
    return result;
  }
}

/**
 * Represents settable options on a subscription
 */
export interface SubscriptionOptions {
  /**
   * The default lock duration is applied to subscriptions that do not define a lock duration. Settable only at subscription creation time.
   */
  lockDuration?: string;

  /**
   * The entity's size in bytes.
   *
   */
  sizeInBytes?: number;

  /**
   * Specifies the maximum topic size in megabytes. Any attempt to enqueue a message that will cause the topic to exceed this value will fail. All messages that are stored in the topic or any of its subscriptions count towards this value. Multiple copies of a message that reside in one or multiple subscriptions count as a single messages. For example, if message m exists once in subscription s1 and twice in subscription s2, m is counted as a single message.
   */
  maxSizeInMegabytes?: number;

  /**
   * The entity's message count.
   *
   */
  messageCount?: number;

  /**
   * Specifies whether the topic should be partitioned
   */
  enablePartitioning?: boolean;

  /**
   * Settable only at subscription creation time. If set to true, the subscription will be session-aware and only SessionReceiver will be supported. Session-aware subscription are not supported through REST.
   */
  requiresSession?: boolean;

  /**
   * Specifies if batched operations should be allowed.
   */
  enableBatchedOperations?: boolean;

  /**
   * Determines how long a message lives in the subscription. Based on whether dead-lettering is enabled, a message whose TTL has expired will either be moved to the subscription’s associated DeadLtterQueue or permanently deleted.
   */
  defaultMessageTimeToLive?: string;

  /**
   * Indicates the default rule description.
   *
   */
  defaultRuleDescription?: any;

  /**
   * Max idle time before entity is deleted
   *
   */
  autoDeleteOnIdle?: string;

  /**
   * This field controls how the Service Bus handles a message whose TTL has expired. If it is enabled and a message expires, the Service Bus moves the message from the queue into the subscription’s dead-letter sub-queue. If disabled, message will be permanently deleted from the subscription’s main queue. Settable only at subscription creation time.
   */
  deadLetteringOnMessageExpiration?: boolean;

  /**
   * Determines how the Service Bus handles a message that causes an exception during a subscription’s filter evaluation. If the value is set to true, the message that caused the exception will be moved to the subscription’s dead-letter queue. Otherwise, it will be discarded. By default this parameter is set to true, allowing the user a chance to investigate the cause of the exception. It can occur from a malformed message or some incorrect assumptions being made in the filter about the form of the message. Settable only at topic creation time.
   */
  deadLetteringOnFilterEvaluationExceptions?: boolean;

  /**
   * Entity to forward deadlettered messages to
   *
   */
  forwardDeadLetteredMessagesTo?: string;

  /**
   * The maximum delivery count.
   *
   */
  maxDeliveryCount?: number;

  /**
   * ForwardTo header
   */
  forwardTo?: string;

  /**
   * The user metadata information
   */
  userMetadata?: string;
}

/**
 * @ignore
 * Internal representation of settable options on a subscription
 */
export interface InternalSubscriptionOptions {
  /**
   * The default lock duration is applied to subscriptions that do not define a lock duration. Settable only at subscription creation time.
   */
  LockDuration?: string;

  /**
   * The entity's size in bytes.
   *
   */
  SizeInBytes?: string;

  /**
   * Specifies the maximum topic size in megabytes. Any attempt to enqueue a message that will cause the topic to exceed this value will fail. All messages that are stored in the topic or any of its subscriptions count towards this value. Multiple copies of a message that reside in one or multiple subscriptions count as a single messages. For example, if message m exists once in subscription s1 and twice in subscription s2, m is counted as a single message.
   */
  MaxSizeInMegabytes?: string;

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
   * Settable only at subscription creation time. If set to true, the subscription will be session-aware and only SessionReceiver will be supported. Session-aware subscription are not supported through REST.
   */
  RequiresSession?: string;

  /**
   * Specifies if batched operations should be allowed.
   */
  EnableBatchedOperations?: string;

  /**
   * Determines how long a message lives in the subscription. Based on whether dead-lettering is enabled, a message whose TTL has expired will either be moved to the subscription’s associated DeadLtterQueue or permanently deleted.
   */
  DefaultMessageTimeToLive?: string;

  /**
   * Indicates the default rule description.
   *
   */
  DefaultRuleDescription?: any;

  /**
   * Max idle time before entity is deleted
   *
   */
  AutoDeleteOnIdle?: string;

  /**
   * This field controls how the Service Bus handles a message whose TTL has expired. If it is enabled and a message expires, the Service Bus moves the message from the queue into the subscription’s dead-letter sub-queue. If disabled, message will be permanently deleted from the subscription’s main queue. Settable only at subscription creation time.
   */
  DeadLetteringOnMessageExpiration?: string;

  /**
   * Determines how the Service Bus handles a message that causes an exception during a subscription’s filter evaluation. If the value is set to true, the message that caused the exception will be moved to the subscription’s dead-letter queue. Otherwise, it will be discarded. By default this parameter is set to true, allowing the user a chance to investigate the cause of the exception. It can occur from a malformed message or some incorrect assumptions being made in the filter about the form of the message. Settable only at topic creation time.
   */
  DeadLetteringOnFilterEvaluationExceptions?: string;

  /**
   * Entity to forward deadlettered messages to
   *
   */
  ForwardDeadLetteredMessagesTo?: string;

  /**
   * The maximum delivery count.
   *
   */
  MaxDeliveryCount?: string;

  /**
   * ForwardTo header
   */
  ForwardTo?: string;

  /**
   * The user metadata information
   */
  UserMetadata?: string;
}

/**
 * Represents all attributes of a subscription entity
 */
export interface Subscription extends SubscriptionOptions {
  /**
   * Name of the subscription
   */
  subscriptionName?: string;

  /**
   * Name of the topic
   */
  topicName?: string;

  /**
   * Count details
   */
  countDetails?: CountDetails;

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
 * SubscriptionResourceSerializer for serializing / deserializing Subscription entities
 */
export class SubscriptionResourceSerializer implements AtomXmlSerializer {
  serialize(resource: InternalSubscriptionOptions): object {
    return serializeToAtomXmlRequest(
      "SubscriptionDescription",
      resource,
      requestProperties,
      Constants.XML_NAMESPACE
    );
  }

  async deserialize(response: HttpOperationResponse): Promise<HttpOperationResponse> {
    return deserializeAtomXmlResponse(["TopicName", "SubscriptionName"], response);
  }
}
