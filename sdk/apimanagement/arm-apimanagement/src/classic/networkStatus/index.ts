// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listByLocation, listByService } from "../../api/networkStatus/operations.js";
import type {
  NetworkStatusListByLocationOptionalParams,
  NetworkStatusListByServiceOptionalParams,
} from "../../api/networkStatus/options.js";
import type {
  NetworkStatusContract,
  NetworkStatusListByServiceResponse,
} from "../../models/models.js";

/** Interface representing a NetworkStatus operations. */
export interface NetworkStatusOperations {
  /** Gets the Connectivity Status to the external resources on which the Api Management service depends from inside the Cloud Service. This also returns the DNS Servers as visible to the CloudService. */
  listByLocation: (
    resourceGroupName: string,
    serviceName: string,
    locationName: string,
    options?: NetworkStatusListByLocationOptionalParams,
  ) => Promise<NetworkStatusContract>;
  /** Gets the Connectivity Status to the external resources on which the Api Management service depends from inside the Cloud Service. This also returns the DNS Servers as visible to the CloudService. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: NetworkStatusListByServiceOptionalParams,
  ) => Promise<NetworkStatusListByServiceResponse>;
}

function _getNetworkStatus(context: ApiManagementContext) {
  return {
    listByLocation: (
      resourceGroupName: string,
      serviceName: string,
      locationName: string,
      options?: NetworkStatusListByLocationOptionalParams,
    ) => listByLocation(context, resourceGroupName, serviceName, locationName, options),
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: NetworkStatusListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
  };
}

export function _getNetworkStatusOperations(
  context: ApiManagementContext,
): NetworkStatusOperations {
  return {
    ..._getNetworkStatus(context),
  };
}
