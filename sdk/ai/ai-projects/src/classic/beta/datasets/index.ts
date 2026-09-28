// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import type {
  DataGenerationJobResult,
  DataGenerationJobUnion,
  DataGenerationJobInputsUnion,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type {
  BetaDatasetsDeleteGenerationJobOptionalParams,
  BetaDatasetsCancelGenerationJobOptionalParams,
  BetaDatasetsCreateGenerationJobOptionalParams,
  BetaDatasetsListGenerationJobsOptionalParams,
  BetaDatasetsGetGenerationJobOptionalParams,
} from "../../../api/beta/datasets/options.js";
import type { JobPoller } from "../../../static-helpers/pollingHelpers.js";
import {
  deleteGenerationJob,
  cancelGenerationJob,
  createGenerationJob,
  listGenerationJobs,
  getGenerationJob,
} from "../../../api/beta/datasets/operations.js";

/** Operations for BetaDatasetsOperations. */
export interface BetaDatasetsOperations {
  /** Removes the specified data generation job and its associated output. */
  deleteGenerationJob: (
    jobId: string,
    options?: BetaDatasetsDeleteGenerationJobOptionalParams,
  ) => Promise<void>;
  /** Cancels the specified data generation job if it is still in progress. */
  cancelGenerationJob: (
    jobId: string,
    options?: BetaDatasetsCancelGenerationJobOptionalParams,
  ) => Promise<DataGenerationJobUnion>;
  /** Submits a new data generation job for asynchronous execution. */
  createGenerationJob: (
    job: DataGenerationJobInputsUnion,
    options?: BetaDatasetsCreateGenerationJobOptionalParams,
  ) => JobPoller<DataGenerationJobResult>;
  /** Returns a list of data generation jobs. */
  listGenerationJobs: (
    options?: BetaDatasetsListGenerationJobsOptionalParams,
  ) => PagedAsyncIterableIterator<DataGenerationJobUnion>;
  /** Retrieves the specified data generation job and its current status. */
  getGenerationJob: (
    jobId: string,
    options?: BetaDatasetsGetGenerationJobOptionalParams,
  ) => Promise<DataGenerationJobUnion>;
}

export function _getBetaDatasetsOperations(context: AIProjectContext): BetaDatasetsOperations {
  return {
    deleteGenerationJob: (jobId: string, options?: BetaDatasetsDeleteGenerationJobOptionalParams) =>
      deleteGenerationJob(context, jobId, options),
    cancelGenerationJob: (jobId: string, options?: BetaDatasetsCancelGenerationJobOptionalParams) =>
      cancelGenerationJob(context, jobId, options),
    createGenerationJob: (
      job: DataGenerationJobInputsUnion,
      options?: BetaDatasetsCreateGenerationJobOptionalParams,
    ) => createGenerationJob(context, job, options),
    listGenerationJobs: (options?: BetaDatasetsListGenerationJobsOptionalParams) =>
      listGenerationJobs(context, options),
    getGenerationJob: (jobId: string, options?: BetaDatasetsGetGenerationJobOptionalParams) =>
      getGenerationJob(context, jobId, options),
  };
}
