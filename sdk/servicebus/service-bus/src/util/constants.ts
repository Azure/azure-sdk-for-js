// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

export const packageJsonInfo = {
  name: "@azure/service-bus",
  version: "1.1.0"
};

export const messageDispositionTimeout = 20000;

export const max32BitNumber = Math.pow(2, 31) - 1;

/**
 * Queue name identifier
 */
export const QUEUE_NAME = "QueueName";

/**
 * Topic name identifier
 */
export const TOPIC_NAME = "TopicName";

/**
 * Subscription name identifier
 */
export const SUBSCRIPTION_NAME = "SubscriptionName";

/**
 * Rule name identifier
 */
export const RULE_NAME = "RuleName";

/**
 * Accessed at field
 */
export const ACCESSED_AT = "AccessedAt";

/**
 * Updated at field
 */
export const UPDATED_AT = "UpdatedAt";

/**
 * Created at field
 */
export const CREATED_AT = "CreatedAt";

/**
 * Authorization rules on the entity
 */
export const AUTHORIZATION_RULES = "AuthorizationRules";

/**
 * Is Anonymous Accessible field
 */
export const IS_ANONYMOUS_ACCESSIBLE = "IsAnonymousAccessible";

/**
 * Entity Availability Status field
 */
export const ENTITY_AVAILABILITY_STATUS = "EntityAvailabilityStatus";

/**
 * Enable express option
 */
export const ENABLE_EXPRESS = "EnableExpress";

/**
 * Is express option
 */
export const IS_EXPRESS = "IsExpress";

/**
 * Enable Subscription Partitioning option
 */
export const ENABLE_SUBSCRIPTION_PARTITIONING = "EnableSubscriptionPartitioning";

/**
 * Filtering Messages Before Publishing option
 */
export const FILTER_MESSAGES_BEFORE_PUBLISHING = "FilteringMessagesBeforePublishing";

/**
 * Indicates the default rule description.
 *
 */
export const DEFAULT_RULE_DESCRIPTION = "DefaultRuleDescription";

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
 * The default rule name.
 *
 */
export const DEFAULT_RULE_NAME = "$Default";

/**
 * Max idle time before entity is deleted.
 * This is specified in ISO-8601 duration format such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
 */
export const AUTO_DELETE_ON_IDLE = "AutoDeleteOnIdle";

/**
 * The status information on response
 *
 */
export const STATUS = "Status";

/**
 * The entity path
 *
 */
export const PATH = "Path";

/**
 * The URL of Service Bus entity to forward messages to.
 *
 */
export const FORWARD_TO = "ForwardTo";

/**
 * The user meta data information
 *
 */
export const USER_METADATA = "UserMetadata";

/**
 * The maximum size in megabytes.
 *
 */
export const MAX_SIZE_IN_MEGABYTES = "MaxSizeInMegabytes";

/**
 * The default message time to live.
 * This is specified in ISO-8601 duration format such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
 */
export const DEFAULT_MESSAGE_TIME_TO_LIVE = "DefaultMessageTimeToLive";

/**
 * The lock duration.
 * This is specified in ISO-8601 duration format such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
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
 * The indication if dead lettering on message expiration. If it is enabled and a message expires,
 * the Service Bus moves the message from the queue into the entity dead-letter sub-queue.
 * If disabled, message will be permanently deleted from the main entity.
 * Settable only at entity creation time.
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
 * This is specified in ISO-8601 duration format such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
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
 * The maximum delivery count of messages after which if it is still not settled, gets moved to the dead-letter sub-queue.
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
 * The URL of Service Bus entity to forward deadlettered messages to.
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
 * Constant representing the Odata Error 'message' property
 *
 * @const
 * @type {string}
 */
export const ODATA_ERROR_MESSAGE = "message";
/**
 * Constant representing the 'value' property of Odata Error 'message' property
 *
 * @const
 * @type {string}
 */
export const ODATA_ERROR_MESSAGE_VALUE = "value";

/**
 * Marker for atom metadata.
 *
 * @const
 * @type {string}
 */
export const XML_METADATA_MARKER = "$";

/**
 * Marker for atom value.
 *
 * @const
 * @type {string}
 */
export const XML_VALUE_MARKER = "_";

/**
 * Constant representing the property where the atom default elements are stored.
 *
 * @const
 * @type {string}
 */
export const ATOM_METADATA_MARKER = "_";

export const HttpResponseCodes = {
  200: "Ok",
  201: "Created",
  202: "Accepted",
  204: "NoContent",
  206: "PartialContent",
  400: "BadRequest",
  401: "Unauthorized",
  403: "Forbidden",
  404: "NotFound",
  409: "Conflict",
  411: "LengthRequired",
  412: "PreconditionFailed"
};
