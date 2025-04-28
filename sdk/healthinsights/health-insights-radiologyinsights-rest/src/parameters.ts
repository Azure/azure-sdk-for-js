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

export interface GetJobQueryParamProperties {
  /** Expand the indicated resources into the response. */
  expand?: GetJobExpandQueryParam;
}

export interface GetJobQueryParam {
  queryParameters?: GetJobQueryParamProperties;
}

export type GetJobParameters = GetJobQueryParam & RequestParameters;

export interface CreateJobBodyParam {
  /** The resource instance. */
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

export interface CreateJobQueryParamProperties {
  /** Expand the indicated resources into the response. */
  expand?: CreateJobExpandQueryParam;
}

export interface CreateJobQueryParam {
  queryParameters?: CreateJobQueryParamProperties;
}

export type CreateJobParameters = CreateJobQueryParam & CreateJobBodyParam & RequestParameters;
