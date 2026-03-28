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
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    registryName: string,
    componentName: string,
    version: string,
    options?: RegistryComponentVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update version. */
  createOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    componentName: string,
    version: string,
    body: ComponentVersion,
    options?: RegistryComponentVersionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ComponentVersion>, ComponentVersion>;
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
