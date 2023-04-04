// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DevCenterListProjects200Response,
  DevCenterListProjectsDefaultResponse,
  DevCenterGetProject200Response,
  DevCenterGetProjectDefaultResponse,
  DevBoxesListPools200Response,
  DevBoxesListPoolsDefaultResponse,
  DevBoxesGetPool200Response,
  DevBoxesGetPoolDefaultResponse,
  DevBoxesListSchedules200Response,
  DevBoxesListSchedulesDefaultResponse,
  DevBoxesGetSchedule200Response,
  DevBoxesGetScheduleDefaultResponse,
  DevBoxesListAllDevBoxes200Response,
  DevBoxesListAllDevBoxesDefaultResponse,
  DevBoxesListAllDevBoxesByUser200Response,
  DevBoxesListAllDevBoxesByUserDefaultResponse,
  DevBoxesListDevBoxes200Response,
  DevBoxesListDevBoxesDefaultResponse,
  DevBoxesGetDevBox200Response,
  DevBoxesGetDevBoxDefaultResponse,
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
  DevBoxesDelayAllActions200Response,
  DevBoxesDelayAllActionsDefaultResponse,
  DeploymentEnvironmentsListAllEnvironments200Response,
  DeploymentEnvironmentsListAllEnvironmentsDefaultResponse,
  DeploymentEnvironmentsListEnvironments200Response,
  DeploymentEnvironmentsListEnvironmentsDefaultResponse,
  DeploymentEnvironmentsGetEnvironment200Response,
  DeploymentEnvironmentsGetEnvironmentDefaultResponse,
  DeploymentEnvironmentsCreateOrUpdateEnvironment201Response,
  DeploymentEnvironmentsCreateOrUpdateEnvironmentDefaultResponse,
  DeploymentEnvironmentsDeleteEnvironment202Response,
  DeploymentEnvironmentsDeleteEnvironment204Response,
  DeploymentEnvironmentsDeleteEnvironmentDefaultResponse,
  DeploymentEnvironmentsListCatalogs200Response,
  DeploymentEnvironmentsListCatalogsDefaultResponse,
  DeploymentEnvironmentsGetCatalog200Response,
  DeploymentEnvironmentsGetCatalogDefaultResponse,
  DeploymentEnvironmentsListEnvironmentDefinitions200Response,
  DeploymentEnvironmentsListEnvironmentDefinitionsDefaultResponse,
  DeploymentEnvironmentsListEnvironmentDefinitionsByCatalog200Response,
  DeploymentEnvironmentsListEnvironmentDefinitionsByCatalogDefaultResponse,
  DeploymentEnvironmentsGetEnvironmentDefinition200Response,
  DeploymentEnvironmentsGetEnvironmentDefinitionDefaultResponse,
  DeploymentEnvironmentsListEnvironmentTypes200Response,
  DeploymentEnvironmentsListEnvironmentTypesDefaultResponse
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /projects": ["200"],
  "GET /projects/{projectName}": ["200"],
  "GET /projects/{projectName}/pools": ["200"],
  "GET /projects/{projectName}/pools/{poolName}": ["200"],
  "GET /projects/{projectName}/pools/{poolName}/schedules": ["200"],
  "GET /projects/{projectName}/pools/{poolName}/schedules/{scheduleName}": [
    "200"
  ],
  "GET /devboxes": ["200"],
  "GET /users/{userId}/devboxes": ["200"],
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
  response: DevBoxesListPools200Response | DevBoxesListPoolsDefaultResponse
): response is DevBoxesListPoolsDefaultResponse;
export function isUnexpected(
  response: DevBoxesGetPool200Response | DevBoxesGetPoolDefaultResponse
): response is DevBoxesGetPoolDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesListSchedules200Response
    | DevBoxesListSchedulesDefaultResponse
): response is DevBoxesListSchedulesDefaultResponse;
export function isUnexpected(
  response: DevBoxesGetSchedule200Response | DevBoxesGetScheduleDefaultResponse
): response is DevBoxesGetScheduleDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesListAllDevBoxes200Response
    | DevBoxesListAllDevBoxesDefaultResponse
): response is DevBoxesListAllDevBoxesDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesListAllDevBoxesByUser200Response
    | DevBoxesListAllDevBoxesByUserDefaultResponse
): response is DevBoxesListAllDevBoxesByUserDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesListDevBoxes200Response
    | DevBoxesListDevBoxesDefaultResponse
): response is DevBoxesListDevBoxesDefaultResponse;
export function isUnexpected(
  response: DevBoxesGetDevBox200Response | DevBoxesGetDevBoxDefaultResponse
): response is DevBoxesGetDevBoxDefaultResponse;
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
    | DevBoxesDelayAllActions200Response
    | DevBoxesDelayAllActionsDefaultResponse
): response is DevBoxesDelayAllActionsDefaultResponse;
export function isUnexpected(
  response:
    | DeploymentEnvironmentsListAllEnvironments200Response
    | DeploymentEnvironmentsListAllEnvironmentsDefaultResponse
): response is DeploymentEnvironmentsListAllEnvironmentsDefaultResponse;
export function isUnexpected(
  response:
    | DeploymentEnvironmentsListEnvironments200Response
    | DeploymentEnvironmentsListEnvironmentsDefaultResponse
): response is DeploymentEnvironmentsListEnvironmentsDefaultResponse;
export function isUnexpected(
  response:
    | DeploymentEnvironmentsGetEnvironment200Response
    | DeploymentEnvironmentsGetEnvironmentDefaultResponse
): response is DeploymentEnvironmentsGetEnvironmentDefaultResponse;
export function isUnexpected(
  response:
    | DeploymentEnvironmentsCreateOrUpdateEnvironment201Response
    | DeploymentEnvironmentsCreateOrUpdateEnvironmentDefaultResponse
): response is DeploymentEnvironmentsCreateOrUpdateEnvironmentDefaultResponse;
export function isUnexpected(
  response:
    | DeploymentEnvironmentsDeleteEnvironment202Response
    | DeploymentEnvironmentsDeleteEnvironment204Response
    | DeploymentEnvironmentsDeleteEnvironmentDefaultResponse
): response is DeploymentEnvironmentsDeleteEnvironmentDefaultResponse;
export function isUnexpected(
  response:
    | DeploymentEnvironmentsListCatalogs200Response
    | DeploymentEnvironmentsListCatalogsDefaultResponse
): response is DeploymentEnvironmentsListCatalogsDefaultResponse;
export function isUnexpected(
  response:
    | DeploymentEnvironmentsGetCatalog200Response
    | DeploymentEnvironmentsGetCatalogDefaultResponse
): response is DeploymentEnvironmentsGetCatalogDefaultResponse;
export function isUnexpected(
  response:
    | DeploymentEnvironmentsListEnvironmentDefinitions200Response
    | DeploymentEnvironmentsListEnvironmentDefinitionsDefaultResponse
): response is DeploymentEnvironmentsListEnvironmentDefinitionsDefaultResponse;
export function isUnexpected(
  response:
    | DeploymentEnvironmentsListEnvironmentDefinitionsByCatalog200Response
    | DeploymentEnvironmentsListEnvironmentDefinitionsByCatalogDefaultResponse
): response is DeploymentEnvironmentsListEnvironmentDefinitionsByCatalogDefaultResponse;
export function isUnexpected(
  response:
    | DeploymentEnvironmentsGetEnvironmentDefinition200Response
    | DeploymentEnvironmentsGetEnvironmentDefinitionDefaultResponse
): response is DeploymentEnvironmentsGetEnvironmentDefinitionDefaultResponse;
export function isUnexpected(
  response:
    | DeploymentEnvironmentsListEnvironmentTypes200Response
    | DeploymentEnvironmentsListEnvironmentTypesDefaultResponse
): response is DeploymentEnvironmentsListEnvironmentTypesDefaultResponse;
export function isUnexpected(
  response:
    | DevCenterListProjects200Response
    | DevCenterListProjectsDefaultResponse
    | DevCenterGetProject200Response
    | DevCenterGetProjectDefaultResponse
    | DevBoxesListPools200Response
    | DevBoxesListPoolsDefaultResponse
    | DevBoxesGetPool200Response
    | DevBoxesGetPoolDefaultResponse
    | DevBoxesListSchedules200Response
    | DevBoxesListSchedulesDefaultResponse
    | DevBoxesGetSchedule200Response
    | DevBoxesGetScheduleDefaultResponse
    | DevBoxesListAllDevBoxes200Response
    | DevBoxesListAllDevBoxesDefaultResponse
    | DevBoxesListAllDevBoxesByUser200Response
    | DevBoxesListAllDevBoxesByUserDefaultResponse
    | DevBoxesListDevBoxes200Response
    | DevBoxesListDevBoxesDefaultResponse
    | DevBoxesGetDevBox200Response
    | DevBoxesGetDevBoxDefaultResponse
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
    | DevBoxesDelayAllActions200Response
    | DevBoxesDelayAllActionsDefaultResponse
    | DeploymentEnvironmentsListAllEnvironments200Response
    | DeploymentEnvironmentsListAllEnvironmentsDefaultResponse
    | DeploymentEnvironmentsListEnvironments200Response
    | DeploymentEnvironmentsListEnvironmentsDefaultResponse
    | DeploymentEnvironmentsGetEnvironment200Response
    | DeploymentEnvironmentsGetEnvironmentDefaultResponse
    | DeploymentEnvironmentsCreateOrUpdateEnvironment201Response
    | DeploymentEnvironmentsCreateOrUpdateEnvironmentDefaultResponse
    | DeploymentEnvironmentsDeleteEnvironment202Response
    | DeploymentEnvironmentsDeleteEnvironment204Response
    | DeploymentEnvironmentsDeleteEnvironmentDefaultResponse
    | DeploymentEnvironmentsListCatalogs200Response
    | DeploymentEnvironmentsListCatalogsDefaultResponse
    | DeploymentEnvironmentsGetCatalog200Response
    | DeploymentEnvironmentsGetCatalogDefaultResponse
    | DeploymentEnvironmentsListEnvironmentDefinitions200Response
    | DeploymentEnvironmentsListEnvironmentDefinitionsDefaultResponse
    | DeploymentEnvironmentsListEnvironmentDefinitionsByCatalog200Response
    | DeploymentEnvironmentsListEnvironmentDefinitionsByCatalogDefaultResponse
    | DeploymentEnvironmentsGetEnvironmentDefinition200Response
    | DeploymentEnvironmentsGetEnvironmentDefinitionDefaultResponse
    | DeploymentEnvironmentsListEnvironmentTypes200Response
    | DeploymentEnvironmentsListEnvironmentTypesDefaultResponse
): response is
  | DevCenterListProjectsDefaultResponse
  | DevCenterGetProjectDefaultResponse
  | DevBoxesListPoolsDefaultResponse
  | DevBoxesGetPoolDefaultResponse
  | DevBoxesListSchedulesDefaultResponse
  | DevBoxesGetScheduleDefaultResponse
  | DevBoxesListAllDevBoxesDefaultResponse
  | DevBoxesListAllDevBoxesByUserDefaultResponse
  | DevBoxesListDevBoxesDefaultResponse
  | DevBoxesGetDevBoxDefaultResponse
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
  | DevBoxesDelayAllActionsDefaultResponse
  | DeploymentEnvironmentsListAllEnvironmentsDefaultResponse
  | DeploymentEnvironmentsListEnvironmentsDefaultResponse
  | DeploymentEnvironmentsGetEnvironmentDefaultResponse
  | DeploymentEnvironmentsCreateOrUpdateEnvironmentDefaultResponse
  | DeploymentEnvironmentsDeleteEnvironmentDefaultResponse
  | DeploymentEnvironmentsListCatalogsDefaultResponse
  | DeploymentEnvironmentsGetCatalogDefaultResponse
  | DeploymentEnvironmentsListEnvironmentDefinitionsDefaultResponse
  | DeploymentEnvironmentsListEnvironmentDefinitionsByCatalogDefaultResponse
  | DeploymentEnvironmentsGetEnvironmentDefinitionDefaultResponse
  | DeploymentEnvironmentsListEnvironmentTypesDefaultResponse {
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
