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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: BatchEndpointsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: BatchEndpointsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: BatchEndpointsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a batch inference endpoint (asynchronous). */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: PartialMinimalTrackedResourceWithIdentity,
    options?: BatchEndpointsUpdateOptionalParams,
  ) => PollerLike<OperationState<BatchEndpoint>, BatchEndpoint>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: PartialMinimalTrackedResourceWithIdentity,
    options?: BatchEndpointsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BatchEndpoint>, BatchEndpoint>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: PartialMinimalTrackedResourceWithIdentity,
    options?: BatchEndpointsUpdateOptionalParams,
  ) => Promise<BatchEndpoint>;
  /** Creates a batch inference endpoint (asynchronous). */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: BatchEndpoint,
    options?: BatchEndpointsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BatchEndpoint>, BatchEndpoint>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: BatchEndpoint,
    options?: BatchEndpointsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BatchEndpoint>, BatchEndpoint>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: BatchEndpoint,
    options?: BatchEndpointsCreateOrUpdateOptionalParams,
  ) => Promise<BatchEndpoint>;
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
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      options?: BatchEndpointsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, workspaceName, endpointName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      options?: BatchEndpointsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, workspaceName, endpointName, options);
    },
    update: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      body: PartialMinimalTrackedResourceWithIdentity,
      options?: BatchEndpointsUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, endpointName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      body: PartialMinimalTrackedResourceWithIdentity,
      options?: BatchEndpointsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, workspaceName, endpointName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      body: PartialMinimalTrackedResourceWithIdentity,
      options?: BatchEndpointsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, workspaceName, endpointName, body, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      body: BatchEndpoint,
      options?: BatchEndpointsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, endpointName, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      body: BatchEndpoint,
      options?: BatchEndpointsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        endpointName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      body: BatchEndpoint,
      options?: BatchEndpointsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        endpointName,
        body,
        options,
      );
    },
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
