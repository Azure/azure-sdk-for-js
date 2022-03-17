// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { FullOperationResponse, OperationOptions } from "@azure/core-client";
import {
  AtomXmlSerializer,
  deserializeAtomXmlResponse,
  serializeToAtomXmlRequest,
} from "../util/atomXmlHelper";
import * as Constants from "../util/constants";
import {
  AuthorizationRule,
  EntityStatus,
  EntityAvailabilityStatus,
  getAuthorizationRulesOrUndefined,
  getBoolean,
  getInteger,
  getIntegerOrUndefined,
  getRawAuthorizationRules,
  getString,
  getStringOrUndefined,
  getDate,
  getMessageCountDetails,
} from "../util/utils";

/**
 * @internal
 * Builds the topic options object from the user provided options.
 * Handles the differences in casing for the property names,
 * converts values to string and ensures the right order as expected by the service
 */
export function buildTopicOptions(topic: CreateTopicOptions): InternalTopicOptions {
  return {
    // NOTE: this ordering is extremely important. As an example, misordering of the ForwardTo property
    // resulted in a customer bug where the Forwarding attributes appeared to be set but the portal was
    // not picking up on it.
    //
    // The authority on this ordering is here:
    // https://github.com/Azure/azure-sdk-for-net/blob/8af2dfc32c96ef3e340f9d20013bf588d97ea756/sdk/servicebus/Azure.Messaging.ServiceBus/src/Administration/TopicPropertiesExtensions.cs#L175

    DefaultMessageTimeToLive: topic.defaultMessageTimeToLive,
    MaxSizeInMegabytes: getStringOrUndefined(topic.maxSizeInMegabytes),
    RequiresDuplicateDetection: getStringOrUndefined(topic.requiresDuplicateDetection),
    DuplicateDetectionHistoryTimeWindow: topic.duplicateDetectionHistoryTimeWindow,
    EnableBatchedOperations: getStringOrUndefined(topic.enableBatchedOperations),
    AuthorizationRules: getRawAuthorizationRules(topic.authorizationRules),
    Status: getStringOrUndefined(topic.status),
    UserMetadata: getStringOrUndefined(topic.userMetadata),
    SupportOrdering: getStringOrUndefined(topic.supportOrdering),
    AutoDeleteOnIdle: getStringOrUndefined(topic.autoDeleteOnIdle),
    EnablePartitioning: getStringOrUndefined(topic.enablePartitioning),
    EntityAvailabilityStatus: getStringOrUndefined(topic.availabilityStatus),
    EnableExpress: getStringOrUndefined(topic.enableExpress),
    MaxMessageSizeInKilobytes: getStringOrUndefined(topic.maxMessageSizeInKilobytes),
  };
}

/**
 * @internal
 * Builds the topic object from the raw json object gotten after deserializing the
 * response from the service
 */
export function buildTopic(rawTopic: Record<string, any>): TopicProperties {
  return {
    name: getString(rawTopic[Constants.TOPIC_NAME], "topicName"),
    maxSizeInMegabytes: getInteger(rawTopic[Constants.MAX_SIZE_IN_MEGABYTES], "maxSizeInMegabytes"),

    enablePartitioning: getBoolean(rawTopic[Constants.ENABLE_PARTITIONING], "enablePartitioning"),
    supportOrdering: getBoolean(rawTopic[Constants.SUPPORT_ORDERING], "supportOrdering"),
    enableBatchedOperations: getBoolean(
      rawTopic[Constants.ENABLE_BATCHED_OPERATIONS],
      "enableBatchedOperations"
    ),

    defaultMessageTimeToLive: getString(
      rawTopic[Constants.DEFAULT_MESSAGE_TIME_TO_LIVE],
      "defaultMessageTimeToLive"
    ),
    autoDeleteOnIdle: rawTopic[Constants.AUTO_DELETE_ON_IDLE],

    requiresDuplicateDetection: getBoolean(
      rawTopic[Constants.REQUIRES_DUPLICATE_DETECTION],
      "requiresDuplicateDetection"
    ),
    duplicateDetectionHistoryTimeWindow: getString(
      rawTopic[Constants.DUPLICATE_DETECTION_HISTORY_TIME_WINDOW],
      "duplicateDetectionHistoryTimeWindow"
    ),

    authorizationRules: getAuthorizationRulesOrUndefined(rawTopic[Constants.AUTHORIZATION_RULES]),
    userMetadata: rawTopic[Constants.USER_METADATA],

    status: rawTopic[Constants.STATUS],

    enableExpress: getBoolean(rawTopic[Constants.ENABLE_EXPRESS], "enableExpress"),

    availabilityStatus: rawTopic[Constants.ENTITY_AVAILABILITY_STATUS],

    maxMessageSizeInKilobytes: getIntegerOrUndefined(
      rawTopic[Constants.MAX_MESSAGE_SIZE_IN_KILOBYTES]
    ),
  };
}

/**
 * @internal
 * Builds the topic runtime info object from the raw json object gotten after deserializing the
 * response from the service
 */
export function buildTopicRuntimeProperties(rawTopic: Record<string, any>): TopicRuntimeProperties {
  return {
    name: getString(rawTopic[Constants.TOPIC_NAME], "topicName"),
    sizeInBytes: getIntegerOrUndefined(rawTopic[Constants.SIZE_IN_BYTES]),
    subscriptionCount: getIntegerOrUndefined(rawTopic[Constants.SUBSCRIPTION_COUNT]),
    createdAt: getDate(rawTopic[Constants.CREATED_AT], "createdAt"),
    scheduledMessageCount: getMessageCountDetails(rawTopic[Constants.COUNT_DETAILS])
      .scheduledMessageCount,
    modifiedAt: getDate(rawTopic[Constants.UPDATED_AT], "modifiedAt"),
    accessedAt: getDate(rawTopic[Constants.ACCESSED_AT], "accessedAt"),
  };
}

/**
 * Represents settable options on a topic
 */
export interface CreateTopicOptions extends OperationOptions {
  /**
   * Determines how long a message lives in the associated subscriptions.
   * Subscriptions inherit the TTL from the topic unless they are created explicitly
   * with a smaller TTL. Based on whether dead-lettering is enabled, a message whose
   * TTL has expired will either be moved to the subscription’s associated dead-letter
   * sub-queue or will be permanently deleted.
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
   *
   * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  defaultMessageTimeToLive?: string;

  /**
   * Specifies the maximum topic size in megabytes. Any attempt to enqueue a message
   * that will cause the topic to exceed this value will fail. All messages that are
   * stored in the topic or any of its subscriptions count towards this value.
   * Multiple copies of a message that reside in one or multiple subscriptions count
   * as a single messages. For example, if message m exists once in subscription s1
   * and twice in subscription s2, m is counted as a single message.
   */
  maxSizeInMegabytes?: number;

  /**
   * The maximum message size in kilobytes for messages sent to this topic.
   *
   * (Configurable only for Premium Tier Service Bus namespace.)
   */
  maxMessageSizeInKilobytes?: number;

  /**
   * If enabled, the topic will detect duplicate messages within the time span
   * specified by the DuplicateDetectionHistoryTimeWindow property.
   * Settable only at topic creation time.
   */
  requiresDuplicateDetection?: boolean;

  /**
   * Specifies the time span during which the Service Bus will detect message duplication.
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
   *
   * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  duplicateDetectionHistoryTimeWindow?: string;

  /**
   * Specifies if batched operations should be allowed.
   */
  enableBatchedOperations?: boolean;

  /**
   * Authorization rules on the topic
   */
  authorizationRules?: AuthorizationRule[];

  /**
   * Status of the messaging entity.
   */
  status?: EntityStatus;

  /**
   * The user provided metadata information associated with the topic.
   * Used to specify textual content such as tags, labels, etc.
   * Value must not exceed 1024 bytes encoded in utf-8.
   */
  userMetadata?: string;

  /**
   * Specifies whether the topic supports message ordering.
   */
  supportOrdering?: boolean;

  /**
   * Max idle time before entity is deleted.
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
   *
   * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  autoDeleteOnIdle?: string;

  /**
   * Specifies whether the topic should be partitioned
   */
  enablePartitioning?: boolean;

  /**
   * Specifies whether express entities are enabled on topic.
   */
  enableExpress?: boolean;

  /**
   * Availability status of the messaging entity.
   */
  availabilityStatus?: EntityAvailabilityStatus;
}

/**
 * Represents the input for updateTopic.
 *
 */
export interface TopicProperties {
  /**
   * Name of the topic
   */
  readonly name: string;

  /**
   * Determines how long a message lives in the associated subscriptions.
   * Subscriptions inherit the TTL from the topic unless they are created explicitly
   * with a smaller TTL. Based on whether dead-lettering is enabled, a message whose
   * TTL has expired will either be moved to the subscription’s associated dead-letter
   * sub-queue or will be permanently deleted.
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
   *
   * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  defaultMessageTimeToLive: string;

  /**
   * Specifies the maximum topic size in megabytes. Any attempt to enqueue a message
   * that will cause the topic to exceed this value will fail. All messages that are
   * stored in the topic or any of its subscriptions count towards this value.
   * Multiple copies of a message that reside in one or multiple subscriptions count
   * as a single messages. For example, if message m exists once in subscription s1
   * and twice in subscription s2, m is counted as a single message.
   */
  maxSizeInMegabytes: number;

  /**
   * The maximum message size in kilobytes for messages sent to this queue/topic.
   *
   * Not applicable if service version "2017-04" is chosen when creating the `ServiceBusAdministrationClient`.
   */
  maxMessageSizeInKilobytes?: number;

  /**
   * If enabled, the topic will detect duplicate messages within the time span
   * specified by the DuplicateDetectionHistoryTimeWindow property.
   * Settable only at topic creation time.
   */
  readonly requiresDuplicateDetection: boolean;

  /**
   * Specifies the time span during which the Service Bus will detect message duplication.
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
   *
   * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  duplicateDetectionHistoryTimeWindow: string;

  /**
   * Specifies if batched operations should be allowed.
   */
  enableBatchedOperations: boolean;

  /**
   * Authorization rules on the topic
   */
  authorizationRules?: AuthorizationRule[];

  /**
   * Status of the messaging entity.
   */
  status: EntityStatus;

  /**
   * The user provided metadata information associated with the topic.
   * Used to specify textual content such as tags, labels, etc.
   * Value must not exceed 1024 bytes encoded in utf-8.
   */
  userMetadata: string;

  /**
   * Specifies whether the topic supports message ordering.
   */
  supportOrdering: boolean;

  /**
   * Max idle time before entity is deleted.
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
   *
   * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  autoDeleteOnIdle: string;

  /**
   * Specifies whether the topic should be partitioned
   */
  readonly enablePartitioning: boolean;

  /**
   * Specifies whether express entities are enabled on topic.
   */
  readonly enableExpress: boolean;

  /**
   * Availability status of the messaging entity.
   */
  readonly availabilityStatus: EntityAvailabilityStatus;
}

/**
 * @internal
 * Internal representation of settable options on a topic
 */
export interface InternalTopicOptions {
  /**
   * Determines how long a message lives in the associated subscriptions. Subscriptions
   * inherit the TTL from the topic unless they are created explicitly with a smaller TTL.
   * Based on whether dead-lettering is enabled, a message whose TTL has expired will
   * either be moved to the subscription’s associated DeadLtterQueue or will be
   * permanently deleted.
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
   *
   * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  DefaultMessageTimeToLive?: string;

  /**
   * Specifies the maximum topic size in megabytes. Any attempt to enqueue a message
   * that will cause the topic to exceed this value will fail. All messages that are
   * stored in the topic or any of its subscriptions count towards this value.
   * Multiple copies of a message that reside in one or multiple subscriptions count
   * as a single messages. For example, if message m exists once in subscription s1
   * and twice in subscription s2, m is counted as a single message.
   */
  MaxSizeInMegabytes?: string;

  /**
   * The maximum message size in kilobytes for messages sent to this queue/topic
   *
   */
  MaxMessageSizeInKilobytes?: string;

  /**
   * If enabled, the topic will detect duplicate messages within the time span
   * specified by the DuplicateDetectionHistoryTimeWindow property.
   * Settable only at topic creation time.
   */
  RequiresDuplicateDetection?: string;

  /**
   * Specifies the time span during which the Service Bus will detect message
   * duplication.
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
   *
   * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  DuplicateDetectionHistoryTimeWindow?: string;

  /**
   * Specifies if batched operations should be allowed.
   */
  EnableBatchedOperations?: string;

  /**
   * Authorization rules on the topic
   */
  AuthorizationRules?: any;

  /**
   * Status of the messaging entity.
   */
  Status?: string;

  /**
   * The user provided metadata information associated with the topic.
   * Used to specify textual content such as tags, labels, etc.
   * Value must not exceed 1024 bytes encoded in utf-8.
   */
  UserMetadata?: string;

  /**
   * Specifies whether the topic supports message ordering.
   */
  SupportOrdering?: string;

  /**
   * Max idle time before entity is deleted.
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
   *
   * More on ISO-8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  AutoDeleteOnIdle?: string;

  /**
   * Specifies whether the topic should be partitioned
   */
  EnablePartitioning?: string;

  /**
   * Specifies whether express entities are enabled on queue.
   */
  EnableExpress?: string;

  /**
   * Availability status of the messaging entity.
   */
  EntityAvailabilityStatus?: string;
}

/**
 * Represents runtime info attributes of a topic entity
 */
export interface TopicRuntimeProperties {
  /**
   * Name of the topic
   */
  name: string;

  /**
   * Specifies the topic size in bytes.
   */
  sizeInBytes?: number;

  /**
   * The subscription count on given topic.
   *
   */
  subscriptionCount?: number;

  /**
   * The number of scheduled messages.
   */
  scheduledMessageCount: number;

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
 * TopicResourceSerializer for serializing / deserializing Topic entities
 */
export class TopicResourceSerializer implements AtomXmlSerializer {
  serialize(resource: InternalTopicOptions): Record<string, unknown> {
    return serializeToAtomXmlRequest("TopicDescription", resource);
  }
  async deserialize(response: FullOperationResponse): Promise<FullOperationResponse> {
    return deserializeAtomXmlResponse(["TopicName"], response);
  }
}
