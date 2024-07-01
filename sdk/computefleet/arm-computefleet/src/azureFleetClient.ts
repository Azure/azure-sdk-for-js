// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";
import {
  getOperationsOperations,
  OperationsOperations,
} from "./classic/operations/index.js";
import {
  getFleetsOperations,
  FleetsOperations,
} from "./classic/fleets/index.js";
import {
  createAzureFleet,
  AzureFleetClientOptions,
  AzureFleetContext,
} from "./api/index.js";

export { AzureFleetClientOptions } from "./api/azureFleetContext.js";

export class AzureFleetClient {
  private _client: AzureFleetContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: AzureFleetClientOptions = {},
  ) {
    this._client = createAzureFleet(credential, options);
    this.pipeline = this._client.pipeline;
    this.operations = getOperationsOperations(this._client);
    this.fleets = getFleetsOperations(this._client, subscriptionId);
  }

  /** The operation groups for Operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for Fleets */
  public readonly fleets: FleetsOperations;
}
