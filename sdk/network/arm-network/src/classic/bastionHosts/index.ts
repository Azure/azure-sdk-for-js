// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/bastionHosts/operations.js";
import type {
  BastionHostsListOptionalParams,
  BastionHostsListByResourceGroupOptionalParams,
  BastionHostsDeleteOptionalParams,
  BastionHostsUpdateTagsOptionalParams,
  BastionHostsCreateOrUpdateOptionalParams,
  BastionHostsGetOptionalParams,
} from "../../api/bastionHosts/options.js";
import type { TagsObject, BastionHost } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BastionHosts operations. */
export interface BastionHostsOperations {
  /** Lists all Bastion Hosts in a subscription. */
  list: (options?: BastionHostsListOptionalParams) => PagedAsyncIterableIterator<BastionHost>;
  /** Lists all Bastion Hosts in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: BastionHostsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<BastionHost>;
  /** Deletes the specified Bastion Host. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    bastionHostName: string,
    options?: BastionHostsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    bastionHostName: string,
    options?: BastionHostsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    bastionHostName: string,
    options?: BastionHostsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates Tags for BastionHost resource */
  updateTags: (
    resourceGroupName: string,
    bastionHostName: string,
    parameters: TagsObject,
    options?: BastionHostsUpdateTagsOptionalParams,
  ) => PollerLike<OperationState<BastionHost>, BastionHost>;
  /** @deprecated use updateTags instead */
  beginUpdateTags: (
    resourceGroupName: string,
    bastionHostName: string,
    parameters: TagsObject,
    options?: BastionHostsUpdateTagsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BastionHost>, BastionHost>>;
  /** @deprecated use updateTags instead */
  beginUpdateTagsAndWait: (
    resourceGroupName: string,
    bastionHostName: string,
    parameters: TagsObject,
    options?: BastionHostsUpdateTagsOptionalParams,
  ) => Promise<BastionHost>;
  /** Creates or updates the specified Bastion Host. */
  createOrUpdate: (
    resourceGroupName: string,
    bastionHostName: string,
    parameters: BastionHost,
    options?: BastionHostsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BastionHost>, BastionHost>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    bastionHostName: string,
    parameters: BastionHost,
    options?: BastionHostsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BastionHost>, BastionHost>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    bastionHostName: string,
    parameters: BastionHost,
    options?: BastionHostsCreateOrUpdateOptionalParams,
  ) => Promise<BastionHost>;
  /** Gets the specified Bastion Host. */
  get: (
    resourceGroupName: string,
    bastionHostName: string,
    options?: BastionHostsGetOptionalParams,
  ) => Promise<BastionHost>;
}

function _getBastionHosts(context: NetworkManagementContext) {
  return {
    list: (options?: BastionHostsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: BastionHostsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      bastionHostName: string,
      options?: BastionHostsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, bastionHostName, options),
    beginDelete: async (
      resourceGroupName: string,
      bastionHostName: string,
      options?: BastionHostsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, bastionHostName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      bastionHostName: string,
      options?: BastionHostsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, bastionHostName, options);
    },
    updateTags: (
      resourceGroupName: string,
      bastionHostName: string,
      parameters: TagsObject,
      options?: BastionHostsUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, bastionHostName, parameters, options),
    beginUpdateTags: async (
      resourceGroupName: string,
      bastionHostName: string,
      parameters: TagsObject,
      options?: BastionHostsUpdateTagsOptionalParams,
    ) => {
      const poller = updateTags(context, resourceGroupName, bastionHostName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateTagsAndWait: async (
      resourceGroupName: string,
      bastionHostName: string,
      parameters: TagsObject,
      options?: BastionHostsUpdateTagsOptionalParams,
    ) => {
      return await updateTags(context, resourceGroupName, bastionHostName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      bastionHostName: string,
      parameters: BastionHost,
      options?: BastionHostsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, bastionHostName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      bastionHostName: string,
      parameters: BastionHost,
      options?: BastionHostsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        bastionHostName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      bastionHostName: string,
      parameters: BastionHost,
      options?: BastionHostsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, bastionHostName, parameters, options);
    },
    get: (
      resourceGroupName: string,
      bastionHostName: string,
      options?: BastionHostsGetOptionalParams,
    ) => get(context, resourceGroupName, bastionHostName, options),
  };
}

export function _getBastionHostsOperations(
  context: NetworkManagementContext,
): BastionHostsOperations {
  return {
    ..._getBastionHosts(context),
  };
}
