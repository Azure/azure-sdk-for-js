// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/registryComponentVersions/operations.js";
import type {
  RegistryComponentVersionsListOptionalParams,
  RegistryComponentVersionsDeleteOptionalParams,
  RegistryComponentVersionsCreateOrUpdateOptionalParams,
  RegistryComponentVersionsGetOptionalParams,
} from "../../api/registryComponentVersions/options.js";
import type { ComponentVersion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RegistryComponentVersions operations. */
export interface RegistryComponentVersionsOperations {
  /** List versions. */
  list: (
    resourceGroupName: string,
    registryName: string,
    componentName: string,
    options?: RegistryComponentVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<ComponentVersion>;
  /** Delete version. */
  delete: (
    resourceGroupName: string,
    registryName: string,
    componentName: string,
    version: string,
    options?: RegistryComponentVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    registryName: string,
    componentName: string,
    version: string,
    options?: RegistryComponentVersionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    registryName: string,
    componentName: string,
    version: string,
    options?: RegistryComponentVersionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update version. */
  createOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    componentName: string,
    version: string,
    body: ComponentVersion,
    options?: RegistryComponentVersionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ComponentVersion>, ComponentVersion>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    componentName: string,
    version: string,
    body: ComponentVersion,
    options?: RegistryComponentVersionsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ComponentVersion>, ComponentVersion>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    registryName: string,
    componentName: string,
    version: string,
    body: ComponentVersion,
    options?: RegistryComponentVersionsCreateOrUpdateOptionalParams,
  ) => Promise<ComponentVersion>;
  /** Get version. */
  get: (
    resourceGroupName: string,
    registryName: string,
    componentName: string,
    version: string,
    options?: RegistryComponentVersionsGetOptionalParams,
  ) => Promise<ComponentVersion>;
}

function _getRegistryComponentVersions(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      registryName: string,
      componentName: string,
      options?: RegistryComponentVersionsListOptionalParams,
    ) => list(context, resourceGroupName, registryName, componentName, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      componentName: string,
      version: string,
      options?: RegistryComponentVersionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, componentName, version, options),
    beginDelete: async (
      resourceGroupName: string,
      registryName: string,
      componentName: string,
      version: string,
      options?: RegistryComponentVersionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        registryName,
        componentName,
        version,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      registryName: string,
      componentName: string,
      version: string,
      options?: RegistryComponentVersionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        registryName,
        componentName,
        version,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      registryName: string,
      componentName: string,
      version: string,
      body: ComponentVersion,
      options?: RegistryComponentVersionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        registryName,
        componentName,
        version,
        body,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      registryName: string,
      componentName: string,
      version: string,
      body: ComponentVersion,
      options?: RegistryComponentVersionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        registryName,
        componentName,
        version,
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
      version: string,
      body: ComponentVersion,
      options?: RegistryComponentVersionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        registryName,
        componentName,
        version,
        body,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      registryName: string,
      componentName: string,
      version: string,
      options?: RegistryComponentVersionsGetOptionalParams,
    ) => get(context, resourceGroupName, registryName, componentName, version, options),
  };
}

export function _getRegistryComponentVersionsOperations(
  context: AzureMachineLearningServicesManagementContext,
): RegistryComponentVersionsOperations {
  return {
    ..._getRegistryComponentVersions(context),
  };
}
