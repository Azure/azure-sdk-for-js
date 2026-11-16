// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import {
  deleteGenerationJob,
  cancelGenerationJob,
  createGenerationJob,
  listGenerationJobs,
  getGenerationJob,
  getCredentials,
  pendingUpload,
  createOrUpdate,
  $delete,
  get,
  list,
  listVersions,
} from "../../api/datasets/operations.js";
import {
  DatasetsDeleteGenerationJobOptionalParams,
  DatasetsCancelGenerationJobOptionalParams,
  DatasetsCreateGenerationJobOptionalParams,
  DatasetsListGenerationJobsOptionalParams,
  DatasetsGetGenerationJobOptionalParams,
  DatasetsGetCredentialsOptionalParams,
  DatasetsPendingUploadOptionalParams,
  DatasetsCreateOrUpdateOptionalParams,
  DatasetsDeleteOptionalParams,
  DatasetsGetOptionalParams,
  DatasetsListOptionalParams,
  DatasetsListVersionsOptionalParams,
} from "../../api/datasets/options.js";
import {
  DatasetVersionUnion,
  PendingUploadRequest,
  PendingUploadResponse,
  DatasetCredential,
  DataGenerationJobUnion,
  DataGenerationJobResult,
  DataGenerationJobInputsUnion,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Datasets operations. */
export interface DatasetsOperations {
  /** Removes the specified data generation job and its associated output. */
  deleteGenerationJob: (
    jobId: string,
    options?: DatasetsDeleteGenerationJobOptionalParams,
  ) => Promise<void>;
  /** Cancels the specified data generation job if it is still in progress. */
  cancelGenerationJob: (
    jobId: string,
    options?: DatasetsCancelGenerationJobOptionalParams,
  ) => Promise<DataGenerationJobUnion>;
  /**
   * Submits a new data generation job for asynchronous execution.
   * Requests with `type` set to `conversations`, or `traces` with
   * `generate_test_case_rubric` set to true, require
   * `Foundry-Features: DataGenerationJobs=V1Preview`; the service rejects
   * these requests without this opt-in. Ordinary turn-level trace requests
   * without rubric generation do not require the header.
   * Conversation samples require `scenario` to be `evaluation`.
   * Jobs with `type: conversations` reconstruct existing traced conversations,
   * use sources of type `traces`, and do not support `sample_level`.
   * The `generate_test_case_rubric` flag is supported for both trace and
   * conversation jobs and requires a nonempty `model_options.model` when true.
   * The conversation-only `generate_test_case_description` flag also requires
   * a nonempty `model_options.model` when true. For conversation jobs, model
   * options must be omitted when neither flag is enabled.
   * Create, get, and list responses preserve `type: conversations`.
   * The response includes the effective generation settings.
   */
  createGenerationJob: (
    job: DataGenerationJobInputsUnion,
    options?: DatasetsCreateGenerationJobOptionalParams,
  ) => PollerLike<OperationState<DataGenerationJobResult>, DataGenerationJobResult>;
  /**
   * Returns a list of data generation jobs.
   * Each trace job includes its effective settings. Conversation jobs preserve
   * `type: conversations`. Listing existing jobs does not require preview opt-in.
   */
  listGenerationJobs: (
    options?: DatasetsListGenerationJobsOptionalParams,
  ) => PagedAsyncIterableIterator<DataGenerationJobUnion>;
  /**
   * Retrieves the specified data generation job and its current status.
   * Returns effective generation settings and preserves `type: conversations` for
   * conversation jobs. Reading an existing job does not require preview opt-in.
   */
  getGenerationJob: (
    jobId: string,
    options?: DatasetsGetGenerationJobOptionalParams,
  ) => Promise<DataGenerationJobUnion>;
  /** Retrieves the SAS credential to access the storage account associated with a dataset version. */
  getCredentials: (
    name: string,
    version: string,
    options?: DatasetsGetCredentialsOptionalParams,
  ) => Promise<DatasetCredential>;
  /** Initiates a new pending upload or retrieves an existing one for the specified dataset version. */
  pendingUpload: (
    name: string,
    pendingUploadRequest: PendingUploadRequest,
    version: string,
    options?: DatasetsPendingUploadOptionalParams,
  ) => Promise<PendingUploadResponse>;
  /** Create a new or update an existing DatasetVersion with the given version id */
  createOrUpdate: (
    name: string,
    datasetVersion: DatasetVersionUnion,
    version: string,
    options?: DatasetsCreateOrUpdateOptionalParams,
  ) => Promise<DatasetVersionUnion>;
  /** Delete the specific version of the DatasetVersion. The service returns 204 No Content if the DatasetVersion was deleted successfully or if the DatasetVersion does not exist. */
  delete: (name: string, version: string, options?: DatasetsDeleteOptionalParams) => Promise<void>;
  /** Get the specific version of the DatasetVersion. The service returns 404 Not Found error if the DatasetVersion does not exist. */
  get: (
    name: string,
    version: string,
    options?: DatasetsGetOptionalParams,
  ) => Promise<DatasetVersionUnion>;
  /** List the latest version of each DatasetVersion */
  list: (options?: DatasetsListOptionalParams) => PagedAsyncIterableIterator<DatasetVersionUnion>;
  /** List all versions of the given DatasetVersion */
  listVersions: (
    name: string,
    options?: DatasetsListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<DatasetVersionUnion>;
}

function _getDatasets(context: AIProjectContext) {
  return {
    deleteGenerationJob: (jobId: string, options?: DatasetsDeleteGenerationJobOptionalParams) =>
      deleteGenerationJob(context, jobId, options),
    cancelGenerationJob: (jobId: string, options?: DatasetsCancelGenerationJobOptionalParams) =>
      cancelGenerationJob(context, jobId, options),
    createGenerationJob: (
      job: DataGenerationJobInputsUnion,
      options?: DatasetsCreateGenerationJobOptionalParams,
    ) => createGenerationJob(context, job, options),
    listGenerationJobs: (options?: DatasetsListGenerationJobsOptionalParams) =>
      listGenerationJobs(context, options),
    getGenerationJob: (jobId: string, options?: DatasetsGetGenerationJobOptionalParams) =>
      getGenerationJob(context, jobId, options),
    getCredentials: (
      name: string,
      version: string,
      options?: DatasetsGetCredentialsOptionalParams,
    ) => getCredentials(context, name, version, options),
    pendingUpload: (
      name: string,
      pendingUploadRequest: PendingUploadRequest,
      version: string,
      options?: DatasetsPendingUploadOptionalParams,
    ) => pendingUpload(context, name, pendingUploadRequest, version, options),
    createOrUpdate: (
      name: string,
      datasetVersion: DatasetVersionUnion,
      version: string,
      options?: DatasetsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, name, datasetVersion, version, options),
    delete: (name: string, version: string, options?: DatasetsDeleteOptionalParams) =>
      $delete(context, name, version, options),
    get: (name: string, version: string, options?: DatasetsGetOptionalParams) =>
      get(context, name, version, options),
    list: (options?: DatasetsListOptionalParams) => list(context, options),
    listVersions: (name: string, options?: DatasetsListVersionsOptionalParams) =>
      listVersions(context, name, options),
  };
}

export function _getDatasetsOperations(context: AIProjectContext): DatasetsOperations {
  return {
    ..._getDatasets(context),
  };
}
