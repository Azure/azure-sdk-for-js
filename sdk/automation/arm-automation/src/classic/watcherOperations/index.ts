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
} from "../../api/watcherOperations/operations.js";
import type {
  WatcherOperationsStopOptionalParams,
  WatcherOperationsStartOptionalParams,
  WatcherOperationsListByAutomationAccountOptionalParams,
  WatcherOperationsDeleteOptionalParams,
  WatcherOperationsUpdateOptionalParams,
  WatcherOperationsCreateOrUpdateOptionalParams,
  WatcherOperationsGetOptionalParams,
} from "../../api/watcherOperations/options.js";
import type { Watcher, WatcherUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WatcherOperations operations. */
export interface WatcherOperationsOperations {
  /** Resume the watcher identified by watcher name. */
  stop: (
    resourceGroupName: string,
    automationAccountName: string,
    watcherName: string,
    options?: WatcherOperationsStopOptionalParams,
  ) => Promise<void>;
  /** Resume the watcher identified by watcher name. */
  start: (
    resourceGroupName: string,
    automationAccountName: string,
    watcherName: string,
    options?: WatcherOperationsStartOptionalParams,
  ) => Promise<void>;
  /** Retrieve a list of watchers. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: WatcherOperationsListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Watcher>;
  /** Delete the watcher by name. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    watcherName: string,
    options?: WatcherOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the watcher identified by watcher name. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    watcherName: string,
    parameters: WatcherUpdateParameters,
    options?: WatcherOperationsUpdateOptionalParams,
  ) => Promise<Watcher>;
  /** Create the watcher identified by watcher name. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    watcherName: string,
    parameters: Watcher,
    options?: WatcherOperationsCreateOrUpdateOptionalParams,
  ) => Promise<Watcher>;
  /** Retrieve the watcher identified by watcher name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    watcherName: string,
    options?: WatcherOperationsGetOptionalParams,
  ) => Promise<Watcher>;
}

function _getWatcherOperations(context: AutomationContext) {
  return {
    stop: (
      resourceGroupName: string,
      automationAccountName: string,
      watcherName: string,
      options?: WatcherOperationsStopOptionalParams,
    ) => stop(context, resourceGroupName, automationAccountName, watcherName, options),
    start: (
      resourceGroupName: string,
      automationAccountName: string,
      watcherName: string,
      options?: WatcherOperationsStartOptionalParams,
    ) => start(context, resourceGroupName, automationAccountName, watcherName, options),
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: WatcherOperationsListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      watcherName: string,
      options?: WatcherOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, watcherName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      watcherName: string,
      parameters: WatcherUpdateParameters,
      options?: WatcherOperationsUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, automationAccountName, watcherName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      watcherName: string,
      parameters: Watcher,
      options?: WatcherOperationsCreateOrUpdateOptionalParams,
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
      options?: WatcherOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, watcherName, options),
  };
}

export function _getWatcherOperationsOperations(
  context: AutomationContext,
): WatcherOperationsOperations {
  return {
    ..._getWatcherOperations(context),
  };
}
