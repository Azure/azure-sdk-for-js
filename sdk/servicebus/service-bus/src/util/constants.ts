// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

export const packageJsonInfo = {
  name: "@azure/service-bus",
  version: "1.0.3"
};

export const messageDispositionTimeout = 20000;

export const max32BitNumber = Math.pow(2, 31) - 1;

/**
 * Defines constants for use with service bus.
 *
 * @const
 * @type {string}
 */
export const ServiceBusAtomXmlConstants = {
  /**
   * The maximum size in megabytes.
   *
   * @const
   * @type {string}
   */
  MAX_SIZE_IN_MEGABYTES: "MaxSizeInMegabytes",

  /**
   * The default message time to live.
   *
   * @const
   * @type {string}
   */
  DEFAULT_MESSAGE_TIME_TO_LIVE: "DefaultMessageTimeToLive",

  /**
   * The lock duration.
   *
   * @const
   * @type {string}
   */
  LOCK_DURATION: "LockDuration",

  /**
   * The indication if session is required or not.
   *
   * @const
   * @type {string}
   */
  REQUIRES_SESSION: "RequiresSession",

  /**
   * The indication if duplicate detection is required or not.
   *
   * @const
   * @type {string}
   */
  REQUIRES_DUPLICATE_DETECTION: "RequiresDuplicateDetection",

  /**
   * The indication if dead lettering on message expiration.
   *
   * @const
   * @type {string}
   */
  DEAD_LETTERING_ON_MESSAGE_EXPIRATION: "DeadLetteringOnMessageExpiration",

  /**
   * The indication if dead lettering on filter evaluation exceptions.
   *
   * @const
   * @type {string}
   */
  DEAD_LETTERING_ON_FILTER_EVALUATION_EXCEPTIONS: "DeadLetteringOnFilterEvaluationExceptions",

  /**
   * The history time window for duplicate detection.
   *
   * @const
   * @type {string}
   */
  DUPLICATE_DETECTION_HISTORY_TIME_WINDOW: "DuplicateDetectionHistoryTimeWindow",

  /**
   * The maximum number of subscriptions per topic.
   *
   * @const
   * @type {string}
   */
  MAX_SUBSCRIPTIONS_PER_TOPIC: "MaxSubscriptionsPerTopic",

  /**
   * The maximum amount of sql filters per topic.
   *
   * @const
   * @type {string}
   */
  MAX_SQL_FILTERS_PER_TOPIC: "MaxSqlFiltersPerTopic",

  /**
   * The maximum amount of correlation filters per topic.
   *
   * @const
   * @type {string}
   */
  MAX_CORRELATION_FILTERS_PER_TOPIC: "MaxCorrelationFiltersPerTopic",

  /**
   * The maximum delivery count.
   *
   * @const
   * @type {string}
   */
  MAX_DELIVERY_COUNT: "MaxDeliveryCount",

  /**
   * Indicates if the queue has enabled batch operations.
   *
   * @const
   * @type {string}
   */
  ENABLE_BATCHED_OPERATIONS: "EnableBatchedOperations",

  /**
   * Indicates whether the topic can be ordered
   *
   * @const
   * @type {string}
   */
  SUPPORT_ORDERING: "SupportOrdering",

  /**
   * Indicates whether the topic/queue should be split across multiple partitions
   *
   * @const
   * @type {string}
   */
  ENABLE_PARTITIONING: "EnablePartitioning",

  /**
   * Indicates the default rule description.
   *
   * @const
   * @type {string}
   */
  DEFAULT_RULE_DESCRIPTION: "DefaultRuleDescription",

  /**
   * The entity's size in bytes.
   *
   * @const
   * @type {string}
   */
  SIZE_IN_BYTES: "SizeInBytes",

  /**
   * The queue's message count.
   *
   * @const
   * @type {string}
   */
  MESSAGE_COUNT: "MessageCount",

  /**
   * The topic's subscription count.
   *
   * @const
   * @type {string}
   */
  SUBSCRIPTION_COUNT: "SubscriptionCount",

  /**
   * The topic's count details.
   *
   * @const
   * @type {string}
   */
  COUNT_DETAILS: "CountDetails",

  /**
   * The default rule name.
   *
   * @const
   * @type {string}
   */
  DEFAULT_RULE_NAME: "$Default",

  /**
   * The wrap access token.
   *
   * @const
   * @type {string}
   */
  WRAP_ACCESS_TOKEN: "wrap_access_token",

  /**
   * The wrap access token expires utc.
   *
   * @const
   * @type {string}
   */
  WRAP_ACCESS_TOKEN_EXPIRES_UTC: "wrap_access_token_expires_utc",

  /**
   * The wrap access token expires in.
   *
   * @const
   * @type {string}
   */
  WRAP_ACCESS_TOKEN_EXPIRES_IN: "wrap_access_token_expires_in",

  /**
   * Max idle time before entity is deleted
   *
   * @const
   * @type {string}
   */
  AUTO_DELETE_ON_IDLE: "AutoDeleteOnIdle",

  /**
   * The status information on response
   *
   * @const
   * @type {string}
   */
  STATUS: "Status",

  /**
   * The entity to forward to
   *
   * @const
   * @type {string}
   */
  FORWARD_TO: "ForwardTo",

  /**
   * The user meta data information
   *
   * @const
   * @type {string}
   */
  USER_METADATA: "UserMetadata",

  /**
   * Entity to forward deadlettered messages to
   *
   * @const
   * @type {string}
   */
  FORWARD_DEADLETTERED_MESSAGES_TO: "ForwardDeadLetteredMessagesTo",

  /**
   * Query string parameter to set Service Bus API version
   *
   * @const
   * @type {string}
   */
  API_VERSION_QUERY_KEY: "api-version",

  /**
   * Current API version being sent to service bus
   *
   * @const
   * @type {string}
   */
  CURRENT_API_VERSION: "2016-07",

  /**
   * XML namespace string to use for the Atom based requests
   */
  XML_NAMESPACE: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect"
};
