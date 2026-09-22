// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listByService } from "../../api/outboundNetworkDependenciesEndpoints/operations.js";
import type { OutboundNetworkDependenciesEndpointsListByServiceOptionalParams } from "../../api/outboundNetworkDependenciesEndpoints/options.js";
import type { OutboundEnvironmentEndpointList } from "../../models/models.js";

/** Interface representing a OutboundNetworkDependenciesEndpoints operations. */
export interface OutboundNetworkDependenciesEndpointsOperations {
  /** Gets the network endpoints of all outbound dependencies of a ApiManagement service. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: OutboundNetworkDependenciesEndpointsListByServiceOptionalParams,
  ) => Promise<OutboundEnvironmentEndpointList>;
}

function _getOutboundNetworkDependenciesEndpoints(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: OutboundNetworkDependenciesEndpointsListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
  };
}

export function _getOutboundNetworkDependenciesEndpointsOperations(
  context: ApiManagementContext,
): OutboundNetworkDependenciesEndpointsOperations {
  return {
    ..._getOutboundNetworkDependenciesEndpoints(context),
  };
}
