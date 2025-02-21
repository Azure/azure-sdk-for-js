// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GetJobParameters, CreateJobParameters } from "./parameters.js";
import type {
  GetJob200Response,
  GetJobDefaultResponse,
  CreateJob200Response,
  CreateJob202Response,
  CreateJobDefaultResponse,
} from "./responses.js";
import type { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetJob {
  /** Gets the status and details of the Trial Matcher job. */
  get(options?: GetJobParameters): StreamableMethod<GetJob200Response | GetJobDefaultResponse>;
}

export interface CreateJob {
  /** Creates a Trial Matcher job with the given request body. */
  post(
    options?: CreateJobParameters,
  ): StreamableMethod<CreateJob200Response | CreateJob202Response | CreateJobDefaultResponse>;
}

export interface Routes {
  /** Resource for '/trialmatcher/jobs/\{jobId\}' has methods for the following verbs: get */
  (path: "/trialmatcher/jobs/{jobId}", jobId: string): GetJob;
  /** Resource for '/trialmatcher/jobs' has methods for the following verbs: post */
  (path: "/trialmatcher/jobs"): CreateJob;
}

export type ClinicalMatchingRestClient = Client & {
  path: Routes;
};
