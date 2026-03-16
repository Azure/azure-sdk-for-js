// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import { queryByPipelineRun } from "../../api/activityRuns/operations.js";
import type { ActivityRunsQueryByPipelineRunOptionalParams } from "../../api/activityRuns/options.js";
import type { RunFilterParameters, ActivityRunsQueryResponse } from "../../models/models.js";

/** Interface representing a ActivityRuns operations. */
export interface ActivityRunsOperations {
  /** Query activity runs based on input filter conditions. */
  queryByPipelineRun: (
    resourceGroupName: string,
    factoryName: string,
    runId: string,
    filterParameters: RunFilterParameters,
    options?: ActivityRunsQueryByPipelineRunOptionalParams,
  ) => Promise<ActivityRunsQueryResponse>;
}

function _getActivityRuns(context: DataFactoryManagementContext) {
  return {
    queryByPipelineRun: (
      resourceGroupName: string,
      factoryName: string,
      runId: string,
      filterParameters: RunFilterParameters,
      options?: ActivityRunsQueryByPipelineRunOptionalParams,
    ) =>
      queryByPipelineRun(context, resourceGroupName, factoryName, runId, filterParameters, options),
  };
}

export function _getActivityRunsOperations(
  context: DataFactoryManagementContext,
): ActivityRunsOperations {
  return {
    ..._getActivityRuns(context),
  };
}
