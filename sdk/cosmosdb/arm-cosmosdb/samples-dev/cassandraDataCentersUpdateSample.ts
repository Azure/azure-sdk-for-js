// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update some of the properties of a managed Cassandra data center.
 *
 * @summary update some of the properties of a managed Cassandra data center.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBManagedCassandraDataCenterPatch.json
 */
async function cosmosDBManagedCassandraDataCenterUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraDataCenters.update(
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

async function main(): Promise<void> {
  await cosmosDBManagedCassandraDataCenterUpdate();
}

main().catch(console.error);
