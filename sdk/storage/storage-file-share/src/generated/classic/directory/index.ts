// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileContext } from "../../api/fileContext.js";
import {
  rename,
  forceCloseHandles,
  listHandles,
  listFilesAndDirectoriesSegment,
  setMetadata,
  setProperties,
  $delete,
  getProperties,
  create,
} from "../../api/directory/operations.js";
import {
  DirectoryRenameOptionalParams,
  DirectoryForceCloseHandlesOptionalParams,
  DirectoryListHandlesOptionalParams,
  DirectoryListFilesAndDirectoriesSegmentOptionalParams,
  DirectorySetMetadataOptionalParams,
  DirectorySetPropertiesOptionalParams,
  DirectoryDeleteOptionalParams,
  DirectoryGetPropertiesOptionalParams,
  DirectoryCreateOptionalParams,
} from "../../api/directory/options.js";
import {
  ListFilesAndDirectoriesSegmentResponse,
  ListHandlesResponse,
  NfsFileType,
} from "../../models/azure/storage/files/shares/models.js";
import { StorageCompatResponseInfo } from "../../static-helpers/storageCompatResponse.js";

/** Interface representing a Directory operations. */
export interface DirectoryOperations {
  /** Renames a directory. By default, the destination is overwritten and if the destination already exists and has a read-only attribute set, the operation will fail. */
  rename: (
    renameSource: string,
    options?: DirectoryRenameOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      requestServerEncrypted?: boolean;
      filePermissionKey?: string;
      fileAttributes?: string;
      fileCreatedOn?: Date;
      fileLastWriteOn?: Date;
      fileChangeOn?: Date;
      fileId?: string;
      fileParentId?: string;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        requestServerEncrypted?: boolean;
        filePermissionKey?: string;
        fileAttributes?: string;
        fileCreatedOn?: Date;
        fileLastWriteOn?: Date;
        fileChangeOn?: Date;
        fileId?: string;
        fileParentId?: string;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** Closes all handles open for given directory. */
  forceCloseHandles: (
    handleId: string,
    options?: DirectoryForceCloseHandlesOptionalParams,
  ) => Promise<
    {
      marker?: string;
      numberOfHandlesClosed: number;
      numberOfHandlesFailedToClose: number;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        marker?: string;
        numberOfHandlesClosed: number;
        numberOfHandlesFailedToClose: number;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** Lists handles for directory. */
  listHandles: (
    options?: DirectoryListHandlesOptionalParams,
  ) => Promise<
    {
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
      contentType: "application/xml";
    } & ListHandlesResponse &
      StorageCompatResponseInfo<
        ListHandlesResponse,
        {
          apiVersion: string;
          requestId: string;
          clientRequestId?: string;
          date: Date;
          contentType: "application/xml";
        }
      >
  >;
  /** Returns a list of files and directories under the specified share or directory. It lists the contents only for a single level of the directory hierarchy. */
  listFilesAndDirectoriesSegment: (
    options?: DirectoryListFilesAndDirectoriesSegmentOptionalParams,
  ) => Promise<
    {
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
      contentType: "application/xml";
    } & ListFilesAndDirectoriesSegmentResponse &
      StorageCompatResponseInfo<
        ListFilesAndDirectoriesSegmentResponse,
        {
          apiVersion: string;
          requestId: string;
          clientRequestId?: string;
          date: Date;
          contentType: "application/xml";
        }
      >
  >;
  /** Sets one or more user-defined name-value pairs for the specified directory. */
  setMetadata: (
    options?: DirectorySetMetadataOptionalParams,
  ) => Promise<
    {
      etag: string;
      requestServerEncrypted?: boolean;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        requestServerEncrypted?: boolean;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** Sets properties for the specified directory. */
  setProperties: (
    options?: DirectorySetPropertiesOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      requestServerEncrypted?: boolean;
      filePermissionKey?: string;
      fileAttributes?: string;
      fileCreatedOn?: Date;
      fileLastWriteOn?: Date;
      fileChangeOn?: Date;
      fileId?: string;
      fileParentId?: string;
      fileMode?: string;
      owner?: string;
      group?: string;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        requestServerEncrypted?: boolean;
        filePermissionKey?: string;
        fileAttributes?: string;
        fileCreatedOn?: Date;
        fileLastWriteOn?: Date;
        fileChangeOn?: Date;
        fileId?: string;
        fileParentId?: string;
        fileMode?: string;
        owner?: string;
        group?: string;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** Removes the specified empty directory. Note that the directory must be empty before it can be deleted. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    options?: DirectoryDeleteOptionalParams,
  ) => Promise<
    {
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      { apiVersion: string; requestId: string; clientRequestId?: string; date: Date }
    >
  >;
  /** Returns all system properties for the specified directory, and can also be used to check the existence of a directory. */
  getProperties: (
    options?: DirectoryGetPropertiesOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      filePermissionKey?: string;
      fileAttributes?: string;
      fileCreatedOn?: Date;
      fileLastWriteOn?: Date;
      fileChangeOn?: Date;
      fileId?: string;
      fileParentId?: string;
      serverEncrypted?: boolean;
      fileMode?: string;
      owner?: string;
      group?: string;
      nfsFileType?: NfsFileType;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        filePermissionKey?: string;
        fileAttributes?: string;
        fileCreatedOn?: Date;
        fileLastWriteOn?: Date;
        fileChangeOn?: Date;
        fileId?: string;
        fileParentId?: string;
        serverEncrypted?: boolean;
        fileMode?: string;
        owner?: string;
        group?: string;
        nfsFileType?: NfsFileType;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** Creates a new directory under the specified share or parent directory. */
  create: (
    options?: DirectoryCreateOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      requestServerEncrypted?: boolean;
      filePermissionKey?: string;
      fileAttributes?: string;
      fileCreatedOn?: Date;
      fileLastWriteOn?: Date;
      fileChangeOn?: Date;
      fileId?: string;
      fileParentId?: string;
      fileMode?: string;
      owner?: string;
      group?: string;
      nfsFileType?: NfsFileType;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        requestServerEncrypted?: boolean;
        filePermissionKey?: string;
        fileAttributes?: string;
        fileCreatedOn?: Date;
        fileLastWriteOn?: Date;
        fileChangeOn?: Date;
        fileId?: string;
        fileParentId?: string;
        fileMode?: string;
        owner?: string;
        group?: string;
        nfsFileType?: NfsFileType;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
}

function _getDirectory(context: FileContext) {
  return {
    rename: (renameSource: string, options?: DirectoryRenameOptionalParams) =>
      rename(context, renameSource, options),
    forceCloseHandles: (handleId: string, options?: DirectoryForceCloseHandlesOptionalParams) =>
      forceCloseHandles(context, handleId, options),
    listHandles: (options?: DirectoryListHandlesOptionalParams) => listHandles(context, options),
    listFilesAndDirectoriesSegment: (
      options?: DirectoryListFilesAndDirectoriesSegmentOptionalParams,
    ) => listFilesAndDirectoriesSegment(context, options),
    setMetadata: (options?: DirectorySetMetadataOptionalParams) => setMetadata(context, options),
    setProperties: (options?: DirectorySetPropertiesOptionalParams) =>
      setProperties(context, options),
    delete: (options?: DirectoryDeleteOptionalParams) => $delete(context, options),
    getProperties: (options?: DirectoryGetPropertiesOptionalParams) =>
      getProperties(context, options),
    create: (options?: DirectoryCreateOptionalParams) => create(context, options),
  };
}

export function _getDirectoryOperations(context: FileContext): DirectoryOperations {
  return {
    ..._getDirectory(context),
  };
}
