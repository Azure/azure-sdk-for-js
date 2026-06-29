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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  delete: (
    resourceGroupName: string,
    registryName: string,
    componentName: string,
    options?: RegistryComponentContainersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    registryName: string,
    componentName: string,
    options?: RegistryComponentContainersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    registryName: string,
    componentName: string,
    options?: RegistryComponentContainersDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update container. */
  createOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    componentName: string,
    body: ComponentContainer,
    options?: RegistryComponentContainersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ComponentContainer>, ComponentContainer>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    componentName: string,
    body: ComponentContainer,
    options?: RegistryComponentContainersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ComponentContainer>, ComponentContainer>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    registryName: string,
    componentName: string,
    body: ComponentContainer,
    options?: RegistryComponentContainersCreateOrUpdateOptionalParams,
  ) => Promise<ComponentContainer>;
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
    beginDelete: async (
      resourceGroupName: string,
      registryName: string,
      componentName: string,
      options?: RegistryComponentContainersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, registryName, componentName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      registryName: string,
      componentName: string,
      options?: RegistryComponentContainersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, registryName, componentName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      registryName: string,
      componentName: string,
      body: ComponentContainer,
      options?: RegistryComponentContainersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, registryName, componentName, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      registryName: string,
      componentName: string,
      body: ComponentContainer,
      options?: RegistryComponentContainersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        registryName,
        componentName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      registryName: string,
      componentName: string,
      body: ComponentContainer,
      options?: RegistryComponentContainersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        registryName,
        componentName,
        body,
        options,
      );
    },
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
