// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  stop,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/connectionMonitors/operations.js";
import type {
  ConnectionMonitorsStopOptionalParams,
  ConnectionMonitorsListOptionalParams,
  ConnectionMonitorsDeleteOptionalParams,
  ConnectionMonitorsUpdateTagsOptionalParams,
  ConnectionMonitorsCreateOrUpdateOptionalParams,
  ConnectionMonitorsGetOptionalParams,
} from "../../api/connectionMonitors/options.js";
import type {
  TagsObject,
  ConnectionMonitorResult,
  ConnectionMonitor,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ConnectionMonitors operations. */
export interface ConnectionMonitorsOperations {
  /** Stops the specified connection monitor. */
  stop: (
    resourceGroupName: string,
    networkWatcherName: string,
    connectionMonitorName: string,
    options?: ConnectionMonitorsStopOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use stop instead */
  beginStop: (
    resourceGroupName: string,
    networkWatcherName: string,
    connectionMonitorName: string,
    options?: ConnectionMonitorsStopOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use stop instead */
  beginStopAndWait: (
    resourceGroupName: string,
    networkWatcherName: string,
    connectionMonitorName: string,
    options?: ConnectionMonitorsStopOptionalParams,
  ) => Promise<void>;
  /** Lists all connection monitors for the specified Network Watcher. */
  list: (
    resourceGroupName: string,
    networkWatcherName: string,
    options?: ConnectionMonitorsListOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectionMonitorResult>;
  /** Deletes the specified connection monitor. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkWatcherName: string,
    connectionMonitorName: string,
    options?: ConnectionMonitorsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkWatcherName: string,
    connectionMonitorName: string,
    options?: ConnectionMonitorsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkWatcherName: string,
    connectionMonitorName: string,
    options?: ConnectionMonitorsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update tags of the specified connection monitor. */
  updateTags: (
    resourceGroupName: string,
    networkWatcherName: string,
    connectionMonitorName: string,
    parameters: TagsObject,
    options?: ConnectionMonitorsUpdateTagsOptionalParams,
  ) => Promise<ConnectionMonitorResult>;
  /** Create or update a connection monitor. */
  createOrUpdate: (
    resourceGroupName: string,
    networkWatcherName: string,
    connectionMonitorName: string,
    parameters: ConnectionMonitor,
    options?: ConnectionMonitorsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ConnectionMonitorResult>, ConnectionMonitorResult>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    networkWatcherName: string,
    connectionMonitorName: string,
    parameters: ConnectionMonitor,
    options?: ConnectionMonitorsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ConnectionMonitorResult>, ConnectionMonitorResult>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    networkWatcherName: string,
    connectionMonitorName: string,
    parameters: ConnectionMonitor,
    options?: ConnectionMonitorsCreateOrUpdateOptionalParams,
  ) => Promise<ConnectionMonitorResult>;
  /** Gets a connection monitor by name. */
  get: (
    resourceGroupName: string,
    networkWatcherName: string,
    connectionMonitorName: string,
    options?: ConnectionMonitorsGetOptionalParams,
  ) => Promise<ConnectionMonitorResult>;
}

function _getConnectionMonitors(context: NetworkManagementContext) {
  return {
    stop: (
      resourceGroupName: string,
      networkWatcherName: string,
      connectionMonitorName: string,
      options?: ConnectionMonitorsStopOptionalParams,
    ) => stop(context, resourceGroupName, networkWatcherName, connectionMonitorName, options),
    beginStop: async (
      resourceGroupName: string,
      networkWatcherName: string,
      connectionMonitorName: string,
      options?: ConnectionMonitorsStopOptionalParams,
    ) => {
      const poller = stop(
        context,
        resourceGroupName,
        networkWatcherName,
        connectionMonitorName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopAndWait: async (
      resourceGroupName: string,
      networkWatcherName: string,
      connectionMonitorName: string,
      options?: ConnectionMonitorsStopOptionalParams,
    ) => {
      return await stop(
        context,
        resourceGroupName,
        networkWatcherName,
        connectionMonitorName,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      networkWatcherName: string,
      options?: ConnectionMonitorsListOptionalParams,
    ) => list(context, resourceGroupName, networkWatcherName, options),
    delete: (
      resourceGroupName: string,
      networkWatcherName: string,
      connectionMonitorName: string,
      options?: ConnectionMonitorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkWatcherName, connectionMonitorName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkWatcherName: string,
      connectionMonitorName: string,
      options?: ConnectionMonitorsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        networkWatcherName,
        connectionMonitorName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkWatcherName: string,
      connectionMonitorName: string,
      options?: ConnectionMonitorsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        networkWatcherName,
        connectionMonitorName,
        options,
      );
    },
    updateTags: (
      resourceGroupName: string,
      networkWatcherName: string,
      connectionMonitorName: string,
      parameters: TagsObject,
      options?: ConnectionMonitorsUpdateTagsOptionalParams,
    ) =>
      updateTags(
        context,
        resourceGroupName,
        networkWatcherName,
        connectionMonitorName,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      networkWatcherName: string,
      connectionMonitorName: string,
      parameters: ConnectionMonitor,
      options?: ConnectionMonitorsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        networkWatcherName,
        connectionMonitorName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      networkWatcherName: string,
      connectionMonitorName: string,
      parameters: ConnectionMonitor,
      options?: ConnectionMonitorsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        networkWatcherName,
        connectionMonitorName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      networkWatcherName: string,
      connectionMonitorName: string,
      parameters: ConnectionMonitor,
      options?: ConnectionMonitorsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        networkWatcherName,
        connectionMonitorName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      networkWatcherName: string,
      connectionMonitorName: string,
      options?: ConnectionMonitorsGetOptionalParams,
    ) => get(context, resourceGroupName, networkWatcherName, connectionMonitorName, options),
  };
}

export function _getConnectionMonitorsOperations(
  context: NetworkManagementContext,
): ConnectionMonitorsOperations {
  return {
    ..._getConnectionMonitors(context),
  };
}
