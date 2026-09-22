// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/registryEnvironmentContainers/operations.js";
import type {
  RegistryEnvironmentContainersListOptionalParams,
  RegistryEnvironmentContainersDeleteOptionalParams,
  RegistryEnvironmentContainersCreateOrUpdateOptionalParams,
  RegistryEnvironmentContainersGetOptionalParams,
} from "../../api/registryEnvironmentContainers/options.js";
import type { EnvironmentContainer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    registryName: string,
    environmentName: string,
    options?: RegistryEnvironmentContainersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    registryName: string,
    environmentName: string,
    options?: RegistryEnvironmentContainersDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update container. */
  createOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    environmentName: string,
    body: EnvironmentContainer,
    options?: RegistryEnvironmentContainersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EnvironmentContainer>, EnvironmentContainer>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    environmentName: string,
    body: EnvironmentContainer,
    options?: RegistryEnvironmentContainersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EnvironmentContainer>, EnvironmentContainer>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    registryName: string,
    environmentName: string,
    body: EnvironmentContainer,
    options?: RegistryEnvironmentContainersCreateOrUpdateOptionalParams,
  ) => Promise<EnvironmentContainer>;
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
    beginDelete: async (
      resourceGroupName: string,
      registryName: string,
      environmentName: string,
      options?: RegistryEnvironmentContainersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, registryName, environmentName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      registryName: string,
      environmentName: string,
      options?: RegistryEnvironmentContainersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, registryName, environmentName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      registryName: string,
      environmentName: string,
      body: EnvironmentContainer,
      options?: RegistryEnvironmentContainersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, registryName, environmentName, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      registryName: string,
      environmentName: string,
      body: EnvironmentContainer,
      options?: RegistryEnvironmentContainersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        registryName,
        environmentName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      registryName: string,
      environmentName: string,
      body: EnvironmentContainer,
      options?: RegistryEnvironmentContainersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        registryName,
        environmentName,
        body,
        options,
      );
    },
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
