// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @internal
 * @ignore
 */
export const packageJsonInfo = {
  name: "@azure/service-bus",
  version: "7.0.0-preview.6"
};

/**
 * @internal
 * @ignore
 */
export const messageDispositionTimeout = 20000;

/**
 * @internal
 * @ignore
 */
export const max32BitNumber = Math.pow(2, 31) - 1;

/**
 * Queue name identifier
 * @internal
 * @ignore
 */
export const QUEUE_NAME = "QueueName";

/**
 * Topic name identifier
 * @internal
 * @ignore
 */
export const TOPIC_NAME = "TopicName";

/**
 * Subscription name identifier
 * @internal
 * @ignore
 */
export const SUBSCRIPTION_NAME = "SubscriptionName";

/**
 * Rule name identifier
 * @internal
 * @ignore
 */
export const RULE_NAME = "RuleName";

/**
 * Accessed at field
 * @internal
 * @ignore
 */
export const ACCESSED_AT = "AccessedAt";

/**
 * Updated at field
 * @internal
 * @ignore
 */
export const UPDATED_AT = "UpdatedAt";

/**
 * Created at field
 * @internal
 * @ignore
 */
export const CREATED_AT = "CreatedAt";

/**
 * Authorization rules on the entity
 * @internal
 * @ignore
 */
export const AUTHORIZATION_RULES = "AuthorizationRules";

/**
 * Is Anonymous Accessible field
 * @internal
 * @ignore
 */
export const IS_ANONYMOUS_ACCESSIBLE = "IsAnonymousAccessible";

/**
 * Entity Availability Status field
 * @internal
 * @ignore
 */
export const ENTITY_AVAILABILITY_STATUS = "EntityAvailabilityStatus";

/**
 * Enable express option
 * @internal
 * @ignore
 */
export const ENABLE_EXPRESS = "EnableExpress";

/**
 * Is express option
 * @internal
 * @ignore
 */
export const IS_EXPRESS = "IsExpress";

/**
 * Enable Subscription Partitioning option
 * @internal
 * @ignore
 */
export const ENABLE_SUBSCRIPTION_PARTITIONING = "EnableSubscriptionPartitioning";

/**
 * Filtering Messages Before Publishing option
 * @internal
 * @ignore
 */
export const FILTER_MESSAGES_BEFORE_PUBLISHING = "FilteringMessagesBeforePublishing";

/**
 * Indicates the default rule description.
 *
 * @internal
 * @ignore
 */
export const DEFAULT_RULE_DESCRIPTION = "DefaultRuleDescription";

/**
 * The entity's size in bytes.
 *
 * @internal
 * @ignore
 */
export const SIZE_IN_BYTES = "SizeInBytes";

/**
 * The entity's message count.
 *
 * @internal
 * @ignore
 */
export const MESSAGE_COUNT = "MessageCount";

/**
 * The topic's subscription count.
 *
 * @internal
 * @ignore
 */
export const SUBSCRIPTION_COUNT = "SubscriptionCount";

/**
 * The topic / subscription's count details.
 *
 * @internal
 * @ignore
 */
export const COUNT_DETAILS = "CountDetails";

/**
 * The default rule name.
 *
 * @internal
 * @ignore
 */
export const DEFAULT_RULE_NAME = "$Default";

/**
 * Max idle time before entity is deleted.
 * This is specified in ISO-8601 duration format such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
 * @internal
 * @ignore
 */
export const AUTO_DELETE_ON_IDLE = "AutoDeleteOnIdle";

/**
 * The status information on response
 *
 * @internal
 * @ignore
 */
export const STATUS = "Status";

/**
 * The URL of Service Bus entity to forward messages to.
 *
 * @internal
 * @ignore
 */
export const FORWARD_TO = "ForwardTo";

/**
 * The user meta data information
 *
 * @internal
 * @ignore
 */
export const USER_METADATA = "UserMetadata";

/**
 * The maximum size in megabytes.
 *
 * @internal
 * @ignore
 */
export const MAX_SIZE_IN_MEGABYTES = "MaxSizeInMegabytes";

/**
 * The default message time to live.
 * This is specified in ISO-8601 duration format such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
 * @internal
 * @ignore
 */
export const DEFAULT_MESSAGE_TIME_TO_LIVE = "DefaultMessageTimeToLive";

/**
 * The lock duration.
 * This is specified in ISO-8601 duration format such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
 * @internal
 * @ignore
 */
export const LOCK_DURATION = "LockDuration";

/**
 * The indication if session is required or not.
 *
 * @internal
 * @ignore
 */
export const REQUIRES_SESSION = "RequiresSession";

/**
 * The indication if duplicate detection is required or not.
 *
 * @internal
 * @ignore
 */
export const REQUIRES_DUPLICATE_DETECTION = "RequiresDuplicateDetection";

/**
 * The indication if dead lettering on message expiration. If it is enabled and a message expires,
 * the Service Bus moves the message from the queue into the entity dead-letter sub-queue.
 * If disabled, message will be permanently deleted from the main entity.
 * Settable only at entity creation time.
 *
 * @internal
 * @ignore
 */
export const DEAD_LETTERING_ON_MESSAGE_EXPIRATION = "DeadLetteringOnMessageExpiration";

/**
 * The indication if dead lettering on filter evaluation exceptions.
 *
 * @internal
 * @ignore
 */
export const DEAD_LETTERING_ON_FILTER_EVALUATION_EXCEPTIONS =
  "DeadLetteringOnFilterEvaluationExceptions";

/**
 * The history time window for duplicate detection.
 * This is specified in ISO-8601 duration format such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
 * @internal
 * @ignore
 */
export const DUPLICATE_DETECTION_HISTORY_TIME_WINDOW = "DuplicateDetectionHistoryTimeWindow";

/**
 * The maximum delivery count of messages after which if it is still not settled, gets moved to the dead-letter sub-queue.
 *
 * @internal
 * @ignore
 */
export const MAX_DELIVERY_COUNT = "MaxDeliveryCount";

/**
 * Indicates if the queue has enabled batch operations.
 *
 * @internal
 * @ignore
 */
export const ENABLE_BATCHED_OPERATIONS = "EnableBatchedOperations";

/**
 * Indicates whether the topic can be ordered
 *
 * @internal
 * @ignore
 */
export const SUPPORT_ORDERING = "SupportOrdering";

/**
 * Indicates whether the topic/queue should be split across multiple partitions
 *
 * @internal
 * @ignore
 */
export const ENABLE_PARTITIONING = "EnablePartitioning";

/**
 * The URL of Service Bus entity to forward deadlettered messages to.
 *
 * @internal
 * @ignore
 */
export const FORWARD_DEADLETTERED_MESSAGES_TO = "ForwardDeadLetteredMessagesTo";

/**
 * Query string parameter to set Service Bus API version
 *
 * @internal
 * @ignore
 */
export const API_VERSION_QUERY_KEY = "api-version";

/**
 * Current API version being sent to service bus
 *
 * @internal
 * @ignore
 */
export const CURRENT_API_VERSION = "2017-04";

/**
 * Constant representing the Odata Error 'message' property
 *
 * @internal
 * @ignore
 */
export const ODATA_ERROR_MESSAGE = "message";
/**
 * Constant representing the 'value' property of Odata Error 'message' property
 *
 * @internal
 * @ignore
 */
export const ODATA_ERROR_MESSAGE_VALUE = "value";

/**
 * Marker for atom metadata.
 *
 * @internal
 * @ignore
 */
export const XML_METADATA_MARKER = "$";

/**
 * Marker for atom value.
 *
 * @internal
 * @ignore
 */
export const XML_VALUE_MARKER = "_";

/**
 * Constant representing the property where the atom default elements are stored.
 *
 * @internal
 * @ignore
 */
export const ATOM_METADATA_MARKER = "_";

/**
 * Known HTTP status codes as documented and referenced in ATOM based management API feature
 * https://docs.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
 * @internal
 * @ignore
 */
export const HttpResponseCodes = {
  100: "Continue",
  101: "SwitchingProtocols",
  200: "Ok",
  201: "Created",
  202: "Accepted",
  203: "NonAuthoritativeInformation",
  204: "NoContent",
  205: "ResetContent",
  206: "PartialContent",
  300: "MultipleChoices",
  301: "Moved",
  302: "Redirect",
  303: "RedirectMethod",
  304: "NotModified",
  305: "UseProxy",
  306: "Unused",
  400: "BadRequest",
  401: "Unauthorized",
  402: "PaymentRequired",
  403: "Forbidden",
  404: "NotFound",
  405: "MethodNotAllowed",
  406: "NotAcceptable",
  407: "ProxyAuthenticationRequired",
  409: "Conflict",
  410: "Gone",
  411: "LengthRequired",
  412: "PreconditionFailed",
  413: "RequestEntityTooLarge",
  414: "RequestUriTooLong",
  415: "UnsupportedMediaType",
  416: "RequestRangeNotSatisfiable",
  417: "ExpectationFailed",
  426: "UpgradeRequired",
  500: "InternalServerError",
  501: "NotImplemented",
  502: "BadGateway",
  503: "ServiceUnavailable",
  504: "GatewayTimeout",
  505: "HttpVersionNotSupported"
};
