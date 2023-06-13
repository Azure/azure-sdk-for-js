// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CreateOrUpdateTest200Response,
  CreateOrUpdateTest201Response,
  CreateOrUpdateTestDefaultResponse,
  DeleteTest204Response,
  DeleteTestDefaultResponse,
  GetTest200Response,
  GetTestDefaultResponse,
  ListTests200Response,
  ListTestsDefaultResponse,
  UploadTestFile201Response,
  UploadTestFileDefaultResponse,
  GetTestFile200Response,
  GetTestFileDefaultResponse,
  DeleteTestFile204Response,
  DeleteTestFileDefaultResponse,
  ListTestFiles200Response,
  ListTestFilesDefaultResponse,
  CreateOrUpdateAppComponents200Response,
  CreateOrUpdateAppComponents201Response,
  CreateOrUpdateAppComponentsDefaultResponse,
  GetAppComponents200Response,
  GetAppComponentsDefaultResponse,
  CreateOrUpdateServerMetricsConfig200Response,
  CreateOrUpdateServerMetricsConfig201Response,
  CreateOrUpdateServerMetricsConfigDefaultResponse,
  GetServerMetricsConfig200Response,
  GetServerMetricsConfigDefaultResponse,
  GetTestRun200Response,
  GetTestRunDefaultResponse,
  CreateOrUpdateTestRun200Response,
  CreateOrUpdateTestRun201Response,
  CreateOrUpdateTestRunLogicalResponse,
  CreateOrUpdateTestRunDefaultResponse,
  DeleteTestRun204Response,
  DeleteTestRunDefaultResponse,
  GetTestRunFile200Response,
  GetTestRunFileDefaultResponse,
  ListTestRuns200Response,
  ListTestRunsDefaultResponse,
  StopTestRun200Response,
  StopTestRunDefaultResponse,
  ListMetricNamespaces200Response,
  ListMetricNamespacesDefaultResponse,
  ListMetricDefinitions200Response,
  ListMetricDefinitionsDefaultResponse,
  ListMetrics200Response,
  ListMetricsDefaultResponse,
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
  "PATCH /tests/{testId}/server-metrics-config": ["200", "201"],
  "GET /tests/{testId}/server-metrics-config": ["200"],
  "GET /test-runs/{testRunId}": ["200"],
  "PATCH /test-runs/{testRunId}": ["200", "201"],
  "DELETE /test-runs/{testRunId}": ["204"],
  "GET /test-runs/{testRunId}/files/{fileName}": ["200"],
  "GET /test-runs": ["200"],
  "POST /test-runs/{testRunId}:stop": ["200"],
  "GET /test-runs/{testRunId}/metric-namespaces": ["200"],
  "GET /test-runs/{testRunId}/metric-definitions": ["200"],
  "POST /test-runs/{testRunId}/metrics": ["200"],
  "PATCH /test-runs/{testRunId}/app-components": ["200", "201"],
  "GET /test-runs/{testRunId}/app-components": ["200"],
  "PATCH /test-runs/{testRunId}/server-metrics-config": ["200", "201"],
  "GET /test-runs/{testRunId}/server-metrics-config": ["200"],
};

export function isUnexpected(
  response:
    | CreateOrUpdateTest200Response
    | CreateOrUpdateTest201Response
    | CreateOrUpdateTestDefaultResponse
): response is CreateOrUpdateTestDefaultResponse;
export function isUnexpected(
  response: DeleteTest204Response | DeleteTestDefaultResponse
): response is DeleteTestDefaultResponse;
export function isUnexpected(
  response: GetTest200Response | GetTestDefaultResponse
): response is GetTestDefaultResponse;
export function isUnexpected(
  response: ListTests200Response | ListTestsDefaultResponse
): response is ListTestsDefaultResponse;
export function isUnexpected(
  response: UploadTestFile201Response | UploadTestFileDefaultResponse
): response is UploadTestFileDefaultResponse;
export function isUnexpected(
  response: GetTestFile200Response | GetTestFileDefaultResponse
): response is GetTestFileDefaultResponse;
export function isUnexpected(
  response: DeleteTestFile204Response | DeleteTestFileDefaultResponse
): response is DeleteTestFileDefaultResponse;
export function isUnexpected(
  response: ListTestFiles200Response | ListTestFilesDefaultResponse
): response is ListTestFilesDefaultResponse;
export function isUnexpected(
  response:
    | CreateOrUpdateAppComponents200Response
    | CreateOrUpdateAppComponents201Response
    | CreateOrUpdateAppComponentsDefaultResponse
): response is CreateOrUpdateAppComponentsDefaultResponse;
export function isUnexpected(
  response: GetAppComponents200Response | GetAppComponentsDefaultResponse
): response is GetAppComponentsDefaultResponse;
export function isUnexpected(
  response:
    | CreateOrUpdateServerMetricsConfig200Response
    | CreateOrUpdateServerMetricsConfig201Response
    | CreateOrUpdateServerMetricsConfigDefaultResponse
): response is CreateOrUpdateServerMetricsConfigDefaultResponse;
export function isUnexpected(
  response: GetServerMetricsConfig200Response | GetServerMetricsConfigDefaultResponse
): response is GetServerMetricsConfigDefaultResponse;
export function isUnexpected(
  response: GetTestRun200Response | GetTestRunDefaultResponse
): response is GetTestRunDefaultResponse;
export function isUnexpected(
  response:
    | CreateOrUpdateTestRun200Response
    | CreateOrUpdateTestRun201Response
    | CreateOrUpdateTestRunLogicalResponse
    | CreateOrUpdateTestRunDefaultResponse
): response is CreateOrUpdateTestRunDefaultResponse;
export function isUnexpected(
  response: DeleteTestRun204Response | DeleteTestRunDefaultResponse
): response is DeleteTestRunDefaultResponse;
export function isUnexpected(
  response: GetTestRunFile200Response | GetTestRunFileDefaultResponse
): response is GetTestRunFileDefaultResponse;
export function isUnexpected(
  response: ListTestRuns200Response | ListTestRunsDefaultResponse
): response is ListTestRunsDefaultResponse;
export function isUnexpected(
  response: StopTestRun200Response | StopTestRunDefaultResponse
): response is StopTestRunDefaultResponse;
export function isUnexpected(
  response: ListMetricNamespaces200Response | ListMetricNamespacesDefaultResponse
): response is ListMetricNamespacesDefaultResponse;
export function isUnexpected(
  response: ListMetricDefinitions200Response | ListMetricDefinitionsDefaultResponse
): response is ListMetricDefinitionsDefaultResponse;
export function isUnexpected(
  response: ListMetrics200Response | ListMetricsDefaultResponse
): response is ListMetricsDefaultResponse;
export function isUnexpected(
  response:
    | CreateOrUpdateAppComponents200Response
    | CreateOrUpdateAppComponents201Response
    | CreateOrUpdateAppComponentsDefaultResponse
): response is CreateOrUpdateAppComponentsDefaultResponse;
export function isUnexpected(
  response: GetAppComponents200Response | GetAppComponentsDefaultResponse
): response is GetAppComponentsDefaultResponse;
export function isUnexpected(
  response:
    | CreateOrUpdateServerMetricsConfig200Response
    | CreateOrUpdateServerMetricsConfig201Response
    | CreateOrUpdateServerMetricsConfigDefaultResponse
): response is CreateOrUpdateServerMetricsConfigDefaultResponse;
export function isUnexpected(
  response: GetServerMetricsConfig200Response | GetServerMetricsConfigDefaultResponse
): response is GetServerMetricsConfigDefaultResponse;
export function isUnexpected(
  response:
    | CreateOrUpdateTest200Response
    | CreateOrUpdateTest201Response
    | CreateOrUpdateTestDefaultResponse
    | DeleteTest204Response
    | DeleteTestDefaultResponse
    | GetTest200Response
    | GetTestDefaultResponse
    | ListTests200Response
    | ListTestsDefaultResponse
    | UploadTestFile201Response
    | UploadTestFileDefaultResponse
    | GetTestFile200Response
    | GetTestFileDefaultResponse
    | DeleteTestFile204Response
    | DeleteTestFileDefaultResponse
    | ListTestFiles200Response
    | ListTestFilesDefaultResponse
    | CreateOrUpdateAppComponents200Response
    | CreateOrUpdateAppComponents201Response
    | CreateOrUpdateAppComponentsDefaultResponse
    | GetAppComponents200Response
    | GetAppComponentsDefaultResponse
    | CreateOrUpdateServerMetricsConfig200Response
    | CreateOrUpdateServerMetricsConfig201Response
    | CreateOrUpdateServerMetricsConfigDefaultResponse
    | GetServerMetricsConfig200Response
    | GetServerMetricsConfigDefaultResponse
    | GetTestRun200Response
    | GetTestRunDefaultResponse
    | CreateOrUpdateTestRun200Response
    | CreateOrUpdateTestRun201Response
    | CreateOrUpdateTestRunLogicalResponse
    | CreateOrUpdateTestRunDefaultResponse
    | DeleteTestRun204Response
    | DeleteTestRunDefaultResponse
    | GetTestRunFile200Response
    | GetTestRunFileDefaultResponse
    | ListTestRuns200Response
    | ListTestRunsDefaultResponse
    | StopTestRun200Response
    | StopTestRunDefaultResponse
    | ListMetricNamespaces200Response
    | ListMetricNamespacesDefaultResponse
    | ListMetricDefinitions200Response
    | ListMetricDefinitionsDefaultResponse
    | ListMetrics200Response
    | ListMetricsDefaultResponse
): response is
  | CreateOrUpdateTestDefaultResponse
  | DeleteTestDefaultResponse
  | GetTestDefaultResponse
  | ListTestsDefaultResponse
  | UploadTestFileDefaultResponse
  | GetTestFileDefaultResponse
  | DeleteTestFileDefaultResponse
  | ListTestFilesDefaultResponse
  | CreateOrUpdateAppComponentsDefaultResponse
  | GetAppComponentsDefaultResponse
  | CreateOrUpdateServerMetricsConfigDefaultResponse
  | GetServerMetricsConfigDefaultResponse
  | GetTestRunDefaultResponse
  | CreateOrUpdateTestRunDefaultResponse
  | DeleteTestRunDefaultResponse
  | GetTestRunFileDefaultResponse
  | ListTestRunsDefaultResponse
  | StopTestRunDefaultResponse
  | ListMetricNamespacesDefaultResponse
  | ListMetricDefinitionsDefaultResponse
  | ListMetricsDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = getParametrizedPathSuccess(method, url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function getParametrizedPathSuccess(method: string, path: string): string[] {
  const pathParts = path.split("/");

  // Traverse list to match the longest candidate
  // matchedLen: the length of candidate path
  // matchedValue: the matched status code array
  let matchedLen = -1,
    matchedValue: string[] = [];

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

    // track if we have found a match to return the values found.
    let found = true;
    for (let i = candidateParts.length - 1, j = pathParts.length - 1; i >= 1 && j >= 1; i--, j--) {
      if (candidateParts[i]?.startsWith("{") && candidateParts[i]?.indexOf("}") !== -1) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(`${candidateParts[i]?.slice(start, end)}`).test(
          pathParts[j] || ""
        );

        if (!isMatched) {
          found = false;
          break;
        }
        continue;
      }

      // If the candidate part is not a template and
      // the parts don't match mark the candidate as not found
      // to move on with the next candidate path.
      if (candidateParts[i] !== pathParts[j]) {
        found = false;
        break;
      }
    }

    // We finished evaluating the current candidate parts
    // Update the matched value if and only if we found the longer pattern
    if (found && candidatePath.length > matchedLen) {
      matchedLen = candidatePath.length;
      matchedValue = value;
    }
  }

  return matchedValue;
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
