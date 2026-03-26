// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, $delete, create, get } from "../../api/reachabilityAnalysisIntents/operations.js";
import type {
  ReachabilityAnalysisIntentsListOptionalParams,
  ReachabilityAnalysisIntentsDeleteOptionalParams,
  ReachabilityAnalysisIntentsCreateOptionalParams,
  ReachabilityAnalysisIntentsGetOptionalParams,
} from "../../api/reachabilityAnalysisIntents/options.js";
import type { ReachabilityAnalysisIntent } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ReachabilityAnalysisIntents operations. */
export interface ReachabilityAnalysisIntentsOperations {
  /** Gets list of Reachability Analysis Intents . */
  list: (
    resourceGroupName: string,
    networkManagerName: string,
    workspaceName: string,
    options?: ReachabilityAnalysisIntentsListOptionalParams,
  ) => PagedAsyncIterableIterator<ReachabilityAnalysisIntent>;
  /** Deletes Reachability Analysis Intent. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkManagerName: string,
    workspaceName: string,
    reachabilityAnalysisIntentName: string,
    options?: ReachabilityAnalysisIntentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates Reachability Analysis Intent. */
  create: (
    resourceGroupName: string,
    networkManagerName: string,
    workspaceName: string,
    reachabilityAnalysisIntentName: string,
    body: ReachabilityAnalysisIntent,
    options?: ReachabilityAnalysisIntentsCreateOptionalParams,
  ) => Promise<ReachabilityAnalysisIntent>;
  /** Get the Reachability Analysis Intent. */
  get: (
    resourceGroupName: string,
    networkManagerName: string,
    workspaceName: string,
    reachabilityAnalysisIntentName: string,
    options?: ReachabilityAnalysisIntentsGetOptionalParams,
  ) => Promise<ReachabilityAnalysisIntent>;
}

function _getReachabilityAnalysisIntents(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkManagerName: string,
      workspaceName: string,
      options?: ReachabilityAnalysisIntentsListOptionalParams,
    ) => list(context, resourceGroupName, networkManagerName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      networkManagerName: string,
      workspaceName: string,
      reachabilityAnalysisIntentName: string,
      options?: ReachabilityAnalysisIntentsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        networkManagerName,
        workspaceName,
        reachabilityAnalysisIntentName,
        options,
      ),
    create: (
      resourceGroupName: string,
      networkManagerName: string,
      workspaceName: string,
      reachabilityAnalysisIntentName: string,
      body: ReachabilityAnalysisIntent,
      options?: ReachabilityAnalysisIntentsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        networkManagerName,
        workspaceName,
        reachabilityAnalysisIntentName,
        body,
        options,
      ),
    get: (
      resourceGroupName: string,
      networkManagerName: string,
      workspaceName: string,
      reachabilityAnalysisIntentName: string,
      options?: ReachabilityAnalysisIntentsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        networkManagerName,
        workspaceName,
        reachabilityAnalysisIntentName,
        options,
      ),
  };
}

export function _getReachabilityAnalysisIntentsOperations(
  context: NetworkManagementContext,
): ReachabilityAnalysisIntentsOperations {
  return {
    ..._getReachabilityAnalysisIntents(context),
  };
}
