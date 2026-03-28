// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import { cancel, get, queryByFactory } from "../../api/pipelineRuns/operations.js";
import type {
  PipelineRunsCancelOptionalParams,
  PipelineRunsGetOptionalParams,
  PipelineRunsQueryByFactoryOptionalParams,
} from "../../api/pipelineRuns/options.js";
import type {
  RunFilterParameters,
  PipelineRunsQueryResponse,
  PipelineRun,
} from "../../models/models.js";

/** Interface representing a PipelineRuns operations. */
export interface PipelineRunsOperations {
  /** Cancel a pipeline run by its run ID. */
  cancel: (
    resourceGroupName: string,
    factoryName: string,
    runId: string,
    options?: PipelineRunsCancelOptionalParams,
  ) => Promise<void>;
  /** Get a pipeline run by its run ID. */
  get: (
    resourceGroupName: string,
    factoryName: string,
    runId: string,
    options?: PipelineRunsGetOptionalParams,
  ) => Promise<PipelineRun>;
  /** Query pipeline runs in the factory based on input filter conditions. */
  queryByFactory: (
    resourceGroupName: string,
    factoryName: string,
    filterParameters: RunFilterParameters,
    options?: PipelineRunsQueryByFactoryOptionalParams,
  ) => Promise<PipelineRunsQueryResponse>;
}

function _getPipelineRuns(context: DataFactoryManagementContext) {
  return {
    cancel: (
      resourceGroupName: string,
      factoryName: string,
      runId: string,
      options?: PipelineRunsCancelOptionalParams,
    ) => cancel(context, resourceGroupName, factoryName, runId, options),
    get: (
      resourceGroupName: string,
      factoryName: string,
      runId: string,
      options?: PipelineRunsGetOptionalParams,
    ) => get(context, resourceGroupName, factoryName, runId, options),
    queryByFactory: (
      resourceGroupName: string,
      factoryName: string,
      filterParameters: RunFilterParameters,
      options?: PipelineRunsQueryByFactoryOptionalParams,
    ) => queryByFactory(context, resourceGroupName, factoryName, filterParameters, options),
  };
}

export function _getPipelineRunsOperations(
  context: DataFactoryManagementContext,
): PipelineRunsOperations {
  return {
    ..._getPipelineRuns(context),
  };
}
