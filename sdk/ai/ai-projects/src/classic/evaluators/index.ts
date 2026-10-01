// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../api/aiProjectContext.js";
import type { EvaluatorVersion, EvaluatorGenerationJob, EvaluatorGenerationInputs } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type {
  EvaluatorsDeleteGenerationJobOptionalParams,
  EvaluatorsCancelGenerationJobOptionalParams,
  EvaluatorsListGenerationJobsOptionalParams,
  EvaluatorsGetGenerationJobOptionalParams,
  EvaluatorsCreateGenerationJobOptionalParams,
  EvaluatorsUpdateVersionOptionalParams,
  EvaluatorsCreateVersionOptionalParams,
  EvaluatorsDeleteVersionOptionalParams,
  EvaluatorsGetVersionOptionalParams,
  EvaluatorsListOptionalParams,
  EvaluatorsListVersionsOptionalParams,
} from "../../api/evaluators/options.js";
import type { JobPoller } from "../../static-helpers/pollingHelpers.js";
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
} from "../../api/evaluators/operations.js";

/** Operations for EvaluatorsOperations. */
export interface EvaluatorsOperations {
  /**
   * Deletes an evaluator generation job by its ID. Deletes the job record only;
   * the generated evaluator (if any) is preserved.
   */
  deleteGenerationJob: (
    jobId: string,
    options?: EvaluatorsDeleteGenerationJobOptionalParams,
  ) => Promise<void>;
  /** Cancels an evaluator generation job by its ID. */
  cancelGenerationJob: (
    jobId: string,
    options?: EvaluatorsCancelGenerationJobOptionalParams,
  ) => Promise<EvaluatorGenerationJob>;
  /**
   * Returns a list of evaluator generation jobs. The List API has up to a few
   * seconds of propagation delay, so a recently created job may not appear
   * immediately; use the Get evaluator generation job API with the job ID to
   * retrieve a specific job without delay.
   */
  listGenerationJobs: (
    options?: EvaluatorsListGenerationJobsOptionalParams,
  ) => PagedAsyncIterableIterator<EvaluatorGenerationJob>;
  /** Gets the details of an evaluator generation job by its ID. */
  getGenerationJob: (
    jobId: string,
    options?: EvaluatorsGetGenerationJobOptionalParams,
  ) => Promise<EvaluatorGenerationJob>;
  /**
   * Creates an evaluator generation job. The service generates rubric-based evaluator
   * definitions from the provided source materials asynchronously.
   */
  createGenerationJob: (
    job: EvaluatorGenerationInputs,
    options?: EvaluatorsCreateGenerationJobOptionalParams,
  ) => JobPoller<EvaluatorVersion>;
  /** Updates the specified evaluator version in place. */
  updateVersion: (
    name: string,
    version: string,
    evaluatorVersion: EvaluatorVersion,
    options?: EvaluatorsUpdateVersionOptionalParams,
  ) => Promise<EvaluatorVersion>;
  /** Creates a new evaluator version with an auto-incremented version identifier. */
  createVersion: (
    name: string,
    evaluatorVersion: EvaluatorVersion,
    options?: EvaluatorsCreateVersionOptionalParams,
  ) => Promise<EvaluatorVersion>;
  /** Removes the specified evaluator version. Returns 204 whether the version existed or not. */
  deleteVersion: (
    name: string,
    version: string,
    options?: EvaluatorsDeleteVersionOptionalParams,
  ) => Promise<void>;
  /** Retrieves the specified evaluator version, returning 404 if it does not exist. */
  getVersion: (
    name: string,
    version: string,
    options?: EvaluatorsGetVersionOptionalParams,
  ) => Promise<EvaluatorVersion>;
  /** Lists the latest version of each evaluator. */
  list: (options?: EvaluatorsListOptionalParams) => PagedAsyncIterableIterator<EvaluatorVersion>;
  /** Returns the available versions for the specified evaluator. */
  listVersions: (
    name: string,
    options?: EvaluatorsListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<EvaluatorVersion>;
}

export function _getEvaluatorsOperations(context: AIProjectContext): EvaluatorsOperations {
  return {
    deleteGenerationJob: (jobId: string, options?: EvaluatorsDeleteGenerationJobOptionalParams) =>
      deleteGenerationJob(context, jobId, options),
    cancelGenerationJob: (jobId: string, options?: EvaluatorsCancelGenerationJobOptionalParams) =>
      cancelGenerationJob(context, jobId, options),
    listGenerationJobs: (options?: EvaluatorsListGenerationJobsOptionalParams) =>
      listGenerationJobs(context, options),
    getGenerationJob: (jobId: string, options?: EvaluatorsGetGenerationJobOptionalParams) =>
      getGenerationJob(context, jobId, options),
    createGenerationJob: (
      job: EvaluatorGenerationInputs,
      options?: EvaluatorsCreateGenerationJobOptionalParams,
    ) => createGenerationJob(context, job, options),
    updateVersion: (
      name: string,
      version: string,
      evaluatorVersion: EvaluatorVersion,
      options?: EvaluatorsUpdateVersionOptionalParams,
    ) => updateVersion(context, name, version, evaluatorVersion, options),
    createVersion: (
      name: string,
      evaluatorVersion: EvaluatorVersion,
      options?: EvaluatorsCreateVersionOptionalParams,
    ) => createVersion(context, name, evaluatorVersion, options),
    deleteVersion: (
      name: string,
      version: string,
      options?: EvaluatorsDeleteVersionOptionalParams,
    ) => deleteVersion(context, name, version, options),
    getVersion: (name: string, version: string, options?: EvaluatorsGetVersionOptionalParams) =>
      getVersion(context, name, version, options),
    list: (options?: EvaluatorsListOptionalParams) => list(context, options),
    listVersions: (name: string, options?: EvaluatorsListVersionsOptionalParams) =>
      listVersions(context, name, options),
  };
}
