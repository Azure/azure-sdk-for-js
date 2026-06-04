// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { listByAutomationAccount } from "../../api/statistics/operations.js";
import type { StatisticsListByAutomationAccountOptionalParams } from "../../api/statistics/options.js";
import type { Statistics } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Statistics operations. */
export interface StatisticsOperations {
  /** Retrieve the statistics for the account. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: StatisticsListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Statistics>;
}

function _getStatistics(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: StatisticsListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
  };
}

export function _getStatisticsOperations(context: AutomationContext): StatisticsOperations {
  return {
    ..._getStatistics(context),
  };
}
