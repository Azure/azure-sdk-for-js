// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementContext } from "../../api/operationalInsightsManagementContext.js";
import { listByWorkspace } from "../../api/availableServiceTiers/operations.js";
import { AvailableServiceTiersListByWorkspaceOptionalParams } from "../../api/availableServiceTiers/options.js";
import { AvailableServiceTier } from "../../models/models.js";

/** Interface representing a AvailableServiceTiers operations. */
export interface AvailableServiceTiersOperations {
  /** Gets the available service tiers for the workspace. */
  listByWorkspace: (
    resourceGroupName: string,
    workspaceName: string,
    options?: AvailableServiceTiersListByWorkspaceOptionalParams,
  ) => Promise<AvailableServiceTier[]>;
}

function _getAvailableServiceTiers(context: OperationalInsightsManagementContext) {
  return {
    listByWorkspace: (
      resourceGroupName: string,
      workspaceName: string,
      options?: AvailableServiceTiersListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, workspaceName, options),
  };
}

export function _getAvailableServiceTiersOperations(
  context: OperationalInsightsManagementContext,
): AvailableServiceTiersOperations {
  return {
    ..._getAvailableServiceTiers(context),
  };
}
