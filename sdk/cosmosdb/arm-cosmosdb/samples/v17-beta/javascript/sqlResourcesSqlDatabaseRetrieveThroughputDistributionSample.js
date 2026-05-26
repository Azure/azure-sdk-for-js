// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve throughput distribution for an Azure Cosmos DB SQL database
 *
 * @summary retrieve throughput distribution for an Azure Cosmos DB SQL database
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlDatabaseRetrieveThroughputDistribution.json
 */
async function cosmosDBSqlDatabaseRetrieveThroughputDistribution() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.sqlDatabaseRetrieveThroughputDistribution(
    "rg1",
    "ddb1",
    "databaseName",
    { resource: { physicalPartitionIds: [{ id: "0" }, { id: "1" }] } },
  );
  console.log(result);
}

async function main() {
  await cosmosDBSqlDatabaseRetrieveThroughputDistribution();
}

main().catch(console.error);
