// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import { calculateCost, list, get } from "../../api/aiModels/operations.js";
import type {
  AIModelsCalculateCostOptionalParams,
  AIModelsListOptionalParams,
  AIModelsGetOptionalParams,
} from "../../api/aiModels/options.js";
import type { AIModel, CalculateCostRequest, CalculateCostResponse } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AIModels operations. */
export interface AIModelsOperations {
  /** Returns a ranked list of GPU SKU pricing plans for deploying this model in the target region, each annotated with feasibility, per-replica hourly cost, and estimated relative performance. No Azure or Kubernetes resources are provisioned. */
  calculateCost: (
    location: string,
    aiModelName: string,
    body: CalculateCostRequest,
    options?: AIModelsCalculateCostOptionalParams,
  ) => Promise<CalculateCostResponse>;
  /** List AIModel resources by SubscriptionLocationResource */
  list: (
    location: string,
    options?: AIModelsListOptionalParams,
  ) => PagedAsyncIterableIterator<AIModel>;
  /** Get a AIModel */
  get: (
    location: string,
    aiModelName: string,
    options?: AIModelsGetOptionalParams,
  ) => Promise<AIModel>;
}
function _getAIModels(context: ContainerServiceContext) {
  return {
    calculateCost: (
      location: string,
      aiModelName: string,
      body: CalculateCostRequest,
      options?: AIModelsCalculateCostOptionalParams,
    ) => calculateCost(context, location, aiModelName, body, options),
    list: (location: string, options?: AIModelsListOptionalParams) =>
      list(context, location, options),
    get: (location: string, aiModelName: string, options?: AIModelsGetOptionalParams) =>
      get(context, location, aiModelName, options),
  };
}
export function _getAIModelsOperations(context: ContainerServiceContext): AIModelsOperations {
  return {
    ..._getAIModels(context),
  };
}
