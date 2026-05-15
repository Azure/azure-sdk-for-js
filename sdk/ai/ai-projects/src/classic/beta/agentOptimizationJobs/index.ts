// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  getOptimizationCandidateResults,
  getOptimizationCandidateConfig,
  getOptimizationCandidate,
  listOptimizationCandidates,
  deleteOptimizationJob,
  cancelOptimizationJob,
  listOptimizationJobs,
  getOptimizationJob,
  createOptimizationJob,
} from "../../../api/beta/agentOptimizationJobs/operations.js";
import {
  BetaAgentOptimizationJobsGetOptimizationCandidateResultsOptionalParams,
  BetaAgentOptimizationJobsGetOptimizationCandidateConfigOptionalParams,
  BetaAgentOptimizationJobsGetOptimizationCandidateOptionalParams,
  BetaAgentOptimizationJobsListOptimizationCandidatesOptionalParams,
  BetaAgentOptimizationJobsDeleteOptimizationJobOptionalParams,
  BetaAgentOptimizationJobsCancelOptimizationJobOptionalParams,
  BetaAgentOptimizationJobsListOptimizationJobsOptionalParams,
  BetaAgentOptimizationJobsGetOptimizationJobOptionalParams,
  BetaAgentOptimizationJobsCreateOptimizationJobOptionalParams,
} from "../../../api/beta/agentOptimizationJobs/options.js";
import {
  OptimizationJob,
  OptimizationCandidate,
  AgentsPagedResultOptimizationCandidate,
  CandidateDeployConfig,
  CandidateResults,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a BetaAgentOptimizationJobs operations. */
export interface BetaAgentOptimizationJobsOperations {
  /** Get full per-task evaluation results for a candidate. */
  getOptimizationCandidateResults: (
    jobId: string,
    candidateId: string,
    options?: BetaAgentOptimizationJobsGetOptimizationCandidateResultsOptionalParams,
  ) => Promise<CandidateResults>;
  /** Get the candidate's deploy config JSON. Used to compose `agents.create_version(...)` from a candidate. */
  getOptimizationCandidateConfig: (
    jobId: string,
    candidateId: string,
    options?: BetaAgentOptimizationJobsGetOptimizationCandidateConfigOptionalParams,
  ) => Promise<CandidateDeployConfig>;
  /** Get a single candidate manifest and aggregated evaluation summary. */
  getOptimizationCandidate: (
    jobId: string,
    candidateId: string,
    options?: BetaAgentOptimizationJobsGetOptimizationCandidateOptionalParams,
  ) => Promise<OptimizationCandidate>;
  /** List candidates produced by a job. */
  listOptimizationCandidates: (
    jobId: string,
    options?: BetaAgentOptimizationJobsListOptimizationCandidatesOptionalParams,
  ) => Promise<AgentsPagedResultOptimizationCandidate>;
  /** Delete the job and its candidate artifacts. Cancels first if non-terminal. */
  deleteOptimizationJob: (
    jobId: string,
    options?: BetaAgentOptimizationJobsDeleteOptimizationJobOptionalParams,
  ) => Promise<void>;
  /** Request cancellation. Idempotent on terminal states. */
  cancelOptimizationJob: (
    jobId: string,
    options?: BetaAgentOptimizationJobsCancelOptimizationJobOptionalParams,
  ) => Promise<OptimizationJob>;
  /** List optimization jobs. Supports cursor pagination and optional `status` / `agent_name` filters. */
  listOptimizationJobs: (
    options?: BetaAgentOptimizationJobsListOptimizationJobsOptionalParams,
  ) => PagedAsyncIterableIterator<OptimizationJob>;
  /** Get an optimization job by id. Emits `Retry-After` while the job is non-terminal. */
  getOptimizationJob: (
    jobId: string,
    options?: BetaAgentOptimizationJobsGetOptimizationJobOptionalParams,
  ) => Promise<OptimizationJob>;
  /** Create an optimization job. Returns 201 with the queued job. Honours `Operation-Id` for idempotent retry. */
  createOptimizationJob: (
    job: OptimizationJob,
    options?: BetaAgentOptimizationJobsCreateOptimizationJobOptionalParams,
  ) => Promise<OptimizationJob>;
}

function _getBetaAgentOptimizationJobs(context: AIProjectContext) {
  return {
    getOptimizationCandidateResults: (
      jobId: string,
      candidateId: string,
      options?: BetaAgentOptimizationJobsGetOptimizationCandidateResultsOptionalParams,
    ) => getOptimizationCandidateResults(context, jobId, candidateId, options),
    getOptimizationCandidateConfig: (
      jobId: string,
      candidateId: string,
      options?: BetaAgentOptimizationJobsGetOptimizationCandidateConfigOptionalParams,
    ) => getOptimizationCandidateConfig(context, jobId, candidateId, options),
    getOptimizationCandidate: (
      jobId: string,
      candidateId: string,
      options?: BetaAgentOptimizationJobsGetOptimizationCandidateOptionalParams,
    ) => getOptimizationCandidate(context, jobId, candidateId, options),
    listOptimizationCandidates: (
      jobId: string,
      options?: BetaAgentOptimizationJobsListOptimizationCandidatesOptionalParams,
    ) => listOptimizationCandidates(context, jobId, options),
    deleteOptimizationJob: (
      jobId: string,
      options?: BetaAgentOptimizationJobsDeleteOptimizationJobOptionalParams,
    ) => deleteOptimizationJob(context, jobId, options),
    cancelOptimizationJob: (
      jobId: string,
      options?: BetaAgentOptimizationJobsCancelOptimizationJobOptionalParams,
    ) => cancelOptimizationJob(context, jobId, options),
    listOptimizationJobs: (options?: BetaAgentOptimizationJobsListOptimizationJobsOptionalParams) =>
      listOptimizationJobs(context, options),
    getOptimizationJob: (
      jobId: string,
      options?: BetaAgentOptimizationJobsGetOptimizationJobOptionalParams,
    ) => getOptimizationJob(context, jobId, options),
    createOptimizationJob: (
      job: OptimizationJob,
      options?: BetaAgentOptimizationJobsCreateOptimizationJobOptionalParams,
    ) => createOptimizationJob(context, job, options),
  };
}

export function _getBetaAgentOptimizationJobsOperations(
  context: AIProjectContext,
): BetaAgentOptimizationJobsOperations {
  return {
    ..._getBetaAgentOptimizationJobs(context),
  };
}
