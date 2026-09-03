// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementContext } from "../../api/operationalInsightsManagementContext.js";
import { $delete } from "../../api/gateways/operations.js";
import { GatewaysDeleteOptionalParams } from "../../api/gateways/options.js";

/** Interface representing a Gateways operations. */
export interface GatewaysOperations {
  /** Delete a Log Analytics gateway. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    gatewayId: string,
    options?: GatewaysDeleteOptionalParams,
  ) => Promise<void>;
}

function _getGateways(context: OperationalInsightsManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      gatewayId: string,
      options?: GatewaysDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, gatewayId, options),
  };
}

export function _getGatewaysOperations(
  context: OperationalInsightsManagementContext,
): GatewaysOperations {
  return {
    ..._getGateways(context),
  };
}
