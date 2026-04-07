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
  StorageServiceStats,
  ListContainersSegmentResponse,
  KeyInfo,
  UserDelegationKey,
  FilterBlobSegment,
  SkuName,
  AccountKind,
} from "../../models/azure/storage/blobs/models.js";
import { FileContents } from "../../static-helpers/multipartHelpers.js";
import { StorageCompatResponseInfo } from "../../static-helpers/storageCompatResponse.js";

/** Interface representing a Service operations. */
export interface ServiceOperations {
  /** The Filter Blobs operation enables callers to list blobs across all containers whose tags match a given search expression. */
  findBlobsByTags: (
    filterExpression: string,
    options?: ServiceFindBlobsByTagsOptionalParams,
  ) => Promise<
    {
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
      contentType: "application/xml";
    } & FilterBlobSegment &
      StorageCompatResponseInfo<
        FilterBlobSegment,
        {
          date: Date;
          version: string;
          requestId?: string;
          clientRequestId?: string;
          contentType: "application/xml";
        }
      >
  >;
  /** The Batch operation allows multiple API calls to be embedded into a single HTTP request. */
  submitBatch: (
    contentType: string,
    contentLength: number,
    body: string,
    options?: ServiceSubmitBatchOptionalParams,
  ) => Promise<
    {
      version: string;
      requestId?: string;
      clientRequestId?: string;
      contentType: "multipart/mixed";
    } & {
      body: FileContents | { contents: FileContents; contentType?: string; filename?: string };
    } & StorageCompatResponseInfo<
        {
          body: FileContents | { contents: FileContents; contentType?: string; filename?: string };
        },
        {
          version: string;
          requestId?: string;
          clientRequestId?: string;
          contentType: "multipart/mixed";
        }
      >
  >;
  /** Returns the sku name and account kind. */
  getAccountInfo: (
    options?: ServiceGetAccountInfoOptionalParams,
  ) => Promise<
    {
      skuName?: SkuName;
      accountKind?: AccountKind;
      isHierarchicalNamespaceEnabled?: boolean;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        skuName?: SkuName;
        accountKind?: AccountKind;
        isHierarchicalNamespaceEnabled?: boolean;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Retrieves a user delegation key for the Blob service. This is only a valid operation when using bearer token authentication. */
  getUserDelegationKey: (
    keyInfo: KeyInfo,
    options?: ServiceGetUserDelegationKeyOptionalParams,
  ) => Promise<
    {
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
      contentType: "application/xml";
    } & UserDelegationKey &
      StorageCompatResponseInfo<
        UserDelegationKey,
        {
          date: Date;
          version: string;
          requestId?: string;
          clientRequestId?: string;
          contentType: "application/xml";
        }
      >
  >;
  /** The List Containers Segment operation returns a list of the containers under the specified account */
  listContainers: (
    options?: ServiceListContainersOptionalParams,
  ) => Promise<
    {
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
      contentType: "application/xml";
    } & ListContainersSegmentResponse &
      StorageCompatResponseInfo<
        ListContainersSegmentResponse,
        {
          date: Date;
          version: string;
          requestId?: string;
          clientRequestId?: string;
          contentType: "application/xml";
        }
      >
  >;
  /** Retrieves statistics related to replication for the Blob service. It is only available on the secondary location endpoint when read-access geo-redundant replication is enabled for the storage account. */
  getStatistics: (
    options?: ServiceGetStatisticsOptionalParams,
  ) => Promise<
    {
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
      contentType: "application/xml";
    } & StorageServiceStats &
      StorageCompatResponseInfo<
        StorageServiceStats,
        {
          date: Date;
          version: string;
          requestId?: string;
          clientRequestId?: string;
          contentType: "application/xml";
        }
      >
  >;
  /** Retrieves properties of a storage account's Blob service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules. */
  getProperties: (
    options?: ServiceGetPropertiesOptionalParams,
  ) => Promise<
    {
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
      contentType: "application/xml";
    } & BlobServiceProperties &
      StorageCompatResponseInfo<
        BlobServiceProperties,
        {
          date: Date;
          version: string;
          requestId?: string;
          clientRequestId?: string;
          contentType: "application/xml";
        }
      >
  >;
  /** Sets properties for a storage account's Blob service endpoint, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules */
  setProperties: (
    storageServiceProperties: BlobServiceProperties,
    options?: ServiceSetPropertiesOptionalParams,
  ) => Promise<
    {
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      { date: Date; version: string; requestId?: string; clientRequestId?: string }
    >
  >;
}

function _getService(context: BlobContext) {
  return {
    findBlobsByTags: (filterExpression: string, options?: ServiceFindBlobsByTagsOptionalParams) =>
      findBlobsByTags(context, filterExpression, options),
    submitBatch: (
      contentType: string,
      contentLength: number,
      body: string,
      options?: ServiceSubmitBatchOptionalParams,
    ) => submitBatch(context, contentType, contentLength, body, options),
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
