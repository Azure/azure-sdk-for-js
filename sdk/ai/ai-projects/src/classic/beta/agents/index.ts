// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  deleteOptimizationJob,
  cancelOptimizationJob,
  listOptimizationJobs,
  getOptimizationJob,
  createOptimizationJob,
  createFromPrompt,
} from "../../../api/beta/agents/operations.js";
import type {
  BetaAgentsDeleteOptimizationJobOptionalParams,
  BetaAgentsCancelOptimizationJobOptionalParams,
  BetaAgentsListOptimizationJobsOptionalParams,
  BetaAgentsGetOptimizationJobOptionalParams,
  BetaAgentsCreateOptimizationJobOptionalParams,
  BetaAgentsCreateFromPromptOptionalParams,
} from "../../../api/beta/agents/options.js";
import type {
  AgentOptimizationJob,
  AgentOptimizationJobResult,
  AgentOptimizationJobListItem,
  Agent,
  GenerateAgentRequest,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { JobPoller } from "../../../static-helpers/pollingHelpers.js";

/** Operations for managing agents. */
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
  ) => Promise<AgentOptimizationJob>;
  /** List optimization jobs. Supports cursor pagination and optional status / agent_name filters. */
  listOptimizationJobs: (
    options?: BetaAgentsListOptimizationJobsOptionalParams,
  ) => PagedAsyncIterableIterator<AgentOptimizationJobListItem>;
  /** Get an optimization job by id. */
  getOptimizationJob: (
    jobId: string,
    options?: BetaAgentsGetOptimizationJobOptionalParams,
  ) => Promise<AgentOptimizationJob>;
  /** Create an optimization job. Returns 201 with the queued job. Honours `Operation-Id` for idempotent retry. */
  createOptimizationJob: (
    job: AgentOptimizationJob,
    options?: BetaAgentsCreateOptimizationJobOptionalParams,
  ) => JobPoller<AgentOptimizationJobResult>;
  /**
   * Generates and creates an agent from kind-specific high-level inputs.
   * The generated definition remains fully editable through the standard agent versioning operations.
   */
  createFromPrompt: (
    body: GenerateAgentRequest,
    options?: BetaAgentsCreateFromPromptOptionalParams,
  ) => Promise<Agent>;
}

function _getBetaAgents(context: AIProjectContext): BetaAgentsOperations {
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
    createFromPrompt: (
      body: GenerateAgentRequest,
      options?: BetaAgentsCreateFromPromptOptionalParams,
    ) => createFromPrompt(context, body, options),
  };
}

export function _getBetaAgentsOperations(context: AIProjectContext): BetaAgentsOperations {
  return { ..._getBetaAgents(context) };
}
