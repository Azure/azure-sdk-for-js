// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import {
  listForScope,
  $delete,
  create,
  get,
} from "../../api/roleManagementPolicyAssignments/operations.js";
import type {
  RoleManagementPolicyAssignmentsListForScopeOptionalParams,
  RoleManagementPolicyAssignmentsDeleteOptionalParams,
  RoleManagementPolicyAssignmentsCreateOptionalParams,
  RoleManagementPolicyAssignmentsGetOptionalParams,
} from "../../api/roleManagementPolicyAssignments/options.js";
import type { RoleManagementPolicyAssignment } from "../../models/microsoft/authorization/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RoleManagementPolicyAssignments operations. */
export interface RoleManagementPolicyAssignmentsOperations {
  /** Gets role management assignment policies for a resource scope. */
  listForScope: (
    scope: string,
    options?: RoleManagementPolicyAssignmentsListForScopeOptionalParams,
  ) => PagedAsyncIterableIterator<RoleManagementPolicyAssignment>;
  /** Delete a role management policy assignment */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    scope: string,
    roleManagementPolicyAssignmentName: string,
    options?: RoleManagementPolicyAssignmentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a role management policy assignment */
  create: (
    scope: string,
    roleManagementPolicyAssignmentName: string,
    parameters: RoleManagementPolicyAssignment,
    options?: RoleManagementPolicyAssignmentsCreateOptionalParams,
  ) => Promise<RoleManagementPolicyAssignment>;
  /** Get the specified role management policy assignment for a resource scope */
  get: (
    scope: string,
    roleManagementPolicyAssignmentName: string,
    options?: RoleManagementPolicyAssignmentsGetOptionalParams,
  ) => Promise<RoleManagementPolicyAssignment>;
}

function _getRoleManagementPolicyAssignments(context: AuthorizationManagementContext) {
  return {
    listForScope: (
      scope: string,
      options?: RoleManagementPolicyAssignmentsListForScopeOptionalParams,
    ) => listForScope(context, scope, options),
    delete: (
      scope: string,
      roleManagementPolicyAssignmentName: string,
      options?: RoleManagementPolicyAssignmentsDeleteOptionalParams,
    ) => $delete(context, scope, roleManagementPolicyAssignmentName, options),
    create: (
      scope: string,
      roleManagementPolicyAssignmentName: string,
      parameters: RoleManagementPolicyAssignment,
      options?: RoleManagementPolicyAssignmentsCreateOptionalParams,
    ) => create(context, scope, roleManagementPolicyAssignmentName, parameters, options),
    get: (
      scope: string,
      roleManagementPolicyAssignmentName: string,
      options?: RoleManagementPolicyAssignmentsGetOptionalParams,
    ) => get(context, scope, roleManagementPolicyAssignmentName, options),
  };
}

export function _getRoleManagementPolicyAssignmentsOperations(
  context: AuthorizationManagementContext,
): RoleManagementPolicyAssignmentsOperations {
  return {
    ..._getRoleManagementPolicyAssignments(context),
  };
}
