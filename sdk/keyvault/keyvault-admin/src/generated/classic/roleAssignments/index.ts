// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultContext } from "../../api/keyVaultContext.js";
import {
  RoleAssignmentsDeleteOptionalParams,
  RoleAssignmentsCreateOptionalParams,
  RoleAssignmentsGetOptionalParams,
  RoleAssignmentsListForScopeOptionalParams,
} from "../../api/options.js";
import {
  $delete,
  create,
  get,
  listForScope,
} from "../../api/roleAssignments/index.js";
import {
  RoleAssignment,
  RoleAssignmentCreateParameters,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RoleAssignments operations. */
export interface RoleAssignmentsOperations {
  /** Deletes a role assignment. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    scope: string,
    roleAssignmentName: string,
    options?: RoleAssignmentsDeleteOptionalParams,
  ) => Promise<RoleAssignment>;
  /** Creates a role assignment. */
  create: (
    scope: string,
    roleAssignmentName: string,
    parameters: RoleAssignmentCreateParameters,
    options?: RoleAssignmentsCreateOptionalParams,
  ) => Promise<RoleAssignment>;
  /** Get the specified role assignment. */
  get: (
    scope: string,
    roleAssignmentName: string,
    options?: RoleAssignmentsGetOptionalParams,
  ) => Promise<RoleAssignment>;
  /** Gets role assignments for a scope. */
  listForScope: (
    scope: string,
    options?: RoleAssignmentsListForScopeOptionalParams,
  ) => PagedAsyncIterableIterator<RoleAssignment>;
}

export function getRoleAssignments(context: KeyVaultContext) {
  return {
    delete: (
      scope: string,
      roleAssignmentName: string,
      options?: RoleAssignmentsDeleteOptionalParams,
    ) => $delete(context, scope, roleAssignmentName, options),
    create: (
      scope: string,
      roleAssignmentName: string,
      parameters: RoleAssignmentCreateParameters,
      options?: RoleAssignmentsCreateOptionalParams,
    ) => create(context, scope, roleAssignmentName, parameters, options),
    get: (
      scope: string,
      roleAssignmentName: string,
      options?: RoleAssignmentsGetOptionalParams,
    ) => get(context, scope, roleAssignmentName, options),
    listForScope: (
      scope: string,
      options?: RoleAssignmentsListForScopeOptionalParams,
    ) => listForScope(context, scope, options),
  };
}

export function getRoleAssignmentsOperations(
  context: KeyVaultContext,
): RoleAssignmentsOperations {
  return {
    ...getRoleAssignments(context),
  };
}
