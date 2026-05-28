// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementContext } from "../../api/operationalInsightsManagementContext.js";
import {
  retryBin,
  stop,
  start,
  listByWorkspace,
  $delete,
  createOrUpdate,
  get,
} from "../../api/summaryLogs/operations.js";
import {
  SummaryLogsRetryBinOptionalParams,
  SummaryLogsStopOptionalParams,
  SummaryLogsStartOptionalParams,
  SummaryLogsListByWorkspaceOptionalParams,
  SummaryLogsDeleteOptionalParams,
  SummaryLogsCreateOrUpdateOptionalParams,
  SummaryLogsGetOptionalParams,
} from "../../api/summaryLogs/options.js";
import { SummaryLogs, SummaryLogsRetryBin } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SummaryLogs operations. */
export interface SummaryLogsOperations {
  /** Retries a failed Summary rule bin. */
  retryBin: (
    resourceGroupName: string,
    workspaceName: string,
    summaryLogsName: string,
    parameters: SummaryLogsRetryBin,
    options?: SummaryLogsRetryBinOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use retryBin instead */
  beginRetryBin: (
    resourceGroupName: string,
    workspaceName: string,
    summaryLogsName: string,
    parameters: SummaryLogsRetryBin,
    options?: SummaryLogsRetryBinOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use retryBin instead */
  beginRetryBinAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    summaryLogsName: string,
    parameters: SummaryLogsRetryBin,
    options?: SummaryLogsRetryBinOptionalParams,
  ) => Promise<void>;
  /** Stops an active Summary rule. */
  stop: (
    resourceGroupName: string,
    workspaceName: string,
    summaryLogsName: string,
    options?: SummaryLogsStopOptionalParams,
  ) => Promise<void>;
  /** Starts an inactive Summary rule. */
  start: (
    resourceGroupName: string,
    workspaceName: string,
    summaryLogsName: string,
    options?: SummaryLogsStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    workspaceName: string,
    summaryLogsName: string,
    options?: SummaryLogsStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    summaryLogsName: string,
    options?: SummaryLogsStartOptionalParams,
  ) => Promise<void>;
  /** Gets all summary rules for the specified Log Analytics workspace. */
  listByWorkspace: (
    resourceGroupName: string,
    workspaceName: string,
    options?: SummaryLogsListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<SummaryLogs>;
  /** Deletes Log Analytics workspace Summary rules. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    summaryLogsName: string,
    options?: SummaryLogsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    summaryLogsName: string,
    options?: SummaryLogsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    summaryLogsName: string,
    options?: SummaryLogsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates Log Analytics workspace Summary rules. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    summaryLogsName: string,
    parameters: SummaryLogs,
    options?: SummaryLogsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SummaryLogs>, SummaryLogs>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    summaryLogsName: string,
    parameters: SummaryLogs,
    options?: SummaryLogsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SummaryLogs>, SummaryLogs>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    summaryLogsName: string,
    parameters: SummaryLogs,
    options?: SummaryLogsCreateOrUpdateOptionalParams,
  ) => Promise<SummaryLogs>;
  /** Gets Log Analytics workspace Summary rules. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    summaryLogsName: string,
    options?: SummaryLogsGetOptionalParams,
  ) => Promise<SummaryLogs>;
}

function _getSummaryLogs(context: OperationalInsightsManagementContext) {
  return {
    retryBin: (
      resourceGroupName: string,
      workspaceName: string,
      summaryLogsName: string,
      parameters: SummaryLogsRetryBin,
      options?: SummaryLogsRetryBinOptionalParams,
    ) => retryBin(context, resourceGroupName, workspaceName, summaryLogsName, parameters, options),
    beginRetryBin: async (
      resourceGroupName: string,
      workspaceName: string,
      summaryLogsName: string,
      parameters: SummaryLogsRetryBin,
      options?: SummaryLogsRetryBinOptionalParams,
    ) => {
      const poller = retryBin(
        context,
        resourceGroupName,
        workspaceName,
        summaryLogsName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRetryBinAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      summaryLogsName: string,
      parameters: SummaryLogsRetryBin,
      options?: SummaryLogsRetryBinOptionalParams,
    ) => {
      return await retryBin(
        context,
        resourceGroupName,
        workspaceName,
        summaryLogsName,
        parameters,
        options,
      );
    },
    stop: (
      resourceGroupName: string,
      workspaceName: string,
      summaryLogsName: string,
      options?: SummaryLogsStopOptionalParams,
    ) => stop(context, resourceGroupName, workspaceName, summaryLogsName, options),
    start: (
      resourceGroupName: string,
      workspaceName: string,
      summaryLogsName: string,
      options?: SummaryLogsStartOptionalParams,
    ) => start(context, resourceGroupName, workspaceName, summaryLogsName, options),
    beginStart: async (
      resourceGroupName: string,
      workspaceName: string,
      summaryLogsName: string,
      options?: SummaryLogsStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, workspaceName, summaryLogsName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      summaryLogsName: string,
      options?: SummaryLogsStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, workspaceName, summaryLogsName, options);
    },
    listByWorkspace: (
      resourceGroupName: string,
      workspaceName: string,
      options?: SummaryLogsListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      summaryLogsName: string,
      options?: SummaryLogsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, summaryLogsName, options),
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      summaryLogsName: string,
      options?: SummaryLogsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, workspaceName, summaryLogsName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      summaryLogsName: string,
      options?: SummaryLogsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, workspaceName, summaryLogsName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      summaryLogsName: string,
      parameters: SummaryLogs,
      options?: SummaryLogsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        summaryLogsName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      summaryLogsName: string,
      parameters: SummaryLogs,
      options?: SummaryLogsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        summaryLogsName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      summaryLogsName: string,
      parameters: SummaryLogs,
      options?: SummaryLogsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        summaryLogsName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      workspaceName: string,
      summaryLogsName: string,
      options?: SummaryLogsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, summaryLogsName, options),
  };
}

export function _getSummaryLogsOperations(
  context: OperationalInsightsManagementContext,
): SummaryLogsOperations {
  return {
    ..._getSummaryLogs(context),
  };
}
