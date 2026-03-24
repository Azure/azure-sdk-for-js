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
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    registryName: string,
    modelName: string,
    options?: RegistryModelContainersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update model container. */
  createOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    modelName: string,
    body: ModelContainer,
    options?: RegistryModelContainersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ModelContainer>, ModelContainer>;
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
    createOrUpdate: (
      resourceGroupName: string,
      registryName: string,
      modelName: string,
      body: ModelContainer,
      options?: RegistryModelContainersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, registryName, modelName, body, options),
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
