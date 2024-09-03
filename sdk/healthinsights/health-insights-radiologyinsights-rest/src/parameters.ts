// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RequestParameters } from "@azure-rest/core-client";
import { RadiologyInsightsJob } from "./models";

/** Get the job query parameter properties */
export interface GetJobQueryParamProperties {
  /** Expand the indicated resources into the response. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  expand?: string;
}

/** Get the job query parameters */
export interface GetJobQueryParam {
  /** The query parameters. */
  queryParameters?: GetJobQueryParamProperties;
}

/** Get the job parameters, combining the query and request parameters */
export type GetJobParameters = GetJobQueryParam & RequestParameters;

/** The create job body parameters. */
export interface CreateJobBodyParam {
  /** The body of the resource instance. */
  body: RadiologyInsightsJob;
}

/** The create job query parameter properties. */
export interface CreateJobQueryParamProperties {
  /** Expand the indicated resources into the response. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  expand?: string;
}

/** The create job query parameter. */
export interface CreateJobQueryParam {
  /** The query parameters. */
  queryParameters?: CreateJobQueryParamProperties;
}

/** Create the job parameters, combining the create query parameters, the create job body paramters and the request parameters */
export type CreateJobParameters = CreateJobQueryParam & CreateJobBodyParam & RequestParameters;
