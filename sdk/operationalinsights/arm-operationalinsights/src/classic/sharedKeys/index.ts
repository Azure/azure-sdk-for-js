// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementContext } from "../../api/operationalInsightsManagementContext.js";
import { regenerate, getSharedKeys } from "../../api/sharedKeys/operations.js";
import {
  SharedKeysRegenerateOptionalParams,
  SharedKeysGetSharedKeysOptionalParams,
} from "../../api/sharedKeys/options.js";
import { SharedKeys } from "../../models/models.js";

/** Interface representing a SharedKeys operations. */
export interface SharedKeysOperations {
  /** Regenerates the shared keys for a Log Analytics Workspace. These keys are used to connect Microsoft Operational Insights agents to the workspace. */
  regenerate: (
    resourceGroupName: string,
    workspaceName: string,
    options?: SharedKeysRegenerateOptionalParams,
  ) => Promise<SharedKeys>;
  /** Gets the shared keys for a workspace. */
  getSharedKeys: (
    resourceGroupName: string,
    workspaceName: string,
    options?: SharedKeysGetSharedKeysOptionalParams,
  ) => Promise<SharedKeys>;
}

function _getSharedKeys(context: OperationalInsightsManagementContext) {
  return {
    regenerate: (
      resourceGroupName: string,
      workspaceName: string,
      options?: SharedKeysRegenerateOptionalParams,
    ) => regenerate(context, resourceGroupName, workspaceName, options),
    getSharedKeys: (
      resourceGroupName: string,
      workspaceName: string,
      options?: SharedKeysGetSharedKeysOptionalParams,
    ) => getSharedKeys(context, resourceGroupName, workspaceName, options),
  };
}

export function _getSharedKeysOperations(
  context: OperationalInsightsManagementContext,
): SharedKeysOperations {
  return {
    ..._getSharedKeys(context),
  };
}
