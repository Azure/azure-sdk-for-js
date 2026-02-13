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

/** Interface representing a AppendBlob operations. */
export interface AppendBlobOperations {
  /** The Seal operation seals the Append Blob to make it read-only. Seal is supported only on version 2019-12-12 version or later. */
  seal: (
    options?: AppendBlobSealOptionalParams,
  ) => Promise<{
    etag: string;
    lastModified: Date;
    isSealed?: boolean;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  }>;
  /** The Append Block From URL operation creates a new block to be committed as part of an append blob where the contents are read from a URL. */
  appendBlockFromUrl: (
    sourceUrl: string,
    contentLength: number,
    options?: AppendBlobAppendBlockFromUrlOptionalParams,
  ) => Promise<{
    etag: string;
    lastModified: Date;
    contentMd5: Uint8Array;
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
  }>;
  /** The Append Block operation commits a new block of data to the end of an append blob. */
  appendBlock: (
    body: Uint8Array,
    contentLength: number,
    options?: AppendBlobAppendBlockOptionalParams,
  ) => Promise<{
    etag: string;
    lastModified: Date;
    contentMd5: Uint8Array;
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
  }>;
  /** The Create operation creates a new append blob. */
  create: (
    options?: AppendBlobCreateOptionalParams,
  ) => Promise<{
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
  }>;
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
