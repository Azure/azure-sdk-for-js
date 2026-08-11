// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/moduleOperations/operations.js";
import type {
  ModuleOperationsListByAutomationAccountOptionalParams,
  ModuleOperationsDeleteOptionalParams,
  ModuleOperationsUpdateOptionalParams,
  ModuleOperationsCreateOrUpdateOptionalParams,
  ModuleOperationsGetOptionalParams,
} from "../../api/moduleOperations/options.js";
import type {
  Module,
  ModuleCreateOrUpdateParameters,
  ModuleUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ModuleOperations operations. */
export interface ModuleOperationsOperations {
  /** Retrieve a list of modules. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: ModuleOperationsListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Module>;
  /** Delete the module by name. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    moduleName: string,
    options?: ModuleOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the module identified by module name. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    moduleName: string,
    parameters: ModuleUpdateParameters,
    options?: ModuleOperationsUpdateOptionalParams,
  ) => Promise<Module>;
  /** Create or Update the module identified by module name. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    moduleName: string,
    parameters: ModuleCreateOrUpdateParameters,
    options?: ModuleOperationsCreateOrUpdateOptionalParams,
  ) => Promise<Module>;
  /** Retrieve the module identified by module name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    moduleName: string,
    options?: ModuleOperationsGetOptionalParams,
  ) => Promise<Module>;
}

function _getModuleOperations(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: ModuleOperationsListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      moduleName: string,
      options?: ModuleOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, moduleName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      moduleName: string,
      parameters: ModuleUpdateParameters,
      options?: ModuleOperationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, automationAccountName, moduleName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      moduleName: string,
      parameters: ModuleCreateOrUpdateParameters,
      options?: ModuleOperationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        automationAccountName,
        moduleName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      moduleName: string,
      options?: ModuleOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, moduleName, options),
  };
}

export function _getModuleOperationsOperations(
  context: AutomationContext,
): ModuleOperationsOperations {
  return {
    ..._getModuleOperations(context),
  };
}
