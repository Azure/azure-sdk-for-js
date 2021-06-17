// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface RolesListResponse {
  /** List of Synapse roles. */
  value: Array<SynapseRole>;
  /** The link to the next page of results, if any remaining results exist. */
  nextLink?: string;
}

export interface SynapseRole {
  /** Role ID */
  id?: string;
  /** Name of the Synapse role */
  name?: string;
  /** Is a built-in role or not */
  isBuiltIn: boolean;
}

export interface ErrorContract {
  /** The error details. */
  error?: ErrorResponse;
}

export interface ErrorResponse {
  code: string;
  message: string;
  target?: string;
  details?: Array<ErrorDetail>;
}

export interface ErrorDetail {
  code: string;
  message: string;
  target?: string;
}

export interface RoleAssignmentOptions {
  /** Role ID of the Synapse Built-In Role */
  roleId: string;
  /** Object ID of the AAD principal or security-group */
  principalId: string;
}

export interface RoleAssignmentDetails {
  /** Role Assignment ID */
  id?: string;
  /** Role ID of the Synapse Built-In Role */
  roleId?: string;
  /** Object ID of the AAD principal or security-group */
  principalId?: string;
}
