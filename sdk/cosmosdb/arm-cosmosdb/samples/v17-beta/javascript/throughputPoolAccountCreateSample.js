// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an Azure Cosmos DB ThroughputPool account. The "Update" method is preferred when performing updates on an account.
 *
 * @summary creates or updates an Azure Cosmos DB ThroughputPool account. The "Update" method is preferred when performing updates on an account.
 * x-ms-original-file: 2025-11-01-preview/throughputPool/CosmosDBThroughputPoolAccountCreate.json
 */
async function cosmosDBThroughputPoolAccountCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.throughputPoolAccount.create("rg1", "tp1", "db1", {
    accountLocation: "West US",
    accountResourceIdentifier:
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/providers/Microsoft.DocumentDB/resourceGroup/rg1/databaseAccounts/db1/",
  });
  console.log(result);
}

async function main() {
  await cosmosDBThroughputPoolAccountCreate();
}

main().catch(console.error);
