// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates some of the properties of a managed Cassandra cluster.
 *
 * @summary updates some of the properties of a managed Cassandra cluster.
 * x-ms-original-file: 2026-03-15/CosmosDBManagedCassandraClusterPatch.json
 */
async function cosmosDBManagedCassandraClusterPatch(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraClusters.update("cassandra-prod-rg", "cassandra-prod", {
    tags: { owner: "mike" },
    properties: {
      externalSeedNodes: [
        { ipAddress: "10.52.221.2" },
        { ipAddress: "10.52.221.3" },
        { ipAddress: "10.52.221.4" },
      ],
      externalGossipCertificates: [
        {
          pem: "-----BEGIN CERTIFICATE-----\n...Base64 encoded certificate...\n-----END CERTIFICATE-----",
        },
      ],
      hoursBetweenBackups: 12,
      authenticationMethod: "None",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBManagedCassandraClusterPatch();
}

main().catch(console.error);
