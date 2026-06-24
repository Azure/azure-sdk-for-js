// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBForPostgreSQL } from "@azure/arm-cosmosdbforpostgresql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a private endpoint connection with a given name.
 *
 * @summary deletes a private endpoint connection with a given name.
 * x-ms-original-file: 2023-03-02-preview/PrivateEndpointConnectionsDelete.json
 */
async function deletesAPrivateEndpointConnectionWithAGivenName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "TestGroup",
    "testcluster",
    "private-endpoint-connection-name",
  );
}

async function main(): Promise<void> {
  await deletesAPrivateEndpointConnectionWithAGivenName();
}

main().catch(console.error);
