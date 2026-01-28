// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createBlockBlob, BlockBlobContext, BlockBlobOptionalParams } from "./api/index.js";
import {
  BlockLookupList,
  BlockList,
  QueryRequest,
  BlockListType,
} from "../models/azure/storage/blobs/models.js";
import {
  query,
  getBlockList,
  commitBlockList,
  stageBlockFromUrl,
  stageBlock,
  uploadBlobFromUrl,
  upload,
} from "./api/operations.js";
import {
  QueryOptionalParams,
  GetBlockListOptionalParams,
  CommitBlockListOptionalParams,
  StageBlockFromUrlOptionalParams,
  StageBlockOptionalParams,
  UploadBlobFromUrlOptionalParams,
  UploadOptionalParams,
} from "./api/options.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { BlockBlobOptionalParams } from "./api/blockBlobContext.js";

export class BlockBlob {
  private _client: BlockBlobContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: BlockBlobOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createBlockBlob(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** The Query operation enables users to select/project on blob data by providing simple query expressions. */
  query(
    queryRequest: QueryRequest,
    options: QueryOptionalParams = { requestOptions: {} },
  ): Promise<Uint8Array> {
    return query(this._client, queryRequest, options);
  }

  /** The Get Block List operation retrieves the list of blocks that have been uploaded as part of a block blob. */
  getBlockList(
    listType: BlockListType,
    options: GetBlockListOptionalParams = { requestOptions: {} },
  ): Promise<BlockList> {
    return getBlockList(this._client, listType, options);
  }

  /** The Commit Block List operation writes a blob by specifying the list of block IDs that make up the blob. In order to be written as part of a blob, a block must have been successfully written to the server in a prior Put Block operation. You can call Put Block List to update a blob by uploading only those blocks that have changed, then committing the new and existing blocks together. You can do this by specifying whether to commit a block from the committed block list or from the uncommitted block list, or to commit the most recently uploaded version of the block, whichever list it may belong to. */
  commitBlockList(
    blocks: BlockLookupList,
    options: CommitBlockListOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return commitBlockList(this._client, blocks, options);
  }

  /** The Stage Block From URL operation creates a new block to be committed as part of a blob where the contents are read from a URL. */
  stageBlockFromUrl(
    blockId: Uint8Array,
    contentLength: number,
    sourceUrl: string,
    options: StageBlockFromUrlOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return stageBlockFromUrl(this._client, blockId, contentLength, sourceUrl, options);
  }

  /** The Stage Block operation creates a new block to be committed as part of a blob */
  stageBlock(
    blockId: Uint8Array,
    contentLength: number,
    body: Uint8Array,
    options: StageBlockOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return stageBlock(this._client, blockId, contentLength, body, options);
  }

  /** The Put Blob from URL operation creates a new Block Blob where the contents of the blob are read from a given URL.  This API is supported beginning with the 2020-04-08 version. Partial updates are not supported with Put Blob from URL; the content of an existing blob is overwritten with the content of the new blob.  To perform partial updates to a block blob’s contents using a source URL, use the Put Block from URL API in conjunction with Put Block List. */
  uploadBlobFromUrl(
    copySource: string,
    options: UploadBlobFromUrlOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return uploadBlobFromUrl(this._client, copySource, options);
  }

  /** The Upload Block Blob operation updates the content of an existing block blob. Updating an existing block blob overwrites any existing metadata on the blob. Partial updates are not supported with Put Blob; the content of the existing blob is overwritten with the content of the new blob. To perform a partial update of the content of a block blob, use the Put Block List operation. */
  upload(
    body: Uint8Array,
    contentLength: number,
    options: UploadOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return upload(this._client, body, contentLength, options);
  }
}
