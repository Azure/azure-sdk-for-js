// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventHubManagementContext } from "../../api/eventHubManagementContext.js";
import { list } from "../../api/networkSecurityPerimeterConfiguration/operations.js";
import type { NetworkSecurityPerimeterConfigurationListOptionalParams } from "../../api/networkSecurityPerimeterConfiguration/options.js";
import type { NetworkSecurityPerimeterConfigurationList } from "../../models/models.js";

/** Interface representing a NetworkSecurityPerimeterConfiguration operations. */
export interface NetworkSecurityPerimeterConfigurationOperations {
  /** Gets list of current NetworkSecurityPerimeterConfiguration for Namespace */
  list: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NetworkSecurityPerimeterConfigurationListOptionalParams,
  ) => Promise<NetworkSecurityPerimeterConfigurationList>;
}

function _getNetworkSecurityPerimeterConfiguration(context: EventHubManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      namespaceName: string,
      options?: NetworkSecurityPerimeterConfigurationListOptionalParams,
    ) => list(context, resourceGroupName, namespaceName, options),
  };
}

export function _getNetworkSecurityPerimeterConfigurationOperations(
  context: EventHubManagementContext,
): NetworkSecurityPerimeterConfigurationOperations {
  return {
    ..._getNetworkSecurityPerimeterConfiguration(context),
  };
}
