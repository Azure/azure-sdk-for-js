// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, $delete, create, get } from "../../api/reachabilityAnalysisRuns/operations.js";
import {
  ReachabilityAnalysisRunsListOptionalParams,
  ReachabilityAnalysisRunsDeleteOptionalParams,
  ReachabilityAnalysisRunsCreateOptionalParams,
  ReachabilityAnalysisRunsGetOptionalParams,
} from "../../api/reachabilityAnalysisRuns/options.js";
import { ReachabilityAnalysisRun } from "../../models/microsoft/network/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ReachabilityAnalysisRuns operations. */
export interface ReachabilityAnalysisRunsOperations {
  /** Gets list of Reachability Analysis Runs. */
  list: (
    resourceGroupName: string,
    networkManagerName: string,
    workspaceName: string,
    options?: ReachabilityAnalysisRunsListOptionalParams,
  ) => PagedAsyncIterableIterator<ReachabilityAnalysisRun>;
  /** Deletes Reachability Analysis Run. */
  delete: (
    resourceGroupName: string,
    networkManagerName: string,
    workspaceName: string,
    reachabilityAnalysisRunName: string,
    options?: ReachabilityAnalysisRunsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkManagerName: string,
    workspaceName: string,
    reachabilityAnalysisRunName: string,
    options?: ReachabilityAnalysisRunsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkManagerName: string,
    workspaceName: string,
    reachabilityAnalysisRunName: string,
    options?: ReachabilityAnalysisRunsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates Reachability Analysis Runs. */
  create: (
    resourceGroupName: string,
    networkManagerName: string,
    workspaceName: string,
    reachabilityAnalysisRunName: string,
    body: ReachabilityAnalysisRun,
    options?: ReachabilityAnalysisRunsCreateOptionalParams,
  ) => Promise<ReachabilityAnalysisRun>;
  /** Gets Reachability Analysis Run. */
  get: (
    resourceGroupName: string,
    networkManagerName: string,
    workspaceName: string,
    reachabilityAnalysisRunName: string,
    options?: ReachabilityAnalysisRunsGetOptionalParams,
  ) => Promise<ReachabilityAnalysisRun>;
}

function _getReachabilityAnalysisRuns(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkManagerName: string,
      workspaceName: string,
      options?: ReachabilityAnalysisRunsListOptionalParams,
    ) => list(context, resourceGroupName, networkManagerName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      networkManagerName: string,
      workspaceName: string,
      reachabilityAnalysisRunName: string,
      options?: ReachabilityAnalysisRunsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        networkManagerName,
        workspaceName,
        reachabilityAnalysisRunName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      networkManagerName: string,
      workspaceName: string,
      reachabilityAnalysisRunName: string,
      options?: ReachabilityAnalysisRunsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        networkManagerName,
        workspaceName,
        reachabilityAnalysisRunName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkManagerName: string,
      workspaceName: string,
      reachabilityAnalysisRunName: string,
      options?: ReachabilityAnalysisRunsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        networkManagerName,
        workspaceName,
        reachabilityAnalysisRunName,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      networkManagerName: string,
      workspaceName: string,
      reachabilityAnalysisRunName: string,
      body: ReachabilityAnalysisRun,
      options?: ReachabilityAnalysisRunsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        networkManagerName,
        workspaceName,
        reachabilityAnalysisRunName,
        body,
        options,
      ),
    get: (
      resourceGroupName: string,
      networkManagerName: string,
      workspaceName: string,
      reachabilityAnalysisRunName: string,
      options?: ReachabilityAnalysisRunsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        networkManagerName,
        workspaceName,
        reachabilityAnalysisRunName,
        options,
      ),
  };
}

export function _getReachabilityAnalysisRunsOperations(
  context: NetworkManagementContext,
): ReachabilityAnalysisRunsOperations {
  return {
    ..._getReachabilityAnalysisRuns(context),
  };
}
