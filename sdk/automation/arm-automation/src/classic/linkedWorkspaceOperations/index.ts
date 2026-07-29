// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { get } from "../../api/linkedWorkspaceOperations/operations.js";
import type { LinkedWorkspaceOperationsGetOptionalParams } from "../../api/linkedWorkspaceOperations/options.js";
import type { LinkedWorkspace } from "../../models/models.js";

/** Interface representing a LinkedWorkspaceOperations operations. */
export interface LinkedWorkspaceOperationsOperations {
  /** Retrieve the linked workspace for the account id. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: LinkedWorkspaceOperationsGetOptionalParams,
  ) => Promise<LinkedWorkspace>;
}

function _getLinkedWorkspaceOperations(context: AutomationContext) {
  return {
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: LinkedWorkspaceOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, options),
  };
}

export function _getLinkedWorkspaceOperationsOperations(
  context: AutomationContext,
): LinkedWorkspaceOperationsOperations {
  return {
    ..._getLinkedWorkspaceOperations(context),
  };
}
