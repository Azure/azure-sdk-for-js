// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import {
  validate,
  cancel,
  listForScope,
  create,
  get,
} from "../../api/roleEligibilityScheduleRequests/operations.js";
import type {
  RoleEligibilityScheduleRequestsValidateOptionalParams,
  RoleEligibilityScheduleRequestsCancelOptionalParams,
  RoleEligibilityScheduleRequestsListForScopeOptionalParams,
  RoleEligibilityScheduleRequestsCreateOptionalParams,
  RoleEligibilityScheduleRequestsGetOptionalParams,
} from "../../api/roleEligibilityScheduleRequests/options.js";
import type { RoleEligibilityScheduleRequest } from "../../models/microsoft/authorization/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RoleEligibilityScheduleRequests operations. */
export interface RoleEligibilityScheduleRequestsOperations {
  /** Validates a new role eligibility schedule request. */
  validate: (
    scope: string,
    roleEligibilityScheduleRequestName: string,
    parameters: RoleEligibilityScheduleRequest,
    options?: RoleEligibilityScheduleRequestsValidateOptionalParams,
  ) => Promise<RoleEligibilityScheduleRequest>;
  /** Cancels a pending role eligibility schedule request. */
  cancel: (
    scope: string,
    roleEligibilityScheduleRequestName: string,
    options?: RoleEligibilityScheduleRequestsCancelOptionalParams,
  ) => Promise<void>;
  /** Gets role eligibility schedule requests for a scope. */
  listForScope: (
    scope: string,
    options?: RoleEligibilityScheduleRequestsListForScopeOptionalParams,
  ) => PagedAsyncIterableIterator<RoleEligibilityScheduleRequest>;
  /** Creates a role eligibility schedule request. */
  create: (
    scope: string,
    roleEligibilityScheduleRequestName: string,
    parameters: RoleEligibilityScheduleRequest,
    options?: RoleEligibilityScheduleRequestsCreateOptionalParams,
  ) => Promise<RoleEligibilityScheduleRequest>;
  /** Get the specified role eligibility schedule request. */
  get: (
    scope: string,
    roleEligibilityScheduleRequestName: string,
    options?: RoleEligibilityScheduleRequestsGetOptionalParams,
  ) => Promise<RoleEligibilityScheduleRequest>;
}

function _getRoleEligibilityScheduleRequests(context: AuthorizationManagementContext) {
  return {
    validate: (
      scope: string,
      roleEligibilityScheduleRequestName: string,
      parameters: RoleEligibilityScheduleRequest,
      options?: RoleEligibilityScheduleRequestsValidateOptionalParams,
    ) => validate(context, scope, roleEligibilityScheduleRequestName, parameters, options),
    cancel: (
      scope: string,
      roleEligibilityScheduleRequestName: string,
      options?: RoleEligibilityScheduleRequestsCancelOptionalParams,
    ) => cancel(context, scope, roleEligibilityScheduleRequestName, options),
    listForScope: (
      scope: string,
      options?: RoleEligibilityScheduleRequestsListForScopeOptionalParams,
    ) => listForScope(context, scope, options),
    create: (
      scope: string,
      roleEligibilityScheduleRequestName: string,
      parameters: RoleEligibilityScheduleRequest,
      options?: RoleEligibilityScheduleRequestsCreateOptionalParams,
    ) => create(context, scope, roleEligibilityScheduleRequestName, parameters, options),
    get: (
      scope: string,
      roleEligibilityScheduleRequestName: string,
      options?: RoleEligibilityScheduleRequestsGetOptionalParams,
    ) => get(context, scope, roleEligibilityScheduleRequestName, options),
  };
}

export function _getRoleEligibilityScheduleRequestsOperations(
  context: AuthorizationManagementContext,
): RoleEligibilityScheduleRequestsOperations {
  return {
    ..._getRoleEligibilityScheduleRequests(context),
  };
}
