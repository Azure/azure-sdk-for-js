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
  getCountDetailsOrUndefined,
  MessageCountDetails,
  getRawAuthorizationRules,
  getAuthorizationRulesOrUndefined,
  AuthorizationRule,
  getString,
  getInteger,
  getBoolean,
  getBooleanOrUndefined,
  EntityStatus
} from "../util/utils";

/**
 * @internal
 * @ignore
 * Builds the topic options object from the user provided options.
 * Handles the differences in casing for the property names,
 * converts values to string and ensures the right order as expected by the service
 * @param topicOptions
 */
export function buildTopicOptions(topicOptions: TopicOptions): InternalTopicOptions {
  return {
    DefaultMessageTimeToLive: topicOptions.defaultMessageTtl,
    MaxSizeInMegabytes: getStringOrUndefined(topicOptions.maxSizeInMegabytes),
    RequiresDuplicateDetection: getStringOrUndefined(topicOptions.requiresDuplicateDetection),
    DuplicateDetectionHistoryTimeWindow: topicOptions.duplicateDetectionHistoryTimeWindow,
    EnableBatchedOperations: getStringOrUndefined(topicOptions.enableBatchedOperations),
    AuthorizationRules: getRawAuthorizationRules(topicOptions.authorizationRules),
    Status: getStringOrUndefined(topicOptions.status),
    UserMetadata: getStringOrUndefined(topicOptions.userMetadata),
    SupportOrdering: getStringOrUndefined(topicOptions.supportOrdering),
    AutoDeleteOnIdle: getStringOrUndefined(topicOptions.autoDeleteOnIdle),
    EnablePartitioning: getStringOrUndefined(topicOptions.enablePartitioning)
  };
}

/**
 * @internal
 * @ignore
 * Builds the topic object from the raw json object gotten after deserializing the
 * response from the service
 * @param rawTopic
 */
export function buildTopic(rawTopic: any): TopicDetails {
  return {
    topicName: getString(rawTopic[Constants.TOPIC_NAME], "topicName"),
    sizeInBytes: getIntegerOrUndefined(rawTopic[Constants.SIZE_IN_BYTES]),
    maxSizeInMegabytes: getInteger(rawTopic[Constants.MAX_SIZE_IN_MEGABYTES], "maxSizeInMegabytes"),
    messageCount: getIntegerOrUndefined(rawTopic[Constants.MESSAGE_COUNT]),
    maxDeliveryCount: getIntegerOrUndefined(rawTopic[Constants.MAX_DELIVERY_COUNT]),
    subscriptionCount: getIntegerOrUndefined(rawTopic[Constants.SUBSCRIPTION_COUNT]),

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
    autoDeleteOnIdle: getStringOrUndefined(rawTopic[Constants.AUTO_DELETE_ON_IDLE]),

    requiresDuplicateDetection: getBoolean(
      rawTopic[Constants.REQUIRES_DUPLICATE_DETECTION],
      "requiresDuplicateDetection"
    ),
    duplicateDetectionHistoryTimeWindow: getString(
      rawTopic[Constants.DUPLICATE_DETECTION_HISTORY_TIME_WINDOW],
      "duplicateDetectionHistoryTimeWindow"
    ),

    filteringMessagesBeforePublishing: getBooleanOrUndefined(
      rawTopic[Constants.FILTER_MESSAGES_BEFORE_PUBLISHING]
    ),
    enableSubscriptionPartitioning: getBooleanOrUndefined(
      rawTopic[Constants.ENABLE_SUBSCRIPTION_PARTITIONING]
    ),

    messageCountDetails: getCountDetailsOrUndefined(rawTopic[Constants.COUNT_DETAILS]),
    isExpress: getBooleanOrUndefined(rawTopic[Constants.IS_EXPRESS]),
    enableExpress: getBooleanOrUndefined(rawTopic[Constants.ENABLE_EXPRESS]),

    authorizationRules: getAuthorizationRulesOrUndefined(rawTopic[Constants.AUTHORIZATION_RULES]),
    isAnonymousAccessible: getBooleanOrUndefined(rawTopic[Constants.IS_ANONYMOUS_ACCESSIBLE]),
    userMetadata: rawTopic[Constants.USER_METADATA],

    entityAvailabilityStatus: rawTopic[Constants.ENTITY_AVAILABILITY_STATUS],
    status: rawTopic[Constants.STATUS],
    createdOn: rawTopic[Constants.CREATED_AT],
    updatedOn: rawTopic[Constants.UPDATED_AT],
    accessedOn: rawTopic[Constants.ACCESSED_AT]
  };
}

/**
 * @internal
 * @ignore
 * Represents settable options on a topic
 */
export interface TopicOptions {
  /**
   * Determines how long a message lives in the associated subscriptions.
   * Subscriptions inherit the TTL from the topic unless they are created explicitly
   * with a smaller TTL. Based on whether dead-lettering is enabled, a message whose
   * TTL has expired will either be moved to the subscription’s associated dead-letter
   * sub-queue or will be permanently deleted.
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
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
   * The user provided metadata information associated with the topic description.
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
   */
  autoDeleteOnIdle?: string;

  /**
   * Specifies whether the topic should be partitioned
   */
  enablePartitioning?: boolean;
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
   * The user provided metadata information associated with the topic description.
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
   */
  AutoDeleteOnIdle?: string;

  /**
   * Specifies whether the topic should be partitioned
   */
  EnablePartitioning?: string;
}

/**
 * @internal
 * @ignore
 * Represents all attributes of a topic entity
 */
export interface TopicDetails {
  /**
   * Name of the topic
   */
  topicName: string;

  /**
   * Specifies the topic size in bytes.
   */
  sizeInBytes?: number;

  /**
   * Specifies the maximum topic size in megabytes. Any attempt to enqueue a message
   * that will cause the topic to exceed this value will fail. All messages that are
   * stored in the topic or any of its subscriptions count towards this value.
   * Multiple copies of a message that reside in one or multiple subscriptions
   * count as a single messages. For example, if message m exists once in subscription
   * s1 and twice in subscription s2, m is counted as a single message.
   */
  maxSizeInMegabytes: number;

  /**
   * If enabled, the topic will detect duplicate messages within the time span specified
   * by the DuplicateDetectionHistoryTimeWindow property.
   * Settable only at topic creation time.
   */
  requiresDuplicateDetection: boolean;

  /**
   * Enable Subscription Partitioning option
   */
  enableSubscriptionPartitioning?: boolean;

  /**
   * Filtering Messages Before Publishing option
   */
  filteringMessagesBeforePublishing?: boolean;

  /**
   * Authorization rules on the topic
   */
  authorizationRules?: AuthorizationRule[];

  /**
   * Specifies whether the topic should be partitioned
   */
  enablePartitioning: boolean;

  /**
   * Specifies whether the topic supports message ordering.
   */
  supportOrdering: boolean;

  /**
   * Specifies if batched operations should be allowed.
   */
  enableBatchedOperations: boolean;

  /**
   * Max idle time before entity is deleted.
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
   */
  autoDeleteOnIdle?: string;

  /**
   * The entity's message count.
   *
   */
  messageCount?: number;

  /**
   * The subscription count on given topic.
   *
   */
  subscriptionCount?: number;

  /**
   * The maximum delivery count of messages after which if it is still not settled,
   * gets moved to the dead-letter sub-queue.
   *
   */
  maxDeliveryCount?: number;

  /**
   * Determines how long a message lives in the associated subscriptions.
   * Subscriptions inherit the TTL from the topic unless they are created explicitly with
   * a smaller TTL. Based on whether dead-lettering is enabled, a message whose TTL has
   * expired will either be moved to the subscription’s associated dead-letter sub-queue or
   * will be permanently deleted.
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
   */
  defaultMessageTtl: string;

  /**
   * Specifies the time span during which the Service Bus will detect message duplication.
   * This is to be specified in ISO-8601 duration format
   * such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
   */
  duplicateDetectionHistoryTimeWindow: string;

  /**
   * The user provided metadata information associated with the topic description.
   * Used to specify textual content such as tags, labels, etc.
   * Value must not exceed 1024 bytes encoded in utf-8.
   */
  userMetadata?: string;

  /**
   * Is Express option
   */
  isExpress?: boolean;

  /**
   * Enable express option
   */
  enableExpress?: boolean;

  /**
   * Message count details
   */
  messageCountDetails?: MessageCountDetails;

  /**
   * Is anonymous accessible topic option
   */
  isAnonymousAccessible?: boolean;

  /**
   * Entity availability status
   */
  entityAvailabilityStatus?: string;

  /**
   * Status of the messaging entity.
   */
  status?: EntityStatus;

  /**
   * Created at timestamp
   */
  createdOn?: string;

  /**
   * Updated at timestamp
   */
  updatedOn?: string;

  /**
   * Accessed at timestamp
   */
  accessedOn?: string;
}

/**
 * @internal
 * @ignore TopicResourceSerializer for serializing / deserializing Topic entities
 */
export class TopicResourceSerializer implements AtomXmlSerializer {
  serialize(resource: InternalTopicOptions): object {
    return serializeToAtomXmlRequest("TopicDescription", resource);
  }
  async deserialize(response: HttpOperationResponse): Promise<HttpOperationResponse> {
    return deserializeAtomXmlResponse(["TopicName"], response);
  }
}
