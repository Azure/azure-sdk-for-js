// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DevCenterListProjects200Response,
  DevCenterListProjectsDefaultResponse,
  DevCenterGetProject200Response,
  DevCenterGetProjectDefaultResponse,
  DevCenterListAllDevBoxes200Response,
  DevCenterListAllDevBoxesDefaultResponse,
  DevCenterListAllDevBoxesByUser200Response,
  DevCenterListAllDevBoxesByUserDefaultResponse,
  DevBoxesListPools200Response,
  DevBoxesListPoolsDefaultResponse,
  DevBoxesGetPool200Response,
  DevBoxesGetPoolDefaultResponse,
  DevBoxesListSchedulesByPool200Response,
  DevBoxesListSchedulesByPoolDefaultResponse,
  DevBoxesGetScheduleByPool200Response,
  DevBoxesGetScheduleByPoolDefaultResponse,
  DevBoxesListDevBoxesByUser200Response,
  DevBoxesListDevBoxesByUserDefaultResponse,
  DevBoxesGetDevBoxByUser200Response,
  DevBoxesGetDevBoxByUserDefaultResponse,
  DevBoxesCreateDevBox200Response,
  DevBoxesCreateDevBox201Response,
  DevBoxesCreateDevBoxDefaultResponse,
  DevBoxesDeleteDevBox202Response,
  DevBoxesDeleteDevBox204Response,
  DevBoxesDeleteDevBoxDefaultResponse,
  DevBoxesStartDevBox202Response,
  DevBoxesStartDevBoxDefaultResponse,
  DevBoxesStopDevBox202Response,
  DevBoxesStopDevBoxDefaultResponse,
  DevBoxesGetRemoteConnection200Response,
  DevBoxesGetRemoteConnectionDefaultResponse,
  DevBoxesListUpcomingActions200Response,
  DevBoxesListUpcomingActionsDefaultResponse,
  DevBoxesGetUpcomingAction200Response,
  DevBoxesGetUpcomingActionDefaultResponse,
  DevBoxesSkipUpcomingAction204Response,
  DevBoxesSkipUpcomingActionDefaultResponse,
  DevBoxesDelayUpcomingAction200Response,
  DevBoxesDelayUpcomingActionDefaultResponse,
  EnvironmentsListEnvironments200Response,
  EnvironmentsListEnvironmentsDefaultResponse,
  EnvironmentsListEnvironmentsByUser200Response,
  EnvironmentsListEnvironmentsByUserDefaultResponse,
  EnvironmentsGetEnvironmentByUser200Response,
  EnvironmentsGetEnvironmentByUserDefaultResponse,
  EnvironmentsCreateOrUpdateEnvironment200Response,
  EnvironmentsCreateOrUpdateEnvironment201Response,
  EnvironmentsCreateOrUpdateEnvironmentDefaultResponse,
  EnvironmentsUpdateEnvironment200Response,
  EnvironmentsUpdateEnvironmentDefaultResponse,
  EnvironmentsDeleteEnvironment200Response,
  EnvironmentsDeleteEnvironment202Response,
  EnvironmentsDeleteEnvironment204Response,
  EnvironmentsDeleteEnvironmentDefaultResponse,
  EnvironmentsDeployEnvironmentAction200Response,
  EnvironmentsDeployEnvironmentAction202Response,
  EnvironmentsDeployEnvironmentActionDefaultResponse,
  EnvironmentsCustomEnvironmentAction200Response,
  EnvironmentsCustomEnvironmentAction202Response,
  EnvironmentsCustomEnvironmentActionDefaultResponse,
  EnvironmentsListCatalogItems200Response,
  EnvironmentsListCatalogItemsDefaultResponse,
  EnvironmentsGetCatalogItem200Response,
  EnvironmentsGetCatalogItemDefaultResponse,
  EnvironmentsListCatalogItemVersions200Response,
  EnvironmentsListCatalogItemVersionsDefaultResponse,
  EnvironmentsGetCatalogItemVersion200Response,
  EnvironmentsGetCatalogItemVersionDefaultResponse,
  EnvironmentsListEnvironmentTypes200Response,
  EnvironmentsListEnvironmentTypesDefaultResponse
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /projects": ["200"],
  "GET /projects/{projectName}": ["200"],
  "GET /devboxes": ["200"],
  "GET /users/{userId}/devboxes": ["200"],
  "GET /projects/{projectName}/pools": ["200"],
  "GET /projects/{projectName}/pools/{poolName}": ["200"],
  "GET /projects/{projectName}/pools/{poolName}/schedules": ["200"],
  "GET /projects/{projectName}/pools/{poolName}/schedules/{scheduleName}": [
    "200"
  ],
  "GET /projects/{projectName}/users/{userId}/devboxes": ["200"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}": ["200"],
  "PUT /projects/{projectName}/users/{userId}/devboxes/{devBoxName}": [
    "200",
    "201"
  ],
  "DELETE /projects/{projectName}/users/{userId}/devboxes/{devBoxName}": [
    "202",
    "204"
  ],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:start": [
    "202"
  ],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:start": [
    "202"
  ],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:stop": [
    "202"
  ],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:stop": [
    "202"
  ],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/remoteConnection": [
    "200"
  ],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/upcomingActions": [
    "200"
  ],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/upcomingActions/{upcomingActionId}": [
    "200"
  ],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/upcomingActions/{upcomingActionId}:skip": [
    "204"
  ],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/upcomingActions/{upcomingActionId}:delay": [
    "200"
  ],
  "GET /projects/{projectName}/environments": ["200"],
  "GET /projects/{projectName}/users/{userId}/environments": ["200"],
  "GET /projects/{projectName}/users/{userId}/environments/{environmentName}": [
    "200"
  ],
  "PUT /projects/{projectName}/users/{userId}/environments/{environmentName}": [
    "200",
    "201"
  ],
  "PATCH /projects/{projectName}/users/{userId}/environments/{environmentName}": [
    "200"
  ],
  "DELETE /projects/{projectName}/users/{userId}/environments/{environmentName}": [
    "200",
    "202",
    "204"
  ],
  "POST /projects/{projectName}/users/{userId}/environments/{environmentName}:deploy": [
    "200",
    "202"
  ],
  "GET /projects/{projectName}/users/{userId}/environments/{environmentName}:deploy": [
    "200",
    "202"
  ],
  "POST /projects/{projectName}/users/{userId}/environments/{environmentName}:custom": [
    "200",
    "202"
  ],
  "GET /projects/{projectName}/users/{userId}/environments/{environmentName}:custom": [
    "200",
    "202"
  ],
  "GET /projects/{projectName}/catalogItems": ["200"],
  "GET /projects/{projectName}/catalogItems/{catalogItemId}": ["200"],
  "GET /projects/{projectName}/catalogItems/{catalogItemId}/versions": ["200"],
  "GET /projects/{projectName}/catalogItems/{catalogItemId}/versions/{version}": [
    "200"
  ],
  "GET /projects/{projectName}/environmentTypes": ["200"]
};

export function isUnexpected(
  response:
    | DevCenterListProjects200Response
    | DevCenterListProjectsDefaultResponse
): response is DevCenterListProjectsDefaultResponse;
export function isUnexpected(
  response: DevCenterGetProject200Response | DevCenterGetProjectDefaultResponse
): response is DevCenterGetProjectDefaultResponse;
export function isUnexpected(
  response:
    | DevCenterListAllDevBoxes200Response
    | DevCenterListAllDevBoxesDefaultResponse
): response is DevCenterListAllDevBoxesDefaultResponse;
export function isUnexpected(
  response:
    | DevCenterListAllDevBoxesByUser200Response
    | DevCenterListAllDevBoxesByUserDefaultResponse
): response is DevCenterListAllDevBoxesByUserDefaultResponse;
export function isUnexpected(
  response: DevBoxesListPools200Response | DevBoxesListPoolsDefaultResponse
): response is DevBoxesListPoolsDefaultResponse;
export function isUnexpected(
  response: DevBoxesGetPool200Response | DevBoxesGetPoolDefaultResponse
): response is DevBoxesGetPoolDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesListSchedulesByPool200Response
    | DevBoxesListSchedulesByPoolDefaultResponse
): response is DevBoxesListSchedulesByPoolDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesGetScheduleByPool200Response
    | DevBoxesGetScheduleByPoolDefaultResponse
): response is DevBoxesGetScheduleByPoolDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesListDevBoxesByUser200Response
    | DevBoxesListDevBoxesByUserDefaultResponse
): response is DevBoxesListDevBoxesByUserDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesGetDevBoxByUser200Response
    | DevBoxesGetDevBoxByUserDefaultResponse
): response is DevBoxesGetDevBoxByUserDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesCreateDevBox200Response
    | DevBoxesCreateDevBox201Response
    | DevBoxesCreateDevBoxDefaultResponse
): response is DevBoxesCreateDevBoxDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesDeleteDevBox202Response
    | DevBoxesDeleteDevBox204Response
    | DevBoxesDeleteDevBoxDefaultResponse
): response is DevBoxesDeleteDevBoxDefaultResponse;
export function isUnexpected(
  response: DevBoxesStartDevBox202Response | DevBoxesStartDevBoxDefaultResponse
): response is DevBoxesStartDevBoxDefaultResponse;
export function isUnexpected(
  response: DevBoxesStopDevBox202Response | DevBoxesStopDevBoxDefaultResponse
): response is DevBoxesStopDevBoxDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesGetRemoteConnection200Response
    | DevBoxesGetRemoteConnectionDefaultResponse
): response is DevBoxesGetRemoteConnectionDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesListUpcomingActions200Response
    | DevBoxesListUpcomingActionsDefaultResponse
): response is DevBoxesListUpcomingActionsDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesGetUpcomingAction200Response
    | DevBoxesGetUpcomingActionDefaultResponse
): response is DevBoxesGetUpcomingActionDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesSkipUpcomingAction204Response
    | DevBoxesSkipUpcomingActionDefaultResponse
): response is DevBoxesSkipUpcomingActionDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesDelayUpcomingAction200Response
    | DevBoxesDelayUpcomingActionDefaultResponse
): response is DevBoxesDelayUpcomingActionDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsListEnvironments200Response
    | EnvironmentsListEnvironmentsDefaultResponse
): response is EnvironmentsListEnvironmentsDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsListEnvironmentsByUser200Response
    | EnvironmentsListEnvironmentsByUserDefaultResponse
): response is EnvironmentsListEnvironmentsByUserDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsGetEnvironmentByUser200Response
    | EnvironmentsGetEnvironmentByUserDefaultResponse
): response is EnvironmentsGetEnvironmentByUserDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsCreateOrUpdateEnvironment200Response
    | EnvironmentsCreateOrUpdateEnvironment201Response
    | EnvironmentsCreateOrUpdateEnvironmentDefaultResponse
): response is EnvironmentsCreateOrUpdateEnvironmentDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsUpdateEnvironment200Response
    | EnvironmentsUpdateEnvironmentDefaultResponse
): response is EnvironmentsUpdateEnvironmentDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsDeleteEnvironment200Response
    | EnvironmentsDeleteEnvironment202Response
    | EnvironmentsDeleteEnvironment204Response
    | EnvironmentsDeleteEnvironmentDefaultResponse
): response is EnvironmentsDeleteEnvironmentDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsDeployEnvironmentAction200Response
    | EnvironmentsDeployEnvironmentAction202Response
    | EnvironmentsDeployEnvironmentActionDefaultResponse
): response is EnvironmentsDeployEnvironmentActionDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsCustomEnvironmentAction200Response
    | EnvironmentsCustomEnvironmentAction202Response
    | EnvironmentsCustomEnvironmentActionDefaultResponse
): response is EnvironmentsCustomEnvironmentActionDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsListCatalogItems200Response
    | EnvironmentsListCatalogItemsDefaultResponse
): response is EnvironmentsListCatalogItemsDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsGetCatalogItem200Response
    | EnvironmentsGetCatalogItemDefaultResponse
): response is EnvironmentsGetCatalogItemDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsListCatalogItemVersions200Response
    | EnvironmentsListCatalogItemVersionsDefaultResponse
): response is EnvironmentsListCatalogItemVersionsDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsGetCatalogItemVersion200Response
    | EnvironmentsGetCatalogItemVersionDefaultResponse
): response is EnvironmentsGetCatalogItemVersionDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsListEnvironmentTypes200Response
    | EnvironmentsListEnvironmentTypesDefaultResponse
): response is EnvironmentsListEnvironmentTypesDefaultResponse;
export function isUnexpected(
  response:
    | DevCenterListProjects200Response
    | DevCenterListProjectsDefaultResponse
    | DevCenterGetProject200Response
    | DevCenterGetProjectDefaultResponse
    | DevCenterListAllDevBoxes200Response
    | DevCenterListAllDevBoxesDefaultResponse
    | DevCenterListAllDevBoxesByUser200Response
    | DevCenterListAllDevBoxesByUserDefaultResponse
    | DevBoxesListPools200Response
    | DevBoxesListPoolsDefaultResponse
    | DevBoxesGetPool200Response
    | DevBoxesGetPoolDefaultResponse
    | DevBoxesListSchedulesByPool200Response
    | DevBoxesListSchedulesByPoolDefaultResponse
    | DevBoxesGetScheduleByPool200Response
    | DevBoxesGetScheduleByPoolDefaultResponse
    | DevBoxesListDevBoxesByUser200Response
    | DevBoxesListDevBoxesByUserDefaultResponse
    | DevBoxesGetDevBoxByUser200Response
    | DevBoxesGetDevBoxByUserDefaultResponse
    | DevBoxesCreateDevBox200Response
    | DevBoxesCreateDevBox201Response
    | DevBoxesCreateDevBoxDefaultResponse
    | DevBoxesDeleteDevBox202Response
    | DevBoxesDeleteDevBox204Response
    | DevBoxesDeleteDevBoxDefaultResponse
    | DevBoxesStartDevBox202Response
    | DevBoxesStartDevBoxDefaultResponse
    | DevBoxesStopDevBox202Response
    | DevBoxesStopDevBoxDefaultResponse
    | DevBoxesGetRemoteConnection200Response
    | DevBoxesGetRemoteConnectionDefaultResponse
    | DevBoxesListUpcomingActions200Response
    | DevBoxesListUpcomingActionsDefaultResponse
    | DevBoxesGetUpcomingAction200Response
    | DevBoxesGetUpcomingActionDefaultResponse
    | DevBoxesSkipUpcomingAction204Response
    | DevBoxesSkipUpcomingActionDefaultResponse
    | DevBoxesDelayUpcomingAction200Response
    | DevBoxesDelayUpcomingActionDefaultResponse
    | EnvironmentsListEnvironments200Response
    | EnvironmentsListEnvironmentsDefaultResponse
    | EnvironmentsListEnvironmentsByUser200Response
    | EnvironmentsListEnvironmentsByUserDefaultResponse
    | EnvironmentsGetEnvironmentByUser200Response
    | EnvironmentsGetEnvironmentByUserDefaultResponse
    | EnvironmentsCreateOrUpdateEnvironment200Response
    | EnvironmentsCreateOrUpdateEnvironment201Response
    | EnvironmentsCreateOrUpdateEnvironmentDefaultResponse
    | EnvironmentsUpdateEnvironment200Response
    | EnvironmentsUpdateEnvironmentDefaultResponse
    | EnvironmentsDeleteEnvironment200Response
    | EnvironmentsDeleteEnvironment202Response
    | EnvironmentsDeleteEnvironment204Response
    | EnvironmentsDeleteEnvironmentDefaultResponse
    | EnvironmentsDeployEnvironmentAction200Response
    | EnvironmentsDeployEnvironmentAction202Response
    | EnvironmentsDeployEnvironmentActionDefaultResponse
    | EnvironmentsCustomEnvironmentAction200Response
    | EnvironmentsCustomEnvironmentAction202Response
    | EnvironmentsCustomEnvironmentActionDefaultResponse
    | EnvironmentsListCatalogItems200Response
    | EnvironmentsListCatalogItemsDefaultResponse
    | EnvironmentsGetCatalogItem200Response
    | EnvironmentsGetCatalogItemDefaultResponse
    | EnvironmentsListCatalogItemVersions200Response
    | EnvironmentsListCatalogItemVersionsDefaultResponse
    | EnvironmentsGetCatalogItemVersion200Response
    | EnvironmentsGetCatalogItemVersionDefaultResponse
    | EnvironmentsListEnvironmentTypes200Response
    | EnvironmentsListEnvironmentTypesDefaultResponse
): response is
  | DevCenterListProjectsDefaultResponse
  | DevCenterGetProjectDefaultResponse
  | DevCenterListAllDevBoxesDefaultResponse
  | DevCenterListAllDevBoxesByUserDefaultResponse
  | DevBoxesListPoolsDefaultResponse
  | DevBoxesGetPoolDefaultResponse
  | DevBoxesListSchedulesByPoolDefaultResponse
  | DevBoxesGetScheduleByPoolDefaultResponse
  | DevBoxesListDevBoxesByUserDefaultResponse
  | DevBoxesGetDevBoxByUserDefaultResponse
  | DevBoxesCreateDevBoxDefaultResponse
  | DevBoxesDeleteDevBoxDefaultResponse
  | DevBoxesStartDevBoxDefaultResponse
  | DevBoxesStopDevBoxDefaultResponse
  | DevBoxesGetRemoteConnectionDefaultResponse
  | DevBoxesListUpcomingActionsDefaultResponse
  | DevBoxesGetUpcomingActionDefaultResponse
  | DevBoxesSkipUpcomingActionDefaultResponse
  | DevBoxesDelayUpcomingActionDefaultResponse
  | EnvironmentsListEnvironmentsDefaultResponse
  | EnvironmentsListEnvironmentsByUserDefaultResponse
  | EnvironmentsGetEnvironmentByUserDefaultResponse
  | EnvironmentsCreateOrUpdateEnvironmentDefaultResponse
  | EnvironmentsUpdateEnvironmentDefaultResponse
  | EnvironmentsDeleteEnvironmentDefaultResponse
  | EnvironmentsDeployEnvironmentActionDefaultResponse
  | EnvironmentsCustomEnvironmentActionDefaultResponse
  | EnvironmentsListCatalogItemsDefaultResponse
  | EnvironmentsGetCatalogItemDefaultResponse
  | EnvironmentsListCatalogItemVersionsDefaultResponse
  | EnvironmentsGetCatalogItemVersionDefaultResponse
  | EnvironmentsListEnvironmentTypesDefaultResponse {
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
    if (
      candidateParts.length === pathParts.length &&
      hasParametrizedPath(key)
    ) {
      // track if we have found a match to return the values found.
      let found = true;
      for (let i = 0; i < candidateParts.length; i++) {
        if (
          candidateParts[i]?.startsWith("{") &&
          candidateParts[i]?.endsWith("}")
        ) {
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
