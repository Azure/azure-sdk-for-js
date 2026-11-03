// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ChaosManagementContext } from "../../api/chaosManagementContext.js";
import { list, get } from "../../api/workspaceEvaluations/operations.js";
import type {
  WorkspaceEvaluationsListOptionalParams,
  WorkspaceEvaluationsGetOptionalParams,
} from "../../api/workspaceEvaluations/options.js";
import type { WorkspaceEvaluation } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceEvaluations operations. */
export interface WorkspaceEvaluationsOperations {
  /** Lists retained GA template evaluations under the workspace. Each result has its canonical ID; latest is an alias and is not a separate collection entry. This operation does not extend retention or convert scenario-backed legacy evaluations. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspaceEvaluationsListOptionalParams,
  ) => PagedAsyncIterableIterator<WorkspaceEvaluation>;
  /** Gets a retained template evaluation by its ID, or uses latest to select the most recently durably admitted GA template evaluation. Returns 200 with the current representation while processing or terminal. Returns 404 if no qualifying retained result exists; scenario-backed legacy operations are not substituted. This is not an LRO polling endpoint. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    evaluationName: string,
    options?: WorkspaceEvaluationsGetOptionalParams,
  ) => Promise<WorkspaceEvaluation>;
}

function _getWorkspaceEvaluations(context: ChaosManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspaceEvaluationsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      evaluationName: string,
      options?: WorkspaceEvaluationsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, evaluationName, options),
  };
}

export function _getWorkspaceEvaluationsOperations(
  context: ChaosManagementContext,
): WorkspaceEvaluationsOperations {
  return {
    ..._getWorkspaceEvaluations(context),
  };
}
