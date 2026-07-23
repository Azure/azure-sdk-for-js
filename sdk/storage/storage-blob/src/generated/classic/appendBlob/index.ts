// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlobContext } from "../../api/blobContext.js";
import { seal, appendBlockFromUrl, appendBlock, create } from "../../api/appendBlob/operations.js";
import {
  AppendBlobSealOptionalParams,
  AppendBlobAppendBlockFromUrlOptionalParams,
  AppendBlobAppendBlockOptionalParams,
  AppendBlobCreateOptionalParams,
} from "../../api/appendBlob/options.js";
import { StorageCompatResponseInfo } from "../../static-helpers/storageCompatResponse.js";

/** Interface representing a AppendBlob operations. */
export interface AppendBlobOperations {
  /** Seals the append blob to make it read-only. */
  seal: (
    options?: AppendBlobSealOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      isSealed?: boolean;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        isSealed?: boolean;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Uploads a new block of data from the specified URL to the end of an append blob. */
  appendBlockFromUrl: (
    sourceUrl: string,
    contentLength: number,
    options?: AppendBlobAppendBlockFromUrlOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      contentMD5: Uint8Array;
      contentCrc64?: Uint8Array;
      blobAppendOffset?: string;
      blobCommittedBlockCount?: number;
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
        blobAppendOffset?: string;
        blobCommittedBlockCount?: number;
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
  /** Uploads a new block of data to the end of an append blob. */
  appendBlock: (
    body: Uint8Array,
    contentLength: number,
    options?: AppendBlobAppendBlockOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      contentMD5: Uint8Array;
      contentCrc64?: Uint8Array;
      blobAppendOffset?: string;
      blobCommittedBlockCount?: number;
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
        blobAppendOffset?: string;
        blobCommittedBlockCount?: number;
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
  /** Creates a new append blob. */
  create: (
    options?: AppendBlobCreateOptionalParams,
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

function _getAppendBlob(context: BlobContext) {
  return {
    seal: (options?: AppendBlobSealOptionalParams) => seal(context, options),
    appendBlockFromUrl: (
      sourceUrl: string,
      contentLength: number,
      options?: AppendBlobAppendBlockFromUrlOptionalParams,
    ) => appendBlockFromUrl(context, sourceUrl, contentLength, options),
    appendBlock: (
      body: Uint8Array,
      contentLength: number,
      options?: AppendBlobAppendBlockOptionalParams,
    ) => appendBlock(context, body, contentLength, options),
    create: (options?: AppendBlobCreateOptionalParams) => create(context, options),
  };
}

export function _getAppendBlobOperations(context: BlobContext): AppendBlobOperations {
  return {
    ..._getAppendBlob(context),
  };
}
