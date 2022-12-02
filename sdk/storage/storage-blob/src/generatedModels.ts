// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Tags } from ".";
import {
  AppendBlobAppendBlockFromUrlResponse as AppendBlobAppendBlockFromUrlResponseInternal,
  AppendBlobAppendBlockFromUrlHeaders,
  AppendBlobAppendBlockResponse as AppendBlobAppendBlockResponseInternal,
  AppendBlobAppendBlockHeaders,
  AppendBlobCreateResponse as AppendBlobCreateResponseInternal,
  AppendBlobCreateHeaders,
  BlobAbortCopyFromURLResponse as BlobAbortCopyFromURLResponseInternal,
  BlobAbortCopyFromURLHeaders,
  BlobCopyFromURLResponse as BlobCopyFromURLResponseInternal,
  BlobCopyFromURLHeaders,
  BlobCreateSnapshotResponse as BlobCreateSnapshotResponseInternal,
  BlobCreateSnapshotHeaders,
  BlobDeleteResponse as BlobDeleteResponseInternal,
  BlobDeleteHeaders,
  BlobDeleteImmutabilityPolicyResponse as BlobDeleteImmutabilityPolicyResponseInternal,
  BlobDeleteImmutabilityPolicyHeaders,
  BlobDownloadResponse as BlobDownloadResponseInternal,
  BlobDownloadHeaders,
  BlobGetPropertiesResponse as BlobGetPropertiesResponseInternal,
  BlobGetPropertiesHeaders,
  BlobPropertiesInternal as BlobProperties,
  BlobGetTagsResponse as BlobGetTagsResponseInternal,
  BlobGetTagsHeaders,
  BlobTags,
  BlobQueryResponse as BlobQueryResponseInternal,
  BlobQueryHeaders,
  BlobSetHttpHeadersResponse as BlobSetHttpHeadersResponseInternal,
  BlobSetHttpHeadersHeaders,
  BlobSetImmutabilityPolicyResponse as BlobSetImmutabilityPolicyResponseInternal,
  BlobSetImmutabilityPolicyHeaders,
  BlobSetLegalHoldResponse as BlobSetLegalHoldResponseInternal,
  BlobSetLegalHoldHeaders,
  BlobSetMetadataResponse as BlobSetMetadataResponseInternal,
  BlobSetMetadataHeaders,
  BlobSetTagsResponse as BlobSetTagsResponseInternal,
  BlobSetTagsHeaders,
  BlobSetTierResponse as BlobSetTierResponseInternal,
  BlobSetTierHeaders,
  BlobStartCopyFromURLResponse as BlobStartCopyFromURLResponseInternal,
  BlobStartCopyFromURLHeaders,
  BlobUndeleteResponse as BlobUndeleteResponseInternal,
  BlobUndeleteHeaders,
  BlockBlobCommitBlockListResponse as BlockBlobCommitBlockListResponseInternal,
  BlockBlobCommitBlockListHeaders,
  BlockBlobGetBlockListResponse as BlockBlobGetBlockListResponseInternal,
  BlockBlobGetBlockListHeaders,
  BlockBlobPutBlobFromUrlResponse as BlockBlobPutBlobFromUrlResponseInternal,
  BlockBlobPutBlobFromUrlHeaders,
  BlockBlobStageBlockFromURLResponse as BlockBlobStageBlockFromURLResponseInternal,
  BlockBlobStageBlockFromURLHeaders,
  BlockBlobStageBlockResponse as BlockBlobStageBlockResponseInternal,
  BlockBlobStageBlockHeaders,
  BlockBlobUploadResponse as BlockBlobUploadResponseInternal,
  BlockBlobUploadHeaders,
  ContainerCreateResponse as ContainerCreateResponseInternal,
  ContainerCreateHeaders,
  ContainerDeleteResponse as ContainerDeleteResponseInternal,
  ContainerDeleteHeaders,
  ContainerGetAccessPolicyHeaders,
  ContainerGetPropertiesResponse as ContainerGetPropertiesResponseInternal,
  ContainerGetPropertiesHeaders,
  ContainerListBlobFlatSegmentHeaders,
  ContainerListBlobHierarchySegmentHeaders,
  ContainerRenameResponse as ContainerRenameResponseInternal,
  ContainerRenameHeaders,
  ContainerSetAccessPolicyResponse as ContainerSetAccessPolicyResponseInternal,
  ContainerSetAccessPolicyHeaders,
  ContainerSetMetadataResponse as ContainerSetMetadataResponseInternal,
  ContainerSetMetadataHeaders,
  ContainerRestoreResponse as ContainerUndeleteResponseInternal,
  ContainerRestoreHeaders as ContainerUndeleteHeaders,
  PageBlobClearPagesResponse as PageBlobClearPagesResponseInternal,
  PageBlobClearPagesHeaders,
  PageBlobCopyIncrementalResponse as PageBlobCopyIncrementalResponseInternal,
  PageBlobCopyIncrementalHeaders,
  PageBlobCreateResponse as PageBlobCreateResponseInternal,
  PageBlobCreateHeaders,
  PageBlobGetPageRangesDiffResponse as PageBlobGetPageRangesDiffResponseInternal,
  PageBlobGetPageRangesDiffHeaders,
  PageBlobGetPageRangesResponse as PageBlobGetPageRangesResponseInternal,
  PageBlobGetPageRangesHeaders,
  PageBlobResizeResponse as PageBlobResizeResponseInternal,
  PageBlobResizeHeaders,
  PageBlobUpdateSequenceNumberResponse as PageBlobUpdateSequenceNumberResponseInternal,
  PageBlobUpdateSequenceNumberHeaders,
  PageBlobUploadPagesFromURLResponse as PageBlobUploadPagesFromURLResponseInternal,
  PageBlobUploadPagesFromURLHeaders,
  PageBlobUploadPagesResponse as PageBlobUploadPagesResponseInternal,
  PageBlobUploadPagesHeaders,
  PageList,
  ServiceGetAccountInfoResponse as ServiceGetAccountInfoResponseInternal,
  ServiceGetAccountInfoHeaders,
  ServiceGetPropertiesResponse as ServiceGetPropertiesResponseInternal,
  ServiceGetPropertiesHeaders,
  ServiceGetStatisticsResponse as ServiceGetStatisticsResponseInternal,
  ServiceGetStatisticsHeaders,
  ServiceGetUserDelegationKeyHeaders,
  ServiceListContainersSegmentResponse as ServiceListContainersSegmentResponseInternal,
  ServiceListContainersSegmentHeaders,
  ServiceSetPropertiesResponse as ServiceSetPropertiesResponseInternal,
  ServiceSetPropertiesHeaders,
  ServiceSubmitBatchResponse as ServiceSubmitBatchResponseInternal,
  ServiceSubmitBatchHeaders,
  SignedIdentifier as SignedIdentifierModel,
  UserDelegationKey as UserDelegationKeyModel,
} from "./generated/src/models";
import { WithResponse } from "./utils/utils.common";

export type AppendBlobAppendBlockFromUrlResponse = WithResponse<
  AppendBlobAppendBlockFromUrlResponseInternal,
  AppendBlobAppendBlockFromUrlHeaders
>;
export type AppendBlobAppendBlockResponse = WithResponse<
  AppendBlobAppendBlockResponseInternal,
  AppendBlobAppendBlockHeaders
>;
export type AppendBlobCreateResponse = WithResponse<
  AppendBlobCreateResponseInternal,
  AppendBlobCreateHeaders
>;
export type BlobAbortCopyFromURLResponse = WithResponse<
  BlobAbortCopyFromURLResponseInternal,
  BlobAbortCopyFromURLHeaders
>;
export type BlobCopyFromURLResponse = WithResponse<
  BlobCopyFromURLResponseInternal,
  BlobCopyFromURLHeaders
>;
export type BlobCreateSnapshotResponse = WithResponse<
  BlobCreateSnapshotResponseInternal,
  BlobCreateSnapshotHeaders
>;
export type BlobDeleteResponse = WithResponse<BlobDeleteResponseInternal, BlobDeleteHeaders>;
export type BlobDeleteImmutabilityPolicyResponse = WithResponse<
  BlobDeleteImmutabilityPolicyResponseInternal,
  BlobDeleteImmutabilityPolicyHeaders
>;
export type BlobDownloadResponseModel = WithResponse<
  BlobDownloadResponseInternal,
  BlobDownloadHeaders
>;
export type BlobGetPropertiesResponseModel = WithResponse<
  BlobGetPropertiesResponseInternal,
  BlobGetPropertiesHeaders
>;
export type BlobQueryResponseModel = WithResponse<BlobQueryResponseInternal, BlobQueryHeaders>;
export type BlobSetHTTPHeadersResponse = WithResponse<
  BlobSetHttpHeadersResponseInternal,
  BlobSetHttpHeadersHeaders
>;
export type BlobSetImmutabilityPolicyResponse = WithResponse<
  BlobSetImmutabilityPolicyResponseInternal,
  BlobSetImmutabilityPolicyHeaders
>;
export type BlobSetLegalHoldResponse = WithResponse<
  BlobSetLegalHoldResponseInternal,
  BlobSetLegalHoldHeaders
>;
export type BlobSetMetadataResponse = WithResponse<
  BlobSetMetadataResponseInternal,
  BlobSetMetadataHeaders
>;
export type BlobSetTagsResponse = WithResponse<BlobSetTagsResponseInternal, BlobSetTagsHeaders>;
export type BlobSetTierResponse = WithResponse<BlobSetTierResponseInternal, BlobSetTierHeaders>;
export type BlobStartCopyFromURLResponse = WithResponse<
  BlobStartCopyFromURLResponseInternal,
  BlobStartCopyFromURLHeaders
>;
export type BlobUndeleteResponse = WithResponse<BlobUndeleteResponseInternal, BlobUndeleteHeaders>;
export type BlockBlobCommitBlockListResponse = WithResponse<
  BlockBlobCommitBlockListResponseInternal,
  BlockBlobCommitBlockListHeaders
>;
export type BlockBlobGetBlockListResponse = WithResponse<
  BlockBlobGetBlockListResponseInternal,
  BlockBlobGetBlockListHeaders
>;
export type BlockBlobPutBlobFromUrlResponse = WithResponse<
  BlockBlobPutBlobFromUrlResponseInternal,
  BlockBlobPutBlobFromUrlHeaders
>;
export type BlockBlobStageBlockFromURLResponse = WithResponse<
  BlockBlobStageBlockFromURLResponseInternal,
  BlockBlobStageBlockFromURLHeaders
>;
export type BlockBlobStageBlockResponse = WithResponse<
  BlockBlobStageBlockResponseInternal,
  BlockBlobStageBlockHeaders
>;
export type BlockBlobUploadResponse = WithResponse<
  BlockBlobUploadResponseInternal,
  BlockBlobUploadHeaders
>;
export type ContainerCreateResponse = WithResponse<
  ContainerCreateResponseInternal,
  ContainerCreateHeaders
>;
export type ContainerDeleteResponse = WithResponse<
  ContainerDeleteResponseInternal,
  ContainerDeleteHeaders
>;

export type ContainerGetPropertiesResponse = WithResponse<
  ContainerGetPropertiesResponseInternal,
  ContainerGetPropertiesHeaders
>;
export type ContainerRenameResponse = WithResponse<
  ContainerRenameResponseInternal,
  ContainerRenameHeaders
>;
export type ContainerSetAccessPolicyResponse = WithResponse<
  ContainerSetAccessPolicyResponseInternal,
  ContainerSetAccessPolicyHeaders
>;
export type ContainerSetMetadataResponse = WithResponse<
  ContainerSetMetadataResponseInternal,
  ContainerSetMetadataHeaders
>;
export type ContainerUndeleteResponse = WithResponse<
  ContainerUndeleteResponseInternal,
  ContainerUndeleteHeaders
>;
export type PageBlobClearPagesResponse = WithResponse<
  PageBlobClearPagesResponseInternal,
  PageBlobClearPagesHeaders
>;
export type PageBlobCopyIncrementalResponse = WithResponse<
  PageBlobCopyIncrementalResponseInternal,
  PageBlobCopyIncrementalHeaders
>;
export type PageBlobCreateResponse = WithResponse<
  PageBlobCreateResponseInternal,
  PageBlobCreateHeaders
>;
export type PageBlobGetPageRangesDiffResponseModel = WithResponse<
  PageBlobGetPageRangesDiffResponseInternal,
  PageBlobGetPageRangesDiffHeaders,
  PageList
>;
export type PageBlobGetPageRangesResponseModel = WithResponse<
  PageBlobGetPageRangesResponseInternal,
  PageBlobGetPageRangesHeaders,
  PageList
>;
export type PageBlobResizeResponse = WithResponse<
  PageBlobResizeResponseInternal,
  PageBlobResizeHeaders
>;
export type PageBlobUpdateSequenceNumberResponse = WithResponse<
  PageBlobUpdateSequenceNumberResponseInternal,
  PageBlobUpdateSequenceNumberHeaders
>;
export type PageBlobUploadPagesFromURLResponse = WithResponse<
  PageBlobUploadPagesFromURLResponseInternal,
  PageBlobUploadPagesFromURLHeaders
>;
export type PageBlobUploadPagesResponse = WithResponse<
  PageBlobUploadPagesResponseInternal,
  PageBlobUploadPagesHeaders
>;
export type ServiceGetAccountInfoResponse = WithResponse<
  ServiceGetAccountInfoResponseInternal,
  ServiceGetAccountInfoHeaders
>;
export type ServiceGetPropertiesResponse = WithResponse<
  ServiceGetPropertiesResponseInternal,
  ServiceGetPropertiesHeaders
>;
export type ServiceGetStatisticsResponse = WithResponse<
  ServiceGetStatisticsResponseInternal,
  ServiceGetStatisticsHeaders
>;
export type ServiceListContainersSegmentResponse = WithResponse<
  ServiceListContainersSegmentResponseInternal,
  ServiceListContainersSegmentHeaders
>;
export type ServiceSetPropertiesResponse = WithResponse<
  ServiceSetPropertiesResponseInternal,
  ServiceSetPropertiesHeaders
>;
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
  BlobGetPropertiesResponseInternal,
  BlobGetTagsHeaders,
  BlobGetTagsResponseInternal,
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
  ServiceGetStatisticsHeaders,
  ServiceGetUserDelegationKeyHeaders,
  ServiceListContainersSegmentHeaders,
  ServiceSetPropertiesHeaders,
  ServiceSubmitBatchHeaders,
  SignedIdentifierModel,
  UserDelegationKeyModel,
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
  ContainerListBlobHierarchySegmentResponse as ContainerListBlobHierarchySegmentResponseModel,
  ContainerProperties,
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
  ListBlobsFlatSegmentResponse as ListBlobsFlatSegmentResponseInternal,
  ListBlobsHierarchySegmentResponse as ListBlobsHierarchySegmentResponseInternal,
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
