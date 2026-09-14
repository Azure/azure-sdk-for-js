// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyContext } from "../../api/policyContext.js";
import {
  listForManagementGroup,
  deleteAtManagementGroup,
  createOrUpdateAtManagementGroup,
  getAtManagementGroup,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/variables/operations.js";
import type {
  VariablesListForManagementGroupOptionalParams,
  VariablesDeleteAtManagementGroupOptionalParams,
  VariablesCreateOrUpdateAtManagementGroupOptionalParams,
  VariablesGetAtManagementGroupOptionalParams,
  VariablesListOptionalParams,
  VariablesDeleteOptionalParams,
  VariablesCreateOrUpdateOptionalParams,
  VariablesGetOptionalParams,
} from "../../api/variables/options.js";
import type { Variable } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Variables operations. */
export interface VariablesOperations {
  /** This operation retrieves the list of all variables applicable to the management group. */
  listForManagementGroup: (
    managementGroupId: string,
    options?: VariablesListForManagementGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Variable>;
  /** This operation deletes a variable, given its name and the management group it was created in. The scope of a variable is the part of its ID preceding '/providers/Microsoft.Authorization/variables/{variableName}'. */
  deleteAtManagementGroup: (
    managementGroupId: string,
    variableName: string,
    options?: VariablesDeleteAtManagementGroupOptionalParams,
  ) => Promise<void>;
  /** This operation creates or updates a variable with the given  management group and name. Policy variables can only be used by a policy definition at the scope they are created or below. */
  createOrUpdateAtManagementGroup: (
    managementGroupId: string,
    variableName: string,
    parameters: Variable,
    options?: VariablesCreateOrUpdateAtManagementGroupOptionalParams,
  ) => Promise<Variable>;
  /** This operation retrieves a single variable, given its name and the  management group it was created at. */
  getAtManagementGroup: (
    managementGroupId: string,
    variableName: string,
    options?: VariablesGetAtManagementGroupOptionalParams,
  ) => Promise<Variable>;
  /** This operation retrieves the list of all variables associated with the given subscription. */
  list: (options?: VariablesListOptionalParams) => PagedAsyncIterableIterator<Variable>;
  /** This operation deletes a variable, given its name and the subscription it was created in. The scope of a variable is the part of its ID preceding '/providers/Microsoft.Authorization/variables/{variableName}'. */
  delete: (variableName: string, options?: VariablesDeleteOptionalParams) => Promise<void>;
  /** This operation creates or updates a variable with the given subscription and name. Policy variables can only be used by a policy definition at the scope they are created or below. */
  createOrUpdate: (
    variableName: string,
    parameters: Variable,
    options?: VariablesCreateOrUpdateOptionalParams,
  ) => Promise<Variable>;
  /** This operation retrieves a single variable, given its name and the subscription it was created at. */
  get: (variableName: string, options?: VariablesGetOptionalParams) => Promise<Variable>;
}

function _getVariables(context: PolicyContext) {
  return {
    listForManagementGroup: (
      managementGroupId: string,
      options?: VariablesListForManagementGroupOptionalParams,
    ) => listForManagementGroup(context, managementGroupId, options),
    deleteAtManagementGroup: (
      managementGroupId: string,
      variableName: string,
      options?: VariablesDeleteAtManagementGroupOptionalParams,
    ) => deleteAtManagementGroup(context, managementGroupId, variableName, options),
    createOrUpdateAtManagementGroup: (
      managementGroupId: string,
      variableName: string,
      parameters: Variable,
      options?: VariablesCreateOrUpdateAtManagementGroupOptionalParams,
    ) =>
      createOrUpdateAtManagementGroup(
        context,
        managementGroupId,
        variableName,
        parameters,
        options,
      ),
    getAtManagementGroup: (
      managementGroupId: string,
      variableName: string,
      options?: VariablesGetAtManagementGroupOptionalParams,
    ) => getAtManagementGroup(context, managementGroupId, variableName, options),
    list: (options?: VariablesListOptionalParams) => list(context, options),
    delete: (variableName: string, options?: VariablesDeleteOptionalParams) =>
      $delete(context, variableName, options),
    createOrUpdate: (
      variableName: string,
      parameters: Variable,
      options?: VariablesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, variableName, parameters, options),
    get: (variableName: string, options?: VariablesGetOptionalParams) =>
      get(context, variableName, options),
  };
}

export function _getVariablesOperations(context: PolicyContext): VariablesOperations {
  return {
    ..._getVariables(context),
  };
}
