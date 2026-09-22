// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { list } from "../../api/deploymentInfo/operations.js";
import type { DeploymentInfoListOptionalParams } from "../../api/deploymentInfo/options.js";
import type { DeploymentInfoResponse } from "../../models/models.js";

/** Interface representing a DeploymentInfo operations. */
export interface DeploymentInfoOperations {
  /** Fetch detailed information about Elastic cloud deployments corresponding to the Elastic monitor resource. */
  list: (
    resourceGroupName: string,
    monitorName: string,
    options?: DeploymentInfoListOptionalParams,
  ) => Promise<DeploymentInfoResponse>;
}

function _getDeploymentInfo(context: MicrosoftElasticContext) {
  return {
    list: (
      resourceGroupName: string,
      monitorName: string,
      options?: DeploymentInfoListOptionalParams,
    ) => list(context, resourceGroupName, monitorName, options),
  };
}

export function _getDeploymentInfoOperations(
  context: MicrosoftElasticContext,
): DeploymentInfoOperations {
  return {
    ..._getDeploymentInfo(context),
  };
}
