// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FabricContext, FabricClientOptionalParams } from "./api/index.js";
import { createFabric } from "./api/index.js";
import type { FabricCapacitiesOperations } from "./classic/fabricCapacities/index.js";
import { _getFabricCapacitiesOperations } from "./classic/fabricCapacities/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { FabricClientOptionalParams } from "./api/fabricContext.js";

export class FabricClient {
  private _client: FabricContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: FabricClientOptionalParams = {},
  ) {
    this._client = createFabric(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.operations = _getOperationsOperations(this._client);
    this.fabricCapacities = _getFabricCapacitiesOperations(this._client);
  }

  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for fabricCapacities */
  public readonly fabricCapacities: FabricCapacitiesOperations;
}
