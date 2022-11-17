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

export interface TestCreateOrUpdateBodyParam {
  /** Load test model */
  body: Test;
}

export interface TestCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type TestCreateOrUpdateParameters = TestCreateOrUpdateMediaTypesParam &
  TestCreateOrUpdateBodyParam &
  RequestParameters;
export type TestDeleteParameters = RequestParameters;
export type TestGetParameters = RequestParameters;

export interface TestListQueryParamProperties {
  /** Sort on the supported fields in (field asc/desc) format. eg: lastModifiedDateTime asc. Supported fields - lastModifiedDateTime */
  orderby?: string;
  /** Prefix based, case sensitive search on searchable fields - testId, createdBy. */
  search?: string;
  /** Start DateTime(ISO 8601 literal format) of the last updated time range to filter tests. */
  lastModifiedStartTime?: Date | string;
  /** End DateTime(ISO 8601 literal format) of the last updated time range to filter tests. */
  lastModifiedEndTime?: Date | string;
  /** Continuation token to get the next page of response */
  continuationToken?: string;
  /** Number of results in response. */
  maxpagesize?: number;
}

export interface TestListQueryParam {
  queryParameters?: TestListQueryParamProperties;
}

export type TestListParameters = TestListQueryParam & RequestParameters;

export interface TestUploadFileBodyParam {
  /**
   * The file content as application/octet-stream.
   *
   * Value may contain any sequence of octets
   */
  body: string | Uint8Array | ReadableStream<Uint8Array> | NodeJS.ReadableStream;
}

export interface TestUploadFileQueryParamProperties {
  /** File type */
  fileType?: "JMX_FILE" | "USER_PROPERTIES" | "ADDITIONAL_ARTIFACTS";
}

export interface TestUploadFileQueryParam {
  queryParameters?: TestUploadFileQueryParamProperties;
}

export interface TestUploadFileMediaTypesParam {
  /** Request content type */
  contentType?: "application/octet-stream";
}

export type TestUploadFileParameters = TestUploadFileQueryParam &
  TestUploadFileMediaTypesParam &
  TestUploadFileBodyParam &
  RequestParameters;
export type TestGetFileParameters = RequestParameters;
export type TestDeleteFileParameters = RequestParameters;

export interface TestListFilesQueryParamProperties {
  /** Continuation token to get the next page of response */
  continuationToken?: string;
}

export interface TestListFilesQueryParam {
  queryParameters?: TestListFilesQueryParamProperties;
}

export type TestListFilesParameters = TestListFilesQueryParam & RequestParameters;

export interface TestCreateOrUpdateAppComponentBodyParam {
  /** App Component model. */
  body: TestAppComponents;
}

export interface TestCreateOrUpdateAppComponentMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type TestCreateOrUpdateAppComponentParameters = TestCreateOrUpdateAppComponentMediaTypesParam &
  TestCreateOrUpdateAppComponentBodyParam &
  RequestParameters;
export type TestGetAppComponentsParameters = RequestParameters;

export interface TestCreateOrUpdateServerMetricsConfigBodyParam {
  /** Server metric configuration model. */
  body: TestServerMetricConfig;
}

export interface TestCreateOrUpdateServerMetricsConfigMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type TestCreateOrUpdateServerMetricsConfigParameters = TestCreateOrUpdateServerMetricsConfigMediaTypesParam &
  TestCreateOrUpdateServerMetricsConfigBodyParam &
  RequestParameters;
export type TestGetServerMetricsConfigParameters = RequestParameters;
export type TestRunDeleteParameters = RequestParameters;

export interface TestRunCreateOrUpdateBodyParam {
  /** Load test run model */
  body: TestRun;
}

export interface TestRunCreateOrUpdateQueryParamProperties {
  /** Existing test run identifier that should be rerun, if this is provided, the test will run with the JMX file, configuration and app components from the existing test run. You can override the configuration values for new test run in the request body. */
  oldTestRunId?: string;
}

export interface TestRunCreateOrUpdateQueryParam {
  queryParameters?: TestRunCreateOrUpdateQueryParamProperties;
}

export interface TestRunCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type TestRunCreateOrUpdateParameters = TestRunCreateOrUpdateQueryParam &
  TestRunCreateOrUpdateMediaTypesParam &
  TestRunCreateOrUpdateBodyParam &
  RequestParameters;
export type TestRunGetParameters = RequestParameters;
export type TestRunGetFileParameters = RequestParameters;

export interface TestRunListQueryParamProperties {
  /** Sort on the supported fields in (field asc/desc) format. eg: executedDateTime asc. Supported fields - executedDateTime */
  orderby?: string;
  /** Continuation token to get the next page of response */
  continuationToken?: string;
  /** Prefix based, case sensitive search on searchable fields - description, executedUser. */
  search?: string;
  /** Unique name of an existing load test. */
  testId?: string;
  /** Start DateTime(ISO 8601 literal format) of test-run execution time filter range. */
  executionFrom?: Date | string;
  /** End DateTime(ISO 8601 literal format) of test-run execution time filter range. */
  executionTo?: Date | string;
  /** Comma separated list of test run status. */
  status?: string;
  /** Number of results in response. */
  maxpagesize?: number;
}

export interface TestRunListQueryParam {
  queryParameters?: TestRunListQueryParamProperties;
}

export type TestRunListParameters = TestRunListQueryParam & RequestParameters;
export type TestRunStopParameters = RequestParameters;
export type TestRunListMetricNamespacesParameters = RequestParameters;

export interface TestRunListMetricDefinitionsQueryParamProperties {
  /** Metric namespace to query metric definitions for. */
  metricNamespace: string;
}

export interface TestRunListMetricDefinitionsQueryParam {
  queryParameters: TestRunListMetricDefinitionsQueryParamProperties;
}

export type TestRunListMetricDefinitionsParameters = TestRunListMetricDefinitionsQueryParam &
  RequestParameters;

export interface TestRunGetMetricsBodyParam {
  /** Metric dimension filter */
  body?: MetricRequestPayload;
}

export interface TestRunGetMetricsQueryParamProperties {
  /** The aggregation */
  aggregation?: string;
  /** The interval (i.e. timegrain) of the query. */
  interval?: "PT5S" | "PT10S" | "PT1M" | "PT5M" | "PT1H";
  /** Metric name */
  metricname: string;
  /** Metric namespace to query metric definitions for. */
  metricNamespace: string;
  /** The timespan of the query. It is a string with the following format 'startDateTime_ISO/endDateTime_ISO'. */
  timespan: string;
}

export interface TestRunGetMetricsQueryParam {
  queryParameters: TestRunGetMetricsQueryParamProperties;
}

export interface TestRunGetMetricsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type TestRunGetMetricsParameters = TestRunGetMetricsQueryParam &
  TestRunGetMetricsMediaTypesParam &
  TestRunGetMetricsBodyParam &
  RequestParameters;

export interface TestRunGetMetricDimensionValuesQueryParamProperties {
  /** The interval (i.e. timegrain) of the query. */
  interval?: "PT5S" | "PT10S" | "PT1M" | "PT5M" | "PT1H";
  /** Metric name */
  metricname: string;
  /** Metric namespace to query metric definitions for. */
  metricNamespace: string;
  /** The timespan of the query. It is a string with the following format 'startDateTime_ISO/endDateTime_ISO'. */
  timespan: string;
}

export interface TestRunGetMetricDimensionValuesQueryParam {
  queryParameters: TestRunGetMetricDimensionValuesQueryParamProperties;
}

export type TestRunGetMetricDimensionValuesParameters = TestRunGetMetricDimensionValuesQueryParam &
  RequestParameters;

export interface TestRunCreateOrUpdateAppComponentBodyParam {
  /** App Component model. */
  body: TestRunAppComponents;
}

export interface TestRunCreateOrUpdateAppComponentMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type TestRunCreateOrUpdateAppComponentParameters = TestRunCreateOrUpdateAppComponentMediaTypesParam &
  TestRunCreateOrUpdateAppComponentBodyParam &
  RequestParameters;
export type TestRunGetAppComponentsParameters = RequestParameters;

export interface TestRunCreateOrUpdateServerMetricsConfigBodyParam {
  /** Server metric configuration model. */
  body: TestRunServerMetricConfig;
}

export interface TestRunCreateOrUpdateServerMetricsConfigMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type TestRunCreateOrUpdateServerMetricsConfigParameters = TestRunCreateOrUpdateServerMetricsConfigMediaTypesParam &
  TestRunCreateOrUpdateServerMetricsConfigBodyParam &
  RequestParameters;
export type TestRunGetServerMetricsConfigParameters = RequestParameters;
