// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDedicatedHSMResourceProviderContext } from "../../api/azureDedicatedHSMResourceProviderContext.js";
import {
  $delete,
  create,
  get,
} from "../../api/cloudHsmClusterPrivateEndpointConnections/operations.js";
import {
  CloudHsmClusterPrivateEndpointConnectionsDeleteOptionalParams,
  CloudHsmClusterPrivateEndpointConnectionsCreateOptionalParams,
  CloudHsmClusterPrivateEndpointConnectionsGetOptionalParams,
} from "../../api/cloudHsmClusterPrivateEndpointConnections/options.js";
import { PrivateEndpointConnection } from "../../models/models.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CloudHsmClusterPrivateEndpointConnections operations. */
export interface CloudHsmClusterPrivateEndpointConnectionsOperations {
  /** Deletes the private endpoint connection for the Cloud Hsm Cluster. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    cloudHsmClusterName: string,
    peConnectionName: string,
    options?: CloudHsmClusterPrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates the private endpoint connection for the Cloud Hsm Cluster. */
  create: (
    resourceGroupName: string,
    cloudHsmClusterName: string,
    peConnectionName: string,
    properties: PrivateEndpointConnection,
    options?: CloudHsmClusterPrivateEndpointConnectionsCreateOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
  /** Gets the private endpoint connection for the Cloud Hsm Cluster. */
  get: (
    resourceGroupName: string,
    cloudHsmClusterName: string,
    peConnectionName: string,
    options?: CloudHsmClusterPrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
}

function _getCloudHsmClusterPrivateEndpointConnections(
  context: AzureDedicatedHSMResourceProviderContext,
) {
  return {
    delete: (
      resourceGroupName: string,
      cloudHsmClusterName: string,
      peConnectionName: string,
      options?: CloudHsmClusterPrivateEndpointConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, cloudHsmClusterName, peConnectionName, options),
    create: (
      resourceGroupName: string,
      cloudHsmClusterName: string,
      peConnectionName: string,
      properties: PrivateEndpointConnection,
      options?: CloudHsmClusterPrivateEndpointConnectionsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        cloudHsmClusterName,
        peConnectionName,
        properties,
        options,
      ),
    get: (
      resourceGroupName: string,
      cloudHsmClusterName: string,
      peConnectionName: string,
      options?: CloudHsmClusterPrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, cloudHsmClusterName, peConnectionName, options),
  };
}

export function _getCloudHsmClusterPrivateEndpointConnectionsOperations(
  context: AzureDedicatedHSMResourceProviderContext,
): CloudHsmClusterPrivateEndpointConnectionsOperations {
  return {
    ..._getCloudHsmClusterPrivateEndpointConnections(context),
  };
}
