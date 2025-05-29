import * as coreClient from "@azure/core-client";
import * as coreHttpCompat from "@azure/core-http-compat";
/** Storage Service Properties. */
export interface QueueServiceProperties {
    /** Azure Analytics Logging settings */
    queueAnalyticsLogging?: Logging;
    /** A summary of request statistics grouped by API in hourly aggregates for queues */
    hourMetrics?: Metrics;
    /** a summary of request statistics grouped by API in minute aggregates for queues */
    minuteMetrics?: Metrics;
    /** The set of CORS rules. */
    cors?: CorsRule[];
}
/** Azure Analytics Logging settings. */
export interface Logging {
    /** The version of Storage Analytics to configure. */
    version: string;
    /** Indicates whether all delete requests should be logged. */
    deleteProperty: boolean;
    /** Indicates whether all read requests should be logged. */
    read: boolean;
    /** Indicates whether all write requests should be logged. */
    write: boolean;
    /** the retention policy */
    retentionPolicy: RetentionPolicy;
}
/** the retention policy */
export interface RetentionPolicy {
    /** Indicates whether a retention policy is enabled for the storage service */
    enabled: boolean;
    /** Indicates the number of days that metrics or logging or soft-deleted data should be retained. All data older than this value will be deleted */
    days?: number;
}
/** An interface representing Metrics. */
export interface Metrics {
    /** The version of Storage Analytics to configure. */
    version?: string;
    /** Indicates whether metrics are enabled for the Queue service. */
    enabled: boolean;
    /** Indicates whether metrics should generate summary statistics for called API operations. */
    includeAPIs?: boolean;
    /** the retention policy */
    retentionPolicy?: RetentionPolicy;
}
/** CORS is an HTTP feature that enables a web application running under one domain to access resources in another domain. Web browsers implement a security restriction known as same-origin policy that prevents a web page from calling APIs in a different domain; CORS provides a secure way to allow one domain (the origin domain) to call APIs in another domain */
export interface CorsRule {
    /** The origin domains that are permitted to make a request against the storage service via CORS. The origin domain is the domain from which the request originates. Note that the origin must be an exact case-sensitive match with the origin that the user age sends to the service. You can also use the wildcard character '*' to allow all origin domains to make requests via CORS. */
    allowedOrigins: string;
    /** The methods (HTTP request verbs) that the origin domain may use for a CORS request. (comma separated) */
    allowedMethods: string;
    /** the request headers that the origin domain may specify on the CORS request. */
    allowedHeaders: string;
    /** The response headers that may be sent in the response to the CORS request and exposed by the browser to the request issuer */
    exposedHeaders: string;
    /** The maximum amount time that a browser should cache the preflight OPTIONS request. */
    maxAgeInSeconds: number;
}
export interface StorageError {
    message?: string;
    code?: string;
    authenticationErrorDetail?: string;
}
/** Stats for the storage service. */
export interface QueueServiceStatistics {
    /** Geo-Replication information for the Secondary Storage Service */
    geoReplication?: GeoReplication;
}
/** Geo-Replication information for the Secondary Storage Service */
export interface GeoReplication {
    /** The status of the secondary location */
    status: GeoReplicationStatusType;
    /** A GMT date/time value, to the second. All primary writes preceding this value are guaranteed to be available for read operations at the secondary. Primary writes after this point in time may or may not be available for reads. */
    lastSyncOn: Date;
}
/** The object returned when calling List Queues on a Queue Service. */
export interface ListQueuesSegmentResponse {
    serviceEndpoint: string;
    prefix: string;
    marker?: string;
    maxPageSize: number;
    queueItems?: QueueItem[];
    continuationToken: string;
}
/** An Azure Storage Queue. */
export interface QueueItem {
    /** The name of the Queue. */
    name: string;
    /** Dictionary of <string> */
    metadata?: {
        [propertyName: string]: string;
    };
}
/** signed identifier */
export interface SignedIdentifier {
    /** a unique id */
    id: string;
    /** The access policy */
    accessPolicy: AccessPolicy;
}
/** An Access policy */
export interface AccessPolicy {
    /** the date-time the policy is active */
    startsOn?: string;
    /** the date-time the policy expires */
    expiresOn?: string;
    /** the permissions for the acl policy */
    permissions?: string;
}
/** The object returned in the QueueMessageList array when calling Get Messages on a Queue. */
export interface DequeuedMessageItem {
    /** The Id of the Message. */
    messageId: string;
    /** The time the Message was inserted into the Queue. */
    insertedOn: Date;
    /** The time that the Message will expire and be automatically deleted. */
    expiresOn: Date;
    /** This value is required to delete the Message. If deletion fails using this popreceipt then the message has been dequeued by another client. */
    popReceipt: string;
    /** The time that the message will again become visible in the Queue. */
    nextVisibleOn: Date;
    /** The number of times the message has been dequeued. */
    dequeueCount: number;
    /** The content of the Message. */
    messageText: string;
}
/** A Message object which can be stored in a Queue */
export interface QueueMessage {
    /** The content of the message */
    messageText: string;
}
/** The object returned in the QueueMessageList array when calling Put Message on a Queue */
export interface EnqueuedMessage {
    /** The Id of the Message. */
    messageId: string;
    /** The time the Message was inserted into the Queue. */
    insertedOn: Date;
    /** The time that the Message will expire and be automatically deleted. */
    expiresOn: Date;
    /** This value is required to delete the Message. If deletion fails using this popreceipt then the message has been dequeued by another client. */
    popReceipt: string;
    /** The time that the message will again become visible in the Queue. */
    nextVisibleOn: Date;
}
/** The object returned in the QueueMessageList array when calling Peek Messages on a Queue */
export interface PeekedMessageItem {
    /** The Id of the Message. */
    messageId: string;
    /** The time the Message was inserted into the Queue. */
    insertedOn: Date;
    /** The time that the Message will expire and be automatically deleted. */
    expiresOn: Date;
    /** The number of times the message has been dequeued. */
    dequeueCount: number;
    /** The content of the Message. */
    messageText: string;
}
/** Defines headers for Service_setProperties operation. */
export interface ServiceSetPropertiesHeaders {
    /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
    requestId?: string;
    /** Indicates the version of the Queue service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
    version?: string;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
    /** Error Code */
    errorCode?: string;
}
/** Defines headers for Service_setProperties operation. */
export interface ServiceSetPropertiesExceptionHeaders {
    errorCode?: string;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
}
/** Defines headers for Service_getProperties operation. */
export interface ServiceGetPropertiesHeaders {
    /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
    requestId?: string;
    /** Indicates the version of the Queue service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
    version?: string;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
    /** Error Code */
    errorCode?: string;
}
/** Defines headers for Service_getProperties operation. */
export interface ServiceGetPropertiesExceptionHeaders {
    errorCode?: string;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
}
/** Defines headers for Service_getStatistics operation. */
export interface ServiceGetStatisticsHeaders {
    /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
    requestId?: string;
    /** Indicates the version of the Queue service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
    version?: string;
    /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
    date?: Date;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
    /** Error Code */
    errorCode?: string;
}
/** Defines headers for Service_getStatistics operation. */
export interface ServiceGetStatisticsExceptionHeaders {
    errorCode?: string;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
}
/** Defines headers for Service_listQueuesSegment operation. */
export interface ServiceListQueuesSegmentHeaders {
    /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
    requestId?: string;
    /** Indicates the version of the Queue service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
    version?: string;
    /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
    date?: Date;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
    /** Error Code */
    errorCode?: string;
}
/** Defines headers for Service_listQueuesSegment operation. */
export interface ServiceListQueuesSegmentExceptionHeaders {
    errorCode?: string;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
}
/** Defines headers for Queue_create operation. */
export interface QueueCreateHeaders {
    /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
    requestId?: string;
    /** Indicates the version of the Queue service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
    version?: string;
    /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
    date?: Date;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
    /** Error Code */
    errorCode?: string;
}
/** Defines headers for Queue_create operation. */
export interface QueueCreateExceptionHeaders {
    errorCode?: string;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
}
/** Defines headers for Queue_delete operation. */
export interface QueueDeleteHeaders {
    /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
    requestId?: string;
    /** Indicates the version of the Queue service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
    version?: string;
    /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
    date?: Date;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
    /** Error Code */
    errorCode?: string;
}
/** Defines headers for Queue_delete operation. */
export interface QueueDeleteExceptionHeaders {
    errorCode?: string;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
}
/** Defines headers for Queue_getProperties operation. */
export interface QueueGetPropertiesHeaders {
    metadata?: {
        [propertyName: string]: string;
    };
    /** The approximate number of messages in the queue. This number is not lower than the actual number of messages in the queue, but could be higher. */
    approximateMessagesCount?: number;
    /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
    requestId?: string;
    /** Indicates the version of the Queue service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
    version?: string;
    /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
    date?: Date;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
    /** Error Code */
    errorCode?: string;
}
/** Defines headers for Queue_getProperties operation. */
export interface QueueGetPropertiesExceptionHeaders {
    errorCode?: string;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
}
/** Defines headers for Queue_setMetadata operation. */
export interface QueueSetMetadataHeaders {
    /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
    requestId?: string;
    /** Indicates the version of the Queue service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
    version?: string;
    /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
    date?: Date;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
    /** Error Code */
    errorCode?: string;
}
/** Defines headers for Queue_setMetadata operation. */
export interface QueueSetMetadataExceptionHeaders {
    errorCode?: string;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
}
/** Defines headers for Queue_getAccessPolicy operation. */
export interface QueueGetAccessPolicyHeaders {
    /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
    requestId?: string;
    /** Indicates the version of the Queue service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
    version?: string;
    /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
    date?: Date;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
    /** Error Code */
    errorCode?: string;
}
/** Defines headers for Queue_getAccessPolicy operation. */
export interface QueueGetAccessPolicyExceptionHeaders {
    errorCode?: string;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
}
/** Defines headers for Queue_setAccessPolicy operation. */
export interface QueueSetAccessPolicyHeaders {
    /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
    requestId?: string;
    /** Indicates the version of the Queue service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
    version?: string;
    /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
    date?: Date;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
    /** Error Code */
    errorCode?: string;
}
/** Defines headers for Queue_setAccessPolicy operation. */
export interface QueueSetAccessPolicyExceptionHeaders {
    errorCode?: string;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
}
/** Defines headers for Messages_dequeue operation. */
export interface MessagesDequeueHeaders {
    /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
    requestId?: string;
    /** Indicates the version of the Queue service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
    version?: string;
    /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
    date?: Date;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
    /** Error Code */
    errorCode?: string;
}
/** Defines headers for Messages_dequeue operation. */
export interface MessagesDequeueExceptionHeaders {
    errorCode?: string;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
}
/** Defines headers for Messages_clear operation. */
export interface MessagesClearHeaders {
    /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
    requestId?: string;
    /** Indicates the version of the Queue service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
    version?: string;
    /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
    date?: Date;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
    /** Error Code */
    errorCode?: string;
}
/** Defines headers for Messages_clear operation. */
export interface MessagesClearExceptionHeaders {
    errorCode?: string;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
}
/** Defines headers for Messages_enqueue operation. */
export interface MessagesEnqueueHeaders {
    /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
    requestId?: string;
    /** Indicates the version of the Queue service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
    version?: string;
    /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
    date?: Date;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
    /** Error Code */
    errorCode?: string;
}
/** Defines headers for Messages_enqueue operation. */
export interface MessagesEnqueueExceptionHeaders {
    errorCode?: string;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
}
/** Defines headers for Messages_peek operation. */
export interface MessagesPeekHeaders {
    /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
    requestId?: string;
    /** Indicates the version of the Queue service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
    version?: string;
    /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
    date?: Date;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
    /** Error Code */
    errorCode?: string;
}
/** Defines headers for Messages_peek operation. */
export interface MessagesPeekExceptionHeaders {
    errorCode?: string;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
}
/** Defines headers for MessageId_update operation. */
export interface MessageIdUpdateHeaders {
    /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
    requestId?: string;
    /** Indicates the version of the Queue service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
    version?: string;
    /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
    date?: Date;
    /** The pop receipt of the queue message. */
    popReceipt?: string;
    /** A UTC date/time value that represents when the message will be visible on the queue. */
    nextVisibleOn?: Date;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
    /** Error Code */
    errorCode?: string;
}
/** Defines headers for MessageId_update operation. */
export interface MessageIdUpdateExceptionHeaders {
    errorCode?: string;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
}
/** Defines headers for MessageId_delete operation. */
export interface MessageIdDeleteHeaders {
    /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
    requestId?: string;
    /** Indicates the version of the Queue service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
    version?: string;
    /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
    date?: Date;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
    /** Error Code */
    errorCode?: string;
}
/** Defines headers for MessageId_delete operation. */
export interface MessageIdDeleteExceptionHeaders {
    errorCode?: string;
    /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
    clientRequestId?: string;
}
/** Known values of {@link StorageErrorCode} that the service accepts. */
export declare enum KnownStorageErrorCode {
    /** AccountAlreadyExists */
    AccountAlreadyExists = "AccountAlreadyExists",
    /** AccountBeingCreated */
    AccountBeingCreated = "AccountBeingCreated",
    /** AccountIsDisabled */
    AccountIsDisabled = "AccountIsDisabled",
    /** AuthenticationFailed */
    AuthenticationFailed = "AuthenticationFailed",
    /** AuthorizationFailure */
    AuthorizationFailure = "AuthorizationFailure",
    /** ConditionHeadersNotSupported */
    ConditionHeadersNotSupported = "ConditionHeadersNotSupported",
    /** ConditionNotMet */
    ConditionNotMet = "ConditionNotMet",
    /** EmptyMetadataKey */
    EmptyMetadataKey = "EmptyMetadataKey",
    /** InsufficientAccountPermissions */
    InsufficientAccountPermissions = "InsufficientAccountPermissions",
    /** InternalError */
    InternalError = "InternalError",
    /** InvalidAuthenticationInfo */
    InvalidAuthenticationInfo = "InvalidAuthenticationInfo",
    /** InvalidHeaderValue */
    InvalidHeaderValue = "InvalidHeaderValue",
    /** InvalidHttpVerb */
    InvalidHttpVerb = "InvalidHttpVerb",
    /** InvalidInput */
    InvalidInput = "InvalidInput",
    /** InvalidMd5 */
    InvalidMd5 = "InvalidMd5",
    /** InvalidMetadata */
    InvalidMetadata = "InvalidMetadata",
    /** InvalidQueryParameterValue */
    InvalidQueryParameterValue = "InvalidQueryParameterValue",
    /** InvalidRange */
    InvalidRange = "InvalidRange",
    /** InvalidResourceName */
    InvalidResourceName = "InvalidResourceName",
    /** InvalidUri */
    InvalidUri = "InvalidUri",
    /** InvalidXmlDocument */
    InvalidXmlDocument = "InvalidXmlDocument",
    /** InvalidXmlNodeValue */
    InvalidXmlNodeValue = "InvalidXmlNodeValue",
    /** Md5Mismatch */
    Md5Mismatch = "Md5Mismatch",
    /** MetadataTooLarge */
    MetadataTooLarge = "MetadataTooLarge",
    /** MissingContentLengthHeader */
    MissingContentLengthHeader = "MissingContentLengthHeader",
    /** MissingRequiredQueryParameter */
    MissingRequiredQueryParameter = "MissingRequiredQueryParameter",
    /** MissingRequiredHeader */
    MissingRequiredHeader = "MissingRequiredHeader",
    /** MissingRequiredXmlNode */
    MissingRequiredXmlNode = "MissingRequiredXmlNode",
    /** MultipleConditionHeadersNotSupported */
    MultipleConditionHeadersNotSupported = "MultipleConditionHeadersNotSupported",
    /** OperationTimedOut */
    OperationTimedOut = "OperationTimedOut",
    /** OutOfRangeInput */
    OutOfRangeInput = "OutOfRangeInput",
    /** OutOfRangeQueryParameterValue */
    OutOfRangeQueryParameterValue = "OutOfRangeQueryParameterValue",
    /** RequestBodyTooLarge */
    RequestBodyTooLarge = "RequestBodyTooLarge",
    /** ResourceTypeMismatch */
    ResourceTypeMismatch = "ResourceTypeMismatch",
    /** RequestUrlFailedToParse */
    RequestUrlFailedToParse = "RequestUrlFailedToParse",
    /** ResourceAlreadyExists */
    ResourceAlreadyExists = "ResourceAlreadyExists",
    /** ResourceNotFound */
    ResourceNotFound = "ResourceNotFound",
    /** ServerBusy */
    ServerBusy = "ServerBusy",
    /** UnsupportedHeader */
    UnsupportedHeader = "UnsupportedHeader",
    /** UnsupportedXmlNode */
    UnsupportedXmlNode = "UnsupportedXmlNode",
    /** UnsupportedQueryParameter */
    UnsupportedQueryParameter = "UnsupportedQueryParameter",
    /** UnsupportedHttpVerb */
    UnsupportedHttpVerb = "UnsupportedHttpVerb",
    /** InvalidMarker */
    InvalidMarker = "InvalidMarker",
    /** MessageNotFound */
    MessageNotFound = "MessageNotFound",
    /** MessageTooLarge */
    MessageTooLarge = "MessageTooLarge",
    /** PopReceiptMismatch */
    PopReceiptMismatch = "PopReceiptMismatch",
    /** QueueAlreadyExists */
    QueueAlreadyExists = "QueueAlreadyExists",
    /** QueueBeingDeleted */
    QueueBeingDeleted = "QueueBeingDeleted",
    /** QueueDisabled */
    QueueDisabled = "QueueDisabled",
    /** QueueNotEmpty */
    QueueNotEmpty = "QueueNotEmpty",
    /** QueueNotFound */
    QueueNotFound = "QueueNotFound",
    /** AuthorizationSourceIPMismatch */
    AuthorizationSourceIPMismatch = "AuthorizationSourceIPMismatch",
    /** AuthorizationProtocolMismatch */
    AuthorizationProtocolMismatch = "AuthorizationProtocolMismatch",
    /** AuthorizationPermissionMismatch */
    AuthorizationPermissionMismatch = "AuthorizationPermissionMismatch",
    /** AuthorizationServiceMismatch */
    AuthorizationServiceMismatch = "AuthorizationServiceMismatch",
    /** AuthorizationResourceTypeMismatch */
    AuthorizationResourceTypeMismatch = "AuthorizationResourceTypeMismatch",
    /** FeatureVersionMismatch */
    FeatureVersionMismatch = "FeatureVersionMismatch"
}
/**
 * Defines values for StorageErrorCode. \
 * {@link KnownStorageErrorCode} can be used interchangeably with StorageErrorCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AccountAlreadyExists** \
 * **AccountBeingCreated** \
 * **AccountIsDisabled** \
 * **AuthenticationFailed** \
 * **AuthorizationFailure** \
 * **ConditionHeadersNotSupported** \
 * **ConditionNotMet** \
 * **EmptyMetadataKey** \
 * **InsufficientAccountPermissions** \
 * **InternalError** \
 * **InvalidAuthenticationInfo** \
 * **InvalidHeaderValue** \
 * **InvalidHttpVerb** \
 * **InvalidInput** \
 * **InvalidMd5** \
 * **InvalidMetadata** \
 * **InvalidQueryParameterValue** \
 * **InvalidRange** \
 * **InvalidResourceName** \
 * **InvalidUri** \
 * **InvalidXmlDocument** \
 * **InvalidXmlNodeValue** \
 * **Md5Mismatch** \
 * **MetadataTooLarge** \
 * **MissingContentLengthHeader** \
 * **MissingRequiredQueryParameter** \
 * **MissingRequiredHeader** \
 * **MissingRequiredXmlNode** \
 * **MultipleConditionHeadersNotSupported** \
 * **OperationTimedOut** \
 * **OutOfRangeInput** \
 * **OutOfRangeQueryParameterValue** \
 * **RequestBodyTooLarge** \
 * **ResourceTypeMismatch** \
 * **RequestUrlFailedToParse** \
 * **ResourceAlreadyExists** \
 * **ResourceNotFound** \
 * **ServerBusy** \
 * **UnsupportedHeader** \
 * **UnsupportedXmlNode** \
 * **UnsupportedQueryParameter** \
 * **UnsupportedHttpVerb** \
 * **InvalidMarker** \
 * **MessageNotFound** \
 * **MessageTooLarge** \
 * **PopReceiptMismatch** \
 * **QueueAlreadyExists** \
 * **QueueBeingDeleted** \
 * **QueueDisabled** \
 * **QueueNotEmpty** \
 * **QueueNotFound** \
 * **AuthorizationSourceIPMismatch** \
 * **AuthorizationProtocolMismatch** \
 * **AuthorizationPermissionMismatch** \
 * **AuthorizationServiceMismatch** \
 * **AuthorizationResourceTypeMismatch** \
 * **FeatureVersionMismatch**
 */
export type StorageErrorCode = string;
/** Defines values for GeoReplicationStatusType. */
export type GeoReplicationStatusType = "live" | "bootstrap" | "unavailable";
/** Optional parameters. */
export interface ServiceSetPropertiesOptionalParams extends coreClient.OperationOptions {
    /** The The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations>Setting Timeouts for Queue Service Operations.</a> */
    timeoutInSeconds?: number;
    /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
    requestId?: string;
}
/** Contains response data for the setProperties operation. */
export type ServiceSetPropertiesResponse = ServiceSetPropertiesHeaders;
/** Optional parameters. */
export interface ServiceGetPropertiesOptionalParams extends coreClient.OperationOptions {
    /** The The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations>Setting Timeouts for Queue Service Operations.</a> */
    timeoutInSeconds?: number;
    /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
    requestId?: string;
}
/** Contains response data for the getProperties operation. */
export type ServiceGetPropertiesResponse = ServiceGetPropertiesHeaders & QueueServiceProperties;
/** Optional parameters. */
export interface ServiceGetStatisticsOptionalParams extends coreClient.OperationOptions {
    /** The The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations>Setting Timeouts for Queue Service Operations.</a> */
    timeoutInSeconds?: number;
    /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
    requestId?: string;
}
/** Contains response data for the getStatistics operation. */
export type ServiceGetStatisticsResponse = ServiceGetStatisticsHeaders & QueueServiceStatistics;
/** Optional parameters. */
export interface ServiceListQueuesSegmentOptionalParams extends coreClient.OperationOptions {
    /** The The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations>Setting Timeouts for Queue Service Operations.</a> */
    timeoutInSeconds?: number;
    /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
    requestId?: string;
    /** Filters the results to return only queues whose name begins with the specified prefix. */
    prefix?: string;
    /** A string value that identifies the portion of the list of queues to be returned with the next listing operation. The operation returns the ContinuationToken value within the response body if the listing operation did not return all queues remaining to be listed with the current page. The NextMarker value can be used as the value for the marker parameter in a subsequent call to request the next page of list items. The marker value is opaque to the client. */
    marker?: string;
    /** Specifies the maximum number of queues to return. If the request does not specify maxresults, or specifies a value greater than 5000, the server will return up to 5000 items. Note that if the listing operation crosses a partition boundary, then the service will return a continuation token for retrieving the remainder of the results. For this reason, it is possible that the service will return fewer results than specified by maxresults, or than the default of 5000. */
    maxPageSize?: number;
    /** Include this parameter to specify that the queues' metadata be returned as part of the response body. */
    include?: string[];
}
/** Contains response data for the listQueuesSegment operation. */
export type ServiceListQueuesSegmentResponse = ServiceListQueuesSegmentHeaders & ListQueuesSegmentResponse;
/** Optional parameters. */
export interface QueueCreateOptionalParams extends coreClient.OperationOptions {
    /** The The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations>Setting Timeouts for Queue Service Operations.</a> */
    timeoutInSeconds?: number;
    /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
    requestId?: string;
    /** Optional. Include this parameter to specify that the queue's metadata be returned as part of the response body. Note that metadata requested with this parameter must be stored in accordance with the naming restrictions imposed by the 2009-09-19 version of the Queue service. Beginning with this version, all metadata names must adhere to the naming conventions for C# identifiers. */
    metadata?: {
        [propertyName: string]: string;
    };
}
/** Contains response data for the create operation. */
export type QueueCreateResponse = QueueCreateHeaders;
/** Optional parameters. */
export interface QueueDeleteOptionalParams extends coreClient.OperationOptions {
    /** The The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations>Setting Timeouts for Queue Service Operations.</a> */
    timeoutInSeconds?: number;
    /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
    requestId?: string;
}
/** Contains response data for the delete operation. */
export type QueueDeleteResponse = QueueDeleteHeaders;
/** Optional parameters. */
export interface QueueGetPropertiesOptionalParams extends coreClient.OperationOptions {
    /** The The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations>Setting Timeouts for Queue Service Operations.</a> */
    timeoutInSeconds?: number;
    /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
    requestId?: string;
}
/** Contains response data for the getProperties operation. */
export type QueueGetPropertiesResponse = QueueGetPropertiesHeaders;
/** Optional parameters. */
export interface QueueSetMetadataOptionalParams extends coreClient.OperationOptions {
    /** The The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations>Setting Timeouts for Queue Service Operations.</a> */
    timeoutInSeconds?: number;
    /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
    requestId?: string;
    /** Optional. Include this parameter to specify that the queue's metadata be returned as part of the response body. Note that metadata requested with this parameter must be stored in accordance with the naming restrictions imposed by the 2009-09-19 version of the Queue service. Beginning with this version, all metadata names must adhere to the naming conventions for C# identifiers. */
    metadata?: {
        [propertyName: string]: string;
    };
}
/** Contains response data for the setMetadata operation. */
export type QueueSetMetadataResponse = QueueSetMetadataHeaders;
/** Optional parameters. */
export interface QueueGetAccessPolicyOptionalParams extends coreClient.OperationOptions {
    /** The The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations>Setting Timeouts for Queue Service Operations.</a> */
    timeoutInSeconds?: number;
    /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
    requestId?: string;
}
/** Contains response data for the getAccessPolicy operation. */
export type QueueGetAccessPolicyResponse = QueueGetAccessPolicyHeaders & SignedIdentifier[];
/** Optional parameters. */
export interface QueueSetAccessPolicyOptionalParams extends coreClient.OperationOptions {
    /** The The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations>Setting Timeouts for Queue Service Operations.</a> */
    timeoutInSeconds?: number;
    /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
    requestId?: string;
    /** the acls for the queue */
    queueAcl?: SignedIdentifier[];
}
/** Contains response data for the setAccessPolicy operation. */
export type QueueSetAccessPolicyResponse = QueueSetAccessPolicyHeaders;
/** Optional parameters. */
export interface MessagesDequeueOptionalParams extends coreClient.OperationOptions {
    /** The The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations>Setting Timeouts for Queue Service Operations.</a> */
    timeoutInSeconds?: number;
    /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
    requestId?: string;
    /** Optional. A nonzero integer value that specifies the number of messages to retrieve from the queue, up to a maximum of 32. If fewer are visible, the visible messages are returned. By default, a single message is retrieved from the queue with this operation. */
    numberOfMessages?: number;
    /** Optional. Specifies the new visibility timeout value, in seconds, relative to server time. The default value is 30 seconds. A specified value must be larger than or equal to 1 second, and cannot be larger than 7 days, or larger than 2 hours on REST protocol versions prior to version 2011-08-18. The visibility timeout of a message can be set to a value later than the expiry time. */
    visibilityTimeout?: number;
}
/** Contains response data for the dequeue operation. */
export type MessagesDequeueResponse = MessagesDequeueHeaders & DequeuedMessageItem[];
/** Optional parameters. */
export interface MessagesClearOptionalParams extends coreClient.OperationOptions {
    /** The The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations>Setting Timeouts for Queue Service Operations.</a> */
    timeoutInSeconds?: number;
    /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
    requestId?: string;
}
/** Contains response data for the clear operation. */
export type MessagesClearResponse = MessagesClearHeaders;
/** Optional parameters. */
export interface MessagesEnqueueOptionalParams extends coreClient.OperationOptions {
    /** The The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations>Setting Timeouts for Queue Service Operations.</a> */
    timeoutInSeconds?: number;
    /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
    requestId?: string;
    /** Optional. If specified, the request must be made using an x-ms-version of 2011-08-18 or later. If not specified, the default value is 0. Specifies the new visibility timeout value, in seconds, relative to server time. The new value must be larger than or equal to 0, and cannot be larger than 7 days. The visibility timeout of a message cannot be set to a value later than the expiry time. visibilitytimeout should be set to a value smaller than the time-to-live value. */
    visibilityTimeout?: number;
    /** Optional. Specifies the time-to-live interval for the message, in seconds. Prior to version 2017-07-29, the maximum time-to-live allowed is 7 days. For version 2017-07-29 or later, the maximum time-to-live can be any positive number, as well as -1 indicating that the message does not expire. If this parameter is omitted, the default time-to-live is 7 days. */
    messageTimeToLive?: number;
}
/** Contains response data for the enqueue operation. */
export type MessagesEnqueueResponse = MessagesEnqueueHeaders & EnqueuedMessage[];
/** Optional parameters. */
export interface MessagesPeekOptionalParams extends coreClient.OperationOptions {
    /** The The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations>Setting Timeouts for Queue Service Operations.</a> */
    timeoutInSeconds?: number;
    /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
    requestId?: string;
    /** Optional. A nonzero integer value that specifies the number of messages to retrieve from the queue, up to a maximum of 32. If fewer are visible, the visible messages are returned. By default, a single message is retrieved from the queue with this operation. */
    numberOfMessages?: number;
}
/** Contains response data for the peek operation. */
export type MessagesPeekResponse = MessagesPeekHeaders & PeekedMessageItem[];
/** Optional parameters. */
export interface MessageIdUpdateOptionalParams extends coreClient.OperationOptions {
    /** The The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations>Setting Timeouts for Queue Service Operations.</a> */
    timeoutInSeconds?: number;
    /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
    requestId?: string;
    /** A Message object which can be stored in a Queue */
    queueMessage?: QueueMessage;
}
/** Contains response data for the update operation. */
export type MessageIdUpdateResponse = MessageIdUpdateHeaders;
/** Optional parameters. */
export interface MessageIdDeleteOptionalParams extends coreClient.OperationOptions {
    /** The The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations>Setting Timeouts for Queue Service Operations.</a> */
    timeoutInSeconds?: number;
    /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
    requestId?: string;
}
/** Contains response data for the delete operation. */
export type MessageIdDeleteResponse = MessageIdDeleteHeaders;
/** Optional parameters. */
export interface StorageClientOptionalParams extends coreHttpCompat.ExtendedServiceClientOptions {
    /** Specifies the version of the operation to use for this request. */
    version?: string;
    /** Overrides client endpoint. */
    endpoint?: string;
}
//# sourceMappingURL=index.d.ts.map