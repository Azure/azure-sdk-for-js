// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpOperationResponse, OperationOptions } from "@azure/core-http";
import {
  AtomXmlSerializer,
  deserializeAtomXmlResponse,
  serializeToAtomXmlRequest
} from "../util/atomXmlHelper";
import * as Constants from "../util/constants";
import {
  AuthorizationRule,
  EntityStatus,
  getAuthorizationRulesOrUndefined,
  getBoolean,
  getInteger,
  getIntegerOrUndefined,
  getRawAuthorizationRules,
  getString,
  getStringOrUndefined,
  getDate,
  getMessageCountDetails
} from "../util/utils";

/**
 * @internal
 * @ignore
 * Builds the topic options object from the user provided options.
 * Handles the differences in casing for the property names,
 * converts values to string and ensures the right order as expected by the service
 * @param topic
 */
export function buildTopicOptions(topic: CreateTopicOptions): InternalTopicOptions {
  return {
    DefaultMessageTimeToLive: topic.defaultMessageTtl,
    MaxSizeInMegabytes: getStringOrUndefined(topic.maxSizeInMegabytes),
    RequiresDuplicateDetection: getStringOrUndefined(topic.requiresDuplicateDetection),
    DuplicateDetectionHistoryTimeWindow: topic.duplicateDetectionHistoryTimeWindow,
    EnableBatchedOperations: getStringOrUndefined(topic.enableBatchedOperations),
    AuthorizationRules: getRawAuthorizationRules(topic.authorizationRules),
    Status: getStringOrUndefined(topic.status),
    UserMetadata: getStringOrUndefined(topic.userMetadata),
    SupportOrdering: getStringOrUndefined(topic.supportOrdering),
    AutoDeleteOnIdle: getStringOrUndefined(topic.autoDeleteOnIdle),
    EnablePartitioning: getStringOrUndefined(topic.enablePartitioning)
  };
}

/**
 * @internal
 * @ignore
 * Builds the topic object from the raw json object gotten after deserializing the
 * response from the service
 * @param rawTopic
 */
export function buildTopic(rawTopic: any): TopicProperties {
  return {
    name: getString(rawTopic[Constants.TOPIC_NAME], "topicName"),
    maxSizeInMegabytes: getInteger(rawTopic[Constants.MAX_SIZE_IN_MEGABYTES], "maxSizeInMegabytes"),

    enablePartitioning: getBoolean(rawTopic[Constants.ENABLE_PARTITIONING], "enablePartitioning"),
    supportOrdering: getBoolean(rawTopic[Constants.SUPPORT_ORDERING], "supportOrdering"),
    enableBatchedOperations: getBoolean(
      rawTopic[Constants.ENABLE_BATCHED_OPERATIONS],
      "enableBatchedOperations"
    ),

    defaultMessageTtl: getString(
      rawTopic[Constants.DEFAULT_MESSAGE_TIME_TO_LIVE],
      "defaultMessageTtl"
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

    status: rawTopic[Constants.STATUS]
  };
}

/**
 * @internal
 * @ignore
 * Builds the topic runtime info object from the raw json object gotten after deserializing the
 * response from the service
 * @param rawTopic
 */
export function buildTopicRuntimeProperties(rawTopic: any): TopicRuntimeProperties {
  return {
    name: getString(rawTopic[Constants.TOPIC_NAME], "topicName"),
    sizeInBytes: getIntegerOrUndefined(rawTopic[Constants.SIZE_IN_BYTES]),
    subscriptionCount: getIntegerOrUndefined(rawTopic[Constants.SUBSCRIPTION_COUNT]),
    createdAt: getDate(rawTopic[Constants.CREATED_AT], "createdAt"),
    scheduledMessageCount: getMessageCountDetails(rawTopic[Constants.COUNT_DETAILS])
      .scheduledMessageCount,
    updatedAt: getDate(rawTopic[Constants.UPDATED_AT], "updatedAt"),
    accessedAt: getDate(rawTopic[Constants.ACCESSED_AT], "accessedAt")
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
  defaultMessageTtl?: string;

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
}

/**
 * Represents the input for updateTopic.
 *
 * @export
 * @interface TopicProperties
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
  defaultMessageTtl: string;

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
}

/**
 * @internal
 * @ignore
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
  updatedAt: Date;

  /**
   * Accessed at timestamp
   */
  accessedAt: Date;
}

/**
 * @internal
 * @ignore 
 * TopicResourceSerializer for serializing / deserializing Topic entities
 */
export class TopicResourceSerializer implements AtomXmlSerializer {
  serialize(resource: InternalTopicOptions): object {
    return serializeToAtomXmlRequest("TopicDescription", resource);
  }
  async deserialize(response: HttpOperationResponse): Promise<HttpOperationResponse> {
    return deserializeAtomXmlResponse(["TopicName"], response);
  }
}
