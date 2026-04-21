// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates some of the properties of a managed Cassandra cluster.
 *
 * @summary updates some of the properties of a managed Cassandra cluster.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBManagedCassandraClusterPatch.json
 */
async function cosmosDBManagedCassandraClusterPatch() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraClusters.update("cassandra-prod-rg", "cassandra-prod", {
    properties: {
      authenticationMethod: "None",
      externalGossipCertificates: [
        {
          pem: "-----BEGIN CERTIFICATE-----\n...Base64 encoded certificate...\n-----END CERTIFICATE-----",
        },
      ],
      externalSeedNodes: [
        { ipAddress: "10.52.221.2" },
        { ipAddress: "10.52.221.3" },
        { ipAddress: "10.52.221.4" },
      ],
      hoursBetweenBackups: 12,
    },
    tags: { owner: "mike" },
  });
  console.log(result);
}

async function main() {
  await cosmosDBManagedCassandraClusterPatch();
}

main().catch(console.error);
