// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { FileSystemAttributes } from "./FileSystemAttributes";
import { truncatedISO8061Date } from "./utils/utils.common";
import { logger } from "./log";
import { ShareTokenIntent } from "./generatedModels";
import { StoragePipelineOptions } from "./Pipeline";

export interface Metadata {
  [propertyName: string]: string;
}

export interface FileHttpHeaders {
  /**
   * Optional. Sets the file's cache
   * control. If specified, this property is stored with the file and returned
   * with a read request.
   */
  fileCacheControl?: string;
  /**
   * Optional. Sets the file's content type.
   * If specified, this property is stored with the file and returned with a
   * read request.
   */
  fileContentType?: string;
  /**
   * Optional. An MD5 hash of the file
   * content. Note that this hash is not validated, as the hashes for the
   * individual blocks were validated when each was uploaded.
   */
  fileContentMD5?: Uint8Array;
  /**
   * Optional. Sets the file's content
   * encoding. If specified, this property is stored with the file and returned
   * with a read request.
   */
  fileContentEncoding?: string;
  /**
   * Optional. Set the file's content
   * language. If specified, this property is stored with the file and returned
   * with a read request.
   */
  fileContentLanguage?: string;
  /**
   * Optional. Sets the file's
   * Content-Disposition header.
   */
  fileContentDisposition?: string;
}

/**
 * Indicates inherit file permission from the parent directory.
 */
export type FilePermissionInheritType = "inherit";

/**
 * Indicates keep existing file permission value unchanged.
 */
export type FilePermissionPreserveType = "preserve";

/**
 * Indicates setting as the time of the request.
 */
export type TimeNowType = "now";

/**
 * Indicates keep existing time value unchanged.
 */
export type TimePreserveType = "preserve";

/**
 * Indicates keep existing file attributes unchanged.
 */
export type FileAttributesPreserveType = "preserve";

export interface FileAndDirectoryCreateCommonOptions {
  /**
   * The permission(security descriptor) to be set for the file or directory in the
   * Security Descriptor Definition Language (SDDL). If specified, it must have an owner, group, and discretionary access control list (DACL).
   * A value of inherit may be passed to inherit from the parent directory.
   *
   * Note that only one of filePermission or filePermissionKey can be specified.
   * And if both are not specified, inherit will be set to filePermission as default value by client library.
   */
  filePermission?: string | FilePermissionInheritType;

  /**
   * The key of the permission to be set for the file or directory. This can be created using the Create-Permission API.
   *
   * Note that only one of filePermission or filePermissionKey can be specified.
   */
  filePermissionKey?: string;

  /**
   * The file system attributes to be set on the file or directory.
   */
  fileAttributes?: FileSystemAttributes;

  /**
   * The Coordinated Universal Time (UTC) creation time property for the directory.
   * A value of now may be used to indicate the time of the request.
   * By default, the value will be set as now.
   */
  creationTime?: Date | TimeNowType;

  /**
   * The Coordinated Universal Time (UTC) last write property for the directory.
   * A value of now may be used to indicate the time of the request.
   * By default, the value will be set as now.
   */
  lastWriteTime?: Date | TimeNowType;

  /**
   * The Coordinated Universal Time (UTC) change time property for the directory.
   * A value of now may be used to indicate the time of the request.
   * By default, the value will be set to the time of the request.
   */
  changeTime?: Date | TimeNowType;
}

export interface FileAndDirectorySetPropertiesCommonOptions {
  /**
   * The permission(security descriptor) to be set for the file or directory in the
   * Security Descriptor Definition Language (SDDL). If specified, it must have an owner, group, and discretionary access control list (DACL).
   * A value of inherit may be passed to inherit from the parent directory.
   * A value of preserve may be passed to keep the value unchanged.
   *
   * Note that only one of filePermission or filePermissionKey can be specified.
   * And if both are not specified, preserve will be set to filePermission as default value by client library.
   */
  filePermission?: string | FilePermissionInheritType | FilePermissionPreserveType;

  /**
   * The key of the permission to be set for the file or directory. This can be created using the Create-Permission API.
   *
   * Note that only one of filePermission or filePermissionKey can be specified.
   */
  filePermissionKey?: string;

  /**
   * The file system attributes to be set on the file or directory.
   */
  fileAttributes?: FileSystemAttributes | FileAttributesPreserveType;

  /**
   * The Coordinated Universal Time (UTC) creation time property for the directory.
   * A value of now may be used to indicate the time of the request.
   * A value of preserve may be passed to keep an existing value unchanged.
   * By default, the value will be set as preserve.
   */
  creationTime?: Date | TimeNowType | TimePreserveType;

  /**
   * The Coordinated Universal Time (UTC) last write property for the directory.
   * A value of now may be used to indicate the time of the request.
   * A value of preserve may be passed to keep an existing value unchanged.
   * By default, the value will be set as preserve.
   */
  lastWriteTime?: Date | TimeNowType | TimePreserveType;

  /**
   * The Coordinated Universal Time (UTC) change time property for the directory.
   * A value of now may be used to indicate the time of the request.
   * By default, the value will be set to the time of the request.
   */
  changeTime?: Date | TimeNowType;
}

/**
 * Close handles result information.
 */
export interface CloseHandlesInfo {
  closedHandlesCount: number;
  /**
   * Contains count of number of handles that failed to close.
   */
  closeFailureCount?: number;
}

/**
 * Protocols to enable on the share. For now, only support SMB or NFS.
 */
export interface ShareProtocols {
  /**
   * The share can be accessed by SMBv3.0, SMBv2.1 and REST.
   */
  smbEnabled?: boolean;
  /**
   * The share can be accessed by NFSv4.1.
   */
  nfsEnabled?: boolean;
}

export interface ShareClientConfig {
  /**
   * The Files OAuth over REST feature requires special permissions to be included in the role definition to use
   * These special permissions will give privileged access to file share data -
   * It will allow users to bypass file/directory level ACL/NTFS permissions and get read/write access to file share data
   * Since this additional permission can be unintended and to prevent unintended and over privileged access,
   * additional checks has been implemented that requires users to explicitly indicate their intent to use these additional permissions.
   * This is done using the fileRequestIntent option.
   * Currently, the only value that the header supports is 'backup'
   * Any user who wishes to use Files OAuth over REST feature has to call the API with the intent header. If the API is not called with the intent header, any subsequent data operation requests will be denied.
   */
  fileRequestIntent?: ShareTokenIntent;
  /** If true, the trailing dot will not be trimmed from the target URI. */
  allowTrailingDot?: boolean;
  /** If true, the trailing dot will not be trimmed from the source URI. */
  allowSourceTrailingDot?: boolean;
}

export type ShareClientOptions = StoragePipelineOptions & ShareClientConfig;

/**
 * Convert protocols from joined string to ShareProtocols.
 *
 * @param protocolsString -
 */
export function toShareProtocols(protocolsString?: string): ShareProtocols | undefined {
  if (protocolsString === undefined) {
    return undefined;
  }

  const protocolStrArray = protocolsString.split(";");
  const protocols: ShareProtocols = {};
  for (const protocol of protocolStrArray) {
    if (protocol === "SMB") {
      protocols.smbEnabled = true;
    } else if (protocol === "NFS") {
      protocols.nfsEnabled = true;
    }
  }
  return protocols;
}

/**
 * Convert ShareProtocols to joined string.
 *
 * @param protocols -
 */
export function toShareProtocolsString(protocols: ShareProtocols = {}): string | undefined {
  let protocolStr = undefined;

  if (protocols.smbEnabled === true) {
    protocolStr = "SMB";
  }
  if (protocols.nfsEnabled === true) {
    logger.info(
      `Using "NFS" in favor of "SMB" for the share protocol as currently they can't be supported at the same time.`,
    );
    protocolStr = "NFS";
  }
  return protocolStr;
}

export function validateFilePermissionOptions(
  filePermission?: string,
  filePermissionKey?: string,
): void {
  if (filePermission && filePermissionKey) {
    throw new RangeError("Only one of filePermission or filePermissionKey can be specified.");
  }
}

export function validateAndSetDefaultsForFileAndDirectoryCreateCommonOptions(
  options: FileAndDirectoryCreateCommonOptions,
): FileAndDirectoryCreateCommonOptions {
  // Would better deep copy params set by user.

  if (!options) {
    options = {};
  }

  validateFilePermissionOptions(options.filePermission, options.filePermissionKey);

  if (!options.creationTime) {
    options.creationTime = "now";
  }

  if (!options.lastWriteTime) {
    options.lastWriteTime = "now";
  }

  if (!options.filePermission && !options.filePermissionKey) {
    options.filePermission = "inherit";
  }

  return options;
}

export function validateAndSetDefaultsForFileAndDirectorySetPropertiesCommonOptions(
  options: FileAndDirectorySetPropertiesCommonOptions,
): FileAndDirectorySetPropertiesCommonOptions {
  // Would better deep copy params set by user.

  if (!options) {
    options = {};
  }

  validateFilePermissionOptions(options.filePermission, options.filePermissionKey);

  if (!options.creationTime) {
    options.creationTime = "preserve";
  }

  if (!options.lastWriteTime) {
    options.lastWriteTime = "preserve";
  }

  if (!options.fileAttributes) {
    options.fileAttributes = "preserve";
  }

  if (!options.filePermission && !options.filePermissionKey) {
    options.filePermission = "preserve";
  }

  return options;
}

export function fileAttributesToString(
  fileAttributes: FileSystemAttributes | FileAttributesPreserveType,
): string {
  return fileAttributes instanceof FileSystemAttributes
    ? fileAttributes.toString()
    : fileAttributes;
}

export function fileCreationTimeToString(
  time: Date | TimeNowType | TimePreserveType | undefined,
): string | undefined {
  return time instanceof Date ? truncatedISO8061Date(time) : time;
}

export function fileLastWriteTimeToString(
  time: Date | TimeNowType | TimePreserveType | undefined,
): string | undefined {
  return time instanceof Date ? truncatedISO8061Date(time) : time;
}

export function fileChangeTimeToString(
  time: Date | TimeNowType | TimePreserveType | undefined,
): string | undefined {
  return time instanceof Date ? truncatedISO8061Date(time) : time;
}

/**
 * Represents authentication information in Authorization, ProxyAuthorization,
 * WWW-Authenticate, and Proxy-Authenticate header values.
 */
export interface HttpAuthorization {
  /**
   * The scheme to use for authorization.
   */
  scheme: string;

  /**
   * the credentials containing the authentication information of the user agent for the resource being requested.
   */
  value: string;
}

/**
 * Defines the known cloud audiences for Storage.
 */
export enum StorageFileAudience {
  /**
   * The OAuth scope to use to retrieve an AAD token for Azure Storage.
   */
  StorageOAuthScopes = "https://storage.azure.com/.default",
}

export function getFileServiceAccountAudience(storageAccountName: string): string {
  return `https://${storageAccountName}.file.core.windows.net/.default`;
}
