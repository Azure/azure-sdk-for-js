// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  deleteGenerationJob,
  cancelGenerationJob,
  createGenerationJob,
  listGenerationJobs,
  getGenerationJob,
} from "../../../api/beta/datasets/operations.js";
import type {
  BetaDatasetsDeleteGenerationJobOptionalParams,
  BetaDatasetsCancelGenerationJobOptionalParams,
  BetaDatasetsCreateGenerationJobOptionalParams,
  BetaDatasetsListGenerationJobsOptionalParams,
  BetaDatasetsGetGenerationJobOptionalParams,
} from "../../../api/beta/datasets/options.js";
import type { DataGenerationJob } from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a BetaDatasets operations. */
export interface BetaDatasetsOperations {
  /** Deletes a data generation job by its ID. */
  deleteGenerationJob: (
    jobId: string,
    options?: BetaDatasetsDeleteGenerationJobOptionalParams,
  ) => Promise<void>;
  /** Cancels a data generation job by its ID. */
  cancelGenerationJob: (
    jobId: string,
    options?: BetaDatasetsCancelGenerationJobOptionalParams,
  ) => Promise<DataGenerationJob>;
  /** Creates a data generation job. */
  createGenerationJob: (
    job: DataGenerationJob,
    options?: BetaDatasetsCreateGenerationJobOptionalParams,
  ) => Promise<DataGenerationJob>;
  /** Returns a list of data generation jobs. */
  listGenerationJobs: (
    options?: BetaDatasetsListGenerationJobsOptionalParams,
  ) => PagedAsyncIterableIterator<DataGenerationJob>;
  /** Gets the details of a data generation job by its ID. */
  getGenerationJob: (
    jobId: string,
    options?: BetaDatasetsGetGenerationJobOptionalParams,
  ) => Promise<DataGenerationJob>;
}

function _getBetaDatasets(context: AIProjectContext) {
  return {
    deleteGenerationJob: (jobId: string, options?: BetaDatasetsDeleteGenerationJobOptionalParams) =>
      deleteGenerationJob(context, jobId, options),
    cancelGenerationJob: (jobId: string, options?: BetaDatasetsCancelGenerationJobOptionalParams) =>
      cancelGenerationJob(context, jobId, options),
    createGenerationJob: (
      job: DataGenerationJob,
      options?: BetaDatasetsCreateGenerationJobOptionalParams,
    ) => createGenerationJob(context, job, options),
    listGenerationJobs: (options?: BetaDatasetsListGenerationJobsOptionalParams) =>
      listGenerationJobs(context, options),
    getGenerationJob: (jobId: string, options?: BetaDatasetsGetGenerationJobOptionalParams) =>
      getGenerationJob(context, jobId, options),
  };
}

export function _getBetaDatasetsOperations(context: AIProjectContext): BetaDatasetsOperations {
  return {
    ..._getBetaDatasets(context),
  };
}
