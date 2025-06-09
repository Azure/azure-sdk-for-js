// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPIContext } from "../../api/azureSiteRecoveryManagementServiceAPIContext.js";
import { DeploymentPreflightModel } from "../../models/models.js";
import { DeploymentPreflightPostOptionalParams } from "../../api/deploymentPreflight/options.js";
import { post } from "../../api/deploymentPreflight/operations.js";

/** Interface representing a DeploymentPreflight operations. */
export interface DeploymentPreflightOperations {
  /** Performs resource deployment preflight validation. */
  post: (
    resourceGroupName: string,
    deploymentId: string,
    options?: DeploymentPreflightPostOptionalParams,
  ) => Promise<DeploymentPreflightModel>;
}

function _getDeploymentPreflight(context: AzureSiteRecoveryManagementServiceAPIContext) {
  return {
    post: (
      resourceGroupName: string,
      deploymentId: string,
      options?: DeploymentPreflightPostOptionalParams,
    ) => post(context, resourceGroupName, deploymentId, options),
  };
}

export function _getDeploymentPreflightOperations(
  context: AzureSiteRecoveryManagementServiceAPIContext,
): DeploymentPreflightOperations {
  return {
    ..._getDeploymentPreflight(context),
  };
}
