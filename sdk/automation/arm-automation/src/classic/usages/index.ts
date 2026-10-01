// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { listByAutomationAccount } from "../../api/usages/operations.js";
import type { UsagesListByAutomationAccountOptionalParams } from "../../api/usages/options.js";
import type { Usage } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Usages operations. */
export interface UsagesOperations {
  /** Retrieve the usage for the account id. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: UsagesListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Usage>;
}

function _getUsages(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: UsagesListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
  };
}

export function _getUsagesOperations(context: AutomationContext): UsagesOperations {
  return {
    ..._getUsages(context),
  };
}
