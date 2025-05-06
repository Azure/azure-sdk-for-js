// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ListFactorLibraries200Response,
  ListFactorLibrariesDefaultResponse,
  GetFactorLibrary200Response,
  GetFactorLibraryDefaultResponse,
  ListEstimationFactorsByFactorLibrary200Response,
  ListEstimationFactorsByFactorLibraryDefaultResponse,
  GetEstimationFactor200Response,
  GetEstimationFactorDefaultResponse,
  ListEmissionFactorsByFactorLibrary200Response,
  ListEmissionFactorsByFactorLibraryDefaultResponse,
  GetEmissionFactor200Response,
  GetEmissionFactorDefaultResponse,
  ListFactorMappings200Response,
  ListFactorMappingsDefaultResponse,
  GetFactorMapping200Response,
  GetFactorMappingDefaultResponse,
  ListCalculationModels200Response,
  ListCalculationModelsDefaultResponse,
  GetCalculationModel200Response,
  GetCalculationModelDefaultResponse,
  ListReferenceEntities200Response,
  ListReferenceEntitiesDefaultResponse,
  ListReferenceEntityRecords200Response,
  ListReferenceEntityRecordsDefaultResponse,
  GetReferenceEntityRecord200Response,
  GetReferenceEntityRecordDefaultResponse,
  CalculateEmissions200Response,
  CalculateEmissionsDefaultResponse,
} from "./responses.js";

const responseMap: Record<string, string[]> = {
  "GET /sustainability/factor-libraries": ["200"],
  "GET /sustainability/factor-libraries/{factorLibraryId}": ["200"],
  "GET /sustainability/factor-libraries/{factorLibraryId}/estimation-factors": ["200"],
  "GET /sustainability/factor-libraries/{factorLibraryId}/estimation-factors/{estimationFactorId}":
    ["200"],
  "GET /sustainability/factor-libraries/{factorLibraryId}/emission-factors": ["200"],
  "GET /sustainability/factor-libraries/{factorLibraryId}/emission-factors/{emissionFactorId}": [
    "200",
  ],
  "GET /sustainability/factor-libraries/{factorLibraryId}/factor-mappings": ["200"],
  "GET /sustainability/factor-libraries/{factorLibraryId}/factor-mappings/{factorMappingId}": [
    "200",
  ],
  "GET /sustainability/calculation-models": ["200"],
  "GET /sustainability/calculation-models/{calculationModelId}": ["200"],
  "GET /sustainability/reference-data": ["200"],
  "GET /sustainability/reference-data/{entityName}/entity-records": ["200"],
  "GET /sustainability/reference-data/{entityName}/entity-records/{id}": ["200"],
  "POST /sustainability/activities:calculateEmissions": ["200"],
};

export function isUnexpected(
  response: ListFactorLibraries200Response | ListFactorLibrariesDefaultResponse,
): response is ListFactorLibrariesDefaultResponse;
export function isUnexpected(
  response: GetFactorLibrary200Response | GetFactorLibraryDefaultResponse,
): response is GetFactorLibraryDefaultResponse;
export function isUnexpected(
  response:
    | ListEstimationFactorsByFactorLibrary200Response
    | ListEstimationFactorsByFactorLibraryDefaultResponse,
): response is ListEstimationFactorsByFactorLibraryDefaultResponse;
export function isUnexpected(
  response: GetEstimationFactor200Response | GetEstimationFactorDefaultResponse,
): response is GetEstimationFactorDefaultResponse;
export function isUnexpected(
  response:
    | ListEmissionFactorsByFactorLibrary200Response
    | ListEmissionFactorsByFactorLibraryDefaultResponse,
): response is ListEmissionFactorsByFactorLibraryDefaultResponse;
export function isUnexpected(
  response: GetEmissionFactor200Response | GetEmissionFactorDefaultResponse,
): response is GetEmissionFactorDefaultResponse;
export function isUnexpected(
  response: ListFactorMappings200Response | ListFactorMappingsDefaultResponse,
): response is ListFactorMappingsDefaultResponse;
export function isUnexpected(
  response: GetFactorMapping200Response | GetFactorMappingDefaultResponse,
): response is GetFactorMappingDefaultResponse;
export function isUnexpected(
  response: ListCalculationModels200Response | ListCalculationModelsDefaultResponse,
): response is ListCalculationModelsDefaultResponse;
export function isUnexpected(
  response: GetCalculationModel200Response | GetCalculationModelDefaultResponse,
): response is GetCalculationModelDefaultResponse;
export function isUnexpected(
  response: ListReferenceEntities200Response | ListReferenceEntitiesDefaultResponse,
): response is ListReferenceEntitiesDefaultResponse;
export function isUnexpected(
  response: ListReferenceEntityRecords200Response | ListReferenceEntityRecordsDefaultResponse,
): response is ListReferenceEntityRecordsDefaultResponse;
export function isUnexpected(
  response: GetReferenceEntityRecord200Response | GetReferenceEntityRecordDefaultResponse,
): response is GetReferenceEntityRecordDefaultResponse;
export function isUnexpected(
  response: CalculateEmissions200Response | CalculateEmissionsDefaultResponse,
): response is CalculateEmissionsDefaultResponse;
export function isUnexpected(
  response:
    | ListFactorLibraries200Response
    | ListFactorLibrariesDefaultResponse
    | GetFactorLibrary200Response
    | GetFactorLibraryDefaultResponse
    | ListEstimationFactorsByFactorLibrary200Response
    | ListEstimationFactorsByFactorLibraryDefaultResponse
    | GetEstimationFactor200Response
    | GetEstimationFactorDefaultResponse
    | ListEmissionFactorsByFactorLibrary200Response
    | ListEmissionFactorsByFactorLibraryDefaultResponse
    | GetEmissionFactor200Response
    | GetEmissionFactorDefaultResponse
    | ListFactorMappings200Response
    | ListFactorMappingsDefaultResponse
    | GetFactorMapping200Response
    | GetFactorMappingDefaultResponse
    | ListCalculationModels200Response
    | ListCalculationModelsDefaultResponse
    | GetCalculationModel200Response
    | GetCalculationModelDefaultResponse
    | ListReferenceEntities200Response
    | ListReferenceEntitiesDefaultResponse
    | ListReferenceEntityRecords200Response
    | ListReferenceEntityRecordsDefaultResponse
    | GetReferenceEntityRecord200Response
    | GetReferenceEntityRecordDefaultResponse
    | CalculateEmissions200Response
    | CalculateEmissionsDefaultResponse,
): response is
  | ListFactorLibrariesDefaultResponse
  | GetFactorLibraryDefaultResponse
  | ListEstimationFactorsByFactorLibraryDefaultResponse
  | GetEstimationFactorDefaultResponse
  | ListEmissionFactorsByFactorLibraryDefaultResponse
  | GetEmissionFactorDefaultResponse
  | ListFactorMappingsDefaultResponse
  | GetFactorMappingDefaultResponse
  | ListCalculationModelsDefaultResponse
  | GetCalculationModelDefaultResponse
  | ListReferenceEntitiesDefaultResponse
  | ListReferenceEntityRecordsDefaultResponse
  | GetReferenceEntityRecordDefaultResponse
  | CalculateEmissionsDefaultResponse {
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
