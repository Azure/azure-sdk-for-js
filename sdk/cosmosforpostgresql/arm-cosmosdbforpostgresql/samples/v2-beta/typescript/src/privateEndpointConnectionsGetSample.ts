// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBForPostgreSQL } from "@azure/arm-cosmosdbforpostgresql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets private endpoint connection.
 *
 * @summary gets private endpoint connection.
 * x-ms-original-file: 2023-03-02-preview/PrivateEndpointConnectionsGet.json
 */
async function getsPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "TestGroup",
    "testcluster",
    "private-endpoint-connection-name",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsPrivateEndpointConnection();
}

main().catch(console.error);
