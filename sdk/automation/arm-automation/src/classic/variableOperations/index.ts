// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/variableOperations/operations.js";
import type {
  VariableOperationsListByAutomationAccountOptionalParams,
  VariableOperationsDeleteOptionalParams,
  VariableOperationsUpdateOptionalParams,
  VariableOperationsCreateOrUpdateOptionalParams,
  VariableOperationsGetOptionalParams,
} from "../../api/variableOperations/options.js";
import type {
  Variable,
  VariableCreateOrUpdateParameters,
  VariableUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a VariableOperations operations. */
export interface VariableOperationsOperations {
  /** Retrieve a list of variables. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: VariableOperationsListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Variable>;
  /** Delete the variable. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    variableName: string,
    options?: VariableOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a variable. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    variableName: string,
    parameters: VariableUpdateParameters,
    options?: VariableOperationsUpdateOptionalParams,
  ) => Promise<Variable>;
  /** Create a variable. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    variableName: string,
    parameters: VariableCreateOrUpdateParameters,
    options?: VariableOperationsCreateOrUpdateOptionalParams,
  ) => Promise<Variable>;
  /** Retrieve the variable identified by variable name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    variableName: string,
    options?: VariableOperationsGetOptionalParams,
  ) => Promise<Variable>;
}

function _getVariableOperations(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: VariableOperationsListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      variableName: string,
      options?: VariableOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, variableName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      variableName: string,
      parameters: VariableUpdateParameters,
      options?: VariableOperationsUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, automationAccountName, variableName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      variableName: string,
      parameters: VariableCreateOrUpdateParameters,
      options?: VariableOperationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        automationAccountName,
        variableName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      variableName: string,
      options?: VariableOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, variableName, options),
  };
}

export function _getVariableOperationsOperations(
  context: AutomationContext,
): VariableOperationsOperations {
  return {
    ..._getVariableOperations(context),
  };
}
