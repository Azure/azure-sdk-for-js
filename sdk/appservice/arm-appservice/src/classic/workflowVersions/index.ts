// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import { list, get } from "../../api/workflowVersions/operations.js";
import type {
  WorkflowVersionsListOptionalParams,
  WorkflowVersionsGetOptionalParams,
} from "../../api/workflowVersions/options.js";
import type { WorkflowVersion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkflowVersions operations. */
export interface WorkflowVersionsOperations {
  /** Gets a list of workflow versions. */
  list: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    options?: WorkflowVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<WorkflowVersion>;
  /** Gets a workflow version. */
  get: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    versionId: string,
    options?: WorkflowVersionsGetOptionalParams,
  ) => Promise<WorkflowVersion>;
}

function _getWorkflowVersions(context: WebSiteManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      options?: WorkflowVersionsListOptionalParams,
    ) => list(context, resourceGroupName, name, workflowName, options),
    get: (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      versionId: string,
      options?: WorkflowVersionsGetOptionalParams,
    ) => get(context, resourceGroupName, name, workflowName, versionId, options),
  };
}

export function _getWorkflowVersionsOperations(
  context: WebSiteManagementContext,
): WorkflowVersionsOperations {
  return {
    ..._getWorkflowVersions(context),
  };
}
