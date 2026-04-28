// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a managed Cassandra data center. When updating, overwrite all properties. To update only some properties, use PATCH.
 *
 * @summary create or update a managed Cassandra data center. When updating, overwrite all properties. To update only some properties, use PATCH.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBManagedCassandraDataCenterCreate.json
 */
async function cosmosDBManagedCassandraDataCenterCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraDataCenters.createUpdate(
    "cassandra-prod-rg",
    "cassandra-prod",
    "dc1",
    {
      properties: {
        base64EncodedCassandraYamlFragment:
          "Y29tcGFjdGlvbl90aHJvdWdocHV0X21iX3Blcl9zZWM6IDMyCmNvbXBhY3Rpb25fbGFyZ2VfcGFydGl0aW9uX3dhcm5pbmdfdGhyZXNob2xkX21iOiAxMDA=",
        dataCenterLocation: "West US 2",
        delegatedSubnetId:
          "/subscriptions/536e130b-d7d6-4ac7-98a5-de20d69588d2/resourceGroups/customer-vnet-rg/providers/Microsoft.Network/virtualNetworks/customer-vnet/subnets/dc1-subnet",
        nodeCount: 9,
      },
    },
  );
  console.log(result);
}

async function main() {
  await cosmosDBManagedCassandraDataCenterCreate();
}

main().catch(console.error);
