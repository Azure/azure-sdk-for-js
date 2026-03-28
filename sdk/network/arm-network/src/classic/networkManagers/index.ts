// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listBySubscription,
  list,
  $delete,
  patch,
  createOrUpdate,
  get,
} from "../../api/networkManagers/operations.js";
import type {
  NetworkManagersListBySubscriptionOptionalParams,
  NetworkManagersListOptionalParams,
  NetworkManagersDeleteOptionalParams,
  NetworkManagersPatchOptionalParams,
  NetworkManagersCreateOrUpdateOptionalParams,
  NetworkManagersGetOptionalParams,
} from "../../api/networkManagers/options.js";
import type { NetworkManager, PatchObject } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkManagers operations. */
export interface NetworkManagersOperations {
  /** List all network managers in a subscription. */
  listBySubscription: (
    options?: NetworkManagersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkManager>;
  /** List network managers in a resource group. */
  list: (
    resourceGroupName: string,
    options?: NetworkManagersListOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkManager>;
  /** Deletes a network manager. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkManagerName: string,
    options?: NetworkManagersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkManagerName: string,
    options?: NetworkManagersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkManagerName: string,
    options?: NetworkManagersDeleteOptionalParams,
  ) => Promise<void>;
  /** Patch NetworkManager. */
  patch: (
    resourceGroupName: string,
    networkManagerName: string,
    parameters: PatchObject,
    options?: NetworkManagersPatchOptionalParams,
  ) => Promise<NetworkManager>;
  /** Creates or updates a Network Manager. */
  createOrUpdate: (
    resourceGroupName: string,
    networkManagerName: string,
    parameters: NetworkManager,
    options?: NetworkManagersCreateOrUpdateOptionalParams,
  ) => Promise<NetworkManager>;
  /** Gets the specified Network Manager. */
  get: (
    resourceGroupName: string,
    networkManagerName: string,
    options?: NetworkManagersGetOptionalParams,
  ) => Promise<NetworkManager>;
}

function _getNetworkManagers(context: NetworkManagementContext) {
  return {
    listBySubscription: (options?: NetworkManagersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    list: (resourceGroupName: string, options?: NetworkManagersListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      networkManagerName: string,
      options?: NetworkManagersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkManagerName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkManagerName: string,
      options?: NetworkManagersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, networkManagerName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkManagerName: string,
      options?: NetworkManagersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, networkManagerName, options);
    },
    patch: (
      resourceGroupName: string,
      networkManagerName: string,
      parameters: PatchObject,
      options?: NetworkManagersPatchOptionalParams,
    ) => patch(context, resourceGroupName, networkManagerName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      networkManagerName: string,
      parameters: NetworkManager,
      options?: NetworkManagersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, networkManagerName, parameters, options),
    get: (
      resourceGroupName: string,
      networkManagerName: string,
      options?: NetworkManagersGetOptionalParams,
    ) => get(context, resourceGroupName, networkManagerName, options),
  };
}

export function _getNetworkManagersOperations(
  context: NetworkManagementContext,
): NetworkManagersOperations {
  return {
    ..._getNetworkManagers(context),
  };
}
