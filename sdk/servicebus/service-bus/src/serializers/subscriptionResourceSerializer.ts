// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpOperationResponse } from "@azure/core-http";
import {
  AtomXmlSerializer,
  deserializeAtomXmlResponse,
  serializeToAtomXmlRequest
} from "../util/atomXmlHelper";
import * as Constants from "../util/constants";
import {
  EntityStatus,
  getBoolean,
  getCountDetailsOrUndefined,
  getInteger,
  getString,
  getStringOrUndefined,
  MessageCountDetails,
  getDate
} from "../util/utils";

/**
 * @internal
 * @ignore
 * Builds the subscription options object from the user provided options.
 * Handles the differences in casing for the property names,
 * converts values to string and ensures the right order as expected by the service
 * @param subscription
 */
export function buildSubscriptionOptions(
  subscription: SubscriptionDescription
): InternalSubscriptionOptions {
  return {
    LockDuration: subscription.lockDuration,
    RequiresSession: getStringOrUndefined(subscription.requiresSession),
    DefaultMessageTimeToLive: getStringOrUndefined(subscription.defaultMessageTtl),
    DeadLetteringOnMessageExpiration: getStringOrUndefined(
      subscription.deadLetteringOnMessageExpiration
    ),
    DeadLetteringOnFilterEvaluationExceptions: getStringOrUndefined(
      subscription.deadLetteringOnFilterEvaluationExceptions
    ),
    MaxDeliveryCount: getStringOrUndefined(subscription.maxDeliveryCount),
    EnableBatchedOperations: getStringOrUndefined(subscription.enableBatchedOperations),
    Status: getStringOrUndefined(subscription.status),
    ForwardTo: getStringOrUndefined(subscription.forwardTo),
    UserMetadata: getStringOrUndefined(subscription.userMetadata),
    ForwardDeadLetteredMessagesTo: getStringOrUndefined(subscription.forwardDeadLetteredMessagesTo),
    AutoDeleteOnIdle: getStringOrUndefined(subscription.autoDeleteOnIdle)
  };
}

/**
 * @internal
 * @ignore
 * Builds the subscription object from the raw json object gotten after deserializing
 * the response from the service
 * @param rawSubscription
 */
export function buildSubscription(rawSubscription: any): SubscriptionDescription {
  return {
    subscriptionName: getString(rawSubscription[Constants.SUBSCRIPTION_NAME], "subscriptionName"),
    topicName: getString(rawSubscription[Constants.TOPIC_NAME], "topicName"),

    lockDuration: getString(rawSubscription[Constants.LOCK_DURATION], "lockDuration"),
    maxDeliveryCount: getInteger(rawSubscription[Constants.MAX_DELIVERY_COUNT], "maxDeliveryCount"),

    requiresSession: getBoolean(rawSubscription[Constants.REQUIRES_SESSION], "requiresSession"),
    enableBatchedOperations: getBoolean(
      rawSubscription[Constants.ENABLE_BATCHED_OPERATIONS],
      "enableBatchedOperations"
    ),

    defaultMessageTtl: getString(
      rawSubscription[Constants.DEFAULT_MESSAGE_TIME_TO_LIVE],
      "defaultMessageTtl"
    ),
    autoDeleteOnIdle: getString(rawSubscription[Constants.AUTO_DELETE_ON_IDLE], "autoDeleteOnIdle"),

    deadLetteringOnMessageExpiration: getBoolean(
      rawSubscription[Constants.DEAD_LETTERING_ON_MESSAGE_EXPIRATION],
      "deadLetteringOnMessageExpiration"
    ),
    deadLetteringOnFilterEvaluationExceptions: getBoolean(
      rawSubscription[Constants.DEAD_LETTERING_ON_FILTER_EVALUATION_EXCEPTIONS],
      "deadLetteringOnFilterEvaluationExceptions"
    ),
    forwardDeadLetteredMessagesTo: getStringOrUndefined(
      rawSubscription[Constants.FORWARD_DEADLETTERED_MESSAGES_TO]
    ),

    forwardTo: getStringOrUndefined(rawSubscription[Constants.FORWARD_TO]),
    userMetadata: rawSubscription[Constants.USER_METADATA],

    status: getString(rawSubscription[Constants.STATUS], "status") as EntityStatus
  };
}

/**
 * @internal
 * @ignore
 * Builds the subscription runtime info object from the raw json object gotten after deserializing
 * the response from the service
 * @param rawSubscription
 */
export function buildSubscriptionRuntimeInfo(rawSubscription: any): SubscriptionRuntimeInfo {
  return {
    subscriptionName: getString(rawSubscription[Constants.SUBSCRIPTION_NAME], "subscriptionName"),
    topicName: getString(rawSubscription[Constants.TOPIC_NAME], "topicName"),
    messageCount: getInteger(rawSubscription[Constants.MESSAGE_COUNT], "messageCount"),
    messageCountDetails: getCountDetailsOrUndefined(rawSubscription[Constants.COUNT_DETAILS]),
    createdAt: getDate(rawSubscription[Constants.CREATED_AT], "createdAt"),
    updatedAt: getDate(rawSubscription[Constants.UPDATED_AT], "updatedAt"),
    accessedAt: getDate(rawSubscription[Constants.ACCESSED_AT], "accessedAt")
  };
}

/**
 * Represents settable options on a subscription
 */
export interface SubscriptionDescription {
  /**
   * Name of the subscription
   */
  subscriptionName: string;

  /**
   * Name of the topic
   */
  topicName: string;

  /**
   * The default lock duration is applied to subscriptions that do not define a lock
   * duration. Settable only at subscription creation time.
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
   *
   * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  lockDuration?: string;

  /**
   * If set to true, the subscription will be session-aware and only SessionReceiver
   * will be supported. Session-aware subscription are not supported through REST.
   * Settable only at subscription creation time.
   */
  requiresSession?: boolean;

  /**
   * Determines how long a message lives in the subscription. Based on whether
   * dead-lettering is enabled, a message whose TTL has expired will either be moved
   * to the subscription’s associated DeadLtterQueue or permanently deleted.
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
   *
   * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  defaultMessageTtl?: string;

  /**
   * If it is enabled and a message expires, the Service Bus moves the message from
   * the queue into the subscription’s dead-letter sub-queue. If disabled, message
   * will be permanently deleted from the subscription’s main queue.
   * Settable only at subscription creation time.
   */
  deadLetteringOnMessageExpiration?: boolean;

  /**
   * Determines how the Service Bus handles a message that causes an exception during
   * a subscription’s filter evaluation. If the value is set to true, the message that
   * caused the exception will be moved to the subscription’s dead-letter sub-queue.
   * Otherwise, it will be discarded. By default this parameter is set to true,
   * allowing the user a chance to investigate the cause of the exception.
   * It can occur from a malformed message or some incorrect assumptions being made
   * in the filter about the form of the message. Settable only at topic creation time.
   */
  deadLetteringOnFilterEvaluationExceptions?: boolean;

  /**
   * The maximum delivery count of messages after which if it is still not settled,
   * gets moved to the dead-letter sub-queue.
   *
   */
  maxDeliveryCount?: number;

  /**
   * Specifies if batched operations should be allowed.
   */
  enableBatchedOperations?: boolean;

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
   * The user provided metadata information associated with the subscription description.
   * Used to specify textual content such as tags, labels, etc.
   * Value must not exceed 1024 bytes encoded in utf-8.
   */
  userMetadata?: string;

  /**
   * Absolute URL or the name of the queue or topic the dead-lettered
   * messages are to be forwarded to.
   * For example, an absolute URL input would be of the form
   * `sb://<your-service-bus-namespace-endpoint>/<queue-or-topic-name>`
   */
  forwardDeadLetteredMessagesTo?: string;

  /**
   * Max idle time before entity is deleted.
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
   *
   * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  autoDeleteOnIdle?: string;
}

/**
 * @internal
 * @ignore
 * Internal representation of settable options on a subscription
 */
export interface InternalSubscriptionOptions {
  /**
   * The default lock duration is applied to subscriptions that do not define a lock
   * duration. Settable only at subscription creation time.
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
   *
   * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  LockDuration?: string;

  /**
   * If set to true, the subscription will be session-aware and only SessionReceiver
   * will be supported. Session-aware subscription are not supported through REST.
   * Settable only at subscription creation time.
   */
  RequiresSession?: string;

  /**
   * Determines how long a message lives in the subscription. Based on whether
   * dead-lettering is enabled, a message whose TTL has expired will either be moved
   * to the subscription’s associated DeadLtterQueue or permanently deleted.
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
   *
   * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  DefaultMessageTimeToLive?: string;

  /**
   * If it is enabled and a message expires, the Service Bus moves the message from
   * the queue into the subscription’s dead-letter sub-queue. If disabled, message
   * will be permanently deleted from the subscription’s main queue.
   * Settable only at subscription creation time.
   */
  DeadLetteringOnMessageExpiration?: string;

  /**
   * Determines how the Service Bus handles a message that causes an exception during
   * a subscription’s filter evaluation. If the value is set to true, the message
   * that caused the exception will be moved to the subscription’s dead-letter sub-queue.
   * Otherwise, it will be discarded. By default this parameter is set to true, allowing
   * the user a chance to investigate the cause of the exception. It can occur from a
   * malformed message or some incorrect assumptions being made in the filter about the
   * form of the message. Settable only at topic creation time.
   */
  DeadLetteringOnFilterEvaluationExceptions?: string;

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
   * The user provided metadata information associated with the subscription description.
   * Used to specify textual content such as tags, labels, etc.
   * Value must not exceed 1024 bytes encoded in utf-8.
   */
  UserMetadata?: string;

  /**
   * Absolute URL or the name of the queue or topic the dead-lettered
   * messages are to be forwarded to.
   * For example, an absolute URL input would be of the form
   * `sb://<your-service-bus-namespace-endpoint>/<queue-or-topic-name>`
   */
  ForwardDeadLetteredMessagesTo?: string;

  /**
   * Max idle time before entity is deleted.
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
   *
   * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  AutoDeleteOnIdle?: string;
}

/**
 * Represents runtime info attributes of a subscription entity
 */
export interface SubscriptionRuntimeInfo {
  /**
   * Name of the subscription
   */
  subscriptionName: string;

  /**
   * Name of the topic
   */
  topicName: string;

  /**
   * The entity's message count.
   *
   */
  messageCount: number;

  /**
   * Message count details
   */
  messageCountDetails?: MessageCountDetails;

  /**
   * Created at timestamp
   */
  createdAt: Date;

  /**
   * Updated at timestamp
   */
  updatedAt: Date;

  /**
   * Accessed at timestamp
   */
  accessedAt: Date;
}

/**
 * @internal
 * @ignore
 * SubscriptionResourceSerializer for serializing / deserializing Subscription entities
 */
export class SubscriptionResourceSerializer implements AtomXmlSerializer {
  serialize(resource: InternalSubscriptionOptions): object {
    return serializeToAtomXmlRequest("SubscriptionDescription", resource);
  }

  async deserialize(response: HttpOperationResponse): Promise<HttpOperationResponse> {
    return deserializeAtomXmlResponse(["TopicName", "SubscriptionName"], response);
  }
}
