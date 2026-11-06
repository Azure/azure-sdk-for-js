// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a private endpoint connection.
 *
 * @summary gets a private endpoint connection.
 * x-ms-original-file: 2026-10-01-preview/PrivateEndpointConnections_Get.json
 */
async function getAPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "example-resource-group",
    "example-cluster",
    "example-private-endpoint-connection",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a private endpoint connection.
 *
 * @summary gets a private endpoint connection.
 * x-ms-original-file: 2026-10-01-preview/PrivateEndpointConnections_GetDisconnectedAfterLastPoolDeletion.json
 */
async function getAPrivateEndpointConnectionDisconnectedAfterTheLastPoolWasDeleted(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "example-resource-group",
    "example-cluster",
    "example-private-endpoint-connection",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAPrivateEndpointConnection();
  await getAPrivateEndpointConnectionDisconnectedAfterTheLastPoolWasDeleted();
}

main().catch(console.error);
