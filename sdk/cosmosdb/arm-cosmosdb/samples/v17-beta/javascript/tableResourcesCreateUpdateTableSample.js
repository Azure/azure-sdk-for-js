// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update an Azure Cosmos DB Table
 *
 * @summary create or update an Azure Cosmos DB Table
 * x-ms-original-file: 2025-11-01-preview/CosmosDBTableCreateUpdate.json
 */
async function cosmosDBTableReplace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.tableResources.createUpdateTable("rg1", "ddb1", "tableName", {
    location: "West US",
    options: {},
    resource: { id: "tableName" },
    tags: {},
  });
  console.log(result);
}

async function main() {
  await cosmosDBTableReplace();
}

main().catch(console.error);
