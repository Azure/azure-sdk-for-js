// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a private endpoint connection.
 *
 * @summary gets a private endpoint connection.
 * x-ms-original-file: 2026-10-01-preview/PrivateEndpointConnections_Get.json
 */
async function getAPrivateEndpointConnection() {
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
async function getAPrivateEndpointConnectionDisconnectedAfterTheLastPoolWasDeleted() {
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

async function main() {
  await getAPrivateEndpointConnection();
  await getAPrivateEndpointConnectionDisconnectedAfterTheLastPoolWasDeleted();
}

main().catch(console.error);
