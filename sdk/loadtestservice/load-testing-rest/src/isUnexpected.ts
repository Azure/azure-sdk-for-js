// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TestCreateOrUpdate200Response,
  TestCreateOrUpdate201Response,
  TestCreateOrUpdateDefaultResponse,
  TestDelete204Response,
  TestDeleteDefaultResponse,
  TestGet200Response,
  TestGetDefaultResponse,
  TestList200Response,
  TestListDefaultResponse,
  TestUploadFile201Response,
  TestUploadFileDefaultResponse,
  TestGetFile200Response,
  TestGetFileDefaultResponse,
  TestDeleteFile204Response,
  TestDeleteFileDefaultResponse,
  TestListFiles200Response,
  TestListFilesDefaultResponse,
  TestCreateOrUpdateAppComponent200Response,
  TestCreateOrUpdateAppComponent201Response,
  TestCreateOrUpdateAppComponentDefaultResponse,
  TestGetAppComponents200Response,
  TestGetAppComponentsDefaultResponse,
  TestCreateOrUpdateServerMetricsConfig200Response,
  TestCreateOrUpdateServerMetricsConfig201Response,
  TestCreateOrUpdateServerMetricsConfigDefaultResponse,
  TestGetServerMetricsConfig200Response,
  TestGetServerMetricsConfigDefaultResponse,
  TestRunDelete204Response,
  TestRunDeleteDefaultResponse,
  TestRunCreateOrUpdate200Response,
  TestRunCreateOrUpdate201Response,
  TestRunCreateOrUpdateDefaultResponse,
  TestRunGet200Response,
  TestRunGetDefaultResponse,
  TestRunGetFile200Response,
  TestRunGetFileDefaultResponse,
  TestRunList200Response,
  TestRunListDefaultResponse,
  TestRunStop200Response,
  TestRunStopDefaultResponse,
  TestRunListMetricNamespaces200Response,
  TestRunListMetricNamespacesDefaultResponse,
  TestRunListMetricDefinitions200Response,
  TestRunListMetricDefinitionsDefaultResponse,
  TestRunGetMetrics200Response,
  TestRunGetMetricsDefaultResponse,
  TestRunGetMetricDimensionValues200Response,
  TestRunGetMetricDimensionValuesDefaultResponse,
  TestRunCreateOrUpdateAppComponent200Response,
  TestRunCreateOrUpdateAppComponent201Response,
  TestRunCreateOrUpdateAppComponentDefaultResponse,
  TestRunGetAppComponents200Response,
  TestRunGetAppComponentsDefaultResponse,
  TestRunCreateOrUpdateServerMetricsConfig200Response,
  TestRunCreateOrUpdateServerMetricsConfig201Response,
  TestRunCreateOrUpdateServerMetricsConfigDefaultResponse,
  TestRunGetServerMetricsConfig200Response,
  TestRunGetServerMetricsConfigDefaultResponse,
} from "./responses";

const responseMap: Record<string, string[]> = {
  "PATCH /tests/{testId}": ["200", "201"],
  "DELETE /tests/{testId}": ["204"],
  "GET /tests/{testId}": ["200"],
  "GET /tests": ["200"],
  "PUT /tests/{testId}/files/{fileName}": ["201"],
  "GET /tests/{testId}/files/{fileName}": ["200"],
  "DELETE /tests/{testId}/files/{fileName}": ["204"],
  "GET /tests/{testId}/files": ["200"],
  "PATCH /tests/{testId}/app-components": ["200", "201"],
  "GET /tests/{testId}/app-components": ["200"],
  "PATCH /tests/{testId}/server-metric-configs": ["200", "201"],
  "GET /tests/{testId}/server-metric-configs": ["200"],
  "DELETE /test-runs/{testRunId}": ["204"],
  "PATCH /test-runs/{testRunId}": ["200", "201"],
  "GET /test-runs/{testRunId}": ["200"],
  "GET /test-runs/{testRunId}/files/{fileName}": ["200"],
  "GET /test-runs": ["200"],
  "POST /test-runs/{testRunId}:stop": ["200"],
  "GET /test-runs/{testRunId}/metric-namespaces": ["200"],
  "GET /test-runs/{testRunId}/metric-definitions": ["200"],
  "POST /test-runs/{testRunId}/metrics": ["200"],
  "GET /test-runs/{testRunId}/metric-dimension/{name}/values": ["200"],
  "PATCH /test-runs/{testRunId}/app-components": ["200", "201"],
  "GET /test-runs/{testRunId}/app-components": ["200"],
  "PATCH /test-runs/{testRunId}/server-metric-configs": ["200", "201"],
  "GET /test-runs/{testRunId}/server-metric-configs": ["200"],
};

export function isUnexpected(
  response:
    | TestCreateOrUpdate200Response
    | TestCreateOrUpdate201Response
    | TestCreateOrUpdateDefaultResponse
): response is TestCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: TestDelete204Response | TestDeleteDefaultResponse
): response is TestDeleteDefaultResponse;
export function isUnexpected(
  response: TestGet200Response | TestGetDefaultResponse
): response is TestGetDefaultResponse;
export function isUnexpected(
  response: TestList200Response | TestListDefaultResponse
): response is TestListDefaultResponse;
export function isUnexpected(
  response: TestUploadFile201Response | TestUploadFileDefaultResponse
): response is TestUploadFileDefaultResponse;
export function isUnexpected(
  response: TestGetFile200Response | TestGetFileDefaultResponse
): response is TestGetFileDefaultResponse;
export function isUnexpected(
  response: TestDeleteFile204Response | TestDeleteFileDefaultResponse
): response is TestDeleteFileDefaultResponse;
export function isUnexpected(
  response: TestListFiles200Response | TestListFilesDefaultResponse
): response is TestListFilesDefaultResponse;
export function isUnexpected(
  response:
    | TestCreateOrUpdateAppComponent200Response
    | TestCreateOrUpdateAppComponent201Response
    | TestCreateOrUpdateAppComponentDefaultResponse
): response is TestCreateOrUpdateAppComponentDefaultResponse;
export function isUnexpected(
  response: TestGetAppComponents200Response | TestGetAppComponentsDefaultResponse
): response is TestGetAppComponentsDefaultResponse;
export function isUnexpected(
  response:
    | TestCreateOrUpdateServerMetricsConfig200Response
    | TestCreateOrUpdateServerMetricsConfig201Response
    | TestCreateOrUpdateServerMetricsConfigDefaultResponse
): response is TestCreateOrUpdateServerMetricsConfigDefaultResponse;
export function isUnexpected(
  response: TestGetServerMetricsConfig200Response | TestGetServerMetricsConfigDefaultResponse
): response is TestGetServerMetricsConfigDefaultResponse;
export function isUnexpected(
  response: TestRunDelete204Response | TestRunDeleteDefaultResponse
): response is TestRunDeleteDefaultResponse;
export function isUnexpected(
  response:
    | TestRunCreateOrUpdate200Response
    | TestRunCreateOrUpdate201Response
    | TestRunCreateOrUpdateDefaultResponse
): response is TestRunCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: TestRunGet200Response | TestRunGetDefaultResponse
): response is TestRunGetDefaultResponse;
export function isUnexpected(
  response: TestRunGetFile200Response | TestRunGetFileDefaultResponse
): response is TestRunGetFileDefaultResponse;
export function isUnexpected(
  response: TestRunList200Response | TestRunListDefaultResponse
): response is TestRunListDefaultResponse;
export function isUnexpected(
  response: TestRunStop200Response | TestRunStopDefaultResponse
): response is TestRunStopDefaultResponse;
export function isUnexpected(
  response: TestRunListMetricNamespaces200Response | TestRunListMetricNamespacesDefaultResponse
): response is TestRunListMetricNamespacesDefaultResponse;
export function isUnexpected(
  response: TestRunListMetricDefinitions200Response | TestRunListMetricDefinitionsDefaultResponse
): response is TestRunListMetricDefinitionsDefaultResponse;
export function isUnexpected(
  response: TestRunGetMetrics200Response | TestRunGetMetricsDefaultResponse
): response is TestRunGetMetricsDefaultResponse;
export function isUnexpected(
  response:
    | TestRunGetMetricDimensionValues200Response
    | TestRunGetMetricDimensionValuesDefaultResponse
): response is TestRunGetMetricDimensionValuesDefaultResponse;
export function isUnexpected(
  response:
    | TestRunCreateOrUpdateAppComponent200Response
    | TestRunCreateOrUpdateAppComponent201Response
    | TestRunCreateOrUpdateAppComponentDefaultResponse
): response is TestRunCreateOrUpdateAppComponentDefaultResponse;
export function isUnexpected(
  response: TestRunGetAppComponents200Response | TestRunGetAppComponentsDefaultResponse
): response is TestRunGetAppComponentsDefaultResponse;
export function isUnexpected(
  response:
    | TestRunCreateOrUpdateServerMetricsConfig200Response
    | TestRunCreateOrUpdateServerMetricsConfig201Response
    | TestRunCreateOrUpdateServerMetricsConfigDefaultResponse
): response is TestRunCreateOrUpdateServerMetricsConfigDefaultResponse;
export function isUnexpected(
  response: TestRunGetServerMetricsConfig200Response | TestRunGetServerMetricsConfigDefaultResponse
): response is TestRunGetServerMetricsConfigDefaultResponse;
export function isUnexpected(
  response:
    | TestCreateOrUpdate200Response
    | TestCreateOrUpdate201Response
    | TestCreateOrUpdateDefaultResponse
    | TestDelete204Response
    | TestDeleteDefaultResponse
    | TestGet200Response
    | TestGetDefaultResponse
    | TestList200Response
    | TestListDefaultResponse
    | TestUploadFile201Response
    | TestUploadFileDefaultResponse
    | TestGetFile200Response
    | TestGetFileDefaultResponse
    | TestDeleteFile204Response
    | TestDeleteFileDefaultResponse
    | TestListFiles200Response
    | TestListFilesDefaultResponse
    | TestCreateOrUpdateAppComponent200Response
    | TestCreateOrUpdateAppComponent201Response
    | TestCreateOrUpdateAppComponentDefaultResponse
    | TestGetAppComponents200Response
    | TestGetAppComponentsDefaultResponse
    | TestCreateOrUpdateServerMetricsConfig200Response
    | TestCreateOrUpdateServerMetricsConfig201Response
    | TestCreateOrUpdateServerMetricsConfigDefaultResponse
    | TestGetServerMetricsConfig200Response
    | TestGetServerMetricsConfigDefaultResponse
    | TestRunDelete204Response
    | TestRunDeleteDefaultResponse
    | TestRunCreateOrUpdate200Response
    | TestRunCreateOrUpdate201Response
    | TestRunCreateOrUpdateDefaultResponse
    | TestRunGet200Response
    | TestRunGetDefaultResponse
    | TestRunGetFile200Response
    | TestRunGetFileDefaultResponse
    | TestRunList200Response
    | TestRunListDefaultResponse
    | TestRunStop200Response
    | TestRunStopDefaultResponse
    | TestRunListMetricNamespaces200Response
    | TestRunListMetricNamespacesDefaultResponse
    | TestRunListMetricDefinitions200Response
    | TestRunListMetricDefinitionsDefaultResponse
    | TestRunGetMetrics200Response
    | TestRunGetMetricsDefaultResponse
    | TestRunGetMetricDimensionValues200Response
    | TestRunGetMetricDimensionValuesDefaultResponse
    | TestRunCreateOrUpdateAppComponent200Response
    | TestRunCreateOrUpdateAppComponent201Response
    | TestRunCreateOrUpdateAppComponentDefaultResponse
    | TestRunGetAppComponents200Response
    | TestRunGetAppComponentsDefaultResponse
    | TestRunCreateOrUpdateServerMetricsConfig200Response
    | TestRunCreateOrUpdateServerMetricsConfig201Response
    | TestRunCreateOrUpdateServerMetricsConfigDefaultResponse
    | TestRunGetServerMetricsConfig200Response
    | TestRunGetServerMetricsConfigDefaultResponse
): response is
  | TestCreateOrUpdateDefaultResponse
  | TestDeleteDefaultResponse
  | TestGetDefaultResponse
  | TestListDefaultResponse
  | TestUploadFileDefaultResponse
  | TestGetFileDefaultResponse
  | TestDeleteFileDefaultResponse
  | TestListFilesDefaultResponse
  | TestCreateOrUpdateAppComponentDefaultResponse
  | TestGetAppComponentsDefaultResponse
  | TestCreateOrUpdateServerMetricsConfigDefaultResponse
  | TestGetServerMetricsConfigDefaultResponse
  | TestRunDeleteDefaultResponse
  | TestRunCreateOrUpdateDefaultResponse
  | TestRunGetDefaultResponse
  | TestRunGetFileDefaultResponse
  | TestRunListDefaultResponse
  | TestRunStopDefaultResponse
  | TestRunListMetricNamespacesDefaultResponse
  | TestRunListMetricDefinitionsDefaultResponse
  | TestRunGetMetricsDefaultResponse
  | TestRunGetMetricDimensionValuesDefaultResponse
  | TestRunCreateOrUpdateAppComponentDefaultResponse
  | TestRunGetAppComponentsDefaultResponse
  | TestRunCreateOrUpdateServerMetricsConfigDefaultResponse
  | TestRunGetServerMetricsConfigDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = geParametrizedPathSuccess(method, url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function geParametrizedPathSuccess(method: string, path: string): string[] {
  const pathParts = path.split("/");

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    if (!key.startsWith(method)) {
      continue;
    }
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // If the candidate and actual paths don't match in size
    // we move on to the next candidate path
    if (candidateParts.length === pathParts.length && hasParametrizedPath(key)) {
      // track if we have found a match to return the values found.
      let found = true;
      for (let i = 0; i < candidateParts.length; i++) {
        if (candidateParts[i]?.startsWith("{") && candidateParts[i]?.endsWith("}")) {
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
