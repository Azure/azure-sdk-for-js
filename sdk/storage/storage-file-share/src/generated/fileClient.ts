// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileContext, FileClientOptionalParams, createFile } from "./api/index.js";
import { DirectoryOperations, _getDirectoryOperations } from "./classic/directory/index.js";
import { FileOperations, _getFileOperations } from "./classic/file/index.js";
import { ServiceOperations, _getServiceOperations } from "./classic/service/index.js";
import { ShareOperations, _getShareOperations } from "./classic/share/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { FileClientOptionalParams } from "./api/fileContext.js";

export class FileClient {
  private _client: FileContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure File Storage provides scalable file shares in the cloud using SMB and NFS protocols. */
  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: FileClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createFile(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.file = _getFileOperations(this._client);
    this.directory = _getDirectoryOperations(this._client);
    this.share = _getShareOperations(this._client);
    this.service = _getServiceOperations(this._client);
  }

  /** The operation groups for file */
  public readonly file: FileOperations;
  /** The operation groups for directory */
  public readonly directory: DirectoryOperations;
  /** The operation groups for share */
  public readonly share: ShareOperations;
  /** The operation groups for service */
  public readonly service: ServiceOperations;
}
