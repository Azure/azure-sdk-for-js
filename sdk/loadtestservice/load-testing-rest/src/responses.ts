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
  ResponseOutput,
  TestRunAppComponentsOutput,
  TestRunServerMetricConfigOutput
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

export interface LoadTestAdministrationCreateOrUpdateTestdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Create a new test or update an existing test. */
export interface LoadTestAdministrationCreateOrUpdateTestdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders &
    LoadTestAdministrationCreateOrUpdateTestdefaultHeaders;
}

/** Delete a test by its name. */
export interface LoadTestAdministrationDeleteTest204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface LoadTestAdministrationDeleteTestdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Delete a test by its name. */
export interface LoadTestAdministrationDeleteTestdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & LoadTestAdministrationDeleteTestdefaultHeaders;
}

/** Get load test details by test name */
export interface LoadTestAdministrationGetTest200Response extends HttpResponse {
  status: "200";
  body: TestOutput;
}

export interface LoadTestAdministrationGetTestdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get load test details by test name */
export interface LoadTestAdministrationGetTestdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & LoadTestAdministrationGetTestdefaultHeaders;
}

/** Get all load tests by the fully qualified resource Id e.g subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}. */
export interface LoadTestAdministrationListTests200Response
  extends HttpResponse {
  status: "200";
  body: TestsListOutput;
}

export interface LoadTestAdministrationListTestsdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get all load tests by the fully qualified resource Id e.g subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}. */
export interface LoadTestAdministrationListTestsdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & LoadTestAdministrationListTestsdefaultHeaders;
}

/** Upload input file for a given test name. File size can't be more than 50 MB. Existing file with same name for the given test will be overwritten. File should be provided in the request body as multipart/form-data. */
export interface LoadTestAdministrationUploadFile201Response
  extends HttpResponse {
  status: "201";
  body: FileInfoOutput;
}

export interface LoadTestAdministrationUploadFiledefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Upload input file for a given test name. File size can't be more than 50 MB. Existing file with same name for the given test will be overwritten. File should be provided in the request body as multipart/form-data. */
export interface LoadTestAdministrationUploadFiledefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & LoadTestAdministrationUploadFiledefaultHeaders;
}

/** Get test file by the file name. */
export interface LoadTestAdministrationGetFile200Response extends HttpResponse {
  status: "200";
  body: FileInfoOutput;
}

export interface LoadTestAdministrationGetFiledefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get test file by the file name. */
export interface LoadTestAdministrationGetFiledefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & LoadTestAdministrationGetFiledefaultHeaders;
}

/** Delete file by the file name for a test */
export interface LoadTestAdministrationDeleteFile204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface LoadTestAdministrationDeleteFiledefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Delete file by the file name for a test */
export interface LoadTestAdministrationDeleteFiledefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & LoadTestAdministrationDeleteFiledefaultHeaders;
}

/** Get all test files. */
export interface LoadTestAdministrationListFilesTest200Response
  extends HttpResponse {
  status: "200";
  body: FileInfoListOutput;
}

export interface LoadTestAdministrationListFilesTestdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get all test files. */
export interface LoadTestAdministrationListFilesTestdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & LoadTestAdministrationListFilesTestdefaultHeaders;
}

/** Associate an app component (collection of azure resources) to a test */
export interface LoadTestAdministrationCreateOrUpdateAppComponentTest200Response
  extends HttpResponse {
  status: "200";
  body: TestAppComponentsOutput;
}

/** Associate an app component (collection of azure resources) to a test */
export interface LoadTestAdministrationCreateOrUpdateAppComponentTest201Response
  extends HttpResponse {
  status: "201";
  body: TestAppComponentsOutput;
}

export interface LoadTestAdministrationCreateOrUpdateAppComponentTestdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Associate an app component (collection of azure resources) to a test */
export interface LoadTestAdministrationCreateOrUpdateAppComponentTestdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders &
    LoadTestAdministrationCreateOrUpdateAppComponentTestdefaultHeaders;
}

/** Get associated app component (collection of azure resources) for the given test. */
export interface LoadTestAdministrationGetAppComponentsTest200Response
  extends HttpResponse {
  status: "200";
  body: TestAppComponentsOutput;
}

export interface LoadTestAdministrationGetAppComponentsTestdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get associated app component (collection of azure resources) for the given test. */
export interface LoadTestAdministrationGetAppComponentsTestdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders &
    LoadTestAdministrationGetAppComponentsTestdefaultHeaders;
}

/** Configure server metrics for a test */
export interface LoadTestAdministrationCreateOrUpdateServerMetricsConfigTest200Response
  extends HttpResponse {
  status: "200";
  body: TestServerMetricConfigOutput;
}

/** Configure server metrics for a test */
export interface LoadTestAdministrationCreateOrUpdateServerMetricsConfigTest201Response
  extends HttpResponse {
  status: "201";
  body: TestServerMetricConfigOutput;
}

export interface LoadTestAdministrationCreateOrUpdateServerMetricsConfigTestdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Configure server metrics for a test */
export interface LoadTestAdministrationCreateOrUpdateServerMetricsConfigTestdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders &
    LoadTestAdministrationCreateOrUpdateServerMetricsConfigTestdefaultHeaders;
}

/** Get server metric configuration for the given test. */
export interface LoadTestAdministrationGetServerMetricsConfigTest200Response
  extends HttpResponse {
  status: "200";
  body: TestServerMetricConfigOutput;
}

export interface LoadTestAdministrationGetServerMetricsConfigTestdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get server metric configuration for the given test. */
export interface LoadTestAdministrationGetServerMetricsConfigTestdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders &
    LoadTestAdministrationGetServerMetricsConfigTestdefaultHeaders;
}

/** Delete a test run by its name. */
export interface TestRunDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface TestRunDeletedefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Delete a test run by its name. */
export interface TestRunDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunDeletedefaultHeaders;
}

/** Create and start a new test run with the given name. */
export interface TestRunCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: TestRunOutput;
}

export interface TestRunCreateOrUpdatedefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Create and start a new test run with the given name. */
export interface TestRunCreateOrUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunCreateOrUpdatedefaultHeaders;
}

/** Get test run details by name. */
export interface TestRunGet200Response extends HttpResponse {
  status: "200";
  body: TestRunOutput;
}

export interface TestRunGetdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get test run details by name. */
export interface TestRunGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunGetdefaultHeaders;
}

/** Get test run file by file name. */
export interface TestRunGetFile200Response extends HttpResponse {
  status: "200";
  body: FileInfoOutput;
}

export interface TestRunGetFiledefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get test run file by file name. */
export interface TestRunGetFiledefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunGetFiledefaultHeaders;
}

/** Get all test runs with given filters */
export interface TestRunList200Response extends HttpResponse {
  status: "200";
  body: TestRunsListOutput;
}

export interface TestRunListdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get all test runs with given filters */
export interface TestRunListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunListdefaultHeaders;
}

/** Stop test run by name. */
export interface TestRunStop200Response extends HttpResponse {
  status: "200";
  body: TestRunOutput;
}

export interface TestRunStopdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Stop test run by name. */
export interface TestRunStopdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunStopdefaultHeaders;
}

/** Lists the metric namespaces for a load test run. */
export interface TestRunListMetricNamespaces200Response extends HttpResponse {
  status: "200";
  body: MetricNamespaceCollectionOutput;
}

export interface TestRunListMetricNamespacesdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists the metric namespaces for a load test run. */
export interface TestRunListMetricNamespacesdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunListMetricNamespacesdefaultHeaders;
}

/** Lists the metric definitions for a load test run. */
export interface TestRunListMetricDefinitions200Response extends HttpResponse {
  status: "200";
  body: MetricDefinitionCollectionOutput;
}

export interface TestRunListMetricDefinitionsdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists the metric definitions for a load test run. */
export interface TestRunListMetricDefinitionsdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunListMetricDefinitionsdefaultHeaders;
}

/** Lists the metric values for a load test run. */
export interface TestRunGetMetrics200Response extends HttpResponse {
  status: "200";
  body: ResponseOutput;
}

export interface TestRunGetMetricsdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists the metric values for a load test run. */
export interface TestRunGetMetricsdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunGetMetricsdefaultHeaders;
}

/** Associate an app component (collection of azure resources) to a test run */
export interface TestRunCreateOrUpdateAppComponent200Response
  extends HttpResponse {
  status: "200";
  body: TestRunAppComponentsOutput;
}

/** Associate an app component (collection of azure resources) to a test run */
export interface TestRunCreateOrUpdateAppComponent201Response
  extends HttpResponse {
  status: "201";
  body: TestRunAppComponentsOutput;
}

export interface TestRunCreateOrUpdateAppComponentdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Associate an app component (collection of azure resources) to a test run */
export interface TestRunCreateOrUpdateAppComponentdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunCreateOrUpdateAppComponentdefaultHeaders;
}

/** Get associated app component (collection of azure resources) for the given test run. */
export interface TestRunGetAppComponents200Response extends HttpResponse {
  status: "200";
  body: TestRunAppComponentsOutput;
}

export interface TestRunGetAppComponentsdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get associated app component (collection of azure resources) for the given test run. */
export interface TestRunGetAppComponentsdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunGetAppComponentsdefaultHeaders;
}

/** Configure server metrics for a test run */
export interface TestRunCreateOrUpdateServerMetricsConfig200Response
  extends HttpResponse {
  status: "200";
  body: TestRunServerMetricConfigOutput;
}

/** Configure server metrics for a test run */
export interface TestRunCreateOrUpdateServerMetricsConfig201Response
  extends HttpResponse {
  status: "201";
  body: TestRunServerMetricConfigOutput;
}

export interface TestRunCreateOrUpdateServerMetricsConfigdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Configure server metrics for a test run */
export interface TestRunCreateOrUpdateServerMetricsConfigdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders &
    TestRunCreateOrUpdateServerMetricsConfigdefaultHeaders;
}

/** Get server metric configuration for the given test run. */
export interface TestRunGetServerMetricsConfig200Response extends HttpResponse {
  status: "200";
  body: TestRunServerMetricConfigOutput;
}

export interface TestRunGetServerMetricsConfigdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get server metric configuration for the given test run. */
export interface TestRunGetServerMetricsConfigdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunGetServerMetricsConfigdefaultHeaders;
}
