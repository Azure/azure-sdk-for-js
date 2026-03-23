// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataLakeContext } from "../../api/dataLakeContext.js";
import {
  listBlobHierarchySegment,
  listPaths,
  $delete,
  getProperties,
  setProperties,
  create,
} from "../../api/fileSystem/operations.js";
import {
  FileSystemListBlobHierarchySegmentOptionalParams,
  FileSystemListPathsOptionalParams,
  FileSystemDeleteOptionalParams,
  FileSystemGetPropertiesOptionalParams,
  FileSystemSetPropertiesOptionalParams,
  FileSystemCreateOptionalParams,
} from "../../api/fileSystem/options.js";
import {
  PathList,
  ListBlobsHierarchySegmentResponse,
  FileSystemResourceType,
} from "../../models/azure/storage/files/dataLake/models.js";
import { StorageCompatResponseInfo } from "../../static-helpers/storageCompatResponse.js";

/** Interface representing a FileSystem operations. */
export interface FileSystemOperations {
  /** The List Blobs operation returns a list of the blobs under the specified container. */
  listBlobHierarchySegment: (
    filesystem: string,
    options?: FileSystemListBlobHierarchySegmentOptionalParams,
  ) => Promise<
    {
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
      contentType: "application/xml";
    } & ListBlobsHierarchySegmentResponse &
      StorageCompatResponseInfo<
        ListBlobsHierarchySegmentResponse,
        {
          date: Date;
          version: string;
          requestId?: string;
          clientRequestId?: string;
          contentType: "application/xml";
        }
      >
  >;
  /** List FileSystem paths and their properties. */
  listPaths: (
    filesystem: string,
    recursive: boolean,
    options?: FileSystemListPathsOptionalParams,
  ) => Promise<
    {
      eTag: string;
      lastModified: Date;
      continuation?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
      contentType: "application/json";
    } & PathList &
      StorageCompatResponseInfo<
        PathList,
        {
          eTag: string;
          lastModified: Date;
          continuation?: string;
          date: Date;
          version: string;
          requestId?: string;
          clientRequestId?: string;
          contentType: "application/json";
        }
      >
  >;
  /** Marks the FileSystem for deletion. When a FileSystem is deleted, a FileSystem with the same identifier cannot be created for at least 30 seconds. While the filesystem is being deleted, attempts to create a filesystem with the same identifier will fail with status code 409 (Conflict), with the service returning additional error information indicating that the filesystem is being deleted. All other operations, including operations on any files or directories within the filesystem, will fail with status code 404 (Not Found) while the filesystem is being deleted. This operation supports conditional HTTP requests. For more information, see [Specifying Conditional Headers for Blob Service Operations](https://learn.microsoft.com/rest/api/storageservices/specifying-conditional-headers-for-blob-service-operations). */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    filesystem: string,
    resource: FileSystemResourceType,
    options?: FileSystemDeleteOptionalParams,
  ) => Promise<
    {
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      { date: Date; version: string; requestId?: string; clientRequestId?: string }
    >
  >;
  /** All system and user-defined filesystem properties are specified in the response headers. */
  getProperties: (
    filesystem: string,
    resource: FileSystemResourceType,
    options?: FileSystemGetPropertiesOptionalParams,
  ) => Promise<
    {
      eTag: string;
      lastModified: Date;
      properties?: string;
      namespaceEnabled?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        eTag: string;
        lastModified: Date;
        properties?: string;
        namespaceEnabled?: string;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Set properties for the FileSystem. This operation supports conditional HTTP requests. For more information, see [Specifying Conditional Headers for Blob Service Operations](https://learn.microsoft.com/rest/api/storageservices/specifying-conditional-headers-for-blob-service-operations). */
  setProperties: (
    filesystem: string,
    resource: FileSystemResourceType,
    options?: FileSystemSetPropertiesOptionalParams,
  ) => Promise<
    {
      eTag: string;
      lastModified: Date;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        eTag: string;
        lastModified: Date;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Create a FileSystem rooted at the specified location. If the FileSystem already exists, the operation fails. This operation does not support conditional HTTP requests. */
  create: (
    filesystem: string,
    resource: FileSystemResourceType,
    options?: FileSystemCreateOptionalParams,
  ) => Promise<
    {
      eTag: string;
      lastModified: Date;
      namespaceEnabled?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        eTag: string;
        lastModified: Date;
        namespaceEnabled?: string;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
}

function _getFileSystem(context: DataLakeContext) {
  return {
    listBlobHierarchySegment: (
      filesystem: string,
      options?: FileSystemListBlobHierarchySegmentOptionalParams,
    ) => listBlobHierarchySegment(context, filesystem, options),
    listPaths: (
      filesystem: string,
      recursive: boolean,
      options?: FileSystemListPathsOptionalParams,
    ) => listPaths(context, filesystem, recursive, options),
    delete: (
      filesystem: string,
      resource: FileSystemResourceType,
      options?: FileSystemDeleteOptionalParams,
    ) => $delete(context, filesystem, resource, options),
    getProperties: (
      filesystem: string,
      resource: FileSystemResourceType,
      options?: FileSystemGetPropertiesOptionalParams,
    ) => getProperties(context, filesystem, resource, options),
    setProperties: (
      filesystem: string,
      resource: FileSystemResourceType,
      options?: FileSystemSetPropertiesOptionalParams,
    ) => setProperties(context, filesystem, resource, options),
    create: (
      filesystem: string,
      resource: FileSystemResourceType,
      options?: FileSystemCreateOptionalParams,
    ) => create(context, filesystem, resource, options),
  };
}

export function _getFileSystemOperations(context: DataLakeContext): FileSystemOperations {
  return {
    ..._getFileSystem(context),
  };
}
