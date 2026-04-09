// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { listForScope, get } from "../../api/roleEligibilitySchedules/operations.js";
import type {
  RoleEligibilitySchedulesListForScopeOptionalParams,
  RoleEligibilitySchedulesGetOptionalParams,
} from "../../api/roleEligibilitySchedules/options.js";
import type { RoleEligibilitySchedule } from "../../models/microsoft/authorization/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RoleEligibilitySchedules operations. */
export interface RoleEligibilitySchedulesOperations {
  /** Gets role eligibility schedules for a resource scope. */
  listForScope: (
    scope: string,
    options?: RoleEligibilitySchedulesListForScopeOptionalParams,
  ) => PagedAsyncIterableIterator<RoleEligibilitySchedule>;
  /** Get the specified role eligibility schedule for a resource scope */
  get: (
    scope: string,
    roleEligibilityScheduleName: string,
    options?: RoleEligibilitySchedulesGetOptionalParams,
  ) => Promise<RoleEligibilitySchedule>;
}

function _getRoleEligibilitySchedules(context: AuthorizationManagementContext) {
  return {
    listForScope: (scope: string, options?: RoleEligibilitySchedulesListForScopeOptionalParams) =>
      listForScope(context, scope, options),
    get: (
      scope: string,
      roleEligibilityScheduleName: string,
      options?: RoleEligibilitySchedulesGetOptionalParams,
    ) => get(context, scope, roleEligibilityScheduleName, options),
  };
}

export function _getRoleEligibilitySchedulesOperations(
  context: AuthorizationManagementContext,
): RoleEligibilitySchedulesOperations {
  return {
    ..._getRoleEligibilitySchedules(context),
  };
}
