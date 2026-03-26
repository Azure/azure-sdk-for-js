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
} from "../../api/customIPPrefixes/operations.js";
import type {
  CustomIPPrefixesListAllOptionalParams,
  CustomIPPrefixesListOptionalParams,
  CustomIPPrefixesDeleteOptionalParams,
  CustomIPPrefixesUpdateTagsOptionalParams,
  CustomIPPrefixesCreateOrUpdateOptionalParams,
  CustomIPPrefixesGetOptionalParams,
} from "../../api/customIPPrefixes/options.js";
import type { TagsObject, CustomIpPrefix } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CustomIPPrefixes operations. */
export interface CustomIPPrefixesOperations {
  /** Gets all the custom IP prefixes in a subscription. */
  listAll: (
    options?: CustomIPPrefixesListAllOptionalParams,
  ) => PagedAsyncIterableIterator<CustomIpPrefix>;
  /** Gets all custom IP prefixes in a resource group. */
  list: (
    resourceGroupName: string,
    options?: CustomIPPrefixesListOptionalParams,
  ) => PagedAsyncIterableIterator<CustomIpPrefix>;
  /** Deletes the specified custom IP prefix. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    customIpPrefixName: string,
    options?: CustomIPPrefixesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    customIpPrefixName: string,
    options?: CustomIPPrefixesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    customIpPrefixName: string,
    options?: CustomIPPrefixesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates custom IP prefix tags. */
  updateTags: (
    resourceGroupName: string,
    customIpPrefixName: string,
    parameters: TagsObject,
    options?: CustomIPPrefixesUpdateTagsOptionalParams,
  ) => Promise<CustomIpPrefix>;
  /** Creates or updates a custom IP prefix. */
  createOrUpdate: (
    resourceGroupName: string,
    customIpPrefixName: string,
    parameters: CustomIpPrefix,
    options?: CustomIPPrefixesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CustomIpPrefix>, CustomIpPrefix>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    customIpPrefixName: string,
    parameters: CustomIpPrefix,
    options?: CustomIPPrefixesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CustomIpPrefix>, CustomIpPrefix>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    customIpPrefixName: string,
    parameters: CustomIpPrefix,
    options?: CustomIPPrefixesCreateOrUpdateOptionalParams,
  ) => Promise<CustomIpPrefix>;
  /** Gets the specified custom IP prefix in a specified resource group. */
  get: (
    resourceGroupName: string,
    customIpPrefixName: string,
    options?: CustomIPPrefixesGetOptionalParams,
  ) => Promise<CustomIpPrefix>;
}

function _getCustomIPPrefixes(context: NetworkManagementContext) {
  return {
    listAll: (options?: CustomIPPrefixesListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: CustomIPPrefixesListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      customIpPrefixName: string,
      options?: CustomIPPrefixesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, customIpPrefixName, options),
    beginDelete: async (
      resourceGroupName: string,
      customIpPrefixName: string,
      options?: CustomIPPrefixesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, customIpPrefixName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      customIpPrefixName: string,
      options?: CustomIPPrefixesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, customIpPrefixName, options);
    },
    updateTags: (
      resourceGroupName: string,
      customIpPrefixName: string,
      parameters: TagsObject,
      options?: CustomIPPrefixesUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, customIpPrefixName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      customIpPrefixName: string,
      parameters: CustomIpPrefix,
      options?: CustomIPPrefixesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, customIpPrefixName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      customIpPrefixName: string,
      parameters: CustomIpPrefix,
      options?: CustomIPPrefixesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        customIpPrefixName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      customIpPrefixName: string,
      parameters: CustomIpPrefix,
      options?: CustomIPPrefixesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        customIpPrefixName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      customIpPrefixName: string,
      options?: CustomIPPrefixesGetOptionalParams,
    ) => get(context, resourceGroupName, customIpPrefixName, options),
  };
}

export function _getCustomIPPrefixesOperations(
  context: NetworkManagementContext,
): CustomIPPrefixesOperations {
  return {
    ..._getCustomIPPrefixes(context),
  };
}
