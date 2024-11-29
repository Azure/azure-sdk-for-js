// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  RoleAssignmentsCheckPrincipalAccessParameters,
  RoleAssignmentsListRoleAssignmentsParameters,
  RoleAssignmentsCreateRoleAssignmentParameters,
  RoleAssignmentsGetRoleAssignmentByIdParameters,
  RoleAssignmentsDeleteRoleAssignmentByIdParameters,
  RoleDefinitionsListRoleDefinitionsParameters,
  RoleDefinitionsGetRoleDefinitionByIdParameters,
  RoleDefinitionsListScopesParameters,
} from "./parameters.js";
import type {
  RoleAssignmentsCheckPrincipalAccess200Response,
  RoleAssignmentsCheckPrincipalAccessDefaultResponse,
  RoleAssignmentsListRoleAssignments200Response,
  RoleAssignmentsListRoleAssignmentsDefaultResponse,
  RoleAssignmentsCreateRoleAssignment200Response,
  RoleAssignmentsCreateRoleAssignmentDefaultResponse,
  RoleAssignmentsGetRoleAssignmentById200Response,
  RoleAssignmentsGetRoleAssignmentByIdDefaultResponse,
  RoleAssignmentsDeleteRoleAssignmentById200Response,
  RoleAssignmentsDeleteRoleAssignmentById204Response,
  RoleAssignmentsDeleteRoleAssignmentByIdDefaultResponse,
  RoleDefinitionsListRoleDefinitions200Response,
  RoleDefinitionsListRoleDefinitionsDefaultResponse,
  RoleDefinitionsGetRoleDefinitionById200Response,
  RoleDefinitionsGetRoleDefinitionByIdDefaultResponse,
  RoleDefinitionsListScopes200Response,
  RoleDefinitionsListScopesDefaultResponse,
} from "./responses.js";
import type { Client, StreamableMethod } from "@azure-rest/core-client";

export interface RoleAssignmentsCheckPrincipalAccess {
  /** Check if the given principalId has access to perform list of actions at a given scope. */
  post(
    options: RoleAssignmentsCheckPrincipalAccessParameters,
  ): StreamableMethod<
    | RoleAssignmentsCheckPrincipalAccess200Response
    | RoleAssignmentsCheckPrincipalAccessDefaultResponse
  >;
}

export interface RoleAssignmentsListRoleAssignments {
  /** List role assignments. */
  get(
    options?: RoleAssignmentsListRoleAssignmentsParameters,
  ): StreamableMethod<
    | RoleAssignmentsListRoleAssignments200Response
    | RoleAssignmentsListRoleAssignmentsDefaultResponse
  >;
}

export interface RoleAssignmentsCreateRoleAssignment {
  /** Create role assignment. */
  put(
    options: RoleAssignmentsCreateRoleAssignmentParameters,
  ): StreamableMethod<
    | RoleAssignmentsCreateRoleAssignment200Response
    | RoleAssignmentsCreateRoleAssignmentDefaultResponse
  >;
  /** Get role assignment by role assignment Id. */
  get(
    options?: RoleAssignmentsGetRoleAssignmentByIdParameters,
  ): StreamableMethod<
    | RoleAssignmentsGetRoleAssignmentById200Response
    | RoleAssignmentsGetRoleAssignmentByIdDefaultResponse
  >;
  /** Delete role assignment by role assignment Id. */
  delete(
    options?: RoleAssignmentsDeleteRoleAssignmentByIdParameters,
  ): StreamableMethod<
    | RoleAssignmentsDeleteRoleAssignmentById200Response
    | RoleAssignmentsDeleteRoleAssignmentById204Response
    | RoleAssignmentsDeleteRoleAssignmentByIdDefaultResponse
  >;
}

export interface RoleDefinitionsListRoleDefinitions {
  /** List role definitions. */
  get(
    options?: RoleDefinitionsListRoleDefinitionsParameters,
  ): StreamableMethod<
    | RoleDefinitionsListRoleDefinitions200Response
    | RoleDefinitionsListRoleDefinitionsDefaultResponse
  >;
}

export interface RoleDefinitionsGetRoleDefinitionById {
  /** Get role definition by role definition Id. */
  get(
    options?: RoleDefinitionsGetRoleDefinitionByIdParameters,
  ): StreamableMethod<
    | RoleDefinitionsGetRoleDefinitionById200Response
    | RoleDefinitionsGetRoleDefinitionByIdDefaultResponse
  >;
}

export interface RoleDefinitionsListScopes {
  /** List rbac scopes. */
  get(
    options?: RoleDefinitionsListScopesParameters,
  ): StreamableMethod<
    RoleDefinitionsListScopes200Response | RoleDefinitionsListScopesDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/checkAccessSynapseRbac' has methods for the following verbs: post */
  (path: "/checkAccessSynapseRbac"): RoleAssignmentsCheckPrincipalAccess;
  /** Resource for '/roleAssignments' has methods for the following verbs: get */
  (path: "/roleAssignments"): RoleAssignmentsListRoleAssignments;
  /** Resource for '/roleAssignments/\{roleAssignmentId\}' has methods for the following verbs: put, get, delete */
  (
    path: "/roleAssignments/{roleAssignmentId}",
    roleAssignmentId: string,
  ): RoleAssignmentsCreateRoleAssignment;
  /** Resource for '/roleDefinitions' has methods for the following verbs: get */
  (path: "/roleDefinitions"): RoleDefinitionsListRoleDefinitions;
  /** Resource for '/roleDefinitions/\{roleDefinitionId\}' has methods for the following verbs: get */
  (
    path: "/roleDefinitions/{roleDefinitionId}",
    roleDefinitionId: string,
  ): RoleDefinitionsGetRoleDefinitionById;
  /** Resource for '/rbacScopes' has methods for the following verbs: get */
  (path: "/rbacScopes"): RoleDefinitionsListScopes;
}

export type AccessControlRestClient = Client & {
  path: Routes;
};
