// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createService, ServiceContext, ServiceOptionalParams } from "./api/index.js";
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
} from "../models/azure/storage/blobs/models.js";
import {
  findBlobsByTags,
  submitBatch,
  getAccountInfo,
  getUserDelegationKey,
  listContainersSegment,
  getStatistics,
  getProperties,
  setProperties,
} from "./api/operations.js";
import {
  FindBlobsByTagsOptionalParams,
  SubmitBatchOptionalParams,
  GetAccountInfoOptionalParams,
  GetUserDelegationKeyOptionalParams,
  ListContainersSegmentOptionalParams,
  GetStatisticsOptionalParams,
  GetPropertiesOptionalParams,
  SetPropertiesOptionalParams,
} from "./api/options.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { ServiceOptionalParams } from "./api/serviceContext.js";

export class Service {
  private _client: ServiceContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: ServiceOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createService(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** The Filter Blobs operation enables callers to list blobs across all containers whose tags match a given search expression. */
  findBlobsByTags(
    filterExpression: string,
    options: FindBlobsByTagsOptionalParams = { requestOptions: {} },
  ): Promise<{
    serviceEndpoint: string;
    where: string;
    blobs: FilterBlobItem[];
    nextMarker?: string;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/xml";
  }> {
    return findBlobsByTags(this._client, filterExpression, options);
  }

  /** The Batch operation allows multiple API calls to be embedded into a single HTTP request. */
  submitBatch(
    multipartContentType: string,
    contentLength: number,
    body: {
      name: string;
      body: Uint8Array;
    },
    options: SubmitBatchOptionalParams = { requestOptions: {} },
  ): Promise<{
    name: string;
    body: Uint8Array;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "multipart/mixed";
  }> {
    return submitBatch(this._client, multipartContentType, contentLength, body, options);
  }

  /** Returns the sku name and account kind. */
  getAccountInfo(
    options: GetAccountInfoOptionalParams = { requestOptions: {} },
  ): Promise<{
    skuName?: SkuName;
    accountKind?: AccountKind;
    isHierarchicalNamespaceEnabled?: boolean;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  }> {
    return getAccountInfo(this._client, options);
  }

  /** Retrieves a user delegation key for the Blob service. This is only a valid operation when using bearer token authentication. */
  getUserDelegationKey(
    keyInfo: KeyInfo,
    options: GetUserDelegationKeyOptionalParams = { requestOptions: {} },
  ): Promise<{
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
  }> {
    return getUserDelegationKey(this._client, keyInfo, options);
  }

  /** The List Containers Segment operation returns a list of the containers under the specified account */
  listContainersSegment(
    options: ListContainersSegmentOptionalParams = { requestOptions: {} },
  ): Promise<{
    serviceEndpoint: string;
    prefix?: string;
    marker?: string;
    maxResults?: number;
    containerItems: ContainerItem[];
    nextMarker?: string;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/xml";
  }> {
    return listContainersSegment(this._client, options);
  }

  /** Retrieves statistics related to replication for the Blob service. It is only available on the secondary location endpoint when read-access geo-redundant replication is enabled for the storage account. */
  getStatistics(options: GetStatisticsOptionalParams = { requestOptions: {} }): Promise<{
    geoReplication?: GeoReplication;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/xml";
  }> {
    return getStatistics(this._client, options);
  }

  /** Retrieves properties of a storage account's Blob service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules. */
  getProperties(options: GetPropertiesOptionalParams = { requestOptions: {} }): Promise<{
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
  }> {
    return getProperties(this._client, options);
  }

  /** Sets properties for a storage account's Blob service endpoint, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules */
  setProperties(
    storageServiceProperties: BlobServiceProperties,
    options: SetPropertiesOptionalParams = { requestOptions: {} },
  ): Promise<{ date: Date; version: string; requestId?: string; clientRequestId?: string }> {
    return setProperties(this._client, storageServiceProperties, options);
  }
}
