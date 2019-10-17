// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { HttpOperationResponse } from "@azure/core-http";
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
  CountDetails,
  getRawAuthorizationRules,
  getAuthorizationRulesOrUndefined,
  AuthorizationRule
} from "../util/utils";

/**
 * @ignore
 * Builds the topic options object
 * @param topicOptions
 */
export function buildTopicOptions(topicOptions: TopicOptions): InternalTopicOptions {
  const internalQueueOptions: InternalTopicOptions = {
    DefaultMessageTimeToLive: topicOptions.defaultMessageTimeToLive,
    MaxSizeInMegabytes: getStringOrUndefined(topicOptions.maxSizeInMegabytes),
    RequiresDuplicateDetection: getStringOrUndefined(topicOptions.requiresDuplicateDetection),
    DuplicateDetectionHistoryTimeWindow: topicOptions.duplicateDetectionHistoryTimeWindow,
    EnableBatchedOperations: getStringOrUndefined(topicOptions.enableBatchedOperations),
    SizeInBytes: getStringOrUndefined(topicOptions.sizeInBytes),

    AutoDeleteOnIdle: getStringOrUndefined(topicOptions.autoDeleteOnIdle),
    AuthorizationRules: getRawAuthorizationRules(topicOptions.authorizationRules),
    SupportOrdering: getStringOrUndefined(topicOptions.supportOrdering),
    MaxSubscriptionsPerTopic: getStringOrUndefined(topicOptions.maxSubscriptionsPerTopic),
    MaxSqlFiltersPerTopic: getStringOrUndefined(topicOptions.maxSqlFiltersPerTopic),
    MaxCorrelationFiltersPerTopic: getStringOrUndefined(topicOptions.maxCorrelationFiltersPerTopic),
    EnableExpress: getStringOrUndefined(topicOptions.enableExpress),
    IsExpress: getStringOrUndefined(topicOptions.isExpress),
    EnableSubscriptionPartitioning: getStringOrUndefined(
      topicOptions.enableSubscriptionPartitioning
    ),
    FilteringMessagesBeforePublishing: getStringOrUndefined(
      topicOptions.filteringMessagesBeforePublishing
    ),
    EnablePartitioning: getStringOrUndefined(topicOptions.enablePartitioning),
    MessageCount: getStringOrUndefined(topicOptions.messageCount),
    SubscriptionCount: getStringOrUndefined(topicOptions.subscriptionCount),
    MaxDeliveryCount: getStringOrUndefined(topicOptions.maxDeliveryCount)
  };

  return internalQueueOptions;
}

/**
 * @ignore
 * Builds the topic object
 * @param rawTopic
 */
export function buildTopic(rawTopic: any): Topic | undefined {
  if (rawTopic == undefined) {
    return undefined;
  } else {
    const result: Topic = {
      topicName: rawTopic["TopicName"],

      sizeInBytes: getIntegerOrUndefined(rawTopic["SizeInBytes"]),
      maxSizeInMegabytes: getIntegerOrUndefined(rawTopic["MaxSizeInMegabytes"]),

      messageCount: getIntegerOrUndefined(rawTopic["MessageCount"]),
      maxDeliveryCount: getIntegerOrUndefined(rawTopic["MaxDeliveryCount"]),
      subscriptionCount: getIntegerOrUndefined(rawTopic["SubscriptionCount"]),

      enablePartitioning: getBooleanOrUndefined(rawTopic["EnablePartitioning"]),
      supportOrdering: getBooleanOrUndefined(rawTopic["SupportOrdering"]),
      enableBatchedOperations: getBooleanOrUndefined(rawTopic["EnableBatchedOperations"]),

      defaultMessageTimeToLive: rawTopic["DefaultMessageTimeToLive"],
      autoDeleteOnIdle: rawTopic["AutoDeleteOnIdle"],

      requiresDuplicateDetection: getBooleanOrUndefined(rawTopic["RequiresDuplicateDetection"]),
      duplicateDetectionHistoryTimeWindow: rawTopic["DuplicateDetectionHistoryTimeWindow"],

      filteringMessagesBeforePublishing: getBooleanOrUndefined(
        rawTopic["FilteringMessagesBeforePublishing"]
      ),
      enableSubscriptionPartitioning: getBooleanOrUndefined(
        rawTopic["EnableSubscriptionPartitioning"]
      ),

      countDetails: getCountDetailsOrUndefined(rawTopic["CountDetails"]),
      isExpress: getBooleanOrUndefined(rawTopic["IsExpress"]),
      enableExpress: getBooleanOrUndefined(rawTopic["EnableExpress"]),
      maxSubscriptionsPerTopic: getIntegerOrUndefined(rawTopic["MaxSubscriptionsPerTopic"]),
      maxSqlFiltersPerTopic: getIntegerOrUndefined(rawTopic["MaxSqlFiltersPerTopic"]),
      maxCorrelationFiltersPerTopic: getIntegerOrUndefined(
        rawTopic["MaxCorrelationFiltersPerTopic"]
      ),

      authorizationRules: getAuthorizationRulesOrUndefined(rawTopic["AuthorizationRules"]),
      isAnonymousAccessible: getBooleanOrUndefined(rawTopic["IsAnonymousAccessible"]),

      entityAvailabilityStatus: rawTopic["EntityAvailabilityStatus"],
      status: rawTopic["Status"],
      createdAt: rawTopic["CreatedAt"],
      updatedAt: rawTopic["UpdatedAt"],
      accessedAt: rawTopic["AccessedAt"]
    };
    return result;
  }
}

/**
 * Represents settable options on a topic
 */
export interface TopicOptions {
  /**
   * Specifies the topic size in bytes.
   */
  sizeInBytes?: number;

  /**
   * Specifies the maximum topic size in megabytes. Any attempt to enqueue a message that will cause the topic to exceed this value will fail. All messages that are stored in the topic or any of its subscriptions count towards this value. Multiple copies of a message that reside in one or multiple subscriptions count as a single messages. For example, if message m exists once in subscription s1 and twice in subscription s2, m is counted as a single message.
   */
  maxSizeInMegabytes?: number;

  /**
   * If enabled, the topic will detect duplicate messages within the time span specified by the DuplicateDetectionHistoryTimeWindow property. Settable only at topic creation time.
   */
  requiresDuplicateDetection?: boolean;

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
  enablePartitioning?: boolean;

  /**
   * Specifies whether the topic supports message ordering.
   */
  supportOrdering?: boolean;

  /**
   * Specifies if batched operations should be allowed.
   */
  enableBatchedOperations?: boolean;

  /**
   * Max idle time before entity is deleted
   *
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
   * The maximum delivery count.
   *
   */
  maxDeliveryCount?: number;

  /**
   * Determines how long a message lives in the associated subscriptions. Subscriptions inherit the TTL from the topic unless they are created explicitly with a smaller TTL. Based on whether dead-lettering is enabled, a message whose TTL has expired will either be moved to the subscription’s associated DeadLtterQueue or will be permanently deleted.
   */
  defaultMessageTimeToLive?: string;

  /**
   * Specifies the time span during which the Service Bus will detect message duplication.
   */
  duplicateDetectionHistoryTimeWindow?: string;

  /**
   * User metadata
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
   * The maximum number of subscriptions per topic.
   *
   */
  maxSubscriptionsPerTopic?: number;

  /**
   * The maximum amount of sql filters per topic.
   *
   */
  maxSqlFiltersPerTopic?: number;

  /**
   * The maximum amount of correlation filters per topic.
   *
   */
  maxCorrelationFiltersPerTopic?: number;
}

/**
 * @ignore
 * Internal representation of settable options on a topic
 */
export interface InternalTopicOptions {
  /**
   * Specifies the topic size in bytes.
   */
  SizeInBytes?: string;

  /**
   * Specifies the maximum topic size in megabytes. Any attempt to enqueue a message that will cause the topic to exceed this value will fail. All messages that are stored in the topic or any of its subscriptions count towards this value. Multiple copies of a message that reside in one or multiple subscriptions count as a single messages. For example, if message m exists once in subscription s1 and twice in subscription s2, m is counted as a single message.
   */
  MaxSizeInMegabytes?: string;

  /**
   * If enabled, the topic will detect duplicate messages within the time span specified by the DuplicateDetectionHistoryTimeWindow property. Settable only at topic creation time.
   */
  RequiresDuplicateDetection?: string;

  /**
   * Enable Subscription Partitioning option
   */
  EnableSubscriptionPartitioning?: string;

  /**
   * Filtering Messages Before Publishing option
   */
  FilteringMessagesBeforePublishing?: string;

  /**
   * Authorization rules on the topic
   */
  AuthorizationRules?: any;

  /**
   * Specifies whether the topic should be partitioned
   */
  EnablePartitioning?: string;

  /**
   * Specifies whether the topic supports message ordering.
   */
  SupportOrdering?: string;

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
   * The entity's message count.
   *
   */
  MessageCount?: string;

  /**
   * The subscription count on given topic.
   *
   */
  SubscriptionCount?: string;

  /**
   * The maximum delivery count.
   *
   */
  MaxDeliveryCount?: string;

  /**
   * Determines how long a message lives in the associated subscriptions. Subscriptions inherit the TTL from the topic unless they are created explicitly with a smaller TTL. Based on whether dead-lettering is enabled, a message whose TTL has expired will either be moved to the subscription’s associated DeadLtterQueue or will be permanently deleted.
   */
  DefaultMessageTimeToLive?: string;

  /**
   * Specifies the time span during which the Service Bus will detect message duplication.
   */
  DuplicateDetectionHistoryTimeWindow?: string;

  /**
   * User metadata
   */
  UserMetadata?: string;

  /**
   * Is Express option
   */
  IsExpress?: string;

  /**
   * Enable express option
   */
  EnableExpress?: string;

  /**
   * The maximum number of subscriptions per topic.
   *
   */
  MaxSubscriptionsPerTopic?: string;

  /**
   * The maximum amount of sql filters per topic.
   *
   */
  MaxSqlFiltersPerTopic?: string;

  /**
   * The maximum amount of correlation filters per topic.
   *
   */
  MaxCorrelationFiltersPerTopic?: string;
}

/**
 * Represents all attributes of a topic entity
 */
export interface Topic extends TopicOptions {
  /**
   * Name of the topic
   */

  topicName?: string;

  /**
   * The topic's count details.
   */
  countDetails?: CountDetails;

  /**
   * Is anonymous accessible topic option
   */
  isAnonymousAccessible?: boolean;

  /**
   * Entity availability status
   */
  entityAvailabilityStatus?: string;

  /**
   * Topic entity status
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
