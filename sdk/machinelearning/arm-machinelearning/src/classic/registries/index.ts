// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  removeRegions,
  listBySubscription,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/registries/operations.js";
import type {
  RegistriesRemoveRegionsOptionalParams,
  RegistriesListBySubscriptionOptionalParams,
  RegistriesListOptionalParams,
  RegistriesDeleteOptionalParams,
  RegistriesUpdateOptionalParams,
  RegistriesCreateOrUpdateOptionalParams,
  RegistriesGetOptionalParams,
} from "../../api/registries/options.js";
import type { Registry, PartialRegistryPartialTrackedResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Registries operations. */
export interface RegistriesOperations {
  /** Remove regions from registry */
  removeRegions: (
    resourceGroupName: string,
    registryName: string,
    body: Registry,
    options?: RegistriesRemoveRegionsOptionalParams,
  ) => PollerLike<OperationState<Registry>, Registry>;
  /** List registries by subscription */
  listBySubscription: (
    options?: RegistriesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Registry>;
  /** List registries */
  list: (
    resourceGroupName: string,
    options?: RegistriesListOptionalParams,
  ) => PagedAsyncIterableIterator<Registry>;
  /** Delete registry */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    registryName: string,
    options?: RegistriesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update tags */
  update: (
    resourceGroupName: string,
    registryName: string,
    body: PartialRegistryPartialTrackedResource,
    options?: RegistriesUpdateOptionalParams,
  ) => Promise<Registry>;
  /** Create or update registry */
  createOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    body: Registry,
    options?: RegistriesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Registry>, Registry>;
  /** Get registry */
  get: (
    resourceGroupName: string,
    registryName: string,
    options?: RegistriesGetOptionalParams,
  ) => Promise<Registry>;
}

function _getRegistries(context: AzureMachineLearningServicesManagementContext) {
  return {
    removeRegions: (
      resourceGroupName: string,
      registryName: string,
      body: Registry,
      options?: RegistriesRemoveRegionsOptionalParams,
    ) => removeRegions(context, resourceGroupName, registryName, body, options),
    listBySubscription: (options?: RegistriesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    list: (resourceGroupName: string, options?: RegistriesListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      options?: RegistriesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, options),
    update: (
      resourceGroupName: string,
      registryName: string,
      body: PartialRegistryPartialTrackedResource,
      options?: RegistriesUpdateOptionalParams,
    ) => update(context, resourceGroupName, registryName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      registryName: string,
      body: Registry,
      options?: RegistriesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, registryName, body, options),
    get: (resourceGroupName: string, registryName: string, options?: RegistriesGetOptionalParams) =>
      get(context, resourceGroupName, registryName, options),
  };
}

export function _getRegistriesOperations(
  context: AzureMachineLearningServicesManagementContext,
): RegistriesOperations {
  return {
    ..._getRegistries(context),
  };
}
