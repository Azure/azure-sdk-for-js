// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DatabaseWatcherContext } from "../../api/databaseWatcherContext.js";
import {
  stop,
  start,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
  WatchersStopOptionalParams,
  WatchersStartOptionalParams,
  WatchersListBySubscriptionOptionalParams,
  WatchersListByResourceGroupOptionalParams,
  WatchersDeleteOptionalParams,
  WatchersUpdateOptionalParams,
  WatchersCreateOrUpdateOptionalParams,
  WatchersGetOptionalParams,
} from "../../api/watchers/index.js";
import { Watcher, WatcherUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Watchers operations. */
export interface WatchersOperations {
  /** The action to stop monitoring all targets configured for a database watcher. */
  stop: (
    resourceGroupName: string,
    watcherName: string,
    options?: WatchersStopOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The action to start monitoring all targets configured for a database watcher. */
  start: (
    resourceGroupName: string,
    watcherName: string,
    options?: WatchersStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List Watcher resources by subscription ID */
  listBySubscription: (
    options?: WatchersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Watcher>;
  /** List Watcher resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: WatchersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Watcher>;
  /** Delete a Watcher */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    watcherName: string,
    options?: WatchersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Watcher */
  update: (
    resourceGroupName: string,
    watcherName: string,
    properties: WatcherUpdate,
    options?: WatchersUpdateOptionalParams,
  ) => PollerLike<OperationState<Watcher>, Watcher>;
  /** Create a Watcher */
  createOrUpdate: (
    resourceGroupName: string,
    watcherName: string,
    resource: Watcher,
    options?: WatchersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Watcher>, Watcher>;
  /** Get a Watcher */
  get: (
    resourceGroupName: string,
    watcherName: string,
    options?: WatchersGetOptionalParams,
  ) => Promise<Watcher>;
}

function _getWatchers(context: DatabaseWatcherContext) {
  return {
    stop: (resourceGroupName: string, watcherName: string, options?: WatchersStopOptionalParams) =>
      stop(context, resourceGroupName, watcherName, options),
    start: (
      resourceGroupName: string,
      watcherName: string,
      options?: WatchersStartOptionalParams,
    ) => start(context, resourceGroupName, watcherName, options),
    listBySubscription: (options?: WatchersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: WatchersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      watcherName: string,
      options?: WatchersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, watcherName, options),
    update: (
      resourceGroupName: string,
      watcherName: string,
      properties: WatcherUpdate,
      options?: WatchersUpdateOptionalParams,
    ) => update(context, resourceGroupName, watcherName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      watcherName: string,
      resource: Watcher,
      options?: WatchersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, watcherName, resource, options),
    get: (resourceGroupName: string, watcherName: string, options?: WatchersGetOptionalParams) =>
      get(context, resourceGroupName, watcherName, options),
  };
}

export function _getWatchersOperations(context: DatabaseWatcherContext): WatchersOperations {
  return {
    ..._getWatchers(context),
  };
}
