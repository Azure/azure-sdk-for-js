// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  GetJobParameters,
  DeidentifyDocumentsParameters,
  DeleteJobParameters,
  ListJobsParameters,
  ListJobDocumentsParameters,
  CancelJobParameters,
  DeidentifyTextParameters,
} from "./parameters.js";
import {
  GetJob200Response,
  GetJobDefaultResponse,
  DeidentifyDocuments200Response,
  DeidentifyDocuments201Response,
  DeidentifyDocumentsDefaultResponse,
  DeleteJob204Response,
  DeleteJobDefaultResponse,
  ListJobs200Response,
  ListJobsDefaultResponse,
  ListJobDocuments200Response,
  ListJobDocumentsDefaultResponse,
  CancelJob200Response,
  CancelJobDefaultResponse,
  DeidentifyText200Response,
  DeidentifyTextDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetJob {
  /** Resource read operation template. */
  get(
    options?: GetJobParameters,
  ): StreamableMethod<GetJob200Response | GetJobDefaultResponse>;
  /** Long-running resource create or replace operation template. */
  put(
    options: DeidentifyDocumentsParameters,
  ): StreamableMethod<
    | DeidentifyDocuments200Response
    | DeidentifyDocuments201Response
    | DeidentifyDocumentsDefaultResponse
  >;
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
  ): StreamableMethod<
    ListJobDocuments200Response | ListJobDocumentsDefaultResponse
  >;
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

export interface DeidentifyText {
  /** A remote procedure call (RPC) operation. */
  post(
    options: DeidentifyTextParameters,
  ): StreamableMethod<
    DeidentifyText200Response | DeidentifyTextDefaultResponse
  >;
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
  (path: "/deid"): DeidentifyText;
}

export type DeidentificationClient = Client & {
  path: Routes;
};
