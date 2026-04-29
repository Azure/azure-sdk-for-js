// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a managed Cassandra cluster. When updating, you must specify all writable properties. To update only some properties, use PATCH.
 *
 * @summary create or update a managed Cassandra cluster. When updating, you must specify all writable properties. To update only some properties, use PATCH.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBManagedCassandraClusterCreate.json
 */
async function cosmosDBManagedCassandraClusterCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraClusters.createUpdate(
    "cassandra-prod-rg",
    "cassandra-prod",
    {
      location: "West US",
      properties: {
        authenticationMethod: "Cassandra",
        cassandraVersion: "3.11",
        clientCertificates: [
          {
            pem: "-----BEGIN CERTIFICATE-----\n...Base64 encoded certificate...\n-----END CERTIFICATE-----",
          },
        ],
        clusterNameOverride: "ClusterNameIllegalForAzureResource",
        delegatedManagementSubnetId:
          "/subscriptions/536e130b-d7d6-4ac7-98a5-de20d69588d2/resourceGroups/customer-vnet-rg/providers/Microsoft.Network/virtualNetworks/customer-vnet/subnets/management",
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
        hoursBetweenBackups: 24,
        initialCassandraAdminPassword: "mypassword",
      },
      tags: {},
    },
  );
  console.log(result);
}

async function main() {
  await cosmosDBManagedCassandraClusterCreate();
}

main().catch(console.error);
