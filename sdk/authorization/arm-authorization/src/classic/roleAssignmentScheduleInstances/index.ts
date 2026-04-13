// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { listForScope, get } from "../../api/roleAssignmentScheduleInstances/operations.js";
import type {
  RoleAssignmentScheduleInstancesListForScopeOptionalParams,
  RoleAssignmentScheduleInstancesGetOptionalParams,
} from "../../api/roleAssignmentScheduleInstances/options.js";
import type { RoleAssignmentScheduleInstance } from "../../models/microsoft/authorization/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RoleAssignmentScheduleInstances operations. */
export interface RoleAssignmentScheduleInstancesOperations {
  /** Gets role assignment schedule instances of a role assignment schedule. */
  listForScope: (
    scope: string,
    options?: RoleAssignmentScheduleInstancesListForScopeOptionalParams,
  ) => PagedAsyncIterableIterator<RoleAssignmentScheduleInstance>;
  /** Gets the specified role assignment schedule instance. */
  get: (
    scope: string,
    roleAssignmentScheduleInstanceName: string,
    options?: RoleAssignmentScheduleInstancesGetOptionalParams,
  ) => Promise<RoleAssignmentScheduleInstance>;
}

function _getRoleAssignmentScheduleInstances(context: AuthorizationManagementContext) {
  return {
    listForScope: (
      scope: string,
      options?: RoleAssignmentScheduleInstancesListForScopeOptionalParams,
    ) => listForScope(context, scope, options),
    get: (
      scope: string,
      roleAssignmentScheduleInstanceName: string,
      options?: RoleAssignmentScheduleInstancesGetOptionalParams,
    ) => get(context, scope, roleAssignmentScheduleInstanceName, options),
  };
}

export function _getRoleAssignmentScheduleInstancesOperations(
  context: AuthorizationManagementContext,
): RoleAssignmentScheduleInstancesOperations {
  return {
    ..._getRoleAssignmentScheduleInstances(context),
  };
}
