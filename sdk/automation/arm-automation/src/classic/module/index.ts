// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/module/operations.js";
import type {
  ModuleListByAutomationAccountOptionalParams,
  ModuleDeleteOptionalParams,
  ModuleUpdateOptionalParams,
  ModuleCreateOrUpdateOptionalParams,
  ModuleGetOptionalParams,
} from "../../api/module/options.js";
import type {
  Module,
  ModuleCreateOrUpdateParameters,
  ModuleUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Module operations. */
export interface ModuleOperations {
  /** Retrieve a list of modules. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: ModuleListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Module>;
  /** Delete the module by name. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    moduleName: string,
    options?: ModuleDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the module identified by module name. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    moduleName: string,
    parameters: ModuleUpdateParameters,
    options?: ModuleUpdateOptionalParams,
  ) => Promise<Module>;
  /** Create or Update the module identified by module name. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    moduleName: string,
    parameters: ModuleCreateOrUpdateParameters,
    options?: ModuleCreateOrUpdateOptionalParams,
  ) => Promise<Module>;
  /** Retrieve the module identified by module name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    moduleName: string,
    options?: ModuleGetOptionalParams,
  ) => Promise<Module>;
}

function _getModule(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: ModuleListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      moduleName: string,
      options?: ModuleDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, moduleName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      moduleName: string,
      parameters: ModuleUpdateParameters,
      options?: ModuleUpdateOptionalParams,
    ) => update(context, resourceGroupName, automationAccountName, moduleName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      moduleName: string,
      parameters: ModuleCreateOrUpdateParameters,
      options?: ModuleCreateOrUpdateOptionalParams,
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
      options?: ModuleGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, moduleName, options),
  };
}

export function _getModuleOperations(context: AutomationContext): ModuleOperations {
  return {
    ..._getModule(context),
  };
}
