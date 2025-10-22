// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ContentAnalyzersGetOperationStatus200Response,
  ContentAnalyzersGetOperationStatusDefaultResponse,
  ContentAnalyzersCreateOrReplace200Response,
  ContentAnalyzersCreateOrReplace201Response,
  ContentAnalyzersCreateOrReplaceLogicalResponse,
  ContentAnalyzersCreateOrReplaceDefaultResponse,
  ContentAnalyzersUpdate200Response,
  ContentAnalyzersUpdateDefaultResponse,
  ContentAnalyzersGet200Response,
  ContentAnalyzersGetDefaultResponse,
  ContentAnalyzersDelete204Response,
  ContentAnalyzersDeleteDefaultResponse,
  ContentAnalyzersList200Response,
  ContentAnalyzersListDefaultResponse,
  ContentAnalyzersAnalyze202Response,
  ContentAnalyzersAnalyzeLogicalResponse,
  ContentAnalyzersAnalyzeDefaultResponse,
  ContentAnalyzersAnalyzeBinary202Response,
  ContentAnalyzersAnalyzeBinaryLogicalResponse,
  ContentAnalyzersAnalyzeBinaryDefaultResponse,
  ContentAnalyzersGetResult200Response,
  ContentAnalyzersGetResultDefaultResponse,
  PersonDirectoriesCreate201Response,
  PersonDirectoriesCreateDefaultResponse,
  PersonDirectoriesUpdate200Response,
  PersonDirectoriesUpdateDefaultResponse,
  PersonDirectoriesGet200Response,
  PersonDirectoriesGetDefaultResponse,
  PersonDirectoriesDelete204Response,
  PersonDirectoriesDeleteDefaultResponse,
  PersonDirectoriesList200Response,
  PersonDirectoriesListDefaultResponse,
  PersonDirectoriesUpdatePerson200Response,
  PersonDirectoriesUpdatePersonDefaultResponse,
  PersonDirectoriesGetPerson200Response,
  PersonDirectoriesGetPersonDefaultResponse,
  PersonDirectoriesDeletePerson204Response,
  PersonDirectoriesDeletePersonDefaultResponse,
  PersonDirectoriesListPersons200Response,
  PersonDirectoriesListPersonsDefaultResponse,
  PersonDirectoriesAddFace201Response,
  PersonDirectoriesAddFaceDefaultResponse,
  PersonDirectoriesListFaces200Response,
  PersonDirectoriesListFacesDefaultResponse,
  PersonDirectoriesUpdateFace200Response,
  PersonDirectoriesUpdateFaceDefaultResponse,
  PersonDirectoriesGetFace200Response,
  PersonDirectoriesGetFaceDefaultResponse,
  PersonDirectoriesDeleteFace204Response,
  PersonDirectoriesDeleteFaceDefaultResponse,
  PersonDirectoriesIdentifyPerson200Response,
  PersonDirectoriesIdentifyPersonDefaultResponse,
  PersonDirectoriesFindSimilarFaces200Response,
  PersonDirectoriesFindSimilarFacesDefaultResponse,
  PersonDirectoriesVerifyPerson200Response,
  PersonDirectoriesVerifyPersonDefaultResponse,
  FacesDetect200Response,
  FacesDetectDefaultResponse,
  FacesCompare200Response,
  FacesCompareDefaultResponse,
  ContentClassifiersGetOperationStatus200Response,
  ContentClassifiersGetOperationStatusDefaultResponse,
  ContentClassifiersCreateOrReplace200Response,
  ContentClassifiersCreateOrReplace201Response,
  ContentClassifiersCreateOrReplaceLogicalResponse,
  ContentClassifiersCreateOrReplaceDefaultResponse,
  ContentClassifiersUpdate200Response,
  ContentClassifiersUpdateDefaultResponse,
  ContentClassifiersGet200Response,
  ContentClassifiersGetDefaultResponse,
  ContentClassifiersDelete204Response,
  ContentClassifiersDeleteDefaultResponse,
  ContentClassifiersList200Response,
  ContentClassifiersListDefaultResponse,
  ContentClassifiersClassify202Response,
  ContentClassifiersClassifyLogicalResponse,
  ContentClassifiersClassifyDefaultResponse,
  ContentClassifiersClassifyBinary202Response,
  ContentClassifiersClassifyBinaryLogicalResponse,
  ContentClassifiersClassifyBinaryDefaultResponse,
  ContentClassifiersGetResult200Response,
  ContentClassifiersGetResultDefaultResponse,
} from "./responses.js";

const responseMap: Record<string, string[]> = {
  "GET /analyzers/{analyzerId}/operations/{operationId}": ["200"],
  "GET /analyzers/{analyzerId}": ["200"],
  "PUT /analyzers/{analyzerId}": ["200", "201"],
  "PATCH /analyzers/{analyzerId}": ["200"],
  "DELETE /analyzers/{analyzerId}": ["204"],
  "GET /analyzers": ["200"],
  "GET /analyzers/{analyzerId}:analyze": ["200", "202"],
  "POST /analyzers/{analyzerId}:analyze": ["202"],
  "GET /analyzerResults/{operationId}": ["200"],
  "PUT /personDirectories/{personDirectoryId}": ["201"],
  "PATCH /personDirectories/{personDirectoryId}": ["200"],
  "GET /personDirectories/{personDirectoryId}": ["200"],
  "DELETE /personDirectories/{personDirectoryId}": ["204"],
  "GET /personDirectories": ["200"],
  "PATCH /personDirectories/{personDirectoryId}/persons/{personId}": ["200"],
  "GET /personDirectories/{personDirectoryId}/persons/{personId}": ["200"],
  "DELETE /personDirectories/{personDirectoryId}/persons/{personId}": ["204"],
  "GET /personDirectories/{personDirectoryId}/persons": ["200"],
  "POST /personDirectories/{personDirectoryId}/faces": ["201"],
  "GET /personDirectories/{personDirectoryId}/faces": ["200"],
  "PATCH /personDirectories/{personDirectoryId}/faces/{faceId}": ["200"],
  "GET /personDirectories/{personDirectoryId}/faces/{faceId}": ["200"],
  "DELETE /personDirectories/{personDirectoryId}/faces/{faceId}": ["204"],
  "POST /personDirectories/{personDirectoryId}/persons:identify": ["200"],
  "POST /personDirectories/{personDirectoryId}/faces:find": ["200"],
  "POST /personDirectories/{personDirectoryId}/persons/{personId}:verify": [
    "200",
  ],
  "POST /faces:detect": ["200"],
  "POST /faces:compare": ["200"],
  "GET /classifiers/{classifierId}/operations/{operationId}": ["200"],
  "GET /classifiers/{classifierId}": ["200"],
  "PUT /classifiers/{classifierId}": ["200", "201"],
  "PATCH /classifiers/{classifierId}": ["200"],
  "DELETE /classifiers/{classifierId}": ["204"],
  "GET /classifiers": ["200"],
  "GET /classifiers/{classifierId}:classify": ["200", "202"],
  "POST /classifiers/{classifierId}:classify": ["202"],
  "GET /classifierResults/{operationId}": ["200"],
};

export function isUnexpected(
  response:
    | ContentAnalyzersGetOperationStatus200Response
    | ContentAnalyzersGetOperationStatusDefaultResponse,
): response is ContentAnalyzersGetOperationStatusDefaultResponse;
export function isUnexpected(
  response:
    | ContentAnalyzersCreateOrReplace200Response
    | ContentAnalyzersCreateOrReplace201Response
    | ContentAnalyzersCreateOrReplaceLogicalResponse
    | ContentAnalyzersCreateOrReplaceDefaultResponse,
): response is ContentAnalyzersCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response:
    | ContentAnalyzersUpdate200Response
    | ContentAnalyzersUpdateDefaultResponse,
): response is ContentAnalyzersUpdateDefaultResponse;
export function isUnexpected(
  response: ContentAnalyzersGet200Response | ContentAnalyzersGetDefaultResponse,
): response is ContentAnalyzersGetDefaultResponse;
export function isUnexpected(
  response:
    | ContentAnalyzersDelete204Response
    | ContentAnalyzersDeleteDefaultResponse,
): response is ContentAnalyzersDeleteDefaultResponse;
export function isUnexpected(
  response:
    | ContentAnalyzersList200Response
    | ContentAnalyzersListDefaultResponse,
): response is ContentAnalyzersListDefaultResponse;
export function isUnexpected(
  response:
    | ContentAnalyzersAnalyze202Response
    | ContentAnalyzersAnalyzeLogicalResponse
    | ContentAnalyzersAnalyzeDefaultResponse,
): response is ContentAnalyzersAnalyzeDefaultResponse;
export function isUnexpected(
  response:
    | ContentAnalyzersAnalyzeBinary202Response
    | ContentAnalyzersAnalyzeBinaryLogicalResponse
    | ContentAnalyzersAnalyzeBinaryDefaultResponse,
): response is ContentAnalyzersAnalyzeBinaryDefaultResponse;
export function isUnexpected(
  response:
    | ContentAnalyzersGetResult200Response
    | ContentAnalyzersGetResultDefaultResponse,
): response is ContentAnalyzersGetResultDefaultResponse;
export function isUnexpected(
  response:
    | PersonDirectoriesCreate201Response
    | PersonDirectoriesCreateDefaultResponse,
): response is PersonDirectoriesCreateDefaultResponse;
export function isUnexpected(
  response:
    | PersonDirectoriesUpdate200Response
    | PersonDirectoriesUpdateDefaultResponse,
): response is PersonDirectoriesUpdateDefaultResponse;
export function isUnexpected(
  response:
    | PersonDirectoriesGet200Response
    | PersonDirectoriesGetDefaultResponse,
): response is PersonDirectoriesGetDefaultResponse;
export function isUnexpected(
  response:
    | PersonDirectoriesDelete204Response
    | PersonDirectoriesDeleteDefaultResponse,
): response is PersonDirectoriesDeleteDefaultResponse;
export function isUnexpected(
  response:
    | PersonDirectoriesList200Response
    | PersonDirectoriesListDefaultResponse,
): response is PersonDirectoriesListDefaultResponse;
export function isUnexpected(
  response:
    | PersonDirectoriesUpdatePerson200Response
    | PersonDirectoriesUpdatePersonDefaultResponse,
): response is PersonDirectoriesUpdatePersonDefaultResponse;
export function isUnexpected(
  response:
    | PersonDirectoriesGetPerson200Response
    | PersonDirectoriesGetPersonDefaultResponse,
): response is PersonDirectoriesGetPersonDefaultResponse;
export function isUnexpected(
  response:
    | PersonDirectoriesDeletePerson204Response
    | PersonDirectoriesDeletePersonDefaultResponse,
): response is PersonDirectoriesDeletePersonDefaultResponse;
export function isUnexpected(
  response:
    | PersonDirectoriesListPersons200Response
    | PersonDirectoriesListPersonsDefaultResponse,
): response is PersonDirectoriesListPersonsDefaultResponse;
export function isUnexpected(
  response:
    | PersonDirectoriesAddFace201Response
    | PersonDirectoriesAddFaceDefaultResponse,
): response is PersonDirectoriesAddFaceDefaultResponse;
export function isUnexpected(
  response:
    | PersonDirectoriesListFaces200Response
    | PersonDirectoriesListFacesDefaultResponse,
): response is PersonDirectoriesListFacesDefaultResponse;
export function isUnexpected(
  response:
    | PersonDirectoriesUpdateFace200Response
    | PersonDirectoriesUpdateFaceDefaultResponse,
): response is PersonDirectoriesUpdateFaceDefaultResponse;
export function isUnexpected(
  response:
    | PersonDirectoriesGetFace200Response
    | PersonDirectoriesGetFaceDefaultResponse,
): response is PersonDirectoriesGetFaceDefaultResponse;
export function isUnexpected(
  response:
    | PersonDirectoriesDeleteFace204Response
    | PersonDirectoriesDeleteFaceDefaultResponse,
): response is PersonDirectoriesDeleteFaceDefaultResponse;
export function isUnexpected(
  response:
    | PersonDirectoriesIdentifyPerson200Response
    | PersonDirectoriesIdentifyPersonDefaultResponse,
): response is PersonDirectoriesIdentifyPersonDefaultResponse;
export function isUnexpected(
  response:
    | PersonDirectoriesFindSimilarFaces200Response
    | PersonDirectoriesFindSimilarFacesDefaultResponse,
): response is PersonDirectoriesFindSimilarFacesDefaultResponse;
export function isUnexpected(
  response:
    | PersonDirectoriesVerifyPerson200Response
    | PersonDirectoriesVerifyPersonDefaultResponse,
): response is PersonDirectoriesVerifyPersonDefaultResponse;
export function isUnexpected(
  response: FacesDetect200Response | FacesDetectDefaultResponse,
): response is FacesDetectDefaultResponse;
export function isUnexpected(
  response: FacesCompare200Response | FacesCompareDefaultResponse,
): response is FacesCompareDefaultResponse;
export function isUnexpected(
  response:
    | ContentClassifiersGetOperationStatus200Response
    | ContentClassifiersGetOperationStatusDefaultResponse,
): response is ContentClassifiersGetOperationStatusDefaultResponse;
export function isUnexpected(
  response:
    | ContentClassifiersCreateOrReplace200Response
    | ContentClassifiersCreateOrReplace201Response
    | ContentClassifiersCreateOrReplaceLogicalResponse
    | ContentClassifiersCreateOrReplaceDefaultResponse,
): response is ContentClassifiersCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response:
    | ContentClassifiersUpdate200Response
    | ContentClassifiersUpdateDefaultResponse,
): response is ContentClassifiersUpdateDefaultResponse;
export function isUnexpected(
  response:
    | ContentClassifiersGet200Response
    | ContentClassifiersGetDefaultResponse,
): response is ContentClassifiersGetDefaultResponse;
export function isUnexpected(
  response:
    | ContentClassifiersDelete204Response
    | ContentClassifiersDeleteDefaultResponse,
): response is ContentClassifiersDeleteDefaultResponse;
export function isUnexpected(
  response:
    | ContentClassifiersList200Response
    | ContentClassifiersListDefaultResponse,
): response is ContentClassifiersListDefaultResponse;
export function isUnexpected(
  response:
    | ContentClassifiersClassify202Response
    | ContentClassifiersClassifyLogicalResponse
    | ContentClassifiersClassifyDefaultResponse,
): response is ContentClassifiersClassifyDefaultResponse;
export function isUnexpected(
  response:
    | ContentClassifiersClassifyBinary202Response
    | ContentClassifiersClassifyBinaryLogicalResponse
    | ContentClassifiersClassifyBinaryDefaultResponse,
): response is ContentClassifiersClassifyBinaryDefaultResponse;
export function isUnexpected(
  response:
    | ContentClassifiersGetResult200Response
    | ContentClassifiersGetResultDefaultResponse,
): response is ContentClassifiersGetResultDefaultResponse;
export function isUnexpected(
  response:
    | ContentAnalyzersGetOperationStatus200Response
    | ContentAnalyzersGetOperationStatusDefaultResponse
    | ContentAnalyzersCreateOrReplace200Response
    | ContentAnalyzersCreateOrReplace201Response
    | ContentAnalyzersCreateOrReplaceLogicalResponse
    | ContentAnalyzersCreateOrReplaceDefaultResponse
    | ContentAnalyzersUpdate200Response
    | ContentAnalyzersUpdateDefaultResponse
    | ContentAnalyzersGet200Response
    | ContentAnalyzersGetDefaultResponse
    | ContentAnalyzersDelete204Response
    | ContentAnalyzersDeleteDefaultResponse
    | ContentAnalyzersList200Response
    | ContentAnalyzersListDefaultResponse
    | ContentAnalyzersAnalyze202Response
    | ContentAnalyzersAnalyzeLogicalResponse
    | ContentAnalyzersAnalyzeDefaultResponse
    | ContentAnalyzersAnalyzeBinary202Response
    | ContentAnalyzersAnalyzeBinaryLogicalResponse
    | ContentAnalyzersAnalyzeBinaryDefaultResponse
    | ContentAnalyzersGetResult200Response
    | ContentAnalyzersGetResultDefaultResponse
    | PersonDirectoriesCreate201Response
    | PersonDirectoriesCreateDefaultResponse
    | PersonDirectoriesUpdate200Response
    | PersonDirectoriesUpdateDefaultResponse
    | PersonDirectoriesGet200Response
    | PersonDirectoriesGetDefaultResponse
    | PersonDirectoriesDelete204Response
    | PersonDirectoriesDeleteDefaultResponse
    | PersonDirectoriesList200Response
    | PersonDirectoriesListDefaultResponse
    | PersonDirectoriesUpdatePerson200Response
    | PersonDirectoriesUpdatePersonDefaultResponse
    | PersonDirectoriesGetPerson200Response
    | PersonDirectoriesGetPersonDefaultResponse
    | PersonDirectoriesDeletePerson204Response
    | PersonDirectoriesDeletePersonDefaultResponse
    | PersonDirectoriesListPersons200Response
    | PersonDirectoriesListPersonsDefaultResponse
    | PersonDirectoriesAddFace201Response
    | PersonDirectoriesAddFaceDefaultResponse
    | PersonDirectoriesListFaces200Response
    | PersonDirectoriesListFacesDefaultResponse
    | PersonDirectoriesUpdateFace200Response
    | PersonDirectoriesUpdateFaceDefaultResponse
    | PersonDirectoriesGetFace200Response
    | PersonDirectoriesGetFaceDefaultResponse
    | PersonDirectoriesDeleteFace204Response
    | PersonDirectoriesDeleteFaceDefaultResponse
    | PersonDirectoriesIdentifyPerson200Response
    | PersonDirectoriesIdentifyPersonDefaultResponse
    | PersonDirectoriesFindSimilarFaces200Response
    | PersonDirectoriesFindSimilarFacesDefaultResponse
    | PersonDirectoriesVerifyPerson200Response
    | PersonDirectoriesVerifyPersonDefaultResponse
    | FacesDetect200Response
    | FacesDetectDefaultResponse
    | FacesCompare200Response
    | FacesCompareDefaultResponse
    | ContentClassifiersGetOperationStatus200Response
    | ContentClassifiersGetOperationStatusDefaultResponse
    | ContentClassifiersCreateOrReplace200Response
    | ContentClassifiersCreateOrReplace201Response
    | ContentClassifiersCreateOrReplaceLogicalResponse
    | ContentClassifiersCreateOrReplaceDefaultResponse
    | ContentClassifiersUpdate200Response
    | ContentClassifiersUpdateDefaultResponse
    | ContentClassifiersGet200Response
    | ContentClassifiersGetDefaultResponse
    | ContentClassifiersDelete204Response
    | ContentClassifiersDeleteDefaultResponse
    | ContentClassifiersList200Response
    | ContentClassifiersListDefaultResponse
    | ContentClassifiersClassify202Response
    | ContentClassifiersClassifyLogicalResponse
    | ContentClassifiersClassifyDefaultResponse
    | ContentClassifiersClassifyBinary202Response
    | ContentClassifiersClassifyBinaryLogicalResponse
    | ContentClassifiersClassifyBinaryDefaultResponse
    | ContentClassifiersGetResult200Response
    | ContentClassifiersGetResultDefaultResponse,
): response is
  | ContentAnalyzersGetOperationStatusDefaultResponse
  | ContentAnalyzersCreateOrReplaceDefaultResponse
  | ContentAnalyzersUpdateDefaultResponse
  | ContentAnalyzersGetDefaultResponse
  | ContentAnalyzersDeleteDefaultResponse
  | ContentAnalyzersListDefaultResponse
  | ContentAnalyzersAnalyzeDefaultResponse
  | ContentAnalyzersAnalyzeBinaryDefaultResponse
  | ContentAnalyzersGetResultDefaultResponse
  | PersonDirectoriesCreateDefaultResponse
  | PersonDirectoriesUpdateDefaultResponse
  | PersonDirectoriesGetDefaultResponse
  | PersonDirectoriesDeleteDefaultResponse
  | PersonDirectoriesListDefaultResponse
  | PersonDirectoriesUpdatePersonDefaultResponse
  | PersonDirectoriesGetPersonDefaultResponse
  | PersonDirectoriesDeletePersonDefaultResponse
  | PersonDirectoriesListPersonsDefaultResponse
  | PersonDirectoriesAddFaceDefaultResponse
  | PersonDirectoriesListFacesDefaultResponse
  | PersonDirectoriesUpdateFaceDefaultResponse
  | PersonDirectoriesGetFaceDefaultResponse
  | PersonDirectoriesDeleteFaceDefaultResponse
  | PersonDirectoriesIdentifyPersonDefaultResponse
  | PersonDirectoriesFindSimilarFacesDefaultResponse
  | PersonDirectoriesVerifyPersonDefaultResponse
  | FacesDetectDefaultResponse
  | FacesCompareDefaultResponse
  | ContentClassifiersGetOperationStatusDefaultResponse
  | ContentClassifiersCreateOrReplaceDefaultResponse
  | ContentClassifiersUpdateDefaultResponse
  | ContentClassifiersGetDefaultResponse
  | ContentClassifiersDeleteDefaultResponse
  | ContentClassifiersListDefaultResponse
  | ContentClassifiersClassifyDefaultResponse
  | ContentClassifiersClassifyBinaryDefaultResponse
  | ContentClassifiersGetResultDefaultResponse {
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
    for (
      let i = candidateParts.length - 1, j = pathParts.length - 1;
      i >= 1 && j >= 1;
      i--, j--
    ) {
      if (
        candidateParts[i]?.startsWith("{") &&
        candidateParts[i]?.indexOf("}") !== -1
      ) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(
          `${candidateParts[i]?.slice(start, end)}`,
        ).test(pathParts[j] || "");

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
