// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DetectUnivariateEntireSeries200Response,
  DetectUnivariateEntireSeriesDefaultResponse,
  DetectUnivariateLastPoint200Response,
  DetectUnivariateLastPointDefaultResponse,
  DetectUnivariateChangePoint200Response,
  DetectUnivariateChangePointDefaultResponse,
  GetMultivariateBatchDetectionResult200Response,
  GetMultivariateBatchDetectionResultDefaultResponse,
  TrainMultivariateModel201Response,
  TrainMultivariateModelDefaultResponse,
  ListMultivariateModels200Response,
  ListMultivariateModelsDefaultResponse,
  DeleteMultivariateModel204Response,
  DeleteMultivariateModelDefaultResponse,
  GetMultivariateModel200Response,
  GetMultivariateModelDefaultResponse,
  DetectMultivariateBatchAnomaly202Response,
  DetectMultivariateBatchAnomalyDefaultResponse,
  DetectMultivariateLastAnomaly200Response,
  DetectMultivariateLastAnomalyDefaultResponse,
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
  response: DetectUnivariateEntireSeries200Response | DetectUnivariateEntireSeriesDefaultResponse,
): response is DetectUnivariateEntireSeriesDefaultResponse;
export function isUnexpected(
  response: DetectUnivariateLastPoint200Response | DetectUnivariateLastPointDefaultResponse,
): response is DetectUnivariateLastPointDefaultResponse;
export function isUnexpected(
  response: DetectUnivariateChangePoint200Response | DetectUnivariateChangePointDefaultResponse,
): response is DetectUnivariateChangePointDefaultResponse;
export function isUnexpected(
  response:
    | GetMultivariateBatchDetectionResult200Response
    | GetMultivariateBatchDetectionResultDefaultResponse,
): response is GetMultivariateBatchDetectionResultDefaultResponse;
export function isUnexpected(
  response: TrainMultivariateModel201Response | TrainMultivariateModelDefaultResponse,
): response is TrainMultivariateModelDefaultResponse;
export function isUnexpected(
  response: ListMultivariateModels200Response | ListMultivariateModelsDefaultResponse,
): response is ListMultivariateModelsDefaultResponse;
export function isUnexpected(
  response: DeleteMultivariateModel204Response | DeleteMultivariateModelDefaultResponse,
): response is DeleteMultivariateModelDefaultResponse;
export function isUnexpected(
  response: GetMultivariateModel200Response | GetMultivariateModelDefaultResponse,
): response is GetMultivariateModelDefaultResponse;
export function isUnexpected(
  response:
    | DetectMultivariateBatchAnomaly202Response
    | DetectMultivariateBatchAnomalyDefaultResponse,
): response is DetectMultivariateBatchAnomalyDefaultResponse;
export function isUnexpected(
  response: DetectMultivariateLastAnomaly200Response | DetectMultivariateLastAnomalyDefaultResponse,
): response is DetectMultivariateLastAnomalyDefaultResponse;
export function isUnexpected(
  response:
    | DetectUnivariateEntireSeries200Response
    | DetectUnivariateEntireSeriesDefaultResponse
    | DetectUnivariateLastPoint200Response
    | DetectUnivariateLastPointDefaultResponse
    | DetectUnivariateChangePoint200Response
    | DetectUnivariateChangePointDefaultResponse
    | GetMultivariateBatchDetectionResult200Response
    | GetMultivariateBatchDetectionResultDefaultResponse
    | TrainMultivariateModel201Response
    | TrainMultivariateModelDefaultResponse
    | ListMultivariateModels200Response
    | ListMultivariateModelsDefaultResponse
    | DeleteMultivariateModel204Response
    | DeleteMultivariateModelDefaultResponse
    | GetMultivariateModel200Response
    | GetMultivariateModelDefaultResponse
    | DetectMultivariateBatchAnomaly202Response
    | DetectMultivariateBatchAnomalyDefaultResponse
    | DetectMultivariateLastAnomaly200Response
    | DetectMultivariateLastAnomalyDefaultResponse,
): response is
  | DetectUnivariateEntireSeriesDefaultResponse
  | DetectUnivariateLastPointDefaultResponse
  | DetectUnivariateChangePointDefaultResponse
  | GetMultivariateBatchDetectionResultDefaultResponse
  | TrainMultivariateModelDefaultResponse
  | ListMultivariateModelsDefaultResponse
  | DeleteMultivariateModelDefaultResponse
  | GetMultivariateModelDefaultResponse
  | DetectMultivariateBatchAnomalyDefaultResponse
  | DetectMultivariateLastAnomalyDefaultResponse {
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
          pathParts[j] || "",
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
