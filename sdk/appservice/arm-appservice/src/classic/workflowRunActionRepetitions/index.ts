// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  listExpressionTraces,
  list,
  get,
} from "../../api/workflowRunActionRepetitions/operations.js";
import type {
  WorkflowRunActionRepetitionsListExpressionTracesOptionalParams,
  WorkflowRunActionRepetitionsListOptionalParams,
  WorkflowRunActionRepetitionsGetOptionalParams,
} from "../../api/workflowRunActionRepetitions/options.js";
import type { ExpressionRoot, WorkflowRunActionRepetitionDefinition } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkflowRunActionRepetitions operations. */
export interface WorkflowRunActionRepetitionsOperations {
  /** Lists a workflow run expression trace. */
  listExpressionTraces: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    runName: string,
    actionName: string,
    repetitionName: string,
    options?: WorkflowRunActionRepetitionsListExpressionTracesOptionalParams,
  ) => PagedAsyncIterableIterator<ExpressionRoot>;
  /** Get all of a workflow run action repetitions. */
  list: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    runName: string,
    actionName: string,
    options?: WorkflowRunActionRepetitionsListOptionalParams,
  ) => PagedAsyncIterableIterator<WorkflowRunActionRepetitionDefinition>;
  /** Get a workflow run action repetition. */
  get: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    runName: string,
    actionName: string,
    repetitionName: string,
    options?: WorkflowRunActionRepetitionsGetOptionalParams,
  ) => Promise<WorkflowRunActionRepetitionDefinition>;
}

function _getWorkflowRunActionRepetitions(context: WebSiteManagementContext) {
  return {
    listExpressionTraces: (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      runName: string,
      actionName: string,
      repetitionName: string,
      options?: WorkflowRunActionRepetitionsListExpressionTracesOptionalParams,
    ) =>
      listExpressionTraces(
        context,
        resourceGroupName,
        name,
        workflowName,
        runName,
        actionName,
        repetitionName,
        options,
      ),
    list: (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      runName: string,
      actionName: string,
      options?: WorkflowRunActionRepetitionsListOptionalParams,
    ) => list(context, resourceGroupName, name, workflowName, runName, actionName, options),
    get: (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      runName: string,
      actionName: string,
      repetitionName: string,
      options?: WorkflowRunActionRepetitionsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        name,
        workflowName,
        runName,
        actionName,
        repetitionName,
        options,
      ),
  };
}

export function _getWorkflowRunActionRepetitionsOperations(
  context: WebSiteManagementContext,
): WorkflowRunActionRepetitionsOperations {
  return {
    ..._getWorkflowRunActionRepetitions(context),
  };
}
