// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/registryEnvironmentContainers/operations.js";
import {
  RegistryEnvironmentContainersListOptionalParams,
  RegistryEnvironmentContainersDeleteOptionalParams,
  RegistryEnvironmentContainersCreateOrUpdateOptionalParams,
  RegistryEnvironmentContainersGetOptionalParams,
} from "../../api/registryEnvironmentContainers/options.js";
import { EnvironmentContainer } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RegistryEnvironmentContainers operations. */
export interface RegistryEnvironmentContainersOperations {
  /** List environment containers. */
  list: (
    resourceGroupName: string,
    registryName: string,
    options?: RegistryEnvironmentContainersListOptionalParams,
  ) => PagedAsyncIterableIterator<EnvironmentContainer>;
  /** Delete container. */
  delete: (
    resourceGroupName: string,
    registryName: string,
    environmentName: string,
    options?: RegistryEnvironmentContainersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update container. */
  createOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    environmentName: string,
    body: EnvironmentContainer,
    options?: RegistryEnvironmentContainersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EnvironmentContainer>, EnvironmentContainer>;
  /** Get container. */
  get: (
    resourceGroupName: string,
    registryName: string,
    environmentName: string,
    options?: RegistryEnvironmentContainersGetOptionalParams,
  ) => Promise<EnvironmentContainer>;
}

function _getRegistryEnvironmentContainers(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      registryName: string,
      options?: RegistryEnvironmentContainersListOptionalParams,
    ) => list(context, resourceGroupName, registryName, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      environmentName: string,
      options?: RegistryEnvironmentContainersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, environmentName, options),
    createOrUpdate: (
      resourceGroupName: string,
      registryName: string,
      environmentName: string,
      body: EnvironmentContainer,
      options?: RegistryEnvironmentContainersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, registryName, environmentName, body, options),
    get: (
      resourceGroupName: string,
      registryName: string,
      environmentName: string,
      options?: RegistryEnvironmentContainersGetOptionalParams,
    ) => get(context, resourceGroupName, registryName, environmentName, options),
  };
}

export function _getRegistryEnvironmentContainersOperations(
  context: AzureMachineLearningServicesManagementContext,
): RegistryEnvironmentContainersOperations {
  return {
    ..._getRegistryEnvironmentContainers(context),
  };
}
