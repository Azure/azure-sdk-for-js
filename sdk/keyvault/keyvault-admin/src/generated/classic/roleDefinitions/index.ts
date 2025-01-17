// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultContext } from "../../api/keyVaultContext.js";
import {
  RoleDefinitionsDeleteOptionalParams,
  RoleDefinitionsCreateOrUpdateOptionalParams,
  RoleDefinitionsGetOptionalParams,
  RoleDefinitionsListOptionalParams,
} from "../../api/options.js";
import {
  $delete,
  createOrUpdate,
  get,
  list,
} from "../../api/roleDefinitions/index.js";
import {
  RoleDefinition,
  RoleDefinitionCreateParameters,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RoleDefinitions operations. */
export interface RoleDefinitionsOperations {
  /** Deletes a custom role definition. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    scope: string,
    roleDefinitionName: string,
    options?: RoleDefinitionsDeleteOptionalParams,
  ) => Promise<RoleDefinition>;
  /** Creates or updates a custom role definition. */
  createOrUpdate: (
    scope: string,
    roleDefinitionName: string,
    parameters: RoleDefinitionCreateParameters,
    options?: RoleDefinitionsCreateOrUpdateOptionalParams,
  ) => Promise<RoleDefinition>;
  /** Get the specified role definition. */
  get: (
    scope: string,
    roleDefinitionName: string,
    options?: RoleDefinitionsGetOptionalParams,
  ) => Promise<RoleDefinition>;
  /** Get all role definitions that are applicable at scope and above. */
  list: (
    scope: string,
    options?: RoleDefinitionsListOptionalParams,
  ) => PagedAsyncIterableIterator<RoleDefinition>;
}

export function getRoleDefinitions(context: KeyVaultContext) {
  return {
    delete: (
      scope: string,
      roleDefinitionName: string,
      options?: RoleDefinitionsDeleteOptionalParams,
    ) => $delete(context, scope, roleDefinitionName, options),
    createOrUpdate: (
      scope: string,
      roleDefinitionName: string,
      parameters: RoleDefinitionCreateParameters,
      options?: RoleDefinitionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, scope, roleDefinitionName, parameters, options),
    get: (
      scope: string,
      roleDefinitionName: string,
      options?: RoleDefinitionsGetOptionalParams,
    ) => get(context, scope, roleDefinitionName, options),
    list: (scope: string, options?: RoleDefinitionsListOptionalParams) =>
      list(context, scope, options),
  };
}

export function getRoleDefinitionsOperations(
  context: KeyVaultContext,
): RoleDefinitionsOperations {
  return {
    ...getRoleDefinitions(context),
  };
}
