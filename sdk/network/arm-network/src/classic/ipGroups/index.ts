// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  updateGroups,
  createOrUpdate,
  get,
} from "../../api/ipGroups/operations.js";
import type {
  IpGroupsListOptionalParams,
  IpGroupsListByResourceGroupOptionalParams,
  IpGroupsDeleteOptionalParams,
  IpGroupsUpdateGroupsOptionalParams,
  IpGroupsCreateOrUpdateOptionalParams,
  IpGroupsGetOptionalParams,
} from "../../api/ipGroups/options.js";
import type { TagsObject, IpGroup } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a IpGroups operations. */
export interface IpGroupsOperations {
  /** Gets all IpGroups in a subscription. */
  list: (options?: IpGroupsListOptionalParams) => PagedAsyncIterableIterator<IpGroup>;
  /** Gets all IpGroups in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: IpGroupsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<IpGroup>;
  /** Deletes the specified ipGroups. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    ipGroupsName: string,
    options?: IpGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    ipGroupsName: string,
    options?: IpGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    ipGroupsName: string,
    options?: IpGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates tags of an IpGroups resource. */
  updateGroups: (
    resourceGroupName: string,
    ipGroupsName: string,
    parameters: TagsObject,
    options?: IpGroupsUpdateGroupsOptionalParams,
  ) => Promise<IpGroup>;
  /** Creates or updates an ipGroups in a specified resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    ipGroupsName: string,
    parameters: IpGroup,
    options?: IpGroupsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<IpGroup>, IpGroup>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    ipGroupsName: string,
    parameters: IpGroup,
    options?: IpGroupsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<IpGroup>, IpGroup>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    ipGroupsName: string,
    parameters: IpGroup,
    options?: IpGroupsCreateOrUpdateOptionalParams,
  ) => Promise<IpGroup>;
  /** Gets the specified ipGroups. */
  get: (
    resourceGroupName: string,
    ipGroupsName: string,
    options?: IpGroupsGetOptionalParams,
  ) => Promise<IpGroup>;
}

function _getIpGroups(context: NetworkManagementContext) {
  return {
    list: (options?: IpGroupsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: IpGroupsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      ipGroupsName: string,
      options?: IpGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, ipGroupsName, options),
    beginDelete: async (
      resourceGroupName: string,
      ipGroupsName: string,
      options?: IpGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, ipGroupsName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      ipGroupsName: string,
      options?: IpGroupsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, ipGroupsName, options);
    },
    updateGroups: (
      resourceGroupName: string,
      ipGroupsName: string,
      parameters: TagsObject,
      options?: IpGroupsUpdateGroupsOptionalParams,
    ) => updateGroups(context, resourceGroupName, ipGroupsName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      ipGroupsName: string,
      parameters: IpGroup,
      options?: IpGroupsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, ipGroupsName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      ipGroupsName: string,
      parameters: IpGroup,
      options?: IpGroupsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, ipGroupsName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      ipGroupsName: string,
      parameters: IpGroup,
      options?: IpGroupsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, ipGroupsName, parameters, options);
    },
    get: (resourceGroupName: string, ipGroupsName: string, options?: IpGroupsGetOptionalParams) =>
      get(context, resourceGroupName, ipGroupsName, options),
  };
}

export function _getIpGroupsOperations(context: NetworkManagementContext): IpGroupsOperations {
  return {
    ..._getIpGroups(context),
  };
}
