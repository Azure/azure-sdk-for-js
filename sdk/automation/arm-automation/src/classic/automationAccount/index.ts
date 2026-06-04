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
} from "../../api/automationAccount/operations.js";
import type {
  AutomationAccountListDeletedRunbooksOptionalParams,
  AutomationAccountListOptionalParams,
  AutomationAccountListByResourceGroupOptionalParams,
  AutomationAccountDeleteOptionalParams,
  AutomationAccountUpdateOptionalParams,
  AutomationAccountCreateOrUpdateOptionalParams,
  AutomationAccountGetOptionalParams,
} from "../../api/automationAccount/options.js";
import type {
  AutomationAccount,
  AutomationAccountCreateOrUpdateParameters,
  AutomationAccountUpdateParameters,
  DeletedRunbook,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AutomationAccount operations. */
export interface AutomationAccountOperations {
  /** Retrieve the deleted runbooks for an automation account. */
  listDeletedRunbooks: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: AutomationAccountListDeletedRunbooksOptionalParams,
  ) => PagedAsyncIterableIterator<DeletedRunbook>;
  /** Retrieve a list of accounts within a given subscription. */
  list: (
    options?: AutomationAccountListOptionalParams,
  ) => PagedAsyncIterableIterator<AutomationAccount>;
  /** Retrieve a list of accounts within a given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AutomationAccountListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AutomationAccount>;
  /** Delete an automation account. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: AutomationAccountDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an automation account. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    parameters: AutomationAccountUpdateParameters,
    options?: AutomationAccountUpdateOptionalParams,
  ) => Promise<AutomationAccount>;
  /** Create or update automation account. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    parameters: AutomationAccountCreateOrUpdateParameters,
    options?: AutomationAccountCreateOrUpdateOptionalParams,
  ) => Promise<AutomationAccount>;
  /** Get information about an Automation Account. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: AutomationAccountGetOptionalParams,
  ) => Promise<AutomationAccount>;
}

function _getAutomationAccount(context: AutomationContext) {
  return {
    listDeletedRunbooks: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: AutomationAccountListDeletedRunbooksOptionalParams,
    ) => listDeletedRunbooks(context, resourceGroupName, automationAccountName, options),
    list: (options?: AutomationAccountListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AutomationAccountListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: AutomationAccountDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      parameters: AutomationAccountUpdateParameters,
      options?: AutomationAccountUpdateOptionalParams,
    ) => update(context, resourceGroupName, automationAccountName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      parameters: AutomationAccountCreateOrUpdateParameters,
      options?: AutomationAccountCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, automationAccountName, parameters, options),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: AutomationAccountGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, options),
  };
}

export function _getAutomationAccountOperations(
  context: AutomationContext,
): AutomationAccountOperations {
  return {
    ..._getAutomationAccount(context),
  };
}
