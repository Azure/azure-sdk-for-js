// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkspaceContext } from "../../api/workspaceContext.js";
import {
  RunResult,
  ComputeUsage,
  Operation,
} from "../../../models/microsoft/discovery/workspace/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";
import { OperationStatusRunResultError } from "../../../models/models.js";
import {
  getComputeUsage,
  getOperations,
  cancelRunLro,
  run,
  getRunStatus,
} from "../../api/tools/operations.js";
import {
  ToolsGetComputeUsageOptionalParams,
  ToolsGetOperationsOptionalParams,
  ToolsCancelRunLroOptionalParams,
  ToolsRunOptionalParams,
  ToolsGetRunStatusOptionalParams,
} from "../../api/tools/options.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Tools operations. */
export interface ToolsOperations {
  /** Examine compute usage. */
  getComputeUsage: (
    projectName: string,
    options?: ToolsGetComputeUsageOptionalParams,
  ) => Promise<ComputeUsage>;
  /** List tool runs. */
  getOperations: (
    projectName: string,
    options?: ToolsGetOperationsOptionalParams,
  ) => PagedAsyncIterableIterator<Operation>;
  /** Cancel an ongoing tool run. */
  cancelRun: (
    projectName: string,
    operationId: string,
    options?: ToolsCancelRunLroOptionalParams,
  ) => PollerLike<OperationState<RunResult>, RunResult>;
  /** Run the specified tool in the context of the specified project. */
  run: (
    projectName: string,
    toolId: string,
    nodePoolIds: string[],
    options?: ToolsRunOptionalParams,
  ) => PollerLike<OperationState<RunResult>, RunResult>;
  /** Used for to poll status of a Tool run. */
  getRunStatus: (
    projectName: string,
    operationId: string,
    options?: ToolsGetRunStatusOptionalParams,
  ) => Promise<OperationStatusRunResultError>;
}
function _getTools(context: WorkspaceContext) {
  return {
    getComputeUsage: (projectName: string, options?: ToolsGetComputeUsageOptionalParams) =>
      getComputeUsage(context, projectName, options),
    getOperations: (projectName: string, options?: ToolsGetOperationsOptionalParams) =>
      getOperations(context, projectName, options),
    cancelRun: (
      projectName: string,
      operationId: string,
      options?: ToolsCancelRunLroOptionalParams,
    ) => cancelRunLro(context, projectName, operationId, options),
    run: (
      projectName: string,
      toolId: string,
      nodePoolIds: string[],
      options?: ToolsRunOptionalParams,
    ) => run(context, projectName, toolId, nodePoolIds, options),
    getRunStatus: (
      projectName: string,
      operationId: string,
      options?: ToolsGetRunStatusOptionalParams,
    ) => getRunStatus(context, projectName, operationId, options),
  };
}
export function _getToolsOperations(context: WorkspaceContext): ToolsOperations {
  return {
    ..._getTools(context),
  };
}
