// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an Azure Cosmos DB ThroughputPool account. The "Update" method is preferred when performing updates on an account.
 *
 * @summary creates or updates an Azure Cosmos DB ThroughputPool account. The "Update" method is preferred when performing updates on an account.
 * x-ms-original-file: 2025-11-01-preview/throughputPool/CosmosDBThroughputPoolAccountCreate.json
 */
async function cosmosDBThroughputPoolAccountCreate(): Promise<void> {
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

async function main(): Promise<void> {
  await cosmosDBThroughputPoolAccountCreate();
}

main().catch(console.error);
