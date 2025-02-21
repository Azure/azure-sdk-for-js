// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  LoadTestAdministrationCreateOrUpdateTestParameters,
  LoadTestAdministrationDeleteTestParameters,
  LoadTestAdministrationGetTestParameters,
  LoadTestAdministrationListTestsParameters,
  LoadTestAdministrationUploadTestFileParameters,
  LoadTestAdministrationGetTestFileParameters,
  LoadTestAdministrationDeleteTestFileParameters,
  LoadTestAdministrationListTestFilesParameters,
  LoadTestAdministrationCreateOrUpdateAppComponentsParameters,
  LoadTestAdministrationGetAppComponentsParameters,
  LoadTestAdministrationCreateOrUpdateServerMetricsConfigParameters,
  LoadTestAdministrationGetServerMetricsConfigParameters,
  TestProfileAdministrationCreateOrUpdateTestProfileParameters,
  TestProfileAdministrationDeleteTestProfileParameters,
  TestProfileAdministrationGetTestProfileParameters,
  TestProfileAdministrationListTestProfilesParameters,
  LoadTestRunGetTestRunParameters,
  LoadTestRunCreateOrUpdateTestRunParameters,
  LoadTestRunDeleteTestRunParameters,
  LoadTestRunListTestRunsParameters,
  LoadTestRunGetTestRunFileParameters,
  LoadTestRunStopParameters,
  LoadTestRunListMetricNamespacesParameters,
  LoadTestRunListMetricDefinitionsParameters,
  LoadTestRunListMetricsParameters,
  LoadTestRunListMetricDimensionValuesParameters,
  LoadTestRunCreateOrUpdateAppComponentsParameters,
  LoadTestRunGetAppComponentsParameters,
  LoadTestRunCreateOrUpdateServerMetricsConfigParameters,
  LoadTestRunGetServerMetricsConfigParameters,
  TestProfileRunAdministrationGetTestProfileRunParameters,
  TestProfileRunAdministrationCreateOrUpdateTestProfileRunParameters,
  TestProfileRunAdministrationDeleteTestProfileRunParameters,
  TestProfileRunAdministrationStopParameters,
  TestProfileRunAdministrationListTestProfileRunsParameters,
  TriggerAdministrationGetTriggerParameters,
  TriggerAdministrationCreateOrUpdateTriggerParameters,
  TriggerAdministrationDeleteTriggerParameters,
  TriggerAdministrationListTriggerParameters,
  NotificationRuleAdministrationGetNotificationRuleParameters,
  NotificationRuleAdministrationCreateOrUpdateNotificationRuleParameters,
  NotificationRuleAdministrationDeleteNotificationRuleParameters,
  NotificationRuleAdministrationListNotificationRuleParameters,
} from "./parameters.js";
import {
  LoadTestAdministrationCreateOrUpdateTest200Response,
  LoadTestAdministrationCreateOrUpdateTest201Response,
  LoadTestAdministrationCreateOrUpdateTestDefaultResponse,
  LoadTestAdministrationDeleteTest204Response,
  LoadTestAdministrationDeleteTestDefaultResponse,
  LoadTestAdministrationGetTest200Response,
  LoadTestAdministrationGetTestDefaultResponse,
  LoadTestAdministrationListTests200Response,
  LoadTestAdministrationListTestsDefaultResponse,
  LoadTestAdministrationUploadTestFile201Response,
  LoadTestAdministrationUploadTestFileDefaultResponse,
  LoadTestAdministrationGetTestFile200Response,
  LoadTestAdministrationGetTestFileDefaultResponse,
  LoadTestAdministrationDeleteTestFile204Response,
  LoadTestAdministrationDeleteTestFileDefaultResponse,
  LoadTestAdministrationListTestFiles200Response,
  LoadTestAdministrationListTestFilesDefaultResponse,
  LoadTestAdministrationCreateOrUpdateAppComponents200Response,
  LoadTestAdministrationCreateOrUpdateAppComponents201Response,
  LoadTestAdministrationCreateOrUpdateAppComponentsDefaultResponse,
  LoadTestAdministrationGetAppComponents200Response,
  LoadTestAdministrationGetAppComponentsDefaultResponse,
  LoadTestAdministrationCreateOrUpdateServerMetricsConfig200Response,
  LoadTestAdministrationCreateOrUpdateServerMetricsConfig201Response,
  LoadTestAdministrationCreateOrUpdateServerMetricsConfigDefaultResponse,
  LoadTestAdministrationGetServerMetricsConfig200Response,
  LoadTestAdministrationGetServerMetricsConfigDefaultResponse,
  TestProfileAdministrationCreateOrUpdateTestProfile200Response,
  TestProfileAdministrationCreateOrUpdateTestProfile201Response,
  TestProfileAdministrationCreateOrUpdateTestProfileDefaultResponse,
  TestProfileAdministrationDeleteTestProfile204Response,
  TestProfileAdministrationDeleteTestProfileDefaultResponse,
  TestProfileAdministrationGetTestProfile200Response,
  TestProfileAdministrationGetTestProfileDefaultResponse,
  TestProfileAdministrationListTestProfiles200Response,
  TestProfileAdministrationListTestProfilesDefaultResponse,
  LoadTestRunGetTestRun200Response,
  LoadTestRunGetTestRunDefaultResponse,
  LoadTestRunCreateOrUpdateTestRun200Response,
  LoadTestRunCreateOrUpdateTestRun201Response,
  LoadTestRunCreateOrUpdateTestRunDefaultResponse,
  LoadTestRunDeleteTestRun204Response,
  LoadTestRunDeleteTestRunDefaultResponse,
  LoadTestRunListTestRuns200Response,
  LoadTestRunListTestRunsDefaultResponse,
  LoadTestRunGetTestRunFile200Response,
  LoadTestRunGetTestRunFileDefaultResponse,
  LoadTestRunStop200Response,
  LoadTestRunStopDefaultResponse,
  LoadTestRunListMetricNamespaces200Response,
  LoadTestRunListMetricNamespacesDefaultResponse,
  LoadTestRunListMetricDefinitions200Response,
  LoadTestRunListMetricDefinitionsDefaultResponse,
  LoadTestRunListMetrics200Response,
  LoadTestRunListMetricsDefaultResponse,
  LoadTestRunListMetricDimensionValues200Response,
  LoadTestRunListMetricDimensionValuesDefaultResponse,
  LoadTestRunCreateOrUpdateAppComponents200Response,
  LoadTestRunCreateOrUpdateAppComponents201Response,
  LoadTestRunCreateOrUpdateAppComponentsDefaultResponse,
  LoadTestRunGetAppComponents200Response,
  LoadTestRunGetAppComponentsDefaultResponse,
  LoadTestRunCreateOrUpdateServerMetricsConfig200Response,
  LoadTestRunCreateOrUpdateServerMetricsConfig201Response,
  LoadTestRunCreateOrUpdateServerMetricsConfigDefaultResponse,
  LoadTestRunGetServerMetricsConfig200Response,
  LoadTestRunGetServerMetricsConfigDefaultResponse,
  TestProfileRunAdministrationGetTestProfileRun200Response,
  TestProfileRunAdministrationGetTestProfileRunDefaultResponse,
  TestProfileRunAdministrationCreateOrUpdateTestProfileRun200Response,
  TestProfileRunAdministrationCreateOrUpdateTestProfileRun201Response,
  TestProfileRunAdministrationCreateOrUpdateTestProfileRunDefaultResponse,
  TestProfileRunAdministrationDeleteTestProfileRun204Response,
  TestProfileRunAdministrationDeleteTestProfileRunDefaultResponse,
  TestProfileRunAdministrationStop200Response,
  TestProfileRunAdministrationStopDefaultResponse,
  TestProfileRunAdministrationListTestProfileRuns200Response,
  TestProfileRunAdministrationListTestProfileRunsDefaultResponse,
  TriggerAdministrationGetTrigger200Response,
  TriggerAdministrationGetTriggerDefaultResponse,
  TriggerAdministrationCreateOrUpdateTrigger200Response,
  TriggerAdministrationCreateOrUpdateTrigger201Response,
  TriggerAdministrationCreateOrUpdateTriggerDefaultResponse,
  TriggerAdministrationDeleteTrigger204Response,
  TriggerAdministrationDeleteTriggerDefaultResponse,
  TriggerAdministrationListTrigger200Response,
  TriggerAdministrationListTriggerDefaultResponse,
  NotificationRuleAdministrationGetNotificationRule200Response,
  NotificationRuleAdministrationGetNotificationRuleDefaultResponse,
  NotificationRuleAdministrationCreateOrUpdateNotificationRule200Response,
  NotificationRuleAdministrationCreateOrUpdateNotificationRule201Response,
  NotificationRuleAdministrationCreateOrUpdateNotificationRuleDefaultResponse,
  NotificationRuleAdministrationDeleteNotificationRule204Response,
  NotificationRuleAdministrationDeleteNotificationRuleDefaultResponse,
  NotificationRuleAdministrationListNotificationRule200Response,
  NotificationRuleAdministrationListNotificationRuleDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface LoadTestAdministrationCreateOrUpdateTest {
  /** Create a new test or update an existing test by providing the test Id. */
  patch(
    options: LoadTestAdministrationCreateOrUpdateTestParameters,
  ): StreamableMethod<
    | LoadTestAdministrationCreateOrUpdateTest200Response
    | LoadTestAdministrationCreateOrUpdateTest201Response
    | LoadTestAdministrationCreateOrUpdateTestDefaultResponse
  >;
  /** Delete a test by its test Id. */
  delete(
    options?: LoadTestAdministrationDeleteTestParameters,
  ): StreamableMethod<
    | LoadTestAdministrationDeleteTest204Response
    | LoadTestAdministrationDeleteTestDefaultResponse
  >;
  /** Get load test details by test Id */
  get(
    options?: LoadTestAdministrationGetTestParameters,
  ): StreamableMethod<
    | LoadTestAdministrationGetTest200Response
    | LoadTestAdministrationGetTestDefaultResponse
  >;
}

export interface LoadTestAdministrationListTests {
  /**
   * Get all load tests by the fully qualified resource Id e.g
   * subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}.
   */
  get(
    options?: LoadTestAdministrationListTestsParameters,
  ): StreamableMethod<
    | LoadTestAdministrationListTests200Response
    | LoadTestAdministrationListTestsDefaultResponse
  >;
}

export interface LoadTestAdministrationUploadTestFile {
  /**
   * Upload input file for a given test Id. File size can't be more than 50 MB.
   * Existing file with same name for the given test will be overwritten. File
   * should be provided in the request body as application/octet-stream.
   */
  put(
    options: LoadTestAdministrationUploadTestFileParameters,
  ): StreamableMethod<
    | LoadTestAdministrationUploadTestFile201Response
    | LoadTestAdministrationUploadTestFileDefaultResponse
  >;
  /** Get all the files that are associated with a test. */
  get(
    options?: LoadTestAdministrationGetTestFileParameters,
  ): StreamableMethod<
    | LoadTestAdministrationGetTestFile200Response
    | LoadTestAdministrationGetTestFileDefaultResponse
  >;
  /** Delete file by the file name for a test */
  delete(
    options?: LoadTestAdministrationDeleteTestFileParameters,
  ): StreamableMethod<
    | LoadTestAdministrationDeleteTestFile204Response
    | LoadTestAdministrationDeleteTestFileDefaultResponse
  >;
}

export interface LoadTestAdministrationListTestFiles {
  /** Get all test files. */
  get(
    options?: LoadTestAdministrationListTestFilesParameters,
  ): StreamableMethod<
    | LoadTestAdministrationListTestFiles200Response
    | LoadTestAdministrationListTestFilesDefaultResponse
  >;
}

export interface LoadTestAdministrationCreateOrUpdateAppComponents {
  /** Add an app component to a test by providing the resource Id, name and type. */
  patch(
    options: LoadTestAdministrationCreateOrUpdateAppComponentsParameters,
  ): StreamableMethod<
    | LoadTestAdministrationCreateOrUpdateAppComponents200Response
    | LoadTestAdministrationCreateOrUpdateAppComponents201Response
    | LoadTestAdministrationCreateOrUpdateAppComponentsDefaultResponse
  >;
  /** Get associated app component (collection of azure resources) for the given test. */
  get(
    options?: LoadTestAdministrationGetAppComponentsParameters,
  ): StreamableMethod<
    | LoadTestAdministrationGetAppComponents200Response
    | LoadTestAdministrationGetAppComponentsDefaultResponse
  >;
}

export interface LoadTestAdministrationCreateOrUpdateServerMetricsConfig {
  /** Configure server metrics for a test */
  patch(
    options: LoadTestAdministrationCreateOrUpdateServerMetricsConfigParameters,
  ): StreamableMethod<
    | LoadTestAdministrationCreateOrUpdateServerMetricsConfig200Response
    | LoadTestAdministrationCreateOrUpdateServerMetricsConfig201Response
    | LoadTestAdministrationCreateOrUpdateServerMetricsConfigDefaultResponse
  >;
  /** List server metrics configuration for the given test. */
  get(
    options?: LoadTestAdministrationGetServerMetricsConfigParameters,
  ): StreamableMethod<
    | LoadTestAdministrationGetServerMetricsConfig200Response
    | LoadTestAdministrationGetServerMetricsConfigDefaultResponse
  >;
}

export interface TestProfileAdministrationCreateOrUpdateTestProfile {
  /** Create a new test profile or update an existing test profile by providing the test profile Id. */
  patch(
    options: TestProfileAdministrationCreateOrUpdateTestProfileParameters,
  ): StreamableMethod<
    | TestProfileAdministrationCreateOrUpdateTestProfile200Response
    | TestProfileAdministrationCreateOrUpdateTestProfile201Response
    | TestProfileAdministrationCreateOrUpdateTestProfileDefaultResponse
  >;
  /** Delete a test profile by its test profile Id. */
  delete(
    options?: TestProfileAdministrationDeleteTestProfileParameters,
  ): StreamableMethod<
    | TestProfileAdministrationDeleteTestProfile204Response
    | TestProfileAdministrationDeleteTestProfileDefaultResponse
  >;
  /** Get load test profile details by test profile Id. */
  get(
    options?: TestProfileAdministrationGetTestProfileParameters,
  ): StreamableMethod<
    | TestProfileAdministrationGetTestProfile200Response
    | TestProfileAdministrationGetTestProfileDefaultResponse
  >;
}

export interface TestProfileAdministrationListTestProfiles {
  /** Get all test profiles for the given filters. */
  get(
    options?: TestProfileAdministrationListTestProfilesParameters,
  ): StreamableMethod<
    | TestProfileAdministrationListTestProfiles200Response
    | TestProfileAdministrationListTestProfilesDefaultResponse
  >;
}

export interface LoadTestRunGetTestRun {
  /** Get test run details by test run Id. */
  get(
    options?: LoadTestRunGetTestRunParameters,
  ): StreamableMethod<
    LoadTestRunGetTestRun200Response | LoadTestRunGetTestRunDefaultResponse
  >;
  /** Create and start a new test run with the given test run Id. */
  patch(
    options: LoadTestRunCreateOrUpdateTestRunParameters,
  ): StreamableMethod<
    | LoadTestRunCreateOrUpdateTestRun200Response
    | LoadTestRunCreateOrUpdateTestRun201Response
    | LoadTestRunCreateOrUpdateTestRunDefaultResponse
  >;
  /** Delete an existing load test run by providing the testRunId. */
  delete(
    options?: LoadTestRunDeleteTestRunParameters,
  ): StreamableMethod<
    | LoadTestRunDeleteTestRun204Response
    | LoadTestRunDeleteTestRunDefaultResponse
  >;
}

export interface LoadTestRunListTestRuns {
  /** Get all test runs for the given filters. */
  get(
    options?: LoadTestRunListTestRunsParameters,
  ): StreamableMethod<
    LoadTestRunListTestRuns200Response | LoadTestRunListTestRunsDefaultResponse
  >;
}

export interface LoadTestRunGetTestRunFile {
  /** Get test run file by file name. */
  get(
    options?: LoadTestRunGetTestRunFileParameters,
  ): StreamableMethod<
    | LoadTestRunGetTestRunFile200Response
    | LoadTestRunGetTestRunFileDefaultResponse
  >;
}

export interface LoadTestRunStop {
  /** Stop test run by test run Id. */
  post(
    options?: LoadTestRunStopParameters,
  ): StreamableMethod<
    LoadTestRunStop200Response | LoadTestRunStopDefaultResponse
  >;
}

export interface LoadTestRunListMetricNamespaces {
  /** List the metric namespaces for a load test run. */
  get(
    options?: LoadTestRunListMetricNamespacesParameters,
  ): StreamableMethod<
    | LoadTestRunListMetricNamespaces200Response
    | LoadTestRunListMetricNamespacesDefaultResponse
  >;
}

export interface LoadTestRunListMetricDefinitions {
  /** List the metric definitions for a load test run. */
  get(
    options: LoadTestRunListMetricDefinitionsParameters,
  ): StreamableMethod<
    | LoadTestRunListMetricDefinitions200Response
    | LoadTestRunListMetricDefinitionsDefaultResponse
  >;
}

export interface LoadTestRunListMetrics {
  /** List the metric values for a load test run. */
  post(
    options: LoadTestRunListMetricsParameters,
  ): StreamableMethod<
    LoadTestRunListMetrics200Response | LoadTestRunListMetricsDefaultResponse
  >;
}

export interface LoadTestRunListMetricDimensionValues {
  /** List the dimension values for the given metric dimension name. */
  get(
    options: LoadTestRunListMetricDimensionValuesParameters,
  ): StreamableMethod<
    | LoadTestRunListMetricDimensionValues200Response
    | LoadTestRunListMetricDimensionValuesDefaultResponse
  >;
}

export interface LoadTestRunCreateOrUpdateAppComponents {
  /** Add an app component to a test run by providing the resource Id, name and type. */
  patch(
    options: LoadTestRunCreateOrUpdateAppComponentsParameters,
  ): StreamableMethod<
    | LoadTestRunCreateOrUpdateAppComponents200Response
    | LoadTestRunCreateOrUpdateAppComponents201Response
    | LoadTestRunCreateOrUpdateAppComponentsDefaultResponse
  >;
  /**
   * Get associated app component (collection of azure resources) for the given test
   * run.
   */
  get(
    options?: LoadTestRunGetAppComponentsParameters,
  ): StreamableMethod<
    | LoadTestRunGetAppComponents200Response
    | LoadTestRunGetAppComponentsDefaultResponse
  >;
}

export interface LoadTestRunCreateOrUpdateServerMetricsConfig {
  /** Configure server metrics for a test run */
  patch(
    options: LoadTestRunCreateOrUpdateServerMetricsConfigParameters,
  ): StreamableMethod<
    | LoadTestRunCreateOrUpdateServerMetricsConfig200Response
    | LoadTestRunCreateOrUpdateServerMetricsConfig201Response
    | LoadTestRunCreateOrUpdateServerMetricsConfigDefaultResponse
  >;
  /** Get associated server metrics configuration for the given test run. */
  get(
    options?: LoadTestRunGetServerMetricsConfigParameters,
  ): StreamableMethod<
    | LoadTestRunGetServerMetricsConfig200Response
    | LoadTestRunGetServerMetricsConfigDefaultResponse
  >;
}

export interface TestProfileRunAdministrationGetTestProfileRun {
  /** Get test profile run details by test profile run Id. */
  get(
    options?: TestProfileRunAdministrationGetTestProfileRunParameters,
  ): StreamableMethod<
    | TestProfileRunAdministrationGetTestProfileRun200Response
    | TestProfileRunAdministrationGetTestProfileRunDefaultResponse
  >;
  /** Create and start a new test profile run with the given test profile run Id. */
  patch(
    options: TestProfileRunAdministrationCreateOrUpdateTestProfileRunParameters,
  ): StreamableMethod<
    | TestProfileRunAdministrationCreateOrUpdateTestProfileRun200Response
    | TestProfileRunAdministrationCreateOrUpdateTestProfileRun201Response
    | TestProfileRunAdministrationCreateOrUpdateTestProfileRunDefaultResponse
  >;
  /** Delete an existing load test profile run by providing the test profile run Id. */
  delete(
    options?: TestProfileRunAdministrationDeleteTestProfileRunParameters,
  ): StreamableMethod<
    | TestProfileRunAdministrationDeleteTestProfileRun204Response
    | TestProfileRunAdministrationDeleteTestProfileRunDefaultResponse
  >;
}

export interface TestProfileRunAdministrationStop {
  /** Stop test profile run for the given test profile run Id. */
  post(
    options?: TestProfileRunAdministrationStopParameters,
  ): StreamableMethod<
    | TestProfileRunAdministrationStop200Response
    | TestProfileRunAdministrationStopDefaultResponse
  >;
}

export interface TestProfileRunAdministrationListTestProfileRuns {
  /** Get all test profile runs for the given filters. */
  get(
    options?: TestProfileRunAdministrationListTestProfileRunsParameters,
  ): StreamableMethod<
    | TestProfileRunAdministrationListTestProfileRuns200Response
    | TestProfileRunAdministrationListTestProfileRunsDefaultResponse
  >;
}

export interface TriggerAdministrationGetTrigger {
  /** Resource read operation template. */
  get(
    options?: TriggerAdministrationGetTriggerParameters,
  ): StreamableMethod<
    | TriggerAdministrationGetTrigger200Response
    | TriggerAdministrationGetTriggerDefaultResponse
  >;
  /** Create or update operation template. */
  patch(
    options: TriggerAdministrationCreateOrUpdateTriggerParameters,
  ): StreamableMethod<
    | TriggerAdministrationCreateOrUpdateTrigger200Response
    | TriggerAdministrationCreateOrUpdateTrigger201Response
    | TriggerAdministrationCreateOrUpdateTriggerDefaultResponse
  >;
  /** Resource delete operation template. */
  delete(
    options?: TriggerAdministrationDeleteTriggerParameters,
  ): StreamableMethod<
    | TriggerAdministrationDeleteTrigger204Response
    | TriggerAdministrationDeleteTriggerDefaultResponse
  >;
}

export interface TriggerAdministrationListTrigger {
  /** Resource list operation template. */
  get(
    options?: TriggerAdministrationListTriggerParameters,
  ): StreamableMethod<
    | TriggerAdministrationListTrigger200Response
    | TriggerAdministrationListTriggerDefaultResponse
  >;
}

export interface NotificationRuleAdministrationGetNotificationRule {
  /** Resource read operation template. */
  get(
    options?: NotificationRuleAdministrationGetNotificationRuleParameters,
  ): StreamableMethod<
    | NotificationRuleAdministrationGetNotificationRule200Response
    | NotificationRuleAdministrationGetNotificationRuleDefaultResponse
  >;
  /** Create or update operation template. */
  patch(
    options: NotificationRuleAdministrationCreateOrUpdateNotificationRuleParameters,
  ): StreamableMethod<
    | NotificationRuleAdministrationCreateOrUpdateNotificationRule200Response
    | NotificationRuleAdministrationCreateOrUpdateNotificationRule201Response
    | NotificationRuleAdministrationCreateOrUpdateNotificationRuleDefaultResponse
  >;
  /** Resource delete operation template. */
  delete(
    options?: NotificationRuleAdministrationDeleteNotificationRuleParameters,
  ): StreamableMethod<
    | NotificationRuleAdministrationDeleteNotificationRule204Response
    | NotificationRuleAdministrationDeleteNotificationRuleDefaultResponse
  >;
}

export interface NotificationRuleAdministrationListNotificationRule {
  /** Resource list operation template. */
  get(
    options?: NotificationRuleAdministrationListNotificationRuleParameters,
  ): StreamableMethod<
    | NotificationRuleAdministrationListNotificationRule200Response
    | NotificationRuleAdministrationListNotificationRuleDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/tests/\{testId\}' has methods for the following verbs: patch, delete, get */
  (
    path: "/tests/{testId}",
    testId: string,
  ): LoadTestAdministrationCreateOrUpdateTest;
  /** Resource for '/tests' has methods for the following verbs: get */
  (path: "/tests"): LoadTestAdministrationListTests;
  /** Resource for '/tests/\{testId\}/files/\{fileName\}' has methods for the following verbs: put, get, delete */
  (
    path: "/tests/{testId}/files/{fileName}",
    testId: string,
    fileName: string,
  ): LoadTestAdministrationUploadTestFile;
  /** Resource for '/tests/\{testId\}/files' has methods for the following verbs: get */
  (
    path: "/tests/{testId}/files",
    testId: string,
  ): LoadTestAdministrationListTestFiles;
  /** Resource for '/tests/\{testId\}/app-components' has methods for the following verbs: patch, get */
  (
    path: "/tests/{testId}/app-components",
    testId: string,
  ): LoadTestAdministrationCreateOrUpdateAppComponents;
  /** Resource for '/tests/\{testId\}/server-metrics-config' has methods for the following verbs: patch, get */
  (
    path: "/tests/{testId}/server-metrics-config",
    testId: string,
  ): LoadTestAdministrationCreateOrUpdateServerMetricsConfig;
  /** Resource for '/test-profiles/\{testProfileId\}' has methods for the following verbs: patch, delete, get */
  (
    path: "/test-profiles/{testProfileId}",
    testProfileId: string,
  ): TestProfileAdministrationCreateOrUpdateTestProfile;
  /** Resource for '/test-profiles' has methods for the following verbs: get */
  (path: "/test-profiles"): TestProfileAdministrationListTestProfiles;
  /** Resource for '/test-runs/\{testRunId\}' has methods for the following verbs: get, patch, delete */
  (path: "/test-runs/{testRunId}", testRunId: string): LoadTestRunGetTestRun;
  /** Resource for '/test-runs' has methods for the following verbs: get */
  (path: "/test-runs"): LoadTestRunListTestRuns;
  /** Resource for '/test-runs/\{testRunId\}/files/\{fileName\}' has methods for the following verbs: get */
  (
    path: "/test-runs/{testRunId}/files/{fileName}",
    testRunId: string,
    fileName: string,
  ): LoadTestRunGetTestRunFile;
  /** Resource for '/test-runs/\{testRunId\}:stop' has methods for the following verbs: post */
  (path: "/test-runs/{testRunId}:stop", testRunId: string): LoadTestRunStop;
  /** Resource for '/test-runs/\{testRunId\}/metric-namespaces' has methods for the following verbs: get */
  (
    path: "/test-runs/{testRunId}/metric-namespaces",
    testRunId: string,
  ): LoadTestRunListMetricNamespaces;
  /** Resource for '/test-runs/\{testRunId\}/metric-definitions' has methods for the following verbs: get */
  (
    path: "/test-runs/{testRunId}/metric-definitions",
    testRunId: string,
  ): LoadTestRunListMetricDefinitions;
  /** Resource for '/test-runs/\{testRunId\}/metrics' has methods for the following verbs: post */
  (
    path: "/test-runs/{testRunId}/metrics",
    testRunId: string,
  ): LoadTestRunListMetrics;
  /** Resource for '/test-runs/\{testRunId\}/metric-dimensions/\{name\}/values' has methods for the following verbs: get */
  (
    path: "/test-runs/{testRunId}/metric-dimensions/{name}/values",
    testRunId: string,
    name: string,
  ): LoadTestRunListMetricDimensionValues;
  /** Resource for '/test-runs/\{testRunId\}/app-components' has methods for the following verbs: patch, get */
  (
    path: "/test-runs/{testRunId}/app-components",
    testRunId: string,
  ): LoadTestRunCreateOrUpdateAppComponents;
  /** Resource for '/test-runs/\{testRunId\}/server-metrics-config' has methods for the following verbs: patch, get */
  (
    path: "/test-runs/{testRunId}/server-metrics-config",
    testRunId: string,
  ): LoadTestRunCreateOrUpdateServerMetricsConfig;
  /** Resource for '/test-profile-runs/\{testProfileRunId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/test-profile-runs/{testProfileRunId}",
    testProfileRunId: string,
  ): TestProfileRunAdministrationGetTestProfileRun;
  /** Resource for '/test-profile-runs/\{testProfileRunId\}:stop' has methods for the following verbs: post */
  (
    path: "/test-profile-runs/{testProfileRunId}:stop",
    testProfileRunId: string,
  ): TestProfileRunAdministrationStop;
  /** Resource for '/test-profile-runs' has methods for the following verbs: get */
  (path: "/test-profile-runs"): TestProfileRunAdministrationListTestProfileRuns;
  /** Resource for '/triggers/\{triggerId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/triggers/{triggerId}",
    triggerId: string,
  ): TriggerAdministrationGetTrigger;
  /** Resource for '/triggers' has methods for the following verbs: get */
  (path: "/triggers"): TriggerAdministrationListTrigger;
  /** Resource for '/notification-rules/\{notificationRuleId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/notification-rules/{notificationRuleId}",
    notificationRuleId: string,
  ): NotificationRuleAdministrationGetNotificationRule;
  /** Resource for '/notification-rules' has methods for the following verbs: get */
  (
    path: "/notification-rules",
  ): NotificationRuleAdministrationListNotificationRule;
}

export type AzureLoadTestingClient = Client & {
  path: Routes;
};
