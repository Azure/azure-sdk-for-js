// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  deleteGenerationJob,
  cancelGenerationJob,
  listGenerationJobs,
  getGenerationJob,
  createGenerationJob,
  getCredentials,
  pendingUpload,
  updateVersion,
  createVersion,
  deleteVersion,
  getVersion,
  list,
  listVersions,
} from "../../../api/beta/evaluators/operations.js";
import type {
  BetaEvaluatorsGetCredentialsOptionalParams,
  BetaEvaluatorsPendingUploadOptionalParams,
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
import type {
  PendingUploadRequest,
  PendingUploadResponse,
  DatasetCredential,
  EvaluatorVersion,
  EvaluatorCredentialRequest,
  EvaluatorGenerationJob,
} from "../../../models/models.js";
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
  /**
   * Returns a list of evaluator generation jobs. The List API has up to a few
   * seconds of propagation delay, so a recently created job may not appear
   * immediately; use the Get evaluator generation job API with the job ID to
   * retrieve a specific job without delay.
   */
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
  /** Retrieves SAS credentials for accessing the storage account associated with the specified evaluator version. */
  getCredentials: (
    name: string,
    credentialRequest: EvaluatorCredentialRequest,
    version: string,
    options?: BetaEvaluatorsGetCredentialsOptionalParams,
  ) => Promise<DatasetCredential>;
  /** Initiates a new pending upload or retrieves an existing one for the specified evaluator version. */
  pendingUpload: (
    name: string,
    version: string,
    pendingUploadRequest: PendingUploadRequest,
    options?: BetaEvaluatorsPendingUploadOptionalParams,
  ) => Promise<PendingUploadResponse>;
  /** Updates the specified evaluator version in place. */
  updateVersion: (
    name: string,
    version: string,
    evaluatorVersion: EvaluatorVersion,
    options?: BetaEvaluatorsUpdateVersionOptionalParams,
  ) => Promise<EvaluatorVersion>;
  /** Creates a new evaluator version with an auto-incremented version identifier. */
  createVersion: (
    name: string,
    evaluatorVersion: EvaluatorVersion,
    options?: BetaEvaluatorsCreateVersionOptionalParams,
  ) => Promise<EvaluatorVersion>;
  /** Removes the specified evaluator version. Returns 204 whether the version existed or not. */
  deleteVersion: (
    name: string,
    version: string,
    options?: BetaEvaluatorsDeleteVersionOptionalParams,
  ) => Promise<void>;
  /** Retrieves the specified evaluator version, returning 404 if it does not exist. */
  getVersion: (
    name: string,
    version: string,
    options?: BetaEvaluatorsGetVersionOptionalParams,
  ) => Promise<EvaluatorVersion>;
  /** Lists the latest version of each evaluator */
  list: (
    options?: BetaEvaluatorsListOptionalParams,
  ) => PagedAsyncIterableIterator<EvaluatorVersion>;
  /** Returns the available versions for the specified evaluator. */
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
    getCredentials: (
      name: string,
      credentialRequest: EvaluatorCredentialRequest,
      version: string,
      options?: BetaEvaluatorsGetCredentialsOptionalParams,
    ) => getCredentials(context, name, credentialRequest, version, options),
    pendingUpload: (
      name: string,
      version: string,
      pendingUploadRequest: PendingUploadRequest,
      options?: BetaEvaluatorsPendingUploadOptionalParams,
    ) => pendingUpload(context, name, version, pendingUploadRequest, options),
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
