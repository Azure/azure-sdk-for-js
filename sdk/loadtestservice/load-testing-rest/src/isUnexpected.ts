// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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

const responseMap: Record<string, string[]> = {
  "PATCH /appcomponents/{name}": ["200", "201"],
  "DELETE /appcomponents/{name}": ["204"],
  "GET /appcomponents/{name}": ["200"],
  "GET /appcomponents": ["200"],
  "PATCH /serverMetricsConfig/{name}": ["200", "201"],
  "GET /serverMetricsConfig/{name}": ["200"],
  "DELETE /serverMetricsConfig/{name}": ["204"],
  "GET /serverMetricsConfig": ["200"],
  "GET /serverMetricsConfig/default": ["200"],
  "GET /serverMetricsConfig/supportedResourceTypes": ["200"],
  "PATCH /loadtests/{testId}": ["200", "201"],
  "DELETE /loadtests/{testId}": ["204"],
  "GET /loadtests/{testId}": ["200"],
  "GET /loadtests/sortAndFilter": ["200"],
  "PUT /loadtests/{testId}/files/{fileId}": ["201"],
  "GET /loadtests/{testId}/files/{fileId}": ["200"],
  "DELETE /loadtests/{testId}/files/{fileId}": ["204"],
  "GET /loadtests/{testId}/files": ["200"],
  "DELETE /testruns/{testRunId}": ["204"],
  "PATCH /testruns/{testRunId}": ["200"],
  "GET /testruns/{testRunId}": ["200"],
  "GET /testruns/{testRunId}/files/{fileId}": ["200"],
  "GET /testruns/sortAndFilter": ["200"],
  "POST /testruns/{testRunId}:stop": ["200"],
  "POST /testruns/{testRunId}/clientMetrics": ["200"],
  "GET /testruns/{testRunId}/clientMetricsFilters": ["200"],
};

export function isUnexpected(
  response:
    | AppComponentCreateOrUpdateAppComponents200Response
    | AppComponentCreateOrUpdateAppComponents201Response
    | AppComponentCreateOrUpdateAppComponentsdefaultResponse
): response is AppComponentCreateOrUpdateAppComponentsdefaultResponse;
export function isUnexpected(
  response:
    | AppComponentDeleteAppComponents204Response
    | AppComponentDeleteAppComponentsdefaultResponse
): response is AppComponentDeleteAppComponentsdefaultResponse;
export function isUnexpected(
  response:
    | AppComponentGetAppComponentByName200Response
    | AppComponentGetAppComponentByNamedefaultResponse
): response is AppComponentGetAppComponentByNamedefaultResponse;
export function isUnexpected(
  response: AppComponentGetAppComponent200Response | AppComponentGetAppComponentdefaultResponse
): response is AppComponentGetAppComponentdefaultResponse;
export function isUnexpected(
  response:
    | ServerMetricsCreateOrUpdateServerMetricsConfig200Response
    | ServerMetricsCreateOrUpdateServerMetricsConfig201Response
    | ServerMetricsCreateOrUpdateServerMetricsConfigdefaultResponse
): response is ServerMetricsCreateOrUpdateServerMetricsConfigdefaultResponse;
export function isUnexpected(
  response:
    | ServerMetricsGetServerMetricsConfigByName200Response
    | ServerMetricsGetServerMetricsConfigByNamedefaultResponse
): response is ServerMetricsGetServerMetricsConfigByNamedefaultResponse;
export function isUnexpected(
  response:
    | ServerMetricsDeleteServerMetricsConfig204Response
    | ServerMetricsDeleteServerMetricsConfigdefaultResponse
): response is ServerMetricsDeleteServerMetricsConfigdefaultResponse;
export function isUnexpected(
  response:
    | ServerMetricsGetServerMetricsConfig200Response
    | ServerMetricsGetServerMetricsConfigdefaultResponse
): response is ServerMetricsGetServerMetricsConfigdefaultResponse;
export function isUnexpected(
  response:
    | ServerMetricsGetServerDefaultMetricsConfig200Response
    | ServerMetricsGetServerDefaultMetricsConfigdefaultResponse
): response is ServerMetricsGetServerDefaultMetricsConfigdefaultResponse;
export function isUnexpected(
  response:
    | ServerMetricsListSupportedResourceTypes200Response
    | ServerMetricsListSupportedResourceTypesdefaultResponse
): response is ServerMetricsListSupportedResourceTypesdefaultResponse;
export function isUnexpected(
  response:
    | TestCreateOrUpdateTest200Response
    | TestCreateOrUpdateTest201Response
    | TestCreateOrUpdateTestdefaultResponse
): response is TestCreateOrUpdateTestdefaultResponse;
export function isUnexpected(
  response: TestDeleteLoadTest204Response | TestDeleteLoadTestdefaultResponse
): response is TestDeleteLoadTestdefaultResponse;
export function isUnexpected(
  response: TestGetLoadTest200Response | TestGetLoadTestdefaultResponse
): response is TestGetLoadTestdefaultResponse;
export function isUnexpected(
  response: TestListLoadTestSearch200Response | TestListLoadTestSearchdefaultResponse
): response is TestListLoadTestSearchdefaultResponse;
export function isUnexpected(
  response: TestUploadTestFile201Response | TestUploadTestFiledefaultResponse
): response is TestUploadTestFiledefaultResponse;
export function isUnexpected(
  response: TestGetTestFile200Response | TestGetTestFiledefaultResponse
): response is TestGetTestFiledefaultResponse;
export function isUnexpected(
  response: TestDeleteTestFile204Response | TestDeleteTestFiledefaultResponse
): response is TestDeleteTestFiledefaultResponse;
export function isUnexpected(
  response: TestListTestFiles200Response | TestListTestFilesdefaultResponse
): response is TestListTestFilesdefaultResponse;
export function isUnexpected(
  response: TestRunDeleteTestRun204Response | TestRunDeleteTestRundefaultResponse
): response is TestRunDeleteTestRundefaultResponse;
export function isUnexpected(
  response: TestRunCreateOrUpdateTestRun200Response | TestRunCreateOrUpdateTestRundefaultResponse
): response is TestRunCreateOrUpdateTestRundefaultResponse;
export function isUnexpected(
  response: TestRunGetTestRun200Response | TestRunGetTestRundefaultResponse
): response is TestRunGetTestRundefaultResponse;
export function isUnexpected(
  response: TestRunGetTestRunFile200Response | TestRunGetTestRunFiledefaultResponse
): response is TestRunGetTestRunFiledefaultResponse;
export function isUnexpected(
  response: TestRunListTestRuns200Response | TestRunListTestRunsdefaultResponse
): response is TestRunListTestRunsdefaultResponse;
export function isUnexpected(
  response: TestRunStopTestRun200Response | TestRunStopTestRundefaultResponse
): response is TestRunStopTestRundefaultResponse;
export function isUnexpected(
  response:
    | TestRunGetTestRunClientMetrics200Response
    | TestRunGetTestRunClientMetricsdefaultResponse
): response is TestRunGetTestRunClientMetricsdefaultResponse;
export function isUnexpected(
  response:
    | TestRunGetTestRunClientMetricsFilters200Response
    | TestRunGetTestRunClientMetricsFiltersdefaultResponse
): response is TestRunGetTestRunClientMetricsFiltersdefaultResponse;
export function isUnexpected(
  response:
    | AppComponentCreateOrUpdateAppComponents200Response
    | AppComponentCreateOrUpdateAppComponents201Response
    | AppComponentCreateOrUpdateAppComponentsdefaultResponse
    | AppComponentDeleteAppComponents204Response
    | AppComponentDeleteAppComponentsdefaultResponse
    | AppComponentGetAppComponentByName200Response
    | AppComponentGetAppComponentByNamedefaultResponse
    | AppComponentGetAppComponent200Response
    | AppComponentGetAppComponentdefaultResponse
    | ServerMetricsCreateOrUpdateServerMetricsConfig200Response
    | ServerMetricsCreateOrUpdateServerMetricsConfig201Response
    | ServerMetricsCreateOrUpdateServerMetricsConfigdefaultResponse
    | ServerMetricsGetServerMetricsConfigByName200Response
    | ServerMetricsGetServerMetricsConfigByNamedefaultResponse
    | ServerMetricsDeleteServerMetricsConfig204Response
    | ServerMetricsDeleteServerMetricsConfigdefaultResponse
    | ServerMetricsGetServerMetricsConfig200Response
    | ServerMetricsGetServerMetricsConfigdefaultResponse
    | ServerMetricsGetServerDefaultMetricsConfig200Response
    | ServerMetricsGetServerDefaultMetricsConfigdefaultResponse
    | ServerMetricsListSupportedResourceTypes200Response
    | ServerMetricsListSupportedResourceTypesdefaultResponse
    | TestCreateOrUpdateTest200Response
    | TestCreateOrUpdateTest201Response
    | TestCreateOrUpdateTestdefaultResponse
    | TestDeleteLoadTest204Response
    | TestDeleteLoadTestdefaultResponse
    | TestGetLoadTest200Response
    | TestGetLoadTestdefaultResponse
    | TestListLoadTestSearch200Response
    | TestListLoadTestSearchdefaultResponse
    | TestUploadTestFile201Response
    | TestUploadTestFiledefaultResponse
    | TestGetTestFile200Response
    | TestGetTestFiledefaultResponse
    | TestDeleteTestFile204Response
    | TestDeleteTestFiledefaultResponse
    | TestListTestFiles200Response
    | TestListTestFilesdefaultResponse
    | TestRunDeleteTestRun204Response
    | TestRunDeleteTestRundefaultResponse
    | TestRunCreateOrUpdateTestRun200Response
    | TestRunCreateOrUpdateTestRundefaultResponse
    | TestRunGetTestRun200Response
    | TestRunGetTestRundefaultResponse
    | TestRunGetTestRunFile200Response
    | TestRunGetTestRunFiledefaultResponse
    | TestRunListTestRuns200Response
    | TestRunListTestRunsdefaultResponse
    | TestRunStopTestRun200Response
    | TestRunStopTestRundefaultResponse
    | TestRunGetTestRunClientMetrics200Response
    | TestRunGetTestRunClientMetricsdefaultResponse
    | TestRunGetTestRunClientMetricsFilters200Response
    | TestRunGetTestRunClientMetricsFiltersdefaultResponse
): response is
  | AppComponentCreateOrUpdateAppComponentsdefaultResponse
  | AppComponentDeleteAppComponentsdefaultResponse
  | AppComponentGetAppComponentByNamedefaultResponse
  | AppComponentGetAppComponentdefaultResponse
  | ServerMetricsCreateOrUpdateServerMetricsConfigdefaultResponse
  | ServerMetricsGetServerMetricsConfigByNamedefaultResponse
  | ServerMetricsDeleteServerMetricsConfigdefaultResponse
  | ServerMetricsGetServerMetricsConfigdefaultResponse
  | ServerMetricsGetServerDefaultMetricsConfigdefaultResponse
  | ServerMetricsListSupportedResourceTypesdefaultResponse
  | TestCreateOrUpdateTestdefaultResponse
  | TestDeleteLoadTestdefaultResponse
  | TestGetLoadTestdefaultResponse
  | TestListLoadTestSearchdefaultResponse
  | TestUploadTestFiledefaultResponse
  | TestGetTestFiledefaultResponse
  | TestDeleteTestFiledefaultResponse
  | TestListTestFilesdefaultResponse
  | TestRunDeleteTestRundefaultResponse
  | TestRunCreateOrUpdateTestRundefaultResponse
  | TestRunGetTestRundefaultResponse
  | TestRunGetTestRunFiledefaultResponse
  | TestRunListTestRunsdefaultResponse
  | TestRunStopTestRundefaultResponse
  | TestRunGetTestRunClientMetricsdefaultResponse
  | TestRunGetTestRunClientMetricsFiltersdefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = geParametrizedPathSuccess(url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function geParametrizedPathSuccess(path: string): string[] {
  const pathParts = path.split("/");

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // If the candidate and actual paths don't match in size
    // we move on to the next candidate path
    if (candidateParts.length === pathParts.length && hasParametrizedPath(key)) {
      // track if we have found a match to return the values found.
      let found = true;
      for (let i = 0; i < candidateParts.length; i++) {
        if (candidateParts[i].startsWith("{") && candidateParts[i].endsWith("}")) {
          // If the current part of the candidate is a "template" part
          // it is a match with the actual path part on hand
          // skip as the parameterized part can match anything
          continue;
        }

        // If the candidate part is not a template and
        // the parts don't match mark the candidate as not found
        // to move on with the next candidate path.
        if (candidateParts[i] !== pathParts[i]) {
          found = false;
          break;
        }
      }

      // We finished evaluating the current candidate parts
      // if all parts matched we return the success values form
      // the path mapping.
      if (found) {
        return value;
      }
    }
  }

  // No match was found, return an empty array.
  return [];
}

function hasParametrizedPath(path: string): boolean {
  return path.includes("/{");
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
