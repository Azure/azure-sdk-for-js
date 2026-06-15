// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  stop,
  start,
  getAuthToken,
  listSecrets,
  listCustomHostNameAnalysis,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/containerApps/operations.js";
import {
  ContainerAppsStopOptionalParams,
  ContainerAppsStartOptionalParams,
  ContainerAppsGetAuthTokenOptionalParams,
  ContainerAppsListSecretsOptionalParams,
  ContainerAppsListCustomHostNameAnalysisOptionalParams,
  ContainerAppsListBySubscriptionOptionalParams,
  ContainerAppsListByResourceGroupOptionalParams,
  ContainerAppsDeleteOptionalParams,
  ContainerAppsUpdateOptionalParams,
  ContainerAppsCreateOrUpdateOptionalParams,
  ContainerAppsGetOptionalParams,
} from "../../api/containerApps/options.js";
import {
  ContainerApp,
  CustomHostnameAnalysisResult,
  SecretsCollection,
  ContainerAppAuthToken,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ContainerApps operations. */
export interface ContainerAppsOperations {
  /** Stop a container app */
  stop: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsStopOptionalParams,
  ) => PollerLike<OperationState<ContainerApp>, ContainerApp>;
  /** @deprecated use stop instead */
  beginStop: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsStopOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ContainerApp>, ContainerApp>>;
  /** @deprecated use stop instead */
  beginStopAndWait: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsStopOptionalParams,
  ) => Promise<ContainerApp>;
  /** Start a container app */
  start: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsStartOptionalParams,
  ) => PollerLike<OperationState<ContainerApp>, ContainerApp>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ContainerApp>, ContainerApp>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsStartOptionalParams,
  ) => Promise<ContainerApp>;
  /** Get auth token for a container app */
  getAuthToken: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsGetAuthTokenOptionalParams,
  ) => Promise<ContainerAppAuthToken>;
  /** List secrets for a container app */
  listSecrets: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsListSecretsOptionalParams,
  ) => Promise<SecretsCollection>;
  /** Analyzes a custom hostname for a Container App */
  listCustomHostNameAnalysis: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsListCustomHostNameAnalysisOptionalParams,
  ) => Promise<CustomHostnameAnalysisResult>;
  /** Get the Container Apps in a given subscription. */
  listBySubscription: (
    options?: ContainerAppsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ContainerApp>;
  /** Get the Container Apps in a given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ContainerAppsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ContainerApp>;
  /** Delete a Container App. */
  delete: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsDeleteOptionalParams,
  ) => Promise<void>;
  /** Patches a Container App using JSON Merge Patch */
  update: (
    resourceGroupName: string,
    containerAppName: string,
    containerAppEnvelope: ContainerApp,
    options?: ContainerAppsUpdateOptionalParams,
  ) => PollerLike<OperationState<ContainerApp>, ContainerApp>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    containerAppName: string,
    containerAppEnvelope: ContainerApp,
    options?: ContainerAppsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ContainerApp>, ContainerApp>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    containerAppName: string,
    containerAppEnvelope: ContainerApp,
    options?: ContainerAppsUpdateOptionalParams,
  ) => Promise<ContainerApp>;
  /** Create or update a Container App. */
  createOrUpdate: (
    resourceGroupName: string,
    containerAppName: string,
    containerAppEnvelope: ContainerApp,
    options?: ContainerAppsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ContainerApp>, ContainerApp>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    containerAppName: string,
    containerAppEnvelope: ContainerApp,
    options?: ContainerAppsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ContainerApp>, ContainerApp>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    containerAppName: string,
    containerAppEnvelope: ContainerApp,
    options?: ContainerAppsCreateOrUpdateOptionalParams,
  ) => Promise<ContainerApp>;
  /** Get the properties of a Container App. */
  get: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsGetOptionalParams,
  ) => Promise<ContainerApp>;
}

function _getContainerApps(context: ContainerAppsAPIContext) {
  return {
    stop: (
      resourceGroupName: string,
      containerAppName: string,
      options?: ContainerAppsStopOptionalParams,
    ) => stop(context, resourceGroupName, containerAppName, options),
    beginStop: async (
      resourceGroupName: string,
      containerAppName: string,
      options?: ContainerAppsStopOptionalParams,
    ) => {
      const poller = stop(context, resourceGroupName, containerAppName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopAndWait: async (
      resourceGroupName: string,
      containerAppName: string,
      options?: ContainerAppsStopOptionalParams,
    ) => {
      return await stop(context, resourceGroupName, containerAppName, options);
    },
    start: (
      resourceGroupName: string,
      containerAppName: string,
      options?: ContainerAppsStartOptionalParams,
    ) => start(context, resourceGroupName, containerAppName, options),
    beginStart: async (
      resourceGroupName: string,
      containerAppName: string,
      options?: ContainerAppsStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, containerAppName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      containerAppName: string,
      options?: ContainerAppsStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, containerAppName, options);
    },
    getAuthToken: (
      resourceGroupName: string,
      containerAppName: string,
      options?: ContainerAppsGetAuthTokenOptionalParams,
    ) => getAuthToken(context, resourceGroupName, containerAppName, options),
    listSecrets: (
      resourceGroupName: string,
      containerAppName: string,
      options?: ContainerAppsListSecretsOptionalParams,
    ) => listSecrets(context, resourceGroupName, containerAppName, options),
    listCustomHostNameAnalysis: (
      resourceGroupName: string,
      containerAppName: string,
      options?: ContainerAppsListCustomHostNameAnalysisOptionalParams,
    ) => listCustomHostNameAnalysis(context, resourceGroupName, containerAppName, options),
    listBySubscription: (options?: ContainerAppsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ContainerAppsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      containerAppName: string,
      options?: ContainerAppsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, containerAppName, options),
    beginDelete: async (
      resourceGroupName: string,
      containerAppName: string,
      options?: ContainerAppsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, containerAppName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      containerAppName: string,
      options?: ContainerAppsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, containerAppName, options);
    },
    update: (
      resourceGroupName: string,
      containerAppName: string,
      containerAppEnvelope: ContainerApp,
      options?: ContainerAppsUpdateOptionalParams,
    ) => update(context, resourceGroupName, containerAppName, containerAppEnvelope, options),
    beginUpdate: async (
      resourceGroupName: string,
      containerAppName: string,
      containerAppEnvelope: ContainerApp,
      options?: ContainerAppsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        containerAppName,
        containerAppEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      containerAppName: string,
      containerAppEnvelope: ContainerApp,
      options?: ContainerAppsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        containerAppName,
        containerAppEnvelope,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      containerAppName: string,
      containerAppEnvelope: ContainerApp,
      options?: ContainerAppsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, containerAppName, containerAppEnvelope, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      containerAppName: string,
      containerAppEnvelope: ContainerApp,
      options?: ContainerAppsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        containerAppName,
        containerAppEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      containerAppName: string,
      containerAppEnvelope: ContainerApp,
      options?: ContainerAppsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        containerAppName,
        containerAppEnvelope,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      containerAppName: string,
      options?: ContainerAppsGetOptionalParams,
    ) => get(context, resourceGroupName, containerAppName, options),
  };
}

export function _getContainerAppsOperations(
  context: ContainerAppsAPIContext,
): ContainerAppsOperations {
  return {
    ..._getContainerApps(context),
  };
}
