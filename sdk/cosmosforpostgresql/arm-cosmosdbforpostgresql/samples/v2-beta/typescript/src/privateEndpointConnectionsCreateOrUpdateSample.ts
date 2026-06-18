// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBForPostgreSQL } from "@azure/arm-cosmosdbforpostgresql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to approves or Rejects a private endpoint connection with a given name.
 *
 * @summary approves or Rejects a private endpoint connection with a given name.
 * x-ms-original-file: 2023-03-02-preview/PrivateEndpointConnectionCreateOrUpdate.json
 */
async function approvesOrRejectsAPrivateEndpointConnectionWithAGivenName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.privateEndpointConnections.createOrUpdate(
    "TestGroup",
    "testcluster",
    "private-endpoint-connection-name",
    {
      privateLinkServiceConnectionState: {
        description: "Approved by johndoe@contoso.com",
        status: "Approved",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await approvesOrRejectsAPrivateEndpointConnectionWithAGivenName();
}

main().catch(console.error);
