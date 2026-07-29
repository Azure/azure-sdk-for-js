// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  listByContainerApp,
  $delete,
  createOrUpdate,
  get,
} from "../../api/containerAppsAuthConfigs/operations.js";
import {
  ContainerAppsAuthConfigsListByContainerAppOptionalParams,
  ContainerAppsAuthConfigsDeleteOptionalParams,
  ContainerAppsAuthConfigsCreateOrUpdateOptionalParams,
  ContainerAppsAuthConfigsGetOptionalParams,
} from "../../api/containerAppsAuthConfigs/options.js";
import { AuthConfig } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ContainerAppsAuthConfigs operations. */
export interface ContainerAppsAuthConfigsOperations {
  /** Get the Container App AuthConfigs in a given resource group. */
  listByContainerApp: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsAuthConfigsListByContainerAppOptionalParams,
  ) => PagedAsyncIterableIterator<AuthConfig>;
  /** Delete a Container App AuthConfig. */
  delete: (
    resourceGroupName: string,
    containerAppName: string,
    authConfigName: string,
    options?: ContainerAppsAuthConfigsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update the AuthConfig for a Container App. */
  createOrUpdate: (
    resourceGroupName: string,
    containerAppName: string,
    authConfigName: string,
    authConfigEnvelope: AuthConfig,
    options?: ContainerAppsAuthConfigsCreateOrUpdateOptionalParams,
  ) => Promise<AuthConfig>;
  /** Get a AuthConfig of a Container App. */
  get: (
    resourceGroupName: string,
    containerAppName: string,
    authConfigName: string,
    options?: ContainerAppsAuthConfigsGetOptionalParams,
  ) => Promise<AuthConfig>;
}

function _getContainerAppsAuthConfigs(context: ContainerAppsAPIContext) {
  return {
    listByContainerApp: (
      resourceGroupName: string,
      containerAppName: string,
      options?: ContainerAppsAuthConfigsListByContainerAppOptionalParams,
    ) => listByContainerApp(context, resourceGroupName, containerAppName, options),
    delete: (
      resourceGroupName: string,
      containerAppName: string,
      authConfigName: string,
      options?: ContainerAppsAuthConfigsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, containerAppName, authConfigName, options),
    createOrUpdate: (
      resourceGroupName: string,
      containerAppName: string,
      authConfigName: string,
      authConfigEnvelope: AuthConfig,
      options?: ContainerAppsAuthConfigsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        containerAppName,
        authConfigName,
        authConfigEnvelope,
        options,
      ),
    get: (
      resourceGroupName: string,
      containerAppName: string,
      authConfigName: string,
      options?: ContainerAppsAuthConfigsGetOptionalParams,
    ) => get(context, resourceGroupName, containerAppName, authConfigName, options),
  };
}

export function _getContainerAppsAuthConfigsOperations(
  context: ContainerAppsAPIContext,
): ContainerAppsAuthConfigsOperations {
  return {
    ..._getContainerAppsAuthConfigs(context),
  };
}
