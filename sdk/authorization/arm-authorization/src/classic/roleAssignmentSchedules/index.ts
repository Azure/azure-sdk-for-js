// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { listForScope, get } from "../../api/roleAssignmentSchedules/operations.js";
import type {
  RoleAssignmentSchedulesListForScopeOptionalParams,
  RoleAssignmentSchedulesGetOptionalParams,
} from "../../api/roleAssignmentSchedules/options.js";
import type { RoleAssignmentSchedule } from "../../models/microsoft/authorization/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RoleAssignmentSchedules operations. */
export interface RoleAssignmentSchedulesOperations {
  /** Gets role assignment schedules for a resource scope. */
  listForScope: (
    scope: string,
    options?: RoleAssignmentSchedulesListForScopeOptionalParams,
  ) => PagedAsyncIterableIterator<RoleAssignmentSchedule>;
  /** Get the specified role assignment schedule for a resource scope */
  get: (
    scope: string,
    roleAssignmentScheduleName: string,
    options?: RoleAssignmentSchedulesGetOptionalParams,
  ) => Promise<RoleAssignmentSchedule>;
}

function _getRoleAssignmentSchedules(context: AuthorizationManagementContext) {
  return {
    listForScope: (scope: string, options?: RoleAssignmentSchedulesListForScopeOptionalParams) =>
      listForScope(context, scope, options),
    get: (
      scope: string,
      roleAssignmentScheduleName: string,
      options?: RoleAssignmentSchedulesGetOptionalParams,
    ) => get(context, scope, roleAssignmentScheduleName, options),
  };
}

export function _getRoleAssignmentSchedulesOperations(
  context: AuthorizationManagementContext,
): RoleAssignmentSchedulesOperations {
  return {
    ..._getRoleAssignmentSchedules(context),
  };
}
