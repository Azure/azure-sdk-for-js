// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/networkGroups/operations.js";
import {
  NetworkGroupsListOptionalParams,
  NetworkGroupsDeleteOptionalParams,
  NetworkGroupsCreateOrUpdateOptionalParams,
  NetworkGroupsGetOptionalParams,
} from "../../api/networkGroups/options.js";
import { NetworkGroup } from "../../models/microsoft/network/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkGroups operations. */
export interface NetworkGroupsOperations {
  /** Lists the specified network group. */
  list: (
    resourceGroupName: string,
    networkManagerName: string,
    options?: NetworkGroupsListOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkGroup>;
  /** Deletes a network group. */
  delete: (
    resourceGroupName: string,
    networkManagerName: string,
    networkGroupName: string,
    options?: NetworkGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkManagerName: string,
    networkGroupName: string,
    options?: NetworkGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkManagerName: string,
    networkGroupName: string,
    options?: NetworkGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a network group. */
  createOrUpdate: (
    resourceGroupName: string,
    networkManagerName: string,
    networkGroupName: string,
    parameters: NetworkGroup,
    options?: NetworkGroupsCreateOrUpdateOptionalParams,
  ) => Promise<NetworkGroup>;
  /** Gets the specified network group. */
  get: (
    resourceGroupName: string,
    networkManagerName: string,
    networkGroupName: string,
    options?: NetworkGroupsGetOptionalParams,
  ) => Promise<NetworkGroup>;
}

function _getNetworkGroups(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkManagerName: string,
      options?: NetworkGroupsListOptionalParams,
    ) => list(context, resourceGroupName, networkManagerName, options),
    delete: (
      resourceGroupName: string,
      networkManagerName: string,
      networkGroupName: string,
      options?: NetworkGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkManagerName, networkGroupName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkManagerName: string,
      networkGroupName: string,
      options?: NetworkGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        networkManagerName,
        networkGroupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkManagerName: string,
      networkGroupName: string,
      options?: NetworkGroupsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        networkManagerName,
        networkGroupName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      networkManagerName: string,
      networkGroupName: string,
      parameters: NetworkGroup,
      options?: NetworkGroupsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        networkManagerName,
        networkGroupName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      networkManagerName: string,
      networkGroupName: string,
      options?: NetworkGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, networkManagerName, networkGroupName, options),
  };
}

export function _getNetworkGroupsOperations(
  context: NetworkManagementContext,
): NetworkGroupsOperations {
  return {
    ..._getNetworkGroups(context),
  };
}
