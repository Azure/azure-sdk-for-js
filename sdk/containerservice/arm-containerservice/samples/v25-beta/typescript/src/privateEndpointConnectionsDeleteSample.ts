// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a private endpoint connection.
 *
 * @summary deletes a private endpoint connection.
 * x-ms-original-file: 2025-10-02-preview/PrivateEndpointConnectionsDelete.json
 */
async function deletePrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "rg1",
    "clustername1",
    "privateendpointconnection1",
  );
}

async function main(): Promise<void> {
  await deletePrivateEndpointConnection();
}

main().catch(console.error);
