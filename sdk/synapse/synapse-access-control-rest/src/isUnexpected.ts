// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  RoleAssignmentsCheckPrincipalAccess200Response,
  RoleAssignmentsCheckPrincipalAccessdefaultResponse,
  RoleAssignmentsListRoleAssignments200Response,
  RoleAssignmentsListRoleAssignmentsdefaultResponse,
  RoleAssignmentsCreateRoleAssignment200Response,
  RoleAssignmentsCreateRoleAssignmentdefaultResponse,
  RoleAssignmentsGetRoleAssignmentById200Response,
  RoleAssignmentsGetRoleAssignmentByIddefaultResponse,
  RoleAssignmentsDeleteRoleAssignmentById200Response,
  RoleAssignmentsDeleteRoleAssignmentById204Response,
  RoleAssignmentsDeleteRoleAssignmentByIddefaultResponse,
  RoleDefinitionsListRoleDefinitions200Response,
  RoleDefinitionsListRoleDefinitionsdefaultResponse,
  RoleDefinitionsGetRoleDefinitionById200Response,
  RoleDefinitionsGetRoleDefinitionByIddefaultResponse,
  RoleDefinitionsListScopes200Response,
  RoleDefinitionsListScopesdefaultResponse
} from "./responses";

const responseMap: Record<string, string[]> = {
  "POST /checkAccessSynapseRbac": ["200"],
  "GET /roleAssignments": ["200"],
  "PUT /roleAssignments/{roleAssignmentId}": ["200"],
  "GET /roleAssignments/{roleAssignmentId}": ["200"],
  "DELETE /roleAssignments/{roleAssignmentId}": ["200", "204"],
  "GET /roleDefinitions": ["200"],
  "GET /roleDefinitions/{roleDefinitionId}": ["200"],
  "GET /rbacScopes": ["200"]
};

export function isUnexpected(
  response:
    | RoleAssignmentsCheckPrincipalAccess200Response
    | RoleAssignmentsCheckPrincipalAccessdefaultResponse
): response is RoleAssignmentsCheckPrincipalAccessdefaultResponse;
export function isUnexpected(
  response:
    | RoleAssignmentsListRoleAssignments200Response
    | RoleAssignmentsListRoleAssignmentsdefaultResponse
): response is RoleAssignmentsListRoleAssignmentsdefaultResponse;
export function isUnexpected(
  response:
    | RoleAssignmentsCreateRoleAssignment200Response
    | RoleAssignmentsCreateRoleAssignmentdefaultResponse
): response is RoleAssignmentsCreateRoleAssignmentdefaultResponse;
export function isUnexpected(
  response:
    | RoleAssignmentsGetRoleAssignmentById200Response
    | RoleAssignmentsGetRoleAssignmentByIddefaultResponse
): response is RoleAssignmentsGetRoleAssignmentByIddefaultResponse;
export function isUnexpected(
  response:
    | RoleAssignmentsDeleteRoleAssignmentById200Response
    | RoleAssignmentsDeleteRoleAssignmentById204Response
    | RoleAssignmentsDeleteRoleAssignmentByIddefaultResponse
): response is RoleAssignmentsDeleteRoleAssignmentByIddefaultResponse;
export function isUnexpected(
  response:
    | RoleDefinitionsListRoleDefinitions200Response
    | RoleDefinitionsListRoleDefinitionsdefaultResponse
): response is RoleDefinitionsListRoleDefinitionsdefaultResponse;
export function isUnexpected(
  response:
    | RoleDefinitionsGetRoleDefinitionById200Response
    | RoleDefinitionsGetRoleDefinitionByIddefaultResponse
): response is RoleDefinitionsGetRoleDefinitionByIddefaultResponse;
export function isUnexpected(
  response:
    | RoleDefinitionsListScopes200Response
    | RoleDefinitionsListScopesdefaultResponse
): response is RoleDefinitionsListScopesdefaultResponse;
export function isUnexpected(
  response:
    | RoleAssignmentsCheckPrincipalAccess200Response
    | RoleAssignmentsCheckPrincipalAccessdefaultResponse
    | RoleAssignmentsListRoleAssignments200Response
    | RoleAssignmentsListRoleAssignmentsdefaultResponse
    | RoleAssignmentsCreateRoleAssignment200Response
    | RoleAssignmentsCreateRoleAssignmentdefaultResponse
    | RoleAssignmentsGetRoleAssignmentById200Response
    | RoleAssignmentsGetRoleAssignmentByIddefaultResponse
    | RoleAssignmentsDeleteRoleAssignmentById200Response
    | RoleAssignmentsDeleteRoleAssignmentById204Response
    | RoleAssignmentsDeleteRoleAssignmentByIddefaultResponse
    | RoleDefinitionsListRoleDefinitions200Response
    | RoleDefinitionsListRoleDefinitionsdefaultResponse
    | RoleDefinitionsGetRoleDefinitionById200Response
    | RoleDefinitionsGetRoleDefinitionByIddefaultResponse
    | RoleDefinitionsListScopes200Response
    | RoleDefinitionsListScopesdefaultResponse
): response is
  | RoleAssignmentsCheckPrincipalAccessdefaultResponse
  | RoleAssignmentsListRoleAssignmentsdefaultResponse
  | RoleAssignmentsCreateRoleAssignmentdefaultResponse
  | RoleAssignmentsGetRoleAssignmentByIddefaultResponse
  | RoleAssignmentsDeleteRoleAssignmentByIddefaultResponse
  | RoleDefinitionsListRoleDefinitionsdefaultResponse
  | RoleDefinitionsGetRoleDefinitionByIddefaultResponse
  | RoleDefinitionsListScopesdefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = geParametrizedPathSuccess(url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function geParametrizedPathSuccess(path: string): string[] {
  const pathParts = path.split("/");

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
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
          candidateParts[i].startsWith("{") &&
          candidateParts[i].endsWith("}")
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
