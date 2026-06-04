// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/variable/operations.js";
import type {
  VariableListByAutomationAccountOptionalParams,
  VariableDeleteOptionalParams,
  VariableUpdateOptionalParams,
  VariableCreateOrUpdateOptionalParams,
  VariableGetOptionalParams,
} from "../../api/variable/options.js";
import type {
  Variable,
  VariableCreateOrUpdateParameters,
  VariableUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Variable operations. */
export interface VariableOperations {
  /** Retrieve a list of variables. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: VariableListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Variable>;
  /** Delete the variable. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    variableName: string,
    options?: VariableDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a variable. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    variableName: string,
    parameters: VariableUpdateParameters,
    options?: VariableUpdateOptionalParams,
  ) => Promise<Variable>;
  /** Create a variable. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    variableName: string,
    parameters: VariableCreateOrUpdateParameters,
    options?: VariableCreateOrUpdateOptionalParams,
  ) => Promise<Variable>;
  /** Retrieve the variable identified by variable name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    variableName: string,
    options?: VariableGetOptionalParams,
  ) => Promise<Variable>;
}

function _getVariable(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: VariableListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      variableName: string,
      options?: VariableDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, variableName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      variableName: string,
      parameters: VariableUpdateParameters,
      options?: VariableUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, automationAccountName, variableName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      variableName: string,
      parameters: VariableCreateOrUpdateParameters,
      options?: VariableCreateOrUpdateOptionalParams,
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
      options?: VariableGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, variableName, options),
  };
}

export function _getVariableOperations(context: AutomationContext): VariableOperations {
  return {
    ..._getVariable(context),
  };
}
