// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DetectUnivariateEntireSeries200Response,
  DetectUnivariateEntireSeriesDefaultResponse,
  DetectUnivariateLastPoint200Response,
  DetectUnivariateLastPointDefaultResponse,
  DetectUnivariateChangePoint200Response,
  DetectUnivariateChangePointDefaultResponse,
  GetMultivariateBatchDetectionResult200Response,
  GetMultivariateBatchDetectionResultDefaultResponse,
  CreateAndTrainMultivariateModel201Response,
  CreateAndTrainMultivariateModelDefaultResponse,
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
  "GET /multivariate/models/{modelId}:detect-batch": ["202"],
  "POST /multivariate/models/{modelId}:detect-last": ["200"],
};

export function isUnexpected(
  response: DetectUnivariateEntireSeries200Response | DetectUnivariateEntireSeriesDefaultResponse
): response is DetectUnivariateEntireSeriesDefaultResponse;
export function isUnexpected(
  response: DetectUnivariateLastPoint200Response | DetectUnivariateLastPointDefaultResponse
): response is DetectUnivariateLastPointDefaultResponse;
export function isUnexpected(
  response: DetectUnivariateChangePoint200Response | DetectUnivariateChangePointDefaultResponse
): response is DetectUnivariateChangePointDefaultResponse;
export function isUnexpected(
  response:
    | GetMultivariateBatchDetectionResult200Response
    | GetMultivariateBatchDetectionResultDefaultResponse
): response is GetMultivariateBatchDetectionResultDefaultResponse;
export function isUnexpected(
  response:
    | CreateAndTrainMultivariateModel201Response
    | CreateAndTrainMultivariateModelDefaultResponse
): response is CreateAndTrainMultivariateModelDefaultResponse;
export function isUnexpected(
  response: ListMultivariateModels200Response | ListMultivariateModelsDefaultResponse
): response is ListMultivariateModelsDefaultResponse;
export function isUnexpected(
  response: DeleteMultivariateModel204Response | DeleteMultivariateModelDefaultResponse
): response is DeleteMultivariateModelDefaultResponse;
export function isUnexpected(
  response: GetMultivariateModel200Response | GetMultivariateModelDefaultResponse
): response is GetMultivariateModelDefaultResponse;
export function isUnexpected(
  response:
    | DetectMultivariateBatchAnomaly202Response
    | DetectMultivariateBatchAnomalyDefaultResponse
): response is DetectMultivariateBatchAnomalyDefaultResponse;
export function isUnexpected(
  response: DetectMultivariateLastAnomaly200Response | DetectMultivariateLastAnomalyDefaultResponse
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
    | CreateAndTrainMultivariateModel201Response
    | CreateAndTrainMultivariateModelDefaultResponse
    | ListMultivariateModels200Response
    | ListMultivariateModelsDefaultResponse
    | DeleteMultivariateModel204Response
    | DeleteMultivariateModelDefaultResponse
    | GetMultivariateModel200Response
    | GetMultivariateModelDefaultResponse
    | DetectMultivariateBatchAnomaly202Response
    | DetectMultivariateBatchAnomalyDefaultResponse
    | DetectMultivariateLastAnomaly200Response
    | DetectMultivariateLastAnomalyDefaultResponse
): response is
  | DetectUnivariateEntireSeriesDefaultResponse
  | DetectUnivariateLastPointDefaultResponse
  | DetectUnivariateChangePointDefaultResponse
  | GetMultivariateBatchDetectionResultDefaultResponse
  | CreateAndTrainMultivariateModelDefaultResponse
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
