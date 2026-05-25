// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import { list, get } from "../../api/workflowRunActionScopeRepetitions/operations.js";
import {
  WorkflowRunActionScopeRepetitionsListOptionalParams,
  WorkflowRunActionScopeRepetitionsGetOptionalParams,
} from "../../api/workflowRunActionScopeRepetitions/options.js";
import { WorkflowRunActionRepetitionDefinition } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkflowRunActionScopeRepetitions operations. */
export interface WorkflowRunActionScopeRepetitionsOperations {
  /** List the workflow run action scoped repetitions. */
  list: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    runName: string,
    actionName: string,
    options?: WorkflowRunActionScopeRepetitionsListOptionalParams,
  ) => PagedAsyncIterableIterator<WorkflowRunActionRepetitionDefinition>;
  /** Get a workflow run action scoped repetition. */
  get: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    runName: string,
    actionName: string,
    repetitionName: string,
    options?: WorkflowRunActionScopeRepetitionsGetOptionalParams,
  ) => Promise<WorkflowRunActionRepetitionDefinition>;
}

function _getWorkflowRunActionScopeRepetitions(context: WebSiteManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      runName: string,
      actionName: string,
      options?: WorkflowRunActionScopeRepetitionsListOptionalParams,
    ) => list(context, resourceGroupName, name, workflowName, runName, actionName, options),
    get: (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      runName: string,
      actionName: string,
      repetitionName: string,
      options?: WorkflowRunActionScopeRepetitionsGetOptionalParams,
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

export function _getWorkflowRunActionScopeRepetitionsOperations(
  context: WebSiteManagementContext,
): WorkflowRunActionScopeRepetitionsOperations {
  return {
    ..._getWorkflowRunActionScopeRepetitions(context),
  };
}
