// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  TestOutput,
  ErrorResponseBodyOutput,
  TestsListOutput,
  FileInfoOutput,
  FileInfoListOutput,
  TestAppComponentsOutput,
  TestServerMetricConfigOutput,
  TestRunOutput,
  TestRunsListOutput,
  MetricNamespaceCollectionOutput,
  MetricDefinitionCollectionOutput,
  MetricsOutput,
  DimensionValueListOutput,
  TestRunAppComponentsOutput,
  TestRunServerMetricConfigOutput,
} from "./outputModels";

/** Create a new test or update an existing test. */
export interface TestCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: TestOutput;
}

/** Create a new test or update an existing test. */
export interface TestCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: TestOutput;
}

export interface TestCreateOrUpdateDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Create a new test or update an existing test. */
export interface TestCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestCreateOrUpdateDefaultHeaders;
}

/** Delete a test by its name. */
export interface TestDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface TestDeleteDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Delete a test by its name. */
export interface TestDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestDeleteDefaultHeaders;
}

/** Get load test details by test name */
export interface TestGet200Response extends HttpResponse {
  status: "200";
  body: TestOutput;
}

export interface TestGetDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get load test details by test name */
export interface TestGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestGetDefaultHeaders;
}

/** Get all load tests by the fully qualified resource Id e.g subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}. */
export interface TestList200Response extends HttpResponse {
  status: "200";
  body: TestsListOutput;
}

export interface TestListDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get all load tests by the fully qualified resource Id e.g subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}. */
export interface TestListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestListDefaultHeaders;
}

/** Upload input file for a given test name. File size can't be more than 50 MB. Existing file with same name for the given test will be overwritten. File should be provided in the request body as application/octet-stream. */
export interface TestUploadFile201Response extends HttpResponse {
  status: "201";
  body: FileInfoOutput;
}

export interface TestUploadFileDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Upload input file for a given test name. File size can't be more than 50 MB. Existing file with same name for the given test will be overwritten. File should be provided in the request body as application/octet-stream. */
export interface TestUploadFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestUploadFileDefaultHeaders;
}

/** Get test file by the file name. */
export interface TestGetFile200Response extends HttpResponse {
  status: "200";
  body: FileInfoOutput;
}

export interface TestGetFileDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get test file by the file name. */
export interface TestGetFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestGetFileDefaultHeaders;
}

/** Delete file by the file name for a test */
export interface TestDeleteFile204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface TestDeleteFileDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Delete file by the file name for a test */
export interface TestDeleteFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestDeleteFileDefaultHeaders;
}

/** Get all test files. */
export interface TestListFiles200Response extends HttpResponse {
  status: "200";
  body: FileInfoListOutput;
}

export interface TestListFilesDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get all test files. */
export interface TestListFilesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestListFilesDefaultHeaders;
}

/** Associate an app component (collection of azure resources) to a test */
export interface TestCreateOrUpdateAppComponents200Response extends HttpResponse {
  status: "200";
  body: TestAppComponentsOutput;
}

/** Associate an app component (collection of azure resources) to a test */
export interface TestCreateOrUpdateAppComponents201Response extends HttpResponse {
  status: "201";
  body: TestAppComponentsOutput;
}

export interface TestCreateOrUpdateAppComponentsDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Associate an app component (collection of azure resources) to a test */
export interface TestCreateOrUpdateAppComponentsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestCreateOrUpdateAppComponentsDefaultHeaders;
}

/** Get associated app component (collection of azure resources) for the given test. */
export interface TestListAppComponents200Response extends HttpResponse {
  status: "200";
  body: TestAppComponentsOutput;
}

export interface TestListAppComponentsDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get associated app component (collection of azure resources) for the given test. */
export interface TestListAppComponentsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestListAppComponentsDefaultHeaders;
}

/** Configure server metrics for a test */
export interface TestCreateOrUpdateServerMetricsConfig200Response extends HttpResponse {
  status: "200";
  body: TestServerMetricConfigOutput;
}

/** Configure server metrics for a test */
export interface TestCreateOrUpdateServerMetricsConfig201Response extends HttpResponse {
  status: "201";
  body: TestServerMetricConfigOutput;
}

export interface TestCreateOrUpdateServerMetricsConfigDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Configure server metrics for a test */
export interface TestCreateOrUpdateServerMetricsConfigDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestCreateOrUpdateServerMetricsConfigDefaultHeaders;
}

/** List server metrics configuration for the given test. */
export interface TestListServerMetricsConfig200Response extends HttpResponse {
  status: "200";
  body: TestServerMetricConfigOutput;
}

export interface TestListServerMetricsConfigDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** List server metrics configuration for the given test. */
export interface TestListServerMetricsConfigDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestListServerMetricsConfigDefaultHeaders;
}

/** Delete a test run by its name. */
export interface TestRunDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface TestRunDeleteDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Delete a test run by its name. */
export interface TestRunDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunDeleteDefaultHeaders;
}

/** Create and start a new test run with the given name. */
export interface TestRunCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: TestRunOutput;
}

/** Create and start a new test run with the given name. */
export interface TestRunCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: TestRunOutput;
}

export interface TestRunCreateOrUpdateDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Create and start a new test run with the given name. */
export interface TestRunCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunCreateOrUpdateDefaultHeaders;
}

/** Get test run details by name. */
export interface TestRunGet200Response extends HttpResponse {
  status: "200";
  body: TestRunOutput;
}

export interface TestRunGetDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get test run details by name. */
export interface TestRunGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunGetDefaultHeaders;
}

/** Get test run file by file name. */
export interface TestRunGetFile200Response extends HttpResponse {
  status: "200";
  body: FileInfoOutput;
}

export interface TestRunGetFileDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get test run file by file name. */
export interface TestRunGetFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunGetFileDefaultHeaders;
}

/** Get all test runs with given filters */
export interface TestRunList200Response extends HttpResponse {
  status: "200";
  body: TestRunsListOutput;
}

export interface TestRunListDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get all test runs with given filters */
export interface TestRunListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunListDefaultHeaders;
}

/** Stop test run by name. */
export interface TestRunStop200Response extends HttpResponse {
  status: "200";
  body: TestRunOutput;
}

export interface TestRunStopDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Stop test run by name. */
export interface TestRunStopDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunStopDefaultHeaders;
}

/** List the metric namespaces for a load test run. */
export interface TestRunListMetricNamespaces200Response extends HttpResponse {
  status: "200";
  body: MetricNamespaceCollectionOutput;
}

export interface TestRunListMetricNamespacesDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** List the metric namespaces for a load test run. */
export interface TestRunListMetricNamespacesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunListMetricNamespacesDefaultHeaders;
}

/** List the metric definitions for a load test run. */
export interface TestRunListMetricDefinitions200Response extends HttpResponse {
  status: "200";
  body: MetricDefinitionCollectionOutput;
}

export interface TestRunListMetricDefinitionsDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** List the metric definitions for a load test run. */
export interface TestRunListMetricDefinitionsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunListMetricDefinitionsDefaultHeaders;
}

/** List the metric values for a load test run. */
export interface TestRunListMetrics200Response extends HttpResponse {
  status: "200";
  body: MetricsOutput;
}

export interface TestRunListMetricsDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** List the metric values for a load test run. */
export interface TestRunListMetricsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunListMetricsDefaultHeaders;
}

/** List the dimension values for the given metric dimension name. */
export interface TestRunListMetricDimensionValues200Response extends HttpResponse {
  status: "200";
  body: DimensionValueListOutput;
}

export interface TestRunListMetricDimensionValuesDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** List the dimension values for the given metric dimension name. */
export interface TestRunListMetricDimensionValuesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunListMetricDimensionValuesDefaultHeaders;
}

/** Associate an app component (collection of azure resources) to a test run */
export interface TestRunCreateOrUpdateAppComponents200Response extends HttpResponse {
  status: "200";
  body: TestRunAppComponentsOutput;
}

/** Associate an app component (collection of azure resources) to a test run */
export interface TestRunCreateOrUpdateAppComponents201Response extends HttpResponse {
  status: "201";
  body: TestRunAppComponentsOutput;
}

export interface TestRunCreateOrUpdateAppComponentsDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Associate an app component (collection of azure resources) to a test run */
export interface TestRunCreateOrUpdateAppComponentsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunCreateOrUpdateAppComponentsDefaultHeaders;
}

/** Get associated app component (collection of azure resources) for the given test run. */
export interface TestRunListAppComponents200Response extends HttpResponse {
  status: "200";
  body: TestRunAppComponentsOutput;
}

export interface TestRunListAppComponentsDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get associated app component (collection of azure resources) for the given test run. */
export interface TestRunListAppComponentsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunListAppComponentsDefaultHeaders;
}

/** Configure server metrics for a test run */
export interface TestRunCreateOrUpdateServerMetricsConfig200Response extends HttpResponse {
  status: "200";
  body: TestRunServerMetricConfigOutput;
}

/** Configure server metrics for a test run */
export interface TestRunCreateOrUpdateServerMetricsConfig201Response extends HttpResponse {
  status: "201";
  body: TestRunServerMetricConfigOutput;
}

export interface TestRunCreateOrUpdateServerMetricsConfigDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Configure server metrics for a test run */
export interface TestRunCreateOrUpdateServerMetricsConfigDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunCreateOrUpdateServerMetricsConfigDefaultHeaders;
}

/** List server metrics configuration for the given test run. */
export interface TestRunListServerMetricsConfig200Response extends HttpResponse {
  status: "200";
  body: TestRunServerMetricConfigOutput;
}

export interface TestRunListServerMetricsConfigDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** List server metrics configuration for the given test run. */
export interface TestRunListServerMetricsConfigDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunListServerMetricsConfigDefaultHeaders;
}
