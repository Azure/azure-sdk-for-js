// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { FullOperationResponse, OperationOptions } from "@azure/core-client";
import { CorrelationRuleFilter } from "..";
import {
  AtomXmlSerializer,
  deserializeAtomXmlResponse,
  serializeToAtomXmlRequest,
} from "../util/atomXmlHelper";
import * as Constants from "../util/constants";
import {
  EntityStatus,
  EntityAvailabilityStatus,
  getBoolean,
  getMessageCountDetails,
  getInteger,
  getString,
  getStringOrUndefined,
  getDate,
} from "../util/utils";
import {
  buildInternalRuleResource,
  InternalRuleOptions,
  SqlRuleAction,
  SqlRuleFilter,
} from "./ruleResourceSerializer";

/**
 * @internal
 * Builds the subscription options object from the user provided options.
 * Handles the differences in casing for the property names,
 * converts values to string and ensures the right order as expected by the service
 */
export function buildSubscriptionOptions(
  subscription: CreateSubscriptionOptions
): InternalSubscriptionOptions {
  return {
    // NOTE: this ordering is extremely important. As an example, misordering of the ForwardTo property
    // resulted in a customer bug where the Forwarding attributes appeared to be set but the portal was
    // not picking up on it.
    //
    // The authority on this ordering is here:
    // https://github.com/Azure/azure-sdk-for-net/blob/8af2dfc32c96ef3e340f9d20013bf588d97ea756/sdk/servicebus/Azure.Messaging.ServiceBus/src/Administration/SubscriptionPropertiesExtensions.cs#L191
    LockDuration: subscription.lockDuration,
    RequiresSession: getStringOrUndefined(subscription.requiresSession),
    DefaultMessageTimeToLive: getStringOrUndefined(subscription.defaultMessageTimeToLive),
    DeadLetteringOnMessageExpiration: getStringOrUndefined(
      subscription.deadLetteringOnMessageExpiration
    ),
    DeadLetteringOnFilterEvaluationExceptions: getStringOrUndefined(
      subscription.deadLetteringOnFilterEvaluationExceptions
    ),
    DefaultRuleDescription: subscription.defaultRuleOptions
      ? buildInternalRuleResource(subscription.defaultRuleOptions)
      : undefined,
    MaxDeliveryCount: getStringOrUndefined(subscription.maxDeliveryCount),
    EnableBatchedOperations: getStringOrUndefined(subscription.enableBatchedOperations),
    Status: getStringOrUndefined(subscription.status),
    ForwardTo: getStringOrUndefined(subscription.forwardTo),
    UserMetadata: getStringOrUndefined(subscription.userMetadata),
    ForwardDeadLetteredMessagesTo: getStringOrUndefined(subscription.forwardDeadLetteredMessagesTo),
    AutoDeleteOnIdle: getStringOrUndefined(subscription.autoDeleteOnIdle),
    EntityAvailabilityStatus: getStringOrUndefined(subscription.availabilityStatus),
  };
}

/**
 * @internal
 * Builds the subscription object from the raw json object gotten after deserializing
 * the response from the service
 */
export function buildSubscription(rawSubscription: Record<string, any>): SubscriptionProperties {
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

    defaultMessageTimeToLive: getString(
      rawSubscription[Constants.DEFAULT_MESSAGE_TIME_TO_LIVE],
      "defaultMessageTimeToLive"
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

    status: getString(rawSubscription[Constants.STATUS], "status") as EntityStatus,

    availabilityStatus: getString(
      rawSubscription[Constants.ENTITY_AVAILABILITY_STATUS],
      "availabilityStatus"
    ) as EntityAvailabilityStatus,
  };
}

/**
 * @internal
 * Builds the subscription runtime info object from the raw json object gotten after deserializing
 * the response from the service
 */
export function buildSubscriptionRuntimeProperties(
  rawSubscription: Record<string, any>
): SubscriptionRuntimeProperties {
  const messageCountDetails = getMessageCountDetails(rawSubscription[Constants.COUNT_DETAILS]);
  return {
    subscriptionName: getString(rawSubscription[Constants.SUBSCRIPTION_NAME], "subscriptionName"),
    topicName: getString(rawSubscription[Constants.TOPIC_NAME], "topicName"),
    totalMessageCount: getInteger(rawSubscription[Constants.MESSAGE_COUNT], "messageCount"),
    activeMessageCount: messageCountDetails.activeMessageCount,
    deadLetterMessageCount: messageCountDetails.deadLetterMessageCount,
    transferDeadLetterMessageCount: messageCountDetails.transferDeadLetterMessageCount,
    transferMessageCount: messageCountDetails.transferMessageCount,
    createdAt: getDate(rawSubscription[Constants.CREATED_AT], "createdAt"),
    modifiedAt: getDate(rawSubscription[Constants.UPDATED_AT], "modifiedAt"),
    accessedAt: getDate(rawSubscription[Constants.ACCESSED_AT], "accessedAt"),
  };
}

/**
 * Represents settable options on a subscription
 */
export interface CreateSubscriptionOptions extends OperationOptions {
  /**
   * The default lock duration is applied to subscriptions that do not define a lock
   * duration.
   * (If sessions are enabled, this lock duration is applicable for sessions and not for messages.)
   *
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
  defaultMessageTimeToLive?: string;

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
   * Represents the options to create the default rule for the subscription.
   */
  defaultRuleOptions?: {
    /**
     * Name of the rule
     */
    name: string;

    /**
     * Defines the filter expression that the rule evaluates. For `SqlRuleFilter` input,
     * the expression string is interpreted as a SQL92 expression which must
     * evaluate to True or False. Only one between a `CorrelationRuleFilter` or
     * a `SqlRuleFilter` can be defined.
     */
    filter?: SqlRuleFilter | CorrelationRuleFilter;

    /**
     * The SQL like expression that can be executed on the message should the
     * associated filter apply.
     */
    action?: SqlRuleAction;
  };

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
   * The user provided metadata information associated with the subscription.
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

  /**
   * Availability status of the messaging entity.
   */
  availabilityStatus?: EntityAvailabilityStatus;
}

/**
 * Represents the input for updateSubscription.
 *
 */
export interface SubscriptionProperties {
  /**
   * Name of the subscription
   */
  readonly subscriptionName: string;

  /**
   * Name of the topic
   */
  readonly topicName: string;

  /**
   * The default lock duration is applied to subscriptions that do not define a lock
   * duration.
   * (If sessions are enabled, this lock duration is applicable for sessions and not for messages.)
   *
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
   *
   * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  lockDuration: string;

  /**
   * If set to true, the subscription will be session-aware and only SessionReceiver
   * will be supported. Session-aware subscription are not supported through REST.
   * Settable only at subscription creation time.
   */
  readonly requiresSession: boolean;

  /**
   * Determines how long a message lives in the subscription. Based on whether
   * dead-lettering is enabled, a message whose TTL has expired will either be moved
   * to the subscription’s associated DeadLtterQueue or permanently deleted.
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
   *
   * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  defaultMessageTimeToLive: string;

  /**
   * If it is enabled and a message expires, the Service Bus moves the message from
   * the queue into the subscription’s dead-letter sub-queue. If disabled, message
   * will be permanently deleted from the subscription’s main queue.
   * Settable only at subscription creation time.
   */
  deadLetteringOnMessageExpiration: boolean;

  /**
   * Determines how the Service Bus handles a message that causes an exception during
   * a subscription’s filter evaluation. If the value is set to true, the message that
   * caused the exception will be moved to the subscription’s dead-letter sub-queue.
   * Otherwise, it will be discarded. By default this parameter is set to true,
   * allowing the user a chance to investigate the cause of the exception.
   * It can occur from a malformed message or some incorrect assumptions being made
   * in the filter about the form of the message. Settable only at topic creation time.
   */
  deadLetteringOnFilterEvaluationExceptions: boolean;

  /**
   * The maximum delivery count of messages after which if it is still not settled,
   * gets moved to the dead-letter sub-queue.
   *
   */
  maxDeliveryCount: number;

  /**
   * Specifies if batched operations should be allowed.
   */
  enableBatchedOperations: boolean;

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
   * The user provided metadata information associated with the subscription.
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
  autoDeleteOnIdle: string;

  /**
   * Availability status of the messaging entity.
   */
  availabilityStatus?: EntityAvailabilityStatus;
}

/**
 * @internal
 * Internal representation of settable options on a subscription
 */
export interface InternalSubscriptionOptions {
  /**
   * The default lock duration is applied to subscriptions that do not define a lock
   * duration.
   * (If sessions are enabled, this lock duration is applicable for sessions and not for messages.)
   *
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
   * The user provided metadata information associated with the subscription.
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

  /**
   * Availability status of the messaging entity.
   */
  EntityAvailabilityStatus?: string;

  DefaultRuleDescription?: InternalRuleOptions;
}

/**
 * Represents runtime info attributes of a subscription entity
 */
export interface SubscriptionRuntimeProperties {
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
  totalMessageCount: number;

  /**
   * The number of active messages in the queue.
   */
  activeMessageCount: number;

  /**
   * The number of messages that have been dead lettered.
   */
  deadLetterMessageCount: number;

  /**
   * The number of messages transferred to another queue, topic, or subscription
   */
  transferMessageCount: number;

  /**
   * The number of messages transferred to the dead letter queue.
   */
  transferDeadLetterMessageCount: number;

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
}

/**
 * @internal
 * SubscriptionResourceSerializer for serializing / deserializing Subscription entities
 */
export class SubscriptionResourceSerializer implements AtomXmlSerializer {
  serialize(resource: InternalSubscriptionOptions): Record<string, unknown> {
    return serializeToAtomXmlRequest("SubscriptionDescription", resource);
  }

  async deserialize(response: FullOperationResponse): Promise<FullOperationResponse> {
    return deserializeAtomXmlResponse(["TopicName", "SubscriptionName"], response);
  }
}
