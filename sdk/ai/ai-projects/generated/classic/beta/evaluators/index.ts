// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  deleteGenerationSuiteJob,
  cancelGenerationSuiteJob,
  listGenerationSuiteJobs,
  getGenerationSuiteJob,
  createGenerationSuiteJob,
  runEvaluationSuite,
  createEvaluationSuiteVersion,
  deleteGenerationJob,
  cancelGenerationJob,
  listGenerationJobs,
  getGenerationJob,
  createGenerationJob,
  updateVersion,
  createVersion,
  deleteVersion,
  getVersion,
  list,
  listVersions,
} from "../../../api/beta/evaluators/operations.js";
import {
  BetaEvaluatorsDeleteGenerationSuiteJobOptionalParams,
  BetaEvaluatorsCancelGenerationSuiteJobOptionalParams,
  BetaEvaluatorsListGenerationSuiteJobsOptionalParams,
  BetaEvaluatorsGetGenerationSuiteJobOptionalParams,
  BetaEvaluatorsCreateGenerationSuiteJobOptionalParams,
  BetaEvaluatorsRunEvaluationSuiteOptionalParams,
  BetaEvaluatorsCreateEvaluationSuiteVersionOptionalParams,
  BetaEvaluatorsDeleteGenerationJobOptionalParams,
  BetaEvaluatorsCancelGenerationJobOptionalParams,
  BetaEvaluatorsListGenerationJobsOptionalParams,
  BetaEvaluatorsGetGenerationJobOptionalParams,
  BetaEvaluatorsCreateGenerationJobOptionalParams,
  BetaEvaluatorsUpdateVersionOptionalParams,
  BetaEvaluatorsCreateVersionOptionalParams,
  BetaEvaluatorsDeleteVersionOptionalParams,
  BetaEvaluatorsGetVersionOptionalParams,
  BetaEvaluatorsListOptionalParams,
  BetaEvaluatorsListVersionsOptionalParams,
} from "../../../api/beta/evaluators/options.js";
import {
  EvaluationSuiteVersion,
  EvaluatorVersion,
  EvaluatorGenerationJob,
  EvaluationSuiteRunRequest,
  EvaluationSuiteRunResponse,
  EvaluationSuiteGenerationJob,
} from "../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";

/** Interface representing a BetaEvaluators operations. */
export interface BetaEvaluatorsOperations {
  /** Delete a job (preview). Returns 204 No Content. */
  deleteGenerationSuiteJob: (
    jobId: string,
    options?: BetaEvaluatorsDeleteGenerationSuiteJobOptionalParams,
  ) => Promise<void>;
  /** Cancel a running job (preview). Returns 200 with the updated job. */
  cancelGenerationSuiteJob: (
    jobId: string,
    options?: BetaEvaluatorsCancelGenerationSuiteJobOptionalParams,
  ) => Promise<EvaluationSuiteGenerationJob>;
  /** List jobs with cursor-based pagination (preview). Includes optional Foundry-Features header. */
  listGenerationSuiteJobs: (
    options?: BetaEvaluatorsListGenerationSuiteJobsOptionalParams,
  ) => PagedAsyncIterableIterator<EvaluationSuiteGenerationJob>;
  /** Get a job by ID (preview). Includes optional Foundry-Features header. */
  getGenerationSuiteJob: (
    jobId: string,
    options?: BetaEvaluatorsGetGenerationSuiteJobOptionalParams,
  ) => Promise<EvaluationSuiteGenerationJob>;
  /** Create a new job (preview). Includes optional Foundry-Features header and Operation-Id for idempotent retries. */
  createGenerationSuiteJob: (
    job: EvaluationSuiteGenerationJob,
    options?: BetaEvaluatorsCreateGenerationSuiteJobOptionalParams,
  ) => Promise<EvaluationSuiteGenerationJob>;
  /** Run an evaluation using the suite's testing criteria and dataset. */
  runEvaluationSuite: (
    name: string,
    body: EvaluationSuiteRunRequest,
    options?: BetaEvaluatorsRunEvaluationSuiteOptionalParams,
  ) => Promise<EvaluationSuiteRunResponse>;
  /** Create a new EvaluationSuiteVersion with auto incremented version id */
  createEvaluationSuiteVersion: (
    name: string,
    evaluationSuiteVersion: EvaluationSuiteVersion,
    options?: BetaEvaluatorsCreateEvaluationSuiteVersionOptionalParams,
  ) => Promise<EvaluationSuiteVersion>;
  /**
   * Deletes an evaluator generation job by its ID. Deletes the job record only;
   * the generated evaluator (if any) is preserved.
   */
  deleteGenerationJob: (
    jobId: string,
    options?: BetaEvaluatorsDeleteGenerationJobOptionalParams,
  ) => Promise<void>;
  /** Cancels an evaluator generation job by its ID. */
  cancelGenerationJob: (
    jobId: string,
    options?: BetaEvaluatorsCancelGenerationJobOptionalParams,
  ) => Promise<EvaluatorGenerationJob>;
  /** Returns a list of evaluator generation jobs. */
  listGenerationJobs: (
    options?: BetaEvaluatorsListGenerationJobsOptionalParams,
  ) => PagedAsyncIterableIterator<EvaluatorGenerationJob>;
  /** Gets the details of an evaluator generation job by its ID. */
  getGenerationJob: (
    jobId: string,
    options?: BetaEvaluatorsGetGenerationJobOptionalParams,
  ) => Promise<EvaluatorGenerationJob>;
  /**
   * Creates an evaluator generation job. The service generates rubric-based evaluator
   * definitions from the provided source materials asynchronously.
   */
  createGenerationJob: (
    job: EvaluatorGenerationJob,
    options?: BetaEvaluatorsCreateGenerationJobOptionalParams,
  ) => Promise<EvaluatorGenerationJob>;
  /** Update an existing EvaluatorVersion with the given version id */
  updateVersion: (
    name: string,
    foundryFeatures: "Evaluations=V1Preview",
    version: string,
    evaluatorVersion: EvaluatorVersion,
    options?: BetaEvaluatorsUpdateVersionOptionalParams,
  ) => Promise<EvaluatorVersion>;
  /** Create a new EvaluatorVersion with auto incremented version id */
  createVersion: (
    name: string,
    foundryFeatures: "Evaluations=V1Preview",
    evaluatorVersion: EvaluatorVersion,
    options?: BetaEvaluatorsCreateVersionOptionalParams,
  ) => Promise<EvaluatorVersion>;
  /** Delete the specific version of the EvaluatorVersion. The service returns 204 No Content if the EvaluatorVersion was deleted successfully or if the EvaluatorVersion does not exist. */
  deleteVersion: (
    name: string,
    foundryFeatures: "Evaluations=V1Preview",
    version: string,
    options?: BetaEvaluatorsDeleteVersionOptionalParams,
  ) => Promise<void>;
  /** Get the specific version of the EvaluatorVersion. The service returns 404 Not Found error if the EvaluatorVersion does not exist. */
  getVersion: (
    name: string,
    foundryFeatures: "Evaluations=V1Preview",
    version: string,
    options?: BetaEvaluatorsGetVersionOptionalParams,
  ) => Promise<EvaluatorVersion>;
  /** List the latest version of each evaluator */
  list: (
    foundryFeatures: "Evaluations=V1Preview",
    options?: BetaEvaluatorsListOptionalParams,
  ) => PagedAsyncIterableIterator<EvaluatorVersion>;
  /** List all versions of the given evaluator */
  listVersions: (
    name: string,
    foundryFeatures: "Evaluations=V1Preview",
    options?: BetaEvaluatorsListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<EvaluatorVersion>;
}

function _getBetaEvaluators(context: AIProjectContext) {
  return {
    deleteGenerationSuiteJob: (
      jobId: string,
      options?: BetaEvaluatorsDeleteGenerationSuiteJobOptionalParams,
    ) => deleteGenerationSuiteJob(context, jobId, options),
    cancelGenerationSuiteJob: (
      jobId: string,
      options?: BetaEvaluatorsCancelGenerationSuiteJobOptionalParams,
    ) => cancelGenerationSuiteJob(context, jobId, options),
    listGenerationSuiteJobs: (options?: BetaEvaluatorsListGenerationSuiteJobsOptionalParams) =>
      listGenerationSuiteJobs(context, options),
    getGenerationSuiteJob: (
      jobId: string,
      options?: BetaEvaluatorsGetGenerationSuiteJobOptionalParams,
    ) => getGenerationSuiteJob(context, jobId, options),
    createGenerationSuiteJob: (
      job: EvaluationSuiteGenerationJob,
      options?: BetaEvaluatorsCreateGenerationSuiteJobOptionalParams,
    ) => createGenerationSuiteJob(context, job, options),
    runEvaluationSuite: (
      name: string,
      body: EvaluationSuiteRunRequest,
      options?: BetaEvaluatorsRunEvaluationSuiteOptionalParams,
    ) => runEvaluationSuite(context, name, body, options),
    createEvaluationSuiteVersion: (
      name: string,
      evaluationSuiteVersion: EvaluationSuiteVersion,
      options?: BetaEvaluatorsCreateEvaluationSuiteVersionOptionalParams,
    ) => createEvaluationSuiteVersion(context, name, evaluationSuiteVersion, options),
    deleteGenerationJob: (
      jobId: string,
      options?: BetaEvaluatorsDeleteGenerationJobOptionalParams,
    ) => deleteGenerationJob(context, jobId, options),
    cancelGenerationJob: (
      jobId: string,
      options?: BetaEvaluatorsCancelGenerationJobOptionalParams,
    ) => cancelGenerationJob(context, jobId, options),
    listGenerationJobs: (options?: BetaEvaluatorsListGenerationJobsOptionalParams) =>
      listGenerationJobs(context, options),
    getGenerationJob: (jobId: string, options?: BetaEvaluatorsGetGenerationJobOptionalParams) =>
      getGenerationJob(context, jobId, options),
    createGenerationJob: (
      job: EvaluatorGenerationJob,
      options?: BetaEvaluatorsCreateGenerationJobOptionalParams,
    ) => createGenerationJob(context, job, options),
    updateVersion: (
      name: string,
      foundryFeatures: "Evaluations=V1Preview",
      version: string,
      evaluatorVersion: EvaluatorVersion,
      options?: BetaEvaluatorsUpdateVersionOptionalParams,
    ) => updateVersion(context, name, foundryFeatures, version, evaluatorVersion, options),
    createVersion: (
      name: string,
      foundryFeatures: "Evaluations=V1Preview",
      evaluatorVersion: EvaluatorVersion,
      options?: BetaEvaluatorsCreateVersionOptionalParams,
    ) => createVersion(context, name, foundryFeatures, evaluatorVersion, options),
    deleteVersion: (
      name: string,
      foundryFeatures: "Evaluations=V1Preview",
      version: string,
      options?: BetaEvaluatorsDeleteVersionOptionalParams,
    ) => deleteVersion(context, name, foundryFeatures, version, options),
    getVersion: (
      name: string,
      foundryFeatures: "Evaluations=V1Preview",
      version: string,
      options?: BetaEvaluatorsGetVersionOptionalParams,
    ) => getVersion(context, name, foundryFeatures, version, options),
    list: (foundryFeatures: "Evaluations=V1Preview", options?: BetaEvaluatorsListOptionalParams) =>
      list(context, foundryFeatures, options),
    listVersions: (
      name: string,
      foundryFeatures: "Evaluations=V1Preview",
      options?: BetaEvaluatorsListVersionsOptionalParams,
    ) => listVersions(context, name, foundryFeatures, options),
  };
}

export function _getBetaEvaluatorsOperations(context: AIProjectContext): BetaEvaluatorsOperations {
  return {
    ..._getBetaEvaluators(context),
  };
}
