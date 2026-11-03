// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import {
  getById,
  listForResourceGroup,
  list,
  listForScope,
  listForResource,
  $delete,
  createOrUpdate,
  get,
} from "../../api/denyAssignments/operations.js";
import {
  DenyAssignmentsGetByIdOptionalParams,
  DenyAssignmentsListForResourceGroupOptionalParams,
  DenyAssignmentsListOptionalParams,
  DenyAssignmentsListForScopeOptionalParams,
  DenyAssignmentsListForResourceOptionalParams,
  DenyAssignmentsDeleteOptionalParams,
  DenyAssignmentsCreateOrUpdateOptionalParams,
  DenyAssignmentsGetOptionalParams,
} from "../../api/denyAssignments/options.js";
import { DenyAssignment } from "../../models/microsoft/denyAssignment/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DenyAssignments operations. */
export interface DenyAssignmentsOperations {
  /** Gets a deny assignment by ID. */
  getById: (
    denyAssignmentId: string,
    options?: DenyAssignmentsGetByIdOptionalParams,
  ) => Promise<DenyAssignment>;
  /** Gets deny assignments for a resource group. */
  listForResourceGroup: (
    resourceGroupName: string,
    options?: DenyAssignmentsListForResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DenyAssignment>;
  /** Gets all deny assignments for the subscription. */
  list: (options?: DenyAssignmentsListOptionalParams) => PagedAsyncIterableIterator<DenyAssignment>;
  /** Gets deny assignments for a scope. */
  listForScope: (
    scope: string,
    options?: DenyAssignmentsListForScopeOptionalParams,
  ) => PagedAsyncIterableIterator<DenyAssignment>;
  /** Gets deny assignments for a resource. */
  listForResource: (
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourcePath: string,
    resourceType: string,
    resourceName: string,
    options?: DenyAssignmentsListForResourceOptionalParams,
  ) => PagedAsyncIterableIterator<DenyAssignment>;
  /** Delete a deny assignment by scope and name. */
  delete: (
    scope: string,
    denyAssignmentId: string,
    options?: DenyAssignmentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a deny assignment by scope and name. */
  createOrUpdate: (
    scope: string,
    denyAssignmentId: string,
    parameters: DenyAssignment,
    options?: DenyAssignmentsCreateOrUpdateOptionalParams,
  ) => Promise<DenyAssignment>;
  /** Get the specified deny assignment. */
  get: (
    scope: string,
    denyAssignmentId: string,
    options?: DenyAssignmentsGetOptionalParams,
  ) => Promise<DenyAssignment>;
}

function _getDenyAssignments(context: AuthorizationManagementContext) {
  return {
    getById: (denyAssignmentId: string, options?: DenyAssignmentsGetByIdOptionalParams) =>
      getById(context, denyAssignmentId, options),
    listForResourceGroup: (
      resourceGroupName: string,
      options?: DenyAssignmentsListForResourceGroupOptionalParams,
    ) => listForResourceGroup(context, resourceGroupName, options),
    list: (options?: DenyAssignmentsListOptionalParams) => list(context, options),
    listForScope: (scope: string, options?: DenyAssignmentsListForScopeOptionalParams) =>
      listForScope(context, scope, options),
    listForResource: (
      resourceGroupName: string,
      resourceProviderNamespace: string,
      parentResourcePath: string,
      resourceType: string,
      resourceName: string,
      options?: DenyAssignmentsListForResourceOptionalParams,
    ) =>
      listForResource(
        context,
        resourceGroupName,
        resourceProviderNamespace,
        parentResourcePath,
        resourceType,
        resourceName,
        options,
      ),
    delete: (
      scope: string,
      denyAssignmentId: string,
      options?: DenyAssignmentsDeleteOptionalParams,
    ) => $delete(context, scope, denyAssignmentId, options),
    createOrUpdate: (
      scope: string,
      denyAssignmentId: string,
      parameters: DenyAssignment,
      options?: DenyAssignmentsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, scope, denyAssignmentId, parameters, options),
    get: (scope: string, denyAssignmentId: string, options?: DenyAssignmentsGetOptionalParams) =>
      get(context, scope, denyAssignmentId, options),
  };
}

export function _getDenyAssignmentsOperations(
  context: AuthorizationManagementContext,
): DenyAssignmentsOperations {
  return {
    ..._getDenyAssignments(context),
  };
}
