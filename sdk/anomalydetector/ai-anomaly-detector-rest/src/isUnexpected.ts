// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  UnivariateDetectUnivariateEntireSeries200Response,
  UnivariateDetectUnivariateEntireSeriesDefaultResponse,
  UnivariateDetectUnivariateLastPoint200Response,
  UnivariateDetectUnivariateLastPointDefaultResponse,
  UnivariateDetectUnivariateChangePoint200Response,
  UnivariateDetectUnivariateChangePointDefaultResponse,
  MultivariateGetMultivariateBatchDetectionResult200Response,
  MultivariateGetMultivariateBatchDetectionResultDefaultResponse,
  MultivariateCreateAndTrainMultivariateModel201Response,
  MultivariateCreateAndTrainMultivariateModelDefaultResponse,
  MultivariateListMultivariateModels200Response,
  MultivariateListMultivariateModelsDefaultResponse,
  MultivariateDeleteMultivariateModel204Response,
  MultivariateDeleteMultivariateModelDefaultResponse,
  MultivariateGetMultivariateModel200Response,
  MultivariateGetMultivariateModelDefaultResponse,
  MultivariateDetectMultivariateBatchAnomaly202Response,
  MultivariateDetectMultivariateBatchAnomalyDefaultResponse,
  MultivariateDetectMultivariateLastAnomaly200Response,
  MultivariateDetectMultivariateLastAnomalyDefaultResponse,
} from "./responses";

const responseMap: Record<string, string[]> = {
  "POST /timeseries/entire/detect": ["200"],
  "POST /timeseries/last/detect": ["200"],
  "POST /timeseries/changepoint/detect": ["200"],
  "GET /multivariate/detect-batch/{resultId}": ["200"],
  "POST /multivariate/models": ["201"],
  "GET /multivariate/models": ["200"],
  "DELETE /multivariate/models/{modelId}": ["204"],
  "GET /multivariate/models/{modelId}": ["200"],
  "POST /multivariate/models/{modelId}:detect-batch": ["202"],
  "POST /multivariate/models/{modelId}:detect-last": ["200"],
};

export function isUnexpected(
  response:
    | UnivariateDetectUnivariateEntireSeries200Response
    | UnivariateDetectUnivariateEntireSeriesDefaultResponse
): response is UnivariateDetectUnivariateEntireSeriesDefaultResponse;
export function isUnexpected(
  response:
    | UnivariateDetectUnivariateLastPoint200Response
    | UnivariateDetectUnivariateLastPointDefaultResponse
): response is UnivariateDetectUnivariateLastPointDefaultResponse;
export function isUnexpected(
  response:
    | UnivariateDetectUnivariateChangePoint200Response
    | UnivariateDetectUnivariateChangePointDefaultResponse
): response is UnivariateDetectUnivariateChangePointDefaultResponse;
export function isUnexpected(
  response:
    | MultivariateGetMultivariateBatchDetectionResult200Response
    | MultivariateGetMultivariateBatchDetectionResultDefaultResponse
): response is MultivariateGetMultivariateBatchDetectionResultDefaultResponse;
export function isUnexpected(
  response:
    | MultivariateCreateAndTrainMultivariateModel201Response
    | MultivariateCreateAndTrainMultivariateModelDefaultResponse
): response is MultivariateCreateAndTrainMultivariateModelDefaultResponse;
export function isUnexpected(
  response:
    | MultivariateListMultivariateModels200Response
    | MultivariateListMultivariateModelsDefaultResponse
): response is MultivariateListMultivariateModelsDefaultResponse;
export function isUnexpected(
  response:
    | MultivariateDeleteMultivariateModel204Response
    | MultivariateDeleteMultivariateModelDefaultResponse
): response is MultivariateDeleteMultivariateModelDefaultResponse;
export function isUnexpected(
  response:
    | MultivariateGetMultivariateModel200Response
    | MultivariateGetMultivariateModelDefaultResponse
): response is MultivariateGetMultivariateModelDefaultResponse;
export function isUnexpected(
  response:
    | MultivariateDetectMultivariateBatchAnomaly202Response
    | MultivariateDetectMultivariateBatchAnomalyDefaultResponse
): response is MultivariateDetectMultivariateBatchAnomalyDefaultResponse;
export function isUnexpected(
  response:
    | MultivariateDetectMultivariateLastAnomaly200Response
    | MultivariateDetectMultivariateLastAnomalyDefaultResponse
): response is MultivariateDetectMultivariateLastAnomalyDefaultResponse;
export function isUnexpected(
  response:
    | UnivariateDetectUnivariateEntireSeries200Response
    | UnivariateDetectUnivariateEntireSeriesDefaultResponse
    | UnivariateDetectUnivariateLastPoint200Response
    | UnivariateDetectUnivariateLastPointDefaultResponse
    | UnivariateDetectUnivariateChangePoint200Response
    | UnivariateDetectUnivariateChangePointDefaultResponse
    | MultivariateGetMultivariateBatchDetectionResult200Response
    | MultivariateGetMultivariateBatchDetectionResultDefaultResponse
    | MultivariateCreateAndTrainMultivariateModel201Response
    | MultivariateCreateAndTrainMultivariateModelDefaultResponse
    | MultivariateListMultivariateModels200Response
    | MultivariateListMultivariateModelsDefaultResponse
    | MultivariateDeleteMultivariateModel204Response
    | MultivariateDeleteMultivariateModelDefaultResponse
    | MultivariateGetMultivariateModel200Response
    | MultivariateGetMultivariateModelDefaultResponse
    | MultivariateDetectMultivariateBatchAnomaly202Response
    | MultivariateDetectMultivariateBatchAnomalyDefaultResponse
    | MultivariateDetectMultivariateLastAnomaly200Response
    | MultivariateDetectMultivariateLastAnomalyDefaultResponse
): response is
  | UnivariateDetectUnivariateEntireSeriesDefaultResponse
  | UnivariateDetectUnivariateLastPointDefaultResponse
  | UnivariateDetectUnivariateChangePointDefaultResponse
  | MultivariateGetMultivariateBatchDetectionResultDefaultResponse
  | MultivariateCreateAndTrainMultivariateModelDefaultResponse
  | MultivariateListMultivariateModelsDefaultResponse
  | MultivariateDeleteMultivariateModelDefaultResponse
  | MultivariateGetMultivariateModelDefaultResponse
  | MultivariateDetectMultivariateBatchAnomalyDefaultResponse
  | MultivariateDetectMultivariateLastAnomalyDefaultResponse {
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
