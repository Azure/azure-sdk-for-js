// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileContext } from "../../api/fileContext.js";
import {
  createHardLink,
  getSymbolicLink,
  createSymbolicLink,
  rename,
  forceCloseHandles,
  listHandles,
  abortCopy,
  startCopy,
  getRangeList,
  uploadRangeFromUrl,
  uploadRange,
  breakLease,
  changeLease,
  releaseLease,
  acquireLease,
  setMetadata,
  setHttpHeaders,
  $delete,
  getProperties,
  download,
  create,
} from "../../api/file/operations.js";
import {
  FileCreateHardLinkOptionalParams,
  FileGetSymbolicLinkOptionalParams,
  FileCreateSymbolicLinkOptionalParams,
  FileRenameOptionalParams,
  FileForceCloseHandlesOptionalParams,
  FileListHandlesOptionalParams,
  FileAbortCopyOptionalParams,
  FileStartCopyOptionalParams,
  FileGetRangeListOptionalParams,
  FileUploadRangeFromUrlOptionalParams,
  FileUploadRangeOptionalParams,
  FileBreakLeaseOptionalParams,
  FileChangeLeaseOptionalParams,
  FileReleaseLeaseOptionalParams,
  FileAcquireLeaseOptionalParams,
  FileSetMetadataOptionalParams,
  FileSetHttpHeadersOptionalParams,
  FileDeleteOptionalParams,
  FileGetPropertiesOptionalParams,
  FileDownloadOptionalParams,
  FileCreateOptionalParams,
} from "../../api/file/options.js";
import {
  HandleItem,
  ShareFileRangeList,
  NfsFileType,
  FileRangeWriteType,
  FileRangeWriteFromUrlType,
} from "../../models/azure/storage/files/shares/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { StorageCompatResponseInfo } from "../../static-helpers/storageCompatResponse.js";

/** Interface representing a File operations. */
export interface FileOperations {
  /** Creates a hard link to a target file. NFS only. */
  createHardLink: (
    targetFile: string,
    options?: FileCreateHardLinkOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      fileCreationTime?: string;
      fileLastWriteTime?: string;
      fileChangeTime?: string;
      fileId?: string;
      fileParentId?: string;
      linkCount?: number;
      mode?: string;
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
        fileCreationTime?: string;
        fileLastWriteTime?: string;
        fileChangeTime?: string;
        fileId?: string;
        fileParentId?: string;
        linkCount?: number;
        mode?: string;
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
  /** Returns the target of a symbolic link. NFS only. */
  getSymbolicLink: (
    options?: FileGetSymbolicLinkOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      linkText: string;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        linkText: string;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** Creates a symbolic link to a target file. NFS only. */
  createSymbolicLink: (
    linkText: string,
    options?: FileCreateSymbolicLinkOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      fileCreationTime?: string;
      fileLastWriteTime?: string;
      fileChangeTime?: string;
      fileId?: string;
      fileParentId?: string;
      mode?: string;
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
        fileCreationTime?: string;
        fileLastWriteTime?: string;
        fileChangeTime?: string;
        fileId?: string;
        fileParentId?: string;
        mode?: string;
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
  /** Renames a file. By default, the destination is overwritten and if the destination already exists and has a read-only attribute set, the operation will fail. */
  rename: (
    renameSource: string,
    options?: FileRenameOptionalParams,
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
  /** Closes all handles open for given file. */
  forceCloseHandles: (
    handleId: string,
    options?: FileForceCloseHandlesOptionalParams,
  ) => Promise<
    {
      marker?: string;
      numberOfHandlesClosed: number;
      numberOfHandlesFailed: number;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        marker?: string;
        numberOfHandlesClosed: number;
        numberOfHandlesFailed: number;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** Lists handles for file. */
  listHandles: (options?: FileListHandlesOptionalParams) => PagedAsyncIterableIterator<HandleItem>;
  /** Aborts a pending Copy File operation, and leaves a destination file with zero length and full metadata. */
  abortCopy: (
    copyid: string,
    options?: FileAbortCopyOptionalParams,
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
  /** Copies a blob or file to a destination file within the storage account. */
  startCopy: (
    copySource: string,
    options?: FileStartCopyOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      copyId: string;
      copyStatus: string;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        copyId: string;
        copyStatus: string;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** Returns the list of valid page ranges for a file or snapshot of a file. */
  getRangeList: (
    options?: FileGetRangeListOptionalParams,
  ) => Promise<
    {
      lastModified: Date;
      etag: string;
      fileContentLength: number;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
      contentType: "application/xml";
    } & ShareFileRangeList &
      StorageCompatResponseInfo<
        ShareFileRangeList,
        {
          lastModified: Date;
          etag: string;
          fileContentLength: number;
          apiVersion: string;
          requestId: string;
          clientRequestId?: string;
          date: Date;
          contentType: "application/xml";
        }
      >
  >;
  /** Upload a range of bytes to a file where the contents are read from a URL. */
  uploadRangeFromUrl: (
    targetRange: string,
    copySource: string,
    fileRangeWriteFromUrl: FileRangeWriteFromUrlType,
    contentLength: number,
    options?: FileUploadRangeFromUrlOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      contentCrc64?: string;
      requestServerEncrypted?: boolean;
      fileLastWriteTime?: string;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        contentCrc64?: string;
        requestServerEncrypted?: boolean;
        fileLastWriteTime?: string;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** Upload a range of bytes to a file. */
  uploadRange: (
    targetRange: string,
    fileRangeWrite: FileRangeWriteType,
    contentLength: number,
    options?: FileUploadRangeOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      contentMd5?: Uint8Array;
      requestServerEncrypted?: boolean;
      fileLastWriteTime?: Date;
      structuredBody?: string;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        contentMd5?: Uint8Array;
        requestServerEncrypted?: boolean;
        fileLastWriteTime?: Date;
        structuredBody?: string;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** The Lease File operation establishes and manages a lock on a file for write and delete operations. */
  breakLease: (
    options?: FileBreakLeaseOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      leaseId?: string;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        leaseId?: string;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** The Lease File operation establishes and manages a lock on a file for write and delete operations. */
  changeLease: (
    leaseId: string,
    options?: FileChangeLeaseOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      leaseId?: string;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        leaseId?: string;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** The Lease File operation establishes and manages a lock on a file for write and delete operations. */
  releaseLease: (
    leaseId: string,
    options?: FileReleaseLeaseOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** The Lease File operation establishes and manages a lock on a file for write and delete operations. */
  acquireLease: (
    options?: FileAcquireLeaseOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      leaseId?: string;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        leaseId?: string;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** Sets one or more user-defined name-value pairs for the specified file. */
  setMetadata: (
    options?: FileSetMetadataOptionalParams,
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
  /** Sets HTTP headers on a file. */
  setHttpHeaders: (
    options?: FileSetHttpHeadersOptionalParams,
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
      mode?: string;
      owner?: string;
      group?: string;
      linkCount?: number;
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
        mode?: string;
        owner?: string;
        group?: string;
        linkCount?: number;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** Removes the file from the storage account. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    options?: FileDeleteOptionalParams,
  ) => Promise<
    {
      linkCount?: number;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        linkCount?: number;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** Returns all user-defined metadata, standard HTTP properties, and system properties for the file. */
  getProperties: (
    options?: FileGetPropertiesOptionalParams,
  ) => Promise<
    {
      lastModified: string;
      fileType: "File";
      contentLength: number;
      contentType?: string;
      etag: string;
      contentMd5?: Uint8Array;
      contentEncoding?: string;
      cacheControl?: string;
      contentDisposition?: string;
      contentLanguage?: string;
      copyCompletedOn?: string;
      copyStatusDescription?: string;
      copyId?: string;
      copyProgress?: string;
      copySource?: string;
      copyStatus?: string;
      serverEncrypted?: boolean;
      filePermissionKey?: string;
      fileAttributes?: string;
      fileCreatedOn?: Date;
      fileLastWriteOn?: Date;
      fileChangeOn?: Date;
      fileId?: string;
      fileParentId?: string;
      leaseDuration?: string;
      leaseState?: string;
      leaseStatus?: string;
      mode?: string;
      owner?: string;
      group?: string;
      nfsFileType?: NfsFileType;
      linkCount?: number;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        lastModified: string;
        fileType: "File";
        contentLength: number;
        contentType?: string;
        etag: string;
        contentMd5?: Uint8Array;
        contentEncoding?: string;
        cacheControl?: string;
        contentDisposition?: string;
        contentLanguage?: string;
        copyCompletedOn?: string;
        copyStatusDescription?: string;
        copyId?: string;
        copyProgress?: string;
        copySource?: string;
        copyStatus?: string;
        serverEncrypted?: boolean;
        filePermissionKey?: string;
        fileAttributes?: string;
        fileCreatedOn?: Date;
        fileLastWriteOn?: Date;
        fileChangeOn?: Date;
        fileId?: string;
        fileParentId?: string;
        leaseDuration?: string;
        leaseState?: string;
        leaseStatus?: string;
        mode?: string;
        owner?: string;
        group?: string;
        nfsFileType?: NfsFileType;
        linkCount?: number;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** Reads or downloads a file from the system, including its metadata and properties. */
  download: (
    options?: FileDownloadOptionalParams,
  ) => Promise<
    {
      lastModified: string;
      contentLength: number;
      contentRange?: string;
      etag: string;
      contentMd5?: Uint8Array;
      contentEncoding?: string;
      cacheControl?: string;
      contentDisposition?: string;
      contentLanguage?: string;
      acceptRanges?: string;
      copyCompletedOn?: string;
      copyStatusDescription?: string;
      copyId?: string;
      copyProgress?: string;
      copySource?: string;
      copyStatus?: string;
      fileContentMd5?: string;
      serverEncrypted?: boolean;
      filePermissionKey?: string;
      fileAttributes?: string;
      fileCreatedOn?: Date;
      fileLastWriteOn?: Date;
      fileChangeOn?: Date;
      fileId?: string;
      fileParentId?: string;
      leaseDuration?: string;
      leaseState?: string;
      leaseStatus?: string;
      structuredBody?: string;
      structuredContentLength?: number;
      mode?: string;
      owner?: string;
      group?: string;
      nfsFileType?: NfsFileType;
      linkCount?: number;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
      contentType: "application/xml";
    } & Uint8Array &
      StorageCompatResponseInfo<
        Uint8Array,
        {
          lastModified: string;
          contentLength: number;
          contentRange?: string;
          etag: string;
          contentMd5?: Uint8Array;
          contentEncoding?: string;
          cacheControl?: string;
          contentDisposition?: string;
          contentLanguage?: string;
          acceptRanges?: string;
          copyCompletedOn?: string;
          copyStatusDescription?: string;
          copyId?: string;
          copyProgress?: string;
          copySource?: string;
          copyStatus?: string;
          fileContentMd5?: string;
          serverEncrypted?: boolean;
          filePermissionKey?: string;
          fileAttributes?: string;
          fileCreatedOn?: Date;
          fileLastWriteOn?: Date;
          fileChangeOn?: Date;
          fileId?: string;
          fileParentId?: string;
          leaseDuration?: string;
          leaseState?: string;
          leaseStatus?: string;
          structuredBody?: string;
          structuredContentLength?: number;
          mode?: string;
          owner?: string;
          group?: string;
          nfsFileType?: NfsFileType;
          linkCount?: number;
          apiVersion: string;
          requestId: string;
          clientRequestId?: string;
          date: Date;
          contentType: "application/xml";
        }
      >
  >;
  /** Creates a new file or replaces a file. Note it only initializes the file with no content. */
  create: (
    contentLength: number,
    options?: FileCreateOptionalParams,
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
      mode?: string;
      owner?: string;
      group?: string;
      nfsFileType?: NfsFileType;
      contentMd5?: Uint8Array;
      contentLength?: number;
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
        mode?: string;
        owner?: string;
        group?: string;
        nfsFileType?: NfsFileType;
        contentMd5?: Uint8Array;
        contentLength?: number;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
}

function _getFile(context: FileContext) {
  return {
    createHardLink: (targetFile: string, options?: FileCreateHardLinkOptionalParams) =>
      createHardLink(context, targetFile, options),
    getSymbolicLink: (options?: FileGetSymbolicLinkOptionalParams) =>
      getSymbolicLink(context, options),
    createSymbolicLink: (linkText: string, options?: FileCreateSymbolicLinkOptionalParams) =>
      createSymbolicLink(context, linkText, options),
    rename: (renameSource: string, options?: FileRenameOptionalParams) =>
      rename(context, renameSource, options),
    forceCloseHandles: (handleId: string, options?: FileForceCloseHandlesOptionalParams) =>
      forceCloseHandles(context, handleId, options),
    listHandles: (options?: FileListHandlesOptionalParams) => listHandles(context, options),
    abortCopy: (copyid: string, options?: FileAbortCopyOptionalParams) =>
      abortCopy(context, copyid, options),
    startCopy: (copySource: string, options?: FileStartCopyOptionalParams) =>
      startCopy(context, copySource, options),
    getRangeList: (options?: FileGetRangeListOptionalParams) => getRangeList(context, options),
    uploadRangeFromUrl: (
      targetRange: string,
      copySource: string,
      fileRangeWriteFromUrl: FileRangeWriteFromUrlType,
      contentLength: number,
      options?: FileUploadRangeFromUrlOptionalParams,
    ) =>
      uploadRangeFromUrl(
        context,
        targetRange,
        copySource,
        fileRangeWriteFromUrl,
        contentLength,
        options,
      ),
    uploadRange: (
      targetRange: string,
      fileRangeWrite: FileRangeWriteType,
      contentLength: number,
      options?: FileUploadRangeOptionalParams,
    ) => uploadRange(context, targetRange, fileRangeWrite, contentLength, options),
    breakLease: (options?: FileBreakLeaseOptionalParams) => breakLease(context, options),
    changeLease: (leaseId: string, options?: FileChangeLeaseOptionalParams) =>
      changeLease(context, leaseId, options),
    releaseLease: (leaseId: string, options?: FileReleaseLeaseOptionalParams) =>
      releaseLease(context, leaseId, options),
    acquireLease: (options?: FileAcquireLeaseOptionalParams) => acquireLease(context, options),
    setMetadata: (options?: FileSetMetadataOptionalParams) => setMetadata(context, options),
    setHttpHeaders: (options?: FileSetHttpHeadersOptionalParams) =>
      setHttpHeaders(context, options),
    delete: (options?: FileDeleteOptionalParams) => $delete(context, options),
    getProperties: (options?: FileGetPropertiesOptionalParams) => getProperties(context, options),
    download: (options?: FileDownloadOptionalParams) => download(context, options),
    create: (contentLength: number, options?: FileCreateOptionalParams) =>
      create(context, contentLength, options),
  };
}

export function _getFileOperations(context: FileContext): FileOperations {
  return {
    ..._getFile(context),
  };
}
