// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataLakeContext } from "../../api/dataLakeContext.js";
import {
  undelete,
  setExpiry,
  appendData,
  flushData,
  setAccessControlRecursive,
  setAccessControl,
  $delete,
  getProperties,
  read,
  lease,
  update,
  create,
} from "../../api/path/operations.js";
import {
  PathUndeleteOptionalParams,
  PathSetExpiryOptionalParams,
  PathAppendDataOptionalParams,
  PathFlushDataOptionalParams,
  PathSetAccessControlRecursiveOptionalParams,
  PathSetAccessControlOptionalParams,
  PathDeleteOptionalParams,
  PathGetPropertiesOptionalParams,
  PathReadOptionalParams,
  PathLeaseOptionalParams,
  PathUpdateOptionalParams,
  PathCreateOptionalParams,
} from "../../api/path/options.js";
import {
  SetAccessControlRecursiveResponse,
  PathExpiryOptions,
  PathUpdateAction,
  PathSetAccessControlRecursiveMode,
  PathLeaseAction,
} from "../../models/azure/storage/files/dataLake/models.js";
import { PathReadResponse } from "../../models/models.js";
import { StorageCompatResponseInfo } from "../../static-helpers/storageCompatResponse.js";

/** Interface representing a Path operations. */
export interface PathOperations {
  /** Undelete a path that was previously soft deleted. */
  undelete: (
    options?: PathUndeleteOptionalParams,
  ) => Promise<
    {
      resourceType?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        resourceType?: string;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Sets the time a blob will expire and be deleted. */
  setExpiry: (
    expiryOptions: PathExpiryOptions,
    options?: PathSetExpiryOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Append data to the file. */
  appendData: (
    body: Uint8Array,
    options?: PathAppendDataOptionalParams,
  ) => Promise<
    {
      etag: string;
      contentMD5?: Uint8Array;
      contentCrc64?: Uint8Array;
      isServerEncrypted?: boolean;
      encryptionKeySha256?: string;
      leaseRenewed?: boolean;
      structuredBodyType?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        contentMD5?: Uint8Array;
        contentCrc64?: Uint8Array;
        isServerEncrypted?: boolean;
        encryptionKeySha256?: string;
        leaseRenewed?: boolean;
        structuredBodyType?: string;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Set the owner, group, permissions, or access control list for a path. */
  flushData: (
    options?: PathFlushDataOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      contentLength?: number;
      isServerEncrypted?: boolean;
      encryptionKeySha256?: string;
      leaseRenewed?: boolean;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        contentLength?: number;
        isServerEncrypted?: boolean;
        encryptionKeySha256?: string;
        leaseRenewed?: boolean;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Set the access control list for a path and sub-paths. */
  setAccessControlRecursive: (
    mode: PathSetAccessControlRecursiveMode,
    options?: PathSetAccessControlRecursiveOptionalParams,
  ) => Promise<
    {
      continuation?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
      contentType: "application/json";
    } & SetAccessControlRecursiveResponse &
      StorageCompatResponseInfo<
        SetAccessControlRecursiveResponse,
        {
          continuation?: string;
          date: Date;
          version: string;
          requestId?: string;
          clientRequestId?: string;
          contentType: "application/json";
        }
      >
  >;
  /** Set the owner, group, permissions, or access control list for a path. */
  setAccessControl: (
    options?: PathSetAccessControlOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Delete the file or directory. This operation supports conditional HTTP requests. For more information, see [Specifying Conditional Headers for Blob Service Operations](https://learn.microsoft.com/rest/api/storageservices/specifying-conditional-headers-for-blob-service-operations). */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    options?: PathDeleteOptionalParams,
  ) => Promise<
    {
      continuation?: string;
      deletionId?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        continuation?: string;
        deletionId?: string;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Get Properties returns all system and user defined properties for a path. Get Status returns all system defined properties for a path. Get Access Control List returns the access control list for a path. This operation supports conditional HTTP requests. For more information, see [Specifying Conditional Headers for Blob Service Operations](https://learn.microsoft.com/rest/api/storageservices/specifying-conditional-headers-for-blob-service-operations). */
  getProperties: (
    options?: PathGetPropertiesOptionalParams,
  ) => Promise<
    {
      acceptRanges?: string;
      cacheControl?: string;
      contentDisposition?: string;
      contentEncoding?: string;
      contentLanguage?: string;
      contentLength?: number;
      contentRange?: string;
      contentType?: string;
      contentMD5?: Uint8Array;
      etag: string;
      lastModified: Date;
      resourceType?: string;
      properties?: string;
      owner?: string;
      group?: string;
      permissions?: string;
      acl?: string;
      leaseDuration?: string;
      leaseState?: string;
      leaseStatus?: string;
      isServerEncrypted?: boolean;
      encryptionKeySha256?: string;
      encryptionContext?: string;
      encryptionScope?: string;
      creationTime: Date;
      expiresOn: Date;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        acceptRanges?: string;
        cacheControl?: string;
        contentDisposition?: string;
        contentEncoding?: string;
        contentLanguage?: string;
        contentLength?: number;
        contentRange?: string;
        contentType?: string;
        contentMD5?: Uint8Array;
        etag: string;
        lastModified: Date;
        resourceType?: string;
        properties?: string;
        owner?: string;
        group?: string;
        permissions?: string;
        acl?: string;
        leaseDuration?: string;
        leaseState?: string;
        leaseStatus?: string;
        isServerEncrypted?: boolean;
        encryptionKeySha256?: string;
        encryptionContext?: string;
        encryptionScope?: string;
        creationTime: Date;
        expiresOn: Date;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Read the contents of a file. For read operations, range requests are supported. This operation supports conditional HTTP requests. For more information, see [Specifying Conditional Headers for Blob Service Operations](https://learn.microsoft.com/rest/api/storageservices/specifying-conditional-headers-for-blob-service-operations). */
  read: (
    options?: PathReadOptionalParams,
  ) => Promise<
    {
      acceptRanges?: string;
      cacheControl?: string;
      contentDisposition?: string;
      contentEncoding?: string;
      contentLanguage?: string;
      contentLength?: number;
      contentRange?: string;
      contentMD5?: Uint8Array;
      etag: string;
      lastModified: Date;
      resourceType?: string;
      properties?: string;
      leaseDuration?: string;
      leaseState?: string;
      leaseStatus?: string;
      isServerEncrypted?: boolean;
      encryptionKeySha256?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
      contentType: "application/octet-stream";
    } & PathReadResponse &
      StorageCompatResponseInfo<
        PathReadResponse,
        {
          acceptRanges?: string;
          cacheControl?: string;
          contentDisposition?: string;
          contentEncoding?: string;
          contentLanguage?: string;
          contentLength?: number;
          contentRange?: string;
          contentMD5?: Uint8Array;
          etag: string;
          lastModified: Date;
          resourceType?: string;
          properties?: string;
          leaseDuration?: string;
          leaseState?: string;
          leaseStatus?: string;
          isServerEncrypted?: boolean;
          encryptionKeySha256?: string;
          date: Date;
          version: string;
          requestId?: string;
          clientRequestId?: string;
          contentType: "application/octet-stream";
        }
      >
  >;
  /** Create and manage a lease to restrict write and delete access to the path. This operation supports conditional HTTP requests. For more information, see [Specifying Conditional Headers for Blob Service Operations](https://learn.microsoft.com/rest/api/storageservices/specifying-conditional-headers-for-blob-service-operations). */
  lease: (
    leaseAction: PathLeaseAction,
    options?: PathLeaseOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      leaseId?: string;
      leaseTime?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        leaseId?: string;
        leaseTime?: string;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Uploads data to be appended to a file, flushes (writes) previously uploaded data to a file, sets properties for a file or directory, or sets access control for a file or directory. Data can only be appended to a file. Concurrent writes to the same file using multiple clients are not supported. This operation supports conditional HTTP requests. For more information, see [Specifying Conditional Headers for Blob Service Operations](https://learn.microsoft.com/rest/api/storageservices/specifying-conditional-headers-for-blob-service-operations). */
  update: (
    action: PathUpdateAction,
    body: Uint8Array,
    options?: PathUpdateOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      acceptRanges?: string;
      cacheControl?: string;
      contentDisposition?: string;
      contentEncoding?: string;
      contentLanguage?: string;
      contentLength?: number;
      contentRange?: string;
      contentMD5?: Uint8Array;
      properties?: string;
      continuation?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
      contentType: "application/json";
    } & SetAccessControlRecursiveResponse &
      StorageCompatResponseInfo<
        SetAccessControlRecursiveResponse,
        {
          etag: string;
          lastModified: Date;
          acceptRanges?: string;
          cacheControl?: string;
          contentDisposition?: string;
          contentEncoding?: string;
          contentLanguage?: string;
          contentLength?: number;
          contentRange?: string;
          contentMD5?: Uint8Array;
          properties?: string;
          continuation?: string;
          date: Date;
          version: string;
          requestId?: string;
          clientRequestId?: string;
          contentType: "application/json";
        }
      >
  >;
  /** Create or rename a file or directory. By default, the destination is overwritten and if the destination already exists and has a lease the lease is broken. This operation supports conditional HTTP requests. For more information, see [Specifying Conditional Headers for Blob Service Operations](https://learn.microsoft.com/rest/api/storageservices/specifying-conditional-headers-for-blob-service-operations). To fail if the destination already exists, use a conditional request with If-None-Match: "*". */
  create: (
    options?: PathCreateOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      continuation?: string;
      contentLength?: number;
      isServerEncrypted?: boolean;
      encryptionKeySha256?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        continuation?: string;
        contentLength?: number;
        isServerEncrypted?: boolean;
        encryptionKeySha256?: string;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
}

function _getPath(context: DataLakeContext) {
  return {
    undelete: (options?: PathUndeleteOptionalParams) => undelete(context, options),
    setExpiry: (expiryOptions: PathExpiryOptions, options?: PathSetExpiryOptionalParams) =>
      setExpiry(context, expiryOptions, options),
    appendData: (body: Uint8Array, options?: PathAppendDataOptionalParams) =>
      appendData(context, body, options),
    flushData: (options?: PathFlushDataOptionalParams) => flushData(context, options),
    setAccessControlRecursive: (
      mode: PathSetAccessControlRecursiveMode,
      options?: PathSetAccessControlRecursiveOptionalParams,
    ) => setAccessControlRecursive(context, mode, options),
    setAccessControl: (options?: PathSetAccessControlOptionalParams) =>
      setAccessControl(context, options),
    delete: (options?: PathDeleteOptionalParams) => $delete(context, options),
    getProperties: (options?: PathGetPropertiesOptionalParams) => getProperties(context, options),
    read: (options?: PathReadOptionalParams) => read(context, options),
    lease: (leaseAction: PathLeaseAction, options?: PathLeaseOptionalParams) =>
      lease(context, leaseAction, options),
    update: (action: PathUpdateAction, body: Uint8Array, options?: PathUpdateOptionalParams) =>
      update(context, action, body, options),
    create: (options?: PathCreateOptionalParams) => create(context, options),
  };
}

export function _getPathOperations(context: DataLakeContext): PathOperations {
  return {
    ..._getPath(context),
  };
}
