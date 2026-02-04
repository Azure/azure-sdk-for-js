// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createService, ServiceContext, ServiceOptionalParams } from "./api/index.js";
import {
  BlobServiceProperties,
  StorageServiceStats,
  ListContainersSegmentResponse,
  KeyInfo,
  UserDelegationKey,
  FilterBlobSegment,
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
  ): Promise<FilterBlobSegment> {
    return findBlobsByTags(this._client, filterExpression, options);
  }

  /** The Batch operation allows multiple API calls to be embedded into a single HTTP request. */
  submitBatch(
    contentLength: number,
    body: {
      name: string;
      body: Uint8Array;
    },
    options: SubmitBatchOptionalParams = { requestOptions: {} },
  ): Promise<{
    name: string;
    body: Uint8Array;
  }> {
    return submitBatch(this._client, contentLength, body, options);
  }

  /** Returns the sku name and account kind. */
  getAccountInfo(options: GetAccountInfoOptionalParams = { requestOptions: {} }): Promise<void> {
    return getAccountInfo(this._client, options);
  }

  /** Retrieves a user delegation key for the Blob service. This is only a valid operation when using bearer token authentication. */
  getUserDelegationKey(
    keyInfo: KeyInfo,
    options: GetUserDelegationKeyOptionalParams = { requestOptions: {} },
  ): Promise<UserDelegationKey> {
    return getUserDelegationKey(this._client, keyInfo, options);
  }

  /** The List Containers Segment operation returns a list of the containers under the specified account */
  listContainersSegment(
    options: ListContainersSegmentOptionalParams = { requestOptions: {} },
  ): Promise<ListContainersSegmentResponse> {
    return listContainersSegment(this._client, options);
  }

  /** Retrieves statistics related to replication for the Blob service. It is only available on the secondary location endpoint when read-access geo-redundant replication is enabled for the storage account. */
  getStatistics(
    options: GetStatisticsOptionalParams = { requestOptions: {} },
  ): Promise<StorageServiceStats> {
    return getStatistics(this._client, options);
  }

  /** Retrieves properties of a storage account's Blob service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules. */
  getProperties(
    options: GetPropertiesOptionalParams = { requestOptions: {} },
  ): Promise<BlobServiceProperties> {
    return getProperties(this._client, options);
  }

  /** Sets properties for a storage account's Blob service endpoint, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules */
  setProperties(
    storageServiceProperties: BlobServiceProperties,
    options: SetPropertiesOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return setProperties(this._client, storageServiceProperties, options);
  }
}
