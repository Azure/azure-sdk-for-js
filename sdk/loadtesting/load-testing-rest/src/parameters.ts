// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  Test,
  TestAppComponents,
  TestServerMetricConfig,
  TestRun,
  MetricRequestPayload,
  TestRunAppComponents,
  TestRunServerMetricConfig,
} from "./models";

/** Load test model */
export type TestResourceMergeAndPatch = Partial<Test>;

export interface LoadTestAdministrationOperationsCreateOrUpdateTestBodyParam {
  /** Load test model */
  body: TestResourceMergeAndPatch;
}

export interface LoadTestAdministrationOperationsCreateOrUpdateTestMediaTypesParam {
  contentType: "application/merge-patch+json";
}

export type LoadTestAdministrationOperationsCreateOrUpdateTestParameters =
  LoadTestAdministrationOperationsCreateOrUpdateTestMediaTypesParam &
    LoadTestAdministrationOperationsCreateOrUpdateTestBodyParam &
    RequestParameters;
export type LoadTestAdministrationOperationsDeleteTestParameters = RequestParameters;
export type LoadTestAdministrationOperationsGetTestParameters = RequestParameters;

export interface LoadTestAdministrationOperationsListTestsQueryParamProperties {
  /**
   * Sort on the supported fields in (field asc/desc) format. eg:
   * lastModifiedDateTime asc. Supported fields - lastModifiedDateTime
   */
  orderby?: string;
  /**
   * Prefix based, case sensitive search on searchable fields - displayName,
   * createdBy. For example, to search for a test, with display name is Login Test,
   * the search parameter can be Login.
   */
  search?: string;
  /**
   * Start DateTime(ISO 8601 literal format) of the last updated time range to
   * filter tests.
   */
  lastModifiedStartTime?: string;
  /**
   * End DateTime(ISO 8601 literal format) of the last updated time range to filter
   * tests.
   */
  lastModifiedEndTime?: string;
  /** Number of results in response. */
  maxpagesize?: number;
}

export interface LoadTestAdministrationOperationsListTestsQueryParam {
  queryParameters?: LoadTestAdministrationOperationsListTestsQueryParamProperties;
}

export type LoadTestAdministrationOperationsListTestsParameters =
  LoadTestAdministrationOperationsListTestsQueryParam & RequestParameters;

export interface LoadTestAdministrationOperationsUploadTestFileBodyParam {
  /** The file content as application/octet-stream. */
  body: string;
}

export interface LoadTestAdministrationOperationsUploadTestFileQueryParamProperties {
  /**
   * File type
   *
   * Possible values: JMX_FILE, USER_PROPERTIES, ADDITIONAL_ARTIFACTS
   */
  fileType?: string;
}

export interface LoadTestAdministrationOperationsUploadTestFileQueryParam {
  queryParameters?: LoadTestAdministrationOperationsUploadTestFileQueryParamProperties;
}

export type LoadTestAdministrationOperationsUploadTestFileParameters =
  LoadTestAdministrationOperationsUploadTestFileQueryParam &
    LoadTestAdministrationOperationsUploadTestFileBodyParam &
    RequestParameters;
export type LoadTestAdministrationOperationsGetTestFileParameters = RequestParameters;
export type LoadTestAdministrationOperationsDeleteTestFileParameters = RequestParameters;
export type LoadTestAdministrationOperationsListTestFilesParameters = RequestParameters;
/** App Component model. */
export type TestAppComponentsResourceMergeAndPatch = Partial<TestAppComponents>;

export interface LoadTestAdministrationOperationsCreateOrUpdateAppComponentsBodyParam {
  /** App Component model. */
  body: TestAppComponentsResourceMergeAndPatch;
}

export interface LoadTestAdministrationOperationsCreateOrUpdateAppComponentsMediaTypesParam {
  contentType: "application/merge-patch+json";
}

export type LoadTestAdministrationOperationsCreateOrUpdateAppComponentsParameters =
  LoadTestAdministrationOperationsCreateOrUpdateAppComponentsMediaTypesParam &
    LoadTestAdministrationOperationsCreateOrUpdateAppComponentsBodyParam &
    RequestParameters;
export type LoadTestAdministrationOperationsGetAppComponentsParameters = RequestParameters;
/** Server metric configuration model. */
export type TestServerMetricConfigResourceMergeAndPatch = Partial<TestServerMetricConfig>;

export interface LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfigBodyParam {
  /** Server metric configuration model. */
  body: TestServerMetricConfigResourceMergeAndPatch;
}

export interface LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfigMediaTypesParam {
  contentType: "application/merge-patch+json";
}

export type LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfigParameters =
  LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfigMediaTypesParam &
    LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfigBodyParam &
    RequestParameters;
export type LoadTestAdministrationOperationsGetServerMetricsConfigParameters = RequestParameters;
export type LoadTestRunOperationsGetTestRunParameters = RequestParameters;
/** The resource instance. */
export type TestRunResourceMergeAndPatch = Partial<TestRun>;

export interface LoadTestRunOperationsCreateOrUpdateTestRunBodyParam {
  /** The resource instance. */
  body: TestRunResourceMergeAndPatch;
}

export interface LoadTestRunOperationsCreateOrUpdateTestRunQueryParamProperties {
  /**
   * Existing test run identifier that should be rerun, if this is provided, the
   * test will run with the JMX file, configuration and app components from the
   * existing test run. You can override the configuration values for new test run
   * in the request body.
   */
  oldTestRunId?: string;
}

export interface LoadTestRunOperationsCreateOrUpdateTestRunQueryParam {
  queryParameters?: LoadTestRunOperationsCreateOrUpdateTestRunQueryParamProperties;
}

export interface LoadTestRunOperationsCreateOrUpdateTestRunMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type LoadTestRunOperationsCreateOrUpdateTestRunParameters =
  LoadTestRunOperationsCreateOrUpdateTestRunQueryParam &
    LoadTestRunOperationsCreateOrUpdateTestRunMediaTypesParam &
    LoadTestRunOperationsCreateOrUpdateTestRunBodyParam &
    RequestParameters;
export type LoadTestRunOperationsDeleteTestRunParameters = RequestParameters;
export type LoadTestRunOperationsGetTestRunFileParameters = RequestParameters;

export interface LoadTestRunOperationsListTestRunsQueryParamProperties {
  /**
   * Sort on the supported fields in (field asc/desc) format. eg: executedDateTime
   * asc. Supported fields - executedDateTime
   */
  orderby?: string;
  /**
   * Prefix based, case sensitive search on searchable fields - description,
   * executedUser. For example, to search for a test run, with description 500 VUs,
   * the search parameter can be 500.
   */
  search?: string;
  /** Unique name of an existing load test. */
  testId?: string;
  /** Start DateTime(ISO 8601 literal format) of test-run execution time filter range. */
  executionFrom?: string;
  /** End DateTime(ISO 8601 literal format) of test-run execution time filter range. */
  executionTo?: string;
  /** Comma separated list of test run status. */
  status?: string;
  /** Number of results in response. */
  maxpagesize?: number;
}

export interface LoadTestRunOperationsListTestRunsQueryParam {
  queryParameters?: LoadTestRunOperationsListTestRunsQueryParamProperties;
}

export type LoadTestRunOperationsListTestRunsParameters =
  LoadTestRunOperationsListTestRunsQueryParam & RequestParameters;
export type LoadTestRunOperationsStopTestRunParameters = RequestParameters;
export type LoadTestRunOperationsListMetricNamespacesParameters = RequestParameters;

export interface LoadTestRunOperationsListMetricDefinitionsQueryParamProperties {
  /** Metric namespace to query metric definitions for. */
  metricNamespace?: string;
}

export interface LoadTestRunOperationsListMetricDefinitionsQueryParam {
  queryParameters?: LoadTestRunOperationsListMetricDefinitionsQueryParamProperties;
}

export type LoadTestRunOperationsListMetricDefinitionsParameters =
  LoadTestRunOperationsListMetricDefinitionsQueryParam & RequestParameters;

export interface LoadTestRunOperationsListMetricsBodyParam {
  /** Metric dimension filter */
  body: MetricRequestPayload;
}

export interface LoadTestRunOperationsListMetricsQueryParamProperties {
  /** The aggregation */
  aggregation?: string;
  /**
   * The interval (i.e. timegrain) of the query.
   *
   * Possible values: PT5S, PT10S, PT1M, PT5M, PT1H
   */
  interval?: string;
  /** Metric name */
  metricName?: string;
  /** Metric namespace to query metric definitions for. */
  metricNamespace?: string;
  /**
   * The timespan of the query. It is a string with the following format
   * 'startDateTime_ISO/endDateTime_ISO'.
   */
  timespan?: string;
}

export interface LoadTestRunOperationsListMetricsQueryParam {
  queryParameters?: LoadTestRunOperationsListMetricsQueryParamProperties;
}

export type LoadTestRunOperationsListMetricsParameters =
  LoadTestRunOperationsListMetricsQueryParam &
    LoadTestRunOperationsListMetricsBodyParam &
    RequestParameters;
/** App Component model. */
export type TestRunAppComponentsResourceMergeAndPatch = Partial<TestRunAppComponents>;

export interface LoadTestRunOperationsCreateOrUpdateAppComponentsBodyParam {
  /** App Component model. */
  body: TestRunAppComponentsResourceMergeAndPatch;
}

export interface LoadTestRunOperationsCreateOrUpdateAppComponentsMediaTypesParam {
  contentType: "application/merge-patch+json";
}

export type LoadTestRunOperationsCreateOrUpdateAppComponentsParameters =
  LoadTestRunOperationsCreateOrUpdateAppComponentsMediaTypesParam &
    LoadTestRunOperationsCreateOrUpdateAppComponentsBodyParam &
    RequestParameters;
export type LoadTestRunOperationsGetAppComponentsParameters = RequestParameters;
/** Server metric configuration model. */
export type TestRunServerMetricConfigResourceMergeAndPatch = Partial<TestRunServerMetricConfig>;

export interface LoadTestRunOperationsCreateOrUpdateServerMetricsConfigBodyParam {
  /** Server metric configuration model. */
  body: TestRunServerMetricConfigResourceMergeAndPatch;
}

export interface LoadTestRunOperationsCreateOrUpdateServerMetricsConfigMediaTypesParam {
  contentType: "application/merge-patch+json";
}

export type LoadTestRunOperationsCreateOrUpdateServerMetricsConfigParameters =
  LoadTestRunOperationsCreateOrUpdateServerMetricsConfigMediaTypesParam &
    LoadTestRunOperationsCreateOrUpdateServerMetricsConfigBodyParam &
    RequestParameters;
export type LoadTestRunOperationsGetServerMetricsConfigParameters = RequestParameters;
