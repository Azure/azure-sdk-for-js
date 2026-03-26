// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlobContext } from "../../api/blobContext.js";
import {
  copyIncremental,
  setSequenceNumber,
  resize,
  getPageRangesDiff,
  getPageRanges,
  uploadPagesFromUrl,
  clearPages,
  uploadPages,
  create,
} from "../../api/pageBlob/operations.js";
import {
  PageBlobCopyIncrementalOptionalParams,
  PageBlobSetSequenceNumberOptionalParams,
  PageBlobResizeOptionalParams,
  PageBlobGetPageRangesDiffOptionalParams,
  PageBlobGetPageRangesOptionalParams,
  PageBlobUploadPagesFromUrlOptionalParams,
  PageBlobClearPagesOptionalParams,
  PageBlobUploadPagesOptionalParams,
  PageBlobCreateOptionalParams,
} from "../../api/pageBlob/options.js";
import {
  CopyStatus,
  PageList,
  SequenceNumberActionType,
} from "../../models/azure/storage/blobs/models.js";
import { StorageCompatResponseInfo } from "../../static-helpers/storageCompatResponse.js";

/** Interface representing a PageBlob operations. */
export interface PageBlobOperations {
  /** The Copy Incremental operation copies a snapshot of the source page blob to a destination page blob. The snapshot is copied such that only the differential changes between the previously copied snapshot are transferred to the destination. The copied snapshots are complete copies of the original snapshot and can be read or copied from as usual. This API is supported since REST version 2016-05-31. */
  copyIncremental: (
    copySource: string,
    options?: PageBlobCopyIncrementalOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      copyId?: string;
      copyStatus?: CopyStatus;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        copyId?: string;
        copyStatus?: CopyStatus;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** The Update Sequence Number operation sets the blob's sequence number. The operation will fail if the specified sequence number is less than the current sequence number of the blob. */
  setSequenceNumber: (
    sequenceNumberAction: SequenceNumberActionType,
    options?: PageBlobSetSequenceNumberOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      blobSequenceNumber: number;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        blobSequenceNumber: number;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** The Resize operation increases the size of the page blob to the specified size. */
  resize: (
    size: number,
    options?: PageBlobResizeOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      blobSequenceNumber: number;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        blobSequenceNumber: number;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** The Get Page Ranges Diff operation returns the list of valid page ranges for a page blob or snapshot of a page blob. */
  getPageRangesDiff: (
    options?: PageBlobGetPageRangesDiffOptionalParams,
  ) => Promise<
    {
      lastModified: Date;
      etag: string;
      blobContentLength?: number;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
      contentType: "application/xml";
    } & PageList &
      StorageCompatResponseInfo<
        PageList,
        {
          lastModified: Date;
          etag: string;
          blobContentLength?: number;
          date: Date;
          version: string;
          requestId?: string;
          clientRequestId?: string;
          contentType: "application/xml";
        }
      >
  >;
  /** The Get Page Ranges operation returns the list of valid page ranges for a page blob or snapshot of a page blob. */
  getPageRanges: (
    options?: PageBlobGetPageRangesOptionalParams,
  ) => Promise<
    {
      lastModified: Date;
      etag: string;
      blobContentLength?: number;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
      contentType: "application/xml";
    } & PageList &
      StorageCompatResponseInfo<
        PageList,
        {
          lastModified: Date;
          etag: string;
          blobContentLength?: number;
          date: Date;
          version: string;
          requestId?: string;
          clientRequestId?: string;
          contentType: "application/xml";
        }
      >
  >;
  /** The Upload Pages operation writes a range of pages to a page blob where the contents are read from a URL. */
  uploadPagesFromUrl: (
    sourceUrl: string,
    sourceRange: string,
    contentLength: number,
    range: string,
    options?: PageBlobUploadPagesFromUrlOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      contentMD5: Uint8Array;
      contentCrc64?: Uint8Array;
      blobSequenceNumber: number;
      isServerEncrypted?: boolean;
      encryptionKeySha256?: string;
      encryptionScope?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        contentMD5: Uint8Array;
        contentCrc64?: Uint8Array;
        blobSequenceNumber: number;
        isServerEncrypted?: boolean;
        encryptionKeySha256?: string;
        encryptionScope?: string;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** The Clear Pages operation clears a range of pages from a page blob */
  clearPages: (
    range: string,
    options?: PageBlobClearPagesOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      contentMD5: Uint8Array;
      contentCrc64?: Uint8Array;
      blobSequenceNumber: number;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        contentMD5: Uint8Array;
        contentCrc64?: Uint8Array;
        blobSequenceNumber: number;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** The Upload Pages operation writes a range of pages to a page blob */
  uploadPages: (
    body: Uint8Array,
    contentLength: number,
    range: string,
    options?: PageBlobUploadPagesOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      contentMD5: Uint8Array;
      contentCrc64?: Uint8Array;
      blobSequenceNumber: number;
      isServerEncrypted?: boolean;
      encryptionKeySha256?: string;
      encryptionScope?: string;
      structuredBodyType?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        contentMD5: Uint8Array;
        contentCrc64?: Uint8Array;
        blobSequenceNumber: number;
        isServerEncrypted?: boolean;
        encryptionKeySha256?: string;
        encryptionScope?: string;
        structuredBodyType?: string;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** The Create operation creates a new page blob. */
  create: (
    size: number,
    options?: PageBlobCreateOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      contentMD5: Uint8Array;
      versionId: string;
      isServerEncrypted?: boolean;
      encryptionKeySha256?: string;
      encryptionScope?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        contentMD5: Uint8Array;
        versionId: string;
        isServerEncrypted?: boolean;
        encryptionKeySha256?: string;
        encryptionScope?: string;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
}

function _getPageBlob(context: BlobContext) {
  return {
    copyIncremental: (copySource: string, options?: PageBlobCopyIncrementalOptionalParams) =>
      copyIncremental(context, copySource, options),
    setSequenceNumber: (
      sequenceNumberAction: SequenceNumberActionType,
      options?: PageBlobSetSequenceNumberOptionalParams,
    ) => setSequenceNumber(context, sequenceNumberAction, options),
    resize: (size: number, options?: PageBlobResizeOptionalParams) =>
      resize(context, size, options),
    getPageRangesDiff: (options?: PageBlobGetPageRangesDiffOptionalParams) =>
      getPageRangesDiff(context, options),
    getPageRanges: (options?: PageBlobGetPageRangesOptionalParams) =>
      getPageRanges(context, options),
    uploadPagesFromUrl: (
      sourceUrl: string,
      sourceRange: string,
      contentLength: number,
      range: string,
      options?: PageBlobUploadPagesFromUrlOptionalParams,
    ) => uploadPagesFromUrl(context, sourceUrl, sourceRange, contentLength, range, options),
    clearPages: (range: string, options?: PageBlobClearPagesOptionalParams) =>
      clearPages(context, range, options),
    uploadPages: (
      body: Uint8Array,
      contentLength: number,
      range: string,
      options?: PageBlobUploadPagesOptionalParams,
    ) => uploadPages(context, body, contentLength, range, options),
    create: (size: number, options?: PageBlobCreateOptionalParams) =>
      create(context, size, options),
  };
}

export function _getPageBlobOperations(context: BlobContext): PageBlobOperations {
  return {
    ..._getPageBlob(context),
  };
}
