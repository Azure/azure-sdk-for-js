// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DevCenterListProjects200Response,
  DevCenterListProjectsdefaultResponse,
  DevCenterGetProject200Response,
  DevCenterGetProjectdefaultResponse,
  DevCenterListAllDevBoxes200Response,
  DevCenterListAllDevBoxesdefaultResponse,
  DevCenterListAllDevBoxesByUser200Response,
  DevCenterListAllDevBoxesByUserdefaultResponse,
  DevBoxesListPools200Response,
  DevBoxesListPoolsdefaultResponse,
  DevBoxesGetPool200Response,
  DevBoxesGetPooldefaultResponse,
  DevBoxesListSchedulesByPool200Response,
  DevBoxesListSchedulesByPooldefaultResponse,
  DevBoxesGetScheduleByPool200Response,
  DevBoxesGetScheduleByPooldefaultResponse,
  DevBoxesListDevBoxesByUser200Response,
  DevBoxesListDevBoxesByUserdefaultResponse,
  DevBoxesGetDevBoxByUser200Response,
  DevBoxesGetDevBoxByUserdefaultResponse,
  DevBoxesCreateDevBox200Response,
  DevBoxesCreateDevBox201Response,
  DevBoxesCreateDevBoxdefaultResponse,
  DevBoxesDeleteDevBox200Response,
  DevBoxesDeleteDevBox202Response,
  DevBoxesDeleteDevBox204Response,
  DevBoxesDeleteDevBoxdefaultResponse,
  DevBoxesStartDevBox200Response,
  DevBoxesStartDevBox202Response,
  DevBoxesStartDevBoxdefaultResponse,
  DevBoxesStopDevBox200Response,
  DevBoxesStopDevBox202Response,
  DevBoxesStopDevBoxdefaultResponse,
  DevBoxesGetRemoteConnection200Response,
  DevBoxesGetRemoteConnectiondefaultResponse,
  EnvironmentsListEnvironments200Response,
  EnvironmentsListEnvironmentsdefaultResponse,
  EnvironmentsListEnvironmentsByUser200Response,
  EnvironmentsListEnvironmentsByUserdefaultResponse,
  EnvironmentsGetEnvironmentByUser200Response,
  EnvironmentsGetEnvironmentByUserdefaultResponse,
  EnvironmentsCreateOrUpdateEnvironment200Response,
  EnvironmentsCreateOrUpdateEnvironment201Response,
  EnvironmentsCreateOrUpdateEnvironmentdefaultResponse,
  EnvironmentsUpdateEnvironment200Response,
  EnvironmentsUpdateEnvironmentdefaultResponse,
  EnvironmentsDeleteEnvironment200Response,
  EnvironmentsDeleteEnvironment202Response,
  EnvironmentsDeleteEnvironment204Response,
  EnvironmentsDeleteEnvironmentdefaultResponse,
  EnvironmentsDeployEnvironmentAction200Response,
  EnvironmentsDeployEnvironmentAction202Response,
  EnvironmentsDeployEnvironmentActiondefaultResponse,
  EnvironmentsDeleteEnvironmentAction200Response,
  EnvironmentsDeleteEnvironmentAction202Response,
  EnvironmentsDeleteEnvironmentActiondefaultResponse,
  EnvironmentsCustomEnvironmentAction200Response,
  EnvironmentsCustomEnvironmentAction202Response,
  EnvironmentsCustomEnvironmentActiondefaultResponse,
  EnvironmentsListArtifactsByEnvironment200Response,
  EnvironmentsListArtifactsByEnvironmentdefaultResponse,
  EnvironmentsListArtifactsByEnvironmentAndPath200Response,
  EnvironmentsListArtifactsByEnvironmentAndPathdefaultResponse,
  EnvironmentsListCatalogItems200Response,
  EnvironmentsListCatalogItemsdefaultResponse,
  EnvironmentsGetCatalogItem200Response,
  EnvironmentsGetCatalogItemdefaultResponse,
  EnvironmentsListCatalogItemVersions200Response,
  EnvironmentsListCatalogItemVersionsdefaultResponse,
  EnvironmentsGetCatalogItemVersion200Response,
  EnvironmentsGetCatalogItemVersiondefaultResponse,
  EnvironmentsListEnvironmentTypes200Response,
  EnvironmentsListEnvironmentTypesdefaultResponse,
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /projects": ["200"],
  "GET /projects/{projectName}": ["200"],
  "GET /devboxes": ["200"],
  "GET /users/{userId}/devboxes": ["200"],
  "GET /projects/{projectName}/pools": ["200"],
  "GET /projects/{projectName}/pools/{poolName}": ["200"],
  "GET /projects/{projectName}/pools/{poolName}/schedules": ["200"],
  "GET /projects/{projectName}/pools/{poolName}/schedules/{scheduleName}": ["200"],
  "GET /projects/{projectName}/users/{userId}/devboxes": ["200"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}": ["200"],
  "PUT /projects/{projectName}/users/{userId}/devboxes/{devBoxName}": ["200", "201"],
  "DELETE /projects/{projectName}/users/{userId}/devboxes/{devBoxName}": ["200", "202", "204"],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:start": ["200", "202"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:start": ["200", "202"],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:stop": ["200", "202"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:stop": ["200", "202"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/remoteConnection": ["200"],
  "GET /projects/{projectName}/environments": ["200"],
  "GET /projects/{projectName}/users/{userId}/environments": ["200"],
  "GET /projects/{projectName}/users/{userId}/environments/{environmentName}": ["200"],
  "PUT /projects/{projectName}/users/{userId}/environments/{environmentName}": ["200", "201"],
  "PATCH /projects/{projectName}/users/{userId}/environments/{environmentName}": ["200"],
  "DELETE /projects/{projectName}/users/{userId}/environments/{environmentName}": [
    "200",
    "202",
    "204",
  ],
  "POST /projects/{projectName}/users/{userId}/environments/{environmentName}:deploy": [
    "200",
    "202",
  ],
  "GET /projects/{projectName}/users/{userId}/environments/{environmentName}:deploy": [
    "200",
    "202",
  ],
  "POST /projects/{projectName}/users/{userId}/environments/{environmentName}:delete": [
    "200",
    "202",
  ],
  "GET /projects/{projectName}/users/{userId}/environments/{environmentName}:delete": [
    "200",
    "202",
  ],
  "POST /projects/{projectName}/users/{userId}/environments/{environmentName}:custom": [
    "200",
    "202",
  ],
  "GET /projects/{projectName}/users/{userId}/environments/{environmentName}:custom": [
    "200",
    "202",
  ],
  "GET /projects/{projectName}/users/{userId}/environments/{environmentName}/artifacts": ["200"],
  "GET /projects/{projectName}/users/{userId}/environments/{environmentName}/artifacts/{artifactPath}": [
    "200",
  ],
  "GET /projects/{projectName}/catalogItems": ["200"],
  "GET /projects/{projectName}/catalogItems/{catalogItemId}": ["200"],
  "GET /projects/{projectName}/catalogItems/{catalogItemId}/versions": ["200"],
  "GET /projects/{projectName}/catalogItems/{catalogItemId}/versions/{version}": ["200"],
  "GET /projects/{projectName}/environmentTypes": ["200"],
};

export function isUnexpected(
  response: DevCenterListProjects200Response | DevCenterListProjectsdefaultResponse
): response is DevCenterListProjectsdefaultResponse;
export function isUnexpected(
  response: DevCenterGetProject200Response | DevCenterGetProjectdefaultResponse
): response is DevCenterGetProjectdefaultResponse;
export function isUnexpected(
  response: DevCenterListAllDevBoxes200Response | DevCenterListAllDevBoxesdefaultResponse
): response is DevCenterListAllDevBoxesdefaultResponse;
export function isUnexpected(
  response:
    | DevCenterListAllDevBoxesByUser200Response
    | DevCenterListAllDevBoxesByUserdefaultResponse
): response is DevCenterListAllDevBoxesByUserdefaultResponse;
export function isUnexpected(
  response: DevBoxesListPools200Response | DevBoxesListPoolsdefaultResponse
): response is DevBoxesListPoolsdefaultResponse;
export function isUnexpected(
  response: DevBoxesGetPool200Response | DevBoxesGetPooldefaultResponse
): response is DevBoxesGetPooldefaultResponse;
export function isUnexpected(
  response: DevBoxesListSchedulesByPool200Response | DevBoxesListSchedulesByPooldefaultResponse
): response is DevBoxesListSchedulesByPooldefaultResponse;
export function isUnexpected(
  response: DevBoxesGetScheduleByPool200Response | DevBoxesGetScheduleByPooldefaultResponse
): response is DevBoxesGetScheduleByPooldefaultResponse;
export function isUnexpected(
  response: DevBoxesListDevBoxesByUser200Response | DevBoxesListDevBoxesByUserdefaultResponse
): response is DevBoxesListDevBoxesByUserdefaultResponse;
export function isUnexpected(
  response: DevBoxesGetDevBoxByUser200Response | DevBoxesGetDevBoxByUserdefaultResponse
): response is DevBoxesGetDevBoxByUserdefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesCreateDevBox200Response
    | DevBoxesCreateDevBox201Response
    | DevBoxesCreateDevBoxdefaultResponse
): response is DevBoxesCreateDevBoxdefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesDeleteDevBox200Response
    | DevBoxesDeleteDevBox202Response
    | DevBoxesDeleteDevBox204Response
    | DevBoxesDeleteDevBoxdefaultResponse
): response is DevBoxesDeleteDevBoxdefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesStartDevBox200Response
    | DevBoxesStartDevBox202Response
    | DevBoxesStartDevBoxdefaultResponse
): response is DevBoxesStartDevBoxdefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesStopDevBox200Response
    | DevBoxesStopDevBox202Response
    | DevBoxesStopDevBoxdefaultResponse
): response is DevBoxesStopDevBoxdefaultResponse;
export function isUnexpected(
  response: DevBoxesGetRemoteConnection200Response | DevBoxesGetRemoteConnectiondefaultResponse
): response is DevBoxesGetRemoteConnectiondefaultResponse;
export function isUnexpected(
  response: EnvironmentsListEnvironments200Response | EnvironmentsListEnvironmentsdefaultResponse
): response is EnvironmentsListEnvironmentsdefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsListEnvironmentsByUser200Response
    | EnvironmentsListEnvironmentsByUserdefaultResponse
): response is EnvironmentsListEnvironmentsByUserdefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsGetEnvironmentByUser200Response
    | EnvironmentsGetEnvironmentByUserdefaultResponse
): response is EnvironmentsGetEnvironmentByUserdefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsCreateOrUpdateEnvironment200Response
    | EnvironmentsCreateOrUpdateEnvironment201Response
    | EnvironmentsCreateOrUpdateEnvironmentdefaultResponse
): response is EnvironmentsCreateOrUpdateEnvironmentdefaultResponse;
export function isUnexpected(
  response: EnvironmentsUpdateEnvironment200Response | EnvironmentsUpdateEnvironmentdefaultResponse
): response is EnvironmentsUpdateEnvironmentdefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsDeleteEnvironment200Response
    | EnvironmentsDeleteEnvironment202Response
    | EnvironmentsDeleteEnvironment204Response
    | EnvironmentsDeleteEnvironmentdefaultResponse
): response is EnvironmentsDeleteEnvironmentdefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsDeployEnvironmentAction200Response
    | EnvironmentsDeployEnvironmentAction202Response
    | EnvironmentsDeployEnvironmentActiondefaultResponse
): response is EnvironmentsDeployEnvironmentActiondefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsDeleteEnvironmentAction200Response
    | EnvironmentsDeleteEnvironmentAction202Response
    | EnvironmentsDeleteEnvironmentActiondefaultResponse
): response is EnvironmentsDeleteEnvironmentActiondefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsCustomEnvironmentAction200Response
    | EnvironmentsCustomEnvironmentAction202Response
    | EnvironmentsCustomEnvironmentActiondefaultResponse
): response is EnvironmentsCustomEnvironmentActiondefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsListArtifactsByEnvironment200Response
    | EnvironmentsListArtifactsByEnvironmentdefaultResponse
): response is EnvironmentsListArtifactsByEnvironmentdefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsListArtifactsByEnvironmentAndPath200Response
    | EnvironmentsListArtifactsByEnvironmentAndPathdefaultResponse
): response is EnvironmentsListArtifactsByEnvironmentAndPathdefaultResponse;
export function isUnexpected(
  response: EnvironmentsListCatalogItems200Response | EnvironmentsListCatalogItemsdefaultResponse
): response is EnvironmentsListCatalogItemsdefaultResponse;
export function isUnexpected(
  response: EnvironmentsGetCatalogItem200Response | EnvironmentsGetCatalogItemdefaultResponse
): response is EnvironmentsGetCatalogItemdefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsListCatalogItemVersions200Response
    | EnvironmentsListCatalogItemVersionsdefaultResponse
): response is EnvironmentsListCatalogItemVersionsdefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsGetCatalogItemVersion200Response
    | EnvironmentsGetCatalogItemVersiondefaultResponse
): response is EnvironmentsGetCatalogItemVersiondefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsListEnvironmentTypes200Response
    | EnvironmentsListEnvironmentTypesdefaultResponse
): response is EnvironmentsListEnvironmentTypesdefaultResponse;
export function isUnexpected(
  response:
    | DevCenterListProjects200Response
    | DevCenterListProjectsdefaultResponse
    | DevCenterGetProject200Response
    | DevCenterGetProjectdefaultResponse
    | DevCenterListAllDevBoxes200Response
    | DevCenterListAllDevBoxesdefaultResponse
    | DevCenterListAllDevBoxesByUser200Response
    | DevCenterListAllDevBoxesByUserdefaultResponse
    | DevBoxesListPools200Response
    | DevBoxesListPoolsdefaultResponse
    | DevBoxesGetPool200Response
    | DevBoxesGetPooldefaultResponse
    | DevBoxesListSchedulesByPool200Response
    | DevBoxesListSchedulesByPooldefaultResponse
    | DevBoxesGetScheduleByPool200Response
    | DevBoxesGetScheduleByPooldefaultResponse
    | DevBoxesListDevBoxesByUser200Response
    | DevBoxesListDevBoxesByUserdefaultResponse
    | DevBoxesGetDevBoxByUser200Response
    | DevBoxesGetDevBoxByUserdefaultResponse
    | DevBoxesCreateDevBox200Response
    | DevBoxesCreateDevBox201Response
    | DevBoxesCreateDevBoxdefaultResponse
    | DevBoxesDeleteDevBox200Response
    | DevBoxesDeleteDevBox202Response
    | DevBoxesDeleteDevBox204Response
    | DevBoxesDeleteDevBoxdefaultResponse
    | DevBoxesStartDevBox200Response
    | DevBoxesStartDevBox202Response
    | DevBoxesStartDevBoxdefaultResponse
    | DevBoxesStopDevBox200Response
    | DevBoxesStopDevBox202Response
    | DevBoxesStopDevBoxdefaultResponse
    | DevBoxesGetRemoteConnection200Response
    | DevBoxesGetRemoteConnectiondefaultResponse
    | EnvironmentsListEnvironments200Response
    | EnvironmentsListEnvironmentsdefaultResponse
    | EnvironmentsListEnvironmentsByUser200Response
    | EnvironmentsListEnvironmentsByUserdefaultResponse
    | EnvironmentsGetEnvironmentByUser200Response
    | EnvironmentsGetEnvironmentByUserdefaultResponse
    | EnvironmentsCreateOrUpdateEnvironment200Response
    | EnvironmentsCreateOrUpdateEnvironment201Response
    | EnvironmentsCreateOrUpdateEnvironmentdefaultResponse
    | EnvironmentsUpdateEnvironment200Response
    | EnvironmentsUpdateEnvironmentdefaultResponse
    | EnvironmentsDeleteEnvironment200Response
    | EnvironmentsDeleteEnvironment202Response
    | EnvironmentsDeleteEnvironment204Response
    | EnvironmentsDeleteEnvironmentdefaultResponse
    | EnvironmentsDeployEnvironmentAction200Response
    | EnvironmentsDeployEnvironmentAction202Response
    | EnvironmentsDeployEnvironmentActiondefaultResponse
    | EnvironmentsDeleteEnvironmentAction200Response
    | EnvironmentsDeleteEnvironmentAction202Response
    | EnvironmentsDeleteEnvironmentActiondefaultResponse
    | EnvironmentsCustomEnvironmentAction200Response
    | EnvironmentsCustomEnvironmentAction202Response
    | EnvironmentsCustomEnvironmentActiondefaultResponse
    | EnvironmentsListArtifactsByEnvironment200Response
    | EnvironmentsListArtifactsByEnvironmentdefaultResponse
    | EnvironmentsListArtifactsByEnvironmentAndPath200Response
    | EnvironmentsListArtifactsByEnvironmentAndPathdefaultResponse
    | EnvironmentsListCatalogItems200Response
    | EnvironmentsListCatalogItemsdefaultResponse
    | EnvironmentsGetCatalogItem200Response
    | EnvironmentsGetCatalogItemdefaultResponse
    | EnvironmentsListCatalogItemVersions200Response
    | EnvironmentsListCatalogItemVersionsdefaultResponse
    | EnvironmentsGetCatalogItemVersion200Response
    | EnvironmentsGetCatalogItemVersiondefaultResponse
    | EnvironmentsListEnvironmentTypes200Response
    | EnvironmentsListEnvironmentTypesdefaultResponse
): response is
  | DevCenterListProjectsdefaultResponse
  | DevCenterGetProjectdefaultResponse
  | DevCenterListAllDevBoxesdefaultResponse
  | DevCenterListAllDevBoxesByUserdefaultResponse
  | DevBoxesListPoolsdefaultResponse
  | DevBoxesGetPooldefaultResponse
  | DevBoxesListSchedulesByPooldefaultResponse
  | DevBoxesGetScheduleByPooldefaultResponse
  | DevBoxesListDevBoxesByUserdefaultResponse
  | DevBoxesGetDevBoxByUserdefaultResponse
  | DevBoxesCreateDevBoxdefaultResponse
  | DevBoxesDeleteDevBoxdefaultResponse
  | DevBoxesStartDevBoxdefaultResponse
  | DevBoxesStopDevBoxdefaultResponse
  | DevBoxesGetRemoteConnectiondefaultResponse
  | EnvironmentsListEnvironmentsdefaultResponse
  | EnvironmentsListEnvironmentsByUserdefaultResponse
  | EnvironmentsGetEnvironmentByUserdefaultResponse
  | EnvironmentsCreateOrUpdateEnvironmentdefaultResponse
  | EnvironmentsUpdateEnvironmentdefaultResponse
  | EnvironmentsDeleteEnvironmentdefaultResponse
  | EnvironmentsDeployEnvironmentActiondefaultResponse
  | EnvironmentsDeleteEnvironmentActiondefaultResponse
  | EnvironmentsCustomEnvironmentActiondefaultResponse
  | EnvironmentsListArtifactsByEnvironmentdefaultResponse
  | EnvironmentsListArtifactsByEnvironmentAndPathdefaultResponse
  | EnvironmentsListCatalogItemsdefaultResponse
  | EnvironmentsGetCatalogItemdefaultResponse
  | EnvironmentsListCatalogItemVersionsdefaultResponse
  | EnvironmentsGetCatalogItemVersiondefaultResponse
  | EnvironmentsListEnvironmentTypesdefaultResponse {
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
    const candidatePath = getPathFromMapKey(key);
    const candidateMethod = getMethodFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // If the candidate and actual paths don't match in size
    // we move on to the next candidate path
    if (
      candidateParts.length === pathParts.length &&
      hasParametrizedPath(key) &&
      method === candidateMethod
    ) {
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

function getMethodFromMapKey(mapKey: string): string {
  return mapKey.split(" ")[0];
}
