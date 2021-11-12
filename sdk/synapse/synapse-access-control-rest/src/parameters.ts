// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { CheckPrincipalAccessRequest, RoleAssignmentRequest } from "./models";

export interface RoleAssignmentsCheckPrincipalAccessBodyParam {
  /** Details of scope, list of actions and principal. */
  body: CheckPrincipalAccessRequest;
}

export type RoleAssignmentsCheckPrincipalAccessParameters = RoleAssignmentsCheckPrincipalAccessBodyParam &
  RequestParameters;

export interface RoleAssignmentsListRoleAssignmentsQueryParamProperties {
  /** Synapse Built-In Role Id. */
  roleId?: string;
  /** Object ID of the AAD principal or security-group. */
  principalId?: string;
  /** Scope of the Synapse Built-in Role. */
  scope?: string;
}

export interface RoleAssignmentsListRoleAssignmentsQueryParam {
  queryParameters?: RoleAssignmentsListRoleAssignmentsQueryParamProperties;
}

export type RoleAssignmentsListRoleAssignmentsParameters = RoleAssignmentsListRoleAssignmentsQueryParam &
  RequestParameters;

export interface RoleAssignmentsCreateRoleAssignmentBodyParam {
  /** Details of role id, scope and object id. */
  body: RoleAssignmentRequest;
}

export type RoleAssignmentsCreateRoleAssignmentParameters = RoleAssignmentsCreateRoleAssignmentBodyParam &
  RequestParameters;
export type RoleAssignmentsGetRoleAssignmentByIdParameters = RequestParameters;

export interface RoleAssignmentsDeleteRoleAssignmentByIdQueryParamProperties {
  /** Scope of the Synapse Built-in Role. */
  scope?: string;
}

export interface RoleAssignmentsDeleteRoleAssignmentByIdQueryParam {
  queryParameters?: RoleAssignmentsDeleteRoleAssignmentByIdQueryParamProperties;
}

export type RoleAssignmentsDeleteRoleAssignmentByIdParameters = RoleAssignmentsDeleteRoleAssignmentByIdQueryParam &
  RequestParameters;

export interface RoleDefinitionsListRoleDefinitionsQueryParamProperties {
  /** Is a Synapse Built-In Role or not. */
  isBuiltIn?: boolean;
  /** Scope of the Synapse Built-in Role. */
  scope?: string;
}

export interface RoleDefinitionsListRoleDefinitionsQueryParam {
  queryParameters?: RoleDefinitionsListRoleDefinitionsQueryParamProperties;
}

export type RoleDefinitionsListRoleDefinitionsParameters = RoleDefinitionsListRoleDefinitionsQueryParam &
  RequestParameters;
export type RoleDefinitionsGetRoleDefinitionByIdParameters = RequestParameters;
export type RoleDefinitionsListScopesParameters = RequestParameters;
