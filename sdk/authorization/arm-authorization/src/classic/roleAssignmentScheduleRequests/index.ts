// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import {
  validate,
  cancel,
  listForScope,
  create,
  get,
} from "../../api/roleAssignmentScheduleRequests/operations.js";
import type {
  RoleAssignmentScheduleRequestsValidateOptionalParams,
  RoleAssignmentScheduleRequestsCancelOptionalParams,
  RoleAssignmentScheduleRequestsListForScopeOptionalParams,
  RoleAssignmentScheduleRequestsCreateOptionalParams,
  RoleAssignmentScheduleRequestsGetOptionalParams,
} from "../../api/roleAssignmentScheduleRequests/options.js";
import type { RoleAssignmentScheduleRequest } from "../../models/microsoft/authorization/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RoleAssignmentScheduleRequests operations. */
export interface RoleAssignmentScheduleRequestsOperations {
  /** Validates a new role assignment schedule request. */
  validate: (
    scope: string,
    roleAssignmentScheduleRequestName: string,
    parameters: RoleAssignmentScheduleRequest,
    options?: RoleAssignmentScheduleRequestsValidateOptionalParams,
  ) => Promise<RoleAssignmentScheduleRequest>;
  /** Cancels a pending role assignment schedule request. */
  cancel: (
    scope: string,
    roleAssignmentScheduleRequestName: string,
    options?: RoleAssignmentScheduleRequestsCancelOptionalParams,
  ) => Promise<void>;
  /** Gets role assignment schedule requests for a scope. */
  listForScope: (
    scope: string,
    options?: RoleAssignmentScheduleRequestsListForScopeOptionalParams,
  ) => PagedAsyncIterableIterator<RoleAssignmentScheduleRequest>;
  /** Creates a role assignment schedule request. */
  create: (
    scope: string,
    roleAssignmentScheduleRequestName: string,
    parameters: RoleAssignmentScheduleRequest,
    options?: RoleAssignmentScheduleRequestsCreateOptionalParams,
  ) => Promise<RoleAssignmentScheduleRequest>;
  /** Get the specified role assignment schedule request. */
  get: (
    scope: string,
    roleAssignmentScheduleRequestName: string,
    options?: RoleAssignmentScheduleRequestsGetOptionalParams,
  ) => Promise<RoleAssignmentScheduleRequest>;
}

function _getRoleAssignmentScheduleRequests(context: AuthorizationManagementContext) {
  return {
    validate: (
      scope: string,
      roleAssignmentScheduleRequestName: string,
      parameters: RoleAssignmentScheduleRequest,
      options?: RoleAssignmentScheduleRequestsValidateOptionalParams,
    ) => validate(context, scope, roleAssignmentScheduleRequestName, parameters, options),
    cancel: (
      scope: string,
      roleAssignmentScheduleRequestName: string,
      options?: RoleAssignmentScheduleRequestsCancelOptionalParams,
    ) => cancel(context, scope, roleAssignmentScheduleRequestName, options),
    listForScope: (
      scope: string,
      options?: RoleAssignmentScheduleRequestsListForScopeOptionalParams,
    ) => listForScope(context, scope, options),
    create: (
      scope: string,
      roleAssignmentScheduleRequestName: string,
      parameters: RoleAssignmentScheduleRequest,
      options?: RoleAssignmentScheduleRequestsCreateOptionalParams,
    ) => create(context, scope, roleAssignmentScheduleRequestName, parameters, options),
    get: (
      scope: string,
      roleAssignmentScheduleRequestName: string,
      options?: RoleAssignmentScheduleRequestsGetOptionalParams,
    ) => get(context, scope, roleAssignmentScheduleRequestName, options),
  };
}

export function _getRoleAssignmentScheduleRequestsOperations(
  context: AuthorizationManagementContext,
): RoleAssignmentScheduleRequestsOperations {
  return {
    ..._getRoleAssignmentScheduleRequests(context),
  };
}
