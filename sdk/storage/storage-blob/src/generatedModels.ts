// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
  PageBlobGetPageRangesResponse,
  PageBlobGetPageRangesDiffHeaders,
  PageBlobGetPageRangesDiffResponse,
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
  ContainerRenameHeaders
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
