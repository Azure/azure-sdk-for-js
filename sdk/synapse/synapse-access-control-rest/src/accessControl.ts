// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
import { getClient, ClientOptions, Client } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface RoleAssignmentsCheckPrincipalAccess {
  /** Check if the given principalId has access to perform list of actions at a given scope. */
  post(
    options: RoleAssignmentsCheckPrincipalAccessParameters
  ): Promise<
    | RoleAssignmentsCheckPrincipalAccess200Response
    | RoleAssignmentsCheckPrincipalAccessdefaultResponse
  >;
}

export interface RoleAssignmentsListRoleAssignments {
  /** List role assignments. */
  get(
    options?: RoleAssignmentsListRoleAssignmentsParameters
  ): Promise<
    | RoleAssignmentsListRoleAssignments200Response
    | RoleAssignmentsListRoleAssignmentsdefaultResponse
  >;
}

export interface RoleAssignmentsCreateRoleAssignment {
  /** Create role assignment. */
  put(
    options: RoleAssignmentsCreateRoleAssignmentParameters
  ): Promise<
    | RoleAssignmentsCreateRoleAssignment200Response
    | RoleAssignmentsCreateRoleAssignmentdefaultResponse
  >;
  /** Get role assignment by role assignment Id. */
  get(
    options?: RoleAssignmentsGetRoleAssignmentByIdParameters
  ): Promise<
    | RoleAssignmentsGetRoleAssignmentById200Response
    | RoleAssignmentsGetRoleAssignmentByIddefaultResponse
  >;
  /** Delete role assignment by role assignment Id. */
  delete(
    options?: RoleAssignmentsDeleteRoleAssignmentByIdParameters
  ): Promise<
    | RoleAssignmentsDeleteRoleAssignmentById200Response
    | RoleAssignmentsDeleteRoleAssignmentById204Response
    | RoleAssignmentsDeleteRoleAssignmentByIddefaultResponse
  >;
}

export interface RoleDefinitionsListRoleDefinitions {
  /** List role definitions. */
  get(
    options?: RoleDefinitionsListRoleDefinitionsParameters
  ): Promise<
    | RoleDefinitionsListRoleDefinitions200Response
    | RoleDefinitionsListRoleDefinitionsdefaultResponse
  >;
}

export interface RoleDefinitionsGetRoleDefinitionById {
  /** Get role definition by role definition Id. */
  get(
    options?: RoleDefinitionsGetRoleDefinitionByIdParameters
  ): Promise<
    | RoleDefinitionsGetRoleDefinitionById200Response
    | RoleDefinitionsGetRoleDefinitionByIddefaultResponse
  >;
}

export interface RoleDefinitionsListScopes {
  /** List rbac scopes. */
  get(
    options?: RoleDefinitionsListScopesParameters
  ): Promise<
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

export default function AccessControl(
  endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): AccessControlRestClient {
  const baseUrl = options.baseUrl ?? `${endpoint}`;
  options.apiVersion = options.apiVersion ?? "2020-12-01";
  options = {
    ...options,
    credentials: {
      scopes: ["https://dev.azuresynapse.net/.default"]
    }
  };

  return getClient(baseUrl, credentials, options) as AccessControlRestClient;
}
