// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  FilePermissionFormat,
  ShareTokenIntent,
  FilePropertySemantics,
  NfsFileType,
  FileLastWrittenMode,
  PermissionCopyModeType,
  ModeCopyMode,
  OwnerCopyMode,
} from "../../models/azure/storage/files/shares/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FileCreateHardLinkOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** If specified, the lease ID must match the lease ID of the file. */
  leaseId?: string;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface FileGetSymbolicLinkOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** The snapshot parameter is an opaque DateTime value that, when present, specifies the share snapshot to query. */
  sharesnapshot?: string;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface FileCreateSymbolicLinkOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Optional. User-defined metadata for the resource. */
  metadata?: Record<string, string>;
  /** Creation time for the file. */
  fileCreationTime?: string;
  /** Last write time for the file. */
  fileLastWriteTime?: string;
  /** If specified, the lease ID must match the lease ID of the file. */
  leaseId?: string;
  /** Optional, NFS only. The owner of the file or directory. */
  owner?: string;
  /** Optional, NFS only. The owning group of the file or directory. */
  group?: string;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface FileRenameOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Boolean. Default value is false. Set to true to indicate that the destination should be overwritten. */
  replaceIfExists?: boolean;
  /** Boolean. Default value is false. Set to true to overwrite the destination even if it has the read-only attribute set. */
  ignoreReadOnly?: boolean;
  /** Required if the source file has an active lease. */
  sourceLeaseId?: string;
  /** Required if the destination file has an active lease. */
  destinationLeaseId?: string;
  /** If specified, the provided file attributes shall be set. */
  fileAttributes?: string;
  /** Creation time for the file. */
  fileCreationTime?: string;
  /** Last write time for the file. */
  fileLastWriteTime?: string;
  /** Change time for the file. */
  fileChangeTime?: string;
  /** If specified the permission shall be set for the file. */
  filePermission?: string;
  /** Optional. Used to set permission format. */
  filePermissionFormat?: FilePermissionFormat;
  /** Key of the permission to be set. */
  filePermissionKey?: string;
  /** Optional. User-defined metadata for the resource. */
  metadata?: Record<string, string>;
  /** Sets the MIME content type of the file. */
  fileContentType?: string;
  /** If true, the trailing dot will not be trimmed from the target file/directory path. */
  allowTrailingDot?: boolean;
  /** If true, the trailing dot will not be trimmed from the source URI. */
  allowSourceTrailingDot?: boolean;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface FileForceCloseHandlesOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** A string value that identifies the portion of the list to be returned with the next listing operation. */
  marker?: string;
  /** The snapshot parameter is an opaque DateTime value that, when present, specifies the share snapshot to query. */
  sharesnapshot?: string;
  /** If true, the trailing dot will not be trimmed from the target file/directory path. */
  allowTrailingDot?: boolean;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface FileListHandlesOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** A string value that identifies the portion of the list to be returned with the next listing operation. */
  marker?: string;
  /** Specifies the maximum number of items to return. */
  maxPageSize?: number;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** The snapshot parameter is an opaque DateTime value that, when present, specifies the share snapshot to query. */
  sharesnapshot?: string;
  /** If true, the trailing dot will not be trimmed from the target file/directory path. */
  allowTrailingDot?: boolean;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface FileAbortCopyOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** If specified, the lease ID must match the lease ID of the file. */
  leaseId?: string;
  /** If true, the trailing dot will not be trimmed from the target file/directory path. */
  allowTrailingDot?: boolean;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface FileStartCopyOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Optional. User-defined metadata for the resource. */
  metadata?: Record<string, string>;
  /** If specified the permission shall be set for the file. */
  filePermission?: string;
  /** Optional. Used to set permission format. */
  filePermissionFormat?: FilePermissionFormat;
  /** Key of the permission to be set. */
  filePermissionKey?: string;
  /** Specifies the option to copy file security descriptor from source file or to set it using the value which is defined by the header value of x-ms-file-permission or x-ms-file-permission-key. */
  filePermissionCopyMode?: PermissionCopyModeType;
  /** A boolean value that specifies whether the ReadOnly attribute on a preexisting destination file should be respected or overridden. */
  ignoreReadOnly?: boolean;
  /** If specified, the provided file attributes shall be set. */
  fileAttributes?: string;
  /** Creation time for the file. */
  fileCreationTime?: string;
  /** Last write time for the file. */
  fileLastWriteTime?: string;
  /** Change time for the file. */
  fileChangeTime?: string;
  /** Optional. Sets the archive attribute on the destination file. */
  setArchiveAttribute?: boolean;
  /** If specified, the lease ID must match the lease ID of the file. */
  leaseId?: string;
  /** If true, the trailing dot will not be trimmed from the target file/directory path. */
  allowTrailingDot?: boolean;
  /** If true, the trailing dot will not be trimmed from the source URI. */
  allowSourceTrailingDot?: boolean;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
  /** Optional, NFS only. The owner of the file or directory. */
  owner?: string;
  /** Optional, NFS only. The owning group of the file or directory. */
  group?: string;
  /** Optional, NFS only. The file mode of the file or directory. */
  fileMode?: string;
  /** Specifies mode copy option for the file. */
  fileModeCopyMode?: ModeCopyMode;
  /** Specifies owner copy option for the file. */
  fileOwnerCopyMode?: OwnerCopyMode;
}

/** Optional parameters. */
export interface FileGetRangeListOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The snapshot parameter is an opaque DateTime value that, when present, specifies the share snapshot to query. */
  sharesnapshot?: string;
  /** The previous snapshot parameter is an opaque DateTime value that specifies a previous file snapshot to compare against. */
  prevsharesnapshot?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Return file data only from the specified byte range. */
  range?: string;
  /** If specified, the lease ID must match the lease ID of the file. */
  leaseId?: string;
  /** If true, the trailing dot will not be trimmed from the target file/directory path. */
  allowTrailingDot?: boolean;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
  /** This header is allowed only when PrevShareSnapshot query parameter is set. Determines whether the changed ranges for a file that has been renamed or moved should be listed. */
  supportRename?: boolean;
}

/** Optional parameters. */
export interface FileUploadRangeFromUrlOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** Bytes of source data in the specified range. */
  sourceRange?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Specify the CRC64 hash of the source content. */
  sourceContentCrc64?: string;
  /** Specify the CRC64 hash value to check for source content integrity. */
  sourceIfMatchCrc64?: string;
  /** Specify the CRC64 hash value to check for source content mismatch. */
  sourceIfNoneMatchCrc64?: string;
  /** If specified, the lease ID must match the lease ID of the file. */
  leaseId?: string;
  /** Only Bearer type is supported. Credentials should be a valid OAuth access token to copy source. */
  copySourceAuthorization?: string;
  /** If the file last write time should be preserved or overwritten. */
  fileLastWriteTimeMode?: FileLastWrittenMode;
  /** If true, the trailing dot will not be trimmed from the target file/directory path. */
  allowTrailingDot?: boolean;
  /** If true, the trailing dot will not be trimmed from the source URI. */
  allowSourceTrailingDot?: boolean;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface FileUploadRangeOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** An MD5 hash of the content. This hash is used to verify the integrity of data during transport. */
  contentMd5?: string;
  /** If specified, the lease ID must match the lease ID of the file. */
  leaseId?: string;
  /** If the file last write time should be preserved or overwritten. */
  fileLastWrittenMode?: FileLastWrittenMode;
  /** If true, the trailing dot will not be trimmed from the target file/directory path. */
  allowTrailingDot?: boolean;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
  /** Optional. Used for structured put operations. */
  structuredBodyPut?: string;
  /** Optional. Used for structured put operations to specify content length. */
  structuredContentLength?: number;
  /** Initial data. */
  body?: Uint8Array;
}

/** Optional parameters. */
export interface FileBreakLeaseOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** If specified, the lease ID must match the lease ID of the file. */
  leaseId?: string;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
  /** If true, the trailing dot will not be trimmed from the target file/directory path. */
  allowTrailingDot?: boolean;
}

/** Optional parameters. */
export interface FileChangeLeaseOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Proposed lease ID, in a GUID string format. The File service returns 400 (Invalid request) if the proposed lease ID is not in the correct format. See Guid Constructor (String) for a list of valid GUID string formats. */
  proposedLeaseId?: string;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
  /** If true, the trailing dot will not be trimmed from the target file/directory path. */
  allowTrailingDot?: boolean;
}

/** Optional parameters. */
export interface FileReleaseLeaseOptionalParams extends OperationOptions {
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
export interface FileAcquireLeaseOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Specifies the duration of the lease, in seconds, or negative one (-1) for a lease that never expires. A non-infinite lease can be between 15 and 60 seconds. A lease duration cannot be changed using renew or change. */
  leaseDuration?: number;
  /** Proposed lease ID, in a GUID string format. The File service returns 400 (Invalid request) if the proposed lease ID is not in the correct format. See Guid Constructor (String) for a list of valid GUID string formats. */
  proposedLeaseId?: string;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
  /** If true, the trailing dot will not be trimmed from the target file/directory path. */
  allowTrailingDot?: boolean;
}

/** Optional parameters. */
export interface FileSetMetadataOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Optional. User-defined metadata for the resource. */
  metadata?: Record<string, string>;
  /** If specified, the lease ID must match the lease ID of the file. */
  leaseId?: string;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
  /** If true, the trailing dot will not be trimmed from the target file/directory path. */
  allowTrailingDot?: boolean;
}

/** Optional parameters. */
export interface FileSetHttpHeadersOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Specifies the number of bytes being transmitted. */
  fileContentLength?: number;
  /** Sets the MIME content type of the file. The default type is 'application/octet-stream'. */
  fileContentType?: string;
  /** Specifies which content encodings have been applied to the file. */
  fileContentEncoding?: string;
  /** Specifies the natural languages used by this resource. */
  fileContentLanguage?: string;
  /** Sets the file's cache control. The File service stores this value but does not use or modify it. */
  fileCacheControl?: string;
  /** An MD5 hash of the file content. This hash is used to verify the integrity of the file during transport. */
  fileContentMD5?: string;
  /** Sets the file's Content-Disposition header. */
  fileContentDisposition?: string;
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
  /** If specified, the lease ID must match the lease ID of the file. */
  leaseId?: string;
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
export interface FileDeleteOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** If specified, the lease ID must match the lease ID of the file. */
  leaseId?: string;
  /** If true, the trailing dot will not be trimmed from the target file/directory path. */
  allowTrailingDot?: boolean;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface FileGetPropertiesOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The snapshot parameter is an opaque DateTime value that, when present, specifies the share snapshot to query. */
  sharesnapshot?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** If specified, the lease ID must match the lease ID of the file. */
  leaseId?: string;
  /** If true, the trailing dot will not be trimmed from the target file/directory path. */
  allowTrailingDot?: boolean;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface FileDownloadOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Return file data only from the specified byte range. */
  range?: string;
  /** When this header is set to true and specified together with the Range header, the service returns the MD5 hash for the range, as long as the range is less than or equal to 4 MB in size. */
  rangeGetContentMD5?: boolean;
  /** If specified, the lease ID must match the lease ID of the file. */
  leaseId?: string;
  /** If true, the trailing dot will not be trimmed from the target file/directory path. */
  allowTrailingDot?: boolean;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
  /** Optional. Used for structured get operations. */
  structuredBodyGet?: string;
}

/** Optional parameters. */
export interface FileCreateOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Sets the MIME content type of the file. The default type is 'application/octet-stream'. */
  fileContentType?: string;
  /** Specifies which content encodings have been applied to the file. */
  fileContentEncoding?: string;
  /** Specifies the natural languages used by this resource. */
  fileContentLanguage?: string;
  /** Sets the file's cache control. The File service stores this value but does not use or modify it. */
  fileCacheControl?: string;
  /** An MD5 hash of the file content. This hash is used to verify the integrity of the file during transport. */
  fileContentMD5?: string;
  /** Sets the file's Content-Disposition header. */
  fileContentDisposition?: string;
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
  /** If specified, the lease ID must match the lease ID of the file. */
  leaseId?: string;
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
  /** Optional, NFS only. Type of the file or directory. */
  nfsFileType?: NfsFileType;
  /** An MD5 hash of the content. This hash is used to verify the integrity of the data during transport. */
  contentMd5?: string;
  /** SMB only. Default value is New. */
  filePropertySemantics?: FilePropertySemantics;
  /** Optional. Specifies the content length of the file. */
  optionalContentLength?: number;
  /** Initial data. */
  body?: Uint8Array;
}
