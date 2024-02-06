// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ListProjects200Response,
  ListProjectsDefaultResponse,
  GetProject200Response,
  GetProjectDefaultResponse,
  GetProjectOperationStatus200Response,
  GetProjectOperationStatusDefaultResponse,
  ListPools200Response,
  ListPoolsDefaultResponse,
  GetPool200Response,
  GetPoolDefaultResponse,
  ListSchedules200Response,
  ListSchedulesDefaultResponse,
  GetSchedule200Response,
  GetScheduleDefaultResponse,
  ListDevBoxes200Response,
  ListDevBoxesDefaultResponse,
  GetDevBox200Response,
  GetDevBoxDefaultResponse,
  CreateDevBox200Response,
  CreateDevBox201Response,
  CreateDevBoxLogicalResponse,
  CreateDevBoxDefaultResponse,
  DeleteDevBox202Response,
  DeleteDevBox204Response,
  DeleteDevBoxLogicalResponse,
  DeleteDevBoxDefaultResponse,
  StartDevBox202Response,
  StartDevBoxLogicalResponse,
  StartDevBoxDefaultResponse,
  StopDevBox202Response,
  StopDevBoxLogicalResponse,
  StopDevBoxDefaultResponse,
  RestartDevBox202Response,
  RestartDevBoxLogicalResponse,
  RestartDevBoxDefaultResponse,
  GetRemoteConnection200Response,
  GetRemoteConnectionDefaultResponse,
  ListDevBoxActions200Response,
  ListDevBoxActionsDefaultResponse,
  GetDevBoxAction200Response,
  GetDevBoxActionDefaultResponse,
  SkipAction204Response,
  SkipActionDefaultResponse,
  DelayAction200Response,
  DelayActionDefaultResponse,
  DelayAllActions200Response,
  DelayAllActionsDefaultResponse,
  ListAllDevBoxes200Response,
  ListAllDevBoxesDefaultResponse,
  ListAllDevBoxesByUser200Response,
  ListAllDevBoxesByUserDefaultResponse,
  ListAllEnvironments200Response,
  ListAllEnvironmentsDefaultResponse,
  ListEnvironments200Response,
  ListEnvironmentsDefaultResponse,
  GetEnvironment200Response,
  GetEnvironmentDefaultResponse,
  CreateOrUpdateEnvironment201Response,
  CreateOrUpdateEnvironmentLogicalResponse,
  CreateOrUpdateEnvironmentDefaultResponse,
  DeleteEnvironment202Response,
  DeleteEnvironment204Response,
  DeleteEnvironmentLogicalResponse,
  DeleteEnvironmentDefaultResponse,
  ListCatalogs200Response,
  ListCatalogsDefaultResponse,
  GetCatalog200Response,
  GetCatalogDefaultResponse,
  ListEnvironmentDefinitions200Response,
  ListEnvironmentDefinitionsDefaultResponse,
  ListEnvironmentDefinitionsByCatalog200Response,
  ListEnvironmentDefinitionsByCatalogDefaultResponse,
  GetEnvironmentDefinition200Response,
  GetEnvironmentDefinitionDefaultResponse,
  ListEnvironmentTypes200Response,
  ListEnvironmentTypesDefaultResponse,
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /projects": ["200"],
  "GET /projects/{projectName}": ["200"],
  "GET /projects/{projectName}/operationstatuses/{operationId}": ["200"],
  "GET /projects/{projectName}/pools": ["200"],
  "GET /projects/{projectName}/pools/{poolName}": ["200"],
  "GET /projects/{projectName}/pools/{poolName}/schedules": ["200"],
  "GET /projects/{projectName}/pools/{poolName}/schedules/{scheduleName}": ["200"],
  "GET /projects/{projectName}/users/{userId}/devboxes": ["200"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}": ["200"],
  "PUT /projects/{projectName}/users/{userId}/devboxes/{devBoxName}": ["200", "201"],
  "DELETE /projects/{projectName}/users/{userId}/devboxes/{devBoxName}": ["202", "204"],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:start": ["202"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:start": ["200", "202"],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:stop": ["202"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:stop": ["200", "202"],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:restart": ["202"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:restart": ["200", "202"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/remoteConnection": ["200"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions": ["200"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions/{actionName}": ["200"],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions/{actionName}:skip": [
    "204",
  ],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions/{actionName}:delay": [
    "200",
  ],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions:delay": ["200"],
  "GET /devboxes": ["200"],
  "GET /users/{userId}/devboxes": ["200"],
  "GET /projects/{projectName}/environments": ["200"],
  "GET /projects/{projectName}/users/{userId}/environments": ["200"],
  "GET /projects/{projectName}/users/{userId}/environments/{environmentName}": ["200"],
  "PUT /projects/{projectName}/users/{userId}/environments/{environmentName}": ["201"],
  "DELETE /projects/{projectName}/users/{userId}/environments/{environmentName}": ["202", "204"],
  "GET /projects/{projectName}/catalogs": ["200"],
  "GET /projects/{projectName}/catalogs/{catalogName}": ["200"],
  "GET /projects/{projectName}/environmentDefinitions": ["200"],
  "GET /projects/{projectName}/catalogs/{catalogName}/environmentDefinitions": ["200"],
  "GET /projects/{projectName}/catalogs/{catalogName}/environmentDefinitions/{definitionName}": [
    "200",
  ],
  "GET /projects/{projectName}/environmentTypes": ["200"],
};

export function isUnexpected(
  response: ListProjects200Response | ListProjectsDefaultResponse
): response is ListProjectsDefaultResponse;
export function isUnexpected(
  response: GetProject200Response | GetProjectDefaultResponse
): response is GetProjectDefaultResponse;
export function isUnexpected(
  response: GetProjectOperationStatus200Response | GetProjectOperationStatusDefaultResponse
): response is GetProjectOperationStatusDefaultResponse;
export function isUnexpected(
  response: ListPools200Response | ListPoolsDefaultResponse
): response is ListPoolsDefaultResponse;
export function isUnexpected(
  response: GetPool200Response | GetPoolDefaultResponse
): response is GetPoolDefaultResponse;
export function isUnexpected(
  response: ListSchedules200Response | ListSchedulesDefaultResponse
): response is ListSchedulesDefaultResponse;
export function isUnexpected(
  response: GetSchedule200Response | GetScheduleDefaultResponse
): response is GetScheduleDefaultResponse;
export function isUnexpected(
  response: ListDevBoxes200Response | ListDevBoxesDefaultResponse
): response is ListDevBoxesDefaultResponse;
export function isUnexpected(
  response: GetDevBox200Response | GetDevBoxDefaultResponse
): response is GetDevBoxDefaultResponse;
export function isUnexpected(
  response:
    | CreateDevBox200Response
    | CreateDevBox201Response
    | CreateDevBoxLogicalResponse
    | CreateDevBoxDefaultResponse
): response is CreateDevBoxDefaultResponse;
export function isUnexpected(
  response:
    | DeleteDevBox202Response
    | DeleteDevBox204Response
    | DeleteDevBoxLogicalResponse
    | DeleteDevBoxDefaultResponse
): response is DeleteDevBoxDefaultResponse;
export function isUnexpected(
  response: StartDevBox202Response | StartDevBoxLogicalResponse | StartDevBoxDefaultResponse
): response is StartDevBoxDefaultResponse;
export function isUnexpected(
  response: StopDevBox202Response | StopDevBoxLogicalResponse | StopDevBoxDefaultResponse
): response is StopDevBoxDefaultResponse;
export function isUnexpected(
  response: RestartDevBox202Response | RestartDevBoxLogicalResponse | RestartDevBoxDefaultResponse
): response is RestartDevBoxDefaultResponse;
export function isUnexpected(
  response: GetRemoteConnection200Response | GetRemoteConnectionDefaultResponse
): response is GetRemoteConnectionDefaultResponse;
export function isUnexpected(
  response: ListDevBoxActions200Response | ListDevBoxActionsDefaultResponse
): response is ListDevBoxActionsDefaultResponse;
export function isUnexpected(
  response: GetDevBoxAction200Response | GetDevBoxActionDefaultResponse
): response is GetDevBoxActionDefaultResponse;
export function isUnexpected(
  response: SkipAction204Response | SkipActionDefaultResponse
): response is SkipActionDefaultResponse;
export function isUnexpected(
  response: DelayAction200Response | DelayActionDefaultResponse
): response is DelayActionDefaultResponse;
export function isUnexpected(
  response: DelayAllActions200Response | DelayAllActionsDefaultResponse
): response is DelayAllActionsDefaultResponse;
export function isUnexpected(
  response: ListAllDevBoxes200Response | ListAllDevBoxesDefaultResponse
): response is ListAllDevBoxesDefaultResponse;
export function isUnexpected(
  response: ListAllDevBoxesByUser200Response | ListAllDevBoxesByUserDefaultResponse
): response is ListAllDevBoxesByUserDefaultResponse;
export function isUnexpected(
  response: ListAllEnvironments200Response | ListAllEnvironmentsDefaultResponse
): response is ListAllEnvironmentsDefaultResponse;
export function isUnexpected(
  response: ListEnvironments200Response | ListEnvironmentsDefaultResponse
): response is ListEnvironmentsDefaultResponse;
export function isUnexpected(
  response: GetEnvironment200Response | GetEnvironmentDefaultResponse
): response is GetEnvironmentDefaultResponse;
export function isUnexpected(
  response:
    | CreateOrUpdateEnvironment201Response
    | CreateOrUpdateEnvironmentLogicalResponse
    | CreateOrUpdateEnvironmentDefaultResponse
): response is CreateOrUpdateEnvironmentDefaultResponse;
export function isUnexpected(
  response:
    | DeleteEnvironment202Response
    | DeleteEnvironment204Response
    | DeleteEnvironmentLogicalResponse
    | DeleteEnvironmentDefaultResponse
): response is DeleteEnvironmentDefaultResponse;
export function isUnexpected(
  response: ListCatalogs200Response | ListCatalogsDefaultResponse
): response is ListCatalogsDefaultResponse;
export function isUnexpected(
  response: GetCatalog200Response | GetCatalogDefaultResponse
): response is GetCatalogDefaultResponse;
export function isUnexpected(
  response: ListEnvironmentDefinitions200Response | ListEnvironmentDefinitionsDefaultResponse
): response is ListEnvironmentDefinitionsDefaultResponse;
export function isUnexpected(
  response:
    | ListEnvironmentDefinitionsByCatalog200Response
    | ListEnvironmentDefinitionsByCatalogDefaultResponse
): response is ListEnvironmentDefinitionsByCatalogDefaultResponse;
export function isUnexpected(
  response: GetEnvironmentDefinition200Response | GetEnvironmentDefinitionDefaultResponse
): response is GetEnvironmentDefinitionDefaultResponse;
export function isUnexpected(
  response: ListEnvironmentTypes200Response | ListEnvironmentTypesDefaultResponse
): response is ListEnvironmentTypesDefaultResponse;
export function isUnexpected(
  response:
    | ListProjects200Response
    | ListProjectsDefaultResponse
    | GetProject200Response
    | GetProjectDefaultResponse
    | GetProjectOperationStatus200Response
    | GetProjectOperationStatusDefaultResponse
    | ListPools200Response
    | ListPoolsDefaultResponse
    | GetPool200Response
    | GetPoolDefaultResponse
    | ListSchedules200Response
    | ListSchedulesDefaultResponse
    | GetSchedule200Response
    | GetScheduleDefaultResponse
    | ListDevBoxes200Response
    | ListDevBoxesDefaultResponse
    | GetDevBox200Response
    | GetDevBoxDefaultResponse
    | CreateDevBox200Response
    | CreateDevBox201Response
    | CreateDevBoxLogicalResponse
    | CreateDevBoxDefaultResponse
    | DeleteDevBox202Response
    | DeleteDevBox204Response
    | DeleteDevBoxLogicalResponse
    | DeleteDevBoxDefaultResponse
    | StartDevBox202Response
    | StartDevBoxLogicalResponse
    | StartDevBoxDefaultResponse
    | StopDevBox202Response
    | StopDevBoxLogicalResponse
    | StopDevBoxDefaultResponse
    | RestartDevBox202Response
    | RestartDevBoxLogicalResponse
    | RestartDevBoxDefaultResponse
    | GetRemoteConnection200Response
    | GetRemoteConnectionDefaultResponse
    | ListDevBoxActions200Response
    | ListDevBoxActionsDefaultResponse
    | GetDevBoxAction200Response
    | GetDevBoxActionDefaultResponse
    | SkipAction204Response
    | SkipActionDefaultResponse
    | DelayAction200Response
    | DelayActionDefaultResponse
    | DelayAllActions200Response
    | DelayAllActionsDefaultResponse
    | ListAllDevBoxes200Response
    | ListAllDevBoxesDefaultResponse
    | ListAllDevBoxesByUser200Response
    | ListAllDevBoxesByUserDefaultResponse
    | ListAllEnvironments200Response
    | ListAllEnvironmentsDefaultResponse
    | ListEnvironments200Response
    | ListEnvironmentsDefaultResponse
    | GetEnvironment200Response
    | GetEnvironmentDefaultResponse
    | CreateOrUpdateEnvironment201Response
    | CreateOrUpdateEnvironmentLogicalResponse
    | CreateOrUpdateEnvironmentDefaultResponse
    | DeleteEnvironment202Response
    | DeleteEnvironment204Response
    | DeleteEnvironmentLogicalResponse
    | DeleteEnvironmentDefaultResponse
    | ListCatalogs200Response
    | ListCatalogsDefaultResponse
    | GetCatalog200Response
    | GetCatalogDefaultResponse
    | ListEnvironmentDefinitions200Response
    | ListEnvironmentDefinitionsDefaultResponse
    | ListEnvironmentDefinitionsByCatalog200Response
    | ListEnvironmentDefinitionsByCatalogDefaultResponse
    | GetEnvironmentDefinition200Response
    | GetEnvironmentDefinitionDefaultResponse
    | ListEnvironmentTypes200Response
    | ListEnvironmentTypesDefaultResponse
): response is
  | ListProjectsDefaultResponse
  | GetProjectDefaultResponse
  | GetProjectOperationStatusDefaultResponse
  | ListPoolsDefaultResponse
  | GetPoolDefaultResponse
  | ListSchedulesDefaultResponse
  | GetScheduleDefaultResponse
  | ListDevBoxesDefaultResponse
  | GetDevBoxDefaultResponse
  | CreateDevBoxDefaultResponse
  | DeleteDevBoxDefaultResponse
  | StartDevBoxDefaultResponse
  | StopDevBoxDefaultResponse
  | RestartDevBoxDefaultResponse
  | GetRemoteConnectionDefaultResponse
  | ListDevBoxActionsDefaultResponse
  | GetDevBoxActionDefaultResponse
  | SkipActionDefaultResponse
  | DelayActionDefaultResponse
  | DelayAllActionsDefaultResponse
  | ListAllDevBoxesDefaultResponse
  | ListAllDevBoxesByUserDefaultResponse
  | ListAllEnvironmentsDefaultResponse
  | ListEnvironmentsDefaultResponse
  | GetEnvironmentDefaultResponse
  | CreateOrUpdateEnvironmentDefaultResponse
  | DeleteEnvironmentDefaultResponse
  | ListCatalogsDefaultResponse
  | GetCatalogDefaultResponse
  | ListEnvironmentDefinitionsDefaultResponse
  | ListEnvironmentDefinitionsByCatalogDefaultResponse
  | GetEnvironmentDefinitionDefaultResponse
  | ListEnvironmentTypesDefaultResponse {
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
