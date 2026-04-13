// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { listForScope, $delete, update, get } from "../../api/roleManagementPolicies/operations.js";
import type {
  RoleManagementPoliciesListForScopeOptionalParams,
  RoleManagementPoliciesDeleteOptionalParams,
  RoleManagementPoliciesUpdateOptionalParams,
  RoleManagementPoliciesGetOptionalParams,
} from "../../api/roleManagementPolicies/options.js";
import type { RoleManagementPolicy } from "../../models/microsoft/authorization/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RoleManagementPolicies operations. */
export interface RoleManagementPoliciesOperations {
  /** Gets role management policies for a resource scope. */
  listForScope: (
    scope: string,
    options?: RoleManagementPoliciesListForScopeOptionalParams,
  ) => PagedAsyncIterableIterator<RoleManagementPolicy>;
  /** Delete a role management policy */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    scope: string,
    roleManagementPolicyName: string,
    options?: RoleManagementPoliciesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a role management policy */
  update: (
    scope: string,
    roleManagementPolicyName: string,
    parameters: RoleManagementPolicy,
    options?: RoleManagementPoliciesUpdateOptionalParams,
  ) => Promise<RoleManagementPolicy>;
  /** Get the specified role management policy for a resource scope */
  get: (
    scope: string,
    roleManagementPolicyName: string,
    options?: RoleManagementPoliciesGetOptionalParams,
  ) => Promise<RoleManagementPolicy>;
}

function _getRoleManagementPolicies(context: AuthorizationManagementContext) {
  return {
    listForScope: (scope: string, options?: RoleManagementPoliciesListForScopeOptionalParams) =>
      listForScope(context, scope, options),
    delete: (
      scope: string,
      roleManagementPolicyName: string,
      options?: RoleManagementPoliciesDeleteOptionalParams,
    ) => $delete(context, scope, roleManagementPolicyName, options),
    update: (
      scope: string,
      roleManagementPolicyName: string,
      parameters: RoleManagementPolicy,
      options?: RoleManagementPoliciesUpdateOptionalParams,
    ) => update(context, scope, roleManagementPolicyName, parameters, options),
    get: (
      scope: string,
      roleManagementPolicyName: string,
      options?: RoleManagementPoliciesGetOptionalParams,
    ) => get(context, scope, roleManagementPolicyName, options),
  };
}

export function _getRoleManagementPoliciesOperations(
  context: AuthorizationManagementContext,
): RoleManagementPoliciesOperations {
  return {
    ..._getRoleManagementPolicies(context),
  };
}
