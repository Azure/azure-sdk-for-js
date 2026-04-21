// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the SQL trigger under an existing Azure Cosmos DB database account.
 *
 * @summary gets the SQL trigger under an existing Azure Cosmos DB database account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlTriggerGet.json
 */
async function cosmosDBSqlTriggerGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.getSqlTrigger(
    "rgName",
    "ddb1",
    "databaseName",
    "containerName",
    "triggerName",
  );
  console.log(result);
}

async function main() {
  await cosmosDBSqlTriggerGet();
}

main().catch(console.error);
