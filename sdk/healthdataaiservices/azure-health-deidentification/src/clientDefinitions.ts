// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetJobParameters,
  CreateJobParameters,
  DeleteJobParameters,
  ListJobsParameters,
  ListJobDocumentsParameters,
  CancelJobParameters,
  DeidentifyParameters,
} from "./parameters.js";
import {
  GetJob200Response,
  GetJobDefaultResponse,
  CreateJob200Response,
  CreateJob201Response,
  CreateJobDefaultResponse,
  DeleteJob204Response,
  DeleteJobDefaultResponse,
  ListJobs200Response,
  ListJobsDefaultResponse,
  ListJobDocuments200Response,
  ListJobDocumentsDefaultResponse,
  CancelJob200Response,
  CancelJobDefaultResponse,
  Deidentify200Response,
  DeidentifyDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetJob {
  /** Resource read operation template. */
  get(options?: GetJobParameters): StreamableMethod<GetJob200Response | GetJobDefaultResponse>;
  /** Long-running resource create or replace operation template. */
  put(
    options: CreateJobParameters,
  ): StreamableMethod<CreateJob200Response | CreateJob201Response | CreateJobDefaultResponse>;
  /** Removes the record of the job from the service. Does not delete any documents. */
  delete(
    options?: DeleteJobParameters,
  ): StreamableMethod<DeleteJob204Response | DeleteJobDefaultResponse>;
}

export interface ListJobs {
  /** Resource list operation template. */
  get(
    options?: ListJobsParameters,
  ): StreamableMethod<ListJobs200Response | ListJobsDefaultResponse>;
}

export interface ListJobDocuments {
  /** Resource list operation template. */
  get(
    options?: ListJobDocumentsParameters,
  ): StreamableMethod<ListJobDocuments200Response | ListJobDocumentsDefaultResponse>;
}

export interface CancelJob {
  /**
   * Cancels a job that is in progress.
   *
   * The job will be marked as canceled and the service will stop processing the job. The service will not delete any documents that have already been processed.
   *
   * If the job is already complete, this will have no effect.
   */
  post(
    options?: CancelJobParameters,
  ): StreamableMethod<CancelJob200Response | CancelJobDefaultResponse>;
}

export interface Deidentify {
  /** A remote procedure call (RPC) operation. */
  post(
    options: DeidentifyParameters,
  ): StreamableMethod<Deidentify200Response | DeidentifyDefaultResponse>;
}

export interface Routes {
  /** Resource for '/jobs/\{name\}' has methods for the following verbs: get, put, delete */
  (path: "/jobs/{name}", name: string): GetJob;
  /** Resource for '/jobs' has methods for the following verbs: get */
  (path: "/jobs"): ListJobs;
  /** Resource for '/jobs/\{name\}/documents' has methods for the following verbs: get */
  (path: "/jobs/{name}/documents", name: string): ListJobDocuments;
  /** Resource for '/jobs/\{name\}:cancel' has methods for the following verbs: post */
  (path: "/jobs/{name}:cancel", name: string): CancelJob;
  /** Resource for '/deid' has methods for the following verbs: post */
  (path: "/deid"): Deidentify;
}

export type DeidServicesClient = Client & {
  path: Routes;
};
