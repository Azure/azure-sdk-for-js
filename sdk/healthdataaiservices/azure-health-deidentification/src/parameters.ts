// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";
import { DeidentificationJob, DeidentificationContent } from "./models.js";

export interface GetJobHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface GetJobHeaderParam {
  headers?: RawHttpHeadersInput & GetJobHeaders;
}

export type GetJobParameters = GetJobHeaderParam & RequestParameters;

export interface CreateJobHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface CreateJobBodyParam {
  /** The resource instance. */
  body: DeidentificationJob;
}

export interface CreateJobHeaderParam {
  headers?: RawHttpHeadersInput & CreateJobHeaders;
}

export type CreateJobParameters = CreateJobHeaderParam & CreateJobBodyParam & RequestParameters;

export interface ListJobsHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ListJobsQueryParamProperties {
  /** The maximum number of result items per page. */
  maxpagesize?: number;
  /** Token to continue a previous query. */
  continuationToken?: string;
}

export interface ListJobsQueryParam {
  queryParameters?: ListJobsQueryParamProperties;
}

export interface ListJobsHeaderParam {
  headers?: RawHttpHeadersInput & ListJobsHeaders;
}

export type ListJobsParameters = ListJobsQueryParam & ListJobsHeaderParam & RequestParameters;

export interface ListJobFilesHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ListJobFilesQueryParamProperties {
  /** The maximum number of result items per page. */
  maxpagesize?: number;
  /** Token to continue a previous query. */
  continuationToken?: string;
}

export interface ListJobFilesQueryParam {
  queryParameters?: ListJobFilesQueryParamProperties;
}

export interface ListJobFilesHeaderParam {
  headers?: RawHttpHeadersInput & ListJobFilesHeaders;
}

export type ListJobFilesParameters = ListJobFilesQueryParam &
  ListJobFilesHeaderParam &
  RequestParameters;

export interface CancelJobHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface CancelJobHeaderParam {
  headers?: RawHttpHeadersInput & CancelJobHeaders;
}

export type CancelJobParameters = CancelJobHeaderParam & RequestParameters;

export interface DeleteJobHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeleteJobHeaderParam {
  headers?: RawHttpHeadersInput & DeleteJobHeaders;
}

export type DeleteJobParameters = DeleteJobHeaderParam & RequestParameters;

export interface DeidentifyBodyParam {
  /** The request body for realtime deidentification. */
  body: DeidentificationContent;
}

export type DeidentifyParameters = DeidentifyBodyParam & RequestParameters;
