// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, $delete, updateTags, createOrUpdate, get } from "../../api/flowLogs/operations.js";
import type {
  FlowLogsListOptionalParams,
  FlowLogsDeleteOptionalParams,
  FlowLogsUpdateTagsOptionalParams,
  FlowLogsCreateOrUpdateOptionalParams,
  FlowLogsGetOptionalParams,
} from "../../api/flowLogs/options.js";
import type { FlowLog, TagsObject } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FlowLogs operations. */
export interface FlowLogsOperations {
  /** Lists all flow log resources for the specified Network Watcher. */
  list: (
    resourceGroupName: string,
    networkWatcherName: string,
    options?: FlowLogsListOptionalParams,
  ) => PagedAsyncIterableIterator<FlowLog>;
  /** Deletes the specified flow log resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkWatcherName: string,
    flowLogName: string,
    options?: FlowLogsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkWatcherName: string,
    flowLogName: string,
    options?: FlowLogsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkWatcherName: string,
    flowLogName: string,
    options?: FlowLogsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update tags of the specified flow log. */
  updateTags: (
    resourceGroupName: string,
    networkWatcherName: string,
    flowLogName: string,
    parameters: TagsObject,
    options?: FlowLogsUpdateTagsOptionalParams,
  ) => Promise<FlowLog>;
  /** Create or update a flow log for the specified network security group. */
  createOrUpdate: (
    resourceGroupName: string,
    networkWatcherName: string,
    flowLogName: string,
    parameters: FlowLog,
    options?: FlowLogsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FlowLog>, FlowLog>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    networkWatcherName: string,
    flowLogName: string,
    parameters: FlowLog,
    options?: FlowLogsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FlowLog>, FlowLog>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    networkWatcherName: string,
    flowLogName: string,
    parameters: FlowLog,
    options?: FlowLogsCreateOrUpdateOptionalParams,
  ) => Promise<FlowLog>;
  /** Gets a flow log resource by name. */
  get: (
    resourceGroupName: string,
    networkWatcherName: string,
    flowLogName: string,
    options?: FlowLogsGetOptionalParams,
  ) => Promise<FlowLog>;
}

function _getFlowLogs(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkWatcherName: string,
      options?: FlowLogsListOptionalParams,
    ) => list(context, resourceGroupName, networkWatcherName, options),
    delete: (
      resourceGroupName: string,
      networkWatcherName: string,
      flowLogName: string,
      options?: FlowLogsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkWatcherName, flowLogName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkWatcherName: string,
      flowLogName: string,
      options?: FlowLogsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, networkWatcherName, flowLogName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkWatcherName: string,
      flowLogName: string,
      options?: FlowLogsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, networkWatcherName, flowLogName, options);
    },
    updateTags: (
      resourceGroupName: string,
      networkWatcherName: string,
      flowLogName: string,
      parameters: TagsObject,
      options?: FlowLogsUpdateTagsOptionalParams,
    ) =>
      updateTags(context, resourceGroupName, networkWatcherName, flowLogName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      networkWatcherName: string,
      flowLogName: string,
      parameters: FlowLog,
      options?: FlowLogsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        networkWatcherName,
        flowLogName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      networkWatcherName: string,
      flowLogName: string,
      parameters: FlowLog,
      options?: FlowLogsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        networkWatcherName,
        flowLogName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      networkWatcherName: string,
      flowLogName: string,
      parameters: FlowLog,
      options?: FlowLogsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        networkWatcherName,
        flowLogName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      networkWatcherName: string,
      flowLogName: string,
      options?: FlowLogsGetOptionalParams,
    ) => get(context, resourceGroupName, networkWatcherName, flowLogName, options),
  };
}

export function _getFlowLogsOperations(context: NetworkManagementContext): FlowLogsOperations {
  return {
    ..._getFlowLogs(context),
  };
}
