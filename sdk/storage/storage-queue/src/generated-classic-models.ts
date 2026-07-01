// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// This file preserves model and header type definitions from the previous
// AutoRest-generated code. These types are referenced by handwritten SDK code
// and must be kept in sync with the service API.

import { ExtendedServiceClientOptions } from "@azure/core-http-compat";

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

/** Key information */
export interface KeyInfo {
  /** The date-time the key is active in ISO 8601 UTC time */
  start?: string;
  /** The date-time the key expires in ISO 8601 UTC time */
  expiry: string;
  /** The delegated user tenant id in Azure AD */
  delegatedUserTid?: string;
}

/** A user delegation key */
export interface UserDelegationKey {
  /** The Azure Active Directory object ID in GUID format. */
  signedObjectId: string;
  /** The Azure Active Directory tenant ID in GUID format */
  signedTenantId: string;
  /** The date-time the key is active */
  signedStartsOn: Date;
  /** The date-time the key expires */
  signedExpiresOn: Date;
  /** Abbreviation of the Azure Storage service that accepts the key */
  signedService: string;
  /** The service version that created the key */
  signedVersion: string;
  /** The delegated user tenant id in Azure AD. Return if DelegatedUserTid is specified. */
  signedDelegatedUserTenantId?: string;
  /** The key as a base64 string */
  value: string;
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
  metadata?: { [propertyName: string]: string };
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

/** Defines headers for Service_getUserDelegationKey operation. */
export interface ServiceGetUserDelegationKeyHeaders {
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
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

/** Defines headers for Queue_getProperties operation. */
export interface QueueGetPropertiesHeaders {
  metadata?: { [propertyName: string]: string };
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

/** Defines values for GeoReplicationStatusType. */
export type GeoReplicationStatusType = "live" | "bootstrap" | "unavailable";

/** Contains response data for the getUserDelegationKey operation. */
export type ServiceGetUserDelegationKeyResponse = ServiceGetUserDelegationKeyHeaders &
  UserDelegationKey;

/** Optional parameters. */
export interface StorageClientOptionalParams extends ExtendedServiceClientOptions {
  /** Specifies the version of the operation to use for this request. */
  version?: string;
  /** Overrides client endpoint. */
  endpoint?: string;
}
