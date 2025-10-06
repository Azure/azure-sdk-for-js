// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageDiscoveryContext, StorageDiscoveryClientOptionalParams } from "./api/index.js";
import { createStorageDiscovery } from "./api/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { StorageDiscoveryWorkspacesOperations } from "./classic/storageDiscoveryWorkspaces/index.js";
import { _getStorageDiscoveryWorkspacesOperations } from "./classic/storageDiscoveryWorkspaces/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { StorageDiscoveryClientOptionalParams } from "./api/storageDiscoveryContext.js";

export class StorageDiscoveryClient {
  private _client: StorageDiscoveryContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The Azure Storage Discovery Management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: StorageDiscoveryClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createStorageDiscovery(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operations = _getOperationsOperations(this._client);
    this.storageDiscoveryWorkspaces = _getStorageDiscoveryWorkspacesOperations(this._client);
  }

  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for storageDiscoveryWorkspaces */
  public readonly storageDiscoveryWorkspaces: StorageDiscoveryWorkspacesOperations;
}
