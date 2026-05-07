// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
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
import type {
  BetaEvaluatorsUpdateVersionOptionalParams,
  BetaEvaluatorsCreateVersionOptionalParams,
  BetaEvaluatorsDeleteVersionOptionalParams,
  BetaEvaluatorsGetVersionOptionalParams,
  BetaEvaluatorsListOptionalParams,
  BetaEvaluatorsListVersionsOptionalParams,
  BetaEvaluatorsDeleteGenerationJobOptionalParams,
  BetaEvaluatorsCancelGenerationJobOptionalParams,
  BetaEvaluatorsListGenerationJobsOptionalParams,
  BetaEvaluatorsGetGenerationJobOptionalParams,
  BetaEvaluatorsCreateGenerationJobOptionalParams,
} from "../../../api/beta/evaluators/options.js";
import type { EvaluatorVersion, EvaluatorGenerationJob } from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a BetaEvaluators operations. */
export interface BetaEvaluatorsOperations {
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
    version: string,
    evaluatorVersion: EvaluatorVersion,
    options?: BetaEvaluatorsUpdateVersionOptionalParams,
  ) => Promise<EvaluatorVersion>;
  /** Create a new EvaluatorVersion with auto incremented version id */
  createVersion: (
    name: string,
    evaluatorVersion: EvaluatorVersion,
    options?: BetaEvaluatorsCreateVersionOptionalParams,
  ) => Promise<EvaluatorVersion>;
  /** Delete the specific version of the EvaluatorVersion. The service returns 204 No Content if the EvaluatorVersion was deleted successfully or if the EvaluatorVersion does not exist. */
  deleteVersion: (
    name: string,
    version: string,
    options?: BetaEvaluatorsDeleteVersionOptionalParams,
  ) => Promise<void>;
  /** Get the specific version of the EvaluatorVersion. The service returns 404 Not Found error if the EvaluatorVersion does not exist. */
  getVersion: (
    name: string,
    version: string,
    options?: BetaEvaluatorsGetVersionOptionalParams,
  ) => Promise<EvaluatorVersion>;
  /** List the latest version of each evaluator */
  list: (
    options?: BetaEvaluatorsListOptionalParams,
  ) => PagedAsyncIterableIterator<EvaluatorVersion>;
  /** List all versions of the given evaluator */
  listVersions: (
    name: string,
    options?: BetaEvaluatorsListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<EvaluatorVersion>;
}

function _getBetaEvaluators(context: AIProjectContext) {
  return {
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
      version: string,
      evaluatorVersion: EvaluatorVersion,
      options?: BetaEvaluatorsUpdateVersionOptionalParams,
    ) => updateVersion(context, name, version, evaluatorVersion, options),
    createVersion: (
      name: string,
      evaluatorVersion: EvaluatorVersion,
      options?: BetaEvaluatorsCreateVersionOptionalParams,
    ) => createVersion(context, name, evaluatorVersion, options),
    deleteVersion: (
      name: string,
      version: string,
      options?: BetaEvaluatorsDeleteVersionOptionalParams,
    ) => deleteVersion(context, name, version, options),
    getVersion: (name: string, version: string, options?: BetaEvaluatorsGetVersionOptionalParams) =>
      getVersion(context, name, version, options),
    list: (options?: BetaEvaluatorsListOptionalParams) => list(context, options),
    listVersions: (name: string, options?: BetaEvaluatorsListVersionsOptionalParams) =>
      listVersions(context, name, options),
  };
}

export function _getBetaEvaluatorsOperations(context: AIProjectContext): BetaEvaluatorsOperations {
  return {
    ..._getBetaEvaluators(context),
  };
}
