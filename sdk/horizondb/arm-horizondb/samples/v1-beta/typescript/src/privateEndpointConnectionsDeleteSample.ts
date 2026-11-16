// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a private endpoint connection.
 *
 * @summary deletes a private endpoint connection.
 * x-ms-original-file: 2026-10-01-preview/PrivateEndpointConnections_Delete.json
 */
async function deleteAPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "example-resource-group",
    "example-cluster",
    "example-private-endpoint-connection",
  );
}

async function main(): Promise<void> {
  await deleteAPrivateEndpointConnection();
}

main().catch(console.error);
