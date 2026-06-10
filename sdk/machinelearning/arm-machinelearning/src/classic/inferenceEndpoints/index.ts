// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/inferenceEndpoints/operations.js";
import type {
  InferenceEndpointsListOptionalParams,
  InferenceEndpointsDeleteOptionalParams,
  InferenceEndpointsUpdateOptionalParams,
  InferenceEndpointsCreateOrUpdateOptionalParams,
  InferenceEndpointsGetOptionalParams,
} from "../../api/inferenceEndpoints/options.js";
import type { InferenceEndpoint } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a InferenceEndpoints operations. */
export interface InferenceEndpointsOperations {
  /** List Inference Endpoints. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    options?: InferenceEndpointsListOptionalParams,
  ) => PagedAsyncIterableIterator<InferenceEndpoint>;
  /** Delete InferenceEndpoint (asynchronous). */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    endpointName: string,
    options?: InferenceEndpointsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update InferenceEndpoint (asynchronous). */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    endpointName: string,
    options?: InferenceEndpointsUpdateOptionalParams,
  ) => PollerLike<OperationState<InferenceEndpoint>, InferenceEndpoint>;
  /** Create or update InferenceEndpoint (asynchronous). */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    endpointName: string,
    body: InferenceEndpoint,
    options?: InferenceEndpointsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<InferenceEndpoint>, InferenceEndpoint>;
  /** Get InferenceEndpoint. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    endpointName: string,
    options?: InferenceEndpointsGetOptionalParams,
  ) => Promise<InferenceEndpoint>;
}

function _getInferenceEndpoints(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      options?: InferenceEndpointsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, poolName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      endpointName: string,
      options?: InferenceEndpointsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, poolName, endpointName, options),
    update: (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      endpointName: string,
      options?: InferenceEndpointsUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, poolName, endpointName, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      endpointName: string,
      body: InferenceEndpoint,
      options?: InferenceEndpointsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        poolName,
        endpointName,
        body,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      endpointName: string,
      options?: InferenceEndpointsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, poolName, endpointName, options),
  };
}

export function _getInferenceEndpointsOperations(
  context: AzureMachineLearningServicesManagementContext,
): InferenceEndpointsOperations {
  return {
    ..._getInferenceEndpoints(context),
  };
}
