// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  LoadTestAdministrationOperationsCreateOrUpdateTestParameters,
  LoadTestAdministrationOperationsDeleteTestParameters,
  LoadTestAdministrationOperationsGetTestParameters,
  LoadTestAdministrationOperationsListTestsParameters,
  LoadTestAdministrationOperationsUploadTestFileParameters,
  LoadTestAdministrationOperationsGetTestFileParameters,
  LoadTestAdministrationOperationsDeleteTestFileParameters,
  LoadTestAdministrationOperationsListTestFilesParameters,
  LoadTestAdministrationOperationsCreateOrUpdateAppComponentsParameters,
  LoadTestAdministrationOperationsGetAppComponentsParameters,
  LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfigParameters,
  LoadTestAdministrationOperationsGetServerMetricsConfigParameters,
  LoadTestRunOperationsGetTestRunParameters,
  LoadTestRunOperationsCreateOrUpdateTestRunParameters,
  LoadTestRunOperationsDeleteTestRunParameters,
  LoadTestRunOperationsGetTestRunFileParameters,
  LoadTestRunOperationsListTestRunsParameters,
  LoadTestRunOperationsStopTestRunParameters,
  LoadTestRunOperationsListMetricNamespacesParameters,
  LoadTestRunOperationsListMetricDefinitionsParameters,
  LoadTestRunOperationsListMetricsParameters,
  LoadTestRunOperationsCreateOrUpdateAppComponentsParameters,
  LoadTestRunOperationsGetAppComponentsParameters,
  LoadTestRunOperationsCreateOrUpdateServerMetricsConfigParameters,
  LoadTestRunOperationsGetServerMetricsConfigParameters,
} from "./parameters";
import {
  LoadTestAdministrationOperationsCreateOrUpdateTest200Response,
  LoadTestAdministrationOperationsCreateOrUpdateTest201Response,
  LoadTestAdministrationOperationsCreateOrUpdateTestDefaultResponse,
  LoadTestAdministrationOperationsDeleteTest204Response,
  LoadTestAdministrationOperationsDeleteTestDefaultResponse,
  LoadTestAdministrationOperationsGetTest200Response,
  LoadTestAdministrationOperationsGetTestDefaultResponse,
  LoadTestAdministrationOperationsListTests200Response,
  LoadTestAdministrationOperationsListTestsDefaultResponse,
  LoadTestAdministrationOperationsUploadTestFile201Response,
  LoadTestAdministrationOperationsUploadTestFileDefaultResponse,
  LoadTestAdministrationOperationsGetTestFile200Response,
  LoadTestAdministrationOperationsGetTestFileDefaultResponse,
  LoadTestAdministrationOperationsDeleteTestFile204Response,
  LoadTestAdministrationOperationsDeleteTestFileDefaultResponse,
  LoadTestAdministrationOperationsListTestFiles200Response,
  LoadTestAdministrationOperationsListTestFilesDefaultResponse,
  LoadTestAdministrationOperationsCreateOrUpdateAppComponents200Response,
  LoadTestAdministrationOperationsCreateOrUpdateAppComponents201Response,
  LoadTestAdministrationOperationsCreateOrUpdateAppComponentsDefaultResponse,
  LoadTestAdministrationOperationsGetAppComponents200Response,
  LoadTestAdministrationOperationsGetAppComponentsDefaultResponse,
  LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfig200Response,
  LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfig201Response,
  LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfigDefaultResponse,
  LoadTestAdministrationOperationsGetServerMetricsConfig200Response,
  LoadTestAdministrationOperationsGetServerMetricsConfigDefaultResponse,
  LoadTestRunOperationsGetTestRun200Response,
  LoadTestRunOperationsGetTestRunDefaultResponse,
  LoadTestRunOperationsCreateOrUpdateTestRun200Response,
  LoadTestRunOperationsCreateOrUpdateTestRun201Response,
  LoadTestRunOperationsCreateOrUpdateTestRunDefaultResponse,
  LoadTestRunOperationsDeleteTestRun204Response,
  LoadTestRunOperationsDeleteTestRunDefaultResponse,
  LoadTestRunOperationsGetTestRunFile200Response,
  LoadTestRunOperationsGetTestRunFileDefaultResponse,
  LoadTestRunOperationsListTestRuns200Response,
  LoadTestRunOperationsListTestRunsDefaultResponse,
  LoadTestRunOperationsStopTestRun200Response,
  LoadTestRunOperationsStopTestRunDefaultResponse,
  LoadTestRunOperationsListMetricNamespaces200Response,
  LoadTestRunOperationsListMetricNamespacesDefaultResponse,
  LoadTestRunOperationsListMetricDefinitions200Response,
  LoadTestRunOperationsListMetricDefinitionsDefaultResponse,
  LoadTestRunOperationsListMetrics200Response,
  LoadTestRunOperationsListMetricsDefaultResponse,
  LoadTestRunOperationsCreateOrUpdateAppComponents200Response,
  LoadTestRunOperationsCreateOrUpdateAppComponents201Response,
  LoadTestRunOperationsCreateOrUpdateAppComponentsDefaultResponse,
  LoadTestRunOperationsGetAppComponents200Response,
  LoadTestRunOperationsGetAppComponentsDefaultResponse,
  LoadTestRunOperationsCreateOrUpdateServerMetricsConfig200Response,
  LoadTestRunOperationsCreateOrUpdateServerMetricsConfig201Response,
  LoadTestRunOperationsCreateOrUpdateServerMetricsConfigDefaultResponse,
  LoadTestRunOperationsGetServerMetricsConfig200Response,
  LoadTestRunOperationsGetServerMetricsConfigDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface LoadTestAdministrationOperationsCreateOrUpdateTest {
  /** Create a new test or update an existing test. */
  patch(
    options: LoadTestAdministrationOperationsCreateOrUpdateTestParameters
  ): StreamableMethod<
    | LoadTestAdministrationOperationsCreateOrUpdateTest200Response
    | LoadTestAdministrationOperationsCreateOrUpdateTest201Response
    | LoadTestAdministrationOperationsCreateOrUpdateTestDefaultResponse
  >;
  /** Delete a test by its name. */
  delete(
    options?: LoadTestAdministrationOperationsDeleteTestParameters
  ): StreamableMethod<
    | LoadTestAdministrationOperationsDeleteTest204Response
    | LoadTestAdministrationOperationsDeleteTestDefaultResponse
  >;
  /** Get load test details by test name */
  get(
    options?: LoadTestAdministrationOperationsGetTestParameters
  ): StreamableMethod<
    | LoadTestAdministrationOperationsGetTest200Response
    | LoadTestAdministrationOperationsGetTestDefaultResponse
  >;
}

export interface LoadTestAdministrationOperationsListTests {
  /**
   * Get all load tests by the fully qualified resource Id e.g
   * subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}.
   */
  get(
    options?: LoadTestAdministrationOperationsListTestsParameters
  ): StreamableMethod<
    | LoadTestAdministrationOperationsListTests200Response
    | LoadTestAdministrationOperationsListTestsDefaultResponse
  >;
}

export interface LoadTestAdministrationOperationsUploadTestFile {
  /**
   * Upload input file for a given test name. File size can't be more than 50 MB.
   * Existing file with same name for the given test will be overwritten. File
   * should be provided in the request body as application/octet-stream.
   */
  put(
    options: LoadTestAdministrationOperationsUploadTestFileParameters
  ): StreamableMethod<
    | LoadTestAdministrationOperationsUploadTestFile201Response
    | LoadTestAdministrationOperationsUploadTestFileDefaultResponse
  >;
  /** Get test file by the file name. */
  get(
    options?: LoadTestAdministrationOperationsGetTestFileParameters
  ): StreamableMethod<
    | LoadTestAdministrationOperationsGetTestFile200Response
    | LoadTestAdministrationOperationsGetTestFileDefaultResponse
  >;
  /** Delete file by the file name for a test */
  delete(
    options?: LoadTestAdministrationOperationsDeleteTestFileParameters
  ): StreamableMethod<
    | LoadTestAdministrationOperationsDeleteTestFile204Response
    | LoadTestAdministrationOperationsDeleteTestFileDefaultResponse
  >;
}

export interface LoadTestAdministrationOperationsListTestFiles {
  /** Get all test files. */
  get(
    options?: LoadTestAdministrationOperationsListTestFilesParameters
  ): StreamableMethod<
    | LoadTestAdministrationOperationsListTestFiles200Response
    | LoadTestAdministrationOperationsListTestFilesDefaultResponse
  >;
}

export interface LoadTestAdministrationOperationsCreateOrUpdateAppComponents {
  /** Associate an app component (collection of azure resources) to a test */
  patch(
    options: LoadTestAdministrationOperationsCreateOrUpdateAppComponentsParameters
  ): StreamableMethod<
    | LoadTestAdministrationOperationsCreateOrUpdateAppComponents200Response
    | LoadTestAdministrationOperationsCreateOrUpdateAppComponents201Response
    | LoadTestAdministrationOperationsCreateOrUpdateAppComponentsDefaultResponse
  >;
  /** Get associated app component (collection of azure resources) for the given test. */
  get(
    options?: LoadTestAdministrationOperationsGetAppComponentsParameters
  ): StreamableMethod<
    | LoadTestAdministrationOperationsGetAppComponents200Response
    | LoadTestAdministrationOperationsGetAppComponentsDefaultResponse
  >;
}

export interface LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfig {
  /** Configure server metrics for a test */
  patch(
    options: LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfigParameters
  ): StreamableMethod<
    | LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfig200Response
    | LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfig201Response
    | LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfigDefaultResponse
  >;
  /** List server metrics configuration for the given test. */
  get(
    options?: LoadTestAdministrationOperationsGetServerMetricsConfigParameters
  ): StreamableMethod<
    | LoadTestAdministrationOperationsGetServerMetricsConfig200Response
    | LoadTestAdministrationOperationsGetServerMetricsConfigDefaultResponse
  >;
}

export interface LoadTestRunOperationsGetTestRun {
  /** Get test run details by name. */
  get(
    options?: LoadTestRunOperationsGetTestRunParameters
  ): StreamableMethod<
    LoadTestRunOperationsGetTestRun200Response | LoadTestRunOperationsGetTestRunDefaultResponse
  >;
  /** Create and start a new test run with the given name. */
  patch(
    options: LoadTestRunOperationsCreateOrUpdateTestRunParameters
  ): StreamableMethod<
    | LoadTestRunOperationsCreateOrUpdateTestRun200Response
    | LoadTestRunOperationsCreateOrUpdateTestRun201Response
    | LoadTestRunOperationsCreateOrUpdateTestRunDefaultResponse
  >;
  /** Delete a test run by its name. */
  delete(
    options?: LoadTestRunOperationsDeleteTestRunParameters
  ): StreamableMethod<
    | LoadTestRunOperationsDeleteTestRun204Response
    | LoadTestRunOperationsDeleteTestRunDefaultResponse
  >;
}

export interface LoadTestRunOperationsGetTestRunFile {
  /** Get test run file by file name. */
  get(
    options?: LoadTestRunOperationsGetTestRunFileParameters
  ): StreamableMethod<
    | LoadTestRunOperationsGetTestRunFile200Response
    | LoadTestRunOperationsGetTestRunFileDefaultResponse
  >;
}

export interface LoadTestRunOperationsListTestRuns {
  /** Get all test runs with given filters */
  get(
    options?: LoadTestRunOperationsListTestRunsParameters
  ): StreamableMethod<
    LoadTestRunOperationsListTestRuns200Response | LoadTestRunOperationsListTestRunsDefaultResponse
  >;
}

export interface LoadTestRunOperationsStopTestRun {
  /** Stop test run by name. */
  post(
    options?: LoadTestRunOperationsStopTestRunParameters
  ): StreamableMethod<
    LoadTestRunOperationsStopTestRun200Response | LoadTestRunOperationsStopTestRunDefaultResponse
  >;
}

export interface LoadTestRunOperationsListMetricNamespaces {
  /** List the metric namespaces for a load test run. */
  get(
    options?: LoadTestRunOperationsListMetricNamespacesParameters
  ): StreamableMethod<
    | LoadTestRunOperationsListMetricNamespaces200Response
    | LoadTestRunOperationsListMetricNamespacesDefaultResponse
  >;
}

export interface LoadTestRunOperationsListMetricDefinitions {
  /** List the metric definitions for a load test run. */
  get(
    options?: LoadTestRunOperationsListMetricDefinitionsParameters
  ): StreamableMethod<
    | LoadTestRunOperationsListMetricDefinitions200Response
    | LoadTestRunOperationsListMetricDefinitionsDefaultResponse
  >;
}

export interface LoadTestRunOperationsListMetrics {
  /** List the metric values for a load test run. */
  post(
    options: LoadTestRunOperationsListMetricsParameters
  ): StreamableMethod<
    LoadTestRunOperationsListMetrics200Response | LoadTestRunOperationsListMetricsDefaultResponse
  >;
}

export interface LoadTestRunOperationsCreateOrUpdateAppComponents {
  /** Associate an app component (collection of azure resources) to a test run */
  patch(
    options: LoadTestRunOperationsCreateOrUpdateAppComponentsParameters
  ): StreamableMethod<
    | LoadTestRunOperationsCreateOrUpdateAppComponents200Response
    | LoadTestRunOperationsCreateOrUpdateAppComponents201Response
    | LoadTestRunOperationsCreateOrUpdateAppComponentsDefaultResponse
  >;
  /**
   * Get associated app component (collection of azure resources) for the given test
   * run.
   */
  get(
    options?: LoadTestRunOperationsGetAppComponentsParameters
  ): StreamableMethod<
    | LoadTestRunOperationsGetAppComponents200Response
    | LoadTestRunOperationsGetAppComponentsDefaultResponse
  >;
}

export interface LoadTestRunOperationsCreateOrUpdateServerMetricsConfig {
  /** Configure server metrics for a test run */
  patch(
    options: LoadTestRunOperationsCreateOrUpdateServerMetricsConfigParameters
  ): StreamableMethod<
    | LoadTestRunOperationsCreateOrUpdateServerMetricsConfig200Response
    | LoadTestRunOperationsCreateOrUpdateServerMetricsConfig201Response
    | LoadTestRunOperationsCreateOrUpdateServerMetricsConfigDefaultResponse
  >;
  /** List server metrics configuration for the given test run. */
  get(
    options?: LoadTestRunOperationsGetServerMetricsConfigParameters
  ): StreamableMethod<
    | LoadTestRunOperationsGetServerMetricsConfig200Response
    | LoadTestRunOperationsGetServerMetricsConfigDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/tests/\{testId\}' has methods for the following verbs: patch, delete, get */
  (path: "/tests/{testId}", testId: string): LoadTestAdministrationOperationsCreateOrUpdateTest;
  /** Resource for '/tests' has methods for the following verbs: get */
  (path: "/tests"): LoadTestAdministrationOperationsListTests;
  /** Resource for '/tests/\{testId\}/files/\{fileName\}' has methods for the following verbs: put, get, delete */
  (
    path: "/tests/{testId}/files/{fileName}",
    testId: string,
    fileName: string
  ): LoadTestAdministrationOperationsUploadTestFile;
  /** Resource for '/tests/\{testId\}/files' has methods for the following verbs: get */
  (path: "/tests/{testId}/files", testId: string): LoadTestAdministrationOperationsListTestFiles;
  /** Resource for '/tests/\{testId\}/app-components' has methods for the following verbs: patch, get */
  (
    path: "/tests/{testId}/app-components",
    testId: string
  ): LoadTestAdministrationOperationsCreateOrUpdateAppComponents;
  /** Resource for '/tests/\{testId\}/server-metrics-config' has methods for the following verbs: patch, get */
  (
    path: "/tests/{testId}/server-metrics-config",
    testId: string
  ): LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfig;
  /** Resource for '/test-runs/\{testRunId\}' has methods for the following verbs: get, patch, delete */
  (path: "/test-runs/{testRunId}", testRunId: string): LoadTestRunOperationsGetTestRun;
  /** Resource for '/test-runs/\{testRunId\}/files/\{fileName\}' has methods for the following verbs: get */
  (
    path: "/test-runs/{testRunId}/files/{fileName}",
    testRunId: string,
    fileName: string
  ): LoadTestRunOperationsGetTestRunFile;
  /** Resource for '/test-runs' has methods for the following verbs: get */
  (path: "/test-runs"): LoadTestRunOperationsListTestRuns;
  /** Resource for '/test-runs/\{testRunId\}:stop' has methods for the following verbs: post */
  (path: "/test-runs/{testRunId}:stop", testRunId: string): LoadTestRunOperationsStopTestRun;
  /** Resource for '/test-runs/\{testRunId\}/metric-namespaces' has methods for the following verbs: get */
  (
    path: "/test-runs/{testRunId}/metric-namespaces",
    testRunId: string
  ): LoadTestRunOperationsListMetricNamespaces;
  /** Resource for '/test-runs/\{testRunId\}/metric-definitions' has methods for the following verbs: get */
  (
    path: "/test-runs/{testRunId}/metric-definitions",
    testRunId: string
  ): LoadTestRunOperationsListMetricDefinitions;
  /** Resource for '/test-runs/\{testRunId\}/metrics' has methods for the following verbs: post */
  (path: "/test-runs/{testRunId}/metrics", testRunId: string): LoadTestRunOperationsListMetrics;
  /** Resource for '/test-runs/\{testRunId\}/app-components' has methods for the following verbs: patch, get */
  (
    path: "/test-runs/{testRunId}/app-components",
    testRunId: string
  ): LoadTestRunOperationsCreateOrUpdateAppComponents;
  /** Resource for '/test-runs/\{testRunId\}/server-metrics-config' has methods for the following verbs: patch, get */
  (
    path: "/test-runs/{testRunId}/server-metrics-config",
    testRunId: string
  ): LoadTestRunOperationsCreateOrUpdateServerMetricsConfig;
}

export type AzureLoadTestingClient = Client & {
  path: Routes;
};
