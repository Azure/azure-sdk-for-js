// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Tags } from ".";
import { BlobTags, BlobPropertiesInternal as BlobProperties } from "./generated/src/models";

export {
  AccessPolicy,
  AccessTier,
  AccountKind,
  AppendBlobCreateResponse,
  AppendBlobAppendBlockResponse,
  AppendBlobAppendBlockFromUrlHeaders,
  AppendBlobAppendBlockFromUrlResponse,
  AppendBlobAppendBlockHeaders,
  AppendBlobCreateHeaders,
  ArchiveStatus,
  BlobDeleteImmutabilityPolicyHeaders,
  BlobDeleteImmutabilityPolicyResponse,
  BlobImmutabilityPolicyMode,
  BlobAbortCopyFromURLHeaders,
  BlobCopyFromURLHeaders,
  BlobCopySourceTags,
  BlobCreateSnapshotHeaders,
  BlobDeleteHeaders,
  BlobDeleteResponse,
  BlobDownloadOptionalParams,
  BlobGetPropertiesHeaders,
  BlobGetPropertiesResponse as BlobGetPropertiesResponseModel,
  BlobPropertiesInternal as BlobProperties,
  BlobUndeleteResponse,
  BlobHttpHeaders as BlobHTTPHeaders,
  BlobSetHttpHeadersHeaders as BlobSetHTTPHeadersHeaders,
  BlobSetHttpHeadersResponse as BlobSetHTTPHeadersResponse,
  BlobSetImmutabilityPolicyHeaders,
  BlobSetImmutabilityPolicyResponse,
  BlobSetLegalHoldHeaders,
  BlobSetLegalHoldResponse,
  BlobSetMetadataResponse,
  BlobSetTagsResponse,
  BlobCreateSnapshotResponse,
  BlobStartCopyFromURLHeaders,
  BlobStartCopyFromURLResponse,
  BlobAbortCopyFromURLResponse,
  BlobCopyFromURLResponse,
  BlobSetMetadataHeaders,
  BlobSetTierHeaders,
  BlobSetTierResponse,
  BlobSetTagsHeaders,
  BlobDownloadHeaders,
  BlobDownloadResponse as BlobDownloadResponseModel,
  BlobType,
  BlobTags,
  BlobUndeleteHeaders,
  Block,
  BlockBlobCommitBlockListHeaders,
  BlockBlobUploadHeaders,
  BlockBlobUploadResponse,
  BlockBlobStageBlockResponse,
  BlockBlobStageBlockFromURLResponse,
  BlockBlobCommitBlockListResponse,
  BlockBlobGetBlockListHeaders,
  BlockBlobStageBlockFromURLHeaders,
  BlockBlobStageBlockHeaders,
  BlockList,
  BlockListType,
  BlockBlobGetBlockListResponse,
  BlobServiceProperties,
  BlobServiceStatistics,
  BlobGetTagsHeaders,
  BlobTag,
  ContainerCreateHeaders,
  ContainerCreateResponse,
  ContainerDeleteHeaders,
  ContainerDeleteResponse,
  ContainerFilterBlobsHeaders,
  ContainerGetAccessPolicyHeaders,
  ContainerGetPropertiesHeaders,
  ContainerBreakLeaseOptionalParams,
  ContainerListBlobFlatSegmentHeaders,
  ContainerListBlobHierarchySegmentHeaders,
  ContainerGetPropertiesResponse,
  ContainerProperties,
  ContainerSetMetadataResponse,
  ContainerSetAccessPolicyHeaders,
  ContainerSetAccessPolicyResponse,
  ContainerSetMetadataHeaders,
  CopyStatusType,
  CorsRule,
  CpkInfo,
  DeleteSnapshotsOptionType,
  EncryptionAlgorithmType,
  GeoReplication,
  GeoReplicationStatusType,
  LeaseAccessConditions,
  LeaseDurationType,
  LeaseStateType,
  LeaseStatusType,
  ListContainersSegmentResponse,
  FilterBlobItem as FilterBlobItemModel,
  FilterBlobSegment as FilterBlobSegmentModel,
  ServiceFilterBlobsHeaders,
  Logging,
  Metrics,
  ModifiedAccessConditions as ModifiedAccessConditionsModel,
  PublicAccessType,
  PageBlobCreateResponse,
  PageBlobUploadPagesResponse,
  PageBlobUploadPagesFromURLResponse,
  PageBlobClearPagesHeaders,
  PageBlobClearPagesResponse,
  PageBlobCopyIncrementalHeaders,
  PageBlobCreateHeaders,
  PageBlobGetPageRangesHeaders,
  PageBlobGetPageRangesResponse as PageBlobGetPageRangesResponseModel,
  PageBlobGetPageRangesDiffHeaders,
  PageBlobGetPageRangesDiffResponse as PageBlobGetPageRangesDiffResponseModel,
  PageBlobResizeHeaders,
  PageBlobResizeResponse,
  PageBlobUpdateSequenceNumberHeaders,
  PageBlobUpdateSequenceNumberResponse,
  PageBlobUploadPagesFromURLHeaders,
  PageBlobUploadPagesHeaders,
  PageBlobCopyIncrementalResponse,
  SequenceNumberActionType,
  RehydratePriority,
  RetentionPolicy,
  AppendPositionAccessConditions,
  ServiceGetUserDelegationKeyHeaders,
  ServiceSubmitBatchHeaders,
  ServiceGetAccountInfoHeaders,
  ServiceGetPropertiesHeaders,
  ServiceGetPropertiesResponse,
  ServiceGetStatisticsHeaders,
  SequenceNumberAccessConditions,
  ServiceSetPropertiesResponse,
  ServiceGetStatisticsResponse,
  ServiceGetAccountInfoResponse,
  ServiceListContainersSegmentHeaders,
  ServiceListContainersSegmentResponse,
  ServiceSetPropertiesHeaders,
  SkuName,
  StaticWebsite,
  ContainerItem,
  ServiceSubmitBatchResponse as ServiceSubmitBatchResponseModel,
  ServiceSubmitBatchOptionalParams as ServiceSubmitBatchOptionalParamsModel,
  SignedIdentifier as SignedIdentifierModel,
  SyncCopyStatusType,
  UserDelegationKey as UserDelegationKeyModel,
  ContainerEncryptionScope,
  BlobQueryHeaders,
  BlobQueryResponse as BlobQueryResponseModel,
  ContainerRestoreResponse as ContainerUndeleteResponse,
  ContainerRestoreHeaders as ContainerUndeleteHeaders,
  BlockBlobPutBlobFromUrlResponse,
  BlockBlobPutBlobFromUrlHeaders,
  ContainerRenameResponse,
  ContainerRenameHeaders,
} from "./generated/src/models";

// Following definitions are to avoid breaking change.
export interface BlobPrefix {
  name: string;
}

/** An enumeration of blobs */
export interface ListBlobsFlatSegmentResponseModel {
  serviceEndpoint: string;
  containerName: string;
  prefix?: string;
  marker?: string;
  maxPageSize?: number;
  segment: BlobFlatListSegmentModel;
  continuationToken?: string;
}

export interface BlobFlatListSegmentModel {
  blobItems: BlobItemInternal[];
}

/** An enumeration of blobs */
export interface ListBlobsHierarchySegmentResponseModel {
  serviceEndpoint: string;
  containerName: string;
  prefix?: string;
  marker?: string;
  maxPageSize?: number;
  delimiter?: string;
  segment: BlobHierarchyListSegmentModel;
  continuationToken?: string;
}

export interface BlobHierarchyListSegmentModel {
  blobPrefixes?: BlobPrefix[];
  blobItems: BlobItemInternal[];
}

/** An Azure Storage blob */
export interface BlobItemInternal {
  name: string;
  deleted: boolean;
  snapshot: string;
  versionId?: string;
  isCurrentVersion?: boolean;
  /** Properties of a blob */
  properties: BlobProperties;
  /** Dictionary of <string> */
  metadata?: { [propertyName: string]: string };
  /** Blob tags */
  blobTags?: BlobTags;
  /** Dictionary of <string> */
  objectReplicationMetadata?: { [propertyName: string]: string };
  /** Inactive root blobs which have any versions would have such tag with value true. */
  hasVersionsOnly?: boolean;
}

/**
 * Blob info from a {@link BlobServiceClient.findBlobsByTags}
 */
export interface FilterBlobItem {
  /**
   * Blob Name.
   */
  name: string;

  /**
   * Container Name.
   */
  containerName: string;

  /**
   * Blob Tags.
   */
  tags?: Tags;

  /**
   * Tag value.
   *
   * @deprecated The service no longer returns this value. Use {@link tags} to fetch all matching Blob Tags.
   */
  tagValue: string;
}

/**
 * Segment response of {@link BlobServiceClient.findBlobsByTags} operation.
 */
export interface FilterBlobSegment {
  serviceEndpoint: string;
  where: string;
  blobs: FilterBlobItem[];
  continuationToken?: string;
}

export interface PageRangeInfo {
  start: number;
  end: number;
  isClear: boolean;
}
