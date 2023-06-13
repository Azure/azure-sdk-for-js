// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CreateOrUpdateTestParameters,
  DeleteTestParameters,
  GetTestParameters,
  ListTestsParameters,
  UploadTestFileParameters,
  GetTestFileParameters,
  DeleteTestFileParameters,
  ListTestFilesParameters,
  CreateOrUpdateAppComponentsParameters,
  GetAppComponentsParameters,
  CreateOrUpdateServerMetricsConfigParameters,
  GetServerMetricsConfigParameters,
  GetTestRunParameters,
  CreateOrUpdateTestRunParameters,
  DeleteTestRunParameters,
  GetTestRunFileParameters,
  ListTestRunsParameters,
  StopTestRunParameters,
  ListMetricNamespacesParameters,
  ListMetricDefinitionsParameters,
  ListMetricsParameters,
} from "./parameters";
import {
  CreateOrUpdateTest200Response,
  CreateOrUpdateTest201Response,
  CreateOrUpdateTestDefaultResponse,
  DeleteTest204Response,
  DeleteTestDefaultResponse,
  GetTest200Response,
  GetTestDefaultResponse,
  ListTests200Response,
  ListTestsDefaultResponse,
  UploadTestFile201Response,
  UploadTestFileDefaultResponse,
  GetTestFile200Response,
  GetTestFileDefaultResponse,
  DeleteTestFile204Response,
  DeleteTestFileDefaultResponse,
  ListTestFiles200Response,
  ListTestFilesDefaultResponse,
  CreateOrUpdateAppComponents200Response,
  CreateOrUpdateAppComponents201Response,
  CreateOrUpdateAppComponentsDefaultResponse,
  GetAppComponents200Response,
  GetAppComponentsDefaultResponse,
  CreateOrUpdateServerMetricsConfig200Response,
  CreateOrUpdateServerMetricsConfig201Response,
  CreateOrUpdateServerMetricsConfigDefaultResponse,
  GetServerMetricsConfig200Response,
  GetServerMetricsConfigDefaultResponse,
  GetTestRun200Response,
  GetTestRunDefaultResponse,
  CreateOrUpdateTestRun200Response,
  CreateOrUpdateTestRun201Response,
  CreateOrUpdateTestRunDefaultResponse,
  DeleteTestRun204Response,
  DeleteTestRunDefaultResponse,
  GetTestRunFile200Response,
  GetTestRunFileDefaultResponse,
  ListTestRuns200Response,
  ListTestRunsDefaultResponse,
  StopTestRun200Response,
  StopTestRunDefaultResponse,
  ListMetricNamespaces200Response,
  ListMetricNamespacesDefaultResponse,
  ListMetricDefinitions200Response,
  ListMetricDefinitionsDefaultResponse,
  ListMetrics200Response,
  ListMetricsDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface CreateOrUpdateTest {
  /** Create a new test or update an existing test. */
  patch(
    options: CreateOrUpdateTestParameters
  ): StreamableMethod<
    | CreateOrUpdateTest200Response
    | CreateOrUpdateTest201Response
    | CreateOrUpdateTestDefaultResponse
  >;
  /** Delete a test by its name. */
  delete(
    options?: DeleteTestParameters
  ): StreamableMethod<DeleteTest204Response | DeleteTestDefaultResponse>;
  /** Get load test details by test name */
  get(options?: GetTestParameters): StreamableMethod<GetTest200Response | GetTestDefaultResponse>;
}

export interface ListTests {
  /**
   * Get all load tests by the fully qualified resource Id e.g
   * subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}.
   */
  get(
    options?: ListTestsParameters
  ): StreamableMethod<ListTests200Response | ListTestsDefaultResponse>;
}

export interface UploadTestFile {
  /**
   * Upload input file for a given test name. File size can't be more than 50 MB.
   * Existing file with same name for the given test will be overwritten. File
   * should be provided in the request body as application/octet-stream.
   */
  put(
    options: UploadTestFileParameters
  ): StreamableMethod<UploadTestFile201Response | UploadTestFileDefaultResponse>;
  /** Get test file by the file name. */
  get(
    options?: GetTestFileParameters
  ): StreamableMethod<GetTestFile200Response | GetTestFileDefaultResponse>;
  /** Delete file by the file name for a test */
  delete(
    options?: DeleteTestFileParameters
  ): StreamableMethod<DeleteTestFile204Response | DeleteTestFileDefaultResponse>;
}

export interface ListTestFiles {
  /** Get all test files. */
  get(
    options?: ListTestFilesParameters
  ): StreamableMethod<ListTestFiles200Response | ListTestFilesDefaultResponse>;
}

export interface CreateOrUpdateAppComponents {
  /** Associate an app component (collection of azure resources) to a test */
  patch(
    options: CreateOrUpdateAppComponentsParameters
  ): StreamableMethod<
    | CreateOrUpdateAppComponents200Response
    | CreateOrUpdateAppComponents201Response
    | CreateOrUpdateAppComponentsDefaultResponse
  >;
  /** Get associated app component (collection of azure resources) for the given test. */
  get(
    options?: GetAppComponentsParameters
  ): StreamableMethod<GetAppComponents200Response | GetAppComponentsDefaultResponse>;
}

export interface CreateOrUpdateServerMetricsConfig {
  /** Configure server metrics for a test */
  patch(
    options: CreateOrUpdateServerMetricsConfigParameters
  ): StreamableMethod<
    | CreateOrUpdateServerMetricsConfig200Response
    | CreateOrUpdateServerMetricsConfig201Response
    | CreateOrUpdateServerMetricsConfigDefaultResponse
  >;
  /** List server metrics configuration for the given test. */
  get(
    options?: GetServerMetricsConfigParameters
  ): StreamableMethod<GetServerMetricsConfig200Response | GetServerMetricsConfigDefaultResponse>;
}

export interface GetTestRun {
  /** Get test run details by name. */
  get(
    options?: GetTestRunParameters
  ): StreamableMethod<GetTestRun200Response | GetTestRunDefaultResponse>;
  /** Create and start a new test run with the given name. */
  patch(
    options: CreateOrUpdateTestRunParameters
  ): StreamableMethod<
    | CreateOrUpdateTestRun200Response
    | CreateOrUpdateTestRun201Response
    | CreateOrUpdateTestRunDefaultResponse
  >;
  /** Delete a test run by its name. */
  delete(
    options?: DeleteTestRunParameters
  ): StreamableMethod<DeleteTestRun204Response | DeleteTestRunDefaultResponse>;
}

export interface GetTestRunFile {
  /** Get test run file by file name. */
  get(
    options?: GetTestRunFileParameters
  ): StreamableMethod<GetTestRunFile200Response | GetTestRunFileDefaultResponse>;
}

export interface ListTestRuns {
  /** Get all test runs with given filters */
  get(
    options?: ListTestRunsParameters
  ): StreamableMethod<ListTestRuns200Response | ListTestRunsDefaultResponse>;
}

export interface StopTestRun {
  /** Stop test run by name. */
  post(
    options?: StopTestRunParameters
  ): StreamableMethod<StopTestRun200Response | StopTestRunDefaultResponse>;
}

export interface ListMetricNamespaces {
  /** List the metric namespaces for a load test run. */
  get(
    options?: ListMetricNamespacesParameters
  ): StreamableMethod<ListMetricNamespaces200Response | ListMetricNamespacesDefaultResponse>;
}

export interface ListMetricDefinitions {
  /** List the metric definitions for a load test run. */
  get(
    options?: ListMetricDefinitionsParameters
  ): StreamableMethod<ListMetricDefinitions200Response | ListMetricDefinitionsDefaultResponse>;
}

export interface ListMetrics {
  /** List the metric values for a load test run. */
  post(
    options: ListMetricsParameters
  ): StreamableMethod<ListMetrics200Response | ListMetricsDefaultResponse>;
}

export interface CreateOrUpdateAppComponents {
  /** Associate an app component (collection of azure resources) to a test run */
  patch(
    options: CreateOrUpdateAppComponentsParameters
  ): StreamableMethod<
    | CreateOrUpdateAppComponents200Response
    | CreateOrUpdateAppComponents201Response
    | CreateOrUpdateAppComponentsDefaultResponse
  >;
  /**
   * Get associated app component (collection of azure resources) for the given test
   * run.
   */
  get(
    options?: GetAppComponentsParameters
  ): StreamableMethod<GetAppComponents200Response | GetAppComponentsDefaultResponse>;
}

export interface CreateOrUpdateServerMetricsConfig {
  /** Configure server metrics for a test run */
  patch(
    options: CreateOrUpdateServerMetricsConfigParameters
  ): StreamableMethod<
    | CreateOrUpdateServerMetricsConfig200Response
    | CreateOrUpdateServerMetricsConfig201Response
    | CreateOrUpdateServerMetricsConfigDefaultResponse
  >;
  /** List server metrics configuration for the given test run. */
  get(
    options?: GetServerMetricsConfigParameters
  ): StreamableMethod<GetServerMetricsConfig200Response | GetServerMetricsConfigDefaultResponse>;
}

export interface Routes {
  /** Resource for '/tests/\{testId\}' has methods for the following verbs: patch, delete, get */
  (path: "/tests/{testId}", testId: string): CreateOrUpdateTest;
  /** Resource for '/tests' has methods for the following verbs: get */
  (path: "/tests"): ListTests;
  /** Resource for '/tests/\{testId\}/files/\{fileName\}' has methods for the following verbs: put, get, delete */
  (path: "/tests/{testId}/files/{fileName}", testId: string, fileName: string): UploadTestFile;
  /** Resource for '/tests/\{testId\}/files' has methods for the following verbs: get */
  (path: "/tests/{testId}/files", testId: string): ListTestFiles;
  /** Resource for '/tests/\{testId\}/app-components' has methods for the following verbs: patch, get */
  (path: "/tests/{testId}/app-components", testId: string): CreateOrUpdateAppComponents;
  /** Resource for '/tests/\{testId\}/server-metrics-config' has methods for the following verbs: patch, get */
  (
    path: "/tests/{testId}/server-metrics-config",
    testId: string
  ): CreateOrUpdateServerMetricsConfig;
  /** Resource for '/test-runs/\{testRunId\}' has methods for the following verbs: get, patch, delete */
  (path: "/test-runs/{testRunId}", testRunId: string): GetTestRun;
  /** Resource for '/test-runs/\{testRunId\}/files/\{fileName\}' has methods for the following verbs: get */
  (
    path: "/test-runs/{testRunId}/files/{fileName}",
    testRunId: string,
    fileName: string
  ): GetTestRunFile;
  /** Resource for '/test-runs' has methods for the following verbs: get */
  (path: "/test-runs"): ListTestRuns;
  /** Resource for '/test-runs/\{testRunId\}:stop' has methods for the following verbs: post */
  (path: "/test-runs/{testRunId}:stop", testRunId: string): StopTestRun;
  /** Resource for '/test-runs/\{testRunId\}/metric-namespaces' has methods for the following verbs: get */
  (path: "/test-runs/{testRunId}/metric-namespaces", testRunId: string): ListMetricNamespaces;
  /** Resource for '/test-runs/\{testRunId\}/metric-definitions' has methods for the following verbs: get */
  (path: "/test-runs/{testRunId}/metric-definitions", testRunId: string): ListMetricDefinitions;
  /** Resource for '/test-runs/\{testRunId\}/metrics' has methods for the following verbs: post */
  (path: "/test-runs/{testRunId}/metrics", testRunId: string): ListMetrics;
  /** Resource for '/test-runs/\{testRunId\}/app-components' has methods for the following verbs: patch, get */
  (path: "/test-runs/{testRunId}/app-components", testRunId: string): CreateOrUpdateAppComponents;
  /** Resource for '/test-runs/\{testRunId\}/server-metrics-config' has methods for the following verbs: patch, get */
  (
    path: "/test-runs/{testRunId}/server-metrics-config",
    testRunId: string
  ): CreateOrUpdateServerMetricsConfig;
}

export type AzureLoadTestingClient = Client & {
  path: Routes;
};
