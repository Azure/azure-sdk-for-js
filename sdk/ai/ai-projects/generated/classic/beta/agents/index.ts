// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  deleteOptimizationJob,
  cancelOptimizationJob,
  listOptimizationJobs,
  getOptimizationJob,
  createOptimizationJob,
  generate,
} from "../../../api/beta/agents/operations.js";
import {
  BetaAgentsDeleteOptimizationJobOptionalParams,
  BetaAgentsCancelOptimizationJobOptionalParams,
  BetaAgentsListOptimizationJobsOptionalParams,
  BetaAgentsGetOptimizationJobOptionalParams,
  BetaAgentsCreateOptimizationJobOptionalParams,
  BetaAgentsGenerateOptionalParams,
} from "../../../api/beta/agents/options.js";
import {
  Agent,
  AgentOptimizationJob,
  AgentOptimizationJobResult,
  AgentOptimizationJobListItem,
  GenerateAgentRequest,
} from "../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";
import { BetaAgentsFooOperations, _getBetaAgentsFooOperations } from "./foo/index.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BetaAgents operations. */
export interface BetaAgentsOperations {
  /** Deletes the job and its candidate artifacts, canceling the job first if it is non-terminal. */
  deleteOptimizationJob: (
    jobId: string,
    options?: BetaAgentsDeleteOptimizationJobOptionalParams,
  ) => Promise<void>;
  /** Requests cancellation of a running or queued job and returns an error if the job is already in a terminal state. */
  cancelOptimizationJob: (
    jobId: string,
    options?: BetaAgentsCancelOptimizationJobOptionalParams,
  ) => Promise<AgentOptimizationJob>;
  /** Lists optimization jobs with cursor pagination and optional status or agent name filters. */
  listOptimizationJobs: (
    options?: BetaAgentsListOptimizationJobsOptionalParams,
  ) => PagedAsyncIterableIterator<AgentOptimizationJobListItem>;
  /** Retrieves an optimization job by its identifier. */
  getOptimizationJob: (
    jobId: string,
    options?: BetaAgentsGetOptimizationJobOptionalParams,
  ) => Promise<AgentOptimizationJob>;
  /** Creates an optimization job and returns the queued job. Honors `Operation-Id` for idempotent retry. */
  createOptimizationJob: (
    job: AgentOptimizationJob,
    options?: BetaAgentsCreateOptimizationJobOptionalParams,
  ) => PollerLike<OperationState<AgentOptimizationJobResult>, AgentOptimizationJobResult>;
  /**
   * Generates and creates an agent from kind-specific high-level inputs.
   * The generated definition remains fully editable through the standard agent versioning operations.
   */
  generate: (
    foundryFeatures: "VoiceAgents=V1Preview",
    body: GenerateAgentRequest,
    options?: BetaAgentsGenerateOptionalParams,
  ) => Promise<Agent>;
  foo: BetaAgentsFooOperations;
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
    generate: (
      foundryFeatures: "VoiceAgents=V1Preview",
      body: GenerateAgentRequest,
      options?: BetaAgentsGenerateOptionalParams,
    ) => generate(context, foundryFeatures, body, options),
  };
}

export function _getBetaAgentsOperations(context: AIProjectContext): BetaAgentsOperations {
  return {
    ..._getBetaAgents(context),
    foo: _getBetaAgentsFooOperations(context),
  };
}
