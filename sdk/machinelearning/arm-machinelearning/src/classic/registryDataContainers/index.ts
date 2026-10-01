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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  delete: (
    resourceGroupName: string,
    registryName: string,
    name: string,
    options?: RegistryDataContainersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    registryName: string,
    name: string,
    options?: RegistryDataContainersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    registryName: string,
    name: string,
    options?: RegistryDataContainersDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update container. */
  createOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    name: string,
    body: DataContainer,
    options?: RegistryDataContainersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DataContainer>, DataContainer>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    name: string,
    body: DataContainer,
    options?: RegistryDataContainersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DataContainer>, DataContainer>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    registryName: string,
    name: string,
    body: DataContainer,
    options?: RegistryDataContainersCreateOrUpdateOptionalParams,
  ) => Promise<DataContainer>;
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
    beginDelete: async (
      resourceGroupName: string,
      registryName: string,
      name: string,
      options?: RegistryDataContainersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, registryName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      registryName: string,
      name: string,
      options?: RegistryDataContainersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, registryName, name, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      registryName: string,
      name: string,
      body: DataContainer,
      options?: RegistryDataContainersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, registryName, name, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      registryName: string,
      name: string,
      body: DataContainer,
      options?: RegistryDataContainersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, registryName, name, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      registryName: string,
      name: string,
      body: DataContainer,
      options?: RegistryDataContainersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, registryName, name, body, options);
    },
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
