// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import {
  deleteById,
  createById,
  getById,
  listForResource,
  listForResourceGroup,
  listForSubscription,
  listForScope,
  $delete,
  create,
  get,
} from "../../api/roleAssignments/operations.js";
import type {
  RoleAssignmentsDeleteByIdOptionalParams,
  RoleAssignmentsCreateByIdOptionalParams,
  RoleAssignmentsGetByIdOptionalParams,
  RoleAssignmentsListForResourceOptionalParams,
  RoleAssignmentsListForResourceGroupOptionalParams,
  RoleAssignmentsListForSubscriptionOptionalParams,
  RoleAssignmentsListForScopeOptionalParams,
  RoleAssignmentsDeleteOptionalParams,
  RoleAssignmentsCreateOptionalParams,
  RoleAssignmentsGetOptionalParams,
} from "../../api/roleAssignments/options.js";
import type {
  RoleAssignment,
  RoleAssignmentCreateParameters,
} from "../../models/microsoft/roleAssignment/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RoleAssignments operations. */
export interface RoleAssignmentsOperations {
  /** Delete a role assignment by ID. */
  deleteById: (
    roleAssignmentId: string,
    options?: RoleAssignmentsDeleteByIdOptionalParams,
  ) => Promise<RoleAssignment>;
  /** Create or update a role assignment by ID. */
  createById: (
    roleAssignmentId: string,
    parameters: RoleAssignmentCreateParameters,
    options?: RoleAssignmentsCreateByIdOptionalParams,
  ) => Promise<RoleAssignment>;
  /** Get a role assignment by ID. */
  getById: (
    roleAssignmentId: string,
    options?: RoleAssignmentsGetByIdOptionalParams,
  ) => Promise<RoleAssignment>;
  /** List all role assignments that apply to a resource. */
  listForResource: (
    resourceGroupName: string,
    resourceProviderNamespace: string,
    resourceType: string,
    resourceName: string,
    options?: RoleAssignmentsListForResourceOptionalParams,
  ) => PagedAsyncIterableIterator<RoleAssignment>;
  /** List all role assignments that apply to a resource group. */
  listForResourceGroup: (
    resourceGroupName: string,
    options?: RoleAssignmentsListForResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<RoleAssignment>;
  /** List all role assignments that apply to a subscription. */
  listForSubscription: (
    options?: RoleAssignmentsListForSubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<RoleAssignment>;
  /** List all role assignments that apply to a scope. */
  listForScope: (
    scope: string,
    options?: RoleAssignmentsListForScopeOptionalParams,
  ) => PagedAsyncIterableIterator<RoleAssignment>;
  /** Delete a role assignment by scope and name. */
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
  /** Create or update a role assignment by scope and name. */
  create: (
    scope: string,
    roleAssignmentName: string,
    parameters: RoleAssignmentCreateParameters,
    options?: RoleAssignmentsCreateOptionalParams,
  ) => Promise<RoleAssignment>;
  /** Get a role assignment by scope and name. */
  get: (
    scope: string,
    roleAssignmentName: string,
    options?: RoleAssignmentsGetOptionalParams,
  ) => Promise<RoleAssignment>;
}

function _getRoleAssignments(context: AuthorizationManagementContext) {
  return {
    deleteById: (roleAssignmentId: string, options?: RoleAssignmentsDeleteByIdOptionalParams) =>
      deleteById(context, roleAssignmentId, options),
    createById: (
      roleAssignmentId: string,
      parameters: RoleAssignmentCreateParameters,
      options?: RoleAssignmentsCreateByIdOptionalParams,
    ) => createById(context, roleAssignmentId, parameters, options),
    getById: (roleAssignmentId: string, options?: RoleAssignmentsGetByIdOptionalParams) =>
      getById(context, roleAssignmentId, options),
    listForResource: (
      resourceGroupName: string,
      resourceProviderNamespace: string,
      resourceType: string,
      resourceName: string,
      options?: RoleAssignmentsListForResourceOptionalParams,
    ) =>
      listForResource(
        context,
        resourceGroupName,
        resourceProviderNamespace,
        resourceType,
        resourceName,
        options,
      ),
    listForResourceGroup: (
      resourceGroupName: string,
      options?: RoleAssignmentsListForResourceGroupOptionalParams,
    ) => listForResourceGroup(context, resourceGroupName, options),
    listForSubscription: (options?: RoleAssignmentsListForSubscriptionOptionalParams) =>
      listForSubscription(context, options),
    listForScope: (scope: string, options?: RoleAssignmentsListForScopeOptionalParams) =>
      listForScope(context, scope, options),
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
    get: (scope: string, roleAssignmentName: string, options?: RoleAssignmentsGetOptionalParams) =>
      get(context, scope, roleAssignmentName, options),
  };
}

export function _getRoleAssignmentsOperations(
  context: AuthorizationManagementContext,
): RoleAssignmentsOperations {
  return {
    ..._getRoleAssignments(context),
  };
}
