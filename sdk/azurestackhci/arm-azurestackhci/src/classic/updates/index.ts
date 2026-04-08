// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import { post, list, $delete, put, get } from "../../api/updates/operations.js";
import type {
  UpdatesPostOptionalParams,
  UpdatesListOptionalParams,
  UpdatesDeleteOptionalParams,
  UpdatesPutOptionalParams,
  UpdatesGetOptionalParams,
} from "../../api/updates/options.js";
import type { Update } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Updates operations. */
export interface UpdatesOperations {
  /** Apply Update */
  post: (
    resourceGroupName: string,
    clusterName: string,
    updateName: string,
    options?: UpdatesPostOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use post instead */
  beginPost: (
    resourceGroupName: string,
    clusterName: string,
    updateName: string,
    options?: UpdatesPostOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use post instead */
  beginPostAndWait: (
    resourceGroupName: string,
    clusterName: string,
    updateName: string,
    options?: UpdatesPostOptionalParams,
  ) => Promise<void>;
  /** List all Updates */
  list: (
    resourceGroupName: string,
    clusterName: string,
    options?: UpdatesListOptionalParams,
  ) => PagedAsyncIterableIterator<Update>;
  /** Delete specified Update */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    updateName: string,
    options?: UpdatesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    updateName: string,
    options?: UpdatesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    updateName: string,
    options?: UpdatesDeleteOptionalParams,
  ) => Promise<void>;
  /** Put specified Update */
  put: (
    resourceGroupName: string,
    clusterName: string,
    updateName: string,
    updateProperties: Update,
    options?: UpdatesPutOptionalParams,
  ) => Promise<Update>;
  /** Get specified Update */
  get: (
    resourceGroupName: string,
    clusterName: string,
    updateName: string,
    options?: UpdatesGetOptionalParams,
  ) => Promise<Update>;
}

function _getUpdates(context: AzureStackHCIContext) {
  return {
    post: (
      resourceGroupName: string,
      clusterName: string,
      updateName: string,
      options?: UpdatesPostOptionalParams,
    ) => post(context, resourceGroupName, clusterName, updateName, options),
    beginPost: async (
      resourceGroupName: string,
      clusterName: string,
      updateName: string,
      options?: UpdatesPostOptionalParams,
    ) => {
      const poller = post(context, resourceGroupName, clusterName, updateName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPostAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      updateName: string,
      options?: UpdatesPostOptionalParams,
    ) => {
      return await post(context, resourceGroupName, clusterName, updateName, options);
    },
    list: (resourceGroupName: string, clusterName: string, options?: UpdatesListOptionalParams) =>
      list(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      updateName: string,
      options?: UpdatesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, updateName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      updateName: string,
      options?: UpdatesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, updateName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      updateName: string,
      options?: UpdatesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, updateName, options);
    },
    put: (
      resourceGroupName: string,
      clusterName: string,
      updateName: string,
      updateProperties: Update,
      options?: UpdatesPutOptionalParams,
    ) => put(context, resourceGroupName, clusterName, updateName, updateProperties, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      updateName: string,
      options?: UpdatesGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, updateName, options),
  };
}

export function _getUpdatesOperations(context: AzureStackHCIContext): UpdatesOperations {
  return {
    ..._getUpdates(context),
  };
}
