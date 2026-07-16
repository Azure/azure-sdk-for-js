// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { listBySubscription } from "../../api/deletedAutomationAccounts/operations.js";
import type { DeletedAutomationAccountsListBySubscriptionOptionalParams } from "../../api/deletedAutomationAccounts/options.js";
import type { DeletedAutomationAccountListResult } from "../../models/models.js";

/** Interface representing a DeletedAutomationAccounts operations. */
export interface DeletedAutomationAccountsOperations {
  /** Retrieve deleted automation account. */
  listBySubscription: (
    options?: DeletedAutomationAccountsListBySubscriptionOptionalParams,
  ) => Promise<DeletedAutomationAccountListResult>;
}

function _getDeletedAutomationAccounts(context: AutomationContext) {
  return {
    listBySubscription: (options?: DeletedAutomationAccountsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
  };
}

export function _getDeletedAutomationAccountsOperations(
  context: AutomationContext,
): DeletedAutomationAccountsOperations {
  return {
    ..._getDeletedAutomationAccounts(context),
  };
}
