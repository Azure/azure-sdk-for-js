// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GetJobParameters, CreateJobParameters } from "./parameters";
import {
  GetJob200Response,
  GetJobDefaultResponse,
  CreateJob200Response,
  CreateJob201Response,
  CreateJobDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetJob {
  /** Gets the status and details of the Radiology Insights job. */
  get(
    options?: GetJobParameters,
  ): StreamableMethod<GetJob200Response | GetJobDefaultResponse>;
  /** Creates a Radiology Insights job with the given request body. */
  put(
    options: CreateJobParameters,
  ): StreamableMethod<
    CreateJob200Response | CreateJob201Response | CreateJobDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/radiology-insights/jobs/\{id\}' has methods for the following verbs: get, put */
  (path: "/radiology-insights/jobs/{id}", id: string): GetJob;
}

export type AzureHealthInsightsClient = Client & {
  path: Routes;
};
