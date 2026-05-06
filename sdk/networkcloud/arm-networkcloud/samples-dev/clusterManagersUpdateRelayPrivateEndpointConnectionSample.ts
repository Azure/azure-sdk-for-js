// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudClient } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the private endpoint connection for the Azure Relay namespace managed by the specified cluster manager. Use this operation to approve or reject a pending private endpoint connection request for the relay namespace managed by the cluster manager.
 *
 * @summary update the private endpoint connection for the Azure Relay namespace managed by the specified cluster manager. Use this operation to approve or reject a pending private endpoint connection request for the relay namespace managed by the cluster manager.
 * x-ms-original-file: 2026-05-01-preview/ClusterManagers_UpdateRelayPrivateEndpointConnection_Approve.json
 */
async function approvePrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.clusterManagers.updateRelayPrivateEndpointConnection(
    "resourceGroupName",
    "clusterManagerName",
    {
      clusterManagerUpdateRelayPrivateEndpointConnectionParameters: {
        connectionState: "Approved",
        description: "Approving private endpoint connection",
        privateEndpointResourceId:
          "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.Network/privateEndpoints/privateEndpointName",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update the private endpoint connection for the Azure Relay namespace managed by the specified cluster manager. Use this operation to approve or reject a pending private endpoint connection request for the relay namespace managed by the cluster manager.
 *
 * @summary update the private endpoint connection for the Azure Relay namespace managed by the specified cluster manager. Use this operation to approve or reject a pending private endpoint connection request for the relay namespace managed by the cluster manager.
 * x-ms-original-file: 2026-05-01-preview/ClusterManagers_UpdateRelayPrivateEndpointConnection_Reject.json
 */
async function rejectPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.clusterManagers.updateRelayPrivateEndpointConnection(
    "resourceGroupName",
    "clusterManagerName",
    {
      clusterManagerUpdateRelayPrivateEndpointConnectionParameters: {
        connectionState: "Rejected",
        description: "Rejecting private endpoint connection",
        privateEndpointResourceId:
          "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.Network/privateEndpoints/privateEndpointName",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await approvePrivateEndpointConnection();
  await rejectPrivateEndpointConnection();
}

main().catch(console.error);
