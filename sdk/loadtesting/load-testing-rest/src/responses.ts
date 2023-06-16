// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import {
  TestOutput,
  PagedTestOutput,
  FileInfoOutput,
  PagedFileInfoOutput,
  TestAppComponentsOutput,
  TestServerMetricConfigOutput,
  TestRunOutput,
  PagedTestRunOutput,
  MetricNamespaceCollectionOutput,
  MetricDefinitionCollectionOutput,
  PagedTimeSeriesElementOutput,
  DimensionValueListListOutput,
  TestRunAppComponentsOutput,
  TestRunServerMetricConfigOutput,
} from "./outputModels";

/** The request has succeeded. */
export interface TestCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: TestOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface TestCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: TestOutput;
}

export interface TestCreateOrUpdateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestCreateOrUpdateDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface TestDelete204Response extends HttpResponse {
  status: "204";
}

export interface TestDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestDeleteDefaultHeaders;
}

/** The request has succeeded. */
export interface TestGet200Response extends HttpResponse {
  status: "200";
  body: TestOutput;
}

export interface TestGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestGetDefaultHeaders;
}

/** The request has succeeded. */
export interface TestList200Response extends HttpResponse {
  status: "200";
  body: PagedTestOutput;
}

export interface TestListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestListDefaultHeaders;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface TestUploadFile201Response extends HttpResponse {
  status: "201";
  body: FileInfoOutput;
}

export interface TestUploadFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestUploadFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestUploadFileDefaultHeaders;
}

/** The request has succeeded. */
export interface TestGetFile200Response extends HttpResponse {
  status: "200";
  body: FileInfoOutput;
}

export interface TestGetFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestGetFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestGetFileDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface TestDeleteFile204Response extends HttpResponse {
  status: "204";
}

export interface TestDeleteFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestDeleteFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestDeleteFileDefaultHeaders;
}

/** The request has succeeded. */
export interface TestListFiles200Response extends HttpResponse {
  status: "200";
  body: PagedFileInfoOutput;
}

export interface TestListFilesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestListFilesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestListFilesDefaultHeaders;
}

/** The request has succeeded. */
export interface TestCreateOrUpdateAppComponents200Response extends HttpResponse {
  status: "200";
  body: TestAppComponentsOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface TestCreateOrUpdateAppComponents201Response extends HttpResponse {
  status: "201";
  body: TestAppComponentsOutput;
}

export interface TestCreateOrUpdateAppComponentsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestCreateOrUpdateAppComponentsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestCreateOrUpdateAppComponentsDefaultHeaders;
}

/** The request has succeeded. */
export interface TestListAppComponents200Response extends HttpResponse {
  status: "200";
  body: TestAppComponentsOutput;
}

export interface TestListAppComponentsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestListAppComponentsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestListAppComponentsDefaultHeaders;
}

/** The request has succeeded. */
export interface TestCreateOrUpdateServerMetricsConfig200Response extends HttpResponse {
  status: "200";
  body: TestServerMetricConfigOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface TestCreateOrUpdateServerMetricsConfig201Response extends HttpResponse {
  status: "201";
  body: TestServerMetricConfigOutput;
}

export interface TestCreateOrUpdateServerMetricsConfigDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestCreateOrUpdateServerMetricsConfigDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestCreateOrUpdateServerMetricsConfigDefaultHeaders;
}

/** The request has succeeded. */
export interface TestListServerMetricsConfig200Response extends HttpResponse {
  status: "200";
  body: TestServerMetricConfigOutput;
}

export interface TestListServerMetricsConfigDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestListServerMetricsConfigDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestListServerMetricsConfigDefaultHeaders;
}

/** The request has succeeded. */
export interface TestRunGet200Response extends HttpResponse {
  status: "200";
  body: TestRunOutput;
}

export interface TestRunGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestRunGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestRunGetDefaultHeaders;
}

export interface TestRunCreateOrUpdate200Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has succeeded. */
export interface TestRunCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: Record<string, any>;
  headers: RawHttpHeaders & TestRunCreateOrUpdate200Headers;
}

export interface TestRunCreateOrUpdate201Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface TestRunCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: Record<string, any>;
  headers: RawHttpHeaders & TestRunCreateOrUpdate201Headers;
}

export interface TestRunCreateOrUpdateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestRunCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestRunCreateOrUpdateDefaultHeaders;
}

/** The final response for long-running CreateOrUpdateTestRun operation */
export interface TestRunCreateOrUpdateLogicalResponse extends HttpResponse {
  status: "200";
  body: Record<string, any>;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface TestRunDelete204Response extends HttpResponse {
  status: "204";
}

export interface TestRunDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestRunDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestRunDeleteDefaultHeaders;
}

/** The request has succeeded. */
export interface TestRunGetFile200Response extends HttpResponse {
  status: "200";
  body: FileInfoOutput;
}

export interface TestRunGetFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestRunGetFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestRunGetFileDefaultHeaders;
}

/** The request has succeeded. */
export interface TestRunList200Response extends HttpResponse {
  status: "200";
  body: PagedTestRunOutput;
}

export interface TestRunListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestRunListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestRunListDefaultHeaders;
}

/** The request has succeeded. */
export interface TestRunStop200Response extends HttpResponse {
  status: "200";
  body: TestRunOutput;
}

export interface TestRunStopDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestRunStopDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestRunStopDefaultHeaders;
}

/** The request has succeeded. */
export interface TestRunListMetricNamespaces200Response extends HttpResponse {
  status: "200";
  body: MetricNamespaceCollectionOutput;
}

export interface TestRunListMetricNamespacesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestRunListMetricNamespacesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestRunListMetricNamespacesDefaultHeaders;
}

/** The request has succeeded. */
export interface TestRunListMetricDefinitions200Response extends HttpResponse {
  status: "200";
  body: MetricDefinitionCollectionOutput;
}

export interface TestRunListMetricDefinitionsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestRunListMetricDefinitionsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestRunListMetricDefinitionsDefaultHeaders;
}

/** The request has succeeded. */
export interface TestRunListMetrics200Response extends HttpResponse {
  status: "200";
  body: PagedTimeSeriesElementOutput;
}

export interface TestRunListMetricsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestRunListMetricsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestRunListMetricsDefaultHeaders;
}

/** The request has succeeded. */
export interface TestRunListMetricDimensionValues200Response extends HttpResponse {
  status: "200";
  body: DimensionValueListListOutput;
}

export interface TestRunListMetricDimensionValuesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestRunListMetricDimensionValuesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestRunListMetricDimensionValuesDefaultHeaders;
}

/** The request has succeeded. */
export interface TestRunCreateOrUpdateAppComponents200Response extends HttpResponse {
  status: "200";
  body: TestRunAppComponentsOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface TestRunCreateOrUpdateAppComponents201Response extends HttpResponse {
  status: "201";
  body: TestRunAppComponentsOutput;
}

export interface TestRunCreateOrUpdateAppComponentsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestRunCreateOrUpdateAppComponentsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestRunCreateOrUpdateAppComponentsDefaultHeaders;
}

/** The request has succeeded. */
export interface TestRunListAppComponents200Response extends HttpResponse {
  status: "200";
  body: TestRunAppComponentsOutput;
}

export interface TestRunListAppComponentsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestRunListAppComponentsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestRunListAppComponentsDefaultHeaders;
}

/** The request has succeeded. */
export interface TestRunCreateOrUpdateServerMetricsConfig200Response extends HttpResponse {
  status: "200";
  body: TestRunServerMetricConfigOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface TestRunCreateOrUpdateServerMetricsConfig201Response extends HttpResponse {
  status: "201";
  body: TestRunServerMetricConfigOutput;
}

export interface TestRunCreateOrUpdateServerMetricsConfigDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestRunCreateOrUpdateServerMetricsConfigDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestRunCreateOrUpdateServerMetricsConfigDefaultHeaders;
}

/** The request has succeeded. */
export interface TestRunListServerMetricsConfig200Response extends HttpResponse {
  status: "200";
  body: TestRunServerMetricConfigOutput;
}

export interface TestRunListServerMetricsConfigDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestRunListServerMetricsConfigDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestRunListServerMetricsConfigDefaultHeaders;
}
