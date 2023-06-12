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

export interface CreateOrUpdateTestBodyParam {
  /** Load test model */
  body: TestResourceMergeAndPatch;
}

export interface CreateOrUpdateTestMediaTypesParam {
  contentType: "application/merge-patch+json";
}

export type CreateOrUpdateTestParameters = CreateOrUpdateTestMediaTypesParam &
  CreateOrUpdateTestBodyParam &
  RequestParameters;
export type DeleteTestParameters = RequestParameters;
export type GetTestParameters = RequestParameters;

export interface ListTestsQueryParamProperties {
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

export interface ListTestsQueryParam {
  queryParameters?: ListTestsQueryParamProperties;
}

export type ListTestsParameters = ListTestsQueryParam & RequestParameters;

export interface UploadTestFileBodyParam {
  /** The file content as application/octet-stream. */
  body: string;
}

export interface UploadTestFileQueryParamProperties {
  /**
   * File type
   *
   * Possible values: JMX_FILE, USER_PROPERTIES, ADDITIONAL_ARTIFACTS
   */
  fileType?: string;
}

export interface UploadTestFileQueryParam {
  queryParameters?: UploadTestFileQueryParamProperties;
}

export type UploadTestFileParameters = UploadTestFileQueryParam &
  UploadTestFileBodyParam &
  RequestParameters;
export type GetTestFileParameters = RequestParameters;
export type DeleteTestFileParameters = RequestParameters;
export type ListTestFilesParameters = RequestParameters;
/** App Component model. */
export type TestAppComponentsResourceMergeAndPatch = Partial<TestAppComponents>;

export interface CreateOrUpdateAppComponentsBodyParam {
  /** App Component model. */
  body: TestAppComponentsResourceMergeAndPatch;
}

export interface CreateOrUpdateAppComponentsMediaTypesParam {
  contentType: "application/merge-patch+json";
}

export type CreateOrUpdateAppComponentsParameters = CreateOrUpdateAppComponentsMediaTypesParam &
  CreateOrUpdateAppComponentsBodyParam &
  RequestParameters;
export type GetAppComponentsParameters = RequestParameters;
/** Server metric configuration model. */
export type TestServerMetricConfigResourceMergeAndPatch = Partial<TestServerMetricConfig>;

export interface CreateOrUpdateServerMetricsConfigBodyParam {
  /** Server metric configuration model. */
  body: TestServerMetricConfigResourceMergeAndPatch;
}

export interface CreateOrUpdateServerMetricsConfigMediaTypesParam {
  contentType: "application/merge-patch+json";
}

export type CreateOrUpdateServerMetricsConfigParameters =
  CreateOrUpdateServerMetricsConfigMediaTypesParam &
    CreateOrUpdateServerMetricsConfigBodyParam &
    RequestParameters;
export type GetServerMetricsConfigParameters = RequestParameters;
export type GetTestRunParameters = RequestParameters;
/** The resource instance. */
export type TestRunResourceMergeAndPatch = Partial<TestRun>;

export interface CreateOrUpdateTestRunBodyParam {
  /** The resource instance. */
  body: TestRunResourceMergeAndPatch;
}

export interface CreateOrUpdateTestRunQueryParamProperties {
  /**
   * Existing test run identifier that should be rerun, if this is provided, the
   * test will run with the JMX file, configuration and app components from the
   * existing test run. You can override the configuration values for new test run
   * in the request body.
   */
  oldTestRunId?: string;
}

export interface CreateOrUpdateTestRunQueryParam {
  queryParameters?: CreateOrUpdateTestRunQueryParamProperties;
}

export interface CreateOrUpdateTestRunMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type CreateOrUpdateTestRunParameters = CreateOrUpdateTestRunQueryParam &
  CreateOrUpdateTestRunMediaTypesParam &
  CreateOrUpdateTestRunBodyParam &
  RequestParameters;
export type DeleteTestRunParameters = RequestParameters;
export type GetTestRunFileParameters = RequestParameters;

export interface ListTestRunsQueryParamProperties {
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

export interface ListTestRunsQueryParam {
  queryParameters?: ListTestRunsQueryParamProperties;
}

export type ListTestRunsParameters = ListTestRunsQueryParam & RequestParameters;
export type StopTestRunParameters = RequestParameters;
export type ListMetricNamespacesParameters = RequestParameters;

export interface ListMetricDefinitionsQueryParamProperties {
  /** Metric namespace to query metric definitions for. */
  metricNamespace?: string;
}

export interface ListMetricDefinitionsQueryParam {
  queryParameters?: ListMetricDefinitionsQueryParamProperties;
}

export type ListMetricDefinitionsParameters = ListMetricDefinitionsQueryParam & RequestParameters;

export interface ListMetricsBodyParam {
  /** Metric dimension filter */
  body: MetricRequestPayload;
}

export interface ListMetricsQueryParamProperties {
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

export interface ListMetricsQueryParam {
  queryParameters?: ListMetricsQueryParamProperties;
}

export type ListMetricsParameters = ListMetricsQueryParam &
  ListMetricsBodyParam &
  RequestParameters;
/** App Component model. */
export type TestRunAppComponentsResourceMergeAndPatch = Partial<TestRunAppComponents>;

export interface CreateOrUpdateAppComponentsBodyParam {
  /** App Component model. */
  body: TestRunAppComponentsResourceMergeAndPatch;
}

export interface CreateOrUpdateAppComponentsMediaTypesParam {
  contentType: "application/merge-patch+json";
}

export type CreateOrUpdateAppComponentsParameters = CreateOrUpdateAppComponentsMediaTypesParam &
  CreateOrUpdateAppComponentsBodyParam &
  RequestParameters;
export type GetAppComponentsParameters = RequestParameters;
/** Server metric configuration model. */
export type TestRunServerMetricConfigResourceMergeAndPatch = Partial<TestRunServerMetricConfig>;

export interface CreateOrUpdateServerMetricsConfigBodyParam {
  /** Server metric configuration model. */
  body: TestRunServerMetricConfigResourceMergeAndPatch;
}

export interface CreateOrUpdateServerMetricsConfigMediaTypesParam {
  contentType: "application/merge-patch+json";
}

export type CreateOrUpdateServerMetricsConfigParameters =
  CreateOrUpdateServerMetricsConfigMediaTypesParam &
    CreateOrUpdateServerMetricsConfigBodyParam &
    RequestParameters;
export type GetServerMetricsConfigParameters = RequestParameters;
