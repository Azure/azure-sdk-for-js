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
} from "../../api/variableValues/operations.js";
import type {
  VariableValuesListForManagementGroupOptionalParams,
  VariableValuesDeleteAtManagementGroupOptionalParams,
  VariableValuesCreateOrUpdateAtManagementGroupOptionalParams,
  VariableValuesGetAtManagementGroupOptionalParams,
  VariableValuesListOptionalParams,
  VariableValuesDeleteOptionalParams,
  VariableValuesCreateOrUpdateOptionalParams,
  VariableValuesGetOptionalParams,
} from "../../api/variableValues/options.js";
import type { VariableValue } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a VariableValues operations. */
export interface VariableValuesOperations {
  /** This operation retrieves the list of all variable values applicable the variable indicated at the management group scope. */
  listForManagementGroup: (
    managementGroupId: string,
    variableName: string,
    options?: VariableValuesListForManagementGroupOptionalParams,
  ) => PagedAsyncIterableIterator<VariableValue>;
  /** This operation deletes a variable value, given its name, the management group it was created in, and the variable it belongs to. The scope of a variable value is the part of its ID preceding '/providers/Microsoft.Authorization/variables/{variableName}'. */
  deleteAtManagementGroup: (
    managementGroupId: string,
    variableName: string,
    variableValueName: string,
    options?: VariableValuesDeleteAtManagementGroupOptionalParams,
  ) => Promise<void>;
  /** This operation creates or updates a variable value with the given management group and name for a given variable. Variable values are scoped to the variable for which they are created for. */
  createOrUpdateAtManagementGroup: (
    managementGroupId: string,
    variableName: string,
    variableValueName: string,
    parameters: VariableValue,
    options?: VariableValuesCreateOrUpdateAtManagementGroupOptionalParams,
  ) => Promise<VariableValue>;
  /** This operation retrieves a single variable value; given its name,  management group it was created at and the variable it's created for. */
  getAtManagementGroup: (
    managementGroupId: string,
    variableName: string,
    variableValueName: string,
    options?: VariableValuesGetAtManagementGroupOptionalParams,
  ) => Promise<VariableValue>;
  /** This operation retrieves the list of all variable values associated with the given variable that is at a subscription level. */
  list: (
    variableName: string,
    options?: VariableValuesListOptionalParams,
  ) => PagedAsyncIterableIterator<VariableValue>;
  /** This operation deletes a variable value, given its name, the subscription it was created in, and the variable it belongs to. The scope of a variable value is the part of its ID preceding '/providers/Microsoft.Authorization/variables/{variableName}'. */
  delete: (
    variableName: string,
    variableValueName: string,
    options?: VariableValuesDeleteOptionalParams,
  ) => Promise<void>;
  /** This operation creates or updates a variable value with the given subscription and name for a given variable. Variable values are scoped to the variable for which they are created for. */
  createOrUpdate: (
    variableName: string,
    variableValueName: string,
    parameters: VariableValue,
    options?: VariableValuesCreateOrUpdateOptionalParams,
  ) => Promise<VariableValue>;
  /** This operation retrieves a single variable value; given its name, subscription it was created at and the variable it's created for. */
  get: (
    variableName: string,
    variableValueName: string,
    options?: VariableValuesGetOptionalParams,
  ) => Promise<VariableValue>;
}

function _getVariableValues(context: PolicyContext) {
  return {
    listForManagementGroup: (
      managementGroupId: string,
      variableName: string,
      options?: VariableValuesListForManagementGroupOptionalParams,
    ) => listForManagementGroup(context, managementGroupId, variableName, options),
    deleteAtManagementGroup: (
      managementGroupId: string,
      variableName: string,
      variableValueName: string,
      options?: VariableValuesDeleteAtManagementGroupOptionalParams,
    ) =>
      deleteAtManagementGroup(context, managementGroupId, variableName, variableValueName, options),
    createOrUpdateAtManagementGroup: (
      managementGroupId: string,
      variableName: string,
      variableValueName: string,
      parameters: VariableValue,
      options?: VariableValuesCreateOrUpdateAtManagementGroupOptionalParams,
    ) =>
      createOrUpdateAtManagementGroup(
        context,
        managementGroupId,
        variableName,
        variableValueName,
        parameters,
        options,
      ),
    getAtManagementGroup: (
      managementGroupId: string,
      variableName: string,
      variableValueName: string,
      options?: VariableValuesGetAtManagementGroupOptionalParams,
    ) => getAtManagementGroup(context, managementGroupId, variableName, variableValueName, options),
    list: (variableName: string, options?: VariableValuesListOptionalParams) =>
      list(context, variableName, options),
    delete: (
      variableName: string,
      variableValueName: string,
      options?: VariableValuesDeleteOptionalParams,
    ) => $delete(context, variableName, variableValueName, options),
    createOrUpdate: (
      variableName: string,
      variableValueName: string,
      parameters: VariableValue,
      options?: VariableValuesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, variableName, variableValueName, parameters, options),
    get: (
      variableName: string,
      variableValueName: string,
      options?: VariableValuesGetOptionalParams,
    ) => get(context, variableName, variableValueName, options),
  };
}

export function _getVariableValuesOperations(context: PolicyContext): VariableValuesOperations {
  return {
    ..._getVariableValues(context),
  };
}
