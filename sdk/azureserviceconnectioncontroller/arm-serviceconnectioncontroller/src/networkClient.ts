// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkContext, NetworkClientOptionalParams } from "./api/index.js";
import { createNetwork } from "./api/index.js";
import type { AzureServiceConnectionControllersOperations } from "./classic/azureServiceConnectionControllers/index.js";
import { _getAzureServiceConnectionControllersOperations } from "./classic/azureServiceConnectionControllers/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { NetworkClientOptionalParams } from "./api/networkContext.js";

export class NetworkClient {
  private _client: NetworkContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft.Network Resource Provider management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: NetworkClientOptionalParams = {},
  ) {
    this._client = createNetwork(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.azureServiceConnectionControllers = _getAzureServiceConnectionControllersOperations(
      this._client,
    );
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for azureServiceConnectionControllers */
  public readonly azureServiceConnectionControllers: AzureServiceConnectionControllersOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
