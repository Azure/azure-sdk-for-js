// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import { cancel, list, get } from "../../api/workflowRuns/operations.js";
import {
  WorkflowRunsCancelOptionalParams,
  WorkflowRunsListOptionalParams,
  WorkflowRunsGetOptionalParams,
} from "../../api/workflowRuns/options.js";
import { WorkflowRun } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkflowRuns operations. */
export interface WorkflowRunsOperations {
  /** Cancels a workflow run. */
  cancel: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    runName: string,
    options?: WorkflowRunsCancelOptionalParams,
  ) => Promise<void>;
  /** Gets a list of workflow runs. */
  list: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    options?: WorkflowRunsListOptionalParams,
  ) => PagedAsyncIterableIterator<WorkflowRun>;
  /** Gets a workflow run. */
  get: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    runName: string,
    options?: WorkflowRunsGetOptionalParams,
  ) => Promise<WorkflowRun>;
}

function _getWorkflowRuns(context: WebSiteManagementContext) {
  return {
    cancel: (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      runName: string,
      options?: WorkflowRunsCancelOptionalParams,
    ) => cancel(context, resourceGroupName, name, workflowName, runName, options),
    list: (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      options?: WorkflowRunsListOptionalParams,
    ) => list(context, resourceGroupName, name, workflowName, options),
    get: (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      runName: string,
      options?: WorkflowRunsGetOptionalParams,
    ) => get(context, resourceGroupName, name, workflowName, runName, options),
  };
}

export function _getWorkflowRunsOperations(
  context: WebSiteManagementContext,
): WorkflowRunsOperations {
  return {
    ..._getWorkflowRuns(context),
  };
}
