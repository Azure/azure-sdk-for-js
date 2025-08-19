// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GetJobParameters, CreateJobParameters } from "./parameters.js";
import type {
  GetJob200Response,
  GetJobDefaultResponse,
  CreateJob200Response,
  CreateJob201Response,
  CreateJobDefaultResponse,
} from "./responses.js";
import type { Client, StreamableMethod } from "@azure-rest/core-client";

/** Gets the Radiology Insights job. */
export interface GetJob {
  /** Gets the status and details of the Radiology Insights job. */
  get(options?: GetJobParameters): StreamableMethod<GetJob200Response | GetJobDefaultResponse>;
  /** Creates a Radiology Insights job with the given request body. */
  put(
    options: CreateJobParameters,
  ): StreamableMethod<CreateJob200Response | CreateJob201Response | CreateJobDefaultResponse>;
}

/** The routes for the resource */
export interface Routes {
  /** Resource for '/radiology-insights/jobs/\{id\}' has methods for the following verbs: get, put */
  (path: "/radiology-insights/jobs/{id}", id: string): GetJob;
}

/** Create a HealthInsightsclient which is a Client an defined by the resource */
export type AzureHealthInsightsClient = Client & {
  /** The path specified by the routes for the resource */
  path: Routes;
};
