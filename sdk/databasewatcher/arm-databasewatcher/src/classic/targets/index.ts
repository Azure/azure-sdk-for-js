// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DatabaseWatcherContext } from "../../api/databaseWatcherContext.js";
import {
  listByWatcher,
  $delete,
  createOrUpdate,
  get,
  TargetsListByWatcherOptionalParams,
  TargetsDeleteOptionalParams,
  TargetsCreateOrUpdateOptionalParams,
  TargetsGetOptionalParams,
} from "../../api/targets/index.js";
import { Target } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Targets operations. */
export interface TargetsOperations {
  /** List Target resources by Watcher */
  listByWatcher: (
    resourceGroupName: string,
    watcherName: string,
    options?: TargetsListByWatcherOptionalParams,
  ) => PagedAsyncIterableIterator<Target>;
  /** Delete a Target */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    watcherName: string,
    targetName: string,
    options?: TargetsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a Target */
  createOrUpdate: (
    resourceGroupName: string,
    watcherName: string,
    targetName: string,
    resource: Target,
    options?: TargetsCreateOrUpdateOptionalParams,
  ) => Promise<Target>;
  /** Get a Target */
  get: (
    resourceGroupName: string,
    watcherName: string,
    targetName: string,
    options?: TargetsGetOptionalParams,
  ) => Promise<Target>;
}

function _getTargets(context: DatabaseWatcherContext) {
  return {
    listByWatcher: (
      resourceGroupName: string,
      watcherName: string,
      options?: TargetsListByWatcherOptionalParams,
    ) => listByWatcher(context, resourceGroupName, watcherName, options),
    delete: (
      resourceGroupName: string,
      watcherName: string,
      targetName: string,
      options?: TargetsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, watcherName, targetName, options),
    createOrUpdate: (
      resourceGroupName: string,
      watcherName: string,
      targetName: string,
      resource: Target,
      options?: TargetsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, watcherName, targetName, resource, options),
    get: (
      resourceGroupName: string,
      watcherName: string,
      targetName: string,
      options?: TargetsGetOptionalParams,
    ) => get(context, resourceGroupName, watcherName, targetName, options),
  };
}

export function _getTargetsOperations(context: DatabaseWatcherContext): TargetsOperations {
  return {
    ..._getTargets(context),
  };
}
