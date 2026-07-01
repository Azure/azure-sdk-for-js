// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { listByAutomationAccount } from "../../api/keys/operations.js";
import type { KeysListByAutomationAccountOptionalParams } from "../../api/keys/options.js";
import type { KeyListResult } from "../../models/models.js";

/** Interface representing a Keys operations. */
export interface KeysOperations {
  /** Retrieve the automation keys for an account. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: KeysListByAutomationAccountOptionalParams,
  ) => Promise<KeyListResult>;
}

function _getKeys(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: KeysListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
  };
}

export function _getKeysOperations(context: AutomationContext): KeysOperations {
  return {
    ..._getKeys(context),
  };
}
