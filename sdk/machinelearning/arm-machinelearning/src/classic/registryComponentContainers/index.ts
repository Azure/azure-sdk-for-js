// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/registryComponentContainers/operations.js";
import type {
  RegistryComponentContainersListOptionalParams,
  RegistryComponentContainersDeleteOptionalParams,
  RegistryComponentContainersCreateOrUpdateOptionalParams,
  RegistryComponentContainersGetOptionalParams,
} from "../../api/registryComponentContainers/options.js";
import type { ComponentContainer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RegistryComponentContainers operations. */
export interface RegistryComponentContainersOperations {
  /** List containers. */
  list: (
    resourceGroupName: string,
    registryName: string,
    options?: RegistryComponentContainersListOptionalParams,
  ) => PagedAsyncIterableIterator<ComponentContainer>;
  /** Delete container. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    registryName: string,
    componentName: string,
    options?: RegistryComponentContainersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update container. */
  createOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    componentName: string,
    body: ComponentContainer,
    options?: RegistryComponentContainersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ComponentContainer>, ComponentContainer>;
  /** Get container. */
  get: (
    resourceGroupName: string,
    registryName: string,
    componentName: string,
    options?: RegistryComponentContainersGetOptionalParams,
  ) => Promise<ComponentContainer>;
}

function _getRegistryComponentContainers(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      registryName: string,
      options?: RegistryComponentContainersListOptionalParams,
    ) => list(context, resourceGroupName, registryName, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      componentName: string,
      options?: RegistryComponentContainersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, componentName, options),
    createOrUpdate: (
      resourceGroupName: string,
      registryName: string,
      componentName: string,
      body: ComponentContainer,
      options?: RegistryComponentContainersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, registryName, componentName, body, options),
    get: (
      resourceGroupName: string,
      registryName: string,
      componentName: string,
      options?: RegistryComponentContainersGetOptionalParams,
    ) => get(context, resourceGroupName, registryName, componentName, options),
  };
}

export function _getRegistryComponentContainersOperations(
  context: AzureMachineLearningServicesManagementContext,
): RegistryComponentContainersOperations {
  return {
    ..._getRegistryComponentContainers(context),
  };
}
