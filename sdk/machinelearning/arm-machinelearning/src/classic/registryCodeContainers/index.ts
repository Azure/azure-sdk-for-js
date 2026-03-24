// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/registryCodeContainers/operations.js";
import type {
  RegistryCodeContainersListOptionalParams,
  RegistryCodeContainersDeleteOptionalParams,
  RegistryCodeContainersCreateOrUpdateOptionalParams,
  RegistryCodeContainersGetOptionalParams,
} from "../../api/registryCodeContainers/options.js";
import type { CodeContainer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RegistryCodeContainers operations. */
export interface RegistryCodeContainersOperations {
  /** List containers. */
  list: (
    resourceGroupName: string,
    registryName: string,
    options?: RegistryCodeContainersListOptionalParams,
  ) => PagedAsyncIterableIterator<CodeContainer>;
  /** Delete Code container. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    registryName: string,
    codeName: string,
    options?: RegistryCodeContainersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update Code container. */
  createOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    codeName: string,
    body: CodeContainer,
    options?: RegistryCodeContainersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CodeContainer>, CodeContainer>;
  /** Get Code container. */
  get: (
    resourceGroupName: string,
    registryName: string,
    codeName: string,
    options?: RegistryCodeContainersGetOptionalParams,
  ) => Promise<CodeContainer>;
}

function _getRegistryCodeContainers(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      registryName: string,
      options?: RegistryCodeContainersListOptionalParams,
    ) => list(context, resourceGroupName, registryName, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      codeName: string,
      options?: RegistryCodeContainersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, codeName, options),
    createOrUpdate: (
      resourceGroupName: string,
      registryName: string,
      codeName: string,
      body: CodeContainer,
      options?: RegistryCodeContainersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, registryName, codeName, body, options),
    get: (
      resourceGroupName: string,
      registryName: string,
      codeName: string,
      options?: RegistryCodeContainersGetOptionalParams,
    ) => get(context, resourceGroupName, registryName, codeName, options),
  };
}

export function _getRegistryCodeContainersOperations(
  context: AzureMachineLearningServicesManagementContext,
): RegistryCodeContainersOperations {
  return {
    ..._getRegistryCodeContainers(context),
  };
}
