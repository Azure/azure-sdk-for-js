// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  CheckPrincipalAccessResponseOutput,
  ErrorContractOutput,
  RoleAssignmentDetailsListOutput,
  RoleAssignmentDetailsOutput,
  SynapseRoleDefinitionOutput
} from "./outputModels";

/** Check if the given principalId has access to perform list of actions at a given scope. */
export interface RoleAssignmentsCheckPrincipalAccess200Response
  extends HttpResponse {
  status: "200";
  body: CheckPrincipalAccessResponseOutput;
}

/** Check if the given principalId has access to perform list of actions at a given scope. */
export interface RoleAssignmentsCheckPrincipalAccessdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorContractOutput;
}

export interface RoleAssignmentsListRoleAssignments200Headers {
  /** If the number of role assignments to be listed exceeds the maxResults limit, a continuation token is returned in this response header.  When a continuation token is returned in the response, it must be specified in a subsequent invocation of the list operation to continue listing the role assignments. */
  "x-ms-continuation"?: string;
}

/** List role assignments. */
export interface RoleAssignmentsListRoleAssignments200Response
  extends HttpResponse {
  status: "200";
  body: RoleAssignmentDetailsListOutput;
  headers: RawHttpHeaders & RoleAssignmentsListRoleAssignments200Headers;
}

/** List role assignments. */
export interface RoleAssignmentsListRoleAssignmentsdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorContractOutput;
}

/** Create role assignment. */
export interface RoleAssignmentsCreateRoleAssignment200Response
  extends HttpResponse {
  status: "200";
  body: RoleAssignmentDetailsOutput;
}

/** Create role assignment. */
export interface RoleAssignmentsCreateRoleAssignmentdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorContractOutput;
}

/** Get role assignment by role assignment Id. */
export interface RoleAssignmentsGetRoleAssignmentById200Response
  extends HttpResponse {
  status: "200";
  body: RoleAssignmentDetailsOutput;
}

/** Get role assignment by role assignment Id. */
export interface RoleAssignmentsGetRoleAssignmentByIddefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorContractOutput;
}

/** Delete role assignment by role assignment Id. */
export interface RoleAssignmentsDeleteRoleAssignmentById200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete role assignment by role assignment Id. */
export interface RoleAssignmentsDeleteRoleAssignmentById204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete role assignment by role assignment Id. */
export interface RoleAssignmentsDeleteRoleAssignmentByIddefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorContractOutput;
}

/** List role definitions. */
export interface RoleDefinitionsListRoleDefinitions200Response
  extends HttpResponse {
  status: "200";
  body: Array<SynapseRoleDefinitionOutput>;
}

/** List role definitions. */
export interface RoleDefinitionsListRoleDefinitionsdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorContractOutput;
}

/** Get role definition by role definition Id. */
export interface RoleDefinitionsGetRoleDefinitionById200Response
  extends HttpResponse {
  status: "200";
  body: SynapseRoleDefinitionOutput;
}

/** Get role definition by role definition Id. */
export interface RoleDefinitionsGetRoleDefinitionByIddefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorContractOutput;
}

/** List rbac scopes. */
export interface RoleDefinitionsListScopes200Response extends HttpResponse {
  status: "200";
  body: Array<string>;
}

/** List rbac scopes. */
export interface RoleDefinitionsListScopesdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorContractOutput;
}
