// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to List all Garnet clusters in this resource group.
 *
 * @summary List all Garnet clusters in this resource group.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/CosmosDBGarnetClusterListByResourceGroup.json
 */
async function cosmosDbGarnetClusterListByResourceGroup() {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "garnet-prod-rg";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.garnetClusters.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await cosmosDbGarnetClusterListByResourceGroup();
}

main().catch(console.error);
