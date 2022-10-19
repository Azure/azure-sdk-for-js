// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  AppComponentsMapOutput,
  ErrorResponseBodyOutput,
  ServerMetricsModelOutput,
  DefaultServerMetricsConfigListModelOutput,
  SupportedResourceTypeOutput,
  TestModelOutput,
  TestModelResourceListOutput,
  FileUrlOutput,
  FileUrlListOutput,
  TestRunModelOutput,
  TestRunModelResourceListOutput,
  ClientMetricsResultsOutput,
  ClientMetricsFiltersOutput,
} from "./outputModels";

/** Associate an App Component (Azure resource) to a test or test run. */
export interface AppComponentCreateOrUpdateAppComponents200Response extends HttpResponse {
  status: "200";
  body: AppComponentsMapOutput;
}

/** Associate an App Component (Azure resource) to a test or test run. */
export interface AppComponentCreateOrUpdateAppComponents201Response extends HttpResponse {
  status: "201";
  body: AppComponentsMapOutput;
}

export interface AppComponentCreateOrUpdateAppComponentsdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Associate an App Component (Azure resource) to a test or test run. */
export interface AppComponentCreateOrUpdateAppComponentsdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & AppComponentCreateOrUpdateAppComponentsdefaultHeaders;
}

/** Delete an App Component. */
export interface AppComponentDeleteAppComponents204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface AppComponentDeleteAppComponentsdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Delete an App Component. */
export interface AppComponentDeleteAppComponentsdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & AppComponentDeleteAppComponentsdefaultHeaders;
}

/** Get App Component details by App Component name. */
export interface AppComponentGetAppComponentByName200Response extends HttpResponse {
  status: "200";
  body: AppComponentsMapOutput;
}

export interface AppComponentGetAppComponentByNamedefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get App Component details by App Component name. */
export interface AppComponentGetAppComponentByNamedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & AppComponentGetAppComponentByNamedefaultHeaders;
}

/** Get App Components for a test or a test run by its name. */
export interface AppComponentGetAppComponent200Response extends HttpResponse {
  status: "200";
  body: AppComponentsMapOutput;
}

export interface AppComponentGetAppComponentdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get App Components for a test or a test run by its name. */
export interface AppComponentGetAppComponentdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & AppComponentGetAppComponentdefaultHeaders;
}

/** Configure server metrics for a test or test run */
export interface ServerMetricsCreateOrUpdateServerMetricsConfig200Response extends HttpResponse {
  status: "200";
  body: ServerMetricsModelOutput;
}

/** Configure server metrics for a test or test run */
export interface ServerMetricsCreateOrUpdateServerMetricsConfig201Response extends HttpResponse {
  status: "201";
  body: ServerMetricsModelOutput;
}

export interface ServerMetricsCreateOrUpdateServerMetricsConfigdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Configure server metrics for a test or test run */
export interface ServerMetricsCreateOrUpdateServerMetricsConfigdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & ServerMetricsCreateOrUpdateServerMetricsConfigdefaultHeaders;
}

/** Get server metrics configuration by its name. */
export interface ServerMetricsGetServerMetricsConfigByName200Response extends HttpResponse {
  status: "200";
  body: ServerMetricsModelOutput;
}

export interface ServerMetricsGetServerMetricsConfigByNamedefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get server metrics configuration by its name. */
export interface ServerMetricsGetServerMetricsConfigByNamedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & ServerMetricsGetServerMetricsConfigByNamedefaultHeaders;
}

/** Delete server metrics configuration by its name */
export interface ServerMetricsDeleteServerMetricsConfig204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface ServerMetricsDeleteServerMetricsConfigdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Delete server metrics configuration by its name */
export interface ServerMetricsDeleteServerMetricsConfigdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & ServerMetricsDeleteServerMetricsConfigdefaultHeaders;
}

/** Get server metrics configuration for a test or test run by its name. */
export interface ServerMetricsGetServerMetricsConfig200Response extends HttpResponse {
  status: "200";
  body: ServerMetricsModelOutput;
}

export interface ServerMetricsGetServerMetricsConfigdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get server metrics configuration for a test or test run by its name. */
export interface ServerMetricsGetServerMetricsConfigdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & ServerMetricsGetServerMetricsConfigdefaultHeaders;
}

/** Get all default server metrics configuration for supported resource types. */
export interface ServerMetricsGetServerDefaultMetricsConfig200Response extends HttpResponse {
  status: "200";
  body: DefaultServerMetricsConfigListModelOutput;
}

export interface ServerMetricsGetServerDefaultMetricsConfigdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get all default server metrics configuration for supported resource types. */
export interface ServerMetricsGetServerDefaultMetricsConfigdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & ServerMetricsGetServerDefaultMetricsConfigdefaultHeaders;
}

/** Get all supported resource types for App Components(Azure resource types). */
export interface ServerMetricsListSupportedResourceTypes200Response extends HttpResponse {
  status: "200";
  body: SupportedResourceTypeOutput;
}

export interface ServerMetricsListSupportedResourceTypesdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get all supported resource types for App Components(Azure resource types). */
export interface ServerMetricsListSupportedResourceTypesdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & ServerMetricsListSupportedResourceTypesdefaultHeaders;
}

/** Create a new test or Update an existing test. */
export interface TestCreateOrUpdateTest200Response extends HttpResponse {
  status: "200";
  body: TestModelOutput;
}

/** Create a new test or Update an existing test. */
export interface TestCreateOrUpdateTest201Response extends HttpResponse {
  status: "201";
  body: TestModelOutput;
}

export interface TestCreateOrUpdateTestdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Create a new test or Update an existing test. */
export interface TestCreateOrUpdateTestdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestCreateOrUpdateTestdefaultHeaders;
}

/** Delete a test by its name. */
export interface TestDeleteLoadTest204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface TestDeleteLoadTestdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Delete a test by its name. */
export interface TestDeleteLoadTestdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestDeleteLoadTestdefaultHeaders;
}

/** Get load test details by test name */
export interface TestGetLoadTest200Response extends HttpResponse {
  status: "200";
  body: TestModelOutput;
}

export interface TestGetLoadTestdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get load test details by test name */
export interface TestGetLoadTestdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestGetLoadTestdefaultHeaders;
}

/** Get all load tests by the fully qualified resource Id e.g subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}. */
export interface TestListLoadTestSearch200Response extends HttpResponse {
  status: "200";
  body: TestModelResourceListOutput;
}

export interface TestListLoadTestSearchdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get all load tests by the fully qualified resource Id e.g subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}. */
export interface TestListLoadTestSearchdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestListLoadTestSearchdefaultHeaders;
}

/** Upload input file for a given test name. File size can't be more than 50 MB. Existing file with same name for the given test will be overwritten. File should be provided in the request body as multipart/form-data. */
export interface TestUploadTestFile201Response extends HttpResponse {
  status: "201";
  body: FileUrlOutput;
}

export interface TestUploadTestFiledefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Upload input file for a given test name. File size can't be more than 50 MB. Existing file with same name for the given test will be overwritten. File should be provided in the request body as multipart/form-data. */
export interface TestUploadTestFiledefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestUploadTestFiledefaultHeaders;
}

/** Get test file by the file name. */
export interface TestGetTestFile200Response extends HttpResponse {
  status: "200";
  body: FileUrlOutput;
}

export interface TestGetTestFiledefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get test file by the file name. */
export interface TestGetTestFiledefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestGetTestFiledefaultHeaders;
}

/** Delete file by the file name for a test. */
export interface TestDeleteTestFile204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface TestDeleteTestFiledefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Delete file by the file name for a test. */
export interface TestDeleteTestFiledefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestDeleteTestFiledefaultHeaders;
}

/** Get all test files. */
export interface TestListTestFiles200Response extends HttpResponse {
  status: "200";
  body: FileUrlListOutput;
}

export interface TestListTestFilesdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get all test files. */
export interface TestListTestFilesdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestListTestFilesdefaultHeaders;
}

/** Delete a test run by its name. */
export interface TestRunDeleteTestRun204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface TestRunDeleteTestRundefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Delete a test run by its name. */
export interface TestRunDeleteTestRundefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunDeleteTestRundefaultHeaders;
}

/** Create and start a new test run with the given name. */
export interface TestRunCreateOrUpdateTestRun200Response extends HttpResponse {
  status: "200";
  body: TestRunModelOutput;
}

export interface TestRunCreateOrUpdateTestRundefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Create and start a new test run with the given name. */
export interface TestRunCreateOrUpdateTestRundefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunCreateOrUpdateTestRundefaultHeaders;
}

/** Get test run details by name. */
export interface TestRunGetTestRun200Response extends HttpResponse {
  status: "200";
  body: TestRunModelOutput;
}

export interface TestRunGetTestRundefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get test run details by name. */
export interface TestRunGetTestRundefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunGetTestRundefaultHeaders;
}

/** Get test run file by file name. */
export interface TestRunGetTestRunFile200Response extends HttpResponse {
  status: "200";
  body: FileUrlOutput;
}

export interface TestRunGetTestRunFiledefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get test run file by file name. */
export interface TestRunGetTestRunFiledefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunGetTestRunFiledefaultHeaders;
}

/** Get all test runs with given filters */
export interface TestRunListTestRuns200Response extends HttpResponse {
  status: "200";
  body: TestRunModelResourceListOutput;
}

export interface TestRunListTestRunsdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get all test runs with given filters */
export interface TestRunListTestRunsdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunListTestRunsdefaultHeaders;
}

/** Stop test run by name. */
export interface TestRunStopTestRun200Response extends HttpResponse {
  status: "200";
  body: TestRunModelOutput;
}

export interface TestRunStopTestRundefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Stop test run by name. */
export interface TestRunStopTestRundefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunStopTestRundefaultHeaders;
}

/** Get all client metrics for a load test run. */
export interface TestRunGetTestRunClientMetrics200Response extends HttpResponse {
  status: "200";
  body: ClientMetricsResultsOutput;
}

export interface TestRunGetTestRunClientMetricsdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get all client metrics for a load test run. */
export interface TestRunGetTestRunClientMetricsdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunGetTestRunClientMetricsdefaultHeaders;
}

/** Get all filters that are supported for client metrics for a given load test run */
export interface TestRunGetTestRunClientMetricsFilters200Response extends HttpResponse {
  status: "200";
  body: ClientMetricsFiltersOutput;
}

export interface TestRunGetTestRunClientMetricsFiltersdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get all filters that are supported for client metrics for a given load test run */
export interface TestRunGetTestRunClientMetricsFiltersdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseBodyOutput;
  headers: RawHttpHeaders & TestRunGetTestRunClientMetricsFiltersdefaultHeaders;
}
