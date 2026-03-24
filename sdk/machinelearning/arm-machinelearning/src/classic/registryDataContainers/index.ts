// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/registryDataContainers/operations.js";
import type {
  RegistryDataContainersListOptionalParams,
  RegistryDataContainersDeleteOptionalParams,
  RegistryDataContainersCreateOrUpdateOptionalParams,
  RegistryDataContainersGetOptionalParams,
} from "../../api/registryDataContainers/options.js";
import type { DataContainer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RegistryDataContainers operations. */
export interface RegistryDataContainersOperations {
  /** List Data containers. */
  list: (
    resourceGroupName: string,
    registryName: string,
    options?: RegistryDataContainersListOptionalParams,
  ) => PagedAsyncIterableIterator<DataContainer>;
  /** Delete container. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    registryName: string,
    name: string,
    options?: RegistryDataContainersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update container. */
  createOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    name: string,
    body: DataContainer,
    options?: RegistryDataContainersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DataContainer>, DataContainer>;
  /** Get container. */
  get: (
    resourceGroupName: string,
    registryName: string,
    name: string,
    options?: RegistryDataContainersGetOptionalParams,
  ) => Promise<DataContainer>;
}

function _getRegistryDataContainers(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      registryName: string,
      options?: RegistryDataContainersListOptionalParams,
    ) => list(context, resourceGroupName, registryName, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      name: string,
      options?: RegistryDataContainersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, name, options),
    createOrUpdate: (
      resourceGroupName: string,
      registryName: string,
      name: string,
      body: DataContainer,
      options?: RegistryDataContainersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, registryName, name, body, options),
    get: (
      resourceGroupName: string,
      registryName: string,
      name: string,
      options?: RegistryDataContainersGetOptionalParams,
    ) => get(context, resourceGroupName, registryName, name, options),
  };
}

export function _getRegistryDataContainersOperations(
  context: AzureMachineLearningServicesManagementContext,
): RegistryDataContainersOperations {
  return {
    ..._getRegistryDataContainers(context),
  };
}
