// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { listByAutomationAccount } from "../../api/statisticsOperations/operations.js";
import type { StatisticsOperationsListByAutomationAccountOptionalParams } from "../../api/statisticsOperations/options.js";
import type { Statistics } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a StatisticsOperations operations. */
export interface StatisticsOperationsOperations {
  /** Retrieve the statistics for the account. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: StatisticsOperationsListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Statistics>;
}

function _getStatisticsOperations(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: StatisticsOperationsListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
  };
}

export function _getStatisticsOperationsOperations(
  context: AutomationContext,
): StatisticsOperationsOperations {
  return {
    ..._getStatisticsOperations(context),
  };
}
