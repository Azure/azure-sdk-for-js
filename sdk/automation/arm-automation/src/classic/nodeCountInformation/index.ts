// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { get } from "../../api/nodeCountInformation/operations.js";
import type { NodeCountInformationGetOptionalParams } from "../../api/nodeCountInformation/options.js";
import type { NodeCounts, CountType } from "../../models/models.js";

/** Interface representing a NodeCountInformation operations. */
export interface NodeCountInformationOperations {
  /** Retrieve counts for Dsc Nodes. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    countType: CountType,
    options?: NodeCountInformationGetOptionalParams,
  ) => Promise<NodeCounts>;
}

function _getNodeCountInformation(context: AutomationContext) {
  return {
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      countType: CountType,
      options?: NodeCountInformationGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, countType, options),
  };
}

export function _getNodeCountInformationOperations(
  context: AutomationContext,
): NodeCountInformationOperations {
  return {
    ..._getNodeCountInformation(context),
  };
}
