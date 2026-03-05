// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlobContext } from "../../api/blobContext.js";
import {
  query,
  getBlockList,
  commitBlockList,
  stageBlockFromUrl,
  stageBlock,
  uploadBlobFromUrl,
  upload,
} from "../../api/blockBlob/operations.js";
import {
  BlockBlobQueryOptionalParams,
  BlockBlobGetBlockListOptionalParams,
  BlockBlobCommitBlockListOptionalParams,
  BlockBlobStageBlockFromUrlOptionalParams,
  BlockBlobStageBlockOptionalParams,
  BlockBlobUploadBlobFromUrlOptionalParams,
  BlockBlobUploadOptionalParams,
} from "../../api/blockBlob/options.js";
import {
  LeaseStatus,
  LeaseState,
  LeaseDuration,
  BlobType,
  CopyStatus,
  BlockLookupList,
  BlockList,
  QueryRequest,
  BlockListType,
} from "../../models/azure/storage/blobs/models.js";
import { StorageCompatResponseInfo } from "../../static-helpers/storageCompatResponse.js";

/** Interface representing a BlockBlob operations. */
export interface BlockBlobOperations {
  /** The Query operation enables users to select/project on blob data by providing simple query expressions. */
  query: (
    queryRequest: QueryRequest,
    options?: BlockBlobQueryOptionalParams,
  ) => Promise<
    {
      lastModified: Date;
      contentLength: number;
      contentRange: string;
      etag: string;
      contentMD5: Uint8Array;
      contentEncoding: string;
      cacheControl: string;
      contentDisposition: string;
      contentLanguage: string;
      blobSequenceNumber: number;
      blobType?: BlobType;
      contentCrc64?: Uint8Array;
      copyCompletionTime?: Date;
      copyStatusDescription?: string;
      copyId?: string;
      copyProgress?: string;
      copySource?: string;
      copyStatus?: CopyStatus;
      leaseDuration?: LeaseDuration;
      leaseState?: LeaseState;
      leaseStatus?: LeaseStatus;
      acceptRanges?: string;
      blobCommittedBlockCount?: number;
      isServerEncrypted?: boolean;
      encryptionKeySha256?: string;
      encryptionScope?: string;
      blobContentMD5?: Uint8Array;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
      contentType: "application/octet-stream";
    } & Uint8Array &
      StorageCompatResponseInfo<
        Uint8Array,
        {
          lastModified: Date;
          contentLength: number;
          contentRange: string;
          etag: string;
          contentMD5: Uint8Array;
          contentEncoding: string;
          cacheControl: string;
          contentDisposition: string;
          contentLanguage: string;
          blobSequenceNumber: number;
          blobType?: BlobType;
          contentCrc64?: Uint8Array;
          copyCompletionTime?: Date;
          copyStatusDescription?: string;
          copyId?: string;
          copyProgress?: string;
          copySource?: string;
          copyStatus?: CopyStatus;
          leaseDuration?: LeaseDuration;
          leaseState?: LeaseState;
          leaseStatus?: LeaseStatus;
          acceptRanges?: string;
          blobCommittedBlockCount?: number;
          isServerEncrypted?: boolean;
          encryptionKeySha256?: string;
          encryptionScope?: string;
          blobContentMD5?: Uint8Array;
          date: Date;
          version: string;
          requestId?: string;
          clientRequestId?: string;
          contentType: "application/octet-stream";
        }
      >
  >;
  /** The Get Block List operation retrieves the list of blocks that have been uploaded as part of a block blob. */
  getBlockList: (
    listType: BlockListType,
    options?: BlockBlobGetBlockListOptionalParams,
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
    } & BlockList &
      StorageCompatResponseInfo<
        BlockList,
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
  /** The Commit Block List operation writes a blob by specifying the list of block IDs that make up the blob. In order to be written as part of a blob, a block must have been successfully written to the server in a prior Put Block operation. You can call Put Block List to update a blob by uploading only those blocks that have changed, then committing the new and existing blocks together. You can do this by specifying whether to commit a block from the committed block list or from the uncommitted block list, or to commit the most recently uploaded version of the block, whichever list it may belong to. */
  commitBlockList: (
    blocks: BlockLookupList,
    options?: BlockBlobCommitBlockListOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      contentMD5: Uint8Array;
      contentCrc64?: Uint8Array;
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
        contentCrc64?: Uint8Array;
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
  /** The Stage Block From URL operation creates a new block to be committed as part of a blob where the contents are read from a URL. */
  stageBlockFromUrl: (
    blockId: Uint8Array,
    contentLength: number,
    sourceUrl: string,
    options?: BlockBlobStageBlockFromUrlOptionalParams,
  ) => Promise<
    {
      contentMD5: Uint8Array;
      contentCrc64?: Uint8Array;
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
        contentMD5: Uint8Array;
        contentCrc64?: Uint8Array;
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
  /** The Stage Block operation creates a new block to be committed as part of a blob */
  stageBlock: (
    blockId: Uint8Array,
    contentLength: number,
    body: Uint8Array,
    options?: BlockBlobStageBlockOptionalParams,
  ) => Promise<
    {
      contentMD5: Uint8Array;
      contentCrc64?: Uint8Array;
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
        contentMD5: Uint8Array;
        contentCrc64?: Uint8Array;
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
  /** The Put Blob from URL operation creates a new Block Blob where the contents of the blob are read from a given URL.  This API is supported beginning with the 2020-04-08 version. Partial updates are not supported with Put Blob from URL; the content of an existing blob is overwritten with the content of the new blob.  To perform partial updates to a block blob’s contents using a source URL, use the Put Block from URL API in conjunction with Put Block List. */
  uploadBlobFromUrl: (
    copySource: string,
    options?: BlockBlobUploadBlobFromUrlOptionalParams,
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
  /** The Upload Block Blob operation updates the content of an existing block blob. Updating an existing block blob overwrites any existing metadata on the blob. Partial updates are not supported with Put Blob; the content of the existing blob is overwritten with the content of the new blob. To perform a partial update of the content of a block blob, use the Put Block List operation. */
  upload: (
    body: Uint8Array,
    contentLength: number,
    options?: BlockBlobUploadOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      contentMD5: Uint8Array;
      versionId: string;
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
        versionId: string;
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
}

function _getBlockBlob(context: BlobContext) {
  return {
    query: (queryRequest: QueryRequest, options?: BlockBlobQueryOptionalParams) =>
      query(context, queryRequest, options),
    getBlockList: (listType: BlockListType, options?: BlockBlobGetBlockListOptionalParams) =>
      getBlockList(context, listType, options),
    commitBlockList: (blocks: BlockLookupList, options?: BlockBlobCommitBlockListOptionalParams) =>
      commitBlockList(context, blocks, options),
    stageBlockFromUrl: (
      blockId: Uint8Array,
      contentLength: number,
      sourceUrl: string,
      options?: BlockBlobStageBlockFromUrlOptionalParams,
    ) => stageBlockFromUrl(context, blockId, contentLength, sourceUrl, options),
    stageBlock: (
      blockId: Uint8Array,
      contentLength: number,
      body: Uint8Array,
      options?: BlockBlobStageBlockOptionalParams,
    ) => stageBlock(context, blockId, contentLength, body, options),
    uploadBlobFromUrl: (copySource: string, options?: BlockBlobUploadBlobFromUrlOptionalParams) =>
      uploadBlobFromUrl(context, copySource, options),
    upload: (body: Uint8Array, contentLength: number, options?: BlockBlobUploadOptionalParams) =>
      upload(context, body, contentLength, options),
  };
}

export function _getBlockBlobOperations(context: BlobContext): BlockBlobOperations {
  return {
    ..._getBlockBlob(context),
  };
}
