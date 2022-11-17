// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  LoadTestAdministrationCreateOrUpdateTest200Response,
  LoadTestAdministrationCreateOrUpdateTest201Response,
  LoadTestAdministrationCreateOrUpdateTestdefaultResponse,
  LoadTestAdministrationDeleteTest204Response,
  LoadTestAdministrationDeleteTestdefaultResponse,
  LoadTestAdministrationGetTest200Response,
  LoadTestAdministrationGetTestdefaultResponse,
  LoadTestAdministrationListTests200Response,
  LoadTestAdministrationListTestsdefaultResponse,
  LoadTestAdministrationUploadFile201Response,
  LoadTestAdministrationUploadFiledefaultResponse,
  LoadTestAdministrationGetFile200Response,
  LoadTestAdministrationGetFiledefaultResponse,
  LoadTestAdministrationDeleteFile204Response,
  LoadTestAdministrationDeleteFiledefaultResponse,
  LoadTestAdministrationListFilesTest200Response,
  LoadTestAdministrationListFilesTestdefaultResponse,
  LoadTestAdministrationCreateOrUpdateAppComponentTest200Response,
  LoadTestAdministrationCreateOrUpdateAppComponentTest201Response,
  LoadTestAdministrationCreateOrUpdateAppComponentTestdefaultResponse,
  LoadTestAdministrationGetAppComponentsTest200Response,
  LoadTestAdministrationGetAppComponentsTestdefaultResponse,
  LoadTestAdministrationCreateOrUpdateServerMetricsConfigTest200Response,
  LoadTestAdministrationCreateOrUpdateServerMetricsConfigTest201Response,
  LoadTestAdministrationCreateOrUpdateServerMetricsConfigTestdefaultResponse,
  LoadTestAdministrationGetServerMetricsConfigTest200Response,
  LoadTestAdministrationGetServerMetricsConfigTestdefaultResponse,
  TestRunDelete204Response,
  TestRunDeletedefaultResponse,
  TestRunCreateOrUpdate200Response,
  TestRunCreateOrUpdatedefaultResponse,
  TestRunGet200Response,
  TestRunGetdefaultResponse,
  TestRunGetFile200Response,
  TestRunGetFiledefaultResponse,
  TestRunList200Response,
  TestRunListdefaultResponse,
  TestRunStop200Response,
  TestRunStopdefaultResponse,
  TestRunListMetricNamespaces200Response,
  TestRunListMetricNamespacesdefaultResponse,
  TestRunListMetricDefinitions200Response,
  TestRunListMetricDefinitionsdefaultResponse,
  TestRunGetMetrics200Response,
  TestRunGetMetricsdefaultResponse,
  TestRunCreateOrUpdateAppComponent200Response,
  TestRunCreateOrUpdateAppComponent201Response,
  TestRunCreateOrUpdateAppComponentdefaultResponse,
  TestRunGetAppComponents200Response,
  TestRunGetAppComponentsdefaultResponse,
  TestRunCreateOrUpdateServerMetricsConfig200Response,
  TestRunCreateOrUpdateServerMetricsConfig201Response,
  TestRunCreateOrUpdateServerMetricsConfigdefaultResponse,
  TestRunGetServerMetricsConfig200Response,
  TestRunGetServerMetricsConfigdefaultResponse,
} from "./responses";

const responseMap: Record<string, string[]> = {
  "PATCH /tests/{testId}": ["200", "201"],
  "DELETE /tests/{testId}": ["204"],
  "GET /tests/{testId}": ["200"],
  "GET /tests": ["200"],
  "PUT /tests/{testId}/files/{fileId}": ["201"],
  "GET /tests/{testId}/files/{fileId}": ["200"],
  "DELETE /tests/{testId}/files/{fileId}": ["204"],
  "GET /tests/{testId}/files": ["200"],
  "PATCH /tests/{testId}/app-components": ["200", "201"],
  "GET /tests/{testId}/app-components": ["200"],
  "PATCH /tests/{testId}/server-metric-configs": ["200", "201"],
  "GET /tests/{testId}/server-metric-configs": ["200"],
  "DELETE /test-runs/{testRunId}": ["204"],
  "PATCH /test-runs/{testRunId}": ["200"],
  "GET /test-runs/{testRunId}": ["200"],
  "GET /test-runs/{testRunId}/files/{fileId}": ["200"],
  "GET /test-runs": ["200"],
  "POST /test-runs/{testRunId}:stop": ["200"],
  "GET /test-runs/{testRunId}/metric-namespaces": ["200"],
  "GET /test-runs/{testRunId}/metric-definitions": ["200"],
  "POST /test-runs/{testRunId}/metrics": ["200"],
  "PATCH /test-runs/{testRunId}/app-components": ["200", "201"],
  "GET /test-runs/{testRunId}/app-components": ["200"],
  "PATCH /test-runs/{testRunId}/server-metric-configs": ["200", "201"],
  "GET /test-runs/{testRunId}/server-metric-configs": ["200"],
};

export function isUnexpected(
  response:
    | LoadTestAdministrationCreateOrUpdateTest200Response
    | LoadTestAdministrationCreateOrUpdateTest201Response
    | LoadTestAdministrationCreateOrUpdateTestdefaultResponse
): response is LoadTestAdministrationCreateOrUpdateTestdefaultResponse;
export function isUnexpected(
  response:
    | LoadTestAdministrationDeleteTest204Response
    | LoadTestAdministrationDeleteTestdefaultResponse
): response is LoadTestAdministrationDeleteTestdefaultResponse;
export function isUnexpected(
  response: LoadTestAdministrationGetTest200Response | LoadTestAdministrationGetTestdefaultResponse
): response is LoadTestAdministrationGetTestdefaultResponse;
export function isUnexpected(
  response:
    | LoadTestAdministrationListTests200Response
    | LoadTestAdministrationListTestsdefaultResponse
): response is LoadTestAdministrationListTestsdefaultResponse;
export function isUnexpected(
  response:
    | LoadTestAdministrationUploadFile201Response
    | LoadTestAdministrationUploadFiledefaultResponse
): response is LoadTestAdministrationUploadFiledefaultResponse;
export function isUnexpected(
  response: LoadTestAdministrationGetFile200Response | LoadTestAdministrationGetFiledefaultResponse
): response is LoadTestAdministrationGetFiledefaultResponse;
export function isUnexpected(
  response:
    | LoadTestAdministrationDeleteFile204Response
    | LoadTestAdministrationDeleteFiledefaultResponse
): response is LoadTestAdministrationDeleteFiledefaultResponse;
export function isUnexpected(
  response:
    | LoadTestAdministrationListFilesTest200Response
    | LoadTestAdministrationListFilesTestdefaultResponse
): response is LoadTestAdministrationListFilesTestdefaultResponse;
export function isUnexpected(
  response:
    | LoadTestAdministrationCreateOrUpdateAppComponentTest200Response
    | LoadTestAdministrationCreateOrUpdateAppComponentTest201Response
    | LoadTestAdministrationCreateOrUpdateAppComponentTestdefaultResponse
): response is LoadTestAdministrationCreateOrUpdateAppComponentTestdefaultResponse;
export function isUnexpected(
  response:
    | LoadTestAdministrationGetAppComponentsTest200Response
    | LoadTestAdministrationGetAppComponentsTestdefaultResponse
): response is LoadTestAdministrationGetAppComponentsTestdefaultResponse;
export function isUnexpected(
  response:
    | LoadTestAdministrationCreateOrUpdateServerMetricsConfigTest200Response
    | LoadTestAdministrationCreateOrUpdateServerMetricsConfigTest201Response
    | LoadTestAdministrationCreateOrUpdateServerMetricsConfigTestdefaultResponse
): response is LoadTestAdministrationCreateOrUpdateServerMetricsConfigTestdefaultResponse;
export function isUnexpected(
  response:
    | LoadTestAdministrationGetServerMetricsConfigTest200Response
    | LoadTestAdministrationGetServerMetricsConfigTestdefaultResponse
): response is LoadTestAdministrationGetServerMetricsConfigTestdefaultResponse;
export function isUnexpected(
  response: TestRunDelete204Response | TestRunDeletedefaultResponse
): response is TestRunDeletedefaultResponse;
export function isUnexpected(
  response: TestRunCreateOrUpdate200Response | TestRunCreateOrUpdatedefaultResponse
): response is TestRunCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: TestRunGet200Response | TestRunGetdefaultResponse
): response is TestRunGetdefaultResponse;
export function isUnexpected(
  response: TestRunGetFile200Response | TestRunGetFiledefaultResponse
): response is TestRunGetFiledefaultResponse;
export function isUnexpected(
  response: TestRunList200Response | TestRunListdefaultResponse
): response is TestRunListdefaultResponse;
export function isUnexpected(
  response: TestRunStop200Response | TestRunStopdefaultResponse
): response is TestRunStopdefaultResponse;
export function isUnexpected(
  response: TestRunListMetricNamespaces200Response | TestRunListMetricNamespacesdefaultResponse
): response is TestRunListMetricNamespacesdefaultResponse;
export function isUnexpected(
  response: TestRunListMetricDefinitions200Response | TestRunListMetricDefinitionsdefaultResponse
): response is TestRunListMetricDefinitionsdefaultResponse;
export function isUnexpected(
  response: TestRunGetMetrics200Response | TestRunGetMetricsdefaultResponse
): response is TestRunGetMetricsdefaultResponse;
export function isUnexpected(
  response:
    | TestRunCreateOrUpdateAppComponent200Response
    | TestRunCreateOrUpdateAppComponent201Response
    | TestRunCreateOrUpdateAppComponentdefaultResponse
): response is TestRunCreateOrUpdateAppComponentdefaultResponse;
export function isUnexpected(
  response: TestRunGetAppComponents200Response | TestRunGetAppComponentsdefaultResponse
): response is TestRunGetAppComponentsdefaultResponse;
export function isUnexpected(
  response:
    | TestRunCreateOrUpdateServerMetricsConfig200Response
    | TestRunCreateOrUpdateServerMetricsConfig201Response
    | TestRunCreateOrUpdateServerMetricsConfigdefaultResponse
): response is TestRunCreateOrUpdateServerMetricsConfigdefaultResponse;
export function isUnexpected(
  response: TestRunGetServerMetricsConfig200Response | TestRunGetServerMetricsConfigdefaultResponse
): response is TestRunGetServerMetricsConfigdefaultResponse;
export function isUnexpected(
  response:
    | LoadTestAdministrationCreateOrUpdateTest200Response
    | LoadTestAdministrationCreateOrUpdateTest201Response
    | LoadTestAdministrationCreateOrUpdateTestdefaultResponse
    | LoadTestAdministrationDeleteTest204Response
    | LoadTestAdministrationDeleteTestdefaultResponse
    | LoadTestAdministrationGetTest200Response
    | LoadTestAdministrationGetTestdefaultResponse
    | LoadTestAdministrationListTests200Response
    | LoadTestAdministrationListTestsdefaultResponse
    | LoadTestAdministrationUploadFile201Response
    | LoadTestAdministrationUploadFiledefaultResponse
    | LoadTestAdministrationGetFile200Response
    | LoadTestAdministrationGetFiledefaultResponse
    | LoadTestAdministrationDeleteFile204Response
    | LoadTestAdministrationDeleteFiledefaultResponse
    | LoadTestAdministrationListFilesTest200Response
    | LoadTestAdministrationListFilesTestdefaultResponse
    | LoadTestAdministrationCreateOrUpdateAppComponentTest200Response
    | LoadTestAdministrationCreateOrUpdateAppComponentTest201Response
    | LoadTestAdministrationCreateOrUpdateAppComponentTestdefaultResponse
    | LoadTestAdministrationGetAppComponentsTest200Response
    | LoadTestAdministrationGetAppComponentsTestdefaultResponse
    | LoadTestAdministrationCreateOrUpdateServerMetricsConfigTest200Response
    | LoadTestAdministrationCreateOrUpdateServerMetricsConfigTest201Response
    | LoadTestAdministrationCreateOrUpdateServerMetricsConfigTestdefaultResponse
    | LoadTestAdministrationGetServerMetricsConfigTest200Response
    | LoadTestAdministrationGetServerMetricsConfigTestdefaultResponse
    | TestRunDelete204Response
    | TestRunDeletedefaultResponse
    | TestRunCreateOrUpdate200Response
    | TestRunCreateOrUpdatedefaultResponse
    | TestRunGet200Response
    | TestRunGetdefaultResponse
    | TestRunGetFile200Response
    | TestRunGetFiledefaultResponse
    | TestRunList200Response
    | TestRunListdefaultResponse
    | TestRunStop200Response
    | TestRunStopdefaultResponse
    | TestRunListMetricNamespaces200Response
    | TestRunListMetricNamespacesdefaultResponse
    | TestRunListMetricDefinitions200Response
    | TestRunListMetricDefinitionsdefaultResponse
    | TestRunGetMetrics200Response
    | TestRunGetMetricsdefaultResponse
    | TestRunCreateOrUpdateAppComponent200Response
    | TestRunCreateOrUpdateAppComponent201Response
    | TestRunCreateOrUpdateAppComponentdefaultResponse
    | TestRunGetAppComponents200Response
    | TestRunGetAppComponentsdefaultResponse
    | TestRunCreateOrUpdateServerMetricsConfig200Response
    | TestRunCreateOrUpdateServerMetricsConfig201Response
    | TestRunCreateOrUpdateServerMetricsConfigdefaultResponse
    | TestRunGetServerMetricsConfig200Response
    | TestRunGetServerMetricsConfigdefaultResponse
): response is
  | LoadTestAdministrationCreateOrUpdateTestdefaultResponse
  | LoadTestAdministrationDeleteTestdefaultResponse
  | LoadTestAdministrationGetTestdefaultResponse
  | LoadTestAdministrationListTestsdefaultResponse
  | LoadTestAdministrationUploadFiledefaultResponse
  | LoadTestAdministrationGetFiledefaultResponse
  | LoadTestAdministrationDeleteFiledefaultResponse
  | LoadTestAdministrationListFilesTestdefaultResponse
  | LoadTestAdministrationCreateOrUpdateAppComponentTestdefaultResponse
  | LoadTestAdministrationGetAppComponentsTestdefaultResponse
  | LoadTestAdministrationCreateOrUpdateServerMetricsConfigTestdefaultResponse
  | LoadTestAdministrationGetServerMetricsConfigTestdefaultResponse
  | TestRunDeletedefaultResponse
  | TestRunCreateOrUpdatedefaultResponse
  | TestRunGetdefaultResponse
  | TestRunGetFiledefaultResponse
  | TestRunListdefaultResponse
  | TestRunStopdefaultResponse
  | TestRunListMetricNamespacesdefaultResponse
  | TestRunListMetricDefinitionsdefaultResponse
  | TestRunGetMetricsdefaultResponse
  | TestRunCreateOrUpdateAppComponentdefaultResponse
  | TestRunGetAppComponentsdefaultResponse
  | TestRunCreateOrUpdateServerMetricsConfigdefaultResponse
  | TestRunGetServerMetricsConfigdefaultResponse {
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
