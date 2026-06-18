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
import { CopyStatus, PageList, SequenceNumberActionType } from "../../models/models.js";
import { StorageCompatResponseInfo } from "../../static-helpers/storageCompatResponse.js";

/** Interface representing a PageBlob operations. */
export interface PageBlobOperations {
  /** Copies a snapshot of the source page blob to a destination page blob. The snapshot is copied such that only the differential changes between the previously copied snapshot are transferred to the destination. */
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
  /** Updates the sequence number of the specified page blob. The operation will fail if the specified sequence number is less than the current sequence number of the blob. */
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
  /** Changes the size of the specified page blob. */
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
  /** Returns the list of page ranges in the diff between the specified page blob and the specified previous snapshot. */
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
  /** Returns the list of valid page ranges for the specified page blob. */
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
  /** Writes a range of pages to the specified page blob where the contents are read from a URL. */
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
  /** Clears a range of pages from the specified page blob. */
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
  /** Writes a range of pages to the specified page blob. */
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
  /** Creates a new page blob. */
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
