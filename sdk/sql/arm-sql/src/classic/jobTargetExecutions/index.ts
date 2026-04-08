// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { listByJobExecution, listByStep, get } from "../../api/jobTargetExecutions/operations.js";
import type {
  JobTargetExecutionsListByJobExecutionOptionalParams,
  JobTargetExecutionsListByStepOptionalParams,
  JobTargetExecutionsGetOptionalParams,
} from "../../api/jobTargetExecutions/options.js";
import type { JobExecution } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a JobTargetExecutions operations. */
export interface JobTargetExecutionsOperations {
  /** Lists target executions for all steps of a job execution. */
  listByJobExecution: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    jobName: string,
    jobExecutionId: string,
    options?: JobTargetExecutionsListByJobExecutionOptionalParams,
  ) => PagedAsyncIterableIterator<JobExecution>;
  /** Lists the target executions of a job step execution. */
  listByStep: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    jobName: string,
    jobExecutionId: string,
    stepName: string,
    options?: JobTargetExecutionsListByStepOptionalParams,
  ) => PagedAsyncIterableIterator<JobExecution>;
  /** Gets a target execution. */
  get: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    jobName: string,
    jobExecutionId: string,
    stepName: string,
    targetId: string,
    options?: JobTargetExecutionsGetOptionalParams,
  ) => Promise<JobExecution>;
}

function _getJobTargetExecutions(context: SqlManagementContext) {
  return {
    listByJobExecution: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      jobName: string,
      jobExecutionId: string,
      options?: JobTargetExecutionsListByJobExecutionOptionalParams,
    ) =>
      listByJobExecution(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        jobName,
        jobExecutionId,
        options,
      ),
    listByStep: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      jobName: string,
      jobExecutionId: string,
      stepName: string,
      options?: JobTargetExecutionsListByStepOptionalParams,
    ) =>
      listByStep(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        jobName,
        jobExecutionId,
        stepName,
        options,
      ),
    get: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      jobName: string,
      jobExecutionId: string,
      stepName: string,
      targetId: string,
      options?: JobTargetExecutionsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        jobName,
        jobExecutionId,
        stepName,
        targetId,
        options,
      ),
  };
}

export function _getJobTargetExecutionsOperations(
  context: SqlManagementContext,
): JobTargetExecutionsOperations {
  return {
    ..._getJobTargetExecutions(context),
  };
}
