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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  delete: (
    resourceGroupName: string,
    registryName: string,
    codeName: string,
    options?: RegistryCodeContainersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    registryName: string,
    codeName: string,
    options?: RegistryCodeContainersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    registryName: string,
    codeName: string,
    options?: RegistryCodeContainersDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update Code container. */
  createOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    codeName: string,
    body: CodeContainer,
    options?: RegistryCodeContainersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CodeContainer>, CodeContainer>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    codeName: string,
    body: CodeContainer,
    options?: RegistryCodeContainersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CodeContainer>, CodeContainer>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    registryName: string,
    codeName: string,
    body: CodeContainer,
    options?: RegistryCodeContainersCreateOrUpdateOptionalParams,
  ) => Promise<CodeContainer>;
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
    beginDelete: async (
      resourceGroupName: string,
      registryName: string,
      codeName: string,
      options?: RegistryCodeContainersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, registryName, codeName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      registryName: string,
      codeName: string,
      options?: RegistryCodeContainersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, registryName, codeName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      registryName: string,
      codeName: string,
      body: CodeContainer,
      options?: RegistryCodeContainersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, registryName, codeName, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      registryName: string,
      codeName: string,
      body: CodeContainer,
      options?: RegistryCodeContainersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        registryName,
        codeName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      registryName: string,
      codeName: string,
      body: CodeContainer,
      options?: RegistryCodeContainersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        registryName,
        codeName,
        body,
        options,
      );
    },
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
