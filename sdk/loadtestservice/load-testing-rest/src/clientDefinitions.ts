// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  LoadTestAdministrationCreateOrUpdateTestParameters,
  LoadTestAdministrationDeleteTestParameters,
  LoadTestAdministrationGetTestParameters,
  LoadTestAdministrationListTestsParameters,
  LoadTestAdministrationUploadFileParameters,
  LoadTestAdministrationGetFileParameters,
  LoadTestAdministrationDeleteFileParameters,
  LoadTestAdministrationListFilesTestParameters,
  LoadTestAdministrationCreateOrUpdateAppComponentTestParameters,
  LoadTestAdministrationGetAppComponentsTestParameters,
  LoadTestAdministrationCreateOrUpdateServerMetricsConfigTestParameters,
  LoadTestAdministrationGetServerMetricsConfigTestParameters,
  TestRunDeleteParameters,
  TestRunCreateOrUpdateParameters,
  TestRunGetParameters,
  TestRunGetFileParameters,
  TestRunListParameters,
  TestRunStopParameters,
  TestRunListMetricNamespacesParameters,
  TestRunListMetricDefinitionsParameters,
  TestRunGetMetricsParameters,
  TestRunCreateOrUpdateAppComponentParameters,
  TestRunGetAppComponentsParameters,
  TestRunCreateOrUpdateServerMetricsConfigParameters,
  TestRunGetServerMetricsConfigParameters
} from "./parameters";
import {
  LoadTestAdministrationCreateOrUpdateTest200Response,
  LoadTestAdministrationCreateOrUpdateTest201Response,
  LoadTestAdministrationCreateOrUpdateTestdefaultResponse,
  LoadTestAdministrationDeleteTest204Response,
  LoadTestAdministrationDeleteTestdefaultResponse,
  LoadTestAdministrationGetTest200Response,
  LoadTestAdministrationGetTestdefaultResponse,
  LoadTestAdministrationListTests200Response,
  LoadTestAdministrationListTestsdefaultResponse,
  LoadTestAdministrationUploadFile201Response,
  LoadTestAdministrationUploadFiledefaultResponse,
  LoadTestAdministrationGetFile200Response,
  LoadTestAdministrationGetFiledefaultResponse,
  LoadTestAdministrationDeleteFile204Response,
  LoadTestAdministrationDeleteFiledefaultResponse,
  LoadTestAdministrationListFilesTest200Response,
  LoadTestAdministrationListFilesTestdefaultResponse,
  LoadTestAdministrationCreateOrUpdateAppComponentTest200Response,
  LoadTestAdministrationCreateOrUpdateAppComponentTest201Response,
  LoadTestAdministrationCreateOrUpdateAppComponentTestdefaultResponse,
  LoadTestAdministrationGetAppComponentsTest200Response,
  LoadTestAdministrationGetAppComponentsTestdefaultResponse,
  LoadTestAdministrationCreateOrUpdateServerMetricsConfigTest200Response,
  LoadTestAdministrationCreateOrUpdateServerMetricsConfigTest201Response,
  LoadTestAdministrationCreateOrUpdateServerMetricsConfigTestdefaultResponse,
  LoadTestAdministrationGetServerMetricsConfigTest200Response,
  LoadTestAdministrationGetServerMetricsConfigTestdefaultResponse,
  TestRunDelete204Response,
  TestRunDeletedefaultResponse,
  TestRunCreateOrUpdate200Response,
  TestRunCreateOrUpdatedefaultResponse,
  TestRunGet200Response,
  TestRunGetdefaultResponse,
  TestRunGetFile200Response,
  TestRunGetFiledefaultResponse,
  TestRunList200Response,
  TestRunListdefaultResponse,
  TestRunStop200Response,
  TestRunStopdefaultResponse,
  TestRunListMetricNamespaces200Response,
  TestRunListMetricNamespacesdefaultResponse,
  TestRunListMetricDefinitions200Response,
  TestRunListMetricDefinitionsdefaultResponse,
  TestRunGetMetrics200Response,
  TestRunGetMetricsdefaultResponse,
  TestRunCreateOrUpdateAppComponent200Response,
  TestRunCreateOrUpdateAppComponent201Response,
  TestRunCreateOrUpdateAppComponentdefaultResponse,
  TestRunGetAppComponents200Response,
  TestRunGetAppComponentsdefaultResponse,
  TestRunCreateOrUpdateServerMetricsConfig200Response,
  TestRunCreateOrUpdateServerMetricsConfig201Response,
  TestRunCreateOrUpdateServerMetricsConfigdefaultResponse,
  TestRunGetServerMetricsConfig200Response,
  TestRunGetServerMetricsConfigdefaultResponse
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface LoadTestAdministrationCreateOrUpdateTest {
  /** Create a new test or update an existing test. */
  patch(
    options: LoadTestAdministrationCreateOrUpdateTestParameters
  ): StreamableMethod<
    | LoadTestAdministrationCreateOrUpdateTest200Response
    | LoadTestAdministrationCreateOrUpdateTest201Response
    | LoadTestAdministrationCreateOrUpdateTestdefaultResponse
  >;
  /** Delete a test by its name. */
  delete(
    options?: LoadTestAdministrationDeleteTestParameters
  ): StreamableMethod<
    | LoadTestAdministrationDeleteTest204Response
    | LoadTestAdministrationDeleteTestdefaultResponse
  >;
  /** Get load test details by test name */
  get(
    options?: LoadTestAdministrationGetTestParameters
  ): StreamableMethod<
    | LoadTestAdministrationGetTest200Response
    | LoadTestAdministrationGetTestdefaultResponse
  >;
}

export interface LoadTestAdministrationListTests {
  /** Get all load tests by the fully qualified resource Id e.g subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}. */
  get(
    options?: LoadTestAdministrationListTestsParameters
  ): StreamableMethod<
    | LoadTestAdministrationListTests200Response
    | LoadTestAdministrationListTestsdefaultResponse
  >;
}

export interface LoadTestAdministrationUploadFile {
  /** Upload input file for a given test name. File size can't be more than 50 MB. Existing file with same name for the given test will be overwritten. File should be provided in the request body as multipart/form-data. */
  put(
    options: LoadTestAdministrationUploadFileParameters
  ): StreamableMethod<
    | LoadTestAdministrationUploadFile201Response
    | LoadTestAdministrationUploadFiledefaultResponse
  >;
  /** Get test file by the file name. */
  get(
    options?: LoadTestAdministrationGetFileParameters
  ): StreamableMethod<
    | LoadTestAdministrationGetFile200Response
    | LoadTestAdministrationGetFiledefaultResponse
  >;
  /** Delete file by the file name for a test */
  delete(
    options?: LoadTestAdministrationDeleteFileParameters
  ): StreamableMethod<
    | LoadTestAdministrationDeleteFile204Response
    | LoadTestAdministrationDeleteFiledefaultResponse
  >;
}

export interface LoadTestAdministrationListFilesTest {
  /** Get all test files. */
  get(
    options?: LoadTestAdministrationListFilesTestParameters
  ): StreamableMethod<
    | LoadTestAdministrationListFilesTest200Response
    | LoadTestAdministrationListFilesTestdefaultResponse
  >;
}

export interface LoadTestAdministrationCreateOrUpdateAppComponentTest {
  /** Associate an app component (collection of azure resources) to a test */
  patch(
    options: LoadTestAdministrationCreateOrUpdateAppComponentTestParameters
  ): StreamableMethod<
    | LoadTestAdministrationCreateOrUpdateAppComponentTest200Response
    | LoadTestAdministrationCreateOrUpdateAppComponentTest201Response
    | LoadTestAdministrationCreateOrUpdateAppComponentTestdefaultResponse
  >;
  /** Get associated app component (collection of azure resources) for the given test. */
  get(
    options?: LoadTestAdministrationGetAppComponentsTestParameters
  ): StreamableMethod<
    | LoadTestAdministrationGetAppComponentsTest200Response
    | LoadTestAdministrationGetAppComponentsTestdefaultResponse
  >;
}

export interface LoadTestAdministrationCreateOrUpdateServerMetricsConfigTest {
  /** Configure server metrics for a test */
  patch(
    options: LoadTestAdministrationCreateOrUpdateServerMetricsConfigTestParameters
  ): StreamableMethod<
    | LoadTestAdministrationCreateOrUpdateServerMetricsConfigTest200Response
    | LoadTestAdministrationCreateOrUpdateServerMetricsConfigTest201Response
    | LoadTestAdministrationCreateOrUpdateServerMetricsConfigTestdefaultResponse
  >;
  /** Get server metric configuration for the given test. */
  get(
    options?: LoadTestAdministrationGetServerMetricsConfigTestParameters
  ): StreamableMethod<
    | LoadTestAdministrationGetServerMetricsConfigTest200Response
    | LoadTestAdministrationGetServerMetricsConfigTestdefaultResponse
  >;
}

export interface TestRunDelete {
  /** Delete a test run by its name. */
  delete(
    options?: TestRunDeleteParameters
  ): StreamableMethod<TestRunDelete204Response | TestRunDeletedefaultResponse>;
  /** Create and start a new test run with the given name. */
  patch(
    options: TestRunCreateOrUpdateParameters
  ): StreamableMethod<
    TestRunCreateOrUpdate200Response | TestRunCreateOrUpdatedefaultResponse
  >;
  /** Get test run details by name. */
  get(
    options?: TestRunGetParameters
  ): StreamableMethod<TestRunGet200Response | TestRunGetdefaultResponse>;
}

export interface TestRunGetFile {
  /** Get test run file by file name. */
  get(
    options?: TestRunGetFileParameters
  ): StreamableMethod<
    TestRunGetFile200Response | TestRunGetFiledefaultResponse
  >;
}

export interface TestRunList {
  /** Get all test runs with given filters */
  get(
    options?: TestRunListParameters
  ): StreamableMethod<TestRunList200Response | TestRunListdefaultResponse>;
}

export interface TestRunStop {
  /** Stop test run by name. */
  post(
    options?: TestRunStopParameters
  ): StreamableMethod<TestRunStop200Response | TestRunStopdefaultResponse>;
}

export interface TestRunListMetricNamespaces {
  /** Lists the metric namespaces for a load test run. */
  get(
    options?: TestRunListMetricNamespacesParameters
  ): StreamableMethod<
    | TestRunListMetricNamespaces200Response
    | TestRunListMetricNamespacesdefaultResponse
  >;
}

export interface TestRunListMetricDefinitions {
  /** Lists the metric definitions for a load test run. */
  get(
    options: TestRunListMetricDefinitionsParameters
  ): StreamableMethod<
    | TestRunListMetricDefinitions200Response
    | TestRunListMetricDefinitionsdefaultResponse
  >;
}

export interface TestRunGetMetrics {
  /** Lists the metric values for a load test run. */
  post(
    options: TestRunGetMetricsParameters
  ): StreamableMethod<
    TestRunGetMetrics200Response | TestRunGetMetricsdefaultResponse
  >;
}

export interface TestRunCreateOrUpdateAppComponent {
  /** Associate an app component (collection of azure resources) to a test run */
  patch(
    options: TestRunCreateOrUpdateAppComponentParameters
  ): StreamableMethod<
    | TestRunCreateOrUpdateAppComponent200Response
    | TestRunCreateOrUpdateAppComponent201Response
    | TestRunCreateOrUpdateAppComponentdefaultResponse
  >;
  /** Get associated app component (collection of azure resources) for the given test run. */
  get(
    options?: TestRunGetAppComponentsParameters
  ): StreamableMethod<
    TestRunGetAppComponents200Response | TestRunGetAppComponentsdefaultResponse
  >;
}

export interface TestRunCreateOrUpdateServerMetricsConfig {
  /** Configure server metrics for a test run */
  patch(
    options: TestRunCreateOrUpdateServerMetricsConfigParameters
  ): StreamableMethod<
    | TestRunCreateOrUpdateServerMetricsConfig200Response
    | TestRunCreateOrUpdateServerMetricsConfig201Response
    | TestRunCreateOrUpdateServerMetricsConfigdefaultResponse
  >;
  /** Get server metric configuration for the given test run. */
  get(
    options?: TestRunGetServerMetricsConfigParameters
  ): StreamableMethod<
    | TestRunGetServerMetricsConfig200Response
    | TestRunGetServerMetricsConfigdefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/tests/\{testId\}' has methods for the following verbs: patch, delete, get */
  (
    path: "/tests/{testId}",
    testId: string
  ): LoadTestAdministrationCreateOrUpdateTest;
  /** Resource for '/tests' has methods for the following verbs: get */
  (path: "/tests"): LoadTestAdministrationListTests;
  /** Resource for '/tests/\{testId\}/files/\{fileId\}' has methods for the following verbs: put, get, delete */
  (
    path: "/tests/{testId}/files/{fileId}",
    testId: string,
    fileId: string
  ): LoadTestAdministrationUploadFile;
  /** Resource for '/tests/\{testId\}/files' has methods for the following verbs: get */
  (
    path: "/tests/{testId}/files",
    testId: string
  ): LoadTestAdministrationListFilesTest;
  /** Resource for '/tests/\{testId\}/app-components' has methods for the following verbs: patch, get */
  (
    path: "/tests/{testId}/app-components",
    testId: string
  ): LoadTestAdministrationCreateOrUpdateAppComponentTest;
  /** Resource for '/tests/\{testId\}/server-metric-configs' has methods for the following verbs: patch, get */
  (
    path: "/tests/{testId}/server-metric-configs",
    testId: string
  ): LoadTestAdministrationCreateOrUpdateServerMetricsConfigTest;
  /** Resource for '/test-runs/\{testRunId\}' has methods for the following verbs: delete, patch, get */
  (path: "/test-runs/{testRunId}", testRunId: string): TestRunDelete;
  /** Resource for '/test-runs/\{testRunId\}/files/\{fileId\}' has methods for the following verbs: get */
  (
    path: "/test-runs/{testRunId}/files/{fileId}",
    testRunId: string,
    fileId: string
  ): TestRunGetFile;
  /** Resource for '/test-runs' has methods for the following verbs: get */
  (path: "/test-runs"): TestRunList;
  /** Resource for '/test-runs/\{testRunId\}:stop' has methods for the following verbs: post */
  (path: "/test-runs/{testRunId}:stop", testRunId: string): TestRunStop;
  /** Resource for '/test-runs/\{testRunId\}/metric-namespaces' has methods for the following verbs: get */
  (
    path: "/test-runs/{testRunId}/metric-namespaces",
    testRunId: string
  ): TestRunListMetricNamespaces;
  /** Resource for '/test-runs/\{testRunId\}/metric-definitions' has methods for the following verbs: get */
  (
    path: "/test-runs/{testRunId}/metric-definitions",
    testRunId: string
  ): TestRunListMetricDefinitions;
  /** Resource for '/test-runs/\{testRunId\}/metrics' has methods for the following verbs: post */
  (
    path: "/test-runs/{testRunId}/metrics",
    testRunId: string
  ): TestRunGetMetrics;
  /** Resource for '/test-runs/\{testRunId\}/app-components' has methods for the following verbs: patch, get */
  (
    path: "/test-runs/{testRunId}/app-components",
    testRunId: string
  ): TestRunCreateOrUpdateAppComponent;
  /** Resource for '/test-runs/\{testRunId\}/server-metric-configs' has methods for the following verbs: patch, get */
  (
    path: "/test-runs/{testRunId}/server-metric-configs",
    testRunId: string
  ): TestRunCreateOrUpdateServerMetricsConfig;
}

export type AzureLoadTestingClient = Client & {
  path: Routes;
};
