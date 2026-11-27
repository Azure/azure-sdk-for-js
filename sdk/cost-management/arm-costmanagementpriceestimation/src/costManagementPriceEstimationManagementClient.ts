// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CostManagementPriceEstimationManagementContext,
  CostManagementPriceEstimationManagementClientOptionalParams,
} from "./api/index.js";
import { createCostManagementPriceEstimationManagement } from "./api/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PriceEstimationOperations } from "./classic/priceEstimation/index.js";
import { _getPriceEstimationOperations } from "./classic/priceEstimation/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { CostManagementPriceEstimationManagementClientOptionalParams } from "./api/costManagementPriceEstimationManagementContext.js";

export class CostManagementPriceEstimationManagementClient {
  private _client: CostManagementPriceEstimationManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Estimates prices for proposed configurations using subscription-applicable prices. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: CostManagementPriceEstimationManagementClientOptionalParams = {},
  ) {
    this._client = createCostManagementPriceEstimationManagement(
      credential,
      subscriptionId,
      options,
    );
    this.pipeline = this._client.pipeline;
    this.priceEstimation = _getPriceEstimationOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for priceEstimation */
  public readonly priceEstimation: PriceEstimationOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
