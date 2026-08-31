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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    endpointName: string,
    options?: InferenceEndpointsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    endpointName: string,
    options?: InferenceEndpointsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update InferenceEndpoint (asynchronous). */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    endpointName: string,
    body: Record<string, any>,
    options?: InferenceEndpointsUpdateOptionalParams,
  ) => PollerLike<OperationState<InferenceEndpoint>, InferenceEndpoint>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    endpointName: string,
    body: Record<string, any>,
    options?: InferenceEndpointsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<InferenceEndpoint>, InferenceEndpoint>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    endpointName: string,
    body: Record<string, any>,
    options?: InferenceEndpointsUpdateOptionalParams,
  ) => Promise<InferenceEndpoint>;
  /** Create or update InferenceEndpoint (asynchronous). */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    endpointName: string,
    body: InferenceEndpoint,
    options?: InferenceEndpointsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<InferenceEndpoint>, InferenceEndpoint>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    endpointName: string,
    body: InferenceEndpoint,
    options?: InferenceEndpointsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<InferenceEndpoint>, InferenceEndpoint>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    endpointName: string,
    body: InferenceEndpoint,
    options?: InferenceEndpointsCreateOrUpdateOptionalParams,
  ) => Promise<InferenceEndpoint>;
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
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      endpointName: string,
      options?: InferenceEndpointsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        workspaceName,
        poolName,
        endpointName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      endpointName: string,
      options?: InferenceEndpointsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        workspaceName,
        poolName,
        endpointName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      endpointName: string,
      body: Record<string, any>,
      options?: InferenceEndpointsUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, poolName, endpointName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      endpointName: string,
      body: Record<string, any>,
      options?: InferenceEndpointsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        workspaceName,
        poolName,
        endpointName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      endpointName: string,
      body: Record<string, any>,
      options?: InferenceEndpointsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        workspaceName,
        poolName,
        endpointName,
        body,
        options,
      );
    },
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
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      endpointName: string,
      body: InferenceEndpoint,
      options?: InferenceEndpointsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        poolName,
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
      poolName: string,
      endpointName: string,
      body: InferenceEndpoint,
      options?: InferenceEndpointsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        poolName,
        endpointName,
        body,
        options,
      );
    },
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
