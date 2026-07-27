// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceBusManagementContext } from "../../api/serviceBusManagementContext.js";
import {
  reconcile,
  getResourceAssociationName,
} from "../../api/networkSecurityPerimeterConfigurations/operations.js";
import type {
  NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  NetworkSecurityPerimeterConfigurationsGetResourceAssociationNameOptionalParams,
} from "../../api/networkSecurityPerimeterConfigurations/options.js";
import type { NetworkSecurityPerimeterConfiguration } from "../../models/models.js";

/** Interface representing a NetworkSecurityPerimeterConfigurations operations. */
export interface NetworkSecurityPerimeterConfigurationsOperations {
  /** Refreshes any information about the association. */
  reconcile: (
    resourceGroupName: string,
    namespaceName: string,
    resourceAssociationName: string,
    options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  ) => Promise<void>;
  /** Return a NetworkSecurityPerimeterConfigurations resourceAssociationName */
  getResourceAssociationName: (
    resourceGroupName: string,
    namespaceName: string,
    resourceAssociationName: string,
    options?: NetworkSecurityPerimeterConfigurationsGetResourceAssociationNameOptionalParams,
  ) => Promise<NetworkSecurityPerimeterConfiguration>;
}

function _getNetworkSecurityPerimeterConfigurations(context: ServiceBusManagementContext) {
  return {
    reconcile: (
      resourceGroupName: string,
      namespaceName: string,
      resourceAssociationName: string,
      options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
    ) => reconcile(context, resourceGroupName, namespaceName, resourceAssociationName, options),
    getResourceAssociationName: (
      resourceGroupName: string,
      namespaceName: string,
      resourceAssociationName: string,
      options?: NetworkSecurityPerimeterConfigurationsGetResourceAssociationNameOptionalParams,
    ) =>
      getResourceAssociationName(
        context,
        resourceGroupName,
        namespaceName,
        resourceAssociationName,
        options,
      ),
  };
}

export function _getNetworkSecurityPerimeterConfigurationsOperations(
  context: ServiceBusManagementContext,
): NetworkSecurityPerimeterConfigurationsOperations {
  return {
    ..._getNetworkSecurityPerimeterConfigurations(context),
  };
}
