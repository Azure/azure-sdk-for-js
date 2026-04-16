// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import type {
  OperationStatusOutput,
  TestOutput,
  PagedTestOutput,
  ResourceOperationStatusTestErrorOutput,
  TestFileInfoOutput,
  PagedTestFileInfoOutput,
  TestAppComponentsOutput,
  TestServerMetricsConfigurationOutput,
  TestProfileOutput,
  PagedTestProfileOutput,
  TriggerOutput,
  PagedTriggerOutput,
  NotificationRuleOutput,
  PagedNotificationRuleOutput,
  TestRunOutput,
  PagedTestRunOutput,
  TestRunFileInfoOutput,
  TestRunInsightsOutput,
  MetricNamespaceCollectionOutput,
  MetricDefinitionCollectionOutput,
  MetricsOutput,
  DimensionValueListOutput,
  TestRunAppComponentsOutput,
  TestRunServerMetricsConfigurationOutput,
  TestProfileRunOutput,
  PagedTestProfileRunOutput,
} from "./outputModels.js";

/** The request has succeeded. */
export interface OperationsGetStatus200Response extends HttpResponse {
  status: "200";
  body: OperationStatusOutput;
}

export interface OperationsGetStatusDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface OperationsGetStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & OperationsGetStatusDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestAdministrationCreateOrUpdateTest200Response extends HttpResponse {
  status: "200";
  body: TestOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface LoadTestAdministrationCreateOrUpdateTest201Response extends HttpResponse {
  status: "201";
  body: TestOutput;
}

export interface LoadTestAdministrationCreateOrUpdateTestDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationCreateOrUpdateTestDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationCreateOrUpdateTestDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface LoadTestAdministrationDeleteTest204Response extends HttpResponse {
  status: "204";
}

export interface LoadTestAdministrationDeleteTestDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationDeleteTestDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationDeleteTestDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestAdministrationGetTest200Response extends HttpResponse {
  status: "200";
  body: TestOutput;
}

export interface LoadTestAdministrationGetTestDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationGetTestDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationGetTestDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestAdministrationListTests200Response extends HttpResponse {
  status: "200";
  body: PagedTestOutput;
}

export interface LoadTestAdministrationListTestsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationListTestsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationListTestsDefaultHeaders;
}

export interface LoadTestAdministrationCloneTest202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface LoadTestAdministrationCloneTest202Response extends HttpResponse {
  status: "202";
  body: ResourceOperationStatusTestErrorOutput;
  headers: RawHttpHeaders & LoadTestAdministrationCloneTest202Headers;
}

export interface LoadTestAdministrationCloneTestDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationCloneTestDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationCloneTestDefaultHeaders;
}

/** The final response for long-running cloneTest operation */
export interface LoadTestAdministrationCloneTestLogicalResponse extends HttpResponse {
  status: "200";
  body: ResourceOperationStatusTestErrorOutput;
}

export interface LoadTestAdministrationGenerateTestPlanRecommendations202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface LoadTestAdministrationGenerateTestPlanRecommendations202Response extends HttpResponse {
  status: "202";
  body: ResourceOperationStatusTestErrorOutput;
  headers: RawHttpHeaders & LoadTestAdministrationGenerateTestPlanRecommendations202Headers;
}

export interface LoadTestAdministrationGenerateTestPlanRecommendationsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationGenerateTestPlanRecommendationsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationGenerateTestPlanRecommendationsDefaultHeaders;
}

/** The final response for long-running generateTestPlanRecommendations operation */
export interface LoadTestAdministrationGenerateTestPlanRecommendationsLogicalResponse extends HttpResponse {
  status: "200";
  body: ResourceOperationStatusTestErrorOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface LoadTestAdministrationUploadTestFile201Response extends HttpResponse {
  status: "201";
  body: TestFileInfoOutput;
}

export interface LoadTestAdministrationUploadTestFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationUploadTestFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationUploadTestFileDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestAdministrationGetTestFile200Response extends HttpResponse {
  status: "200";
  body: TestFileInfoOutput;
}

export interface LoadTestAdministrationGetTestFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationGetTestFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationGetTestFileDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface LoadTestAdministrationDeleteTestFile204Response extends HttpResponse {
  status: "204";
}

export interface LoadTestAdministrationDeleteTestFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationDeleteTestFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationDeleteTestFileDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestAdministrationListTestFiles200Response extends HttpResponse {
  status: "200";
  body: PagedTestFileInfoOutput;
}

export interface LoadTestAdministrationListTestFilesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationListTestFilesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationListTestFilesDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestAdministrationCreateOrUpdateAppComponents200Response extends HttpResponse {
  status: "200";
  body: TestAppComponentsOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface LoadTestAdministrationCreateOrUpdateAppComponents201Response extends HttpResponse {
  status: "201";
  body: TestAppComponentsOutput;
}

export interface LoadTestAdministrationCreateOrUpdateAppComponentsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationCreateOrUpdateAppComponentsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationCreateOrUpdateAppComponentsDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestAdministrationGetAppComponents200Response extends HttpResponse {
  status: "200";
  body: TestAppComponentsOutput;
}

export interface LoadTestAdministrationGetAppComponentsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationGetAppComponentsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationGetAppComponentsDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestAdministrationCreateOrUpdateServerMetricsConfig200Response extends HttpResponse {
  status: "200";
  body: TestServerMetricsConfigurationOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface LoadTestAdministrationCreateOrUpdateServerMetricsConfig201Response extends HttpResponse {
  status: "201";
  body: TestServerMetricsConfigurationOutput;
}

export interface LoadTestAdministrationCreateOrUpdateServerMetricsConfigDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationCreateOrUpdateServerMetricsConfigDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationCreateOrUpdateServerMetricsConfigDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestAdministrationGetServerMetricsConfig200Response extends HttpResponse {
  status: "200";
  body: TestServerMetricsConfigurationOutput;
}

export interface LoadTestAdministrationGetServerMetricsConfigDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationGetServerMetricsConfigDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationGetServerMetricsConfigDefaultHeaders;
}

/** The request has succeeded. */
export interface TestProfileAdministrationCreateOrUpdateTestProfile200Response extends HttpResponse {
  status: "200";
  body: TestProfileOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface TestProfileAdministrationCreateOrUpdateTestProfile201Response extends HttpResponse {
  status: "201";
  body: TestProfileOutput;
}

export interface TestProfileAdministrationCreateOrUpdateTestProfileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestProfileAdministrationCreateOrUpdateTestProfileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestProfileAdministrationCreateOrUpdateTestProfileDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface TestProfileAdministrationDeleteTestProfile204Response extends HttpResponse {
  status: "204";
}

export interface TestProfileAdministrationDeleteTestProfileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestProfileAdministrationDeleteTestProfileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestProfileAdministrationDeleteTestProfileDefaultHeaders;
}

/** The request has succeeded. */
export interface TestProfileAdministrationGetTestProfile200Response extends HttpResponse {
  status: "200";
  body: TestProfileOutput;
}

export interface TestProfileAdministrationGetTestProfileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestProfileAdministrationGetTestProfileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestProfileAdministrationGetTestProfileDefaultHeaders;
}

/** The request has succeeded. */
export interface TestProfileAdministrationListTestProfiles200Response extends HttpResponse {
  status: "200";
  body: PagedTestProfileOutput;
}

export interface TestProfileAdministrationListTestProfilesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestProfileAdministrationListTestProfilesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestProfileAdministrationListTestProfilesDefaultHeaders;
}

/** The request has succeeded. */
export interface TriggerAdministrationGetTrigger200Response extends HttpResponse {
  status: "200";
  body: TriggerOutput;
}

export interface TriggerAdministrationGetTriggerDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TriggerAdministrationGetTriggerDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TriggerAdministrationGetTriggerDefaultHeaders;
}

/** The request has succeeded. */
export interface TriggerAdministrationCreateOrUpdateTrigger200Response extends HttpResponse {
  status: "200";
  body: TriggerOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface TriggerAdministrationCreateOrUpdateTrigger201Response extends HttpResponse {
  status: "201";
  body: TriggerOutput;
}

export interface TriggerAdministrationCreateOrUpdateTriggerDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TriggerAdministrationCreateOrUpdateTriggerDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TriggerAdministrationCreateOrUpdateTriggerDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface TriggerAdministrationDeleteTrigger204Response extends HttpResponse {
  status: "204";
}

export interface TriggerAdministrationDeleteTriggerDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TriggerAdministrationDeleteTriggerDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TriggerAdministrationDeleteTriggerDefaultHeaders;
}

/** The request has succeeded. */
export interface TriggerAdministrationListTrigger200Response extends HttpResponse {
  status: "200";
  body: PagedTriggerOutput;
}

export interface TriggerAdministrationListTriggerDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TriggerAdministrationListTriggerDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TriggerAdministrationListTriggerDefaultHeaders;
}

/** The request has succeeded. */
export interface NotificationRuleAdministrationGetNotificationRule200Response extends HttpResponse {
  status: "200";
  body: NotificationRuleOutput;
}

export interface NotificationRuleAdministrationGetNotificationRuleDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface NotificationRuleAdministrationGetNotificationRuleDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & NotificationRuleAdministrationGetNotificationRuleDefaultHeaders;
}

/** The request has succeeded. */
export interface NotificationRuleAdministrationCreateOrUpdateNotificationRule200Response extends HttpResponse {
  status: "200";
  body: NotificationRuleOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface NotificationRuleAdministrationCreateOrUpdateNotificationRule201Response extends HttpResponse {
  status: "201";
  body: NotificationRuleOutput;
}

export interface NotificationRuleAdministrationCreateOrUpdateNotificationRuleDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface NotificationRuleAdministrationCreateOrUpdateNotificationRuleDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    NotificationRuleAdministrationCreateOrUpdateNotificationRuleDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface NotificationRuleAdministrationDeleteNotificationRule204Response extends HttpResponse {
  status: "204";
}

export interface NotificationRuleAdministrationDeleteNotificationRuleDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface NotificationRuleAdministrationDeleteNotificationRuleDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & NotificationRuleAdministrationDeleteNotificationRuleDefaultHeaders;
}

/** The request has succeeded. */
export interface NotificationRuleAdministrationListNotificationRule200Response extends HttpResponse {
  status: "200";
  body: PagedNotificationRuleOutput;
}

export interface NotificationRuleAdministrationListNotificationRuleDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface NotificationRuleAdministrationListNotificationRuleDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & NotificationRuleAdministrationListNotificationRuleDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunGetTestRun200Response extends HttpResponse {
  status: "200";
  body: TestRunOutput;
}

export interface LoadTestRunGetTestRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunGetTestRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunGetTestRunDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunCreateOrUpdateTestRun200Response extends HttpResponse {
  status: "200";
  body: TestRunOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface LoadTestRunCreateOrUpdateTestRun201Response extends HttpResponse {
  status: "201";
  body: TestRunOutput;
}

export interface LoadTestRunCreateOrUpdateTestRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunCreateOrUpdateTestRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunCreateOrUpdateTestRunDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface LoadTestRunDeleteTestRun204Response extends HttpResponse {
  status: "204";
}

export interface LoadTestRunDeleteTestRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunDeleteTestRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunDeleteTestRunDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunListTestRuns200Response extends HttpResponse {
  status: "200";
  body: PagedTestRunOutput;
}

export interface LoadTestRunListTestRunsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunListTestRunsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunListTestRunsDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunGetTestRunFile200Response extends HttpResponse {
  status: "200";
  body: TestRunFileInfoOutput;
}

export interface LoadTestRunGetTestRunFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunGetTestRunFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunGetTestRunFileDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunStop200Response extends HttpResponse {
  status: "200";
  body: TestRunOutput;
}

export interface LoadTestRunStopDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunStopDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunStopDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunGetLatestInsights200Response extends HttpResponse {
  status: "200";
  body: TestRunInsightsOutput;
}

export interface LoadTestRunGetLatestInsightsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunGetLatestInsightsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunGetLatestInsightsDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunUpdateLatestInsights200Response extends HttpResponse {
  status: "200";
  body: TestRunInsightsOutput;
}

export interface LoadTestRunUpdateLatestInsightsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunUpdateLatestInsightsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunUpdateLatestInsightsDefaultHeaders;
}

export interface LoadTestRunGenerateInsights202Headers {
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface LoadTestRunGenerateInsights202Response extends HttpResponse {
  status: "202";
  body: OperationStatusOutput;
  headers: RawHttpHeaders & LoadTestRunGenerateInsights202Headers;
}

export interface LoadTestRunGenerateInsightsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunGenerateInsightsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunGenerateInsightsDefaultHeaders;
}

/** The final response for long-running generateInsights operation */
export interface LoadTestRunGenerateInsightsLogicalResponse extends HttpResponse {
  status: "200";
  body: OperationStatusOutput;
}

/** The request has succeeded. */
export interface LoadTestRunListMetricNamespaces200Response extends HttpResponse {
  status: "200";
  body: MetricNamespaceCollectionOutput;
}

export interface LoadTestRunListMetricNamespacesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunListMetricNamespacesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunListMetricNamespacesDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunListMetricDefinitions200Response extends HttpResponse {
  status: "200";
  body: MetricDefinitionCollectionOutput;
}

export interface LoadTestRunListMetricDefinitionsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunListMetricDefinitionsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunListMetricDefinitionsDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunListMetrics200Response extends HttpResponse {
  status: "200";
  body: MetricsOutput;
}

export interface LoadTestRunListMetricsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunListMetricsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunListMetricsDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunListMetricDimensionValues200Response extends HttpResponse {
  status: "200";
  body: DimensionValueListOutput;
}

export interface LoadTestRunListMetricDimensionValuesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunListMetricDimensionValuesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunListMetricDimensionValuesDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunCreateOrUpdateAppComponents200Response extends HttpResponse {
  status: "200";
  body: TestRunAppComponentsOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface LoadTestRunCreateOrUpdateAppComponents201Response extends HttpResponse {
  status: "201";
  body: TestRunAppComponentsOutput;
}

export interface LoadTestRunCreateOrUpdateAppComponentsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunCreateOrUpdateAppComponentsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunCreateOrUpdateAppComponentsDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunGetAppComponents200Response extends HttpResponse {
  status: "200";
  body: TestRunAppComponentsOutput;
}

export interface LoadTestRunGetAppComponentsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunGetAppComponentsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunGetAppComponentsDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunCreateOrUpdateServerMetricsConfig200Response extends HttpResponse {
  status: "200";
  body: TestRunServerMetricsConfigurationOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface LoadTestRunCreateOrUpdateServerMetricsConfig201Response extends HttpResponse {
  status: "201";
  body: TestRunServerMetricsConfigurationOutput;
}

export interface LoadTestRunCreateOrUpdateServerMetricsConfigDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunCreateOrUpdateServerMetricsConfigDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunCreateOrUpdateServerMetricsConfigDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunGetServerMetricsConfig200Response extends HttpResponse {
  status: "200";
  body: TestRunServerMetricsConfigurationOutput;
}

export interface LoadTestRunGetServerMetricsConfigDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunGetServerMetricsConfigDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunGetServerMetricsConfigDefaultHeaders;
}

/** The request has succeeded. */
export interface TestProfileRunAdministrationGetTestProfileRun200Response extends HttpResponse {
  status: "200";
  body: TestProfileRunOutput;
}

export interface TestProfileRunAdministrationGetTestProfileRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestProfileRunAdministrationGetTestProfileRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestProfileRunAdministrationGetTestProfileRunDefaultHeaders;
}

/** The request has succeeded. */
export interface TestProfileRunAdministrationCreateOrUpdateTestProfileRun200Response extends HttpResponse {
  status: "200";
  body: TestProfileRunOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface TestProfileRunAdministrationCreateOrUpdateTestProfileRun201Response extends HttpResponse {
  status: "201";
  body: TestProfileRunOutput;
}

export interface TestProfileRunAdministrationCreateOrUpdateTestProfileRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestProfileRunAdministrationCreateOrUpdateTestProfileRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestProfileRunAdministrationCreateOrUpdateTestProfileRunDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface TestProfileRunAdministrationDeleteTestProfileRun204Response extends HttpResponse {
  status: "204";
}

export interface TestProfileRunAdministrationDeleteTestProfileRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestProfileRunAdministrationDeleteTestProfileRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestProfileRunAdministrationDeleteTestProfileRunDefaultHeaders;
}

/** The request has succeeded. */
export interface TestProfileRunAdministrationStop200Response extends HttpResponse {
  status: "200";
  body: TestProfileRunOutput;
}

export interface TestProfileRunAdministrationStopDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestProfileRunAdministrationStopDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestProfileRunAdministrationStopDefaultHeaders;
}

/** The request has succeeded. */
export interface TestProfileRunAdministrationListTestProfileRuns200Response extends HttpResponse {
  status: "200";
  body: PagedTestProfileRunOutput;
}

export interface TestProfileRunAdministrationListTestProfileRunsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TestProfileRunAdministrationListTestProfileRunsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TestProfileRunAdministrationListTestProfileRunsDefaultHeaders;
}
