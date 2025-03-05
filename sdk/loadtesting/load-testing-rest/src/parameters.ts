// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RequestParameters } from "@azure-rest/core-client";
import type {
  Test,
  FileType,
  TestAppComponents,
  TestServerMetricsConfiguration,
  TestProfile,
  TestRun,
  TimeGrain,
  MetricRequestPayload,
  TestRunAppComponents,
  TestRunServerMetricsConfiguration,
  TestProfileRun,
  Trigger,
  TriggerState,
  NotificationRule,
} from "./models.js";

/** The resource instance. */
export type TestResourceMergeAndPatch = Partial<Test>;

export interface LoadTestAdministrationCreateOrUpdateTestBodyParam {
  /** The resource instance. */
  body: TestResourceMergeAndPatch;
}

export interface LoadTestAdministrationCreateOrUpdateTestMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type LoadTestAdministrationCreateOrUpdateTestParameters =
  LoadTestAdministrationCreateOrUpdateTestMediaTypesParam &
    LoadTestAdministrationCreateOrUpdateTestBodyParam &
    RequestParameters;
export type LoadTestAdministrationDeleteTestParameters = RequestParameters;
export type LoadTestAdministrationGetTestParameters = RequestParameters;

export interface LoadTestAdministrationListTestsQueryParamProperties {
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
  /** Start DateTime(RFC 3339 literal format) of the last updated time range to filter tests. */
  lastModifiedStartTime?: Date | string;
  /** End DateTime(RFC 3339 literal format) of the last updated time range to filter tests. */
  lastModifiedEndTime?: Date | string;
  /** Number of results in response. */
  maxpagesize?: number;
}

export interface LoadTestAdministrationListTestsQueryParam {
  queryParameters?: LoadTestAdministrationListTestsQueryParamProperties;
}

export type LoadTestAdministrationListTestsParameters =
  LoadTestAdministrationListTestsQueryParam & RequestParameters;

export interface LoadTestAdministrationUploadTestFileBodyParam {
  /**
   * The file content as application/octet-stream.
   *
   * Value may contain any sequence of octets
   */
  body:
    | string
    | Uint8Array
    | ReadableStream<Uint8Array>
    | NodeJS.ReadableStream;
}

export interface LoadTestAdministrationUploadTestFileQueryParamProperties {
  /**
   * File type
   *
   * Possible values: "JMX_FILE", "USER_PROPERTIES", "ADDITIONAL_ARTIFACTS", "ZIPPED_ARTIFACTS", "URL_TEST_CONFIG", "TEST_SCRIPT"
   */
  fileType?: FileType;
}

export interface LoadTestAdministrationUploadTestFileQueryParam {
  queryParameters?: LoadTestAdministrationUploadTestFileQueryParamProperties;
}

export interface LoadTestAdministrationUploadTestFileMediaTypesParam {
  /** Content type. */
  contentType: "application/octet-stream";
}

export type LoadTestAdministrationUploadTestFileParameters =
  LoadTestAdministrationUploadTestFileQueryParam &
    LoadTestAdministrationUploadTestFileMediaTypesParam &
    LoadTestAdministrationUploadTestFileBodyParam &
    RequestParameters;
export type LoadTestAdministrationGetTestFileParameters = RequestParameters;
export type LoadTestAdministrationDeleteTestFileParameters = RequestParameters;
export type LoadTestAdministrationListTestFilesParameters = RequestParameters;
/** App Component model. */
export type TestAppComponentsResourceMergeAndPatch = Partial<TestAppComponents>;

export interface LoadTestAdministrationCreateOrUpdateAppComponentsBodyParam {
  /** App Component model. */
  body: TestAppComponentsResourceMergeAndPatch;
}

export interface LoadTestAdministrationCreateOrUpdateAppComponentsMediaTypesParam {
  /** Content type. */
  contentType: "application/merge-patch+json";
}

export type LoadTestAdministrationCreateOrUpdateAppComponentsParameters =
  LoadTestAdministrationCreateOrUpdateAppComponentsMediaTypesParam &
    LoadTestAdministrationCreateOrUpdateAppComponentsBodyParam &
    RequestParameters;
export type LoadTestAdministrationGetAppComponentsParameters =
  RequestParameters;
/** Server metric configuration model. */
export type TestServerMetricsConfigurationResourceMergeAndPatch =
  Partial<TestServerMetricsConfiguration>;

export interface LoadTestAdministrationCreateOrUpdateServerMetricsConfigBodyParam {
  /** Server metric configuration model. */
  body: TestServerMetricsConfigurationResourceMergeAndPatch;
}

export interface LoadTestAdministrationCreateOrUpdateServerMetricsConfigMediaTypesParam {
  /** Content type. */
  contentType: "application/merge-patch+json";
}

export type LoadTestAdministrationCreateOrUpdateServerMetricsConfigParameters =
  LoadTestAdministrationCreateOrUpdateServerMetricsConfigMediaTypesParam &
    LoadTestAdministrationCreateOrUpdateServerMetricsConfigBodyParam &
    RequestParameters;
export type LoadTestAdministrationGetServerMetricsConfigParameters =
  RequestParameters;
/** The resource instance. */
export type TestProfileResourceMergeAndPatch = Partial<TestProfile>;

export interface TestProfileAdministrationCreateOrUpdateTestProfileBodyParam {
  /** The resource instance. */
  body: TestProfileResourceMergeAndPatch;
}

export interface TestProfileAdministrationCreateOrUpdateTestProfileMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type TestProfileAdministrationCreateOrUpdateTestProfileParameters =
  TestProfileAdministrationCreateOrUpdateTestProfileMediaTypesParam &
    TestProfileAdministrationCreateOrUpdateTestProfileBodyParam &
    RequestParameters;
export type TestProfileAdministrationDeleteTestProfileParameters =
  RequestParameters;
export type TestProfileAdministrationGetTestProfileParameters =
  RequestParameters;

/** This is the wrapper object for the parameter `testProfileIds` with explode set to false and style set to form. */
export interface TestProfileAdministrationListTestProfilesTestProfileIdsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `testIds` with explode set to false and style set to form. */
export interface TestProfileAdministrationListTestProfilesTestIdsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface TestProfileAdministrationListTestProfilesQueryParamProperties {
  /** Maximum number of results to include in a single response. */
  maxpagesize?: number;
  /** Start DateTime(RFC 3339 literal format) of the last updated time range to filter test profiles. */
  lastModifiedStartTime?: Date | string;
  /** End DateTime(RFC 3339 literal format) of the last updated time range to filter test profiles. */
  lastModifiedEndTime?: Date | string;
  /** Comma separated list of IDs of the test profiles to filter. */
  testProfileIds?:
    | string[]
    | TestProfileAdministrationListTestProfilesTestProfileIdsQueryParam;
  /** Comma separated list IDs of the tests which should be associated with the test profiles to fetch. */
  testIds?:
    | string[]
    | TestProfileAdministrationListTestProfilesTestIdsQueryParam;
}

export interface TestProfileAdministrationListTestProfilesQueryParam {
  queryParameters?: TestProfileAdministrationListTestProfilesQueryParamProperties;
}

export type TestProfileAdministrationListTestProfilesParameters =
  TestProfileAdministrationListTestProfilesQueryParam & RequestParameters;
export type LoadTestRunGetTestRunParameters = RequestParameters;
/** The resource instance. */
export type TestRunResourceMergeAndPatch = Partial<TestRun>;

export interface LoadTestRunCreateOrUpdateTestRunBodyParam {
  /** The resource instance. */
  body: TestRunResourceMergeAndPatch;
}

export interface LoadTestRunCreateOrUpdateTestRunQueryParamProperties {
  /**
   * Existing test run identifier that should be rerun, if this is provided, the
   * test will run with the JMX file, configuration and app components from the
   * existing test run. You can override the configuration values for new test run
   * in the request body.
   */
  oldTestRunId?: string;
}

export interface LoadTestRunCreateOrUpdateTestRunQueryParam {
  queryParameters?: LoadTestRunCreateOrUpdateTestRunQueryParamProperties;
}

export interface LoadTestRunCreateOrUpdateTestRunMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type LoadTestRunCreateOrUpdateTestRunParameters =
  LoadTestRunCreateOrUpdateTestRunQueryParam &
    LoadTestRunCreateOrUpdateTestRunMediaTypesParam &
    LoadTestRunCreateOrUpdateTestRunBodyParam &
    RequestParameters;
export type LoadTestRunDeleteTestRunParameters = RequestParameters;

export interface LoadTestRunListTestRunsQueryParamProperties {
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
  /** Start DateTime(RFC 3339 literal format) of test-run execution time filter range. */
  executionFrom?: Date | string;
  /** End DateTime(RFC 3339 literal format) of test-run execution time filter range. */
  executionTo?: Date | string;
  /** Comma separated list of test run status. */
  status?: string;
  /** Number of results in response. */
  maxpagesize?: number;
}

export interface LoadTestRunListTestRunsQueryParam {
  queryParameters?: LoadTestRunListTestRunsQueryParamProperties;
}

export type LoadTestRunListTestRunsParameters =
  LoadTestRunListTestRunsQueryParam & RequestParameters;
export type LoadTestRunGetTestRunFileParameters = RequestParameters;
export type LoadTestRunStopParameters = RequestParameters;
export type LoadTestRunListMetricNamespacesParameters = RequestParameters;

export interface LoadTestRunListMetricDefinitionsQueryParamProperties {
  /** Metric namespace to query metric definitions for. */
  metricNamespace: string;
}

export interface LoadTestRunListMetricDefinitionsQueryParam {
  queryParameters: LoadTestRunListMetricDefinitionsQueryParamProperties;
}

export type LoadTestRunListMetricDefinitionsParameters =
  LoadTestRunListMetricDefinitionsQueryParam & RequestParameters;

export interface LoadTestRunListMetricsBodyParam {
  /** Metric dimension filter */
  body?: MetricRequestPayload;
}

export interface LoadTestRunListMetricsQueryParamProperties {
  /** The aggregation */
  aggregation?: string;
  /** Metric name */
  metricname: string;
  /**
   * The interval (i.e. timegrain) of the query.
   *
   * Possible values: "PT5S", "PT10S", "PT1M", "PT5M", "PT1H"
   */
  interval?: TimeGrain;
  /** Metric namespace to query metric definitions for. */
  metricNamespace: string;
  /** The timespan of the query. It is a string with the following format 'startDateTime_ISO/endDateTime_ISO'. */
  timespan: string;
}

export interface LoadTestRunListMetricsQueryParam {
  queryParameters: LoadTestRunListMetricsQueryParamProperties;
}

export type LoadTestRunListMetricsParameters =
  LoadTestRunListMetricsQueryParam &
    LoadTestRunListMetricsBodyParam &
    RequestParameters;

export interface LoadTestRunListMetricDimensionValuesQueryParamProperties {
  /** Metric name */
  metricname: string;
  /**
   * The interval (i.e. timegrain) of the query.
   *
   * Possible values: "PT5S", "PT10S", "PT1M", "PT5M", "PT1H"
   */
  interval?: TimeGrain;
  /** Metric namespace to query metric definitions for. */
  metricNamespace: string;
  /** The timespan of the query. It is a string with the following format 'startDateTime_ISO/endDateTime_ISO'. */
  timespan: string;
}

export interface LoadTestRunListMetricDimensionValuesQueryParam {
  queryParameters: LoadTestRunListMetricDimensionValuesQueryParamProperties;
}

export type LoadTestRunListMetricDimensionValuesParameters =
  LoadTestRunListMetricDimensionValuesQueryParam & RequestParameters;
/** App Component model. */
export type TestRunAppComponentsResourceMergeAndPatch =
  Partial<TestRunAppComponents>;

export interface LoadTestRunCreateOrUpdateAppComponentsBodyParam {
  /** App Component model. */
  body: TestRunAppComponentsResourceMergeAndPatch;
}

export interface LoadTestRunCreateOrUpdateAppComponentsMediaTypesParam {
  /** Content type. */
  contentType: "application/merge-patch+json";
}

export type LoadTestRunCreateOrUpdateAppComponentsParameters =
  LoadTestRunCreateOrUpdateAppComponentsMediaTypesParam &
    LoadTestRunCreateOrUpdateAppComponentsBodyParam &
    RequestParameters;
export type LoadTestRunGetAppComponentsParameters = RequestParameters;
/** Server metric configuration model. */
export type TestRunServerMetricsConfigurationResourceMergeAndPatch =
  Partial<TestRunServerMetricsConfiguration>;

export interface LoadTestRunCreateOrUpdateServerMetricsConfigBodyParam {
  /** Server metric configuration model. */
  body: TestRunServerMetricsConfigurationResourceMergeAndPatch;
}

export interface LoadTestRunCreateOrUpdateServerMetricsConfigMediaTypesParam {
  /** Content type. */
  contentType: "application/merge-patch+json";
}

export type LoadTestRunCreateOrUpdateServerMetricsConfigParameters =
  LoadTestRunCreateOrUpdateServerMetricsConfigMediaTypesParam &
    LoadTestRunCreateOrUpdateServerMetricsConfigBodyParam &
    RequestParameters;
export type LoadTestRunGetServerMetricsConfigParameters = RequestParameters;
export type TestProfileRunAdministrationGetTestProfileRunParameters =
  RequestParameters;
/** The resource instance. */
export type TestProfileRunResourceMergeAndPatch = Partial<TestProfileRun>;

export interface TestProfileRunAdministrationCreateOrUpdateTestProfileRunBodyParam {
  /** The resource instance. */
  body: TestProfileRunResourceMergeAndPatch;
}

export interface TestProfileRunAdministrationCreateOrUpdateTestProfileRunMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type TestProfileRunAdministrationCreateOrUpdateTestProfileRunParameters =
  TestProfileRunAdministrationCreateOrUpdateTestProfileRunMediaTypesParam &
    TestProfileRunAdministrationCreateOrUpdateTestProfileRunBodyParam &
    RequestParameters;
export type TestProfileRunAdministrationDeleteTestProfileRunParameters =
  RequestParameters;
export type TestProfileRunAdministrationStopParameters = RequestParameters;

/** This is the wrapper object for the parameter `testProfileRunIds` with explode set to false and style set to form. */
export interface TestProfileRunAdministrationListTestProfileRunsTestProfileRunIdsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `testProfileIds` with explode set to false and style set to form. */
export interface TestProfileRunAdministrationListTestProfileRunsTestProfileIdsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `statuses` with explode set to false and style set to form. */
export interface TestProfileRunAdministrationListTestProfileRunsStatusesQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface TestProfileRunAdministrationListTestProfileRunsQueryParamProperties {
  /** Maximum number of results to include in a single response. */
  maxpagesize?: number;
  /** Minimum Start DateTime(RFC 3339 literal format) of the test profile runs to filter on. */
  minStartDateTime?: Date | string;
  /** Maximum Start DateTime(RFC 3339 literal format) of the test profile runs to filter on. */
  maxStartDateTime?: Date | string;
  /** Minimum End DateTime(RFC 3339 literal format) of the test profile runs to filter on. */
  minEndDateTime?: Date | string;
  /** Maximum End DateTime(RFC 3339 literal format) of the test profile runs to filter on. */
  maxEndDateTime?: Date | string;
  /** Start DateTime(RFC 3339 literal format) of the created time range to filter test profile runs. */
  createdDateStartTime?: Date | string;
  /** End DateTime(RFC 3339 literal format) of the created time range to filter test profile runs. */
  createdDateEndTime?: Date | string;
  /** Comma separated list of IDs of the test profile runs to filter. */
  testProfileRunIds?:
    | string[]
    | TestProfileRunAdministrationListTestProfileRunsTestProfileRunIdsQueryParam;
  /** Comma separated IDs of the test profiles which should be associated with the test profile runs to fetch. */
  testProfileIds?:
    | string[]
    | TestProfileRunAdministrationListTestProfileRunsTestProfileIdsQueryParam;
  /** Comma separated list of Statuses of the test profile runs to filter. */
  statuses?:
    | string[]
    | TestProfileRunAdministrationListTestProfileRunsStatusesQueryParam;
}

export interface TestProfileRunAdministrationListTestProfileRunsQueryParam {
  queryParameters?: TestProfileRunAdministrationListTestProfileRunsQueryParamProperties;
}

export type TestProfileRunAdministrationListTestProfileRunsParameters =
  TestProfileRunAdministrationListTestProfileRunsQueryParam & RequestParameters;
export type TriggerAdministrationGetTriggerParameters = RequestParameters;
/** The resource instance. */
export type TriggerResourceMergeAndPatch = Partial<Trigger>;

export interface TriggerAdministrationCreateOrUpdateTriggerBodyParam {
  /** The resource instance. */
  body: TriggerResourceMergeAndPatch;
}

export interface TriggerAdministrationCreateOrUpdateTriggerMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type TriggerAdministrationCreateOrUpdateTriggerParameters =
  TriggerAdministrationCreateOrUpdateTriggerMediaTypesParam &
    TriggerAdministrationCreateOrUpdateTriggerBodyParam &
    RequestParameters;
export type TriggerAdministrationDeleteTriggerParameters = RequestParameters;

export interface TriggerAdministrationListTriggerQueryParamProperties {
  /** Search based on triggers associated with the provided test ids. */
  testIds?: string;
  /**
   * Filter triggers based on a comma separated list of states.
   *
   * Possible values: "Active", "Paused", "Completed", "Disabled"
   */
  states?: TriggerState;
  /** Start DateTime(RFC 3339 literal format) of the last updated time range to filter triggers. */
  lastModifiedStartTime?: Date | string;
  /** End DateTime(RFC 3339 literal format) of the last updated time range to filter triggers. */
  lastModifiedEndTime?: Date | string;
  /** Number of results in response. Default page size is 50. */
  maxpagesize?: number;
}

export interface TriggerAdministrationListTriggerQueryParam {
  queryParameters?: TriggerAdministrationListTriggerQueryParamProperties;
}

export type TriggerAdministrationListTriggerParameters =
  TriggerAdministrationListTriggerQueryParam & RequestParameters;
export type NotificationRuleAdministrationGetNotificationRuleParameters =
  RequestParameters;
/** The resource instance. */
export type NotificationRuleResourceMergeAndPatch = Partial<NotificationRule>;

export interface NotificationRuleAdministrationCreateOrUpdateNotificationRuleBodyParam {
  /** The resource instance. */
  body: NotificationRuleResourceMergeAndPatch;
}

export interface NotificationRuleAdministrationCreateOrUpdateNotificationRuleMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type NotificationRuleAdministrationCreateOrUpdateNotificationRuleParameters =
  NotificationRuleAdministrationCreateOrUpdateNotificationRuleMediaTypesParam &
    NotificationRuleAdministrationCreateOrUpdateNotificationRuleBodyParam &
    RequestParameters;
export type NotificationRuleAdministrationDeleteNotificationRuleParameters =
  RequestParameters;

export interface NotificationRuleAdministrationListNotificationRuleQueryParamProperties {
  /** Search based on notification rules associated with the provided test ids. */
  testIds?: string;
  /** Search based on notification rules for the provided scopes. */
  scopes?: string;
  /** Start DateTime(RFC 3339 literal format) of the last updated time range to filter notification rules. */
  lastModifiedStartTime?: Date | string;
  /** End DateTime(RFC 3339 literal format) of the last updated time range to filter notification rules. */
  lastModifiedEndTime?: Date | string;
  /** Number of results in response. Default page size is 50. */
  maxpagesize?: number;
}

export interface NotificationRuleAdministrationListNotificationRuleQueryParam {
  queryParameters?: NotificationRuleAdministrationListNotificationRuleQueryParamProperties;
}

export type NotificationRuleAdministrationListNotificationRuleParameters =
  NotificationRuleAdministrationListNotificationRuleQueryParam &
    RequestParameters;
