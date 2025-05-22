// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createAzureFleet,
  AzureFleetContext,
  AzureFleetClientOptionalParams,
} from "./api/index.js";
import { FleetsOperations, _getFleetsOperations } from "./classic/fleets/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { AzureFleetClientOptionalParams } from "./api/azureFleetContext.js";

export class AzureFleetClient {
  private _client: AzureFleetContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: AzureFleetClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAzureFleet(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.fleets = _getFleetsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for fleets */
  public readonly fleets: FleetsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
