// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  FilePermissionFormat,
  ShareTokenIntent,
  FilePropertySemantics,
  ListFilesIncludeType,
} from "../../models/azure/storage/files/shares/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DirectoryRenameOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Boolean. Default value is false. Set to true to indicate that the destination should be overwritten. */
  renameReplaceIfExists?: boolean;
  /** Boolean. Default value is false. Set to true to overwrite the destination even if it has the read-only attribute set. */
  renameIgnoreReadOnly?: boolean;
  /** Required if the source file has an active lease. */
  sourceLeaseId?: string;
  /** Required if the destination has an active lease. */
  destinationLeaseId?: string;
  /** If specified, the provided file attributes shall be set. */
  fileAttributes?: string;
  /** Creation time for the directory. */
  fileCreationTime?: string;
  /** Last write time for the directory. */
  fileLastWriteTime?: string;
  /** Change time for the directory. */
  fileChangeTime?: string;
  /** If specified the permission shall be set for the directory. */
  filePermission?: string;
  /** Optional. Used to set permission format. */
  filePermissionFormat?: FilePermissionFormat;
  /** Key of the permission to be set. */
  filePermissionKey?: string;
  /** Optional. User-defined metadata for the resource. */
  metadata?: Record<string, string>;
  /** If true, the trailing dot will not be trimmed from the target file/directory path. */
  allowTrailingDot?: boolean;
  /** If true, the trailing dot will not be trimmed from the source URI. */
  sourceAllowTrailingDot?: boolean;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface DirectoryForceCloseHandlesOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** A string value that identifies the portion of the list to be returned with the next listing operation. */
  marker?: string;
  /** The snapshot parameter is an opaque DateTime value that specifies a share snapshot. */
  shareSnapshot?: string;
  /** Specifies operation should apply to the directory specified in the URI, its files, its subdirectories and their files. */
  recursive?: boolean;
  /** If true, the trailing dot will not be trimmed from the target file/directory path. */
  allowTrailingDot?: boolean;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface DirectoryListHandlesOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** A string value that identifies the portion of the list to be returned with the next listing operation. */
  marker?: string;
  /** Specifies the maximum number of items to return. */
  maxPageSize?: number;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** The snapshot parameter is an opaque DateTime value that specifies a share snapshot. */
  shareSnapshot?: string;
  /** Specifies operation should apply to the directory specified in the URI, its files, its subdirectories and their files. */
  recursive?: boolean;
  /** If true, the trailing dot will not be trimmed from the target file/directory path. */
  allowTrailingDot?: boolean;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface DirectoryListFilesAndDirectoriesSegmentOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** Filters the results to return only items whose name begins with the specified prefix. */
  prefix?: string;
  /** The snapshot parameter is an opaque DateTime value that specifies a share snapshot. */
  shareSnapshot?: string;
  /** A string value that identifies the portion of the list to be returned with the next listing operation. */
  marker?: string;
  /** Specifies the maximum number of items to return. */
  maxPageSize?: number;
  /** Include this parameter to specify one or more datasets to include in the response. */
  include?: ListFilesIncludeType[];
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Include extended information. */
  fileExtendedInfo?: boolean;
  /** If true, the trailing dot will not be trimmed from the target file/directory path. */
  allowTrailingDot?: boolean;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface DirectorySetMetadataOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Optional. User-defined metadata for the resource. */
  metadata?: Record<string, string>;
  /** If true, the trailing dot will not be trimmed from the target file/directory path. */
  allowTrailingDot?: boolean;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface DirectorySetPropertiesOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** If specified the permission (security descriptor) shall be set for the directory/file. This header can be used if Permission size is <= 8KB, else x-ms-file-permission-key header shall be used. Default value: Inherit. If SDDL is specified as input, it must have owner, group and dacl. Note: Only one of the x-ms-file-permission or x-ms-file-permission-key should be specified. */
  filePermission?: string;
  /** Key of the permission to be set for the directory/file. Note: Only one of the x-ms-file-permission or x-ms-file-permission-key should be specified. */
  filePermissionKey?: string;
  /** If specified, the provided file attributes shall be set. Default value: 'Archive' for file and 'Directory' for directory. 'None' can also be specified as default. */
  fileAttributes?: string;
  /** Creation time for the file/directory. Default value: Now. */
  fileCreatedOn?: string;
  /** Last write time for the file/directory. Default value: Now. */
  fileLastWriteOn?: string;
  /** Change time for the file/directory. Default value: Now. */
  fileChangeOn?: string;
  /** Optional. Used to set permission format. */
  filePermissionFormat?: FilePermissionFormat;
  /** If true, the trailing dot will not be trimmed from the target file/directory path. */
  allowTrailingDot?: boolean;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
  /** Optional, NFS only. The owner of the file or directory. */
  owner?: string;
  /** Optional, NFS only. The owning group of the file or directory. */
  group?: string;
  /** Optional, NFS only. The file mode of the file or directory. */
  fileMode?: string;
}

/** Optional parameters. */
export interface DirectoryDeleteOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
  /** If true, the trailing dot will not be trimmed from the target file/directory path. */
  allowTrailingDot?: boolean;
}

/** Optional parameters. */
export interface DirectoryGetPropertiesOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The snapshot parameter is an opaque DateTime value that specifies a share snapshot. */
  shareSnapshot?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
  /** If true, the trailing dot will not be trimmed from the target file/directory path. */
  allowTrailingDot?: boolean;
}

/** Optional parameters. */
export interface DirectoryCreateOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Optional. User-defined metadata for the resource. */
  metadata?: Record<string, string>;
  /** If specified the permission (security descriptor) shall be set for the directory/file. This header can be used if Permission size is <= 8KB, else x-ms-file-permission-key header shall be used. Default value: Inherit. If SDDL is specified as input, it must have owner, group and dacl. Note: Only one of the x-ms-file-permission or x-ms-file-permission-key should be specified. */
  filePermission?: string;
  /** Key of the permission to be set for the directory/file. Note: Only one of the x-ms-file-permission or x-ms-file-permission-key should be specified. */
  filePermissionKey?: string;
  /** If specified, the provided file attributes shall be set. Default value: 'Archive' for file and 'Directory' for directory. 'None' can also be specified as default. */
  fileAttributes?: string;
  /** Creation time for the file/directory. Default value: Now. */
  fileCreatedOn?: string;
  /** Last write time for the file/directory. Default value: Now. */
  fileLastWriteOn?: string;
  /** Change time for the file/directory. Default value: Now. */
  fileChangeOn?: string;
  /** Optional. Used to set permission format. */
  filePermissionFormat?: FilePermissionFormat;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
  /** Optional, NFS only. The owner of the file or directory. */
  owner?: string;
  /** Optional, NFS only. The owning group of the file or directory. */
  group?: string;
  /** Optional, NFS only. The file mode of the file or directory. */
  fileMode?: string;
  /** SMB only. Default value is New. */
  filePropertySemantics?: FilePropertySemantics;
  /** If true, the trailing dot will not be trimmed from the target file/directory path. */
  allowTrailingDot?: boolean;
}
