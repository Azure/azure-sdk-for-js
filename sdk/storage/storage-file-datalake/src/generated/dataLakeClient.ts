// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataLakeContext, DataLakeClientOptionalParams, createDataLake } from "./api/index.js";
import { FileSystemOperations, _getFileSystemOperations } from "./classic/fileSystem/index.js";
import { PathOperations, _getPathOperations } from "./classic/path/index.js";
import { ServiceOperations, _getServiceOperations } from "./classic/service/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { DataLakeClientOptionalParams } from "./api/dataLakeContext.js";

export class DataLakeClient {
  private _client: DataLakeContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: DataLakeClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createDataLake(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.path = _getPathOperations(this._client);
    this.fileSystem = _getFileSystemOperations(this._client);
    this.service = _getServiceOperations(this._client);
  }

  /** The operation groups for path */
  public readonly path: PathOperations;
  /** The operation groups for fileSystem */
  public readonly fileSystem: FileSystemOperations;
  /** The operation groups for service */
  public readonly service: ServiceOperations;
}
