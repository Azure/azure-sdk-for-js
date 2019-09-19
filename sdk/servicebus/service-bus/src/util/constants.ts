// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

export const packageJsonInfo = {
  name: "@azure/service-bus",
  version: "1.0.4"
};


export const max32BitNumber = Math.pow(2, 31) - 1;

/**
 * The maximum size in megabytes.
 *
 */
export const MAX_SIZE_IN_MEGABYTES = "MaxSizeInMegabytes";

/**
 * The default message time to live.
 *
 */
export const DEFAULT_MESSAGE_TIME_TO_LIVE = "DefaultMessageTimeToLive";

/**
 * The lock duration.
 *
 */
export const LOCK_DURATION = "LockDuration";

/**
 * The indication if session is required or not.
 *
 */
export const REQUIRES_SESSION = "RequiresSession";

/**
 * The indication if duplicate detection is required or not.
 *
 */
export const REQUIRES_DUPLICATE_DETECTION = "RequiresDuplicateDetection";

/**
 * The indication if dead lettering on message expiration.
 *
 */
export const DEAD_LETTERING_ON_MESSAGE_EXPIRATION = "DeadLetteringOnMessageExpiration";

/**
 * The indication if dead lettering on filter evaluation exceptions.
 *
 */
export const DEAD_LETTERING_ON_FILTER_EVALUATION_EXCEPTIONS =
  "DeadLetteringOnFilterEvaluationExceptions";

/**
 * The history time window for duplicate detection.
 *
 */
export const DUPLICATE_DETECTION_HISTORY_TIME_WINDOW = "DuplicateDetectionHistoryTimeWindow";

/**
 * The maximum number of subscriptions per topic.
 *
 */
export const MAX_SUBSCRIPTIONS_PER_TOPIC = "MaxSubscriptionsPerTopic";

/**
 * The maximum amount of sql filters per topic.
 *
 */
export const MAX_SQL_FILTERS_PER_TOPIC = "MaxSqlFiltersPerTopic";

/**
 * The maximum amount of correlation filters per topic.
 *
 */
export const MAX_CORRELATION_FILTERS_PER_TOPIC = "MaxCorrelationFiltersPerTopic";

/**
 * The maximum delivery count.
 *
 */
export const MAX_DELIVERY_COUNT = "MaxDeliveryCount";

/**
 * Indicates if the queue has enabled batch operations.
 *
 */
export const ENABLE_BATCHED_OPERATIONS = "EnableBatchedOperations";

/**
 * Indicates whether the topic can be ordered
 *
 */
export const SUPPORT_ORDERING = "SupportOrdering";

/**
 * Indicates whether the topic/queue should be split across multiple partitions
 *
 */
export const ENABLE_PARTITIONING = "EnablePartitioning";

/**
 * The entity's size in bytes.
 *
 */
export const SIZE_IN_BYTES = "SizeInBytes";

/**
 * The entity's message count.
 *
 */
export const MESSAGE_COUNT = "MessageCount";

/**
 * The topic's subscription count.
 *
 */
export const SUBSCRIPTION_COUNT = "SubscriptionCount";

/**
 * The topic / subscription's count details.
 *
 */
export const COUNT_DETAILS = "CountDetails";

/**
 * Max idle time before entity is deleted
 *
 */
export const AUTO_DELETE_ON_IDLE = "AutoDeleteOnIdle";

/**
 * The status information on response
 *
 */
export const STATUS = "Status";

/**
 * The entity to forward to
 *
 */
export const FORWARD_TO = "ForwardTo";

/**
 * The user meta data information
 *
 */
export const USER_METADATA = "UserMetadata";

/**
 * Entity to forward deadlettered messages to
 *
 */
export const FORWARD_DEADLETTERED_MESSAGES_TO = "ForwardDeadLetteredMessagesTo";

/**
 * Query string parameter to set Service Bus API version
 *
 */
export const API_VERSION_QUERY_KEY = "api-version";

/**
 * Current API version being sent to service bus
 *
 */
export const CURRENT_API_VERSION = "2017-04";

/**
 * XML namespace string to use for the Atom based requests
 */
export const XML_NAMESPACE = "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect";
