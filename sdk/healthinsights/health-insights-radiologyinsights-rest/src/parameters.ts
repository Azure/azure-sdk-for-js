// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { RadiologyInsightsJob } from "./models";

export interface GetJobQueryParamProperties {
  /**
   * A comma separated list of related properties to be included in line with the job.
   *
   * Possible values: "jobData"
   */
  expand?: string;
}

export interface GetJobQueryParam {
  queryParameters?: GetJobQueryParamProperties;
}

export type GetJobParameters = GetJobQueryParam & RequestParameters;

export interface CreateJobBodyParam {
  /** The resource instance. */
  body: RadiologyInsightsJob;
}

export interface CreateJobQueryParamProperties {
  /**
   * A comma separated list of related properties to be included in line with the job.
   *
   * Possible values: "jobData"
   */
  expand?: string;
}

export interface CreateJobQueryParam {
  queryParameters?: CreateJobQueryParamProperties;
}

export type CreateJobParameters = CreateJobQueryParam &
  CreateJobBodyParam &
  RequestParameters;
