// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to approves or rejects an existing private endpoint connection. Approval requires the parent Cluster to contain at least one Pool. An approval attempt when the Cluster has no Pools fails with 409 Conflict and the stable error code PrivateEndpointRequiresPool. Rejection remains allowed when the Cluster has no Pools so that existing connections can be cleaned up.
 *
 * @summary approves or rejects an existing private endpoint connection. Approval requires the parent Cluster to contain at least one Pool. An approval attempt when the Cluster has no Pools fails with 409 Conflict and the stable error code PrivateEndpointRequiresPool. Rejection remains allowed when the Cluster has no Pools so that existing connections can be cleaned up.
 * x-ms-original-file: 2026-10-01-preview/PrivateEndpointConnections_ApproveOrReject.json
 */
async function approveOrRejectAPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.approveOrReject(
    "example-resource-group",
    "example-cluster",
    "example-private-endpoint-connection",
    {
      properties: {
        privateLinkServiceConnectionState: {
          status: "Approved",
          description: "Approved for the production database network",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await approveOrRejectAPrivateEndpointConnection();
}

main().catch(console.error);
