// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse } from "@azure-rest/core-client";
import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import {
  CheckPrincipalAccessResponse,
  ErrorContract,
  RoleAssignmentDetailsList,
  RoleAssignmentDetails,
  SynapseRoleDefinition
} from "./models";

/** Check if the given principalId has access to perform list of actions at a given scope. */
export interface RoleAssignmentsCheckPrincipalAccess200Response
  extends HttpResponse {
  status: "200";
  body: CheckPrincipalAccessResponse;
}

/** Check if the given principalId has access to perform list of actions at a given scope. */
export interface RoleAssignmentsCheckPrincipalAccessdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorContract;
}

export interface RoleAssignmentsListRoleAssignments200Headers {
  /** If the number of role assignments to be listed exceeds the maxResults limit, a continuation token is returned in this response header.  When a continuation token is returned in the response, it must be specified in a subsequent invocation of the list operation to continue listing the role assignments. */
  "x-ms-continuation"?: string;
}

/** List role assignments. */
export interface RoleAssignmentsListRoleAssignments200Response
  extends HttpResponse {
  status: "200";
  body: RoleAssignmentDetailsList;
  headers: RawHttpHeaders & RoleAssignmentsListRoleAssignments200Headers;
}

/** List role assignments. */
export interface RoleAssignmentsListRoleAssignmentsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorContract;
}

/** Create role assignment. */
export interface RoleAssignmentsCreateRoleAssignment200Response
  extends HttpResponse {
  status: "200";
  body: RoleAssignmentDetails;
}

/** Create role assignment. */
export interface RoleAssignmentsCreateRoleAssignmentdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorContract;
}

/** Get role assignment by role assignment Id. */
export interface RoleAssignmentsGetRoleAssignmentById200Response
  extends HttpResponse {
  status: "200";
  body: RoleAssignmentDetails;
}

/** Get role assignment by role assignment Id. */
export interface RoleAssignmentsGetRoleAssignmentByIddefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorContract;
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
  status: "500";
  body: ErrorContract;
}

/** List role definitions. */
export interface RoleDefinitionsListRoleDefinitions200Response
  extends HttpResponse {
  status: "200";
  body: Array<SynapseRoleDefinition>;
}

/** List role definitions. */
export interface RoleDefinitionsListRoleDefinitionsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorContract;
}

/** Get role definition by role definition Id. */
export interface RoleDefinitionsGetRoleDefinitionById200Response
  extends HttpResponse {
  status: "200";
  body: SynapseRoleDefinition;
}

/** Get role definition by role definition Id. */
export interface RoleDefinitionsGetRoleDefinitionByIddefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorContract;
}

/** List rbac scopes. */
export interface RoleDefinitionsListScopes200Response extends HttpResponse {
  status: "200";
  body: Array<string>;
}

/** List rbac scopes. */
export interface RoleDefinitionsListScopesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorContract;
}
