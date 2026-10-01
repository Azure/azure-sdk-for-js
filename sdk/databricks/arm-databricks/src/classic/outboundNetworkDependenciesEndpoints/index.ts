// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureDatabricksManagementContext } from "../../api/azureDatabricksManagementContext.js";
import { list } from "../../api/outboundNetworkDependenciesEndpoints/operations.js";
import type { OutboundNetworkDependenciesEndpointsListOptionalParams } from "../../api/outboundNetworkDependenciesEndpoints/options.js";
import type { OutboundEnvironmentEndpoint } from "../../models/models.js";

/** Interface representing a OutboundNetworkDependenciesEndpoints operations. */
export interface OutboundNetworkDependenciesEndpointsOperations {
  /** Gets the list of endpoints that VNET Injected Workspace calls Azure Databricks Control Plane. You must configure outbound access with these endpoints. For more information, see https://docs.microsoft.com/en-us/azure/databricks/administration-guide/cloud-configurations/azure/udr */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: OutboundNetworkDependenciesEndpointsListOptionalParams,
  ) => Promise<OutboundEnvironmentEndpoint[]>;
}

function _getOutboundNetworkDependenciesEndpoints(context: AzureDatabricksManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: OutboundNetworkDependenciesEndpointsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
  };
}

export function _getOutboundNetworkDependenciesEndpointsOperations(
  context: AzureDatabricksManagementContext,
): OutboundNetworkDependenciesEndpointsOperations {
  return {
    ..._getOutboundNetworkDependenciesEndpoints(context),
  };
}
