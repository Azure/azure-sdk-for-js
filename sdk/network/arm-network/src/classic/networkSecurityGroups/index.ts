// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listAll,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/networkSecurityGroups/operations.js";
import {
  NetworkSecurityGroupsListAllOptionalParams,
  NetworkSecurityGroupsListOptionalParams,
  NetworkSecurityGroupsDeleteOptionalParams,
  NetworkSecurityGroupsUpdateTagsOptionalParams,
  NetworkSecurityGroupsCreateOrUpdateOptionalParams,
  NetworkSecurityGroupsGetOptionalParams,
} from "../../api/networkSecurityGroups/options.js";
import { NetworkSecurityGroup } from "../../models/common/models.js";
import { TagsObject } from "../../models/microsoft/network/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkSecurityGroups operations. */
export interface NetworkSecurityGroupsOperations {
  /** Gets all network security groups in a subscription. */
  listAll: (
    options?: NetworkSecurityGroupsListAllOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkSecurityGroup>;
  /** Gets all network security groups in a resource group. */
  list: (
    resourceGroupName: string,
    options?: NetworkSecurityGroupsListOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkSecurityGroup>;
  /** Deletes the specified network security group. */
  delete: (
    resourceGroupName: string,
    networkSecurityGroupName: string,
    options?: NetworkSecurityGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkSecurityGroupName: string,
    options?: NetworkSecurityGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkSecurityGroupName: string,
    options?: NetworkSecurityGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a network security group tags. */
  updateTags: (
    resourceGroupName: string,
    networkSecurityGroupName: string,
    parameters: TagsObject,
    options?: NetworkSecurityGroupsUpdateTagsOptionalParams,
  ) => Promise<NetworkSecurityGroup>;
  /** Creates or updates a network security group in the specified resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    networkSecurityGroupName: string,
    parameters: NetworkSecurityGroup,
    options?: NetworkSecurityGroupsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkSecurityGroup>, NetworkSecurityGroup>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    networkSecurityGroupName: string,
    parameters: NetworkSecurityGroup,
    options?: NetworkSecurityGroupsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkSecurityGroup>, NetworkSecurityGroup>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    networkSecurityGroupName: string,
    parameters: NetworkSecurityGroup,
    options?: NetworkSecurityGroupsCreateOrUpdateOptionalParams,
  ) => Promise<NetworkSecurityGroup>;
  /** Gets the specified network security group. */
  get: (
    resourceGroupName: string,
    networkSecurityGroupName: string,
    options?: NetworkSecurityGroupsGetOptionalParams,
  ) => Promise<NetworkSecurityGroup>;
}

function _getNetworkSecurityGroups(context: NetworkManagementContext) {
  return {
    listAll: (options?: NetworkSecurityGroupsListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: NetworkSecurityGroupsListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      networkSecurityGroupName: string,
      options?: NetworkSecurityGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkSecurityGroupName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkSecurityGroupName: string,
      options?: NetworkSecurityGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, networkSecurityGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkSecurityGroupName: string,
      options?: NetworkSecurityGroupsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, networkSecurityGroupName, options);
    },
    updateTags: (
      resourceGroupName: string,
      networkSecurityGroupName: string,
      parameters: TagsObject,
      options?: NetworkSecurityGroupsUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, networkSecurityGroupName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      networkSecurityGroupName: string,
      parameters: NetworkSecurityGroup,
      options?: NetworkSecurityGroupsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, networkSecurityGroupName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      networkSecurityGroupName: string,
      parameters: NetworkSecurityGroup,
      options?: NetworkSecurityGroupsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        networkSecurityGroupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      networkSecurityGroupName: string,
      parameters: NetworkSecurityGroup,
      options?: NetworkSecurityGroupsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        networkSecurityGroupName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      networkSecurityGroupName: string,
      options?: NetworkSecurityGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, networkSecurityGroupName, options),
  };
}

export function _getNetworkSecurityGroupsOperations(
  context: NetworkManagementContext,
): NetworkSecurityGroupsOperations {
  return {
    ..._getNetworkSecurityGroups(context),
  };
}
