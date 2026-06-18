// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  deleteOptimizationJob,
  cancelOptimizationJob,
  listOptimizationJobs,
  getOptimizationJob,
  createOptimizationJob,
} from "../../../api/beta/agents/operations.js";
import type {
  BetaAgentsDeleteOptimizationJobOptionalParams,
  BetaAgentsCancelOptimizationJobOptionalParams,
  BetaAgentsListOptimizationJobsOptionalParams,
  BetaAgentsGetOptimizationJobOptionalParams,
  BetaAgentsCreateOptimizationJobOptionalParams,
} from "../../../api/beta/agents/options.js";
import type { OptimizationJob, OptimizationJobListItem } from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a BetaAgents operations. */
export interface BetaAgentsOperations {
  /** Delete the job and its candidate artifacts. Cancels first if non-terminal. */
  deleteOptimizationJob: (
    jobId: string,
    options?: BetaAgentsDeleteOptimizationJobOptionalParams,
  ) => Promise<void>;
  /** Request cancellation of a running or queued job. Returns an error if the job is already in a terminal state. */
  cancelOptimizationJob: (
    jobId: string,
    options?: BetaAgentsCancelOptimizationJobOptionalParams,
  ) => Promise<OptimizationJob>;
  /** List optimization jobs. Supports cursor pagination and optional status / agent_name filters. */
  listOptimizationJobs: (
    options?: BetaAgentsListOptimizationJobsOptionalParams,
  ) => PagedAsyncIterableIterator<OptimizationJobListItem>;
  /** Get an optimization job by id. */
  getOptimizationJob: (
    jobId: string,
    options?: BetaAgentsGetOptimizationJobOptionalParams,
  ) => Promise<OptimizationJob>;
  /** Create an optimization job. Returns 201 with the queued job. Honours `Operation-Id` for idempotent retry. */
  createOptimizationJob: (
    job: OptimizationJob,
    options?: BetaAgentsCreateOptimizationJobOptionalParams,
  ) => Promise<OptimizationJob>;
}

function _getBetaAgents(context: AIProjectContext) {
  return {
    deleteOptimizationJob: (
      jobId: string,
      options?: BetaAgentsDeleteOptimizationJobOptionalParams,
    ) => deleteOptimizationJob(context, jobId, options),
    cancelOptimizationJob: (
      jobId: string,
      options?: BetaAgentsCancelOptimizationJobOptionalParams,
    ) => cancelOptimizationJob(context, jobId, options),
    listOptimizationJobs: (options?: BetaAgentsListOptimizationJobsOptionalParams) =>
      listOptimizationJobs(context, options),
    getOptimizationJob: (jobId: string, options?: BetaAgentsGetOptimizationJobOptionalParams) =>
      getOptimizationJob(context, jobId, options),
    createOptimizationJob: (
      job: OptimizationJob,
      options?: BetaAgentsCreateOptimizationJobOptionalParams,
    ) => createOptimizationJob(context, job, options),
  };
}

export function _getBetaAgentsOperations(context: AIProjectContext): BetaAgentsOperations {
  return {
    ..._getBetaAgents(context),
  };
}
