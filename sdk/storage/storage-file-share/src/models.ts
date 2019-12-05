// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { FileSystemAttributes } from "./FileSystemAttributes";
import { truncatedISO8061Date } from "./utils/utils.common";
export interface Metadata {
  [propertyName: string]: string;
}

export interface FileHttpHeaders {
  /**
   * @member {string} [fileCacheControl] Optional. Sets the file's cache
   * control. If specified, this property is stored with the file and returned
   * with a read request.
   */
  fileCacheControl?: string;
  /**
   * @member {string} [fileContentType] Optional. Sets the file's content type.
   * If specified, this property is stored with the file and returned with a
   * read request.
   */
  fileContentType?: string;
  /**
   * @member {Uint8Array} [fileContentMD5] Optional. An MD5 hash of the file
   * content. Note that this hash is not validated, as the hashes for the
   * individual blocks were validated when each was uploaded.
   */
  fileContentMD5?: Uint8Array;
  /**
   * @member {string} [fileContentEncoding] Optional. Sets the file's content
   * encoding. If specified, this property is stored with the file and returned
   * with a read request.
   */
  fileContentEncoding?: string;
  /**
   * @member {string} [fileContentLanguage] Optional. Set the file's content
   * language. If specified, this property is stored with the file and returned
   * with a read request.
   */
  fileContentLanguage?: string;
  /**
   * @member {string} [fileContentDisposition] Optional. Sets the file's
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
}

/**
 * Close handles result information.
 *
 * @export
 * @interface CloseHandlesInfo
 */
export interface CloseHandlesInfo {
  closedHandlesCount: number;
}

export function validateFilePermissionOptions(filePermission?: string, filePermissionKey?: string) {
  if (filePermission && filePermissionKey) {
    throw new RangeError("Only one of filePermission or filePermissionKey can be specified.");
  }
}

export function validateAndSetDefaultsForFileAndDirectoryCreateCommonOptions(
  options: FileAndDirectoryCreateCommonOptions
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
  options: FileAndDirectorySetPropertiesCommonOptions
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
  fileAttributes: FileSystemAttributes | FileAttributesPreserveType
): string {
  return fileAttributes instanceof FileSystemAttributes
    ? fileAttributes.toString()
    : fileAttributes;
}

export function fileCreationTimeToString(time: Date | TimeNowType | TimePreserveType): string {
  return time instanceof Date ? truncatedISO8061Date(time) : time;
}

export function fileLastWriteTimeToString(time: Date | TimeNowType | TimePreserveType): string {
  return time instanceof Date ? truncatedISO8061Date(time) : time;
}
