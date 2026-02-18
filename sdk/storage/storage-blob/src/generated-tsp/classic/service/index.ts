// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlobContext } from "../../api/blobContext.js";
import {
  findBlobsByTags,
  submitBatch,
  getAccountInfo,
  getUserDelegationKey,
  listContainers,
  getStatistics,
  getProperties,
  setProperties,
} from "../../api/service/operations.js";
import {
  ServiceFindBlobsByTagsOptionalParams,
  ServiceSubmitBatchOptionalParams,
  ServiceGetAccountInfoOptionalParams,
  ServiceGetUserDelegationKeyOptionalParams,
  ServiceListContainersOptionalParams,
  ServiceGetStatisticsOptionalParams,
  ServiceGetPropertiesOptionalParams,
  ServiceSetPropertiesOptionalParams,
} from "../../api/service/options.js";
import {
  BlobServiceProperties,
  Logging,
  RetentionPolicy,
  Metrics,
  CorsRule,
  StaticWebsite,
  GeoReplication,
  ContainerItem,
  KeyInfo,
  FilterBlobItem,
  SkuName,
  AccountKind,
} from "../../models/azure/storage/blobs/models.js";

/** Interface representing a Service operations. */
export interface ServiceOperations {
  /** The Filter Blobs operation enables callers to list blobs across all containers whose tags match a given search expression. */
  findBlobsByTags: (
    filterExpression: string,
    options?: ServiceFindBlobsByTagsOptionalParams,
  ) => Promise<{
    serviceEndpoint: string;
    where: string;
    blobs: FilterBlobItem[];
    continuationToken?: string;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/xml";
  }>;
  /** The Batch operation allows multiple API calls to be embedded into a single HTTP request. */
  submitBatch: (
    multipartContentType: string,
    contentLength: number,
    body: {
      body: Uint8Array;
    },
    options?: ServiceSubmitBatchOptionalParams,
  ) => Promise<{
    body: Uint8Array;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "multipart/mixed";
  }>;
  /** Returns the sku name and account kind. */
  getAccountInfo: (
    options?: ServiceGetAccountInfoOptionalParams,
  ) => Promise<{
    skuName?: SkuName;
    accountKind?: AccountKind;
    isHierarchicalNamespaceEnabled?: boolean;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  }>;
  /** Retrieves a user delegation key for the Blob service. This is only a valid operation when using bearer token authentication. */
  getUserDelegationKey: (
    keyInfo: KeyInfo,
    options?: ServiceGetUserDelegationKeyOptionalParams,
  ) => Promise<{
    signedObjectId: string;
    signedTenantId: string;
    signedStartsOn: string;
    signedExpiresOn: string;
    signedService: string;
    signedVersion: string;
    signedDelegatedUserTid?: string;
    value: Uint8Array;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/xml";
  }>;
  /** The List Containers Segment operation returns a list of the containers under the specified account */
  listContainers: (options?: ServiceListContainersOptionalParams) => Promise<{
    serviceEndpoint: string;
    prefix?: string;
    marker?: string;
    maxPageSize?: number;
    containerItems: ContainerItem[];
    continuationToken?: string;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/xml";
  }>;
  /** Retrieves statistics related to replication for the Blob service. It is only available on the secondary location endpoint when read-access geo-redundant replication is enabled for the storage account. */
  getStatistics: (options?: ServiceGetStatisticsOptionalParams) => Promise<{
    geoReplication?: GeoReplication;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/xml";
  }>;
  /** Retrieves properties of a storage account's Blob service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules. */
  getProperties: (options?: ServiceGetPropertiesOptionalParams) => Promise<{
    blobAnalyticsLogging?: Logging;
    hourMetrics?: Metrics;
    minuteMetrics?: Metrics;
    cors?: CorsRule[];
    defaultServiceVersion?: string;
    deleteRetentionPolicy?: RetentionPolicy;
    staticWebsite?: StaticWebsite;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/xml";
  }>;
  /** Sets properties for a storage account's Blob service endpoint, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules */
  setProperties: (
    storageServiceProperties: BlobServiceProperties,
    options?: ServiceSetPropertiesOptionalParams,
  ) => Promise<{ date: Date; version: string; requestId?: string; clientRequestId?: string }>;
}

function _getService(context: BlobContext) {
  return {
    findBlobsByTags: (filterExpression: string, options?: ServiceFindBlobsByTagsOptionalParams) =>
      findBlobsByTags(context, filterExpression, options),
    submitBatch: (
      multipartContentType: string,
      contentLength: number,
      body: {
        body: Uint8Array;
      },
      options?: ServiceSubmitBatchOptionalParams,
    ) => submitBatch(context, multipartContentType, contentLength, body, options),
    getAccountInfo: (options?: ServiceGetAccountInfoOptionalParams) =>
      getAccountInfo(context, options),
    getUserDelegationKey: (keyInfo: KeyInfo, options?: ServiceGetUserDelegationKeyOptionalParams) =>
      getUserDelegationKey(context, keyInfo, options),
    listContainers: (options?: ServiceListContainersOptionalParams) =>
      listContainers(context, options),
    getStatistics: (options?: ServiceGetStatisticsOptionalParams) =>
      getStatistics(context, options),
    getProperties: (options?: ServiceGetPropertiesOptionalParams) =>
      getProperties(context, options),
    setProperties: (
      storageServiceProperties: BlobServiceProperties,
      options?: ServiceSetPropertiesOptionalParams,
    ) => setProperties(context, storageServiceProperties, options),
  };
}

export function _getServiceOperations(context: BlobContext): ServiceOperations {
  return {
    ..._getService(context),
  };
}
