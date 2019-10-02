// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { AtomXmlSerializer, HttpOperationResponse, XMLRequestInJSON } from "@azure/core-http";
import * as Constants from "../util/constants";
import { serializeToAtomXmlRequest, deserializeAtomXmlResponse } from "../util/atomXmlHelper";
import {
  getStringOrUndefined,
  getIntegerOrUndefined,
  getBooleanOrUndefined,
  getCountDetailsOrUndefined,
  CountDetails
} from "../util/utils";

const requestProperties: Array<keyof InternalTopicOptions> = [
  Constants.SIZE_IN_BYTES,

  Constants.MESSAGE_COUNT,
  Constants.SUBSCRIPTION_COUNT,
  Constants.MAX_DELIVERY_COUNT,

  Constants.DEFAULT_MESSAGE_TIME_TO_LIVE,
  Constants.DUPLICATE_DETECTION_HISTORY_TIME_WINDOW
];

/**
 * @ignore
 * Builds the topic options object
 * @param topicOptions
 */
export function buildTopicOptions(topicOptions: TopicOptions): InternalTopicOptions {
  const internalQueueOptions: InternalTopicOptions = {
    SizeInBytes: getStringOrUndefined(topicOptions.sizeInBytes),

    MessageCount: getStringOrUndefined(topicOptions.messageCount),
    SubscriptionCount: getStringOrUndefined(topicOptions.subscriptionCount),
    MaxDeliveryCount: getStringOrUndefined(topicOptions.maxDeliveryCount),

    DefaultMessageTimeToLive: topicOptions.defaultMessageTimeToLive,
    DuplicateDetectionHistoryTimeWindow: topicOptions.duplicateDetectionHistoryTimeWindow
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

      authorizationRules: rawTopic["AuthorizationRules"],
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
   * Specifies the maximum topic size in megabytes. Any attempt to enqueue a message that will cause the topic to exceed this value will fail. All messages that are stored in the topic or any of its subscriptions count towards this value. Multiple copies of a message that reside in one or multiple subscriptions count as a single messages. For example, if message m exists once in subscription s1 and twice in subscription s2, m is counted as a single message.
   */
  maxSizeInMegabytes?: number;

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
   * The topic's count details.
   */
  countDetails?: CountDetails;

  /**
   * Is Express option
   */
  isExpress?: boolean;

  /**
   * Enable express option
   */
  enableExpress?: boolean;

  /**
   * Is anonymous accessible topic option
   */
  isAnonymousAccessible?: boolean;

  /**
   * Authorization rules on the topic
   */
  authorizationRules?: any;

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
  serialize(resource: InternalTopicOptions): XMLRequestInJSON {
    return serializeToAtomXmlRequest(
      "TopicDescription",
      resource,
      requestProperties,
      Constants.XML_NAMESPACE
    );
  }
  async deserialize(response: HttpOperationResponse): Promise<HttpOperationResponse> {
    return deserializeAtomXmlResponse(["TopicName"], response);
  }
}
