"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponseCodes = exports.ATOM_METADATA_MARKER = exports.XML_VALUE_MARKER = exports.XML_METADATA_MARKER = exports.ODATA_ERROR_MESSAGE_VALUE = exports.ODATA_ERROR_MESSAGE = exports.CURRENT_API_VERSION = exports.API_VERSION_QUERY_KEY = exports.FORWARD_DEADLETTERED_MESSAGES_TO = exports.ENABLE_PARTITIONING = exports.SUPPORT_ORDERING = exports.ENABLE_BATCHED_OPERATIONS = exports.MAX_DELIVERY_COUNT = exports.DUPLICATE_DETECTION_HISTORY_TIME_WINDOW = exports.DEAD_LETTERING_ON_FILTER_EVALUATION_EXCEPTIONS = exports.DEAD_LETTERING_ON_MESSAGE_EXPIRATION = exports.REQUIRES_DUPLICATE_DETECTION = exports.REQUIRES_SESSION = exports.LOCK_DURATION = exports.DEFAULT_MESSAGE_TIME_TO_LIVE = exports.MAX_MESSAGE_SIZE_IN_KILOBYTES = exports.MAX_SIZE_IN_MEGABYTES = exports.USER_METADATA = exports.FORWARD_TO = exports.STATUS = exports.AUTO_DELETE_ON_IDLE = exports.DEFAULT_RULE_NAME = exports.COUNT_DETAILS = exports.SUBSCRIPTION_COUNT = exports.MESSAGE_COUNT = exports.SIZE_IN_BYTES = exports.FILTER_MESSAGES_BEFORE_PUBLISHING = exports.ENABLE_SUBSCRIPTION_PARTITIONING = exports.IS_EXPRESS = exports.ENABLE_EXPRESS = exports.ENTITY_AVAILABILITY_STATUS = exports.IS_ANONYMOUS_ACCESSIBLE = exports.AUTHORIZATION_RULES = exports.CREATED_AT = exports.UPDATED_AT = exports.ACCESSED_AT = exports.RULE_NAME = exports.SUBSCRIPTION_NAME = exports.TOPIC_NAME = exports.QUEUE_NAME = exports.max32BitNumber = exports.receiveDrainTimeoutInMs = exports.messageDispositionTimeout = exports.packageJsonInfo = void 0;
/**
 * @internal
 */
exports.packageJsonInfo = {
    name: "@azure/service-bus",
    version: "7.10.0",
};
/**
 * @internal
 */
exports.messageDispositionTimeout = 20000;
/**
 * The amount of time in milliseconds that a receiver
 * will wait while draining credits before returning.
 * @internal
 */
exports.receiveDrainTimeoutInMs = 200;
/**
 * @internal
 */
exports.max32BitNumber = Math.pow(2, 31) - 1;
/**
 * Queue name identifier
 * @internal
 */
exports.QUEUE_NAME = "QueueName";
/**
 * Topic name identifier
 * @internal
 */
exports.TOPIC_NAME = "TopicName";
/**
 * Subscription name identifier
 * @internal
 */
exports.SUBSCRIPTION_NAME = "SubscriptionName";
/**
 * Rule name identifier
 * @internal
 */
exports.RULE_NAME = "RuleName";
/**
 * Accessed at field
 * @internal
 */
exports.ACCESSED_AT = "AccessedAt";
/**
 * Updated at field
 * @internal
 */
exports.UPDATED_AT = "UpdatedAt";
/**
 * Created at field
 * @internal
 */
exports.CREATED_AT = "CreatedAt";
/**
 * Authorization rules on the entity
 * @internal
 */
exports.AUTHORIZATION_RULES = "AuthorizationRules";
/**
 * Is Anonymous Accessible field
 * @internal
 */
exports.IS_ANONYMOUS_ACCESSIBLE = "IsAnonymousAccessible";
/**
 * Entity Availability Status field
 * @internal
 */
exports.ENTITY_AVAILABILITY_STATUS = "EntityAvailabilityStatus";
/**
 * Enable express option
 * @internal
 */
exports.ENABLE_EXPRESS = "EnableExpress";
/**
 * Is express option
 * @internal
 */
exports.IS_EXPRESS = "IsExpress";
/**
 * Enable Subscription Partitioning option
 * @internal
 */
exports.ENABLE_SUBSCRIPTION_PARTITIONING = "EnableSubscriptionPartitioning";
/**
 * Filtering Messages Before Publishing option
 * @internal
 */
exports.FILTER_MESSAGES_BEFORE_PUBLISHING = "FilteringMessagesBeforePublishing";
/**
 * The entity's size in bytes.
 *
 * @internal
 */
exports.SIZE_IN_BYTES = "SizeInBytes";
/**
 * The entity's message count.
 *
 * @internal
 */
exports.MESSAGE_COUNT = "MessageCount";
/**
 * The topic's subscription count.
 *
 * @internal
 */
exports.SUBSCRIPTION_COUNT = "SubscriptionCount";
/**
 * The topic / subscription's count details.
 *
 * @internal
 */
exports.COUNT_DETAILS = "CountDetails";
/**
 * The default rule name.
 *
 * @internal
 */
exports.DEFAULT_RULE_NAME = "$Default";
/**
 * Max idle time before entity is deleted.
 * This is specified in ISO-8601 duration format such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
 * @internal
 */
exports.AUTO_DELETE_ON_IDLE = "AutoDeleteOnIdle";
/**
 * The status information on response
 *
 * @internal
 */
exports.STATUS = "Status";
/**
 * The URL of Service Bus entity to forward messages to.
 *
 * @internal
 */
exports.FORWARD_TO = "ForwardTo";
/**
 * The user meta data information
 *
 * @internal
 */
exports.USER_METADATA = "UserMetadata";
/**
 * The maximum size in megabytes.
 *
 * @internal
 */
exports.MAX_SIZE_IN_MEGABYTES = "MaxSizeInMegabytes";
/**
 * The maximum size in kilobytes.
 *
 * @internal
 */
exports.MAX_MESSAGE_SIZE_IN_KILOBYTES = "MaxMessageSizeInKilobytes";
/**
 * The default message time to live.
 * This is specified in ISO-8601 duration format such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
 * @internal
 */
exports.DEFAULT_MESSAGE_TIME_TO_LIVE = "DefaultMessageTimeToLive";
/**
 * The lock duration.
 * This is specified in ISO-8601 duration format such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
 * @internal
 */
exports.LOCK_DURATION = "LockDuration";
/**
 * The indication if session is required or not.
 *
 * @internal
 */
exports.REQUIRES_SESSION = "RequiresSession";
/**
 * The indication if duplicate detection is required or not.
 *
 * @internal
 */
exports.REQUIRES_DUPLICATE_DETECTION = "RequiresDuplicateDetection";
/**
 * The indication if dead lettering on message expiration. If it is enabled and a message expires,
 * the Service Bus moves the message from the queue into the entity dead-letter sub-queue.
 * If disabled, message will be permanently deleted from the main entity.
 * Settable only at entity creation time.
 *
 * @internal
 */
exports.DEAD_LETTERING_ON_MESSAGE_EXPIRATION = "DeadLetteringOnMessageExpiration";
/**
 * The indication if dead lettering on filter evaluation exceptions.
 *
 * @internal
 */
exports.DEAD_LETTERING_ON_FILTER_EVALUATION_EXCEPTIONS = "DeadLetteringOnFilterEvaluationExceptions";
/**
 * The history time window for duplicate detection.
 * This is specified in ISO-8601 duration format such as "PT1M" for 1 minute, "PT5S" for 5 seconds.
 * @internal
 */
exports.DUPLICATE_DETECTION_HISTORY_TIME_WINDOW = "DuplicateDetectionHistoryTimeWindow";
/**
 * The maximum delivery count of messages after which if it is still not settled, gets moved to the dead-letter sub-queue.
 *
 * @internal
 */
exports.MAX_DELIVERY_COUNT = "MaxDeliveryCount";
/**
 * Indicates if the queue has enabled batch operations.
 *
 * @internal
 */
exports.ENABLE_BATCHED_OPERATIONS = "EnableBatchedOperations";
/**
 * Indicates whether the topic can be ordered
 *
 * @internal
 */
exports.SUPPORT_ORDERING = "SupportOrdering";
/**
 * Indicates whether the topic/queue should be split across multiple partitions
 *
 * @internal
 */
exports.ENABLE_PARTITIONING = "EnablePartitioning";
/**
 * The URL of Service Bus entity to forward deadlettered messages to.
 *
 * @internal
 */
exports.FORWARD_DEADLETTERED_MESSAGES_TO = "ForwardDeadLetteredMessagesTo";
/**
 * Query string parameter to set Service Bus API version
 *
 * @internal
 */
exports.API_VERSION_QUERY_KEY = "api-version";
/**
 * Current API version being sent to service bus
 *
 * @internal
 */
exports.CURRENT_API_VERSION = "2021-05";
/**
 * Constant representing the Odata Error 'message' property
 *
 * @internal
 */
exports.ODATA_ERROR_MESSAGE = "message";
/**
 * Constant representing the 'value' property of Odata Error 'message' property
 *
 * @internal
 */
exports.ODATA_ERROR_MESSAGE_VALUE = "value";
/**
 * Marker for atom metadata.
 *
 * @internal
 */
exports.XML_METADATA_MARKER = "$";
/**
 * Marker for atom value.
 *
 * @internal
 */
exports.XML_VALUE_MARKER = "_";
/**
 * Constant representing the property where the atom default elements are stored.
 *
 * @internal
 */
exports.ATOM_METADATA_MARKER = "_";
/**
 * Known HTTP status codes as documented and referenced in ATOM based management API feature
 * https://learn.microsoft.com/dotnet/api/system.net.httpstatuscode?view=netframework-4.8
 * @internal
 */
exports.HttpResponseCodes = {
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
    505: "HttpVersionNotSupported",
};
//# sourceMappingURL=constants.js.map