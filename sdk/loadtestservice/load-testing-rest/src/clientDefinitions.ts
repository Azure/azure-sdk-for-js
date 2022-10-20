// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AppComponentCreateOrUpdateAppComponentsParameters,
  AppComponentDeleteAppComponentsParameters,
  AppComponentGetAppComponentByNameParameters,
  AppComponentGetAppComponentParameters,
  ServerMetricsCreateOrUpdateServerMetricsConfigParameters,
  ServerMetricsGetServerMetricsConfigByNameParameters,
  ServerMetricsDeleteServerMetricsConfigParameters,
  ServerMetricsGetServerMetricsConfigParameters,
  ServerMetricsGetServerDefaultMetricsConfigParameters,
  ServerMetricsListSupportedResourceTypesParameters,
  TestCreateOrUpdateTestParameters,
  TestDeleteLoadTestParameters,
  TestGetLoadTestParameters,
  TestListLoadTestSearchParameters,
  TestUploadTestFileParameters,
  TestGetTestFileParameters,
  TestDeleteTestFileParameters,
  TestListTestFilesParameters,
  TestRunDeleteTestRunParameters,
  TestRunCreateOrUpdateTestRunParameters,
  TestRunGetTestRunParameters,
  TestRunGetTestRunFileParameters,
  TestRunListTestRunsParameters,
  TestRunStopTestRunParameters,
  TestRunGetTestRunClientMetricsParameters,
  TestRunGetTestRunClientMetricsFiltersParameters,
} from "./parameters";
import {
  AppComponentCreateOrUpdateAppComponents200Response,
  AppComponentCreateOrUpdateAppComponents201Response,
  AppComponentCreateOrUpdateAppComponentsdefaultResponse,
  AppComponentDeleteAppComponents204Response,
  AppComponentDeleteAppComponentsdefaultResponse,
  AppComponentGetAppComponentByName200Response,
  AppComponentGetAppComponentByNamedefaultResponse,
  AppComponentGetAppComponent200Response,
  AppComponentGetAppComponentdefaultResponse,
  ServerMetricsCreateOrUpdateServerMetricsConfig200Response,
  ServerMetricsCreateOrUpdateServerMetricsConfig201Response,
  ServerMetricsCreateOrUpdateServerMetricsConfigdefaultResponse,
  ServerMetricsGetServerMetricsConfigByName200Response,
  ServerMetricsGetServerMetricsConfigByNamedefaultResponse,
  ServerMetricsDeleteServerMetricsConfig204Response,
  ServerMetricsDeleteServerMetricsConfigdefaultResponse,
  ServerMetricsGetServerMetricsConfig200Response,
  ServerMetricsGetServerMetricsConfigdefaultResponse,
  ServerMetricsGetServerDefaultMetricsConfig200Response,
  ServerMetricsGetServerDefaultMetricsConfigdefaultResponse,
  ServerMetricsListSupportedResourceTypes200Response,
  ServerMetricsListSupportedResourceTypesdefaultResponse,
  TestCreateOrUpdateTest200Response,
  TestCreateOrUpdateTest201Response,
  TestCreateOrUpdateTestdefaultResponse,
  TestDeleteLoadTest204Response,
  TestDeleteLoadTestdefaultResponse,
  TestGetLoadTest200Response,
  TestGetLoadTestdefaultResponse,
  TestListLoadTestSearch200Response,
  TestListLoadTestSearchdefaultResponse,
  TestUploadTestFile201Response,
  TestUploadTestFiledefaultResponse,
  TestGetTestFile200Response,
  TestGetTestFiledefaultResponse,
  TestDeleteTestFile204Response,
  TestDeleteTestFiledefaultResponse,
  TestListTestFiles200Response,
  TestListTestFilesdefaultResponse,
  TestRunDeleteTestRun204Response,
  TestRunDeleteTestRundefaultResponse,
  TestRunCreateOrUpdateTestRun200Response,
  TestRunCreateOrUpdateTestRundefaultResponse,
  TestRunGetTestRun200Response,
  TestRunGetTestRundefaultResponse,
  TestRunGetTestRunFile200Response,
  TestRunGetTestRunFiledefaultResponse,
  TestRunListTestRuns200Response,
  TestRunListTestRunsdefaultResponse,
  TestRunStopTestRun200Response,
  TestRunStopTestRundefaultResponse,
  TestRunGetTestRunClientMetrics200Response,
  TestRunGetTestRunClientMetricsdefaultResponse,
  TestRunGetTestRunClientMetricsFilters200Response,
  TestRunGetTestRunClientMetricsFiltersdefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface AppComponentCreateOrUpdateAppComponents {
  /** Associate an App Component (Azure resource) to a test or test run. */
  patch(
    options: AppComponentCreateOrUpdateAppComponentsParameters
  ): StreamableMethod<
    | AppComponentCreateOrUpdateAppComponents200Response
    | AppComponentCreateOrUpdateAppComponents201Response
    | AppComponentCreateOrUpdateAppComponentsdefaultResponse
  >;
  /** Delete an App Component. */
  delete(
    options?: AppComponentDeleteAppComponentsParameters
  ): StreamableMethod<
    AppComponentDeleteAppComponents204Response | AppComponentDeleteAppComponentsdefaultResponse
  >;
  /** Get App Component details by App Component name. */
  get(
    options?: AppComponentGetAppComponentByNameParameters
  ): StreamableMethod<
    AppComponentGetAppComponentByName200Response | AppComponentGetAppComponentByNamedefaultResponse
  >;
}

export interface AppComponentGetAppComponent {
  /** Get App Components for a test or a test run by its name. */
  get(
    options?: AppComponentGetAppComponentParameters
  ): StreamableMethod<
    AppComponentGetAppComponent200Response | AppComponentGetAppComponentdefaultResponse
  >;
}

export interface ServerMetricsCreateOrUpdateServerMetricsConfig {
  /** Configure server metrics for a test or test run */
  patch(
    options: ServerMetricsCreateOrUpdateServerMetricsConfigParameters
  ): StreamableMethod<
    | ServerMetricsCreateOrUpdateServerMetricsConfig200Response
    | ServerMetricsCreateOrUpdateServerMetricsConfig201Response
    | ServerMetricsCreateOrUpdateServerMetricsConfigdefaultResponse
  >;
  /** Get server metrics configuration by its name. */
  get(
    options?: ServerMetricsGetServerMetricsConfigByNameParameters
  ): StreamableMethod<
    | ServerMetricsGetServerMetricsConfigByName200Response
    | ServerMetricsGetServerMetricsConfigByNamedefaultResponse
  >;
  /** Delete server metrics configuration by its name */
  delete(
    options?: ServerMetricsDeleteServerMetricsConfigParameters
  ): StreamableMethod<
    | ServerMetricsDeleteServerMetricsConfig204Response
    | ServerMetricsDeleteServerMetricsConfigdefaultResponse
  >;
}

export interface ServerMetricsGetServerMetricsConfig {
  /** Get server metrics configuration for a test or test run by its name. */
  get(
    options?: ServerMetricsGetServerMetricsConfigParameters
  ): StreamableMethod<
    | ServerMetricsGetServerMetricsConfig200Response
    | ServerMetricsGetServerMetricsConfigdefaultResponse
  >;
}

export interface ServerMetricsGetServerDefaultMetricsConfig {
  /** Get all default server metrics configuration for supported resource types. */
  get(
    options?: ServerMetricsGetServerDefaultMetricsConfigParameters
  ): StreamableMethod<
    | ServerMetricsGetServerDefaultMetricsConfig200Response
    | ServerMetricsGetServerDefaultMetricsConfigdefaultResponse
  >;
}

export interface ServerMetricsListSupportedResourceTypes {
  /** Get all supported resource types for App Components(Azure resource types). */
  get(
    options?: ServerMetricsListSupportedResourceTypesParameters
  ): StreamableMethod<
    | ServerMetricsListSupportedResourceTypes200Response
    | ServerMetricsListSupportedResourceTypesdefaultResponse
  >;
}

export interface TestCreateOrUpdateTest {
  /** Create a new test or Update an existing test. */
  patch(
    options: TestCreateOrUpdateTestParameters
  ): StreamableMethod<
    | TestCreateOrUpdateTest200Response
    | TestCreateOrUpdateTest201Response
    | TestCreateOrUpdateTestdefaultResponse
  >;
  /** Delete a test by its name. */
  delete(
    options?: TestDeleteLoadTestParameters
  ): StreamableMethod<TestDeleteLoadTest204Response | TestDeleteLoadTestdefaultResponse>;
  /** Get load test details by test name */
  get(
    options?: TestGetLoadTestParameters
  ): StreamableMethod<TestGetLoadTest200Response | TestGetLoadTestdefaultResponse>;
}

export interface TestListLoadTestSearch {
  /** Get all load tests by the fully qualified resource Id e.g subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}. */
  get(
    options?: TestListLoadTestSearchParameters
  ): StreamableMethod<TestListLoadTestSearch200Response | TestListLoadTestSearchdefaultResponse>;
}

export interface TestUploadTestFile {
  /** Upload input file for a given test name. File size can't be more than 50 MB. Existing file with same name for the given test will be overwritten. File should be provided in the request body as multipart/form-data. */
  put(
    options: TestUploadTestFileParameters
  ): StreamableMethod<TestUploadTestFile201Response | TestUploadTestFiledefaultResponse>;
  /** Get test file by the file name. */
  get(
    options?: TestGetTestFileParameters
  ): StreamableMethod<TestGetTestFile200Response | TestGetTestFiledefaultResponse>;
  /** Delete file by the file name for a test. */
  delete(
    options?: TestDeleteTestFileParameters
  ): StreamableMethod<TestDeleteTestFile204Response | TestDeleteTestFiledefaultResponse>;
}

export interface TestListTestFiles {
  /** Get all test files. */
  get(
    options?: TestListTestFilesParameters
  ): StreamableMethod<TestListTestFiles200Response | TestListTestFilesdefaultResponse>;
}

export interface TestRunDeleteTestRun {
  /** Delete a test run by its name. */
  delete(
    options?: TestRunDeleteTestRunParameters
  ): StreamableMethod<TestRunDeleteTestRun204Response | TestRunDeleteTestRundefaultResponse>;
  /** Create and start a new test run with the given name. */
  patch(
    options: TestRunCreateOrUpdateTestRunParameters
  ): StreamableMethod<
    TestRunCreateOrUpdateTestRun200Response | TestRunCreateOrUpdateTestRundefaultResponse
  >;
  /** Get test run details by name. */
  get(
    options?: TestRunGetTestRunParameters
  ): StreamableMethod<TestRunGetTestRun200Response | TestRunGetTestRundefaultResponse>;
}

export interface TestRunGetTestRunFile {
  /** Get test run file by file name. */
  get(
    options?: TestRunGetTestRunFileParameters
  ): StreamableMethod<TestRunGetTestRunFile200Response | TestRunGetTestRunFiledefaultResponse>;
}

export interface TestRunListTestRuns {
  /** Get all test runs with given filters */
  get(
    options?: TestRunListTestRunsParameters
  ): StreamableMethod<TestRunListTestRuns200Response | TestRunListTestRunsdefaultResponse>;
}

export interface TestRunStopTestRun {
  /** Stop test run by name. */
  post(
    options?: TestRunStopTestRunParameters
  ): StreamableMethod<TestRunStopTestRun200Response | TestRunStopTestRundefaultResponse>;
}

export interface TestRunGetTestRunClientMetrics {
  /** Get all client metrics for a load test run. */
  post(
    options: TestRunGetTestRunClientMetricsParameters
  ): StreamableMethod<
    TestRunGetTestRunClientMetrics200Response | TestRunGetTestRunClientMetricsdefaultResponse
  >;
}

export interface TestRunGetTestRunClientMetricsFilters {
  /** Get all filters that are supported for client metrics for a given load test run */
  get(
    options?: TestRunGetTestRunClientMetricsFiltersParameters
  ): StreamableMethod<
    | TestRunGetTestRunClientMetricsFilters200Response
    | TestRunGetTestRunClientMetricsFiltersdefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/appcomponents/\{name\}' has methods for the following verbs: patch, delete, get */
  (path: "/appcomponents/{name}", name: string): AppComponentCreateOrUpdateAppComponents;
  /** Resource for '/appcomponents' has methods for the following verbs: get */
  (path: "/appcomponents"): AppComponentGetAppComponent;
  /** Resource for '/serverMetricsConfig/\{name\}' has methods for the following verbs: patch, get, delete */
  (
    path: "/serverMetricsConfig/{name}",
    name: string
  ): ServerMetricsCreateOrUpdateServerMetricsConfig;
  /** Resource for '/serverMetricsConfig' has methods for the following verbs: get */
  (path: "/serverMetricsConfig"): ServerMetricsGetServerMetricsConfig;
  /** Resource for '/serverMetricsConfig/default' has methods for the following verbs: get */
  (path: "/serverMetricsConfig/default"): ServerMetricsGetServerDefaultMetricsConfig;
  /** Resource for '/serverMetricsConfig/supportedResourceTypes' has methods for the following verbs: get */
  (path: "/serverMetricsConfig/supportedResourceTypes"): ServerMetricsListSupportedResourceTypes;
  /** Resource for '/loadtests/\{testId\}' has methods for the following verbs: patch, delete, get */
  (path: "/loadtests/{testId}", testId: string): TestCreateOrUpdateTest;
  /** Resource for '/loadtests/sortAndFilter' has methods for the following verbs: get */
  (path: "/loadtests/sortAndFilter"): TestListLoadTestSearch;
  /** Resource for '/loadtests/\{testId\}/files/\{fileId\}' has methods for the following verbs: put, get, delete */
  (path: "/loadtests/{testId}/files/{fileId}", testId: string, fileId: string): TestUploadTestFile;
  /** Resource for '/loadtests/\{testId\}/files' has methods for the following verbs: get */
  (path: "/loadtests/{testId}/files", testId: string): TestListTestFiles;
  /** Resource for '/testruns/\{testRunId\}' has methods for the following verbs: delete, patch, get */
  (path: "/testruns/{testRunId}", testRunId: string): TestRunDeleteTestRun;
  /** Resource for '/testruns/\{testRunId\}/files/\{fileId\}' has methods for the following verbs: get */
  (
    path: "/testruns/{testRunId}/files/{fileId}",
    testRunId: string,
    fileId: string
  ): TestRunGetTestRunFile;
  /** Resource for '/testruns/sortAndFilter' has methods for the following verbs: get */
  (path: "/testruns/sortAndFilter"): TestRunListTestRuns;
  /** Resource for '/testruns/\{testRunId\}:stop' has methods for the following verbs: post */
  (path: "/testruns/{testRunId}:stop", testRunId: string): TestRunStopTestRun;
  /** Resource for '/testruns/\{testRunId\}/clientMetrics' has methods for the following verbs: post */
  (path: "/testruns/{testRunId}/clientMetrics", testRunId: string): TestRunGetTestRunClientMetrics;
  /** Resource for '/testruns/\{testRunId\}/clientMetricsFilters' has methods for the following verbs: get */
  (
    path: "/testruns/{testRunId}/clientMetricsFilters",
    testRunId: string
  ): TestRunGetTestRunClientMetricsFilters;
}

export type AzureLoadTestingClient = Client & {
  path: Routes;
};
