// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listAll,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/networkProfiles/operations.js";
import type {
  NetworkProfilesListAllOptionalParams,
  NetworkProfilesListOptionalParams,
  NetworkProfilesDeleteOptionalParams,
  NetworkProfilesUpdateTagsOptionalParams,
  NetworkProfilesCreateOrUpdateOptionalParams,
  NetworkProfilesGetOptionalParams,
} from "../../api/networkProfiles/options.js";
import type { TagsObject, NetworkProfile } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkProfiles operations. */
export interface NetworkProfilesOperations {
  /** Gets all the network profiles in a subscription. */
  listAll: (
    options?: NetworkProfilesListAllOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkProfile>;
  /** Gets all network profiles in a resource group. */
  list: (
    resourceGroupName: string,
    options?: NetworkProfilesListOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkProfile>;
  /** Deletes the specified network profile. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkProfileName: string,
    options?: NetworkProfilesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkProfileName: string,
    options?: NetworkProfilesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkProfileName: string,
    options?: NetworkProfilesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates network profile tags. */
  updateTags: (
    resourceGroupName: string,
    networkProfileName: string,
    parameters: TagsObject,
    options?: NetworkProfilesUpdateTagsOptionalParams,
  ) => Promise<NetworkProfile>;
  /** Creates or updates a network profile. */
  createOrUpdate: (
    resourceGroupName: string,
    networkProfileName: string,
    parameters: NetworkProfile,
    options?: NetworkProfilesCreateOrUpdateOptionalParams,
  ) => Promise<NetworkProfile>;
  /** Gets the specified network profile in a specified resource group. */
  get: (
    resourceGroupName: string,
    networkProfileName: string,
    options?: NetworkProfilesGetOptionalParams,
  ) => Promise<NetworkProfile>;
}

function _getNetworkProfiles(context: NetworkManagementContext) {
  return {
    listAll: (options?: NetworkProfilesListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: NetworkProfilesListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      networkProfileName: string,
      options?: NetworkProfilesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkProfileName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkProfileName: string,
      options?: NetworkProfilesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, networkProfileName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkProfileName: string,
      options?: NetworkProfilesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, networkProfileName, options);
    },
    updateTags: (
      resourceGroupName: string,
      networkProfileName: string,
      parameters: TagsObject,
      options?: NetworkProfilesUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, networkProfileName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      networkProfileName: string,
      parameters: NetworkProfile,
      options?: NetworkProfilesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, networkProfileName, parameters, options),
    get: (
      resourceGroupName: string,
      networkProfileName: string,
      options?: NetworkProfilesGetOptionalParams,
    ) => get(context, resourceGroupName, networkProfileName, options),
  };
}

export function _getNetworkProfilesOperations(
  context: NetworkManagementContext,
): NetworkProfilesOperations {
  return {
    ..._getNetworkProfiles(context),
  };
}
