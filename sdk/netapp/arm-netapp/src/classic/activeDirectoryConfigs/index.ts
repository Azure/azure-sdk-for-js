// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/activeDirectoryConfigs/operations.js";
import type {
  ActiveDirectoryConfigsListBySubscriptionOptionalParams,
  ActiveDirectoryConfigsListByResourceGroupOptionalParams,
  ActiveDirectoryConfigsDeleteOptionalParams,
  ActiveDirectoryConfigsUpdateOptionalParams,
  ActiveDirectoryConfigsCreateOrUpdateOptionalParams,
  ActiveDirectoryConfigsGetOptionalParams,
} from "../../api/activeDirectoryConfigs/options.js";
import type { ActiveDirectoryConfig, ActiveDirectoryConfigUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ActiveDirectoryConfigs operations. */
export interface ActiveDirectoryConfigsOperations {
  /** List all active directory configurations within the subscription */
  listBySubscription: (
    options?: ActiveDirectoryConfigsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ActiveDirectoryConfig>;
  /** List all active directory configurations within the resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ActiveDirectoryConfigsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ActiveDirectoryConfig>;
  /** Delete the specified Active Directory configuration */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    activeDirectoryConfigName: string,
    options?: ActiveDirectoryConfigsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Patch the specified active directory configuration */
  update: (
    resourceGroupName: string,
    activeDirectoryConfigName: string,
    body: ActiveDirectoryConfigUpdate,
    options?: ActiveDirectoryConfigsUpdateOptionalParams,
  ) => PollerLike<OperationState<ActiveDirectoryConfig>, ActiveDirectoryConfig>;
  /** Create or update the specified active directory configuration */
  createOrUpdate: (
    resourceGroupName: string,
    activeDirectoryConfigName: string,
    body: ActiveDirectoryConfig,
    options?: ActiveDirectoryConfigsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ActiveDirectoryConfig>, ActiveDirectoryConfig>;
  /** Get the details of the specified active directory configuration */
  get: (
    resourceGroupName: string,
    activeDirectoryConfigName: string,
    options?: ActiveDirectoryConfigsGetOptionalParams,
  ) => Promise<ActiveDirectoryConfig>;
}

function _getActiveDirectoryConfigs(context: NetAppManagementContext) {
  return {
    listBySubscription: (options?: ActiveDirectoryConfigsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ActiveDirectoryConfigsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      activeDirectoryConfigName: string,
      options?: ActiveDirectoryConfigsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, activeDirectoryConfigName, options),
    update: (
      resourceGroupName: string,
      activeDirectoryConfigName: string,
      body: ActiveDirectoryConfigUpdate,
      options?: ActiveDirectoryConfigsUpdateOptionalParams,
    ) => update(context, resourceGroupName, activeDirectoryConfigName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      activeDirectoryConfigName: string,
      body: ActiveDirectoryConfig,
      options?: ActiveDirectoryConfigsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, activeDirectoryConfigName, body, options),
    get: (
      resourceGroupName: string,
      activeDirectoryConfigName: string,
      options?: ActiveDirectoryConfigsGetOptionalParams,
    ) => get(context, resourceGroupName, activeDirectoryConfigName, options),
  };
}

export function _getActiveDirectoryConfigsOperations(
  context: NetAppManagementContext,
): ActiveDirectoryConfigsOperations {
  return {
    ..._getActiveDirectoryConfigs(context),
  };
}
