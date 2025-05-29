/**
 * @internal
 */
export declare const packageJsonInfo: {
    name: string;
    version: string;
};
/**
 * @internal
 */
export declare const messageDispositionTimeout = 20000;
/**
 * The amount of time in milliseconds that a receiver
 * will wait while draining credits before returning.
 * @internal
 */
export declare const receiveDrainTimeoutInMs = 200;
/**
 * @internal
 */
export declare const max32BitNumber: number;
/**
 * Queue name identifier
 * @internal
 */
export declare const QUEUE_NAME = "QueueName";
/**
 * Topic name identifier
 * @internal
 */
export declare const TOPIC_NAME = "TopicName";
/**
 * Subscription name identifier
 * @internal
 */
export declare const SUBSCRIPTION_NAME = "SubscriptionName";
/**
 * Rule name identifier
 * @internal
 */
export declare const RULE_NAME = "RuleName";
/**
 * Accessed at field
 * @internal
 */
export declare const ACCESSED_AT = "AccessedAt";
/**
 * Updated at field
 * @internal
 */
export declare const UPDATED_AT = "UpdatedAt";
/**
 * Created at field
 * @internal
 */
export declare const CREATED_AT = "CreatedAt";
/**
 * Authorization rules on the entity
 * @internal
 */
export declare const AUTHORIZATION_RULES = "AuthorizationRules";
/**
 * Is Anonymous Accessible field
 * @internal
 */
export declare const IS_ANONYMOUS_ACCESSIBLE = "IsAnonymousAccessible";
/**
 * Entity Availability Status field
 * @internal
 */
export declare const ENTITY_AVAILABILITY_STATUS = "EntityAvailabilityStatus";
/**
 * Enable express option
 * @internal
 */
export declare const ENABLE_EXPRESS = "EnableExpress";
/**
 * Is express option
 * @internal
 */
export declare const IS_EXPRESS = "IsExpress";
/**
 * Enable Subscription Partitioning option
 * @internal
 */
export declare const ENABLE_SUBSCRIPTION_PARTITIONING = "EnableSubscriptionPartitioning";
/**
 * Filtering Messages Before Publishing option
 * @internal
 */
export declare const FILTER_MESSAGES_BEFORE_PUBLISHING = "FilteringMessagesBeforePublishing";
/**
 * The entity's size in bytes.
 *
 * @internal
 */
export declare const SIZE_IN_BYTES = "SizeInBytes";
/**
 * The entity's message count.
 *
 * @internal
 */
export declare const MESSAGE_COUNT = "MessageCount";
/**
 * The topic's subscription count.
 *
 * @internal
 */
export declare const SUBSCRIPTION_COUNT = "SubscriptionCount";
/**
 * The topic / subscription's count details.
 *
 * @internal
 */
export declare const COUNT_DETAILS = "CountDetails";
/**
 * The default rule name.
 *
 * @internal
 */
export declare const DEFAULT_RULE_NAME = "$Default";
/**
 * Max idle time before entity is deleted.
 * This is specified in ISO-8601 duration format such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
 * @internal
 */
export declare const AUTO_DELETE_ON_IDLE = "AutoDeleteOnIdle";
/**
 * The status information on response
 *
 * @internal
 */
export declare const STATUS = "Status";
/**
 * The URL of Service Bus entity to forward messages to.
 *
 * @internal
 */
export declare const FORWARD_TO = "ForwardTo";
/**
 * The user meta data information
 *
 * @internal
 */
export declare const USER_METADATA = "UserMetadata";
/**
 * The maximum size in megabytes.
 *
 * @internal
 */
export declare const MAX_SIZE_IN_MEGABYTES = "MaxSizeInMegabytes";
/**
 * The maximum size in kilobytes.
 *
 * @internal
 */
export declare const MAX_MESSAGE_SIZE_IN_KILOBYTES = "MaxMessageSizeInKilobytes";
/**
 * The default message time to live.
 * This is specified in ISO-8601 duration format such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
 * @internal
 */
export declare const DEFAULT_MESSAGE_TIME_TO_LIVE = "DefaultMessageTimeToLive";
/**
 * The lock duration.
 * This is specified in ISO-8601 duration format such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
 * @internal
 */
export declare const LOCK_DURATION = "LockDuration";
/**
 * The indication if session is required or not.
 *
 * @internal
 */
export declare const REQUIRES_SESSION = "RequiresSession";
/**
 * The indication if duplicate detection is required or not.
 *
 * @internal
 */
export declare const REQUIRES_DUPLICATE_DETECTION = "RequiresDuplicateDetection";
/**
 * The indication if dead lettering on message expiration. If it is enabled and a message expires,
 * the Service Bus moves the message from the queue into the entity dead-letter sub-queue.
 * If disabled, message will be permanently deleted from the main entity.
 * Settable only at entity creation time.
 *
 * @internal
 */
export declare const DEAD_LETTERING_ON_MESSAGE_EXPIRATION = "DeadLetteringOnMessageExpiration";
/**
 * The indication if dead lettering on filter evaluation exceptions.
 *
 * @internal
 */
export declare const DEAD_LETTERING_ON_FILTER_EVALUATION_EXCEPTIONS = "DeadLetteringOnFilterEvaluationExceptions";
/**
 * The history time window for duplicate detection.
 * This is specified in ISO-8601 duration format such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
 * @internal
 */
export declare const DUPLICATE_DETECTION_HISTORY_TIME_WINDOW = "DuplicateDetectionHistoryTimeWindow";
/**
 * The maximum delivery count of messages after which if it is still not settled, gets moved to the dead-letter sub-queue.
 *
 * @internal
 */
export declare const MAX_DELIVERY_COUNT = "MaxDeliveryCount";
/**
 * Indicates if the queue has enabled batch operations.
 *
 * @internal
 */
export declare const ENABLE_BATCHED_OPERATIONS = "EnableBatchedOperations";
/**
 * Indicates whether the topic can be ordered
 *
 * @internal
 */
export declare const SUPPORT_ORDERING = "SupportOrdering";
/**
 * Indicates whether the topic/queue should be split across multiple partitions
 *
 * @internal
 */
export declare const ENABLE_PARTITIONING = "EnablePartitioning";
/**
 * The URL of Service Bus entity to forward deadlettered messages to.
 *
 * @internal
 */
export declare const FORWARD_DEADLETTERED_MESSAGES_TO = "ForwardDeadLetteredMessagesTo";
/**
 * Query string parameter to set Service Bus API version
 *
 * @internal
 */
export declare const API_VERSION_QUERY_KEY = "api-version";
/**
 * Current API version being sent to service bus
 *
 * @internal
 */
export declare const CURRENT_API_VERSION = "2021-05";
/**
 * Constant representing the Odata Error 'message' property
 *
 * @internal
 */
export declare const ODATA_ERROR_MESSAGE = "message";
/**
 * Constant representing the 'value' property of Odata Error 'message' property
 *
 * @internal
 */
export declare const ODATA_ERROR_MESSAGE_VALUE = "value";
/**
 * Marker for atom metadata.
 *
 * @internal
 */
export declare const XML_METADATA_MARKER = "$";
/**
 * Marker for atom value.
 *
 * @internal
 */
export declare const XML_VALUE_MARKER = "_";
/**
 * Constant representing the property where the atom default elements are stored.
 *
 * @internal
 */
export declare const ATOM_METADATA_MARKER = "_";
/**
 * Known HTTP status codes as documented and referenced in ATOM based management API feature
 * https://learn.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
 * @internal
 */
export declare const HttpResponseCodes: {
    100: string;
    101: string;
    200: string;
    201: string;
    202: string;
    203: string;
    204: string;
    205: string;
    206: string;
    300: string;
    301: string;
    302: string;
    303: string;
    304: string;
    305: string;
    306: string;
    400: string;
    401: string;
    402: string;
    403: string;
    404: string;
    405: string;
    406: string;
    407: string;
    409: string;
    410: string;
    411: string;
    412: string;
    413: string;
    414: string;
    415: string;
    416: string;
    417: string;
    426: string;
    500: string;
    501: string;
    502: string;
    503: string;
    504: string;
    505: string;
};
//# sourceMappingURL=constants.d.ts.map