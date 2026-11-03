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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use removeRegions instead */
  beginRemoveRegions: (
    resourceGroupName: string,
    registryName: string,
    body: Registry,
    options?: RegistriesRemoveRegionsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Registry>, Registry>>;
  /** @deprecated use removeRegions instead */
  beginRemoveRegionsAndWait: (
    resourceGroupName: string,
    registryName: string,
    body: Registry,
    options?: RegistriesRemoveRegionsOptionalParams,
  ) => Promise<Registry>;
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
  delete: (
    resourceGroupName: string,
    registryName: string,
    options?: RegistriesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    registryName: string,
    options?: RegistriesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    registryName: string,
    options?: RegistriesDeleteOptionalParams,
  ) => Promise<void>;
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
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    body: Registry,
    options?: RegistriesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Registry>, Registry>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    registryName: string,
    body: Registry,
    options?: RegistriesCreateOrUpdateOptionalParams,
  ) => Promise<Registry>;
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
    beginRemoveRegions: async (
      resourceGroupName: string,
      registryName: string,
      body: Registry,
      options?: RegistriesRemoveRegionsOptionalParams,
    ) => {
      const poller = removeRegions(context, resourceGroupName, registryName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRemoveRegionsAndWait: async (
      resourceGroupName: string,
      registryName: string,
      body: Registry,
      options?: RegistriesRemoveRegionsOptionalParams,
    ) => {
      return await removeRegions(context, resourceGroupName, registryName, body, options);
    },
    listBySubscription: (options?: RegistriesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    list: (resourceGroupName: string, options?: RegistriesListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      options?: RegistriesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, options),
    beginDelete: async (
      resourceGroupName: string,
      registryName: string,
      options?: RegistriesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, registryName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      registryName: string,
      options?: RegistriesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, registryName, options);
    },
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
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      registryName: string,
      body: Registry,
      options?: RegistriesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, registryName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      registryName: string,
      body: Registry,
      options?: RegistriesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, registryName, body, options);
    },
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
