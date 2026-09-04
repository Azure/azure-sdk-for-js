// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceFleetContext } from "../../api/containerServiceFleetContext.js";
import { generateUpdateRun } from "../../api/autoUpgradeProfileOperations/operations.js";
import type { AutoUpgradeProfileOperationsGenerateUpdateRunOptionalParams } from "../../api/autoUpgradeProfileOperations/options.js";
import type { GenerateResponse } from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AutoUpgradeProfileOperations operations. */
export interface AutoUpgradeProfileOperationsOperations {
  /** Generates an update run for a given auto upgrade profile. */
  generateUpdateRun: (
    resourceGroupName: string,
    fleetName: string,
    autoUpgradeProfileName: string,
    options?: AutoUpgradeProfileOperationsGenerateUpdateRunOptionalParams,
  ) => PollerLike<OperationState<GenerateResponse>, GenerateResponse>;
}

function _getAutoUpgradeProfileOperations(context: ContainerServiceFleetContext) {
  return {
    generateUpdateRun: (
      resourceGroupName: string,
      fleetName: string,
      autoUpgradeProfileName: string,
      options?: AutoUpgradeProfileOperationsGenerateUpdateRunOptionalParams,
    ) => generateUpdateRun(context, resourceGroupName, fleetName, autoUpgradeProfileName, options),
  };
}

export function _getAutoUpgradeProfileOperationsOperations(
  context: ContainerServiceFleetContext,
): AutoUpgradeProfileOperationsOperations {
  return {
    ..._getAutoUpgradeProfileOperations(context),
  };
}
