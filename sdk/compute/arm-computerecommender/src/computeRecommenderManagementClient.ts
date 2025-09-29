// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ComputeRecommenderManagementContext,
  ComputeRecommenderManagementClientOptionalParams,
} from "./api/index.js";
import { createComputeRecommenderManagement } from "./api/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { SpotPlacementScoresOperations } from "./classic/spotPlacementScores/index.js";
import { _getSpotPlacementScoresOperations } from "./classic/spotPlacementScores/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { ComputeRecommenderManagementClientOptionalParams } from "./api/computeRecommenderManagementContext.js";

export class ComputeRecommenderManagementClient {
  private _client: ComputeRecommenderManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The Compute Recommender Resource Provider Client */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ComputeRecommenderManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createComputeRecommenderManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.spotPlacementScores = _getSpotPlacementScoresOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for spotPlacementScores */
  public readonly spotPlacementScores: SpotPlacementScoresOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
