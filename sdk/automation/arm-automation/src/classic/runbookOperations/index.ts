// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/runbookOperations/operations.js";
import type {
  RunbookOperationsListByAutomationAccountOptionalParams,
  RunbookOperationsDeleteOptionalParams,
  RunbookOperationsUpdateOptionalParams,
  RunbookOperationsCreateOrUpdateOptionalParams,
  RunbookOperationsGetOptionalParams,
} from "../../api/runbookOperations/options.js";
import type {
  Runbook,
  RunbookCreateOrUpdateParameters,
  RunbookUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RunbookOperations operations. */
export interface RunbookOperationsOperations {
  /** Retrieve a list of runbooks. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: RunbookOperationsListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Runbook>;
  /** Delete the runbook by name. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    options?: RunbookOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the runbook identified by runbook name. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    parameters: RunbookUpdateParameters,
    options?: RunbookOperationsUpdateOptionalParams,
  ) => Promise<Runbook>;
  /** Create the runbook identified by runbook name. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    parameters: RunbookCreateOrUpdateParameters,
    options?: RunbookOperationsCreateOrUpdateOptionalParams,
  ) => Promise<Runbook>;
  /** Retrieve the runbook identified by runbook name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    options?: RunbookOperationsGetOptionalParams,
  ) => Promise<Runbook>;
}

function _getRunbookOperations(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: RunbookOperationsListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      options?: RunbookOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, runbookName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      parameters: RunbookUpdateParameters,
      options?: RunbookOperationsUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, automationAccountName, runbookName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      parameters: RunbookCreateOrUpdateParameters,
      options?: RunbookOperationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        automationAccountName,
        runbookName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      options?: RunbookOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, runbookName, options),
  };
}

export function _getRunbookOperationsOperations(
  context: AutomationContext,
): RunbookOperationsOperations {
  return {
    ..._getRunbookOperations(context),
  };
}
