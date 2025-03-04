// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Check access response details */
export interface CheckPrincipalAccessResponseOutput {
  /** To check if the current user, group, or service principal has permission to read artifacts in the specified workspace. */
  AccessDecisions?: Array<CheckAccessDecisionOutput>;
}

/** Check access response details */
export interface CheckAccessDecisionOutput {
  /** Access Decision. */
  accessDecision?: string;
  /** Action Id. */
  actionId?: string;
  /** Role Assignment response details */
  roleAssignment?: RoleAssignmentDetailsOutput;
}

/** Role Assignment response details */
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

/** Contains details when the response code indicates an error. */
export interface ErrorContractOutput {
  /** The error details. */
  error?: ErrorResponseOutput;
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.) */
export interface ErrorResponseOutput {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: Array<ErrorResponseOutput>;
  /** The error additional info. */
  readonly additionalInfo?: Array<ErrorAdditionalInfoOutput>;
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfoOutput {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: Record<string, unknown>;
}

/** Role Assignment response details */
export interface RoleAssignmentDetailsListOutput {
  /** Number of role assignments */
  count?: number;
  /** A list of role assignments */
  value?: Array<RoleAssignmentDetailsOutput>;
}

/** Synapse role definition details */
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

/** Synapse role definition details */
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
