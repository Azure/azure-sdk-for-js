// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import { getLatest } from "../../api/rollingUpgradeStatusInfos/operations.js";
import type { RollingUpgradeStatusInfosGetLatestOptionalParams } from "../../api/rollingUpgradeStatusInfos/options.js";
import type { RollingUpgradeStatusInfo } from "../../models/models.js";

/** Interface representing a RollingUpgradeStatusInfos operations. */
export interface RollingUpgradeStatusInfosOperations {
  /** Gets the status of the latest virtual machine scale set rolling upgrade. */
  getLatest: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: RollingUpgradeStatusInfosGetLatestOptionalParams,
  ) => Promise<RollingUpgradeStatusInfo>;
}

function _getRollingUpgradeStatusInfos(context: ComputeManagementContext) {
  return {
    getLatest: (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: RollingUpgradeStatusInfosGetLatestOptionalParams,
    ) => getLatest(context, resourceGroupName, vmScaleSetName, options),
  };
}

export function _getRollingUpgradeStatusInfosOperations(
  context: ComputeManagementContext,
): RollingUpgradeStatusInfosOperations {
  return {
    ..._getRollingUpgradeStatusInfos(context),
  };
}
