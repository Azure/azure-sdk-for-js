// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import {
  calculateCost,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/customAIModels/operations.js";
import type {
  CustomAIModelsCalculateCostOptionalParams,
  CustomAIModelsListOptionalParams,
  CustomAIModelsDeleteOptionalParams,
  CustomAIModelsCreateOrUpdateOptionalParams,
  CustomAIModelsGetOptionalParams,
} from "../../api/customAIModels/options.js";
import type { CalculateCostResponse, CustomAIModel } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CustomAIModels operations. */
export interface CustomAIModelsOperations {
  /** Returns a ranked list of GPU SKU pricing plans for deploying this custom model in the target region, each annotated with feasibility and per-replica hourly cost. Feasibility is determined by region availability, GPU quota, and model architecture fit (verified at registration time). `servingPerformanceEstimation` is omitted for custom models. No Azure or Kubernetes resources are provisioned. */
  calculateCost: (
    resourceGroupName: string,
    aiManagerName: string,
    customAIModelName: string,
    options?: CustomAIModelsCalculateCostOptionalParams,
  ) => Promise<CalculateCostResponse>;
  /** List CustomAIModel resources by AIManager */
  list: (
    resourceGroupName: string,
    aiManagerName: string,
    options?: CustomAIModelsListOptionalParams,
  ) => PagedAsyncIterableIterator<CustomAIModel>;
  /** Delete a CustomAIModel */
  delete: (
    resourceGroupName: string,
    aiManagerName: string,
    customAIModelName: string,
    options?: CustomAIModelsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update a `CustomAIModel`. This is a full-replace operation: any optional property omitted from the request body is reset to its default value, or cleared if it has no default. To safely modify a subset of fields (e.g. `description`), perform a GET, modify the returned resource, and PUT it back using the returned ETag via the `If-Match` header. A PUT that changes the immutable `modelId` or `modelSourceResourceId` is rejected. */
  createOrUpdate: (
    resourceGroupName: string,
    aiManagerName: string,
    customAIModelName: string,
    resource: CustomAIModel,
    options?: CustomAIModelsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CustomAIModel>, CustomAIModel>;
  /** Get a CustomAIModel */
  get: (
    resourceGroupName: string,
    aiManagerName: string,
    customAIModelName: string,
    options?: CustomAIModelsGetOptionalParams,
  ) => Promise<CustomAIModel>;
}

function _getCustomAIModels(context: ContainerServiceContext) {
  return {
    calculateCost: (
      resourceGroupName: string,
      aiManagerName: string,
      customAIModelName: string,
      options?: CustomAIModelsCalculateCostOptionalParams,
    ) => calculateCost(context, resourceGroupName, aiManagerName, customAIModelName, options),
    list: (
      resourceGroupName: string,
      aiManagerName: string,
      options?: CustomAIModelsListOptionalParams,
    ) => list(context, resourceGroupName, aiManagerName, options),
    delete: (
      resourceGroupName: string,
      aiManagerName: string,
      customAIModelName: string,
      options?: CustomAIModelsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, aiManagerName, customAIModelName, options),
    createOrUpdate: (
      resourceGroupName: string,
      aiManagerName: string,
      customAIModelName: string,
      resource: CustomAIModel,
      options?: CustomAIModelsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        aiManagerName,
        customAIModelName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      aiManagerName: string,
      customAIModelName: string,
      options?: CustomAIModelsGetOptionalParams,
    ) => get(context, resourceGroupName, aiManagerName, customAIModelName, options),
  };
}

export function _getCustomAIModelsOperations(
  context: ContainerServiceContext,
): CustomAIModelsOperations {
  return {
    ..._getCustomAIModels(context),
  };
}
