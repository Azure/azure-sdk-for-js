// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Client, StreamableMethod } from "@azure-rest/core-client";
import { CreateJobParameters, GetJobParameters } from "./parameters";
import {
  CreateJob200Response,
  CreateJob201Response,
  CreateJobDefaultResponse,
  GetJob200Response,
  GetJobDefaultResponse,
} from "./responses";

/** Gets the Radiology Insights job. */
export interface GetJob {
  /** Gets the status and details of the Radiology Insights job. */
  get(options?: GetJobParameters): StreamableMethod<GetJob200Response | GetJobDefaultResponse>;
  /** Creates a Radiology Insights job with the given request body. */
  put(
    options: CreateJobParameters,
    requestOptions?: GetJobParameters,
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
