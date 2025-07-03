// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse } from "@azure-rest/core-client";
import type {
  RadiologyInsightsJobOutput,
  HealthInsightsErrorResponseOutput,
} from "./outputModels.js";

export interface GetJob200Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  /** An opaque, globally-unique, server-generated string identifier for the request. */
  "x-ms-request-id"?: string;
}

/** The request has succeeded. */
export interface GetJob200Response extends HttpResponse {
  status: "200";
  body: RadiologyInsightsJobOutput;
  headers: RawHttpHeaders & GetJob200Headers;
}

export interface GetJobDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
  /** An opaque, globally-unique, server-generated string identifier for the request. */
  "x-ms-request-id"?: string;
}

export interface GetJobDefaultResponse extends HttpResponse {
  status: string;
  body: HealthInsightsErrorResponseOutput;
  headers: RawHttpHeaders & GetJobDefaultHeaders;
}

export interface CreateJob200Headers {
  /** An opaque, globally-unique, server-generated string identifier for the request. */
  "x-ms-request-id"?: string;
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has succeeded. */
export interface CreateJob200Response extends HttpResponse {
  status: "200";
  body: RadiologyInsightsJobOutput;
  headers: RawHttpHeaders & CreateJob200Headers;
}

export interface CreateJob201Headers {
  /** An opaque, globally-unique, server-generated string identifier for the request. */
  "x-ms-request-id"?: string;
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface CreateJob201Response extends HttpResponse {
  status: "201";
  body: RadiologyInsightsJobOutput;
  headers: RawHttpHeaders & CreateJob201Headers;
}

export interface CreateJobDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
  /** An opaque, globally-unique, server-generated string identifier for the request. */
  "x-ms-request-id"?: string;
}

export interface CreateJobDefaultResponse extends HttpResponse {
  status: string;
  body: HealthInsightsErrorResponseOutput;
  headers: RawHttpHeaders & CreateJobDefaultHeaders;
}

/** The final response for long-running createJob operation */
export interface CreateJobLogicalResponse extends HttpResponse {
  status: "200";
  body: RadiologyInsightsJobOutput;
}
