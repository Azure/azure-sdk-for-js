// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/registryEnvironmentVersions/operations.js";
import type {
  RegistryEnvironmentVersionsListOptionalParams,
  RegistryEnvironmentVersionsDeleteOptionalParams,
  RegistryEnvironmentVersionsCreateOrUpdateOptionalParams,
  RegistryEnvironmentVersionsGetOptionalParams,
} from "../../api/registryEnvironmentVersions/options.js";
import type { EnvironmentVersion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RegistryEnvironmentVersions operations. */
export interface RegistryEnvironmentVersionsOperations {
  /** List versions. */
  list: (
    resourceGroupName: string,
    registryName: string,
    environmentName: string,
    options?: RegistryEnvironmentVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<EnvironmentVersion>;
  /** Delete version. */
  delete: (
    resourceGroupName: string,
    registryName: string,
    environmentName: string,
    version: string,
    options?: RegistryEnvironmentVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    registryName: string,
    environmentName: string,
    version: string,
    options?: RegistryEnvironmentVersionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    registryName: string,
    environmentName: string,
    version: string,
    options?: RegistryEnvironmentVersionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update version. */
  createOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    environmentName: string,
    version: string,
    body: EnvironmentVersion,
    options?: RegistryEnvironmentVersionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EnvironmentVersion>, EnvironmentVersion>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    environmentName: string,
    version: string,
    body: EnvironmentVersion,
    options?: RegistryEnvironmentVersionsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EnvironmentVersion>, EnvironmentVersion>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    registryName: string,
    environmentName: string,
    version: string,
    body: EnvironmentVersion,
    options?: RegistryEnvironmentVersionsCreateOrUpdateOptionalParams,
  ) => Promise<EnvironmentVersion>;
  /** Get version. */
  get: (
    resourceGroupName: string,
    registryName: string,
    environmentName: string,
    version: string,
    options?: RegistryEnvironmentVersionsGetOptionalParams,
  ) => Promise<EnvironmentVersion>;
}

function _getRegistryEnvironmentVersions(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      registryName: string,
      environmentName: string,
      options?: RegistryEnvironmentVersionsListOptionalParams,
    ) => list(context, resourceGroupName, registryName, environmentName, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      environmentName: string,
      version: string,
      options?: RegistryEnvironmentVersionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, environmentName, version, options),
    beginDelete: async (
      resourceGroupName: string,
      registryName: string,
      environmentName: string,
      version: string,
      options?: RegistryEnvironmentVersionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        registryName,
        environmentName,
        version,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      registryName: string,
      environmentName: string,
      version: string,
      options?: RegistryEnvironmentVersionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        registryName,
        environmentName,
        version,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      registryName: string,
      environmentName: string,
      version: string,
      body: EnvironmentVersion,
      options?: RegistryEnvironmentVersionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        registryName,
        environmentName,
        version,
        body,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      registryName: string,
      environmentName: string,
      version: string,
      body: EnvironmentVersion,
      options?: RegistryEnvironmentVersionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        registryName,
        environmentName,
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
      environmentName: string,
      version: string,
      body: EnvironmentVersion,
      options?: RegistryEnvironmentVersionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        registryName,
        environmentName,
        version,
        body,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      registryName: string,
      environmentName: string,
      version: string,
      options?: RegistryEnvironmentVersionsGetOptionalParams,
    ) => get(context, resourceGroupName, registryName, environmentName, version, options),
  };
}

export function _getRegistryEnvironmentVersionsOperations(
  context: AzureMachineLearningServicesManagementContext,
): RegistryEnvironmentVersionsOperations {
  return {
    ..._getRegistryEnvironmentVersions(context),
  };
}
