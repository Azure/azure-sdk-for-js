// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { get } from "../../api/linkedWorkspace/operations.js";
import type { LinkedWorkspaceGetOptionalParams } from "../../api/linkedWorkspace/options.js";
import type { LinkedWorkspace } from "../../models/models.js";

/** Interface representing a LinkedWorkspace operations. */
export interface LinkedWorkspaceOperations {
  /** Retrieve the linked workspace for the account id. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: LinkedWorkspaceGetOptionalParams,
  ) => Promise<LinkedWorkspace>;
}

function _getLinkedWorkspace(context: AutomationContext) {
  return {
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: LinkedWorkspaceGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, options),
  };
}

export function _getLinkedWorkspaceOperations(
  context: AutomationContext,
): LinkedWorkspaceOperations {
  return {
    ..._getLinkedWorkspace(context),
  };
}
