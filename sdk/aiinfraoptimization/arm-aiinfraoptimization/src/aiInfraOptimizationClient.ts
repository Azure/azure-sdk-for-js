// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AIInfraOptimizationContext,
  AIInfraOptimizationClientOptionalParams,
} from "./api/index.js";
import { createAIInfraOptimization } from "./api/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { RecommendationsOperations } from "./classic/recommendations/index.js";
import { _getRecommendationsOperations } from "./classic/recommendations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { AIInfraOptimizationClientOptionalParams } from "./api/aiInfraOptimizationContext.js";

export class AIInfraOptimizationClient {
  private _client: AIInfraOptimizationContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft.AIInfraOptimization Resource Provider management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: AIInfraOptimizationClientOptionalParams = {},
  ) {
    this._client = createAIInfraOptimization(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.recommendations = _getRecommendationsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for recommendations */
  public readonly recommendations: RecommendationsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
