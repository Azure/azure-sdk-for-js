// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetContext } from "../../api/containerServiceFleetContext.js";
import { GenerateResponse } from "../../models/models.js";
import { AutoUpgradeProfileOperationsGenerateUpdateRunOptionalParams } from "../../api/autoUpgradeProfileOperations/options.js";
import { generateUpdateRun } from "../../api/autoUpgradeProfileOperations/operations.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AutoUpgradeProfileOperations operations. */
export interface AutoUpgradeProfileOperationsOperations {
  /** A long-running resource action. */
  generateUpdateRun: (
    resourceGroupName: string,
    fleetName: string,
    autoUpgradeProfileName: string,
    options?: AutoUpgradeProfileOperationsGenerateUpdateRunOptionalParams,
  ) => PollerLike<OperationState<GenerateResponse>, GenerateResponse>;
}

function _getAutoUpgradeProfileOperations(
  context: ContainerServiceFleetContext,
) {
  return {
    generateUpdateRun: (
      resourceGroupName: string,
      fleetName: string,
      autoUpgradeProfileName: string,
      options?: AutoUpgradeProfileOperationsGenerateUpdateRunOptionalParams,
    ) =>
      generateUpdateRun(
        context,
        resourceGroupName,
        fleetName,
        autoUpgradeProfileName,
        options,
      ),
  };
}

export function _getAutoUpgradeProfileOperationsOperations(
  context: ContainerServiceFleetContext,
): AutoUpgradeProfileOperationsOperations {
  return {
    ..._getAutoUpgradeProfileOperations(context),
  };
}
