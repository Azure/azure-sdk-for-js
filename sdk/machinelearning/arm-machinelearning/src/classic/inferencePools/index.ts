// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { list, $delete, update, createOrUpdate, get } from "../../api/inferencePools/operations.js";
import type {
  InferencePoolsListOptionalParams,
  InferencePoolsDeleteOptionalParams,
  InferencePoolsUpdateOptionalParams,
  InferencePoolsCreateOrUpdateOptionalParams,
  InferencePoolsGetOptionalParams,
} from "../../api/inferencePools/options.js";
import type {
  InferencePool,
  PartialMinimalTrackedResourceWithSkuAndIdentity,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a InferencePools operations. */
export interface InferencePoolsOperations {
  /** List InferencePools. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: InferencePoolsListOptionalParams,
  ) => PagedAsyncIterableIterator<InferencePool>;
  /** Delete InferencePool (asynchronous). */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    inferencePoolName: string,
    options?: InferencePoolsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update InferencePool (asynchronous). */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    inferencePoolName: string,
    body: PartialMinimalTrackedResourceWithSkuAndIdentity,
    options?: InferencePoolsUpdateOptionalParams,
  ) => PollerLike<OperationState<InferencePool>, InferencePool>;
  /** Create or update InferencePool (asynchronous). */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    inferencePoolName: string,
    body: InferencePool,
    options?: InferencePoolsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<InferencePool>, InferencePool>;
  /** Get InferencePool. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    inferencePoolName: string,
    options?: InferencePoolsGetOptionalParams,
  ) => Promise<InferencePool>;
}

function _getInferencePools(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: InferencePoolsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      inferencePoolName: string,
      options?: InferencePoolsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, inferencePoolName, options),
    update: (
      resourceGroupName: string,
      workspaceName: string,
      inferencePoolName: string,
      body: PartialMinimalTrackedResourceWithSkuAndIdentity,
      options?: InferencePoolsUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, inferencePoolName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      inferencePoolName: string,
      body: InferencePool,
      options?: InferencePoolsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, workspaceName, inferencePoolName, body, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      inferencePoolName: string,
      options?: InferencePoolsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, inferencePoolName, options),
  };
}

export function _getInferencePoolsOperations(
  context: AzureMachineLearningServicesManagementContext,
): InferencePoolsOperations {
  return {
    ..._getInferencePools(context),
  };
}
