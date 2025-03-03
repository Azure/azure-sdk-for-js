// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DatabaseWatcherContext } from "../../api/databaseWatcherContext.js";
import {
  listByWatcher,
  $delete,
  create,
  get,
  SharedPrivateLinkResourcesListByWatcherOptionalParams,
  SharedPrivateLinkResourcesDeleteOptionalParams,
  SharedPrivateLinkResourcesCreateOptionalParams,
  SharedPrivateLinkResourcesGetOptionalParams,
} from "../../api/sharedPrivateLinkResources/index.js";
import { SharedPrivateLinkResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SharedPrivateLinkResources operations. */
export interface SharedPrivateLinkResourcesOperations {
  /** List SharedPrivateLinkResource resources by Watcher */
  listByWatcher: (
    resourceGroupName: string,
    watcherName: string,
    options?: SharedPrivateLinkResourcesListByWatcherOptionalParams,
  ) => PagedAsyncIterableIterator<SharedPrivateLinkResource>;
  /** Delete a SharedPrivateLinkResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    watcherName: string,
    sharedPrivateLinkResourceName: string,
    options?: SharedPrivateLinkResourcesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a SharedPrivateLinkResource */
  create: (
    resourceGroupName: string,
    watcherName: string,
    sharedPrivateLinkResourceName: string,
    resource: SharedPrivateLinkResource,
    options?: SharedPrivateLinkResourcesCreateOptionalParams,
  ) => PollerLike<OperationState<SharedPrivateLinkResource>, SharedPrivateLinkResource>;
  /** Get a SharedPrivateLinkResource */
  get: (
    resourceGroupName: string,
    watcherName: string,
    sharedPrivateLinkResourceName: string,
    options?: SharedPrivateLinkResourcesGetOptionalParams,
  ) => Promise<SharedPrivateLinkResource>;
}

function _getSharedPrivateLinkResources(context: DatabaseWatcherContext) {
  return {
    listByWatcher: (
      resourceGroupName: string,
      watcherName: string,
      options?: SharedPrivateLinkResourcesListByWatcherOptionalParams,
    ) => listByWatcher(context, resourceGroupName, watcherName, options),
    delete: (
      resourceGroupName: string,
      watcherName: string,
      sharedPrivateLinkResourceName: string,
      options?: SharedPrivateLinkResourcesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, watcherName, sharedPrivateLinkResourceName, options),
    create: (
      resourceGroupName: string,
      watcherName: string,
      sharedPrivateLinkResourceName: string,
      resource: SharedPrivateLinkResource,
      options?: SharedPrivateLinkResourcesCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        watcherName,
        sharedPrivateLinkResourceName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      watcherName: string,
      sharedPrivateLinkResourceName: string,
      options?: SharedPrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, watcherName, sharedPrivateLinkResourceName, options),
  };
}

export function _getSharedPrivateLinkResourcesOperations(
  context: DatabaseWatcherContext,
): SharedPrivateLinkResourcesOperations {
  return {
    ..._getSharedPrivateLinkResources(context),
  };
}
