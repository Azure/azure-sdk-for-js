// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listDeletedRunbooks,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/automationAccountOperations/operations.js";
import type {
  AutomationAccountOperationsListDeletedRunbooksOptionalParams,
  AutomationAccountOperationsListOptionalParams,
  AutomationAccountOperationsListByResourceGroupOptionalParams,
  AutomationAccountOperationsDeleteOptionalParams,
  AutomationAccountOperationsUpdateOptionalParams,
  AutomationAccountOperationsCreateOrUpdateOptionalParams,
  AutomationAccountOperationsGetOptionalParams,
} from "../../api/automationAccountOperations/options.js";
import type {
  AutomationAccount,
  AutomationAccountCreateOrUpdateParameters,
  AutomationAccountUpdateParameters,
  DeletedRunbook,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AutomationAccountOperations operations. */
export interface AutomationAccountOperationsOperations {
  /** Retrieve the deleted runbooks for an automation account. */
  listDeletedRunbooks: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: AutomationAccountOperationsListDeletedRunbooksOptionalParams,
  ) => PagedAsyncIterableIterator<DeletedRunbook>;
  /** Retrieve a list of accounts within a given subscription. */
  list: (
    options?: AutomationAccountOperationsListOptionalParams,
  ) => PagedAsyncIterableIterator<AutomationAccount>;
  /** Retrieve a list of accounts within a given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AutomationAccountOperationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AutomationAccount>;
  /** Delete an automation account. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: AutomationAccountOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an automation account. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    parameters: AutomationAccountUpdateParameters,
    options?: AutomationAccountOperationsUpdateOptionalParams,
  ) => Promise<AutomationAccount>;
  /** Create or update automation account. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    parameters: AutomationAccountCreateOrUpdateParameters,
    options?: AutomationAccountOperationsCreateOrUpdateOptionalParams,
  ) => Promise<AutomationAccount>;
  /** Get information about an Automation Account. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: AutomationAccountOperationsGetOptionalParams,
  ) => Promise<AutomationAccount>;
}

function _getAutomationAccountOperations(context: AutomationContext) {
  return {
    listDeletedRunbooks: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: AutomationAccountOperationsListDeletedRunbooksOptionalParams,
    ) => listDeletedRunbooks(context, resourceGroupName, automationAccountName, options),
    list: (options?: AutomationAccountOperationsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AutomationAccountOperationsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: AutomationAccountOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      parameters: AutomationAccountUpdateParameters,
      options?: AutomationAccountOperationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, automationAccountName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      parameters: AutomationAccountCreateOrUpdateParameters,
      options?: AutomationAccountOperationsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, automationAccountName, parameters, options),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: AutomationAccountOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, options),
  };
}

export function _getAutomationAccountOperationsOperations(
  context: AutomationContext,
): AutomationAccountOperationsOperations {
  return {
    ..._getAutomationAccountOperations(context),
  };
}
