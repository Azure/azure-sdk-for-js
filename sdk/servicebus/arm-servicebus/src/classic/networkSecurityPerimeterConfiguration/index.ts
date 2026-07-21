// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceBusManagementContext } from "../../api/serviceBusManagementContext.js";
import { list } from "../../api/networkSecurityPerimeterConfiguration/operations.js";
import type { NetworkSecurityPerimeterConfigurationListOptionalParams } from "../../api/networkSecurityPerimeterConfiguration/options.js";
import type { NetworkSecurityPerimeterConfiguration } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a NetworkSecurityPerimeterConfiguration operations. */
export interface NetworkSecurityPerimeterConfigurationOperations {
  /** Gets list of current NetworkSecurityPerimeterConfiguration for Namespace */
  list: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NetworkSecurityPerimeterConfigurationListOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration>;
}

function _getNetworkSecurityPerimeterConfiguration(context: ServiceBusManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      namespaceName: string,
      options?: NetworkSecurityPerimeterConfigurationListOptionalParams,
    ) => list(context, resourceGroupName, namespaceName, options),
  };
}

export function _getNetworkSecurityPerimeterConfigurationOperations(
  context: ServiceBusManagementContext,
): NetworkSecurityPerimeterConfigurationOperations {
  return {
    ..._getNetworkSecurityPerimeterConfiguration(context),
  };
}
