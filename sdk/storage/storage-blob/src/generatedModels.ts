// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Tags } from ".";
import {
  AppendBlobAppendBlockFromUrlHeaders,
  AppendBlobAppendBlockHeaders,
  AppendBlobCreateHeaders,
  BlobAbortCopyFromURLHeaders,
  BlobCopyFromURLHeaders,
  BlobCreateSnapshotHeaders,
  BlobDeleteHeaders,
  BlobDeleteImmutabilityPolicyHeaders,
  BlobDownloadResponse as BlobDownloadResponseInternal,
  BlobDownloadHeaders,
  BlobGetPropertiesHeaders,
  BlobPropertiesInternal as BlobProperties,
  BlobGetTagsHeaders,
  BlobTags,
  BlobQueryResponse as BlobQueryResponseInternal,
  BlobQueryHeaders,
  BlobSetHttpHeadersHeaders,
  BlobSetImmutabilityPolicyHeaders,
  BlobSetLegalHoldHeaders,
  BlobSetMetadataHeaders,
  BlobSetTagsHeaders,
  BlobSetTierHeaders,
  BlobStartCopyFromURLHeaders,
  BlobUndeleteHeaders,
  BlockBlobCommitBlockListHeaders,
  BlockBlobGetBlockListResponse as BlockBlobGetBlockListResponseInternal,
  BlockBlobGetBlockListHeaders,
  BlockBlobPutBlobFromUrlHeaders,
  BlockBlobStageBlockFromURLHeaders,
  BlockBlobStageBlockHeaders,
  BlockBlobUploadHeaders,
  ContainerCreateHeaders,
  ContainerDeleteHeaders,
  ContainerGetAccessPolicyHeaders,
  ContainerGetPropertiesHeaders,
  ContainerListBlobFlatSegmentHeaders,
  ContainerListBlobHierarchySegmentHeaders,
  ContainerRenameHeaders,
  ContainerSetAccessPolicyHeaders,
  ContainerSetMetadataHeaders,
  ContainerRestoreHeaders as ContainerUndeleteHeaders,
  PageBlobClearPagesHeaders,
  PageBlobCopyIncrementalHeaders,
  PageBlobCreateHeaders,
  PageBlobGetPageRangesDiffResponse as PageBlobGetPageRangesDiffResponseInternal,
  PageBlobGetPageRangesDiffHeaders,
  PageBlobGetPageRangesResponse as PageBlobGetPageRangesResponseInternal,
  PageBlobGetPageRangesHeaders,
  PageBlobResizeHeaders,
  PageBlobUpdateSequenceNumberHeaders,
  PageBlobUploadPagesFromURLHeaders,
  PageBlobUploadPagesHeaders,
  PageList,
  ServiceGetAccountInfoHeaders,
  ServiceGetPropertiesResponse as ServiceGetPropertiesResponseInternal,
  ServiceGetPropertiesHeaders,
  ServiceGetStatisticsResponse as ServiceGetStatisticsResponseInternal,
  ServiceGetStatisticsHeaders,
  ServiceGetUserDelegationKeyHeaders,
  ServiceListContainersSegmentResponse as ServiceListContainersSegmentResponseInternal,
  ServiceListContainersSegmentHeaders,
  ServiceSetPropertiesHeaders,
  ServiceSubmitBatchResponse as ServiceSubmitBatchResponseInternal,
  ServiceSubmitBatchHeaders,
  SignedIdentifier as SignedIdentifierModel,
  UserDelegationKey as UserDelegationKeyModel,
  PageRange,
} from "./generated/src/models";
import {
  WithResponse,
  ResponseWithBody,
  ResponseLike,
  ResponseWithHeaders,
  HttpResponse,
} from "./utils/utils.common";

/** Contains response data for the appendBlockFromUrl operation. */
export type AppendBlobAppendBlockFromUrlResponse = WithResponse<
  AppendBlobAppendBlockFromUrlHeaders,
  AppendBlobAppendBlockFromUrlHeaders
>;
/** Contains response data for the appendBlock operation. */
export type AppendBlobAppendBlockResponse = WithResponse<
  AppendBlobAppendBlockHeaders,
  AppendBlobAppendBlockHeaders
>;
/** Contains response data for the create operation. */
export type AppendBlobCreateResponse = WithResponse<
  AppendBlobCreateHeaders,
  AppendBlobCreateHeaders
>;
/** Contains response data for the abortCopyFromURL operation. */
export type BlobAbortCopyFromURLResponse = WithResponse<
  BlobAbortCopyFromURLHeaders,
  BlobAbortCopyFromURLHeaders
>;
/** Contains response data for the copyFromURL operation. */
export type BlobCopyFromURLResponse = WithResponse<BlobCopyFromURLHeaders, BlobCopyFromURLHeaders>;
/** Contains response data for the createSnapshot operation. */
export type BlobCreateSnapshotResponse = WithResponse<
  BlobCreateSnapshotHeaders,
  BlobCreateSnapshotHeaders
>;
/** Contains response data for the delete operation. */
export type BlobDeleteResponse = WithResponse<BlobDeleteHeaders, BlobDeleteHeaders>;
/** Contains response data for the deleteImmutabilityPolicy operation. */
export type BlobDeleteImmutabilityPolicyResponse = WithResponse<
  BlobDeleteImmutabilityPolicyHeaders,
  BlobDeleteImmutabilityPolicyHeaders
>;
/** Contains response data for the download operation. */
export type BlobDownloadResponseModel = WithResponse<
  BlobDownloadResponseInternal,
  BlobDownloadHeaders
>;
/** Contains response data for the getProperties operation. */
export type BlobGetPropertiesResponseModel = WithResponse<
  BlobGetPropertiesHeaders,
  BlobGetPropertiesHeaders
>;
/** Contains response data for the query operation. */
export type BlobQueryResponseModel = WithResponse<BlobQueryResponseInternal, BlobQueryHeaders>;
/** Contains response data for the setHttpHeaders operation. */
export type BlobSetHTTPHeadersResponse = WithResponse<
  BlobSetHttpHeadersHeaders,
  BlobSetHttpHeadersHeaders
>;
/** Contains response data for the setImmutabilityPolicy operation. */
export type BlobSetImmutabilityPolicyResponse = WithResponse<
  BlobSetImmutabilityPolicyHeaders,
  BlobSetImmutabilityPolicyHeaders
>;
/** Contains response data for the setLegalHold operation. */
export type BlobSetLegalHoldResponse = WithResponse<
  BlobSetLegalHoldHeaders,
  BlobSetLegalHoldHeaders
>;
/** Contains response data for the setMetadata operation. */
export type BlobSetMetadataResponse = WithResponse<BlobSetMetadataHeaders, BlobSetMetadataHeaders>;
/** Contains response data for the setTags operation. */
export type BlobSetTagsResponse = WithResponse<BlobSetTagsHeaders, BlobSetTagsHeaders>;
/** Contains response data for the setTier operation. */
export type BlobSetTierResponse = WithResponse<BlobSetTierHeaders, BlobSetTierHeaders>;
/** Contains response data for the startCopyFromURL operation. */
export type BlobStartCopyFromURLResponse = WithResponse<
  BlobStartCopyFromURLHeaders,
  BlobStartCopyFromURLHeaders
>;
/** Contains response data for the undelete operation. */
export type BlobUndeleteResponse = WithResponse<BlobUndeleteHeaders, BlobUndeleteHeaders>;
/** Contains response data for the commitBlockList operation. */
export type BlockBlobCommitBlockListResponse = WithResponse<
  BlockBlobCommitBlockListHeaders,
  BlockBlobCommitBlockListHeaders
>;
/** Contains response data for the getBlockList operation. */
export type BlockBlobGetBlockListResponse = WithResponse<
  BlockBlobGetBlockListResponseInternal,
  BlockBlobGetBlockListHeaders
>;
/** Contains response data for the putBlobFromUrl operation. */
export type BlockBlobPutBlobFromUrlResponse = WithResponse<
  BlockBlobPutBlobFromUrlHeaders,
  BlockBlobPutBlobFromUrlHeaders
>;
/** Contains response data for the stageBlockFromURL operation. */
export type BlockBlobStageBlockFromURLResponse = WithResponse<
  BlockBlobStageBlockFromURLHeaders,
  BlockBlobStageBlockFromURLHeaders
>;
/** Contains response data for the stageBlock operation. */
export type BlockBlobStageBlockResponse = WithResponse<
  BlockBlobStageBlockHeaders,
  BlockBlobStageBlockHeaders
>;
/** Contains response data for the upload operation. */
export type BlockBlobUploadResponse = WithResponse<BlockBlobUploadHeaders, BlockBlobUploadHeaders>;
/** Contains response data for the create operation. */
export type ContainerCreateResponse = WithResponse<ContainerCreateHeaders, ContainerCreateHeaders>;
/** Contains response data for the delete operation. */
export type ContainerDeleteResponse = WithResponse<ContainerDeleteHeaders, ContainerDeleteHeaders>;
/** Contains response data for the getProperties operation. */
export type ContainerGetPropertiesResponse = WithResponse<
  ContainerGetPropertiesHeaders,
  ContainerGetPropertiesHeaders
>;
/** Contains response data for the rename operation. */
export type ContainerRenameResponse = WithResponse<ContainerRenameHeaders, ContainerRenameHeaders>;
/** Contains response data for the setAccessPolicy operation. */
export type ContainerSetAccessPolicyResponse = WithResponse<
  ContainerSetAccessPolicyHeaders,
  ContainerSetAccessPolicyHeaders
>;
/** Contains response data for the setMetadata operation. */
export type ContainerSetMetadataResponse = WithResponse<
  ContainerSetMetadataHeaders,
  ContainerSetMetadataHeaders
>;
/** Contains response data for the restore operation. */
export type ContainerUndeleteResponse = WithResponse<
  ContainerUndeleteHeaders,
  ContainerUndeleteHeaders
>;
/** Contains response data for the clearPages operation. */
export type PageBlobClearPagesResponse = WithResponse<
  PageBlobClearPagesHeaders,
  PageBlobClearPagesHeaders
>;
/** Contains response data for the copyIncremental operation. */
export type PageBlobCopyIncrementalResponse = WithResponse<
  PageBlobCopyIncrementalHeaders,
  PageBlobCopyIncrementalHeaders
>;
/** Contains response data for the create operation. */
export type PageBlobCreateResponse = WithResponse<PageBlobCreateHeaders, PageBlobCreateHeaders>;
/** Contains response data for the getPageRangesDiff operation. */
export type PageBlobGetPageRangesDiffResponseModel = WithResponse<
  PageBlobGetPageRangesDiffResponseInternal,
  PageBlobGetPageRangesDiffHeaders,
  PageList
>;
/** Contains response data for the getPageRanges operation. */
export type PageBlobGetPageRangesResponseModel = WithResponse<
  PageBlobGetPageRangesResponseInternal,
  PageBlobGetPageRangesHeaders,
  PageList
>;
/** Contains response data for the resize operation. */
export type PageBlobResizeResponse = WithResponse<PageBlobResizeHeaders, PageBlobResizeHeaders>;
/** Contains response data for the updateSequenceNumber operation. */
export type PageBlobUpdateSequenceNumberResponse = WithResponse<
  PageBlobUpdateSequenceNumberHeaders,
  PageBlobUpdateSequenceNumberHeaders
>;
/** Contains response data for the uploadPagesFromURL operation. */
export type PageBlobUploadPagesFromURLResponse = WithResponse<
  PageBlobUploadPagesFromURLHeaders,
  PageBlobUploadPagesFromURLHeaders
>;
/** Contains response data for the uploadPages operation. */
export type PageBlobUploadPagesResponse = WithResponse<
  PageBlobUploadPagesHeaders,
  PageBlobUploadPagesHeaders
>;
/** Contains response data for the getAccountInfo operation. */
export type ServiceGetAccountInfoResponse = WithResponse<
  ServiceGetAccountInfoHeaders,
  ServiceGetAccountInfoHeaders
>;
/** Contains response data for the getProperties operation. */
export type ServiceGetPropertiesResponse = WithResponse<
  ServiceGetPropertiesResponseInternal,
  ServiceGetPropertiesHeaders
>;
/** Contains response data for the getStatistics operation. */
export type ServiceGetStatisticsResponse = WithResponse<
  ServiceGetStatisticsResponseInternal,
  ServiceGetStatisticsHeaders
>;
/** Contains response data for the listContainersSegment operation. */
export type ServiceListContainersSegmentResponse = WithResponse<
  ServiceListContainersSegmentResponseInternal,
  ServiceListContainersSegmentHeaders
>;
/** Contains response data for the setProperties operation. */
export type ServiceSetPropertiesResponse = WithResponse<
  ServiceSetPropertiesHeaders,
  ServiceSetPropertiesHeaders
>;
/** Contains response data for the submitBatch operation. */
export type ServiceSubmitBatchResponseModel = WithResponse<
  ServiceSubmitBatchResponseInternal,
  ServiceSubmitBatchHeaders
>;
export {
  AppendBlobAppendBlockFromUrlHeaders,
  AppendBlobAppendBlockHeaders,
  AppendBlobCreateHeaders,
  BlobAbortCopyFromURLHeaders,
  BlobCopyFromURLHeaders,
  BlobCreateSnapshotHeaders,
  BlobDeleteHeaders,
  BlobDeleteImmutabilityPolicyHeaders,
  BlobDownloadHeaders,
  BlobDownloadResponseInternal,
  BlobGetPropertiesHeaders,
  BlobGetTagsHeaders,
  BlobTags,
  BlobQueryHeaders,
  BlobQueryResponseInternal,
  BlobSetHttpHeadersHeaders as BlobSetHTTPHeadersHeaders,
  BlobSetImmutabilityPolicyHeaders,
  BlobSetLegalHoldHeaders,
  BlobSetMetadataHeaders,
  BlobSetTagsHeaders,
  BlobSetTierHeaders,
  BlobStartCopyFromURLHeaders,
  BlobUndeleteHeaders,
  BlockBlobCommitBlockListHeaders,
  BlockBlobGetBlockListHeaders,
  BlockBlobGetBlockListResponseInternal,
  BlockBlobPutBlobFromUrlHeaders,
  BlockBlobStageBlockFromURLHeaders,
  BlockBlobStageBlockHeaders,
  BlockBlobUploadHeaders,
  ContainerCreateHeaders,
  ContainerDeleteHeaders,
  ContainerGetAccessPolicyHeaders,
  ContainerGetPropertiesHeaders,
  ContainerListBlobFlatSegmentHeaders,
  ContainerListBlobHierarchySegmentHeaders,
  ContainerRenameHeaders,
  ContainerSetAccessPolicyHeaders,
  ContainerSetMetadataHeaders,
  ContainerUndeleteHeaders,
  PageBlobClearPagesHeaders,
  PageBlobCopyIncrementalHeaders,
  PageBlobCreateHeaders,
  PageBlobGetPageRangesDiffHeaders,
  PageBlobGetPageRangesDiffResponseInternal,
  PageBlobGetPageRangesHeaders,
  PageBlobGetPageRangesResponseInternal,
  PageBlobResizeHeaders,
  PageBlobUpdateSequenceNumberHeaders,
  PageBlobUploadPagesFromURLHeaders,
  PageBlobUploadPagesHeaders,
  PageList as PageListInternal,
  ServiceGetAccountInfoHeaders,
  ServiceGetPropertiesHeaders,
  ServiceGetPropertiesResponseInternal,
  ServiceGetStatisticsHeaders,
  ServiceGetStatisticsResponseInternal,
  ServiceGetUserDelegationKeyHeaders,
  ServiceListContainersSegmentHeaders,
  ServiceListContainersSegmentResponseInternal,
  ServiceSetPropertiesHeaders,
  ServiceSubmitBatchHeaders,
  ServiceSubmitBatchResponseInternal,
  SignedIdentifierModel,
  UserDelegationKeyModel,
  WithResponse,
  ResponseWithBody,
  ResponseLike,
  HttpResponse,
  ResponseWithHeaders,
  PageRange,
};

export {
  AccessPolicy,
  AccessTier,
  AccountKind,
  ArchiveStatus,
  BlobImmutabilityPolicyMode,
  BlobCopySourceTags,
  BlobDownloadOptionalParams,
  BlobPropertiesInternal as BlobProperties,
  BlobHttpHeaders as BlobHTTPHeaders,
  BlobType,
  Block,
  BlockList,
  BlockListType,
  BlobServiceProperties,
  BlobServiceStatistics,
  BlobTag,
  ContainerFilterBlobsResponse,
  ContainerFilterBlobsHeaders,
  ContainerGetAccessPolicyResponse as ContainerGetAccessPolicyResponseModel,
  ContainerBreakLeaseOptionalParams,
  ContainerProperties,
  CopyStatusType,
  CorsRule,
  ClearRange,
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
  SequenceNumberActionType,
  RehydratePriority,
  RetentionPolicy,
  AppendPositionAccessConditions,
  SequenceNumberAccessConditions,
  SkuName,
  StaticWebsite,
  ContainerItem,
  ServiceSubmitBatchOptionalParams as ServiceSubmitBatchOptionalParamsModel,
  ContainerEncryptionScope,
  SyncCopyStatusType,
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

/** Known values of {@link EncryptionAlgorithmType} that the service accepts. */
export enum KnownEncryptionAlgorithmType {
  AES256 = "AES256",
}
