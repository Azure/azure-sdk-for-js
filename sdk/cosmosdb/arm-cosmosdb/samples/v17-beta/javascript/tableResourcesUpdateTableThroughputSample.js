// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update RUs per second of an Azure Cosmos DB Table
 *
 * @summary update RUs per second of an Azure Cosmos DB Table
 * x-ms-original-file: 2025-11-01-preview/CosmosDBTableThroughputUpdate.json
 */
async function cosmosDBTableThroughputUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.tableResources.updateTableThroughput("rg1", "ddb1", "tableName", {
    location: "West US",
    resource: { throughput: 400 },
    tags: {},
  });
  console.log(result);
}

async function main() {
  await cosmosDBTableThroughputUpdate();
}

main().catch(console.error);
