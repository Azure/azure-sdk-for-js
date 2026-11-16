// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a HorizonDB pool together with the Pool-scoped Endpoint whose associatedResourceId identifies that Pool and all FirewallRule children of that Endpoint. The Endpoint cannot outlive or be deleted independently from its Pool. When this is the Cluster's last surviving Pool, the service also disconnects every existing private endpoint connection associated with the Cluster by setting its privateLinkServiceConnectionState.status to Rejected and providing a description that the last Pool was deleted. The HorizonDB private endpoint connection resources remain available for inspection and cleanup, and customer-owned Microsoft.Network/privateEndpoints resources are not deleted. The delete long-running operation completes only after all required private endpoint disconnections have completed.
 *
 * @summary deletes a HorizonDB pool together with the Pool-scoped Endpoint whose associatedResourceId identifies that Pool and all FirewallRule children of that Endpoint. The Endpoint cannot outlive or be deleted independently from its Pool. When this is the Cluster's last surviving Pool, the service also disconnects every existing private endpoint connection associated with the Cluster by setting its privateLinkServiceConnectionState.status to Rejected and providing a description that the last Pool was deleted. The HorizonDB private endpoint connection resources remain available for inspection and cleanup, and customer-owned Microsoft.Network/privateEndpoints resources are not deleted. The delete long-running operation completes only after all required private endpoint disconnections have completed.
 * x-ms-original-file: 2026-10-01-preview/Pools_Delete.json
 */
async function deleteTheLastHorizonDBPoolAndDisconnectPrivateEndpointConnections(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  await client.pools.delete("example-resource-group", "example-cluster", "example-pool-01");
}

async function main(): Promise<void> {
  await deleteTheLastHorizonDBPoolAndDisconnectPrivateEndpointConnections();
}

main().catch(console.error);
