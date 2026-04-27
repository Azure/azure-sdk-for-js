// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve throughput distribution for an Azure Cosmos DB MongoDB database
 *
 * @summary retrieve throughput distribution for an Azure Cosmos DB MongoDB database
 * x-ms-original-file: 2025-11-01-preview/CosmosDBMongoDBDatabaseRetrieveThroughputDistribution.json
 */
async function cosmosDBMongoDBDatabaseRetrieveThroughputDistribution(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.mongoDBResources.mongoDBDatabaseRetrieveThroughputDistribution(
    "rg1",
    "ddb1",
    "databaseName",
    { resource: { physicalPartitionIds: [{ id: "0" }, { id: "1" }] } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBMongoDBDatabaseRetrieveThroughputDistribution();
}

main().catch(console.error);
