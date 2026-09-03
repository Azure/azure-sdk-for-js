// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { listByAutomationAccount } from "../../api/dscNodeConfiguration/operations.js";
import type { DscNodeConfigurationListByAutomationAccountOptionalParams } from "../../api/dscNodeConfiguration/options.js";
import type { DscNodeConfiguration } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DscNodeConfiguration operations. */
export interface DscNodeConfigurationOperations {
  /** Retrieve a list of dsc node configurations. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: DscNodeConfigurationListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<DscNodeConfiguration>;
}

function _getDscNodeConfiguration(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: DscNodeConfigurationListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
  };
}

export function _getDscNodeConfigurationOperations(
  context: AutomationContext,
): DscNodeConfigurationOperations {
  return {
    ..._getDscNodeConfiguration(context),
  };
}
