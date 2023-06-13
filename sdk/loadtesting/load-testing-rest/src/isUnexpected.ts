// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  LoadTestAdministrationOperationsCreateOrUpdateTest200Response,
  LoadTestAdministrationOperationsCreateOrUpdateTest201Response,
  LoadTestAdministrationOperationsCreateOrUpdateTestDefaultResponse,
  LoadTestAdministrationOperationsDeleteTest204Response,
  LoadTestAdministrationOperationsDeleteTestDefaultResponse,
  LoadTestAdministrationOperationsGetTest200Response,
  LoadTestAdministrationOperationsGetTestDefaultResponse,
  LoadTestAdministrationOperationsListTests200Response,
  LoadTestAdministrationOperationsListTestsDefaultResponse,
  LoadTestAdministrationOperationsUploadTestFile201Response,
  LoadTestAdministrationOperationsUploadTestFileDefaultResponse,
  LoadTestAdministrationOperationsGetTestFile200Response,
  LoadTestAdministrationOperationsGetTestFileDefaultResponse,
  LoadTestAdministrationOperationsDeleteTestFile204Response,
  LoadTestAdministrationOperationsDeleteTestFileDefaultResponse,
  LoadTestAdministrationOperationsListTestFiles200Response,
  LoadTestAdministrationOperationsListTestFilesDefaultResponse,
  LoadTestAdministrationOperationsCreateOrUpdateAppComponents200Response,
  LoadTestAdministrationOperationsCreateOrUpdateAppComponents201Response,
  LoadTestAdministrationOperationsCreateOrUpdateAppComponentsDefaultResponse,
  LoadTestAdministrationOperationsGetAppComponents200Response,
  LoadTestAdministrationOperationsGetAppComponentsDefaultResponse,
  LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfig200Response,
  LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfig201Response,
  LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfigDefaultResponse,
  LoadTestAdministrationOperationsGetServerMetricsConfig200Response,
  LoadTestAdministrationOperationsGetServerMetricsConfigDefaultResponse,
  LoadTestRunOperationsGetTestRun200Response,
  LoadTestRunOperationsGetTestRunDefaultResponse,
  LoadTestRunOperationsCreateOrUpdateTestRun200Response,
  LoadTestRunOperationsCreateOrUpdateTestRun201Response,
  LoadTestRunOperationsCreateOrUpdateTestRunLogicalResponse,
  LoadTestRunOperationsCreateOrUpdateTestRunDefaultResponse,
  LoadTestRunOperationsDeleteTestRun204Response,
  LoadTestRunOperationsDeleteTestRunDefaultResponse,
  LoadTestRunOperationsGetTestRunFile200Response,
  LoadTestRunOperationsGetTestRunFileDefaultResponse,
  LoadTestRunOperationsListTestRuns200Response,
  LoadTestRunOperationsListTestRunsDefaultResponse,
  LoadTestRunOperationsStopTestRun200Response,
  LoadTestRunOperationsStopTestRunDefaultResponse,
  LoadTestRunOperationsListMetricNamespaces200Response,
  LoadTestRunOperationsListMetricNamespacesDefaultResponse,
  LoadTestRunOperationsListMetricDefinitions200Response,
  LoadTestRunOperationsListMetricDefinitionsDefaultResponse,
  LoadTestRunOperationsListMetrics200Response,
  LoadTestRunOperationsListMetricsDefaultResponse,
  LoadTestRunOperationsCreateOrUpdateAppComponents200Response,
  LoadTestRunOperationsCreateOrUpdateAppComponents201Response,
  LoadTestRunOperationsCreateOrUpdateAppComponentsDefaultResponse,
  LoadTestRunOperationsGetAppComponents200Response,
  LoadTestRunOperationsGetAppComponentsDefaultResponse,
  LoadTestRunOperationsCreateOrUpdateServerMetricsConfig200Response,
  LoadTestRunOperationsCreateOrUpdateServerMetricsConfig201Response,
  LoadTestRunOperationsCreateOrUpdateServerMetricsConfigDefaultResponse,
  LoadTestRunOperationsGetServerMetricsConfig200Response,
  LoadTestRunOperationsGetServerMetricsConfigDefaultResponse,
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
    | LoadTestAdministrationOperationsCreateOrUpdateTest200Response
    | LoadTestAdministrationOperationsCreateOrUpdateTest201Response
    | LoadTestAdministrationOperationsCreateOrUpdateTestDefaultResponse
): response is LoadTestAdministrationOperationsCreateOrUpdateTestDefaultResponse;
export function isUnexpected(
  response:
    | LoadTestAdministrationOperationsDeleteTest204Response
    | LoadTestAdministrationOperationsDeleteTestDefaultResponse
): response is LoadTestAdministrationOperationsDeleteTestDefaultResponse;
export function isUnexpected(
  response:
    | LoadTestAdministrationOperationsGetTest200Response
    | LoadTestAdministrationOperationsGetTestDefaultResponse
): response is LoadTestAdministrationOperationsGetTestDefaultResponse;
export function isUnexpected(
  response:
    | LoadTestAdministrationOperationsListTests200Response
    | LoadTestAdministrationOperationsListTestsDefaultResponse
): response is LoadTestAdministrationOperationsListTestsDefaultResponse;
export function isUnexpected(
  response:
    | LoadTestAdministrationOperationsUploadTestFile201Response
    | LoadTestAdministrationOperationsUploadTestFileDefaultResponse
): response is LoadTestAdministrationOperationsUploadTestFileDefaultResponse;
export function isUnexpected(
  response:
    | LoadTestAdministrationOperationsGetTestFile200Response
    | LoadTestAdministrationOperationsGetTestFileDefaultResponse
): response is LoadTestAdministrationOperationsGetTestFileDefaultResponse;
export function isUnexpected(
  response:
    | LoadTestAdministrationOperationsDeleteTestFile204Response
    | LoadTestAdministrationOperationsDeleteTestFileDefaultResponse
): response is LoadTestAdministrationOperationsDeleteTestFileDefaultResponse;
export function isUnexpected(
  response:
    | LoadTestAdministrationOperationsListTestFiles200Response
    | LoadTestAdministrationOperationsListTestFilesDefaultResponse
): response is LoadTestAdministrationOperationsListTestFilesDefaultResponse;
export function isUnexpected(
  response:
    | LoadTestAdministrationOperationsCreateOrUpdateAppComponents200Response
    | LoadTestAdministrationOperationsCreateOrUpdateAppComponents201Response
    | LoadTestAdministrationOperationsCreateOrUpdateAppComponentsDefaultResponse
): response is LoadTestAdministrationOperationsCreateOrUpdateAppComponentsDefaultResponse;
export function isUnexpected(
  response:
    | LoadTestAdministrationOperationsGetAppComponents200Response
    | LoadTestAdministrationOperationsGetAppComponentsDefaultResponse
): response is LoadTestAdministrationOperationsGetAppComponentsDefaultResponse;
export function isUnexpected(
  response:
    | LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfig200Response
    | LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfig201Response
    | LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfigDefaultResponse
): response is LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfigDefaultResponse;
export function isUnexpected(
  response:
    | LoadTestAdministrationOperationsGetServerMetricsConfig200Response
    | LoadTestAdministrationOperationsGetServerMetricsConfigDefaultResponse
): response is LoadTestAdministrationOperationsGetServerMetricsConfigDefaultResponse;
export function isUnexpected(
  response:
    | LoadTestRunOperationsGetTestRun200Response
    | LoadTestRunOperationsGetTestRunDefaultResponse
): response is LoadTestRunOperationsGetTestRunDefaultResponse;
export function isUnexpected(
  response:
    | LoadTestRunOperationsCreateOrUpdateTestRun200Response
    | LoadTestRunOperationsCreateOrUpdateTestRun201Response
    | LoadTestRunOperationsCreateOrUpdateTestRunLogicalResponse
    | LoadTestRunOperationsCreateOrUpdateTestRunDefaultResponse
): response is LoadTestRunOperationsCreateOrUpdateTestRunDefaultResponse;
export function isUnexpected(
  response:
    | LoadTestRunOperationsDeleteTestRun204Response
    | LoadTestRunOperationsDeleteTestRunDefaultResponse
): response is LoadTestRunOperationsDeleteTestRunDefaultResponse;
export function isUnexpected(
  response:
    | LoadTestRunOperationsGetTestRunFile200Response
    | LoadTestRunOperationsGetTestRunFileDefaultResponse
): response is LoadTestRunOperationsGetTestRunFileDefaultResponse;
export function isUnexpected(
  response:
    | LoadTestRunOperationsListTestRuns200Response
    | LoadTestRunOperationsListTestRunsDefaultResponse
): response is LoadTestRunOperationsListTestRunsDefaultResponse;
export function isUnexpected(
  response:
    | LoadTestRunOperationsStopTestRun200Response
    | LoadTestRunOperationsStopTestRunDefaultResponse
): response is LoadTestRunOperationsStopTestRunDefaultResponse;
export function isUnexpected(
  response:
    | LoadTestRunOperationsListMetricNamespaces200Response
    | LoadTestRunOperationsListMetricNamespacesDefaultResponse
): response is LoadTestRunOperationsListMetricNamespacesDefaultResponse;
export function isUnexpected(
  response:
    | LoadTestRunOperationsListMetricDefinitions200Response
    | LoadTestRunOperationsListMetricDefinitionsDefaultResponse
): response is LoadTestRunOperationsListMetricDefinitionsDefaultResponse;
export function isUnexpected(
  response:
    | LoadTestRunOperationsListMetrics200Response
    | LoadTestRunOperationsListMetricsDefaultResponse
): response is LoadTestRunOperationsListMetricsDefaultResponse;
export function isUnexpected(
  response:
    | LoadTestRunOperationsCreateOrUpdateAppComponents200Response
    | LoadTestRunOperationsCreateOrUpdateAppComponents201Response
    | LoadTestRunOperationsCreateOrUpdateAppComponentsDefaultResponse
): response is LoadTestRunOperationsCreateOrUpdateAppComponentsDefaultResponse;
export function isUnexpected(
  response:
    | LoadTestRunOperationsGetAppComponents200Response
    | LoadTestRunOperationsGetAppComponentsDefaultResponse
): response is LoadTestRunOperationsGetAppComponentsDefaultResponse;
export function isUnexpected(
  response:
    | LoadTestRunOperationsCreateOrUpdateServerMetricsConfig200Response
    | LoadTestRunOperationsCreateOrUpdateServerMetricsConfig201Response
    | LoadTestRunOperationsCreateOrUpdateServerMetricsConfigDefaultResponse
): response is LoadTestRunOperationsCreateOrUpdateServerMetricsConfigDefaultResponse;
export function isUnexpected(
  response:
    | LoadTestRunOperationsGetServerMetricsConfig200Response
    | LoadTestRunOperationsGetServerMetricsConfigDefaultResponse
): response is LoadTestRunOperationsGetServerMetricsConfigDefaultResponse;
export function isUnexpected(
  response:
    | LoadTestAdministrationOperationsCreateOrUpdateTest200Response
    | LoadTestAdministrationOperationsCreateOrUpdateTest201Response
    | LoadTestAdministrationOperationsCreateOrUpdateTestDefaultResponse
    | LoadTestAdministrationOperationsDeleteTest204Response
    | LoadTestAdministrationOperationsDeleteTestDefaultResponse
    | LoadTestAdministrationOperationsGetTest200Response
    | LoadTestAdministrationOperationsGetTestDefaultResponse
    | LoadTestAdministrationOperationsListTests200Response
    | LoadTestAdministrationOperationsListTestsDefaultResponse
    | LoadTestAdministrationOperationsUploadTestFile201Response
    | LoadTestAdministrationOperationsUploadTestFileDefaultResponse
    | LoadTestAdministrationOperationsGetTestFile200Response
    | LoadTestAdministrationOperationsGetTestFileDefaultResponse
    | LoadTestAdministrationOperationsDeleteTestFile204Response
    | LoadTestAdministrationOperationsDeleteTestFileDefaultResponse
    | LoadTestAdministrationOperationsListTestFiles200Response
    | LoadTestAdministrationOperationsListTestFilesDefaultResponse
    | LoadTestAdministrationOperationsCreateOrUpdateAppComponents200Response
    | LoadTestAdministrationOperationsCreateOrUpdateAppComponents201Response
    | LoadTestAdministrationOperationsCreateOrUpdateAppComponentsDefaultResponse
    | LoadTestAdministrationOperationsGetAppComponents200Response
    | LoadTestAdministrationOperationsGetAppComponentsDefaultResponse
    | LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfig200Response
    | LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfig201Response
    | LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfigDefaultResponse
    | LoadTestAdministrationOperationsGetServerMetricsConfig200Response
    | LoadTestAdministrationOperationsGetServerMetricsConfigDefaultResponse
    | LoadTestRunOperationsGetTestRun200Response
    | LoadTestRunOperationsGetTestRunDefaultResponse
    | LoadTestRunOperationsCreateOrUpdateTestRun200Response
    | LoadTestRunOperationsCreateOrUpdateTestRun201Response
    | LoadTestRunOperationsCreateOrUpdateTestRunLogicalResponse
    | LoadTestRunOperationsCreateOrUpdateTestRunDefaultResponse
    | LoadTestRunOperationsDeleteTestRun204Response
    | LoadTestRunOperationsDeleteTestRunDefaultResponse
    | LoadTestRunOperationsGetTestRunFile200Response
    | LoadTestRunOperationsGetTestRunFileDefaultResponse
    | LoadTestRunOperationsListTestRuns200Response
    | LoadTestRunOperationsListTestRunsDefaultResponse
    | LoadTestRunOperationsStopTestRun200Response
    | LoadTestRunOperationsStopTestRunDefaultResponse
    | LoadTestRunOperationsListMetricNamespaces200Response
    | LoadTestRunOperationsListMetricNamespacesDefaultResponse
    | LoadTestRunOperationsListMetricDefinitions200Response
    | LoadTestRunOperationsListMetricDefinitionsDefaultResponse
    | LoadTestRunOperationsListMetrics200Response
    | LoadTestRunOperationsListMetricsDefaultResponse
    | LoadTestRunOperationsCreateOrUpdateAppComponents200Response
    | LoadTestRunOperationsCreateOrUpdateAppComponents201Response
    | LoadTestRunOperationsCreateOrUpdateAppComponentsDefaultResponse
    | LoadTestRunOperationsGetAppComponents200Response
    | LoadTestRunOperationsGetAppComponentsDefaultResponse
    | LoadTestRunOperationsCreateOrUpdateServerMetricsConfig200Response
    | LoadTestRunOperationsCreateOrUpdateServerMetricsConfig201Response
    | LoadTestRunOperationsCreateOrUpdateServerMetricsConfigDefaultResponse
    | LoadTestRunOperationsGetServerMetricsConfig200Response
    | LoadTestRunOperationsGetServerMetricsConfigDefaultResponse
): response is
  | LoadTestAdministrationOperationsCreateOrUpdateTestDefaultResponse
  | LoadTestAdministrationOperationsDeleteTestDefaultResponse
  | LoadTestAdministrationOperationsGetTestDefaultResponse
  | LoadTestAdministrationOperationsListTestsDefaultResponse
  | LoadTestAdministrationOperationsUploadTestFileDefaultResponse
  | LoadTestAdministrationOperationsGetTestFileDefaultResponse
  | LoadTestAdministrationOperationsDeleteTestFileDefaultResponse
  | LoadTestAdministrationOperationsListTestFilesDefaultResponse
  | LoadTestAdministrationOperationsCreateOrUpdateAppComponentsDefaultResponse
  | LoadTestAdministrationOperationsGetAppComponentsDefaultResponse
  | LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfigDefaultResponse
  | LoadTestAdministrationOperationsGetServerMetricsConfigDefaultResponse
  | LoadTestRunOperationsGetTestRunDefaultResponse
  | LoadTestRunOperationsCreateOrUpdateTestRunDefaultResponse
  | LoadTestRunOperationsDeleteTestRunDefaultResponse
  | LoadTestRunOperationsGetTestRunFileDefaultResponse
  | LoadTestRunOperationsListTestRunsDefaultResponse
  | LoadTestRunOperationsStopTestRunDefaultResponse
  | LoadTestRunOperationsListMetricNamespacesDefaultResponse
  | LoadTestRunOperationsListMetricDefinitionsDefaultResponse
  | LoadTestRunOperationsListMetricsDefaultResponse
  | LoadTestRunOperationsCreateOrUpdateAppComponentsDefaultResponse
  | LoadTestRunOperationsGetAppComponentsDefaultResponse
  | LoadTestRunOperationsCreateOrUpdateServerMetricsConfigDefaultResponse
  | LoadTestRunOperationsGetServerMetricsConfigDefaultResponse {
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
