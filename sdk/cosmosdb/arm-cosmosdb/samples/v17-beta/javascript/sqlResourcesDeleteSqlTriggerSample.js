// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB SQL trigger.
 *
 * @summary deletes an existing Azure Cosmos DB SQL trigger.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlTriggerDelete.json
 */
async function cosmosDBSqlTriggerDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.sqlResources.deleteSqlTrigger(
    "rg1",
    "ddb1",
    "databaseName",
    "containerName",
    "triggerName",
  );
}

async function main() {
  await cosmosDBSqlTriggerDelete();
}

main().catch(console.error);
