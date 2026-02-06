// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a private endpoint connection.
 *
 * @summary updates a private endpoint connection.
 * x-ms-original-file: 2025-10-02-preview/PrivateEndpointConnectionsUpdate.json
 */
async function updatePrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.update(
    "rg1",
    "clustername1",
    "privateendpointconnection1",
    { privateLinkServiceConnectionState: { status: "Approved" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updatePrivateEndpointConnection();
}

main().catch(console.error);
