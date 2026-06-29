// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/registryModelContainers/operations.js";
import type {
  RegistryModelContainersListOptionalParams,
  RegistryModelContainersDeleteOptionalParams,
  RegistryModelContainersCreateOrUpdateOptionalParams,
  RegistryModelContainersGetOptionalParams,
} from "../../api/registryModelContainers/options.js";
import type { ModelContainer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RegistryModelContainers operations. */
export interface RegistryModelContainersOperations {
  /** List model containers. */
  list: (
    resourceGroupName: string,
    registryName: string,
    options?: RegistryModelContainersListOptionalParams,
  ) => PagedAsyncIterableIterator<ModelContainer>;
  /** Delete container. */
  delete: (
    resourceGroupName: string,
    registryName: string,
    modelName: string,
    options?: RegistryModelContainersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    registryName: string,
    modelName: string,
    options?: RegistryModelContainersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    registryName: string,
    modelName: string,
    options?: RegistryModelContainersDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update model container. */
  createOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    modelName: string,
    body: ModelContainer,
    options?: RegistryModelContainersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ModelContainer>, ModelContainer>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    modelName: string,
    body: ModelContainer,
    options?: RegistryModelContainersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ModelContainer>, ModelContainer>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    registryName: string,
    modelName: string,
    body: ModelContainer,
    options?: RegistryModelContainersCreateOrUpdateOptionalParams,
  ) => Promise<ModelContainer>;
  /** Get container. */
  get: (
    resourceGroupName: string,
    registryName: string,
    modelName: string,
    options?: RegistryModelContainersGetOptionalParams,
  ) => Promise<ModelContainer>;
}

function _getRegistryModelContainers(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      registryName: string,
      options?: RegistryModelContainersListOptionalParams,
    ) => list(context, resourceGroupName, registryName, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      modelName: string,
      options?: RegistryModelContainersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, modelName, options),
    beginDelete: async (
      resourceGroupName: string,
      registryName: string,
      modelName: string,
      options?: RegistryModelContainersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, registryName, modelName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      registryName: string,
      modelName: string,
      options?: RegistryModelContainersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, registryName, modelName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      registryName: string,
      modelName: string,
      body: ModelContainer,
      options?: RegistryModelContainersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, registryName, modelName, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      registryName: string,
      modelName: string,
      body: ModelContainer,
      options?: RegistryModelContainersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        registryName,
        modelName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      registryName: string,
      modelName: string,
      body: ModelContainer,
      options?: RegistryModelContainersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        registryName,
        modelName,
        body,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      registryName: string,
      modelName: string,
      options?: RegistryModelContainersGetOptionalParams,
    ) => get(context, resourceGroupName, registryName, modelName, options),
  };
}

export function _getRegistryModelContainersOperations(
  context: AzureMachineLearningServicesManagementContext,
): RegistryModelContainersOperations {
  return {
    ..._getRegistryModelContainers(context),
  };
}
