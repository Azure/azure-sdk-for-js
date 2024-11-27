// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
