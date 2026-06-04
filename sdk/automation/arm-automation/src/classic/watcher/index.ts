// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  stop,
  start,
  listByAutomationAccount,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/watcher/operations.js";
import type {
  WatcherStopOptionalParams,
  WatcherStartOptionalParams,
  WatcherListByAutomationAccountOptionalParams,
  WatcherDeleteOptionalParams,
  WatcherUpdateOptionalParams,
  WatcherCreateOrUpdateOptionalParams,
  WatcherGetOptionalParams,
} from "../../api/watcher/options.js";
import type { Watcher, WatcherUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Watcher operations. */
export interface WatcherOperations {
  /** Resume the watcher identified by watcher name. */
  stop: (
    resourceGroupName: string,
    automationAccountName: string,
    watcherName: string,
    options?: WatcherStopOptionalParams,
  ) => Promise<void>;
  /** Resume the watcher identified by watcher name. */
  start: (
    resourceGroupName: string,
    automationAccountName: string,
    watcherName: string,
    options?: WatcherStartOptionalParams,
  ) => Promise<void>;
  /** Retrieve a list of watchers. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: WatcherListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Watcher>;
  /** Delete the watcher by name. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    watcherName: string,
    options?: WatcherDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the watcher identified by watcher name. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    watcherName: string,
    parameters: WatcherUpdateParameters,
    options?: WatcherUpdateOptionalParams,
  ) => Promise<Watcher>;
  /** Create the watcher identified by watcher name. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    watcherName: string,
    parameters: Watcher,
    options?: WatcherCreateOrUpdateOptionalParams,
  ) => Promise<Watcher>;
  /** Retrieve the watcher identified by watcher name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    watcherName: string,
    options?: WatcherGetOptionalParams,
  ) => Promise<Watcher>;
}

function _getWatcher(context: AutomationContext) {
  return {
    stop: (
      resourceGroupName: string,
      automationAccountName: string,
      watcherName: string,
      options?: WatcherStopOptionalParams,
    ) => stop(context, resourceGroupName, automationAccountName, watcherName, options),
    start: (
      resourceGroupName: string,
      automationAccountName: string,
      watcherName: string,
      options?: WatcherStartOptionalParams,
    ) => start(context, resourceGroupName, automationAccountName, watcherName, options),
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: WatcherListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      watcherName: string,
      options?: WatcherDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, watcherName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      watcherName: string,
      parameters: WatcherUpdateParameters,
      options?: WatcherUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, automationAccountName, watcherName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      watcherName: string,
      parameters: Watcher,
      options?: WatcherCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        automationAccountName,
        watcherName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      watcherName: string,
      options?: WatcherGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, watcherName, options),
  };
}

export function _getWatcherOperations(context: AutomationContext): WatcherOperations {
  return {
    ..._getWatcher(context),
  };
}
