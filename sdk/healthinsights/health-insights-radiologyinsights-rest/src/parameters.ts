// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { RadiologyInsightsJob } from "./models";

export interface GetJobQueryParamProperties {
  /** Expand the indicated resources into the response. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
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
  /** Expand the indicated resources into the response. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  expand?: string;
}

export interface CreateJobQueryParam {
  queryParameters?: CreateJobQueryParamProperties;
}

export type CreateJobParameters = CreateJobQueryParam &
  CreateJobBodyParam &
  RequestParameters;
