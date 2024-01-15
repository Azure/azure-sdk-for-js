// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// explicitly exporting types that we need.
import * as coreHttp from "@azure/core-http";

export {
  CopyStatusType,
  DeleteSnapshotsOptionType,
  DirectoryCreateResponse,
  DirectoryDeleteResponse,
  DirectoryGetPropertiesResponse,
  DirectorySetMetadataResponse,
  DirectorySetPropertiesResponse,
  FileAbortCopyResponse,
  FileCreateResponse,
  FileDeleteResponse,
  FileDownloadHeaders,
  FileDownloadOptionalParams,
  FileDownloadResponse as FileDownloadResponseModel,
  FileGetPropertiesResponse,
  FileGetRangeListHeaders,
  FileLastWrittenMode,
  FileServiceProperties,
  FileSetMetadataResponse,
  FileStartCopyResponse,
  FileUploadRangeFromURLOptionalParams,
  FileUploadRangeFromURLResponse,
  FileUploadRangeResponse,
  PermissionCopyModeType,
  ListSharesIncludeType,
  FileRange as RangeModel,
  ServiceGetPropertiesResponse,
  ServiceSetPropertiesResponse,
  ShareCreatePermissionResponse,
  ShareCreateResponse,
  ShareCreateSnapshotResponse,
  ShareDeleteResponse,
  ShareTokenIntent,
  ShareGetAccessPolicyHeaders,
  ShareGetPermissionResponse,
  ShareGetPropertiesResponse as ShareGetPropertiesResponseModel,
  ShareGetStatisticsResponse as ShareGetStatisticsResponseModel,
  ShareItemInternal,
  ShareSetAccessPolicyResponse,
  ShareSetMetadataResponse,
  ShareSetPropertiesResponse,
  SignedIdentifier as SignedIdentifierModel,
  SourceModifiedAccessConditions,
  FileForceCloseHandlesHeaders,
  DirectoryForceCloseHandlesHeaders,
  DirectoryCreateHeaders,
  DirectoryDeleteHeaders,
  DirectoryGetPropertiesHeaders,
  DirectoryListFilesAndDirectoriesSegmentHeaders,
  DirectoryRenameHeaders,
  DirectoryRenameResponse,
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
  FileSetHttpHeadersResponse as FileSetHTTPHeadersResponse,
  FileSetMetadataHeaders,
  FileStartCopyHeaders,
  FileRenameResponse,
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
  AccessPolicy,
  LeaseAccessConditions,
  LeaseDurationType,
  LeaseStateType,
  LeaseStatusType,
  CopyFileSmbInfo,
  ShareProtocolSettings,
  ShareSmbSettings,
  SmbMultichannel,
  FileGetRangeListResponse as FileGetRangeListDiffResponse,
  ShareFileRangeList,
  ClearRange,
  ShareAccessTier,
  ShareRootSquash,
} from "./generated/src/models";

import {
  ShareSetPropertiesResponse,
  ShareSetPropertiesHeaders,
  FileProperty,
  DirectoryListFilesAndDirectoriesSegmentHeaders,
  FileListHandlesHeaders,
  DirectoryListHandlesHeaders,
} from "./generated/src/models";

/** Known values of {@link ShareTokenIntent} that the service accepts. */
export enum KnownShareTokenIntent {
  Backup = "backup",
}

/**
 * Contains response data for the setQuota operation.
 */
export type ShareSetQuotaResponse = ShareSetPropertiesResponse;

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

/** Contains response data for the listFilesAndDirectoriesSegment operation. */
export type DirectoryListFilesAndDirectoriesSegmentResponse =
  DirectoryListFilesAndDirectoriesSegmentHeaders &
    ListFilesAndDirectoriesSegmentResponse & {
      /** The underlying HTTP response. */
      _response: coreHttp.HttpResponse & {
        /** The response body as text (string format) */
        bodyAsText: string;

        /** The response body as parsed JSON or XML */
        parsedBody: ListFilesAndDirectoriesSegmentResponse;
        /** The parsed HTTP response headers. */
        parsedHeaders: DirectoryListFilesAndDirectoriesSegmentHeaders;
      };
    };

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

/** Contains response data for the listHandles operation. */
export type FileListHandlesResponse = FileListHandlesHeaders &
  ListHandlesResponse & {
    /** The underlying HTTP response. */
    _response: coreHttp.HttpResponse & {
      /** The response body as text (string format) */
      bodyAsText: string;

      /** The response body as parsed JSON or XML */
      parsedBody: ListHandlesResponse;
      /** The parsed HTTP response headers. */
      parsedHeaders: FileListHandlesHeaders;
    };
  };

/** Contains response data for the listHandles operation. */
export type DirectoryListHandlesResponse = DirectoryListHandlesHeaders &
  ListHandlesResponse & {
    /** The underlying HTTP response. */
    _response: coreHttp.HttpResponse & {
      /** The response body as text (string format) */
      bodyAsText: string;

      /** The response body as parsed JSON or XML */
      parsedBody: ListHandlesResponse;
      /** The parsed HTTP response headers. */
      parsedHeaders: DirectoryListHandlesHeaders;
    };
  };
