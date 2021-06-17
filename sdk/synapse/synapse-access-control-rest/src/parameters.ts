// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { RoleAssignmentOptions } from "./models";

export type GetRoleDefinitionsParameters = RequestParameters;
export type GetRoleDefinitionByIdParameters = RequestParameters;

export interface CreateRoleAssignmentBodyParam {
  body: RoleAssignmentOptions;
}

export type CreateRoleAssignmentParameters = RequestParameters &
  CreateRoleAssignmentBodyParam;

export interface GetRoleAssignmentsQueryParamProperties {
  /** Synapse Built-In Role Id. */
  roleId?: string;
  /** Object ID of the AAD principal or security-group. */
  principalId?: string;
}

export interface GetRoleAssignmentsQueryParam {
  queryParameters?: GetRoleAssignmentsQueryParamProperties;
}

export type GetRoleAssignmentsParameters = RequestParameters &
  GetRoleAssignmentsQueryParam;
export type GetRoleAssignmentByIdParameters = RequestParameters;
export type DeleteRoleAssignmentByIdParameters = RequestParameters;
export type GetCallerRoleAssignmentsParameters = RequestParameters;
