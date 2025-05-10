// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import type {
  ExperimentMetricOutput,
  ExperimentMetricValidationResultOutput,
  PagedExperimentMetricOutput,
} from "./outputModels.js";

export interface GetMetric200Headers {
  /** The entity tag for the response. */
  etag?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface GetMetric200Response extends HttpResponse {
  status: "200";
  body: ExperimentMetricOutput;
  headers: RawHttpHeaders & GetMetric200Headers;
}

export interface GetMetricDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetMetricDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetMetricDefaultHeaders;
}

export interface CreateOrUpdateMetric200Headers {
  /** The entity tag for the response. */
  etag?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface CreateOrUpdateMetric200Response extends HttpResponse {
  status: "200";
  body: ExperimentMetricOutput;
  headers: RawHttpHeaders & CreateOrUpdateMetric200Headers;
}

export interface CreateOrUpdateMetric201Headers {
  /** The entity tag for the response. */
  etag?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface CreateOrUpdateMetric201Response extends HttpResponse {
  status: "201";
  body: ExperimentMetricOutput;
  headers: RawHttpHeaders & CreateOrUpdateMetric201Headers;
}

export interface CreateOrUpdateMetricDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateOrUpdateMetricDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateOrUpdateMetricDefaultHeaders;
}

export interface ValidateMetric200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface ValidateMetric200Response extends HttpResponse {
  status: "200";
  body: ExperimentMetricValidationResultOutput;
  headers: RawHttpHeaders & ValidateMetric200Headers;
}

export interface ValidateMetricDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ValidateMetricDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ValidateMetricDefaultHeaders;
}

export interface DeleteMetric204Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteMetric204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & DeleteMetric204Headers;
}

export interface DeleteMetricDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteMetricDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteMetricDefaultHeaders;
}

export interface ListMetrics200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface ListMetrics200Response extends HttpResponse {
  status: "200";
  body: PagedExperimentMetricOutput;
  headers: RawHttpHeaders & ListMetrics200Headers;
}

export interface ListMetricsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListMetricsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListMetricsDefaultHeaders;
}
