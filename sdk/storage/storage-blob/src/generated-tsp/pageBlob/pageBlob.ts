// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPageBlob, PageBlobContext, PageBlobOptionalParams } from "./api/index.js";
import {
  CopyStatus,
  PageRange,
  ClearRange,
  SequenceNumberActionType,
} from "../models/azure/storage/blobs/models.js";
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
} from "./api/operations.js";
import {
  CopyIncrementalOptionalParams,
  SetSequenceNumberOptionalParams,
  ResizeOptionalParams,
  GetPageRangesDiffOptionalParams,
  GetPageRangesOptionalParams,
  UploadPagesFromUrlOptionalParams,
  ClearPagesOptionalParams,
  UploadPagesOptionalParams,
  CreateOptionalParams,
} from "./api/options.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { PageBlobOptionalParams } from "./api/pageBlobContext.js";

export class PageBlob {
  private _client: PageBlobContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: PageBlobOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createPageBlob(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** The Copy Incremental operation copies a snapshot of the source page blob to a destination page blob. The snapshot is copied such that only the differential changes between the previously copied snapshot are transferred to the destination. The copied snapshots are complete copies of the original snapshot and can be read or copied from as usual. This API is supported since REST version 2016-05-31. */
  copyIncremental(
    copySource: string,
    options: CopyIncrementalOptionalParams = { requestOptions: {} },
  ): Promise<{
    etag: string;
    lastModified: Date;
    copyId?: string;
    copyStatus?: CopyStatus;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  }> {
    return copyIncremental(this._client, copySource, options);
  }

  /** The Update Sequence Number operation sets the blob's sequence number. The operation will fail if the specified sequence number is less than the current sequence number of the blob. */
  setSequenceNumber(
    sequenceNumberAction: SequenceNumberActionType,
    options: SetSequenceNumberOptionalParams = { requestOptions: {} },
  ): Promise<{
    etag: string;
    lastModified: Date;
    blobSequenceNumber: number;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  }> {
    return setSequenceNumber(this._client, sequenceNumberAction, options);
  }

  /** The Resize operation increases the size of the page blob to the specified size. */
  resize(
    size: number,
    options: ResizeOptionalParams = { requestOptions: {} },
  ): Promise<{
    etag: string;
    lastModified: Date;
    blobSequenceNumber: number;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  }> {
    return resize(this._client, size, options);
  }

  /** The Get Page Ranges Diff operation returns the list of valid page ranges for a page blob or snapshot of a page blob. */
  getPageRangesDiff(options: GetPageRangesDiffOptionalParams = { requestOptions: {} }): Promise<{
    pageRange?: PageRange[];
    clearRange?: ClearRange[];
    nextMarker?: string;
    lastModified: Date;
    etag: string;
    blobContentLength?: number;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/xml";
  }> {
    return getPageRangesDiff(this._client, options);
  }

  /** The Get Page Ranges operation returns the list of valid page ranges for a page blob or snapshot of a page blob. */
  getPageRanges(options: GetPageRangesOptionalParams = { requestOptions: {} }): Promise<{
    pageRange?: PageRange[];
    clearRange?: ClearRange[];
    nextMarker?: string;
    lastModified: Date;
    etag: string;
    blobContentLength?: number;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/xml";
  }> {
    return getPageRanges(this._client, options);
  }

  /** The Upload Pages operation writes a range of pages to a page blob where the contents are read from a URL. */
  uploadPagesFromUrl(
    sourceUrl: string,
    sourceRange: string,
    contentLength: number,
    range: string,
    options: UploadPagesFromUrlOptionalParams = { requestOptions: {} },
  ): Promise<{
    etag: string;
    lastModified: Date;
    contentMd5: Uint8Array;
    contentCrc64?: Uint8Array;
    blobSequenceNumber: number;
    isServerEncrypted?: boolean;
    encryptionKeySha256?: string;
    encryptionScope?: string;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  }> {
    return uploadPagesFromUrl(this._client, sourceUrl, sourceRange, contentLength, range, options);
  }

  /** The Clear Pages operation clears a range of pages from a page blob */
  clearPages(
    range: string,
    options: ClearPagesOptionalParams = { requestOptions: {} },
  ): Promise<{
    etag: string;
    lastModified: Date;
    contentMd5: Uint8Array;
    contentCrc64?: Uint8Array;
    blobSequenceNumber: number;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  }> {
    return clearPages(this._client, range, options);
  }

  /** The Upload Pages operation writes a range of pages to a page blob */
  uploadPages(
    body: Uint8Array,
    contentLength: number,
    range: string,
    options: UploadPagesOptionalParams = { requestOptions: {} },
  ): Promise<{
    etag: string;
    lastModified: Date;
    contentMd5: Uint8Array;
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
  }> {
    return uploadPages(this._client, body, contentLength, range, options);
  }

  /** The Create operation creates a new page blob. */
  create(
    size: number,
    options: CreateOptionalParams = { requestOptions: {} },
  ): Promise<{
    etag: string;
    lastModified: Date;
    contentMd5: Uint8Array;
    versionId: string;
    isServerEncrypted?: boolean;
    encryptionKeySha256?: string;
    encryptionScope?: string;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  }> {
    return create(this._client, size, options);
  }
}
