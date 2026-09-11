// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BetaAgentsFooOperations } from "./foo/index.js";
import { _getBetaAgentsFooOperations } from "./foo/index.js";
import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  deleteOptimizationJob,
  cancelOptimizationJob,
  listOptimizationJobs,
  getOptimizationJob,
  createOptimizationJob,
  generate,
} from "../../../api/beta/agents/operations.js";
import type {
  BetaAgentsDeleteOptimizationJobOptionalParams,
  BetaAgentsCancelOptimizationJobOptionalParams,
  BetaAgentsListOptimizationJobsOptionalParams,
  BetaAgentsGetOptimizationJobOptionalParams,
  BetaAgentsCreateOptimizationJobOptionalParams,
  BetaAgentsGenerateOptionalParams,
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

/** Interface representing a BetaAgents operations. */
export interface BetaAgentsOperations {
  /** Telephony bindings, calls, and outbound campaigns. */
  foo: BetaAgentsFooOperations;
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
  generate: (
    body: GenerateAgentRequest,
    options?: BetaAgentsGenerateOptionalParams,
  ) => Promise<Agent>;
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

    generate: (body: GenerateAgentRequest, options?: BetaAgentsGenerateOptionalParams) =>
      generate(context, body, options),
  };
}

export function _getBetaAgentsOperations(context: AIProjectContext): BetaAgentsOperations {
  return {
    ..._getBetaAgents(context),
    foo: _getBetaAgentsFooOperations(context),
  };
}
