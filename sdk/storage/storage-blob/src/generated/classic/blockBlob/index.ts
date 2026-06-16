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
  BlockBlobQueryResponse,
} from "../../models/models.js";
import { StorageCompatResponseInfo } from "../../static-helpers/storageCompatResponse.js";

/** Interface representing a BlockBlob operations. */
export interface BlockBlobOperations {
  /** Queries the data of the specified blob with the provided query expressions. */
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
    } & BlockBlobQueryResponse &
      StorageCompatResponseInfo<
        BlockBlobQueryResponse,
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
  /** Retrieves the list of blocks that have been uploaded as part of the block blob. */
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
  /** Writes to the block blob by specifying the list of block IDs that make up the blob. */
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
  /** Creates a new block of data from the specified URL to be committed as part of a blob. */
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
  /** Creates a new block of data to be committed as part of a blob. */
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
  /** Uploads the content from the specified URL to the block blob. If the blob already exists, the data and any existing metadata will be overwritten. */
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
  /** Uploads the content to the specified block blob. If the blob already exists, the data and any existing metadata will be overwritten. */
  upload: (
    body: Uint8Array,
    contentLength: number,
    options?: BlockBlobUploadOptionalParams,
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
