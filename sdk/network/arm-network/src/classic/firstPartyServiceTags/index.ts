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
} from "../../api/firstPartyServiceTags/operations.js";
import type {
  FirstPartyServiceTagsListAllOptionalParams,
  FirstPartyServiceTagsListOptionalParams,
  FirstPartyServiceTagsDeleteOptionalParams,
  FirstPartyServiceTagsUpdateTagsOptionalParams,
  FirstPartyServiceTagsCreateOrUpdateOptionalParams,
  FirstPartyServiceTagsGetOptionalParams,
} from "../../api/firstPartyServiceTags/options.js";
import type { TagsObject, FirstPartyServiceTag } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FirstPartyServiceTags operations. */
export interface FirstPartyServiceTagsOperations {
  /** Gets all the first party service tags in a subscription. */
  listAll: (
    options?: FirstPartyServiceTagsListAllOptionalParams,
  ) => PagedAsyncIterableIterator<FirstPartyServiceTag>;
  /** Gets all the first party service tags in a resource group. */
  list: (
    resourceGroupName: string,
    options?: FirstPartyServiceTagsListOptionalParams,
  ) => PagedAsyncIterableIterator<FirstPartyServiceTag>;
  /** Deletes the specified first party service tag. */
  delete: (
    resourceGroupName: string,
    firstPartyServiceTagName: string,
    options?: FirstPartyServiceTagsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    firstPartyServiceTagName: string,
    options?: FirstPartyServiceTagsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    firstPartyServiceTagName: string,
    options?: FirstPartyServiceTagsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a first party service tag tags. */
  updateTags: (
    resourceGroupName: string,
    firstPartyServiceTagName: string,
    parameters: TagsObject,
    options?: FirstPartyServiceTagsUpdateTagsOptionalParams,
  ) => PollerLike<OperationState<FirstPartyServiceTag>, FirstPartyServiceTag>;
  /** @deprecated use updateTags instead */
  beginUpdateTags: (
    resourceGroupName: string,
    firstPartyServiceTagName: string,
    parameters: TagsObject,
    options?: FirstPartyServiceTagsUpdateTagsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FirstPartyServiceTag>, FirstPartyServiceTag>>;
  /** @deprecated use updateTags instead */
  beginUpdateTagsAndWait: (
    resourceGroupName: string,
    firstPartyServiceTagName: string,
    parameters: TagsObject,
    options?: FirstPartyServiceTagsUpdateTagsOptionalParams,
  ) => Promise<FirstPartyServiceTag>;
  /** Creates or updates a first party service tag. */
  createOrUpdate: (
    resourceGroupName: string,
    firstPartyServiceTagName: string,
    parameters: FirstPartyServiceTag,
    options?: FirstPartyServiceTagsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FirstPartyServiceTag>, FirstPartyServiceTag>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    firstPartyServiceTagName: string,
    parameters: FirstPartyServiceTag,
    options?: FirstPartyServiceTagsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FirstPartyServiceTag>, FirstPartyServiceTag>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    firstPartyServiceTagName: string,
    parameters: FirstPartyServiceTag,
    options?: FirstPartyServiceTagsCreateOrUpdateOptionalParams,
  ) => Promise<FirstPartyServiceTag>;
  /** Gets the specified first party service tag. */
  get: (
    resourceGroupName: string,
    firstPartyServiceTagName: string,
    options?: FirstPartyServiceTagsGetOptionalParams,
  ) => Promise<FirstPartyServiceTag>;
}

function _getFirstPartyServiceTags(context: NetworkManagementContext) {
  return {
    listAll: (options?: FirstPartyServiceTagsListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: FirstPartyServiceTagsListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      firstPartyServiceTagName: string,
      options?: FirstPartyServiceTagsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, firstPartyServiceTagName, options),
    beginDelete: async (
      resourceGroupName: string,
      firstPartyServiceTagName: string,
      options?: FirstPartyServiceTagsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, firstPartyServiceTagName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      firstPartyServiceTagName: string,
      options?: FirstPartyServiceTagsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, firstPartyServiceTagName, options);
    },
    updateTags: (
      resourceGroupName: string,
      firstPartyServiceTagName: string,
      parameters: TagsObject,
      options?: FirstPartyServiceTagsUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, firstPartyServiceTagName, parameters, options),
    beginUpdateTags: async (
      resourceGroupName: string,
      firstPartyServiceTagName: string,
      parameters: TagsObject,
      options?: FirstPartyServiceTagsUpdateTagsOptionalParams,
    ) => {
      const poller = updateTags(
        context,
        resourceGroupName,
        firstPartyServiceTagName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateTagsAndWait: async (
      resourceGroupName: string,
      firstPartyServiceTagName: string,
      parameters: TagsObject,
      options?: FirstPartyServiceTagsUpdateTagsOptionalParams,
    ) => {
      return await updateTags(
        context,
        resourceGroupName,
        firstPartyServiceTagName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      firstPartyServiceTagName: string,
      parameters: FirstPartyServiceTag,
      options?: FirstPartyServiceTagsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, firstPartyServiceTagName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      firstPartyServiceTagName: string,
      parameters: FirstPartyServiceTag,
      options?: FirstPartyServiceTagsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        firstPartyServiceTagName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      firstPartyServiceTagName: string,
      parameters: FirstPartyServiceTag,
      options?: FirstPartyServiceTagsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        firstPartyServiceTagName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      firstPartyServiceTagName: string,
      options?: FirstPartyServiceTagsGetOptionalParams,
    ) => get(context, resourceGroupName, firstPartyServiceTagName, options),
  };
}

export function _getFirstPartyServiceTagsOperations(
  context: NetworkManagementContext,
): FirstPartyServiceTagsOperations {
  return {
    ..._getFirstPartyServiceTags(context),
  };
}
