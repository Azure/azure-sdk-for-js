// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TestCreateOrUpdateParameters,
  TestDeleteParameters,
  TestGetParameters,
  TestListParameters,
  TestUploadFileParameters,
  TestGetFileParameters,
  TestDeleteFileParameters,
  TestListFilesParameters,
  TestCreateOrUpdateAppComponentsParameters,
  TestListAppComponentsParameters,
  TestCreateOrUpdateServerMetricsConfigParameters,
  TestListServerMetricsConfigParameters,
  TestRunDeleteParameters,
  TestRunCreateOrUpdateParameters,
  TestRunGetParameters,
  TestRunGetFileParameters,
  TestRunListParameters,
  TestRunStopParameters,
  TestRunListMetricNamespacesParameters,
  TestRunListMetricDefinitionsParameters,
  TestRunListMetricsParameters,
  TestRunListMetricDimensionValuesParameters,
  TestRunCreateOrUpdateAppComponentsParameters,
  TestRunListAppComponentsParameters,
  TestRunCreateOrUpdateServerMetricsConfigParameters,
  TestRunListServerMetricsConfigParameters,
} from "./parameters";
import {
  TestCreateOrUpdate200Response,
  TestCreateOrUpdate201Response,
  TestCreateOrUpdateDefaultResponse,
  TestDelete204Response,
  TestDeleteDefaultResponse,
  TestGet200Response,
  TestGetDefaultResponse,
  TestList200Response,
  TestListDefaultResponse,
  TestUploadFile201Response,
  TestUploadFileDefaultResponse,
  TestGetFile200Response,
  TestGetFileDefaultResponse,
  TestDeleteFile204Response,
  TestDeleteFileDefaultResponse,
  TestListFiles200Response,
  TestListFilesDefaultResponse,
  TestCreateOrUpdateAppComponents200Response,
  TestCreateOrUpdateAppComponents201Response,
  TestCreateOrUpdateAppComponentsDefaultResponse,
  TestListAppComponents200Response,
  TestListAppComponentsDefaultResponse,
  TestCreateOrUpdateServerMetricsConfig200Response,
  TestCreateOrUpdateServerMetricsConfig201Response,
  TestCreateOrUpdateServerMetricsConfigDefaultResponse,
  TestListServerMetricsConfig200Response,
  TestListServerMetricsConfigDefaultResponse,
  TestRunDelete204Response,
  TestRunDeleteDefaultResponse,
  TestRunCreateOrUpdate200Response,
  TestRunCreateOrUpdate201Response,
  TestRunCreateOrUpdateDefaultResponse,
  TestRunGet200Response,
  TestRunGetDefaultResponse,
  TestRunGetFile200Response,
  TestRunGetFileDefaultResponse,
  TestRunList200Response,
  TestRunListDefaultResponse,
  TestRunStop200Response,
  TestRunStopDefaultResponse,
  TestRunListMetricNamespaces200Response,
  TestRunListMetricNamespacesDefaultResponse,
  TestRunListMetricDefinitions200Response,
  TestRunListMetricDefinitionsDefaultResponse,
  TestRunListMetrics200Response,
  TestRunListMetricsDefaultResponse,
  TestRunListMetricDimensionValues200Response,
  TestRunListMetricDimensionValuesDefaultResponse,
  TestRunCreateOrUpdateAppComponents200Response,
  TestRunCreateOrUpdateAppComponents201Response,
  TestRunCreateOrUpdateAppComponentsDefaultResponse,
  TestRunListAppComponents200Response,
  TestRunListAppComponentsDefaultResponse,
  TestRunCreateOrUpdateServerMetricsConfig200Response,
  TestRunCreateOrUpdateServerMetricsConfig201Response,
  TestRunCreateOrUpdateServerMetricsConfigDefaultResponse,
  TestRunListServerMetricsConfig200Response,
  TestRunListServerMetricsConfigDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface TestCreateOrUpdate {
  /** Create a new test or update an existing test. */
  patch(
    options: TestCreateOrUpdateParameters
  ): StreamableMethod<
    | TestCreateOrUpdate200Response
    | TestCreateOrUpdate201Response
    | TestCreateOrUpdateDefaultResponse
  >;
  /** Delete a test by its name. */
  delete(
    options?: TestDeleteParameters
  ): StreamableMethod<TestDelete204Response | TestDeleteDefaultResponse>;
  /** Get load test details by test name */
  get(options?: TestGetParameters): StreamableMethod<TestGet200Response | TestGetDefaultResponse>;
}

export interface TestList {
  /** Get all load tests by the fully qualified resource Id e.g subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}. */
  get(
    options?: TestListParameters
  ): StreamableMethod<TestList200Response | TestListDefaultResponse>;
}

export interface TestUploadFile {
  /** Upload input file for a given test name. File size can't be more than 50 MB. Existing file with same name for the given test will be overwritten. File should be provided in the request body as application/octet-stream. */
  put(
    options: TestUploadFileParameters
  ): StreamableMethod<TestUploadFile201Response | TestUploadFileDefaultResponse>;
  /** Get test file by the file name. */
  get(
    options?: TestGetFileParameters
  ): StreamableMethod<TestGetFile200Response | TestGetFileDefaultResponse>;
  /** Delete file by the file name for a test */
  delete(
    options?: TestDeleteFileParameters
  ): StreamableMethod<TestDeleteFile204Response | TestDeleteFileDefaultResponse>;
}

export interface TestListFiles {
  /** Get all test files. */
  get(
    options?: TestListFilesParameters
  ): StreamableMethod<TestListFiles200Response | TestListFilesDefaultResponse>;
}

export interface TestCreateOrUpdateAppComponents {
  /** Associate an app component (collection of azure resources) to a test */
  patch(
    options: TestCreateOrUpdateAppComponentsParameters
  ): StreamableMethod<
    | TestCreateOrUpdateAppComponents200Response
    | TestCreateOrUpdateAppComponents201Response
    | TestCreateOrUpdateAppComponentsDefaultResponse
  >;
  /** Get associated app component (collection of azure resources) for the given test. */
  get(
    options?: TestListAppComponentsParameters
  ): StreamableMethod<TestListAppComponents200Response | TestListAppComponentsDefaultResponse>;
}

export interface TestCreateOrUpdateServerMetricsConfig {
  /** Configure server metrics for a test */
  patch(
    options: TestCreateOrUpdateServerMetricsConfigParameters
  ): StreamableMethod<
    | TestCreateOrUpdateServerMetricsConfig200Response
    | TestCreateOrUpdateServerMetricsConfig201Response
    | TestCreateOrUpdateServerMetricsConfigDefaultResponse
  >;
  /** List server metrics configuration for the given test. */
  get(
    options?: TestListServerMetricsConfigParameters
  ): StreamableMethod<
    TestListServerMetricsConfig200Response | TestListServerMetricsConfigDefaultResponse
  >;
}

export interface TestRunDelete {
  /** Delete a test run by its name. */
  delete(
    options?: TestRunDeleteParameters
  ): StreamableMethod<TestRunDelete204Response | TestRunDeleteDefaultResponse>;
  /** Create and start a new test run with the given name. */
  patch(
    options: TestRunCreateOrUpdateParameters
  ): StreamableMethod<
    | TestRunCreateOrUpdate200Response
    | TestRunCreateOrUpdate201Response
    | TestRunCreateOrUpdateDefaultResponse
  >;
  /** Get test run details by name. */
  get(
    options?: TestRunGetParameters
  ): StreamableMethod<TestRunGet200Response | TestRunGetDefaultResponse>;
}

export interface TestRunGetFile {
  /** Get test run file by file name. */
  get(
    options?: TestRunGetFileParameters
  ): StreamableMethod<TestRunGetFile200Response | TestRunGetFileDefaultResponse>;
}

export interface TestRunList {
  /** Get all test runs with given filters */
  get(
    options?: TestRunListParameters
  ): StreamableMethod<TestRunList200Response | TestRunListDefaultResponse>;
}

export interface TestRunStop {
  /** Stop test run by name. */
  post(
    options?: TestRunStopParameters
  ): StreamableMethod<TestRunStop200Response | TestRunStopDefaultResponse>;
}

export interface TestRunListMetricNamespaces {
  /** List the metric namespaces for a load test run. */
  get(
    options?: TestRunListMetricNamespacesParameters
  ): StreamableMethod<
    TestRunListMetricNamespaces200Response | TestRunListMetricNamespacesDefaultResponse
  >;
}

export interface TestRunListMetricDefinitions {
  /** List the metric definitions for a load test run. */
  get(
    options: TestRunListMetricDefinitionsParameters
  ): StreamableMethod<
    TestRunListMetricDefinitions200Response | TestRunListMetricDefinitionsDefaultResponse
  >;
}

export interface TestRunListMetrics {
  /** List the metric values for a load test run. */
  post(
    options: TestRunListMetricsParameters
  ): StreamableMethod<TestRunListMetrics200Response | TestRunListMetricsDefaultResponse>;
}

export interface TestRunListMetricDimensionValues {
  /** List the dimension values for the given metric dimension name. */
  get(
    options: TestRunListMetricDimensionValuesParameters
  ): StreamableMethod<
    TestRunListMetricDimensionValues200Response | TestRunListMetricDimensionValuesDefaultResponse
  >;
}

export interface TestRunCreateOrUpdateAppComponents {
  /** Associate an app component (collection of azure resources) to a test run */
  patch(
    options: TestRunCreateOrUpdateAppComponentsParameters
  ): StreamableMethod<
    | TestRunCreateOrUpdateAppComponents200Response
    | TestRunCreateOrUpdateAppComponents201Response
    | TestRunCreateOrUpdateAppComponentsDefaultResponse
  >;
  /** Get associated app component (collection of azure resources) for the given test run. */
  get(
    options?: TestRunListAppComponentsParameters
  ): StreamableMethod<
    TestRunListAppComponents200Response | TestRunListAppComponentsDefaultResponse
  >;
}

export interface TestRunCreateOrUpdateServerMetricsConfig {
  /** Configure server metrics for a test run */
  patch(
    options: TestRunCreateOrUpdateServerMetricsConfigParameters
  ): StreamableMethod<
    | TestRunCreateOrUpdateServerMetricsConfig200Response
    | TestRunCreateOrUpdateServerMetricsConfig201Response
    | TestRunCreateOrUpdateServerMetricsConfigDefaultResponse
  >;
  /** List server metrics configuration for the given test run. */
  get(
    options?: TestRunListServerMetricsConfigParameters
  ): StreamableMethod<
    TestRunListServerMetricsConfig200Response | TestRunListServerMetricsConfigDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/tests/\{testId\}' has methods for the following verbs: patch, delete, get */
  (path: "/tests/{testId}", testId: string): TestCreateOrUpdate;
  /** Resource for '/tests' has methods for the following verbs: get */
  (path: "/tests"): TestList;
  /** Resource for '/tests/\{testId\}/files/\{fileName\}' has methods for the following verbs: put, get, delete */
  (path: "/tests/{testId}/files/{fileName}", testId: string, fileName: string): TestUploadFile;
  /** Resource for '/tests/\{testId\}/files' has methods for the following verbs: get */
  (path: "/tests/{testId}/files", testId: string): TestListFiles;
  /** Resource for '/tests/\{testId\}/app-components' has methods for the following verbs: patch, get */
  (path: "/tests/{testId}/app-components", testId: string): TestCreateOrUpdateAppComponents;
  /** Resource for '/tests/\{testId\}/server-metrics-config' has methods for the following verbs: patch, get */
  (
    path: "/tests/{testId}/server-metrics-config",
    testId: string
  ): TestCreateOrUpdateServerMetricsConfig;
  /** Resource for '/test-runs/\{testRunId\}' has methods for the following verbs: delete, patch, get */
  (path: "/test-runs/{testRunId}", testRunId: string): TestRunDelete;
  /** Resource for '/test-runs/\{testRunId\}/files/\{fileName\}' has methods for the following verbs: get */
  (
    path: "/test-runs/{testRunId}/files/{fileName}",
    testRunId: string,
    fileName: string
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
  (path: "/test-runs/{testRunId}/metrics", testRunId: string): TestRunListMetrics;
  /** Resource for '/test-runs/\{testRunId\}/metric-dimensions/\{name\}/values' has methods for the following verbs: get */
  (
    path: "/test-runs/{testRunId}/metric-dimensions/{name}/values",
    testRunId: string,
    name: string
  ): TestRunListMetricDimensionValues;
  /** Resource for '/test-runs/\{testRunId\}/app-components' has methods for the following verbs: patch, get */
  (
    path: "/test-runs/{testRunId}/app-components",
    testRunId: string
  ): TestRunCreateOrUpdateAppComponents;
  /** Resource for '/test-runs/\{testRunId\}/server-metrics-config' has methods for the following verbs: patch, get */
  (
    path: "/test-runs/{testRunId}/server-metrics-config",
    testRunId: string
  ): TestRunCreateOrUpdateServerMetricsConfig;
}

export type AzureLoadTestingClient = Client & {
  path: Routes;
};
