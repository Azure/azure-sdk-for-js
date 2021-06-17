// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  RolesListResponse,
  ErrorContract,
  SynapseRole,
  RoleAssignmentDetails
} from "./models";
import { HttpResponse } from "@azure-rest/core-client";
import { RawHttpHeaders } from "@azure/core-rest-pipeline";

/** List roles. */
export interface GetRoleDefinitions200Response extends HttpResponse {
  status: "200";
  body: RolesListResponse;
}

/** List roles. */
export interface GetRoleDefinitionsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorContract;
}

/** Get role by role Id. */
export interface GetRoleDefinitionById200Response extends HttpResponse {
  status: "200";
  body: SynapseRole;
}

/** Get role by role Id. */
export interface GetRoleDefinitionByIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorContract;
}

/** Create role assignment. */
export interface CreateRoleAssignment200Response extends HttpResponse {
  status: "200";
  body: RoleAssignmentDetails;
}

/** Create role assignment. */
export interface CreateRoleAssignmentdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorContract;
}

export interface GetRoleAssignments200Headers {
  /** If the number of role assignments to be listed exceeds the maxResults limit, a continuation token is returned in this response header.  When a continuation token is returned in the response, it must be specified in a subsequent invocation of the list operation to continue listing the role assignments. */
  "x-ms-continuation"?: string;
}

/** List role assignments. */
export interface GetRoleAssignments200Response extends HttpResponse {
  status: "200";
  body: RoleAssignmentDetails[];
  headers: RawHttpHeaders & GetRoleAssignments200Headers;
}

/** List role assignments. */
export interface GetRoleAssignmentsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorContract;
}

/** Get role assignment by role assignment Id. */
export interface GetRoleAssignmentById200Response extends HttpResponse {
  status: "200";
  body: RoleAssignmentDetails;
}

/** Get role assignment by role assignment Id. */
export interface GetRoleAssignmentByIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorContract;
}

/** Delete role assignment by role assignment Id. */
export interface DeleteRoleAssignmentById200Response extends HttpResponse {
  status: "200";
}

/** Delete role assignment by role assignment Id. */
export interface DeleteRoleAssignmentById204Response extends HttpResponse {
  status: "204";
}

/** Delete role assignment by role assignment Id. */
export interface DeleteRoleAssignmentByIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorContract;
}

/** List role assignments of the caller. */
export interface GetCallerRoleAssignments200Response extends HttpResponse {
  status: "200";
  body: string[];
}

/** List role assignments of the caller. */
export interface GetCallerRoleAssignmentsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorContract;
}
