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
<<<<<<< /tmp/azsdk-dev-toolnFGKkd/result/src/classic/beta/agents/index.ts
import {
  AgentOptimizationJob,
  AgentOptimizationJobResult,
  AgentOptimizationJobListItem,
||||||| /tmp/azsdk-dev-toolnFGKkd/base/sdk/ai/ai-projects/generated/classic/beta/agents/index.ts
import {
  OptimizationJob,
  OptimizationJobResult,
  OptimizationJobListItem,
=======
import type {
  OptimizationJob,
  OptimizationJobResult,
  OptimizationJobListItem,
>>>>>>> /tmp/azsdk-dev-toolnFGKkd/custom/sdk/ai/ai-projects/src/classic/beta/agents/index.ts
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { JobPoller } from "../../../static-helpers/pollingHelpers.js";

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
<<<<<<< /tmp/azsdk-dev-toolnFGKkd/result/src/classic/beta/agents/index.ts
  ) => Promise<AgentOptimizationJob>;
  /** Lists optimization jobs with cursor pagination and optional status or agent name filters. */
||||||| /tmp/azsdk-dev-toolnFGKkd/base/sdk/ai/ai-projects/generated/classic/beta/agents/index.ts
  ) => Promise<OptimizationJob>;
  /** Lists optimization jobs with cursor pagination and optional status or agent name filters. */
=======
  ) => Promise<OptimizationJob>;
  /** List optimization jobs. Supports cursor pagination and optional status / agent_name filters. */
>>>>>>> /tmp/azsdk-dev-toolnFGKkd/custom/sdk/ai/ai-projects/src/classic/beta/agents/index.ts
  listOptimizationJobs: (
    options?: BetaAgentsListOptimizationJobsOptionalParams,
<<<<<<< /tmp/azsdk-dev-toolnFGKkd/result/src/classic/beta/agents/index.ts
  ) => PagedAsyncIterableIterator<AgentOptimizationJobListItem>;
  /** Retrieves an optimization job by its identifier. */
||||||| /tmp/azsdk-dev-toolnFGKkd/base/sdk/ai/ai-projects/generated/classic/beta/agents/index.ts
  ) => PagedAsyncIterableIterator<OptimizationJobListItem>;
  /** Retrieves an optimization job by its identifier. */
=======
  ) => PagedAsyncIterableIterator<OptimizationJobListItem>;
  /** Get an optimization job by id. */
>>>>>>> /tmp/azsdk-dev-toolnFGKkd/custom/sdk/ai/ai-projects/src/classic/beta/agents/index.ts
  getOptimizationJob: (
    jobId: string,
    options?: BetaAgentsGetOptimizationJobOptionalParams,
<<<<<<< /tmp/azsdk-dev-toolnFGKkd/result/src/classic/beta/agents/index.ts
  ) => Promise<AgentOptimizationJob>;
  /** Creates an optimization job and returns the queued job. Honors `Operation-Id` for idempotent retry. */
||||||| /tmp/azsdk-dev-toolnFGKkd/base/sdk/ai/ai-projects/generated/classic/beta/agents/index.ts
  ) => Promise<OptimizationJob>;
  /** Creates an optimization job and returns the queued job. Honors `Operation-Id` for idempotent retry. */
=======
  ) => Promise<OptimizationJob>;
  /** Create an optimization job. Returns 201 with the queued job. Honours `Operation-Id` for idempotent retry. */
>>>>>>> /tmp/azsdk-dev-toolnFGKkd/custom/sdk/ai/ai-projects/src/classic/beta/agents/index.ts
  createOptimizationJob: (
    job: AgentOptimizationJob,
    options?: BetaAgentsCreateOptimizationJobOptionalParams,
<<<<<<< /tmp/azsdk-dev-toolnFGKkd/result/src/classic/beta/agents/index.ts
  ) => PollerLike<OperationState<AgentOptimizationJobResult>, AgentOptimizationJobResult>;
||||||| /tmp/azsdk-dev-toolnFGKkd/base/sdk/ai/ai-projects/generated/classic/beta/agents/index.ts
  ) => PollerLike<OperationState<OptimizationJobResult>, OptimizationJobResult>;
=======
  ) => JobPoller<OptimizationJobResult>;
>>>>>>> /tmp/azsdk-dev-toolnFGKkd/custom/sdk/ai/ai-projects/src/classic/beta/agents/index.ts
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
      job: AgentOptimizationJob,
      options?: BetaAgentsCreateOptimizationJobOptionalParams,
    ) => createOptimizationJob(context, job, options),
  };
}

export function _getBetaAgentsOperations(context: AIProjectContext): BetaAgentsOperations {
  return {
    ..._getBetaAgents(context),
  };
}
