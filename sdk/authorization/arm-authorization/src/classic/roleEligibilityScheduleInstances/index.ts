// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { listForScope, get } from "../../api/roleEligibilityScheduleInstances/operations.js";
import type {
  RoleEligibilityScheduleInstancesListForScopeOptionalParams,
  RoleEligibilityScheduleInstancesGetOptionalParams,
} from "../../api/roleEligibilityScheduleInstances/options.js";
import type { RoleEligibilityScheduleInstance } from "../../models/microsoft/authorization/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RoleEligibilityScheduleInstances operations. */
export interface RoleEligibilityScheduleInstancesOperations {
  /** Gets role eligibility schedule instances of a role eligibility schedule. */
  listForScope: (
    scope: string,
    options?: RoleEligibilityScheduleInstancesListForScopeOptionalParams,
  ) => PagedAsyncIterableIterator<RoleEligibilityScheduleInstance>;
  /** Gets the specified role eligibility schedule instance. */
  get: (
    scope: string,
    roleEligibilityScheduleInstanceName: string,
    options?: RoleEligibilityScheduleInstancesGetOptionalParams,
  ) => Promise<RoleEligibilityScheduleInstance>;
}

function _getRoleEligibilityScheduleInstances(context: AuthorizationManagementContext) {
  return {
    listForScope: (
      scope: string,
      options?: RoleEligibilityScheduleInstancesListForScopeOptionalParams,
    ) => listForScope(context, scope, options),
    get: (
      scope: string,
      roleEligibilityScheduleInstanceName: string,
      options?: RoleEligibilityScheduleInstancesGetOptionalParams,
    ) => get(context, scope, roleEligibilityScheduleInstanceName, options),
  };
}

export function _getRoleEligibilityScheduleInstancesOperations(
  context: AuthorizationManagementContext,
): RoleEligibilityScheduleInstancesOperations {
  return {
    ..._getRoleEligibilityScheduleInstances(context),
  };
}
