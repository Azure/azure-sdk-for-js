// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import { listExpressionTraces, list, get } from "../../api/workflowRunActions/operations.js";
import type {
  WorkflowRunActionsListExpressionTracesOptionalParams,
  WorkflowRunActionsListOptionalParams,
  WorkflowRunActionsGetOptionalParams,
} from "../../api/workflowRunActions/options.js";
import type { WorkflowRunAction, ExpressionRoot } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkflowRunActions operations. */
export interface WorkflowRunActionsOperations {
  /** Lists a workflow run expression trace. */
  listExpressionTraces: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    runName: string,
    actionName: string,
    options?: WorkflowRunActionsListExpressionTracesOptionalParams,
  ) => PagedAsyncIterableIterator<ExpressionRoot>;
  /** Gets a list of workflow run actions. */
  list: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    runName: string,
    options?: WorkflowRunActionsListOptionalParams,
  ) => PagedAsyncIterableIterator<WorkflowRunAction>;
  /** Gets a workflow run action. */
  get: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    runName: string,
    actionName: string,
    options?: WorkflowRunActionsGetOptionalParams,
  ) => Promise<WorkflowRunAction>;
}

function _getWorkflowRunActions(context: WebSiteManagementContext) {
  return {
    listExpressionTraces: (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      runName: string,
      actionName: string,
      options?: WorkflowRunActionsListExpressionTracesOptionalParams,
    ) =>
      listExpressionTraces(
        context,
        resourceGroupName,
        name,
        workflowName,
        runName,
        actionName,
        options,
      ),
    list: (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      runName: string,
      options?: WorkflowRunActionsListOptionalParams,
    ) => list(context, resourceGroupName, name, workflowName, runName, options),
    get: (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      runName: string,
      actionName: string,
      options?: WorkflowRunActionsGetOptionalParams,
    ) => get(context, resourceGroupName, name, workflowName, runName, actionName, options),
  };
}

export function _getWorkflowRunActionsOperations(
  context: WebSiteManagementContext,
): WorkflowRunActionsOperations {
  return {
    ..._getWorkflowRunActions(context),
  };
}
