// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  listKeys,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/batchEndpoints/operations.js";
import type {
  BatchEndpointsListKeysOptionalParams,
  BatchEndpointsListOptionalParams,
  BatchEndpointsDeleteOptionalParams,
  BatchEndpointsUpdateOptionalParams,
  BatchEndpointsCreateOrUpdateOptionalParams,
  BatchEndpointsGetOptionalParams,
} from "../../api/batchEndpoints/options.js";
import type {
  BatchEndpoint,
  EndpointAuthKeys,
  PartialMinimalTrackedResourceWithIdentity,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BatchEndpoints operations. */
export interface BatchEndpointsOperations {
  /** Lists batch Inference Endpoint keys. */
  listKeys: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: BatchEndpointsListKeysOptionalParams,
  ) => Promise<EndpointAuthKeys>;
  /** Lists Batch inference endpoint in the workspace. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: BatchEndpointsListOptionalParams,
  ) => PagedAsyncIterableIterator<BatchEndpoint>;
  /** Delete Batch Inference Endpoint (asynchronous). */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: BatchEndpointsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a batch inference endpoint (asynchronous). */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: PartialMinimalTrackedResourceWithIdentity,
    options?: BatchEndpointsUpdateOptionalParams,
  ) => PollerLike<OperationState<BatchEndpoint>, BatchEndpoint>;
  /** Creates a batch inference endpoint (asynchronous). */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: BatchEndpoint,
    options?: BatchEndpointsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BatchEndpoint>, BatchEndpoint>;
  /** Gets a batch inference endpoint by name. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: BatchEndpointsGetOptionalParams,
  ) => Promise<BatchEndpoint>;
}

function _getBatchEndpoints(context: AzureMachineLearningServicesManagementContext) {
  return {
    listKeys: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      options?: BatchEndpointsListKeysOptionalParams,
    ) => listKeys(context, resourceGroupName, workspaceName, endpointName, options),
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: BatchEndpointsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      options?: BatchEndpointsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, endpointName, options),
    update: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      body: PartialMinimalTrackedResourceWithIdentity,
      options?: BatchEndpointsUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, endpointName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      body: BatchEndpoint,
      options?: BatchEndpointsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, endpointName, body, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      options?: BatchEndpointsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, endpointName, options),
  };
}

export function _getBatchEndpointsOperations(
  context: AzureMachineLearningServicesManagementContext,
): BatchEndpointsOperations {
  return {
    ..._getBatchEndpoints(context),
  };
}
