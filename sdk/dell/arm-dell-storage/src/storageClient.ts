// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createStorage,
  StorageContext,
  StorageClientOptionalParams,
} from "./api/index.js";
import {
  FileSystemsOperations,
  _getFileSystemsOperations,
} from "./classic/fileSystems/index.js";
import {
  OperationsOperations,
  _getOperationsOperations,
} from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { StorageClientOptionalParams } from "./api/storageContext.js";

export class StorageClient {
  private _client: StorageContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Dell Storage service */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: StorageClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createStorage(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.fileSystems = _getFileSystemsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for fileSystems */
  public readonly fileSystems: FileSystemsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
