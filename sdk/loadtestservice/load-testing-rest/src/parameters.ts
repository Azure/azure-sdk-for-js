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

export interface LoadTestAdministrationCreateOrUpdateTestBodyParam {
  /** Load test model */
  body: Test;
}

export interface LoadTestAdministrationCreateOrUpdateTestMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type LoadTestAdministrationCreateOrUpdateTestParameters = LoadTestAdministrationCreateOrUpdateTestMediaTypesParam &
  LoadTestAdministrationCreateOrUpdateTestBodyParam &
  RequestParameters;
export type LoadTestAdministrationDeleteTestParameters = RequestParameters;
export type LoadTestAdministrationGetTestParameters = RequestParameters;

export interface LoadTestAdministrationListTestsQueryParamProperties {
  /** Sort on one of the field - lastModifiedDateTime, displayName, createdBy in (field asc/desc) format. eg: displayName asc. */
  orderby?: string;
  /** Filter search based on searchable fields - testId, createdBy. */
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

export interface LoadTestAdministrationListTestsQueryParam {
  queryParameters?: LoadTestAdministrationListTestsQueryParamProperties;
}

export type LoadTestAdministrationListTestsParameters = LoadTestAdministrationListTestsQueryParam &
  RequestParameters;

export interface LoadTestAdministrationUploadFileBodyParam {
  body: LoadTestAdministrationUploadFileFormBody;
}

export interface LoadTestAdministrationUploadFileFormBody {
  /**
   * The file to be uploaded as multipart form-data.
   *
   * Value may contain any sequence of octets
   */
  file: string | Uint8Array | ReadableStream<Uint8Array> | NodeJS.ReadableStream;
}

export interface LoadTestAdministrationUploadFileQueryParamProperties {
  /** File type */
  fileType?: "JMX_FILE" | "USER_PROPERTIES" | "ADDITIONAL_ARTIFACTS";
}

export interface LoadTestAdministrationUploadFileQueryParam {
  queryParameters?: LoadTestAdministrationUploadFileQueryParamProperties;
}

export interface LoadTestAdministrationUploadFileMediaTypesParam {
  /** Request content type */
  contentType?: "multipart/form-data";
}

export type LoadTestAdministrationUploadFileParameters = LoadTestAdministrationUploadFileQueryParam &
  LoadTestAdministrationUploadFileMediaTypesParam &
  LoadTestAdministrationUploadFileBodyParam &
  RequestParameters;
export type LoadTestAdministrationGetFileParameters = RequestParameters;
export type LoadTestAdministrationDeleteFileParameters = RequestParameters;

export interface LoadTestAdministrationListFilesTestQueryParamProperties {
  /** Continuation token to get the next page of response */
  continuationToken?: string;
}

export interface LoadTestAdministrationListFilesTestQueryParam {
  queryParameters?: LoadTestAdministrationListFilesTestQueryParamProperties;
}

export type LoadTestAdministrationListFilesTestParameters = LoadTestAdministrationListFilesTestQueryParam &
  RequestParameters;

export interface LoadTestAdministrationCreateOrUpdateAppComponentTestBodyParam {
  /** App Component model. */
  body: TestAppComponents;
}

export interface LoadTestAdministrationCreateOrUpdateAppComponentTestMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type LoadTestAdministrationCreateOrUpdateAppComponentTestParameters = LoadTestAdministrationCreateOrUpdateAppComponentTestMediaTypesParam &
  LoadTestAdministrationCreateOrUpdateAppComponentTestBodyParam &
  RequestParameters;
export type LoadTestAdministrationGetAppComponentsTestParameters = RequestParameters;

export interface LoadTestAdministrationCreateOrUpdateServerMetricsConfigTestBodyParam {
  /** Server metric configuration model. */
  body: TestServerMetricConfig;
}

export interface LoadTestAdministrationCreateOrUpdateServerMetricsConfigTestMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type LoadTestAdministrationCreateOrUpdateServerMetricsConfigTestParameters = LoadTestAdministrationCreateOrUpdateServerMetricsConfigTestMediaTypesParam &
  LoadTestAdministrationCreateOrUpdateServerMetricsConfigTestBodyParam &
  RequestParameters;
export type LoadTestAdministrationGetServerMetricsConfigTestParameters = RequestParameters;
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
  /** Sort on one of the field - status, displayName, executedDateTime in (field asc/desc) format. eg: displayName asc. */
  orderby?: string;
  /** Continuation token to get the next page of response */
  continuationToken?: string;
  /** Filter search based on searchable fields - description, executedUser. */
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
  /** Metric metadata filter to fetch the set of metric */
  body?: MetricRequestPayload;
}

export interface TestRunGetMetricsQueryParamProperties {
  /** The list of aggregation types (comma separated) to retrieve. */
  aggregation?: string;
  /** The interval (i.e. timegrain) of the query. */
  interval?: "PT5S" | "PT10S" | "PT1M" | "PT5M" | "PT1H";
  /** Metric name */
  metricname: string;
  /** Metric namespace to query metric definitions for. */
  metricNamespace: string;
  /** Reduces the set of data collected. The syntax allowed depends on the operation. See the operation's description for details. */
  resultType: "Data" | "Metadata";
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
