// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DirectoryCreateHeaders,
  DirectoryDeleteHeaders,
  DirectoryGetPropertiesHeaders,
  DirectoryListFilesAndDirectoriesSegmentHeaders,
  DirectoryListHandlesHeaders,
  DirectoryRenameHeaders,
  DirectorySetMetadataHeaders,
  DirectorySetPropertiesHeaders,
  FileAbortCopyHeaders,
  FileCreateHeaders,
  FileDeleteHeaders,
  FileDownloadHeaders,
  FileDownloadResponse,
  FileGetPropertiesHeaders,
  FileGetRangeListHeaders,
  FileListHandlesHeaders,
  FileProperty,
  FileRenameHeaders,
  FileServiceProperties,
  FileSetHttpHeadersHeaders,
  FileSetMetadataHeaders,
  FileStartCopyHeaders,
  FileUploadRangeFromURLHeaders,
  FileUploadRangeHeaders,
  ServiceGetPropertiesHeaders,
  ServiceSetPropertiesHeaders,
  ShareCreateHeaders,
  ShareCreatePermissionHeaders,
  ShareCreateSnapshotHeaders,
  ShareDeleteHeaders,
  ShareFileRangeList,
  ShareGetAccessPolicyHeaders,
  ShareGetPermissionHeaders,
  ShareGetPropertiesHeaders,
  ShareGetStatisticsHeaders,
  SharePermission,
  ShareSetAccessPolicyHeaders,
  ShareSetMetadataHeaders,
  ShareStats,
} from "./generated/src/models";

/** Contains response data for the create operation. */
export type DirectoryCreateResponse = WithResponse<DirectoryCreateHeaders, DirectoryCreateHeaders>;

/** Contains response data for the delete operation. */
export type DirectoryDeleteResponse = WithResponse<DirectoryDeleteHeaders, DirectoryDeleteHeaders>;

/** Contains response data for the getProperties operation. */
export type DirectoryGetPropertiesResponse = WithResponse<
  DirectoryGetPropertiesHeaders,
  DirectoryGetPropertiesHeaders
>;

/** Contains response data for the listFilesAndDirectoriesSegment operation. */
export type DirectoryListFilesAndDirectoriesSegmentResponse = WithResponse<
  DirectoryListFilesAndDirectoriesSegmentHeaders & ListFilesAndDirectoriesSegmentResponse,
  DirectoryListFilesAndDirectoriesSegmentHeaders,
  ListFilesAndDirectoriesSegmentResponse
>;

/** Contains response data for the listHandles operation. */
export type DirectoryListHandlesResponse = WithResponse<
  DirectoryListHandlesHeaders & ListHandlesResponse,
  DirectoryListHandlesHeaders,
  ListHandlesResponse
>;

/** Contains response data for the setMetadata operation. */
export type DirectorySetMetadataResponse = WithResponse<
  DirectorySetMetadataHeaders,
  DirectorySetMetadataHeaders
>;

/** Contains response data for the setProperties operation. */
export type DirectorySetPropertiesResponse = WithResponse<
  DirectorySetPropertiesHeaders,
  DirectorySetPropertiesHeaders
>;

/** Contains response data for the abortCopy operation. */
export type FileAbortCopyResponse = WithResponse<FileAbortCopyHeaders, FileAbortCopyHeaders>;

/** Contains response data for the create operation. */
export type FileCreateResponse = WithResponse<FileCreateHeaders, FileCreateHeaders>;

/** Contains response data for the delete operation. */
export type FileDeleteResponse = WithResponse<FileDeleteHeaders, FileDeleteHeaders>;

/** Contains response data for the getProperties operation. */
export type FileGetPropertiesResponse = WithResponse<
  FileGetPropertiesHeaders,
  FileGetPropertiesHeaders
>;

/** Contains response data for the listHandles operation. */
export type FileListHandlesResponse = WithResponse<
  FileListHandlesHeaders & ListHandlesResponse,
  FileListHandlesHeaders,
  ListHandlesResponse
>;

/** Contains response data for the setMetadata operation. */
export type FileSetMetadataResponse = WithResponse<FileSetMetadataHeaders, FileSetMetadataHeaders>;

/** Contains response data for the startCopy operation. */
export type FileStartCopyResponse = WithResponse<FileStartCopyHeaders, FileStartCopyHeaders>;

/** Contains response data for the uploadRange operation. */
export type FileUploadRangeResponse = WithResponse<FileUploadRangeHeaders, FileUploadRangeHeaders>;

/** Contains response data for the getProperties operation. */
export type ServiceGetPropertiesResponse = WithResponse<
  ServiceGetPropertiesHeaders & FileServiceProperties,
  ServiceGetPropertiesHeaders,
  FileServiceProperties
>;

/** Contains response data for the setProperties operation. */
export type ServiceSetPropertiesResponse = WithResponse<
  ServiceSetPropertiesHeaders,
  ServiceSetPropertiesHeaders
>;

/** Contains response data for the createPermission operation. */
export type ShareCreatePermissionResponse = WithResponse<
  ShareCreatePermissionHeaders,
  ShareCreatePermissionHeaders
>;

/** Contains response data for the create operation. */
export type ShareCreateResponse = WithResponse<ShareCreateHeaders, ShareCreateHeaders>;

/** Contains response data for the createSnapshot operation. */
export type ShareCreateSnapshotResponse = WithResponse<
  ShareCreateSnapshotHeaders,
  ShareCreateSnapshotHeaders
>;

/** Contains response data for the delete operation. */
export type ShareDeleteResponse = WithResponse<ShareDeleteHeaders, ShareDeleteHeaders>;

/** Contains response data for the getPermission operation. */
export type ShareGetPermissionResponse = WithResponse<
  ShareGetPermissionHeaders & SharePermission,
  ShareGetPermissionHeaders,
  SharePermission
>;

/** Contains response data for the setAccessPolicy operation. */
export type ShareSetAccessPolicyResponse = WithResponse<
  ShareSetAccessPolicyHeaders,
  ShareGetAccessPolicyHeaders
>;

/** Contains response data for the setMetadata operation. */
export type ShareSetMetadataResponse = WithResponse<
  ShareSetMetadataHeaders,
  ShareSetMetadataHeaders
>;

/** Contains response data for the setProperties operation. */
export type ShareSetPropertiesResponse = WithResponse<
  ShareSetPropertiesHeaders,
  ShareSetPropertiesHeaders
>;

/** Contains response data for the rename operation. */
export type DirectoryRenameResponse = WithResponse<DirectoryRenameHeaders, DirectoryRenameHeaders>;

/** Contains response data for the download operation. */
export type FileDownloadResponseModel = WithResponse<FileDownloadResponse, FileDownloadHeaders>;

/** Contains response data for the uploadRangeFromURL operation. */
export type FileUploadRangeFromURLResponse = WithResponse<
  FileUploadRangeFromURLHeaders,
  FileUploadRangeFromURLHeaders
>;

/** Contains response data for the getProperties operation. */
export type ShareGetPropertiesResponseModel = WithResponse<
  ShareGetPropertiesHeaders,
  ShareGetPropertiesHeaders
>;

/** Contains response data for the getStatistics operation. */
export type ShareGetStatisticsResponseModel = WithResponse<
  ShareGetStatisticsHeaders & ShareStats,
  ShareGetStatisticsHeaders,
  ShareStats
>;

/** Contains response data for the getRangeList operation. */
export type FileGetRangeListDiffResponse = WithResponse<
  FileGetRangeListHeaders & ShareFileRangeList,
  FileGetRangeListHeaders,
  ShareFileRangeList
>;

/** Contains response data for the setHttpHeaders operation. */
export type FileSetHTTPHeadersResponse = WithResponse<
  FileSetHttpHeadersHeaders,
  FileSetHttpHeadersHeaders
>;

/** Contains response data for the rename operation. */
export type FileRenameResponse = WithResponse<FileRenameHeaders, FileRenameHeaders>;

// explicitly exporting types that we need.

export {
  CopyStatusType,
  DeleteSnapshotsOptionType,
  FileDownloadHeaders,
  FileDownloadOptionalParams,
  FileGetRangeListHeaders,
  FileLastWrittenMode,
  FileServiceProperties,
  FileUploadRangeFromURLOptionalParams,
  PermissionCopyModeType,
  ListSharesIncludeType,
  FileRange as RangeModel,
  ShareGetAccessPolicyHeaders,
  ShareItemInternal,
  SignedIdentifier as SignedIdentifierModel,
  SourceModifiedAccessConditions,
  FileForceCloseHandlesHeaders,
  DirectoryForceCloseHandlesHeaders,
  DirectoryCreateHeaders,
  DirectoryDeleteHeaders,
  DirectoryGetPropertiesHeaders,
  DirectoryListFilesAndDirectoriesSegmentHeaders,
  DirectoryRenameHeaders,
  DirectoryListHandlesHeaders,
  DirectorySetMetadataHeaders,
  DirectorySetPropertiesHeaders,
  FileAbortCopyHeaders,
  FileCreateHeaders,
  FileDeleteHeaders,
  FileGetPropertiesHeaders,
  FileProperty,
  FileListHandlesHeaders,
  FileRenameHeaders,
  CorsRule,
  Metrics,
  FileSetHttpHeadersHeaders as FileSetHTTPHeadersHeaders,
  FileSetMetadataHeaders,
  FileStartCopyHeaders,
  FileUploadRangeFromURLHeaders,
  FileUploadRangeHeaders,
  ServiceGetPropertiesHeaders,
  ListSharesResponse as ListSharesResponseModel,
  RetentionPolicy,
  ServiceListSharesSegmentHeaders,
  ServiceSetPropertiesHeaders,
  ShareCreatePermissionHeaders,
  ShareCreateHeaders,
  ShareCreateSnapshotHeaders,
  ShareDeleteHeaders,
  SharePermission,
  ShareGetPermissionHeaders,
  ShareGetPropertiesHeaders,
  ShareStats,
  ShareGetStatisticsHeaders,
  SharePropertiesInternal,
  ShareSetAccessPolicyHeaders,
  ShareSetMetadataHeaders,
  ShareSetPropertiesHeaders,
  ShareTokenIntent,
  AccessPolicy,
  LeaseAccessConditions,
  LeaseDurationType,
  LeaseStateType,
  LeaseStatusType,
  CopyFileSmbInfo,
  ShareProtocolSettings,
  ShareSmbSettings,
  SmbMultichannel,
  ShareFileRangeList,
  ClearRange,
  ShareAccessTier,
  ShareRootSquash,
  FileDownloadResponse as RawFileDownloadResponse,
} from "./generated/src/models";

import { ShareSetPropertiesHeaders } from "./generated/src/models";
import { WithResponse } from "./utils/utils.common";

/** Known values of {@link ShareTokenIntent} that the service accepts. */
export enum KnownShareTokenIntent {
  Backup = "backup",
}

/**
 * Contains response data for the setQuota operation.
 */
export type ShareSetQuotaResponse = WithResponse<ShareSetQuotaHeaders, ShareSetQuotaHeaders>;

/**
 * Defines headers for setQuota operation.
 */
export type ShareSetQuotaHeaders = ShareSetPropertiesHeaders;

/** A listed file item. */
export interface FileItem {
  name: string;
  fileId?: string;
  /** File properties. */
  properties: FileProperty;
  attributes?: string;
  permissionKey?: string;
}

/** A listed directory item. */
export interface DirectoryItem {
  name: string;
  fileId?: string;
  /** File properties. */
  properties?: FileProperty;
  attributes?: string;
  permissionKey?: string;
}

/** Abstract for entries that can be listed from Directory. */
export interface FilesAndDirectoriesListSegment {
  directoryItems: DirectoryItem[];
  fileItems: FileItem[];
}

/** An enumeration of directories and files. */
export interface ListFilesAndDirectoriesSegmentResponse {
  serviceEndpoint: string;
  shareName: string;
  shareSnapshot?: string;
  directoryPath: string;
  prefix: string;
  marker?: string;
  maxResults?: number;
  /** Abstract for entries that can be listed from Directory. */
  segment: FilesAndDirectoriesListSegment;
  continuationToken: string;
  directoryId?: string;
}

/** Defines values for AccessRight. */
export type ShareFileHandleAccessRights = "Read" | "Write" | "Delete";

/** A listed Azure Storage handle item. */
export interface HandleItem {
  /** XSMB service handle ID */
  handleId: string;
  /** File or directory name including full path starting from share root */
  path: string;
  /** FileId uniquely identifies the file or directory. */
  fileId: string;
  /** ParentId uniquely identifies the parent directory of the object. */
  parentId?: string;
  /** SMB session ID in context of which the file handle was opened */
  sessionId: string;
  /** Client IP that opened the handle */
  clientIp: string;
  /** Name of the client machine where the share is being mounted */
  clientName: string;
  /** Time when the session that previously opened the handle has last been reconnected. (UTC) */
  openTime: Date;
  /** Time handle was last connected to (UTC) */
  lastReconnectTime?: Date;
  accessRightList?: ShareFileHandleAccessRights[];
}

/** An enumeration of handles. */
export interface ListHandlesResponse {
  handleList?: HandleItem[];
  continuationToken: string;
}
