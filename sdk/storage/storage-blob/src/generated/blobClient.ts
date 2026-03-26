// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlobContext, BlobClientOptionalParams, createBlob } from "./api/index.js";
import { AppendBlobOperations, _getAppendBlobOperations } from "./classic/appendBlob/index.js";
import { BlobOperations, _getBlobOperations } from "./classic/blob/index.js";
import { BlockBlobOperations, _getBlockBlobOperations } from "./classic/blockBlob/index.js";
import { ContainerOperations, _getContainerOperations } from "./classic/container/index.js";
import { PageBlobOperations, _getPageBlobOperations } from "./classic/pageBlob/index.js";
import { ServiceOperations, _getServiceOperations } from "./classic/service/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { BlobClientOptionalParams } from "./api/blobContext.js";

export class BlobClient {
  private _client: BlobContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: BlobClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createBlob(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.pageBlob = _getPageBlobOperations(this._client);
    this.blockBlob = _getBlockBlobOperations(this._client);
    this.appendBlob = _getAppendBlobOperations(this._client);
    this.blob = _getBlobOperations(this._client);
    this.container = _getContainerOperations(this._client);
    this.service = _getServiceOperations(this._client);
  }

  /** The operation groups for pageBlob */
  public readonly pageBlob: PageBlobOperations;
  /** The operation groups for blockBlob */
  public readonly blockBlob: BlockBlobOperations;
  /** The operation groups for appendBlob */
  public readonly appendBlob: AppendBlobOperations;
  /** The operation groups for blob */
  public readonly blob: BlobOperations;
  /** The operation groups for container */
  public readonly container: ContainerOperations;
  /** The operation groups for service */
  public readonly service: ServiceOperations;
}
