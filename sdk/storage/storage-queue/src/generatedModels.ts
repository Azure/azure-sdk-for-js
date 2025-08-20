// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WithResponse } from "./utils/utils.common.js";
import type {
  ListQueuesSegmentResponse,
  MessageIdDeleteHeaders,
  MessageIdUpdateHeaders,
  MessagesClearHeaders,
  QueueCreateHeaders,
  QueueDeleteHeaders,
  QueueGetPropertiesHeaders,
  QueueServiceProperties,
  QueueServiceStatistics,
  QueueSetAccessPolicyHeaders,
  QueueSetMetadataHeaders,
  ServiceGetPropertiesHeaders,
  ServiceGetStatisticsHeaders,
  ServiceGetUserDelegationKeyHeaders,
  ServiceListQueuesSegmentHeaders,
  ServiceSetPropertiesHeaders,
  UserDelegationKey as UserDelegationKeyModel,
} from "./generated/src/index.js";

export {
  AccessPolicy,
  CorsRule,
  DequeuedMessageItem,
  EnqueuedMessage,
  GeoReplication,
  GeoReplicationStatusType,
  ListQueuesSegmentResponse,
  Logging,
  MessagesDequeueHeaders,
  MessagesEnqueueHeaders,
  MessageIdDeleteHeaders,
  MessageIdUpdateHeaders,
  MessagesClearHeaders,
  MessagesPeekHeaders,
  Metrics,
  PeekedMessageItem,
  QueueCreateHeaders,
  QueueDeleteHeaders,
  QueueGetAccessPolicyHeaders,
  QueueGetPropertiesHeaders,
  QueueItem,
  QueueServiceProperties,
  QueueServiceStatistics,
  QueueSetAccessPolicyHeaders,
  QueueSetMetadataHeaders,
  RetentionPolicy,
  ServiceGetPropertiesHeaders,
  ServiceGetStatisticsHeaders,
  ServiceGetUserDelegationKeyResponse as ServiceGetUserDelegationKeyResponseModel,
  ServiceGetUserDelegationKeyHeaders,
  ServiceListQueuesSegmentHeaders,
  ServiceSetPropertiesHeaders,
  SignedIdentifier as SignedIdentifierModel,
  UserDelegationKey as UserDelegationKeyModel,
} from "./generated/src/models/index.js";

/** Contains response data for the getProperties operation. */
export type ServiceGetPropertiesResponse = WithResponse<
  ServiceGetPropertiesHeaders & QueueServiceProperties,
  ServiceGetPropertiesHeaders,
  QueueServiceProperties
>;

/**
 * Contains response data for the create operation.
 */
export declare type QueueCreateResponse = WithResponse<QueueCreateHeaders, QueueCreateHeaders>;

/** Contains response data for the listQueuesSegment operation. */
export type ServiceListQueuesSegmentResponse = WithResponse<
  ServiceListQueuesSegmentHeaders & ListQueuesSegmentResponse,
  ServiceListQueuesSegmentHeaders,
  ListQueuesSegmentResponse
>;

/** Contains response data for the setProperties operation. */
export type ServiceSetPropertiesResponse = WithResponse<
  ServiceSetPropertiesHeaders,
  ServiceSetPropertiesHeaders
>;

/** Contains response data for the getStatistics operation. */
export type ServiceGetStatisticsResponse = WithResponse<
  ServiceGetStatisticsHeaders & QueueServiceStatistics,
  ServiceGetStatisticsHeaders,
  QueueServiceStatistics
>;

/** Contains response data for the setMetadata operation. */
export type QueueSetMetadataResponse = WithResponse<
  QueueSetMetadataHeaders,
  QueueSetMetadataHeaders
>;

/** Contains response data for the setAccessPolicy operation. */
export type QueueSetAccessPolicyResponse = WithResponse<
  QueueSetAccessPolicyHeaders,
  QueueSetAccessPolicyHeaders
>;

/** Contains response data for the getProperties operation. */
export type QueueGetPropertiesResponse = WithResponse<
  QueueGetPropertiesHeaders,
  QueueGetPropertiesHeaders
>;

/** Contains response data for the delete operation. */
export type QueueDeleteResponse = WithResponse<QueueDeleteHeaders, QueueDeleteHeaders>;

/** Contains response data for the clear operation. */
export type MessagesClearResponse = WithResponse<MessagesClearHeaders, MessagesClearHeaders>;

/** Contains response data for the update operation. */
export type MessageIdUpdateResponse = WithResponse<MessageIdUpdateHeaders, MessageIdUpdateHeaders>;

/** Contains response data for the delete operation. */
export type MessageIdDeleteResponse = WithResponse<MessageIdDeleteHeaders, MessageIdDeleteHeaders>;

/**
 * A user delegation key.
 */
export interface UserDelegationKey {
  /**
   * The Azure Active Directory object ID in GUID format.
   */
  signedObjectId: string;
  /**
   * The Azure Active Directory tenant ID in GUID format.
   */
  signedTenantId: string;
  /**
   * The date-time the key is active.
   */
  signedStartsOn: Date;
  /**
   * The date-time the key expires.
   */
  signedExpiresOn: Date;
  /**
   * Abbreviation of the Azure Storage service that accepts the key.
   */
  signedService: string;
  /**
   * The service version that created the key.
   */
  signedVersion: string;
  /**
   * The key as a base64 string.
   */
  value: string;
}

/**
 * Contains response data for the {@link getUserDelegationKey} operation.
 */
export declare type ServiceGetUserDelegationKeyResponse = WithResponse<
  UserDelegationKey & ServiceGetUserDelegationKeyHeaders,
  ServiceGetUserDelegationKeyHeaders,
  UserDelegationKeyModel
>;
