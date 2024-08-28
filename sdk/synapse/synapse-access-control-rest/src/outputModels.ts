// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface CheckPrincipalAccessResponseOutput {
  /** To check if the current user, group, or service principal has permission to read artifacts in the specified workspace. */
  AccessDecisions?: Array<CheckAccessDecisionOutput>;
}

export interface CheckAccessDecisionOutput {
  /** Access Decision. */
  accessDecision?: string;
  /** Action Id. */
  actionId?: string;
  /** Role Assignment response details */
  roleAssignment?: RoleAssignmentDetailsOutput;
}

export interface RoleAssignmentDetailsOutput {
  /** Role Assignment ID */
  id?: string;
  /**
   * Role ID of the Synapse Built-In Role
   *
   * Value may contain a UUID
   */
  roleDefinitionId?: string;
  /**
   * Object ID of the AAD principal or security-group
   *
   * Value may contain a UUID
   */
  principalId?: string;
  /** Scope at the role assignment is created */
  scope?: string;
  /** Type of the principal Id: User, Group or ServicePrincipal */
  principalType?: string;
}

export interface ErrorContractOutput {
  /** The error details. */
  error?: ErrorResponseOutput;
}

export interface ErrorResponseOutput {
  /** The error code. */
  code?: string;
  /** The error message. */
  message?: string;
  /** The error target. */
  target?: string;
  /** The error details. */
  details?: Array<ErrorResponseOutput>;
  /** The error additional info. */
  additionalInfo?: Array<ErrorAdditionalInfoOutput>;
}

export interface ErrorAdditionalInfoOutput {
  /** The additional info type. */
  type?: string;
  /** The additional info. */
  info?: Record<string, unknown>;
}

export interface RoleAssignmentDetailsListOutput {
  /** Number of role assignments */
  count?: number;
  /** A list of role assignments */
  value?: Array<RoleAssignmentDetailsOutput>;
}

export interface SynapseRoleDefinitionOutput {
  /**
   * Role Definition ID
   *
   * Value may contain a UUID
   */
  id?: string;
  /** Name of the Synapse role */
  name?: string;
  /** Is a built-in role or not */
  isBuiltIn?: boolean;
  /** Description for the Synapse role */
  description?: string;
  /** Permissions for the Synapse role */
  permissions?: Array<SynapseRbacPermissionOutput>;
  /** Allowed scopes for the Synapse role */
  scopes?: Array<string>;
  /** Availability of the Synapse role */
  availabilityStatus?: string;
}

export interface SynapseRbacPermissionOutput {
  /** List of actions */
  actions?: Array<string>;
  /** List of Not actions */
  notActions?: Array<string>;
  /** List of data actions */
  dataActions?: Array<string>;
  /** List of Not data actions */
  notDataActions?: Array<string>;
}
