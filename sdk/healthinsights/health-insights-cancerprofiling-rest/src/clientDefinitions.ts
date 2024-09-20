// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GetJobParameters, CreateJobParameters } from "./parameters";
import {
  GetJob200Response,
  GetJobDefaultResponse,
  CreateJob200Response,
  CreateJob202Response,
  CreateJobDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetJob {
  /** Gets the status and details of the Onco Phenotype job. */
  get(options?: GetJobParameters): StreamableMethod<GetJob200Response | GetJobDefaultResponse>;
}

export interface CreateJob {
  /** Creates an Onco Phenotype job with the given request body. */
  post(
    options?: CreateJobParameters,
  ): StreamableMethod<CreateJob200Response | CreateJob202Response | CreateJobDefaultResponse>;
}

export interface Routes {
  /** Resource for '/oncophenotype/jobs/\{jobId\}' has methods for the following verbs: get */
  (path: "/oncophenotype/jobs/{jobId}", jobId: string): GetJob;
  /** Resource for '/oncophenotype/jobs' has methods for the following verbs: post */
  (path: "/oncophenotype/jobs"): CreateJob;
}

export type CancerProfilingRestClient = Client & {
  path: Routes;
};
