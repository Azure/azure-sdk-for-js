// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BatchDetectAnomaly202Response,
  BatchDetectAnomalyDefaultResponse,
  CreateMultivariateModel201Response,
  CreateMultivariateModelDefaultResponse,
  DeleteMultivariateModel204Response,
  DeleteMultivariateModelDefaultResponse,
  DetectChangePoint200Response,
  DetectChangePointDefaultResponse,
  DetectEntireSeries200Response,
  DetectEntireSeriesDefaultResponse,
  DetectLastPoint200Response,
  DetectLastPointDefaultResponse,
  GetBatchDetectionResult200Response,
  GetBatchDetectionResultDefaultResponse,
  GetMultivariateModel200Response,
  GetMultivariateModelDefaultResponse,
  LastDetectAnomaly200Response,
  LastDetectAnomalyDefaultResponse,
  ListMultivariateModel200Response,
  ListMultivariateModelDefaultResponse,
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
  response: DetectEntireSeries200Response | DetectEntireSeriesDefaultResponse
): response is DetectEntireSeriesDefaultResponse;
export function isUnexpected(
  response: DetectLastPoint200Response | DetectLastPointDefaultResponse
): response is DetectLastPointDefaultResponse;
export function isUnexpected(
  response: DetectChangePoint200Response | DetectChangePointDefaultResponse
): response is DetectChangePointDefaultResponse;
export function isUnexpected(
  response: GetBatchDetectionResult200Response | GetBatchDetectionResultDefaultResponse
): response is GetBatchDetectionResultDefaultResponse;
export function isUnexpected(
  response: CreateMultivariateModel201Response | CreateMultivariateModelDefaultResponse
): response is CreateMultivariateModelDefaultResponse;
export function isUnexpected(
  response: ListMultivariateModel200Response | ListMultivariateModelDefaultResponse
): response is ListMultivariateModelDefaultResponse;
export function isUnexpected(
  response: DeleteMultivariateModel204Response | DeleteMultivariateModelDefaultResponse
): response is DeleteMultivariateModelDefaultResponse;
export function isUnexpected(
  response: GetMultivariateModel200Response | GetMultivariateModelDefaultResponse
): response is GetMultivariateModelDefaultResponse;
export function isUnexpected(
  response: BatchDetectAnomaly202Response | BatchDetectAnomalyDefaultResponse
): response is BatchDetectAnomalyDefaultResponse;
export function isUnexpected(
  response: LastDetectAnomaly200Response | LastDetectAnomalyDefaultResponse
): response is LastDetectAnomalyDefaultResponse;
export function isUnexpected(
  response:
    | DetectEntireSeries200Response
    | DetectEntireSeriesDefaultResponse
    | DetectLastPoint200Response
    | DetectLastPointDefaultResponse
    | DetectChangePoint200Response
    | DetectChangePointDefaultResponse
    | GetBatchDetectionResult200Response
    | GetBatchDetectionResultDefaultResponse
    | CreateMultivariateModel201Response
    | CreateMultivariateModelDefaultResponse
    | ListMultivariateModel200Response
    | ListMultivariateModelDefaultResponse
    | DeleteMultivariateModel204Response
    | DeleteMultivariateModelDefaultResponse
    | GetMultivariateModel200Response
    | GetMultivariateModelDefaultResponse
    | BatchDetectAnomaly202Response
    | BatchDetectAnomalyDefaultResponse
    | LastDetectAnomaly200Response
    | LastDetectAnomalyDefaultResponse
): response is
  | DetectEntireSeriesDefaultResponse
  | DetectLastPointDefaultResponse
  | DetectChangePointDefaultResponse
  | GetBatchDetectionResultDefaultResponse
  | CreateMultivariateModelDefaultResponse
  | ListMultivariateModelDefaultResponse
  | DeleteMultivariateModelDefaultResponse
  | GetMultivariateModelDefaultResponse
  | BatchDetectAnomalyDefaultResponse
  | LastDetectAnomalyDefaultResponse {
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
