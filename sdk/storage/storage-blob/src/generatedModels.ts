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
  AppendBlobAppendBlockFromUrlResponseInternal,
  AppendBlobAppendBlockFromUrlHeaders
>;
/** Contains response data for the appendBlock operation. */
export type AppendBlobAppendBlockResponse = WithResponse<
  AppendBlobAppendBlockResponseInternal,
  AppendBlobAppendBlockHeaders
>;
/** Contains response data for the create operation. */
export type AppendBlobCreateResponse = WithResponse<
  AppendBlobCreateResponseInternal,
  AppendBlobCreateHeaders
>;
/** Contains response data for the abortCopyFromURL operation. */
export type BlobAbortCopyFromURLResponse = WithResponse<
  BlobAbortCopyFromURLResponseInternal,
  BlobAbortCopyFromURLHeaders
>;
/** Contains response data for the copyFromURL operation. */
export type BlobCopyFromURLResponse = WithResponse<
  BlobCopyFromURLResponseInternal,
  BlobCopyFromURLHeaders
>;
/** Contains response data for the createSnapshot operation. */
export type BlobCreateSnapshotResponse = WithResponse<
  BlobCreateSnapshotResponseInternal,
  BlobCreateSnapshotHeaders
>;
/** Contains response data for the delete operation. */
export type BlobDeleteResponse = WithResponse<BlobDeleteResponseInternal, BlobDeleteHeaders>;
/** Contains response data for the deleteImmutabilityPolicy operation. */
export type BlobDeleteImmutabilityPolicyResponse = WithResponse<
  BlobDeleteImmutabilityPolicyResponseInternal,
  BlobDeleteImmutabilityPolicyHeaders
>;
/** Contains response data for the download operation. */
export type BlobDownloadResponseModel = WithResponse<
  BlobDownloadResponseInternal,
  BlobDownloadHeaders
>;
/** Contains response data for the getProperties operation. */
export type BlobGetPropertiesResponseModel = WithResponse<
  BlobGetPropertiesResponseInternal,
  BlobGetPropertiesHeaders
>;
/** Contains response data for the query operation. */
export type BlobQueryResponseModel = WithResponse<BlobQueryResponseInternal, BlobQueryHeaders>;
/** Contains response data for the setHttpHeaders operation. */
export type BlobSetHTTPHeadersResponse = WithResponse<
  BlobSetHttpHeadersResponseInternal,
  BlobSetHttpHeadersHeaders
>;
/** Contains response data for the setImmutabilityPolicy operation. */
export type BlobSetImmutabilityPolicyResponse = WithResponse<
  BlobSetImmutabilityPolicyResponseInternal,
  BlobSetImmutabilityPolicyHeaders
>;
/** Contains response data for the setLegalHold operation. */
export type BlobSetLegalHoldResponse = WithResponse<
  BlobSetLegalHoldResponseInternal,
  BlobSetLegalHoldHeaders
>;
/** Contains response data for the setMetadata operation. */
export type BlobSetMetadataResponse = WithResponse<
  BlobSetMetadataResponseInternal,
  BlobSetMetadataHeaders
>;
/** Contains response data for the setTags operation. */
export type BlobSetTagsResponse = WithResponse<BlobSetTagsResponseInternal, BlobSetTagsHeaders>;
/** Contains response data for the setTier operation. */
export type BlobSetTierResponse = WithResponse<BlobSetTierResponseInternal, BlobSetTierHeaders>;
/** Contains response data for the startCopyFromURL operation. */
export type BlobStartCopyFromURLResponse = WithResponse<
  BlobStartCopyFromURLResponseInternal,
  BlobStartCopyFromURLHeaders
>;
/** Contains response data for the undelete operation. */
export type BlobUndeleteResponse = WithResponse<BlobUndeleteResponseInternal, BlobUndeleteHeaders>;
/** Contains response data for the commitBlockList operation. */
export type BlockBlobCommitBlockListResponse = WithResponse<
  BlockBlobCommitBlockListResponseInternal,
  BlockBlobCommitBlockListHeaders
>;
/** Contains response data for the getBlockList operation. */
export type BlockBlobGetBlockListResponse = WithResponse<
  BlockBlobGetBlockListResponseInternal,
  BlockBlobGetBlockListHeaders
>;
/** Contains response data for the putBlobFromUrl operation. */
export type BlockBlobPutBlobFromUrlResponse = WithResponse<
  BlockBlobPutBlobFromUrlResponseInternal,
  BlockBlobPutBlobFromUrlHeaders
>;
/** Contains response data for the stageBlockFromURL operation. */
export type BlockBlobStageBlockFromURLResponse = WithResponse<
  BlockBlobStageBlockFromURLResponseInternal,
  BlockBlobStageBlockFromURLHeaders
>;
/** Contains response data for the stageBlock operation. */
export type BlockBlobStageBlockResponse = WithResponse<
  BlockBlobStageBlockResponseInternal,
  BlockBlobStageBlockHeaders
>;
/** Contains response data for the upload operation. */
export type BlockBlobUploadResponse = WithResponse<
  BlockBlobUploadResponseInternal,
  BlockBlobUploadHeaders
>;
/** Contains response data for the create operation. */
export type ContainerCreateResponse = WithResponse<
  ContainerCreateResponseInternal,
  ContainerCreateHeaders
>;
/** Contains response data for the delete operation. */
export type ContainerDeleteResponse = WithResponse<
  ContainerDeleteResponseInternal,
  ContainerDeleteHeaders
>;
/** Contains response data for the getProperties operation. */
export type ContainerGetPropertiesResponse = WithResponse<
  ContainerGetPropertiesResponseInternal,
  ContainerGetPropertiesHeaders
>;
/** Contains response data for the rename operation. */
export type ContainerRenameResponse = WithResponse<
  ContainerRenameResponseInternal,
  ContainerRenameHeaders
>;
/** Contains response data for the setAccessPolicy operation. */
export type ContainerSetAccessPolicyResponse = WithResponse<
  ContainerSetAccessPolicyResponseInternal,
  ContainerSetAccessPolicyHeaders
>;
/** Contains response data for the setMetadata operation. */
export type ContainerSetMetadataResponse = WithResponse<
  ContainerSetMetadataResponseInternal,
  ContainerSetMetadataHeaders
>;
/** Contains response data for the restore operation. */
export type ContainerUndeleteResponse = WithResponse<
  ContainerUndeleteResponseInternal,
  ContainerUndeleteHeaders
>;
/** Contains response data for the clearPages operation. */
export type PageBlobClearPagesResponse = WithResponse<
  PageBlobClearPagesResponseInternal,
  PageBlobClearPagesHeaders
>;
/** Contains response data for the copyIncremental operation. */
export type PageBlobCopyIncrementalResponse = WithResponse<
  PageBlobCopyIncrementalResponseInternal,
  PageBlobCopyIncrementalHeaders
>;
/** Contains response data for the create operation. */
export type PageBlobCreateResponse = WithResponse<
  PageBlobCreateResponseInternal,
  PageBlobCreateHeaders
>;
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
export type PageBlobResizeResponse = WithResponse<
  PageBlobResizeResponseInternal,
  PageBlobResizeHeaders
>;
/** Contains response data for the updateSequenceNumber operation. */
export type PageBlobUpdateSequenceNumberResponse = WithResponse<
  PageBlobUpdateSequenceNumberResponseInternal,
  PageBlobUpdateSequenceNumberHeaders
>;
/** Contains response data for the uploadPagesFromURL operation. */
export type PageBlobUploadPagesFromURLResponse = WithResponse<
  PageBlobUploadPagesFromURLResponseInternal,
  PageBlobUploadPagesFromURLHeaders
>;
/** Contains response data for the uploadPages operation. */
export type PageBlobUploadPagesResponse = WithResponse<
  PageBlobUploadPagesResponseInternal,
  PageBlobUploadPagesHeaders
>;
/** Contains response data for the getAccountInfo operation. */
export type ServiceGetAccountInfoResponse = WithResponse<
  ServiceGetAccountInfoResponseInternal,
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
  ServiceSetPropertiesResponseInternal,
  ServiceSetPropertiesHeaders
>;
/** Contains response data for the submitBatch operation. */
export type ServiceSubmitBatchResponseModel = WithResponse<
  ServiceSubmitBatchResponseInternal,
  ServiceSubmitBatchHeaders
>;
export {
  AppendBlobAppendBlockFromUrlHeaders,
  AppendBlobAppendBlockFromUrlResponseInternal,
  AppendBlobAppendBlockHeaders,
  AppendBlobAppendBlockResponseInternal,
  AppendBlobCreateHeaders,
  AppendBlobCreateResponseInternal,
  BlobAbortCopyFromURLHeaders,
  BlobAbortCopyFromURLResponseInternal,
  BlobCopyFromURLHeaders,
  BlobCopyFromURLResponseInternal,
  BlobCreateSnapshotHeaders,
  BlobCreateSnapshotResponseInternal,
  BlobDeleteHeaders,
  BlobDeleteResponseInternal,
  BlobDeleteImmutabilityPolicyHeaders,
  BlobDeleteImmutabilityPolicyResponseInternal,
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
  BlobSetHttpHeadersResponseInternal as BlobSetHTTPHeadersResponseInternal,
  BlobSetImmutabilityPolicyHeaders,
  BlobSetImmutabilityPolicyResponseInternal,
  BlobSetLegalHoldHeaders,
  BlobSetLegalHoldResponseInternal,
  BlobSetMetadataHeaders,
  BlobSetMetadataResponseInternal,
  BlobSetTagsHeaders,
  BlobSetTagsResponseInternal,
  BlobSetTierHeaders,
  BlobSetTierResponseInternal,
  BlobStartCopyFromURLHeaders,
  BlobStartCopyFromURLResponseInternal,
  BlobUndeleteHeaders,
  BlobUndeleteResponseInternal,
  BlockBlobCommitBlockListHeaders,
  BlockBlobCommitBlockListResponseInternal,
  BlockBlobGetBlockListHeaders,
  BlockBlobGetBlockListResponseInternal,
  BlockBlobPutBlobFromUrlHeaders,
  BlockBlobPutBlobFromUrlResponseInternal,
  BlockBlobStageBlockFromURLHeaders,
  BlockBlobStageBlockFromURLResponseInternal,
  BlockBlobStageBlockHeaders,
  BlockBlobStageBlockResponseInternal,
  BlockBlobUploadHeaders,
  BlockBlobUploadResponseInternal,
  ContainerCreateHeaders,
  ContainerCreateResponseInternal,
  ContainerDeleteHeaders,
  ContainerDeleteResponseInternal,
  ContainerGetAccessPolicyHeaders,
  ContainerGetPropertiesHeaders,
  ContainerGetPropertiesResponseInternal,
  ContainerListBlobFlatSegmentHeaders,
  ContainerListBlobHierarchySegmentHeaders,
  ContainerRenameHeaders,
  ContainerRenameResponseInternal,
  ContainerSetAccessPolicyHeaders,
  ContainerSetAccessPolicyResponseInternal,
  ContainerSetMetadataHeaders,
  ContainerSetMetadataResponseInternal,
  ContainerUndeleteHeaders,
  ContainerUndeleteResponseInternal,
  PageBlobClearPagesHeaders,
  PageBlobClearPagesResponseInternal,
  PageBlobCopyIncrementalHeaders,
  PageBlobCopyIncrementalResponseInternal,
  PageBlobCreateHeaders,
  PageBlobCreateResponseInternal,
  PageBlobGetPageRangesDiffHeaders,
  PageBlobGetPageRangesDiffResponseInternal,
  PageBlobGetPageRangesHeaders,
  PageBlobGetPageRangesResponseInternal,
  PageBlobResizeHeaders,
  PageBlobResizeResponseInternal,
  PageBlobUpdateSequenceNumberHeaders,
  PageBlobUpdateSequenceNumberResponseInternal,
  PageBlobUploadPagesFromURLHeaders,
  PageBlobUploadPagesFromURLResponseInternal,
  PageBlobUploadPagesHeaders,
  PageBlobUploadPagesResponseInternal,
  PageList as PageListInternal,
  ServiceGetAccountInfoHeaders,
  ServiceGetAccountInfoResponseInternal,
  ServiceGetPropertiesHeaders,
  ServiceGetPropertiesResponseInternal,
  ServiceGetStatisticsHeaders,
  ServiceGetStatisticsResponseInternal,
  ServiceGetUserDelegationKeyHeaders,
  ServiceListContainersSegmentHeaders,
  ServiceListContainersSegmentResponseInternal,
  ServiceSetPropertiesHeaders,
  ServiceSetPropertiesResponseInternal,
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
  ContainerListBlobHierarchySegmentResponse as ContainerListBlobHierarchySegmentResponseModel,
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
  BlobFlatListSegment as BlobFlatListSegmentInternal,
  BlobHierarchyListSegment as BlobHierarchyListSegmentInternal,
  BlobItemInternal as BlobItemInternalModel,
  BlobPrefix as BlobPrefixInternal,
  BlobName as BlobNameInternal,
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
