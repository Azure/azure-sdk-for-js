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
  DevBoxesRestartDevBox202Response,
  DevBoxesRestartDevBoxDefaultResponse,
  DevBoxesGetRemoteConnection200Response,
  DevBoxesGetRemoteConnectionDefaultResponse,
  DevBoxesListActions200Response,
  DevBoxesListActionsDefaultResponse,
  DevBoxesGetAction200Response,
  DevBoxesGetActionDefaultResponse,
  DevBoxesSkipAction204Response,
  DevBoxesSkipActionDefaultResponse,
  DevBoxesDelayAction200Response,
  DevBoxesDelayActionDefaultResponse,
  DevBoxesDelayActions200Response,
  DevBoxesDelayActionsDefaultResponse,
  EnvironmentsListEnvironments200Response,
  EnvironmentsListEnvironmentsDefaultResponse,
  EnvironmentsListEnvironmentsByUser200Response,
  EnvironmentsListEnvironmentsByUserDefaultResponse,
  EnvironmentsGetEnvironmentByUser200Response,
  EnvironmentsGetEnvironmentByUserDefaultResponse,
  EnvironmentsCreateOrReplaceEnvironment201Response,
  EnvironmentsCreateOrReplaceEnvironmentDefaultResponse,
  EnvironmentsDeleteEnvironment202Response,
  EnvironmentsDeleteEnvironment204Response,
  EnvironmentsDeleteEnvironmentDefaultResponse,
  EnvironmentsListCatalogsByProject200Response,
  EnvironmentsListCatalogsByProjectDefaultResponse,
  EnvironmentsGetCatalog200Response,
  EnvironmentsGetCatalogDefaultResponse,
  EnvironmentsListEnvironmentDefinitionsByProject200Response,
  EnvironmentsListEnvironmentDefinitionsByProjectDefaultResponse,
  EnvironmentsListEnvironmentDefinitionsByCatalog200Response,
  EnvironmentsListEnvironmentDefinitionsByCatalogDefaultResponse,
  EnvironmentsGetEnvironmentDefinition200Response,
  EnvironmentsGetEnvironmentDefinitionDefaultResponse,
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
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:restart": [
    "202"
  ],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:restart": [
    "202"
  ],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/remoteConnection": [
    "200"
  ],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions": [
    "200"
  ],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions/{actionName}": [
    "200"
  ],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions/{actionName}:skip": [
    "204"
  ],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions/{actionName}:delay": [
    "200"
  ],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions:delay": [
    "200"
  ],
  "GET /projects/{projectName}/environments": ["200"],
  "GET /projects/{projectName}/users/{userId}/environments": ["200"],
  "GET /projects/{projectName}/users/{userId}/environments/{environmentName}": [
    "200"
  ],
  "PUT /projects/{projectName}/users/{userId}/environments/{environmentName}": [
    "201"
  ],
  "DELETE /projects/{projectName}/users/{userId}/environments/{environmentName}": [
    "202",
    "204"
  ],
  "GET /projects/{projectName}/catalogs": ["200"],
  "GET /projects/{projectName}/catalogs/{catalogName}": ["200"],
  "GET /projects/{projectName}/environmentDefinitions": ["200"],
  "GET /projects/{projectName}/catalogs/{catalogName}/environmentDefinitions": [
    "200"
  ],
  "GET /projects/{projectName}/catalogs/{catalogName}/environmentDefinitions/{definitionName}": [
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
    | DevBoxesRestartDevBox202Response
    | DevBoxesRestartDevBoxDefaultResponse
): response is DevBoxesRestartDevBoxDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesGetRemoteConnection200Response
    | DevBoxesGetRemoteConnectionDefaultResponse
): response is DevBoxesGetRemoteConnectionDefaultResponse;
export function isUnexpected(
  response: DevBoxesListActions200Response | DevBoxesListActionsDefaultResponse
): response is DevBoxesListActionsDefaultResponse;
export function isUnexpected(
  response: DevBoxesGetAction200Response | DevBoxesGetActionDefaultResponse
): response is DevBoxesGetActionDefaultResponse;
export function isUnexpected(
  response: DevBoxesSkipAction204Response | DevBoxesSkipActionDefaultResponse
): response is DevBoxesSkipActionDefaultResponse;
export function isUnexpected(
  response: DevBoxesDelayAction200Response | DevBoxesDelayActionDefaultResponse
): response is DevBoxesDelayActionDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesDelayActions200Response
    | DevBoxesDelayActionsDefaultResponse
): response is DevBoxesDelayActionsDefaultResponse;
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
    | EnvironmentsCreateOrReplaceEnvironment201Response
    | EnvironmentsCreateOrReplaceEnvironmentDefaultResponse
): response is EnvironmentsCreateOrReplaceEnvironmentDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsDeleteEnvironment202Response
    | EnvironmentsDeleteEnvironment204Response
    | EnvironmentsDeleteEnvironmentDefaultResponse
): response is EnvironmentsDeleteEnvironmentDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsListCatalogsByProject200Response
    | EnvironmentsListCatalogsByProjectDefaultResponse
): response is EnvironmentsListCatalogsByProjectDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsGetCatalog200Response
    | EnvironmentsGetCatalogDefaultResponse
): response is EnvironmentsGetCatalogDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsListEnvironmentDefinitionsByProject200Response
    | EnvironmentsListEnvironmentDefinitionsByProjectDefaultResponse
): response is EnvironmentsListEnvironmentDefinitionsByProjectDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsListEnvironmentDefinitionsByCatalog200Response
    | EnvironmentsListEnvironmentDefinitionsByCatalogDefaultResponse
): response is EnvironmentsListEnvironmentDefinitionsByCatalogDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsGetEnvironmentDefinition200Response
    | EnvironmentsGetEnvironmentDefinitionDefaultResponse
): response is EnvironmentsGetEnvironmentDefinitionDefaultResponse;
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
    | DevBoxesRestartDevBox202Response
    | DevBoxesRestartDevBoxDefaultResponse
    | DevBoxesGetRemoteConnection200Response
    | DevBoxesGetRemoteConnectionDefaultResponse
    | DevBoxesListActions200Response
    | DevBoxesListActionsDefaultResponse
    | DevBoxesGetAction200Response
    | DevBoxesGetActionDefaultResponse
    | DevBoxesSkipAction204Response
    | DevBoxesSkipActionDefaultResponse
    | DevBoxesDelayAction200Response
    | DevBoxesDelayActionDefaultResponse
    | DevBoxesDelayActions200Response
    | DevBoxesDelayActionsDefaultResponse
    | EnvironmentsListEnvironments200Response
    | EnvironmentsListEnvironmentsDefaultResponse
    | EnvironmentsListEnvironmentsByUser200Response
    | EnvironmentsListEnvironmentsByUserDefaultResponse
    | EnvironmentsGetEnvironmentByUser200Response
    | EnvironmentsGetEnvironmentByUserDefaultResponse
    | EnvironmentsCreateOrReplaceEnvironment201Response
    | EnvironmentsCreateOrReplaceEnvironmentDefaultResponse
    | EnvironmentsDeleteEnvironment202Response
    | EnvironmentsDeleteEnvironment204Response
    | EnvironmentsDeleteEnvironmentDefaultResponse
    | EnvironmentsListCatalogsByProject200Response
    | EnvironmentsListCatalogsByProjectDefaultResponse
    | EnvironmentsGetCatalog200Response
    | EnvironmentsGetCatalogDefaultResponse
    | EnvironmentsListEnvironmentDefinitionsByProject200Response
    | EnvironmentsListEnvironmentDefinitionsByProjectDefaultResponse
    | EnvironmentsListEnvironmentDefinitionsByCatalog200Response
    | EnvironmentsListEnvironmentDefinitionsByCatalogDefaultResponse
    | EnvironmentsGetEnvironmentDefinition200Response
    | EnvironmentsGetEnvironmentDefinitionDefaultResponse
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
  | DevBoxesRestartDevBoxDefaultResponse
  | DevBoxesGetRemoteConnectionDefaultResponse
  | DevBoxesListActionsDefaultResponse
  | DevBoxesGetActionDefaultResponse
  | DevBoxesSkipActionDefaultResponse
  | DevBoxesDelayActionDefaultResponse
  | DevBoxesDelayActionsDefaultResponse
  | EnvironmentsListEnvironmentsDefaultResponse
  | EnvironmentsListEnvironmentsByUserDefaultResponse
  | EnvironmentsGetEnvironmentByUserDefaultResponse
  | EnvironmentsCreateOrReplaceEnvironmentDefaultResponse
  | EnvironmentsDeleteEnvironmentDefaultResponse
  | EnvironmentsListCatalogsByProjectDefaultResponse
  | EnvironmentsGetCatalogDefaultResponse
  | EnvironmentsListEnvironmentDefinitionsByProjectDefaultResponse
  | EnvironmentsListEnvironmentDefinitionsByCatalogDefaultResponse
  | EnvironmentsGetEnvironmentDefinitionDefaultResponse
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
