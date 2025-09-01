// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createCompute, ComputeContext, ComputeClientOptionalParams } from "./api/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  SpotPlacementScoresOperations,
  _getSpotPlacementScoresOperations,
} from "./classic/spotPlacementScores/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { ComputeClientOptionalParams } from "./api/computeContext.js";

export class ComputeClient {
  private _client: ComputeContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The Compute Recommender Resource Provider Client */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ComputeClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createCompute(credential, subscriptionId, {
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
