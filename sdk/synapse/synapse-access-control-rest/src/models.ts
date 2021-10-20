// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface CheckPrincipalAccessRequest {
  /** Subject details */
  subject: SubjectInfo;
  /** List of actions. */
  actions: Array<RequiredAction>;
  /** Scope at which the check access is done. */
  scope: string;
}

export interface SubjectInfo {
  /**
   * Principal Id
   *
   * Value may contain a UUID
   */
  principalId: string;
  /** List of group Ids that the principalId is part of. */
  groupIds?: Array<string>;
}

export interface RequiredAction {
  /** Action Id. */
  id: string;
  /** Is a data action or not. */
  isDataAction: boolean;
}

export interface CheckPrincipalAccessResponse {
  /** To check if the current user, group, or service principal has permission to read artifacts in the specified workspace. */
  AccessDecisions?: Array<CheckAccessDecision>;
}

export interface CheckAccessDecision {
  /** Access Decision. */
  accessDecision?: string;
  /** Action Id. */
  actionId?: string;
  /** Role Assignment response details */
  roleAssignment?: RoleAssignmentDetails;
}

export interface RoleAssignmentDetails {
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

export interface ErrorContract {
  /** The error details. */
  error?: ErrorResponse;
}

export interface ErrorResponse {
  /** The error code. */
  code?: string;
  /** The error message. */
  message?: string;
  /** The error target. */
  target?: string;
  /** The error details. */
  details?: Array<ErrorResponse>;
  /** The error additional info. */
  additionalInfo?: Array<ErrorAdditionalInfo>;
}

export interface ErrorAdditionalInfo {
  /** The additional info type. */
  type?: string;
  /** The additional info. */
  info?: Record<string, unknown>;
}

export interface RoleAssignmentDetailsList {
  /** Number of role assignments */
  count?: number;
  /** A list of role assignments */
  value?: Array<RoleAssignmentDetails>;
}

export interface RoleAssignmentRequest {
  /**
   * Role ID of the Synapse Built-In Role
   *
   * Value may contain a UUID
   */
  roleId: string;
  /**
   * Object ID of the AAD principal or security-group
   *
   * Value may contain a UUID
   */
  principalId: string;
  /** Scope at which the role assignment is created */
  scope: string;
  /** Type of the principal Id: User, Group or ServicePrincipal */
  principalType?: string;
}

export interface SynapseRoleDefinition {
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
  permissions?: Array<SynapseRbacPermission>;
  /** Allowed scopes for the Synapse role */
  scopes?: Array<string>;
  /** Availability of the Synapse role */
  availabilityStatus?: string;
}

export interface SynapseRbacPermission {
  /** List of actions */
  actions?: Array<string>;
  /** List of Not actions */
  notActions?: Array<string>;
  /** List of data actions */
  dataActions?: Array<string>;
  /** List of Not data actions */
  notDataActions?: Array<string>;
}
