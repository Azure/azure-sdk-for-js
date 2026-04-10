// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import {
  getById,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/roleDefinitions/operations.js";
import type {
  RoleDefinitionsGetByIdOptionalParams,
  RoleDefinitionsListOptionalParams,
  RoleDefinitionsDeleteOptionalParams,
  RoleDefinitionsCreateOrUpdateOptionalParams,
  RoleDefinitionsGetOptionalParams,
} from "../../api/roleDefinitions/options.js";
import type { RoleDefinition } from "../../models/microsoft/roleDefinitions/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RoleDefinitions operations. */
export interface RoleDefinitionsOperations {
  /** Gets a role definition by ID. */
  getById: (
    roleId: string,
    options?: RoleDefinitionsGetByIdOptionalParams,
  ) => Promise<RoleDefinition>;
  /** Get all role definitions that are applicable at scope and above. */
  list: (
    scope: string,
    options?: RoleDefinitionsListOptionalParams,
  ) => PagedAsyncIterableIterator<RoleDefinition>;
  /** Deletes a role definition. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    scope: string,
    roleDefinitionId: string,
    options?: RoleDefinitionsDeleteOptionalParams,
  ) => Promise<RoleDefinition>;
  /** Creates or updates a role definition. */
  createOrUpdate: (
    scope: string,
    roleDefinitionId: string,
    roleDefinition: RoleDefinition,
    options?: RoleDefinitionsCreateOrUpdateOptionalParams,
  ) => Promise<RoleDefinition>;
  /** Get role definition by ID (GUID). */
  get: (
    scope: string,
    roleDefinitionId: string,
    options?: RoleDefinitionsGetOptionalParams,
  ) => Promise<RoleDefinition>;
}

function _getRoleDefinitions(context: AuthorizationManagementContext) {
  return {
    getById: (roleId: string, options?: RoleDefinitionsGetByIdOptionalParams) =>
      getById(context, roleId, options),
    list: (scope: string, options?: RoleDefinitionsListOptionalParams) =>
      list(context, scope, options),
    delete: (
      scope: string,
      roleDefinitionId: string,
      options?: RoleDefinitionsDeleteOptionalParams,
    ) => $delete(context, scope, roleDefinitionId, options),
    createOrUpdate: (
      scope: string,
      roleDefinitionId: string,
      roleDefinition: RoleDefinition,
      options?: RoleDefinitionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, scope, roleDefinitionId, roleDefinition, options),
    get: (scope: string, roleDefinitionId: string, options?: RoleDefinitionsGetOptionalParams) =>
      get(context, scope, roleDefinitionId, options),
  };
}

export function _getRoleDefinitionsOperations(
  context: AuthorizationManagementContext,
): RoleDefinitionsOperations {
  return {
    ..._getRoleDefinitions(context),
  };
}
