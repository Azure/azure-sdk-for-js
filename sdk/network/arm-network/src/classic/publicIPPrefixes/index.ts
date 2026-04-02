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
} from "../../api/publicIPPrefixes/operations.js";
import type {
  PublicIPPrefixesListAllOptionalParams,
  PublicIPPrefixesListOptionalParams,
  PublicIPPrefixesDeleteOptionalParams,
  PublicIPPrefixesUpdateTagsOptionalParams,
  PublicIPPrefixesCreateOrUpdateOptionalParams,
  PublicIPPrefixesGetOptionalParams,
} from "../../api/publicIPPrefixes/options.js";
import type { TagsObject, PublicIPPrefix } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PublicIPPrefixes operations. */
export interface PublicIPPrefixesOperations {
  /** Gets all the public IP prefixes in a subscription. */
  listAll: (
    options?: PublicIPPrefixesListAllOptionalParams,
  ) => PagedAsyncIterableIterator<PublicIPPrefix>;
  /** Gets all public IP prefixes in a resource group. */
  list: (
    resourceGroupName: string,
    options?: PublicIPPrefixesListOptionalParams,
  ) => PagedAsyncIterableIterator<PublicIPPrefix>;
  /** Deletes the specified public IP prefix. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    publicIpPrefixName: string,
    options?: PublicIPPrefixesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    publicIpPrefixName: string,
    options?: PublicIPPrefixesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    publicIpPrefixName: string,
    options?: PublicIPPrefixesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates public IP prefix tags. */
  updateTags: (
    resourceGroupName: string,
    publicIpPrefixName: string,
    parameters: TagsObject,
    options?: PublicIPPrefixesUpdateTagsOptionalParams,
  ) => Promise<PublicIPPrefix>;
  /** Creates or updates a static or dynamic public IP prefix. */
  createOrUpdate: (
    resourceGroupName: string,
    publicIpPrefixName: string,
    parameters: PublicIPPrefix,
    options?: PublicIPPrefixesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PublicIPPrefix>, PublicIPPrefix>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    publicIpPrefixName: string,
    parameters: PublicIPPrefix,
    options?: PublicIPPrefixesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PublicIPPrefix>, PublicIPPrefix>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    publicIpPrefixName: string,
    parameters: PublicIPPrefix,
    options?: PublicIPPrefixesCreateOrUpdateOptionalParams,
  ) => Promise<PublicIPPrefix>;
  /** Gets the specified public IP prefix in a specified resource group. */
  get: (
    resourceGroupName: string,
    publicIpPrefixName: string,
    options?: PublicIPPrefixesGetOptionalParams,
  ) => Promise<PublicIPPrefix>;
}

function _getPublicIPPrefixes(context: NetworkManagementContext) {
  return {
    listAll: (options?: PublicIPPrefixesListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: PublicIPPrefixesListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      publicIpPrefixName: string,
      options?: PublicIPPrefixesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, publicIpPrefixName, options),
    beginDelete: async (
      resourceGroupName: string,
      publicIpPrefixName: string,
      options?: PublicIPPrefixesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, publicIpPrefixName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      publicIpPrefixName: string,
      options?: PublicIPPrefixesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, publicIpPrefixName, options);
    },
    updateTags: (
      resourceGroupName: string,
      publicIpPrefixName: string,
      parameters: TagsObject,
      options?: PublicIPPrefixesUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, publicIpPrefixName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      publicIpPrefixName: string,
      parameters: PublicIPPrefix,
      options?: PublicIPPrefixesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, publicIpPrefixName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      publicIpPrefixName: string,
      parameters: PublicIPPrefix,
      options?: PublicIPPrefixesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        publicIpPrefixName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      publicIpPrefixName: string,
      parameters: PublicIPPrefix,
      options?: PublicIPPrefixesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        publicIpPrefixName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      publicIpPrefixName: string,
      options?: PublicIPPrefixesGetOptionalParams,
    ) => get(context, resourceGroupName, publicIpPrefixName, options),
  };
}

export function _getPublicIPPrefixesOperations(
  context: NetworkManagementContext,
): PublicIPPrefixesOperations {
  return {
    ..._getPublicIPPrefixes(context),
  };
}
