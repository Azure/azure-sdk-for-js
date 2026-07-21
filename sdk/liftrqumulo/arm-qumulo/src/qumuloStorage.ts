// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { QumuloStorageContext, QumuloStorageOptionalParams } from "./api/index.js";
import { createQumuloStorage } from "./api/index.js";
import type { FileSystemsOperations } from "./classic/fileSystems/index.js";
import { _getFileSystemsOperations } from "./classic/fileSystems/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { QumuloStorageOptionalParams } from "./api/qumuloStorageContext.js";

export class QumuloStorage {
  private _client: QumuloStorageContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: QumuloStorageOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createQumuloStorage(credential, subscriptionId, {
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
