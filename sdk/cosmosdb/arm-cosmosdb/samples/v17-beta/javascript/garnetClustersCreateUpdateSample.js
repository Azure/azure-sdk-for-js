// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create or update a Garnet cache cluster. When updating, you must specify all writable properties.
 *
 * @summary Create or update a Garnet cache cluster. When updating, you must specify all writable properties.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/CosmosDBGarnetClusterCreate.json
 */
async function cosmosDbGarnetClusterCreate() {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "garnet-prod-rg";
  const clusterName = "garnet-prod";
  const body = {
    location: "West US",
    properties: {
      nodeCount: 4,
      nodeSku: "Standard_DS13_v2",
      replicationFactor: 2,
      subnetId:
        "/subscriptions/536e130b-d7d6-4ac7-98a5-de20d69588d2/resourceGroups/customer-vnet-rg/providers/Microsoft.Network/virtualNetworks/customer-vnet/subnets/management",
    },
    tags: {},
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.garnetClusters.beginCreateUpdateAndWait(
    resourceGroupName,
    clusterName,
    body,
  );
  console.log(result);
}

async function main() {
  await cosmosDbGarnetClusterCreate();
}

main().catch(console.error);
