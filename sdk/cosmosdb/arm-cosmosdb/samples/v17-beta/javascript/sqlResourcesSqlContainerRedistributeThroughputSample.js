// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to redistribute throughput for an Azure Cosmos DB SQL container
 *
 * @summary redistribute throughput for an Azure Cosmos DB SQL container
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlContainerRedistributeThroughput.json
 */
async function cosmosDBSqlContainerRedistributeThroughput() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.sqlContainerRedistributeThroughput(
    "rg1",
    "ddb1",
    "databaseName",
    "containerName",
    {
      resource: {
        sourcePhysicalPartitionThroughputInfo: [{ id: "2", throughput: 5000 }, { id: "3" }],
        targetPhysicalPartitionThroughputInfo: [
          { id: "0", throughput: 5000 },
          { id: "1", throughput: 5000 },
        ],
        throughputPolicy: "custom",
      },
    },
  );
  console.log(result);
}

async function main() {
  await cosmosDBSqlContainerRedistributeThroughput();
}

main().catch(console.error);
