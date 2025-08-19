// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RequestParameters } from "@azure-rest/core-client";
import type { RadiologyInsightsJob } from "./models.js";

/** This is the wrapper object for the parameter `expand` with explode set to true and style set to form. */
export interface GetJobExpandQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

/** Get the job query parameter properties */
export interface GetJobQueryParamProperties {
  /** Expand the indicated resources into the response. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  expand?: GetJobExpandQueryParam;
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

/** This is the wrapper object for the parameter `expand` with explode set to true and style set to form. */
export interface CreateJobExpandQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

/** The create job query parameter properties. */
export interface CreateJobQueryParamProperties {
  /** Expand the indicated resources into the response. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  expand?: CreateJobExpandQueryParam;
}

/** The create job query parameter. */
export interface CreateJobQueryParam {
  /** The query parameters. */
  queryParameters?: CreateJobQueryParamProperties;
}

/** Create the job parameters, combining the create query parameters, the create job body paramters and the request parameters */
export type CreateJobParameters = CreateJobQueryParam & CreateJobBodyParam & RequestParameters;
