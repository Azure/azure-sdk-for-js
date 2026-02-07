// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createAppendBlob, AppendBlobContext, AppendBlobOptionalParams } from "./api/index.js";
import { seal, appendBlockFromUrl, appendBlock, create } from "./api/operations.js";
import {
  SealOptionalParams,
  AppendBlockFromUrlOptionalParams,
  AppendBlockOptionalParams,
  CreateOptionalParams,
} from "./api/options.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { AppendBlobOptionalParams } from "./api/appendBlobContext.js";

export class AppendBlob {
  private _client: AppendBlobContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: AppendBlobOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAppendBlob(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** The Seal operation seals the Append Blob to make it read-only. Seal is supported only on version 2019-12-12 version or later. */
  seal(
    options: SealOptionalParams = { requestOptions: {} },
  ): Promise<{
    etag: string;
    lastModified: Date;
    isSealed?: boolean;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  }> {
    return seal(this._client, options);
  }

  /** The Append Block From URL operation creates a new block to be committed as part of an append blob where the contents are read from a URL. */
  appendBlockFromUrl(
    sourceUrl: string,
    contentLength: number,
    options: AppendBlockFromUrlOptionalParams = { requestOptions: {} },
  ): Promise<{
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
  }> {
    return appendBlockFromUrl(this._client, sourceUrl, contentLength, options);
  }

  /** The Append Block operation commits a new block of data to the end of an append blob. */
  appendBlock(
    body: Uint8Array,
    contentLength: number,
    options: AppendBlockOptionalParams = { requestOptions: {} },
  ): Promise<{
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
  }> {
    return appendBlock(this._client, body, contentLength, options);
  }

  /** The Create operation creates a new append blob. */
  create(
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
    return create(this._client, options);
  }
}
