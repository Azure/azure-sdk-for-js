// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
export interface LoadTestAdministrationCreateOrUpdateTest200Response
  extends HttpResponse {
  status: "200";
  body: TestOutput;
}

/** Create a new test or update an existing test. */
export interface LoadTestAdministrationCreateOrUpdateTest201Response
  extends HttpResponse {
  status: "201";
  body: TestOutput;
}

export interface LoadTestAdministrationCreateOrUpdateTestDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Create a new test or update an existing test. */
export interface LoadTestAdministrationCreateOrUpdateTestDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders &
    LoadTestAdministrationCreateOrUpdateTestDefaultHeaders;
}

/** Delete a test by its name. */
export interface LoadTestAdministrationDeleteTest204Response
  extends HttpResponse {
  status: "204";
}

export interface LoadTestAdministrationDeleteTestDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Delete a test by its name. */
export interface LoadTestAdministrationDeleteTestDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & LoadTestAdministrationDeleteTestDefaultHeaders;
}

/** Get load test details by test name */
export interface LoadTestAdministrationGetTest200Response extends HttpResponse {
  status: "200";
  body: TestOutput;
}

export interface LoadTestAdministrationGetTestDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get load test details by test name */
export interface LoadTestAdministrationGetTestDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & LoadTestAdministrationGetTestDefaultHeaders;
}

/** Get all load tests by the fully qualified resource Id e.g subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}. */
export interface LoadTestAdministrationListTests200Response
  extends HttpResponse {
  status: "200";
  body: TestsListOutput;
}

export interface LoadTestAdministrationListTestsDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get all load tests by the fully qualified resource Id e.g subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}. */
export interface LoadTestAdministrationListTestsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & LoadTestAdministrationListTestsDefaultHeaders;
}

/** Upload input file for a given test name. File size can't be more than 50 MB. Existing file with same name for the given test will be overwritten. File should be provided in the request body as application/octet-stream. */
export interface LoadTestAdministrationUploadTestFile201Response
  extends HttpResponse {
  status: "201";
  body: FileInfoOutput;
}

export interface LoadTestAdministrationUploadTestFileDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Upload input file for a given test name. File size can't be more than 50 MB. Existing file with same name for the given test will be overwritten. File should be provided in the request body as application/octet-stream. */
export interface LoadTestAdministrationUploadTestFileDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & LoadTestAdministrationUploadTestFileDefaultHeaders;
}

/** Get test file by the file name. */
export interface LoadTestAdministrationGetTestFile200Response
  extends HttpResponse {
  status: "200";
  body: FileInfoOutput;
}

export interface LoadTestAdministrationGetTestFileDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get test file by the file name. */
export interface LoadTestAdministrationGetTestFileDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & LoadTestAdministrationGetTestFileDefaultHeaders;
}

/** Delete file by the file name for a test */
export interface LoadTestAdministrationDeleteTestFile204Response
  extends HttpResponse {
  status: "204";
}

export interface LoadTestAdministrationDeleteTestFileDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Delete file by the file name for a test */
export interface LoadTestAdministrationDeleteTestFileDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & LoadTestAdministrationDeleteTestFileDefaultHeaders;
}

/** Get all test files. */
export interface LoadTestAdministrationListTestFiles200Response
  extends HttpResponse {
  status: "200";
  body: FileInfoListOutput;
}

export interface LoadTestAdministrationListTestFilesDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get all test files. */
export interface LoadTestAdministrationListTestFilesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & LoadTestAdministrationListTestFilesDefaultHeaders;
}

/** Associate an app component (collection of azure resources) to a test */
export interface LoadTestAdministrationCreateOrUpdateAppComponents200Response
  extends HttpResponse {
  status: "200";
  body: TestAppComponentsOutput;
}

/** Associate an app component (collection of azure resources) to a test */
export interface LoadTestAdministrationCreateOrUpdateAppComponents201Response
  extends HttpResponse {
  status: "201";
  body: TestAppComponentsOutput;
}

export interface LoadTestAdministrationCreateOrUpdateAppComponentsDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Associate an app component (collection of azure resources) to a test */
export interface LoadTestAdministrationCreateOrUpdateAppComponentsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders &
    LoadTestAdministrationCreateOrUpdateAppComponentsDefaultHeaders;
}

/** Get associated app component (collection of azure resources) for the given test. */
export interface LoadTestAdministrationGetAppComponents200Response
  extends HttpResponse {
  status: "200";
  body: TestAppComponentsOutput;
}

export interface LoadTestAdministrationGetAppComponentsDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get associated app component (collection of azure resources) for the given test. */
export interface LoadTestAdministrationGetAppComponentsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders &
    LoadTestAdministrationGetAppComponentsDefaultHeaders;
}

/** Configure server metrics for a test */
export interface LoadTestAdministrationCreateOrUpdateServerMetricsConfig200Response
  extends HttpResponse {
  status: "200";
  body: TestServerMetricConfigOutput;
}

/** Configure server metrics for a test */
export interface LoadTestAdministrationCreateOrUpdateServerMetricsConfig201Response
  extends HttpResponse {
  status: "201";
  body: TestServerMetricConfigOutput;
}

export interface LoadTestAdministrationCreateOrUpdateServerMetricsConfigDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Configure server metrics for a test */
export interface LoadTestAdministrationCreateOrUpdateServerMetricsConfigDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders &
    LoadTestAdministrationCreateOrUpdateServerMetricsConfigDefaultHeaders;
}

/** List server metrics configuration for the given test. */
export interface LoadTestAdministrationGetServerMetricsConfig200Response
  extends HttpResponse {
  status: "200";
  body: TestServerMetricConfigOutput;
}

export interface LoadTestAdministrationGetServerMetricsConfigDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** List server metrics configuration for the given test. */
export interface LoadTestAdministrationGetServerMetricsConfigDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders &
    LoadTestAdministrationGetServerMetricsConfigDefaultHeaders;
}

/** Create and start a new test run with the given name. */
export interface LoadTestRunCreateOrUpdateTestRun200Response
  extends HttpResponse {
  status: "200";
  body: TestRunOutput;
}

/** Create and start a new test run with the given name. */
export interface LoadTestRunCreateOrUpdateTestRun201Response
  extends HttpResponse {
  status: "201";
  body: TestRunOutput;
}

export interface LoadTestRunCreateOrUpdateTestRunDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Create and start a new test run with the given name. */
export interface LoadTestRunCreateOrUpdateTestRunDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & LoadTestRunCreateOrUpdateTestRunDefaultHeaders;
}

/** Get test run details by name. */
export interface LoadTestRunGetTestRun200Response extends HttpResponse {
  status: "200";
  body: TestRunOutput;
}

export interface LoadTestRunGetTestRunDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get test run details by name. */
export interface LoadTestRunGetTestRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & LoadTestRunGetTestRunDefaultHeaders;
}

/** Delete a test run by its name. */
export interface LoadTestRunDeleteTestRun204Response extends HttpResponse {
  status: "204";
}

export interface LoadTestRunDeleteTestRunDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Delete a test run by its name. */
export interface LoadTestRunDeleteTestRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & LoadTestRunDeleteTestRunDefaultHeaders;
}

/** Get test run file by file name. */
export interface LoadTestRunGetTestRunFile200Response extends HttpResponse {
  status: "200";
  body: FileInfoOutput;
}

export interface LoadTestRunGetTestRunFileDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get test run file by file name. */
export interface LoadTestRunGetTestRunFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & LoadTestRunGetTestRunFileDefaultHeaders;
}

/** Get all test runs with given filters */
export interface LoadTestRunListTestRuns200Response extends HttpResponse {
  status: "200";
  body: TestRunsListOutput;
}

export interface LoadTestRunListTestRunsDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get all test runs with given filters */
export interface LoadTestRunListTestRunsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & LoadTestRunListTestRunsDefaultHeaders;
}

/** Stop test run by name. */
export interface LoadTestRunStopTestRun200Response extends HttpResponse {
  status: "200";
  body: TestRunOutput;
}

export interface LoadTestRunStopTestRunDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Stop test run by name. */
export interface LoadTestRunStopTestRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & LoadTestRunStopTestRunDefaultHeaders;
}

/** List the metric namespaces for a load test run. */
export interface LoadTestRunListMetricNamespaces200Response
  extends HttpResponse {
  status: "200";
  body: MetricNamespaceCollectionOutput;
}

export interface LoadTestRunListMetricNamespacesDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** List the metric namespaces for a load test run. */
export interface LoadTestRunListMetricNamespacesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & LoadTestRunListMetricNamespacesDefaultHeaders;
}

/** List the metric definitions for a load test run. */
export interface LoadTestRunListMetricDefinitions200Response
  extends HttpResponse {
  status: "200";
  body: MetricDefinitionCollectionOutput;
}

export interface LoadTestRunListMetricDefinitionsDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** List the metric definitions for a load test run. */
export interface LoadTestRunListMetricDefinitionsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & LoadTestRunListMetricDefinitionsDefaultHeaders;
}

/** List the metric values for a load test run. */
export interface LoadTestRunListMetrics200Response extends HttpResponse {
  status: "200";
  body: MetricsOutput;
}

export interface LoadTestRunListMetricsDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** List the metric values for a load test run. */
export interface LoadTestRunListMetricsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & LoadTestRunListMetricsDefaultHeaders;
}

/** List the dimension values for the given metric dimension name. */
export interface LoadTestRunListMetricDimensionValues200Response
  extends HttpResponse {
  status: "200";
  body: DimensionValueListOutput;
}

export interface LoadTestRunListMetricDimensionValuesDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** List the dimension values for the given metric dimension name. */
export interface LoadTestRunListMetricDimensionValuesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & LoadTestRunListMetricDimensionValuesDefaultHeaders;
}

/** Associate an app component (collection of azure resources) to a test run */
export interface LoadTestRunCreateOrUpdateAppComponents200Response
  extends HttpResponse {
  status: "200";
  body: TestRunAppComponentsOutput;
}

/** Associate an app component (collection of azure resources) to a test run */
export interface LoadTestRunCreateOrUpdateAppComponents201Response
  extends HttpResponse {
  status: "201";
  body: TestRunAppComponentsOutput;
}

export interface LoadTestRunCreateOrUpdateAppComponentsDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Associate an app component (collection of azure resources) to a test run */
export interface LoadTestRunCreateOrUpdateAppComponentsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders &
    LoadTestRunCreateOrUpdateAppComponentsDefaultHeaders;
}

/** Get associated app component (collection of azure resources) for the given test run. */
export interface LoadTestRunGetAppComponents200Response extends HttpResponse {
  status: "200";
  body: TestRunAppComponentsOutput;
}

export interface LoadTestRunGetAppComponentsDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get associated app component (collection of azure resources) for the given test run. */
export interface LoadTestRunGetAppComponentsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & LoadTestRunGetAppComponentsDefaultHeaders;
}

/** Configure server metrics for a test run */
export interface LoadTestRunCreateOrUpdateServerMetricsConfig200Response
  extends HttpResponse {
  status: "200";
  body: TestRunServerMetricConfigOutput;
}

/** Configure server metrics for a test run */
export interface LoadTestRunCreateOrUpdateServerMetricsConfig201Response
  extends HttpResponse {
  status: "201";
  body: TestRunServerMetricConfigOutput;
}

export interface LoadTestRunCreateOrUpdateServerMetricsConfigDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Configure server metrics for a test run */
export interface LoadTestRunCreateOrUpdateServerMetricsConfigDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders &
    LoadTestRunCreateOrUpdateServerMetricsConfigDefaultHeaders;
}

/** List server metrics configuration for the given test run. */
export interface LoadTestRunGetServerMetricsConfig200Response
  extends HttpResponse {
  status: "200";
  body: TestRunServerMetricConfigOutput;
}

export interface LoadTestRunGetServerMetricsConfigDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** List server metrics configuration for the given test run. */
export interface LoadTestRunGetServerMetricsConfigDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & LoadTestRunGetServerMetricsConfigDefaultHeaders;
}
