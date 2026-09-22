// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import { list, get } from "../../api/workflowRunActionRepetitionsRequestHistories/operations.js";
import type {
  WorkflowRunActionRepetitionsRequestHistoriesListOptionalParams,
  WorkflowRunActionRepetitionsRequestHistoriesGetOptionalParams,
} from "../../api/workflowRunActionRepetitionsRequestHistories/options.js";
import type { RequestHistory } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkflowRunActionRepetitionsRequestHistories operations. */
export interface WorkflowRunActionRepetitionsRequestHistoriesOperations {
  /** List a workflow run repetition request history. */
  list: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    runName: string,
    actionName: string,
    repetitionName: string,
    options?: WorkflowRunActionRepetitionsRequestHistoriesListOptionalParams,
  ) => PagedAsyncIterableIterator<RequestHistory>;
  /** Gets a workflow run repetition request history. */
  get: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    runName: string,
    actionName: string,
    repetitionName: string,
    requestHistoryName: string,
    options?: WorkflowRunActionRepetitionsRequestHistoriesGetOptionalParams,
  ) => Promise<RequestHistory>;
}

function _getWorkflowRunActionRepetitionsRequestHistories(context: WebSiteManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      runName: string,
      actionName: string,
      repetitionName: string,
      options?: WorkflowRunActionRepetitionsRequestHistoriesListOptionalParams,
    ) =>
      list(
        context,
        resourceGroupName,
        name,
        workflowName,
        runName,
        actionName,
        repetitionName,
        options,
      ),
    get: (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      runName: string,
      actionName: string,
      repetitionName: string,
      requestHistoryName: string,
      options?: WorkflowRunActionRepetitionsRequestHistoriesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        name,
        workflowName,
        runName,
        actionName,
        repetitionName,
        requestHistoryName,
        options,
      ),
  };
}

export function _getWorkflowRunActionRepetitionsRequestHistoriesOperations(
  context: WebSiteManagementContext,
): WorkflowRunActionRepetitionsRequestHistoriesOperations {
  return {
    ..._getWorkflowRunActionRepetitionsRequestHistories(context),
  };
}
