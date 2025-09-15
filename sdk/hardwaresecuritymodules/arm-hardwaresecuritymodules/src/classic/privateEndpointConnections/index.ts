// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDedicatedHSMResourceProviderContext } from "../../api/azureDedicatedHSMResourceProviderContext.js";
import { PrivateEndpointConnection } from "../../models/models.js";
import { PrivateEndpointConnectionsListByCloudHsmClusterOptionalParams } from "../../api/privateEndpointConnections/options.js";
import { listByCloudHsmCluster } from "../../api/privateEndpointConnections/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateEndpointConnections operations. */
export interface PrivateEndpointConnectionsOperations {
  /** The List operation gets information about the private endpoint connections associated with the Cloud HSM Cluster */
  listByCloudHsmCluster: (
    resourceGroupName: string,
    cloudHsmClusterName: string,
    options?: PrivateEndpointConnectionsListByCloudHsmClusterOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
}

function _getPrivateEndpointConnections(context: AzureDedicatedHSMResourceProviderContext) {
  return {
    listByCloudHsmCluster: (
      resourceGroupName: string,
      cloudHsmClusterName: string,
      options?: PrivateEndpointConnectionsListByCloudHsmClusterOptionalParams,
    ) => listByCloudHsmCluster(context, resourceGroupName, cloudHsmClusterName, options),
  };
}

export function _getPrivateEndpointConnectionsOperations(
  context: AzureDedicatedHSMResourceProviderContext,
): PrivateEndpointConnectionsOperations {
  return {
    ..._getPrivateEndpointConnections(context),
  };
}
