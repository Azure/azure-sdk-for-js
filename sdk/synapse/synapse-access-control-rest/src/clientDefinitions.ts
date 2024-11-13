// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  RoleAssignmentsCheckPrincipalAccessParameters,
  RoleAssignmentsListRoleAssignmentsParameters,
  RoleAssignmentsCreateRoleAssignmentParameters,
  RoleAssignmentsGetRoleAssignmentByIdParameters,
  RoleAssignmentsDeleteRoleAssignmentByIdParameters,
  RoleDefinitionsListRoleDefinitionsParameters,
  RoleDefinitionsGetRoleDefinitionByIdParameters,
  RoleDefinitionsListScopesParameters
} from "./parameters";
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
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface RoleAssignmentsCheckPrincipalAccess {
  /** Check if the given principalId has access to perform list of actions at a given scope. */
  post(
    options: RoleAssignmentsCheckPrincipalAccessParameters
  ): StreamableMethod<
    | RoleAssignmentsCheckPrincipalAccess200Response
    | RoleAssignmentsCheckPrincipalAccessdefaultResponse
  >;
}

export interface RoleAssignmentsListRoleAssignments {
  /** List role assignments. */
  get(
    options?: RoleAssignmentsListRoleAssignmentsParameters
  ): StreamableMethod<
    | RoleAssignmentsListRoleAssignments200Response
    | RoleAssignmentsListRoleAssignmentsdefaultResponse
  >;
}

export interface RoleAssignmentsCreateRoleAssignment {
  /** Create role assignment. */
  put(
    options: RoleAssignmentsCreateRoleAssignmentParameters
  ): StreamableMethod<
    | RoleAssignmentsCreateRoleAssignment200Response
    | RoleAssignmentsCreateRoleAssignmentdefaultResponse
  >;
  /** Get role assignment by role assignment Id. */
  get(
    options?: RoleAssignmentsGetRoleAssignmentByIdParameters
  ): StreamableMethod<
    | RoleAssignmentsGetRoleAssignmentById200Response
    | RoleAssignmentsGetRoleAssignmentByIddefaultResponse
  >;
  /** Delete role assignment by role assignment Id. */
  delete(
    options?: RoleAssignmentsDeleteRoleAssignmentByIdParameters
  ): StreamableMethod<
    | RoleAssignmentsDeleteRoleAssignmentById200Response
    | RoleAssignmentsDeleteRoleAssignmentById204Response
    | RoleAssignmentsDeleteRoleAssignmentByIddefaultResponse
  >;
}

export interface RoleDefinitionsListRoleDefinitions {
  /** List role definitions. */
  get(
    options?: RoleDefinitionsListRoleDefinitionsParameters
  ): StreamableMethod<
    | RoleDefinitionsListRoleDefinitions200Response
    | RoleDefinitionsListRoleDefinitionsdefaultResponse
  >;
}

export interface RoleDefinitionsGetRoleDefinitionById {
  /** Get role definition by role definition Id. */
  get(
    options?: RoleDefinitionsGetRoleDefinitionByIdParameters
  ): StreamableMethod<
    | RoleDefinitionsGetRoleDefinitionById200Response
    | RoleDefinitionsGetRoleDefinitionByIddefaultResponse
  >;
}

export interface RoleDefinitionsListScopes {
  /** List rbac scopes. */
  get(
    options?: RoleDefinitionsListScopesParameters
  ): StreamableMethod<
    | RoleDefinitionsListScopes200Response
    | RoleDefinitionsListScopesdefaultResponse
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
    roleAssignmentId: string
  ): RoleAssignmentsCreateRoleAssignment;
  /** Resource for '/roleDefinitions' has methods for the following verbs: get */
  (path: "/roleDefinitions"): RoleDefinitionsListRoleDefinitions;
  /** Resource for '/roleDefinitions/\{roleDefinitionId\}' has methods for the following verbs: get */
  (
    path: "/roleDefinitions/{roleDefinitionId}",
    roleDefinitionId: string
  ): RoleDefinitionsGetRoleDefinitionById;
  /** Resource for '/rbacScopes' has methods for the following verbs: get */
  (path: "/rbacScopes"): RoleDefinitionsListScopes;
}

export type AccessControlRestClient = Client & {
  path: Routes;
};
