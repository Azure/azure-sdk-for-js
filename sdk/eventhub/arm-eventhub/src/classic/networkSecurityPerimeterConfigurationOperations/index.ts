// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementContext } from "../../api/eventHubManagementContext.js";
import { list } from "../../api/networkSecurityPerimeterConfigurationOperations/operations.js";
import { NetworkSecurityPerimeterConfigurationOperationsListOptionalParams } from "../../api/networkSecurityPerimeterConfigurationOperations/options.js";
import { NetworkSecurityPerimeterConfigurationList } from "../../models/models.js";

/** Interface representing a NetworkSecurityPerimeterConfigurationOperations operations. */
export interface NetworkSecurityPerimeterConfigurationOperationsOperations {
  /** Gets list of current NetworkSecurityPerimeterConfiguration for Namespace */
  list: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NetworkSecurityPerimeterConfigurationOperationsListOptionalParams,
  ) => Promise<NetworkSecurityPerimeterConfigurationList>;
}

function _getNetworkSecurityPerimeterConfigurationOperations(context: EventHubManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      namespaceName: string,
      options?: NetworkSecurityPerimeterConfigurationOperationsListOptionalParams,
    ) => list(context, resourceGroupName, namespaceName, options),
  };
}

export function _getNetworkSecurityPerimeterConfigurationOperationsOperations(
  context: EventHubManagementContext,
): NetworkSecurityPerimeterConfigurationOperationsOperations {
  return {
    ..._getNetworkSecurityPerimeterConfigurationOperations(context),
  };
}
