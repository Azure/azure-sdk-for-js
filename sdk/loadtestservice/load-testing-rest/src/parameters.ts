// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  AppComponentsMap,
  ServerMetricsModel,
  TestModel,
  TestRunModel,
  ClientMetricsRequestModel,
} from "./models";

export interface AppComponentCreateOrUpdateAppComponentsBodyParam {
  /** App Component model. */
  body: AppComponentsMap;
}

export interface AppComponentCreateOrUpdateAppComponentsMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type AppComponentCreateOrUpdateAppComponentsParameters = AppComponentCreateOrUpdateAppComponentsMediaTypesParam &
  AppComponentCreateOrUpdateAppComponentsBodyParam &
  RequestParameters;
export type AppComponentDeleteAppComponentsParameters = RequestParameters;
export type AppComponentGetAppComponentByNameParameters = RequestParameters;

export interface AppComponentGetAppComponentQueryParamProperties {
  /** [Required, if testId is not provided] Test run Id. */
  testRunId?: string;
  /** Unique name for load test, must be a valid URL character ^[a-z0-9_-]*$. */
  testId?: string;
}

export interface AppComponentGetAppComponentQueryParam {
  queryParameters?: AppComponentGetAppComponentQueryParamProperties;
}

export type AppComponentGetAppComponentParameters = AppComponentGetAppComponentQueryParam &
  RequestParameters;

export interface ServerMetricsCreateOrUpdateServerMetricsConfigBodyParam {
  /** Server metrics configuration model */
  body: ServerMetricsModel;
}

export interface ServerMetricsCreateOrUpdateServerMetricsConfigMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type ServerMetricsCreateOrUpdateServerMetricsConfigParameters = ServerMetricsCreateOrUpdateServerMetricsConfigMediaTypesParam &
  ServerMetricsCreateOrUpdateServerMetricsConfigBodyParam &
  RequestParameters;
export type ServerMetricsGetServerMetricsConfigByNameParameters = RequestParameters;
export type ServerMetricsDeleteServerMetricsConfigParameters = RequestParameters;

export interface ServerMetricsGetServerMetricsConfigQueryParamProperties {
  /** [Required, if testId is not provided] Test run Id. */
  testRunId?: string;
  /** Unique name for load test, must be a valid URL character ^[a-z0-9_-]*$. */
  testId?: string;
}

export interface ServerMetricsGetServerMetricsConfigQueryParam {
  queryParameters?: ServerMetricsGetServerMetricsConfigQueryParamProperties;
}

export type ServerMetricsGetServerMetricsConfigParameters = ServerMetricsGetServerMetricsConfigQueryParam &
  RequestParameters;
export type ServerMetricsGetServerDefaultMetricsConfigParameters = RequestParameters;
export type ServerMetricsListSupportedResourceTypesParameters = RequestParameters;

export interface TestCreateOrUpdateTestBodyParam {
  /** Load test model */
  body: TestModel;
}

export interface TestCreateOrUpdateTestMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type TestCreateOrUpdateTestParameters = TestCreateOrUpdateTestMediaTypesParam &
  TestCreateOrUpdateTestBodyParam &
  RequestParameters;
export type TestDeleteLoadTestParameters = RequestParameters;
export type TestGetLoadTestParameters = RequestParameters;

export interface TestListLoadTestSearchQueryParamProperties {
  /** Sort on one of the field - lastModifiedDateTime, displayName, createdBy in (field asc/desc) format. eg: displayName asc. */
  orderBy?: string;
  /** Filter search based on searchable fields - testId, createdBy. */
  search?: string;
  /** Start DateTime(ISO 8601 literal format) of the last updated time range to filter tests. */
  lastUpdatedStartTime?: Date | string;
  /** End DateTime(ISO 8601 literal format) of the last updated time range to filter tests. */
  lastUpdatedEndTime?: Date | string;
  /** Continuation token to get the next page of response. */
  continuationToken?: string;
  /** Number of results in response. */
  maxPageSize?: number;
}

export interface TestListLoadTestSearchQueryParam {
  queryParameters?: TestListLoadTestSearchQueryParamProperties;
}

export type TestListLoadTestSearchParameters = TestListLoadTestSearchQueryParam & RequestParameters;

export interface TestUploadTestFileBodyParam {
  body: TestUploadTestFileFormBody;
}

export interface TestUploadTestFileFormBody {
  /**
   * The file to be uploaded.
   *
   * Value may contain any sequence of octets
   */
  file: string | Uint8Array | ReadableStream<Uint8Array> | NodeJS.ReadableStream;
}

export interface TestUploadTestFileQueryParamProperties {
  /** Integer representation of the file type (0 = JMX_FILE, 1 = USER_PROPERTIES, 2 = ADDITIONAL_ARTIFACTS). */
  fileType?: number;
}

export interface TestUploadTestFileQueryParam {
  queryParameters?: TestUploadTestFileQueryParamProperties;
}

export interface TestUploadTestFileMediaTypesParam {
  /** Request content type */
  contentType?: "multipart/form-data";
}

export type TestUploadTestFileParameters = TestUploadTestFileQueryParam &
  TestUploadTestFileMediaTypesParam &
  TestUploadTestFileBodyParam &
  RequestParameters;
export type TestGetTestFileParameters = RequestParameters;
export type TestDeleteTestFileParameters = RequestParameters;

export interface TestListTestFilesQueryParamProperties {
  /** Continuation token to get the next page of response. */
  continuationToken?: string;
}

export interface TestListTestFilesQueryParam {
  queryParameters?: TestListTestFilesQueryParamProperties;
}

export type TestListTestFilesParameters = TestListTestFilesQueryParam & RequestParameters;
export type TestRunDeleteTestRunParameters = RequestParameters;

export interface TestRunCreateOrUpdateTestRunBodyParam {
  /** Load test run model */
  body: TestRunModel;
}

export interface TestRunCreateOrUpdateTestRunQueryParamProperties {
  /** Existing test run Id that should be rerun. */
  oldTestRunId?: string;
}

export interface TestRunCreateOrUpdateTestRunQueryParam {
  queryParameters?: TestRunCreateOrUpdateTestRunQueryParamProperties;
}

export interface TestRunCreateOrUpdateTestRunMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type TestRunCreateOrUpdateTestRunParameters = TestRunCreateOrUpdateTestRunQueryParam &
  TestRunCreateOrUpdateTestRunMediaTypesParam &
  TestRunCreateOrUpdateTestRunBodyParam &
  RequestParameters;
export type TestRunGetTestRunParameters = RequestParameters;
export type TestRunGetTestRunFileParameters = RequestParameters;

export interface TestRunListTestRunsQueryParamProperties {
  /** Sort on one of the field - status, displayName, executedDateTime in (field asc/desc) format. eg: displayName asc. */
  orderBy?: string;
  /** Continuation token to get the next page of response. */
  continuationToken?: string;
  /** Filter search based on searchable fields - description, executedUser. */
  search?: string;
  /** The end DateTime(ISO 8601 literal format) of test-run execution time filter range. */
  executionFrom?: Date | string;
  /** The start DateTime(ISO 8601 literal format) of test-run execution time filter range. */
  executionTo?: Date | string;
  /**
   * Comma separated list of test run status, value can be -  "ACCEPTED", "NOTSTARTED","PROVISIONING","PROVISIONED","CONFIGURING",
   * "CONFIGURED","EXECUTING","EXECUTED","DEPROVISIONING","DEPROVISIONED","DONE","CANCELLED","FAILED".
   */
  status?: string;
  /** Number of results in response. */
  maxPageSize?: number;
  /** Unique name for load test, must be a valid URL character ^[a-z0-9_-]*$. */
  testId?: string;
}

export interface TestRunListTestRunsQueryParam {
  queryParameters?: TestRunListTestRunsQueryParamProperties;
}

export type TestRunListTestRunsParameters = TestRunListTestRunsQueryParam & RequestParameters;
export type TestRunStopTestRunParameters = RequestParameters;

export interface TestRunGetTestRunClientMetricsBodyParam {
  /** Client metrics request model */
  body: ClientMetricsRequestModel;
}

export interface TestRunGetTestRunClientMetricsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type TestRunGetTestRunClientMetricsParameters = TestRunGetTestRunClientMetricsMediaTypesParam &
  TestRunGetTestRunClientMetricsBodyParam &
  RequestParameters;
export type TestRunGetTestRunClientMetricsFiltersParameters = RequestParameters;
